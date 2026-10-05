import crypto from 'crypto'
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/db'
import { clientIp, isRateLimited } from '@/lib/rate-limit'
import { escapeHtml, sendEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'

const entradaCctv = z.object({
  camaras: z.number().int().min(1).max(32),
  distancia: z.enum(['corta', 'media', 'larga']),
  instalacion: z.enum(['interior', 'exterior', 'mixta']),
})
const entradaTelefonia = z.object({
  extensiones: z.number().int().min(1).max(48),
  cableado: z.enum(['existente', 'corta', 'larga']),
  poe: z.enum(['si', 'no']),
})
const entradaWifi = z.object({
  metros: z.number().int().min(50).max(5000),
  espacio: z.enum(['abierto', 'paredes', 'nave']),
  personas: z.enum(['20', '50', '100', '150']),
})
const entradaFirewall = z.object({
  marca: z.enum(['fortinet', 'aruba']),
  usuarios: z.enum(['25', '75', '150']),
  configuracion: z.enum(['basica', 'avanzada']),
})
const entradaRedes = z.object({
  puntos: z.number().int().min(1).max(96),
  distancia: z.enum(['corta', 'media', 'larga']),
  gabinete: z.enum(['si', 'no']),
})

const contacto = z.object({
  nombre: z.string().trim().min(1).max(100),
  empresa: z.string().trim().max(150).optional().default(''),
  telefono: z.string().trim().min(7).max(30),
  email: z.string().trim().email().max(150).optional().or(z.literal('')).default(''),
  ubicacion: z.string().trim().max(150).optional().default(''),
  mensaje: z.string().trim().max(2000).optional().default(''),
})
// Campo trampa: los humanos no lo ven, los bots lo rellenan
const website = z.string().optional().default('')

const schema = z.discriminatedUnion('area', [
  z.object({ area: z.literal('cctv'), entrada: entradaCctv, contacto, website }),
  z.object({ area: z.literal('telefonia'), entrada: entradaTelefonia, contacto, website }),
  z.object({ area: z.literal('wifi'), entrada: entradaWifi, contacto, website }),
  z.object({ area: z.literal('firewall'), entrada: entradaFirewall, contacto, website }),
  z.object({ area: z.literal('redes'), entrada: entradaRedes, contacto, website }),
])

const ETIQUETA = {
  distancia: { corta: 'menos de 20 m', media: '20 a 50 m', larga: 'más de 50 m' },
  instalacion: { interior: 'interior', exterior: 'exterior', mixta: 'interior y exterior' },
  cableado: { existente: 'usa la red existente', corta: 'cableado nuevo, distancias cortas', larga: 'cableado nuevo, distancias largas' },
  poe: { si: 'ya tiene switch PoE', no: 'sin switch PoE' },
  espacio: { abierto: 'espacio abierto', paredes: 'oficinas con paredes', nave: 'nave o almacén' },
  personas: { '20': 'hasta 20 personas', '50': 'hasta 50 personas', '100': 'hasta 100 personas', '150': 'más de 100 personas' },
} as const

// Resumen, servicio y título del correo según el área
function describir(d: z.infer<typeof schema>) {
  if (d.area === 'redes') {
    const e = d.entrada
    return {
      servicio: 'Estimador Redes',
      resumen: `Redes: ${e.puntos} puntos, distancia ${ETIQUETA.distancia[e.distancia]}, ${e.gabinete === 'si' ? 'ya tiene gabinete' : 'con gabinete nuevo'}`,
      detalle: `${e.puntos} puntos`,
    }
  }
  if (d.area === 'firewall') {
    const marca = d.entrada.marca === 'aruba' ? 'Aruba Instant On' : 'Fortinet'
    return {
      servicio: 'Estimador Firewall',
      resumen: `Firewall ${marca}, ${d.entrada.configuracion === 'avanzada' ? 'configuración avanzada (VPN, segmentación de red y políticas de seguridad)' : 'configuración básica'}`,
      detalle: marca,
    }
  }
  if (d.area === 'wifi') {
    const e = d.entrada
    return {
      servicio: 'Estimador WiFi',
      resumen: `WiFi: ${e.metros} m², ${ETIQUETA.espacio[e.espacio]}, ${ETIQUETA.personas[e.personas]}`,
      detalle: `${e.metros} m²`,
    }
  }
  if (d.area === 'telefonia') {
    const e = d.entrada
    return {
      servicio: 'Estimador Central telefónica',
      resumen: `Central telefónica: ${e.extensiones} extensiones, ${ETIQUETA.cableado[e.cableado]}, ${ETIQUETA.poe[e.poe]}`,
      detalle: `${e.extensiones} extensiones`,
    }
  }
  const e = d.entrada
  return {
    servicio: 'Estimador CCTV',
    resumen: `CCTV: ${e.camaras} cámaras, distancia ${ETIQUETA.distancia[e.distancia]}, instalación ${ETIQUETA.instalacion[e.instalacion]}`,
    detalle: `${e.camaras} cámaras`,
  }
}

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

  // Sin "area" se asume CCTV (formulario anterior a la central telefónica)
  const json = await request.json().catch(() => null)
  const parsed = schema.safeParse(json && typeof json === 'object' && !('area' in json) ? { ...json, area: 'cctv' } : json)
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: 'Revisa los datos: nombre y teléfono son requeridos.' }, { status: 400 })
  }
  const { area, entrada, contacto, website } = parsed.data
  const { servicio, resumen, detalle } = describir(parsed.data)

  // Bot: respuesta genérica sin llamar a NetPlanner
  if (website) return NextResponse.json({ ok: true, rango: null })

  try {
    const { ok, status, data } = await llamarNetplanner({ accion: 'solicitar', area, entrada, contacto })
    if (!ok) {
      console.error('[estimador] NetPlanner respondió', status, data)
      return NextResponse.json(
        { ok: false, message: 'No pudimos calcular el estimado ahora. Escríbenos y te cotizamos directamente.' },
        { status: 502 }
      )
    }
    const rango: { minimo: number; maximo: number } = data.rango
    // NetPlanner devuelve el resumen con la cantidad de equipos (APs, etc.) y los materiales, sin precios
    const resumenFinal: string = typeof data.resumen === 'string' ? data.resumen : resumen
    const materiales: { nombre: string; cantidad: number; unidad: string }[] = Array.isArray(data.materiales) ? data.materiales : []
    const listaMateriales = materiales.map((m) => `${m.cantidad} ${m.unidad} · ${m.nombre}`)

    // Copia en la base de la web; si falla, el lead ya quedó en NetPlanner
    await prisma.contactMessage.create({
      data: {
        name: contacto.nombre,
        company: contacto.empresa,
        phone: contacto.telefono,
        email: contacto.email,
        service: servicio,
        message: [
          resumenFinal,
          `Rango mostrado: ${dop(rango.minimo)} – ${dop(rango.maximo)}`,
          contacto.ubicacion && `Ubicación: ${contacto.ubicacion}`,
          contacto.mensaje,
          listaMateriales.length > 0 && `Equipos y materiales estimados:\n${listaMateriales.join('\n')}`,
        ]
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
        subject: `${servicio}: ${contacto.empresa || contacto.nombre} (${detalle})`.slice(0, 200),
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2 style="color:#0097A7;">Nueva solicitud: ${servicio}</h2>
            ${fila('Nombre', contacto.nombre)}
            ${fila('Empresa', contacto.empresa || 'No especificada')}
            ${fila('Teléfono', contacto.telefono)}
            ${fila('Email', contacto.email || 'No proporcionado')}
            ${fila('Ubicación', contacto.ubicacion || 'No especificada')}
            ${fila('Proyecto', resumenFinal)}
            ${fila('Rango mostrado', `${dop(rango.minimo)} – ${dop(rango.maximo)}`)}
            ${contacto.mensaje ? fila('Mensaje', contacto.mensaje) : ''}
            ${
              listaMateriales.length > 0
                ? `<p style="margin:16px 0 6px;"><strong>Equipos y materiales estimados:</strong></p><ul style="margin:0;padding-left:20px;">${listaMateriales
                    .map((l) => `<li>${escapeHtml(l)}</li>`)
                    .join('')}</ul>`
                : ''
            }
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
