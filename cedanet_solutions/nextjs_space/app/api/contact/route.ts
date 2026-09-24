import { NextResponse } from 'next/server'
import { z } from 'zod'
import nodemailer from 'nodemailer'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  company: z.string().trim().max(150).optional().default(''),
  phone: z.string().trim().max(30).optional().default(''),
  email: z.string().trim().email().max(150),
  service: z.string().trim().max(100).optional().default(''),
  message: z.string().trim().min(1).max(5000),
  // Campo trampa: los humanos no lo ven, los bots lo rellenan
  website: z.string().optional().default(''),
})

// Límite simple por IP: 5 envíos cada 10 minutos (en memoria, por instancia)
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 10 * 60 * 1000
const hits = new Map<string, number[]>()

function isRateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key)
    }
  }
  return recent.length > RATE_LIMIT
}

// Railway bloquea SMTP saliente en los planes Free/Hobby: si hay RESEND_API_KEY
// se usa la API HTTP de Resend; si no, SMTP (Google Workspace, plan Pro).
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 465),
  secure: Number(process.env.SMTP_PORT || 465) === 465,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  connectionTimeout: 10_000,
  greetingTimeout: 10_000,
  socketTimeout: 15_000,
})

async function sendContactEmail(mail: { to: string; replyTo: string; subject: string; html: string }) {
  if (process.env.RESEND_API_KEY) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || 'Cedanet Solutions <noreply@cedanet.net>',
        to: [mail.to],
        reply_to: mail.replyTo,
        subject: mail.subject,
        html: mail.html,
      }),
      signal: AbortSignal.timeout(15_000),
    })
    if (!res.ok) throw new Error(`Resend HTTP ${res.status}: ${await res.text().catch(() => '')}`)
    return
  }
  await transporter.sendMail({
    from: `"Cedanet Solutions" <${process.env.SMTP_USER}>`,
    ...mail,
  })
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function stripLineBreaks(value: string) {
  return value.replace(/[\r\n]+/g, ' ')
}

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get('cf-connecting-ip') ||
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      'unknown'

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: 'Demasiados envíos. Intente de nuevo en unos minutos.' },
        { status: 429 }
      )
    }

    const parsed = contactSchema.safeParse(await request.json().catch(() => null))
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: 'Revise los datos: nombre, correo válido y mensaje son requeridos.' },
        { status: 400 }
      )
    }

    const { name, company, phone, email, service, message, website } = parsed.data

    // Si el campo trampa viene lleno, respondemos éxito sin guardar ni enviar nada
    if (website) {
      return NextResponse.json({ success: true, message: 'Mensaje enviado correctamente.' })
    }

    await prisma.contactMessage.create({
      data: { name, company, phone, email, service, message },
    })

    const safe = {
      name: escapeHtml(name),
      company: escapeHtml(company) || 'No especificada',
      phone: escapeHtml(phone) || 'No proporcionado',
      email: escapeHtml(email),
      service: escapeHtml(service) || 'No especificado',
      message: escapeHtml(message).replace(/\n/g, '<br>'),
    }

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0097A7; border-bottom: 2px solid #0097A7; padding-bottom: 10px;">
          Nuevo mensaje de contacto - Cedanet Solutions
        </h2>
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Nombre:</strong> ${safe.name}</p>
          <p style="margin: 10px 0;"><strong>Empresa:</strong> ${safe.company}</p>
          <p style="margin: 10px 0;"><strong>Teléfono:</strong> ${safe.phone}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${safe.email}">${safe.email}</a></p>
          <p style="margin: 10px 0;"><strong>Servicio de interés:</strong> ${safe.service}</p>
          <p style="margin: 10px 0;"><strong>Mensaje:</strong></p>
          <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #0097A7;">
            ${safe.message}
          </div>
        </div>
        <p style="color: #666; font-size: 12px;">Enviado desde el formulario de contacto de cedanet.net</p>
      </div>
    `

    try {
      await sendContactEmail({
        to: process.env.CONTACT_TO || 'javis.cedano@cedanet.net',
        replyTo: email,
        subject: stripLineBreaks(`Nuevo contacto: ${name} - ${service || 'General'}`).slice(0, 200),
        html: htmlBody,
      })
    } catch (emailError: unknown) {
      // El mensaje ya quedó guardado en la base; solo se registra el fallo del correo
      console.error('Error enviando email:', emailError instanceof Error ? emailError.message : emailError)
    }

    return NextResponse.json({ success: true, message: 'Mensaje enviado correctamente.' })
  } catch (error: unknown) {
    console.error('Error en formulario de contacto:', error instanceof Error ? error.message : error)
    return NextResponse.json(
      { success: false, message: 'Error al procesar el mensaje. Intente nuevamente.' },
      { status: 500 }
    )
  }
}
