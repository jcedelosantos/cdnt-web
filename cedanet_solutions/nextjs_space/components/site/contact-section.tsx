'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Send, MapPin, Phone, Mail, MessageCircle, Instagram, Globe } from 'lucide-react'
import { toast } from 'sonner'
import { SectionHeader } from './section-header'
import { estimadorActivo } from '@/lib/features'

const serviceOptions = [
  'Redes e infraestructura',
  'Firewall y seguridad perimetral',
  'CCTV y videovigilancia',
  'Telefonía IP',
  'WiFi empresarial',
  'Soporte técnico y mantenimiento',
  'Servidores y soluciones cloud',
  'Automatización tecnológica',
  'Otro',
]

export function ContactSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    service: '',
    message: '',
    website: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e?.target ?? {}
    setForm((prev: any) => ({ ...(prev ?? {}), [name ?? '']: value ?? '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e?.preventDefault?.()
    if (!form?.name || !form?.email || !form?.message) {
      toast.error('Por favor completa los campos requeridos.')
      return
    }
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res?.json?.()
      if (data?.success) {
        toast.success('¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.')
        setForm({ name: '', company: '', phone: '', email: '', service: '', message: '', website: '' })
      } else {
        toast.error(data?.message ?? 'Error al enviar el mensaje.')
      }
    } catch (err: any) {
      console.error('Contact form error:', err?.message)
      toast.error('Error al enviar el mensaje. Intente nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contacto" className="py-20 md:py-28 bg-white scroll-mt-16" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Contáctanos"
          title="Hablemos de tu proyecto"
          description="Cuéntanos qué necesitas y te respondemos con una propuesta adaptada a tu empresa."
          inView={inView}
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {estimadorActivo && (
              <a
                href="/estimador"
                className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-brand/20 bg-brand-50 p-4 hover:border-brand/50 transition-colors"
              >
                <span>
                  <span className="block font-semibold text-gray-900">¿Quieres un precio rápido?</span>
                  <span className="block text-sm text-gray-600">Usa el estimador en línea y ve un rango al instante.</span>
                </span>
                <span className="flex-shrink-0 px-4 py-2 rounded-lg bg-brand text-white text-sm font-semibold">Estimar precio</span>
              </a>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Campo trampa anti-spam: oculto para personas, los bots lo rellenan */}
              <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                <label>
                  No completar este campo
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form?.website ?? ''}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contacto-name" className="block text-sm font-medium text-gray-700 mb-1.5">Nombre *</label>
                  <input
                    type="text"
                    id="contacto-name"
                    name="name"
                    maxLength={100}
                    value={form?.name ?? ''}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <label htmlFor="contacto-company" className="block text-sm font-medium text-gray-700 mb-1.5">Empresa</label>
                  <input
                    type="text"
                    id="contacto-company"
                    name="company"
                    maxLength={150}
                    value={form?.company ?? ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
                    placeholder="Nombre de tu empresa"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contacto-phone" className="block text-sm font-medium text-gray-700 mb-1.5">Teléfono</label>
                  <input
                    type="tel"
                    id="contacto-phone"
                    name="phone"
                    maxLength={30}
                    value={form?.phone ?? ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
                    placeholder="809-000-0000"
                  />
                </div>
                <div>
                  <label htmlFor="contacto-email" className="block text-sm font-medium text-gray-700 mb-1.5">Correo electrónico *</label>
                  <input
                    type="email"
                    id="contacto-email"
                    name="email"
                    maxLength={150}
                    value={form?.email ?? ''}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
                    placeholder="tu@empresa.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contacto-service" className="block text-sm font-medium text-gray-700 mb-1.5">Servicio de interés</label>
                <select
                  id="contacto-service"
                    name="service"
                  value={form?.service ?? ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all"
                >
                  <option value="">Selecciona un servicio</option>
                  {serviceOptions?.map?.((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="contacto-message" className="block text-sm font-medium text-gray-700 mb-1.5">Mensaje *</label>
                <textarea
                  id="contacto-message"
                    name="message"
                  maxLength={5000}
                  value={form?.message ?? ''}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all resize-none"
                  placeholder="Cuéntanos sobre tu proyecto o necesidad..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand text-white font-semibold rounded-lg hover:bg-brand-dark transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Enviando...' : 'Enviar mensaje'}
                <Send className="w-4 h-4" aria-hidden="true" />
              </button>
              <p className="text-xs text-gray-500 mt-2">Los datos proporcionados serán utilizados únicamente para atender tu solicitud.</p>
            </form>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200/70">
              <h3 className="font-display text-lg font-semibold text-gray-900 mb-1">Cedanet Solutions</h3>
              <p className="text-gray-600 text-sm mb-6">Soluciones tecnológicas integrales</p>

              <div className="space-y-4">
                <a href="tel:+18096279180" className="flex items-center gap-3 text-gray-700 hover:text-brand-dark transition-colors">
                  <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-brand" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Teléfono / WhatsApp</p>
                    <p className="font-medium">809-627-9180</p>
                  </div>
                </a>
                <a href="mailto:javis.cedano@cedanet.net" className="flex items-center gap-3 text-gray-700 hover:text-brand-dark transition-colors">
                  <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-brand" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium break-all">javis.cedano@cedanet.net</p>
                  </div>
                </a>
                <a href="https://instagram.com/cedanetsrd" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-brand-dark transition-colors">
                  <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-4 h-4 text-brand" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Instagram</p>
                    <p className="font-medium">@cedanetsrd</p>
                  </div>
                </a>
                <a href="https://www.cedanet.net" className="flex items-center gap-3 text-gray-700 hover:text-brand-dark transition-colors">
                  <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-4 h-4 text-brand" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Web</p>
                    <p className="font-medium">www.cedanet.net</p>
                  </div>
                </a>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/18096279180?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20los%20servicios%20de%20Cedanet%20Solutions."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-whatsapp text-white font-semibold rounded-xl hover:bg-whatsapp-dark transition-all shadow-md hover:shadow-lg"
            >
              <MessageCircle className="w-5 h-5" />
              Escríbenos por WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
