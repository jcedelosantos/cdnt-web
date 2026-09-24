import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const { name, company, phone, email, service, message } = data ?? {}

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Nombre, correo y mensaje son requeridos.' },
        { status: 400 }
      )
    }

    // Save to database
    await prisma.contactMessage.create({
      data: {
        name: name ?? '',
        company: company ?? '',
        phone: phone ?? '',
        email: email ?? '',
        service: service ?? '',
        message: message ?? '',
      },
    })

    // Send email notification
    const appUrl = process.env.NEXTAUTH_URL || ''
    let appName = 'Cedanet Solutions'
    try {
      appName = appUrl ? new URL(appUrl).hostname?.split?.('.')?.[0] || 'Cedanet Solutions' : 'Cedanet Solutions'
    } catch { appName = 'Cedanet Solutions' }

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0097A7; border-bottom: 2px solid #0097A7; padding-bottom: 10px;">
          Nuevo mensaje de contacto - Cedanet Solutions
        </h2>
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 10px 0;"><strong>Nombre:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong>Empresa:</strong> ${company || 'No especificada'}</p>
          <p style="margin: 10px 0;"><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
          <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p style="margin: 10px 0;"><strong>Servicio de interés:</strong> ${service || 'No especificado'}</p>
          <p style="margin: 10px 0;"><strong>Mensaje:</strong></p>
          <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #0097A7;">
            ${message}
          </div>
        </div>
        <p style="color: #666; font-size: 12px;">Enviado desde el formulario de contacto de cedanet.net</p>
      </div>
    `

    try {
      const senderEmail = appUrl ? `noreply@${new URL(appUrl).hostname}` : 'noreply@cedanet.net'
      await fetch('https://apps.abacus.ai/api/sendNotificationEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deployment_token: process.env.ABACUSAI_API_KEY,
          app_id: process.env.WEB_APP_ID,
          notification_id: process.env.NOTIF_ID_FORMULARIO_DE_CONTACTO,
          subject: `Nuevo contacto: ${name} - ${service || 'General'}`,
          body: htmlBody,
          is_html: true,
          recipient_email: 'javis.cedano@cedanet.net',
          reply_to: email,
          sender_email: senderEmail,
          sender_alias: appName,
        }),
      })
    } catch (emailError: any) {
      console.error('Error enviando email:', emailError?.message)
    }

    return NextResponse.json({ success: true, message: 'Mensaje enviado correctamente.' })
  } catch (error: any) {
    console.error('Error en formulario de contacto:', error?.message)
    return NextResponse.json(
      { success: false, message: 'Error al procesar el mensaje. Intente nuevamente.' },
      { status: 500 }
    )
  }
}
