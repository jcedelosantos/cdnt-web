import nodemailer from 'nodemailer'

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

export async function sendEmail(mail: { to: string; replyTo: string; subject: string; html: string }) {
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

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function stripLineBreaks(value: string) {
  return value.replace(/[\r\n]+/g, ' ')
}
