import crypto from 'crypto'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { clientIp, isRateLimited } from '@/lib/rate-limit'
import { escapeHtml, sendEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'

const schema = z.object({
  entrada: z.object({
    camaras: z.number().int().min(1).max(32),
    distancia: z.enum(['corta', 'media', 'larga']),
    instalacion: z.enum(['interior', 'exterior', 'mixta']),
  }),
  contacto: z.object({
    nombre: z.string().trim().min(1).max(100),
    empresa: z.string().trim().max(150).optional().default(''),
    telefono: z.string().trim().min(7).max(30),
    email: z.string().trim().email().max(150).optional().or(z.literal('')).default(''),
    ubicacion: z.string().trim().max(150).optional().default(''),
    mensaje: z.string().trim().max(2000).optional().default(''),
  }),
  // Campo trampa: los humanos no lo ven, los bots lo rellenan
  website: z.string().optional().default(''),
})

const ETIQUETA = {
  distancia: { corta: 'menos de 20 m', media: '20 a 50 m', larga: 'más de 50 m' },
  instalacion: { interior: 'interior', exterior: 'exterior', mixta: 'interior y exterior' },
} as const

const dop = (n: number) => `RD$ ${n.toLocaleString('es-DO', { maximumFractionDigits: 0 })}`

// Llama a NetPlanner firmando el cuerpo con ESTIMADOR_SECRET (HMAC-SHA256)
async function llamarNetplanner(cuerpo: unknown) {
  const base = process.env.NETPLANNER_URL
  const secreto = process.env.ESTIMADOR_SECRET
  if (!base || !secreto) throw new Error('Estimador sin configurar (NETPLANNER_URL / ESTIMADOR_SECRET)')
  const texto = JSON.stringify(cuerpo)
  const ts = String(Date.now())
  const firma = crypto.createHmac('sha256', secreto).update(`${ts}.${texto}`).digest('hex')
  const res = await fetch(`${base}/api/public/estimador`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-estimador-timestamp': ts, 'x-estimador-firma': firma },
    body: texto,
    signal: AbortSignal.timeout(15_000),
  })
  const data = await res.json().catch(() => ({}))
  return { ok: res.ok, status: res.status, data }
}

export async function POST(request: Request) {
  if (isRateLimited(`estimador:${clientIp(request)}`)) {
    return NextResponse.json({ ok: false, message: 'Demasiadas solicitudes. Intenta de nuevo en unos minutos.' }, { status: 429 })
  }

  const parsed = schema.safeParse(await request.json().catch(() => null))
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: 'Revisa los datos: nombre y teléfono son requeridos.' }, { status: 400 })
  }
  const { entrada, contacto, website } = parsed.data

  // Bot: respuesta genérica sin llamar a NetPlanner
  if (website) return NextResponse.json({ ok: true, rango: null })

  try {
    const { ok, status, data } = await llamarNetplanner({ accion: 'solicitar', entrada, contacto })
    if (!ok) {
      console.error('[estimador] NetPlanner respondió', status, data)
      return NextResponse.json(
        { ok: false, message: 'No pudimos calcular el estimado ahora. Escríbenos y te cotizamos directamente.' },
        { status: 502 }
      )
    }
    const rango: { minimo: number; maximo: number } = data.rango

    const resumen = `CCTV: ${entrada.camaras} cámaras, distancia ${ETIQUETA.distancia[entrada.distancia]}, instalación ${ETIQUETA.instalacion[entrada.instalacion]}`
    // Copia en la base de la web; si falla, el lead ya quedó en NetPlanner
    await prisma.contactMessage.create({
      data: {
        name: contacto.nombre,
        company: contacto.empresa,
        phone: contacto.telefono,
        email: contacto.email,
        service: 'Estimador CCTV',
        message: [resumen, `Rango mostrado: ${dop(rango.minimo)} – ${dop(rango.maximo)}`, contacto.ubicacion && `Ubicación: ${contacto.ubicacion}`, contacto.mensaje]
          .filter(Boolean)
          .join('\n'),
      },
    }).catch((e) => console.error('[estimador] No se guardó la copia local:', e instanceof Error ? e.message : e))

    const enlace = `${process.env.NETPLANNER_URL}/proyecto/${data.proyectoId}`
    const fila = (k: string, v: string) => `<p style="margin:6px 0;"><strong>${k}:</strong> ${escapeHtml(v)}</p>`
    try {
      await sendEmail({
        to: process.env.CONTACT_TO || 'javis.cedano@cedanet.net',
        replyTo: contacto.email || process.env.CONTACT_TO || 'javis.cedano@cedanet.net',
        subject: `Estimador CCTV: ${contacto.empresa || contacto.nombre} (${entrada.camaras} cámaras)`.slice(0, 200),
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2 style="color:#0097A7;">Nueva solicitud del estimador de CCTV</h2>
            ${fila('Nombre', contacto.nombre)}
            ${fila('Empresa', contacto.empresa || 'No especificada')}
            ${fila('Teléfono', contacto.telefono)}
            ${fila('Email', contacto.email || 'No proporcionado')}
            ${fila('Ubicación', contacto.ubicacion || 'No especificada')}
            ${fila('Proyecto', resumen)}
            ${fila('Rango mostrado', `${dop(rango.minimo)} – ${dop(rango.maximo)}`)}
            ${contacto.mensaje ? fila('Mensaje', contacto.mensaje) : ''}
            <p style="margin-top:16px;"><a href="${enlace}" style="background:#0097A7;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none;">Abrir borrador en NetPlanner</a></p>
          </div>`,
      })
    } catch (e) {
      console.error('[estimador] Error enviando email:', e instanceof Error ? e.message : e)
    }

    return NextResponse.json({ ok: true, rango })
  } catch (error) {
    console.error('[estimador] Error:', error instanceof Error ? error.message : error)
    return NextResponse.json(
      { ok: false, message: 'No pudimos calcular el estimado ahora. Escríbenos y te cotizamos directamente.' },
      { status: 500 }
    )
  }
}
