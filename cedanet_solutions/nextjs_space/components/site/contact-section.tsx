'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Send, MapPin, Phone, Mail, MessageCircle, Instagram, Globe } from 'lucide-react'
import { toast } from 'sonner'

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
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    service: '',
    message: '',
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
        setForm({ name: '', company: '', phone: '', email: '', service: '', message: '' })
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
    <section id="contacto" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#0097A7] text-sm font-semibold uppercase tracking-wider">Contáctanos</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mt-3">
            Hablemos de tu proyecto
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre *</label>
                  <input
                    type="text"
                    name="name"
                    value={form?.name ?? ''}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0097A7]/30 focus:border-[#0097A7] transition-all"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Empresa</label>
                  <input
                    type="text"
                    name="company"
                    value={form?.company ?? ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0097A7]/30 focus:border-[#0097A7] transition-all"
                    placeholder="Nombre de tu empresa"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Teléfono</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form?.phone ?? ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0097A7]/30 focus:border-[#0097A7] transition-all"
                    placeholder="809-000-0000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Correo electrónico *</label>
                  <input
                    type="email"
                    name="email"
                    value={form?.email ?? ''}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0097A7]/30 focus:border-[#0097A7] transition-all"
                    placeholder="tu@empresa.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Servicio de interés</label>
                <select
                  name="service"
                  value={form?.service ?? ''}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0097A7]/30 focus:border-[#0097A7] transition-all"
                >
                  <option value="">Selecciona un servicio</option>
                  {serviceOptions?.map?.((opt: string) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Mensaje *</label>
                <textarea
                  name="message"
                  value={form?.message ?? ''}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0097A7]/30 focus:border-[#0097A7] transition-all resize-none"
                  placeholder="Cuéntanos sobre tu proyecto o necesidad..."
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0097A7] text-white font-semibold rounded-lg hover:bg-[#00838F] transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Enviando...' : 'Enviar mensaje'}
                <Send className="w-4 h-4" />
              </button>
              <p className="text-xs text-gray-400 mt-2">Los datos proporcionados serán utilizados únicamente para atender tu solicitud.</p>
            </form>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-display text-lg font-semibold text-gray-900 mb-1">Cedanet Solutions</h3>
              <p className="text-gray-500 text-sm mb-6">Soluciones tecnológicas integrales</p>

              <div className="space-y-4">
                <a href="tel:+18096279180" className="flex items-center gap-3 text-gray-700 hover:text-[#0097A7] transition-colors">
                  <div className="w-10 h-10 bg-[#0097A7]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-[#0097A7]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Teléfono / WhatsApp</p>
                    <p className="font-medium">809-627-9180</p>
                  </div>
                </a>
                <a href={mounted ? 'mailto:javis.cedano@cedanet.net' : '#'} className="flex items-center gap-3 text-gray-700 hover:text-[#0097A7] transition-colors" suppressHydrationWarning>
                  <div className="w-10 h-10 bg-[#0097A7]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-[#0097A7]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="font-medium" suppressHydrationWarning>{mounted ? 'javis.cedano@cedanet.net' : ''}</p>
                  </div>
                </a>
                <a href="https://instagram.com/cedanetrd" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-700 hover:text-[#0097A7] transition-colors">
                  <div className="w-10 h-10 bg-[#0097A7]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Instagram className="w-4 h-4 text-[#0097A7]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Instagram</p>
                    <p className="font-medium">@cedanetrd</p>
                  </div>
                </a>
                <div className="flex items-center gap-3 text-[#0097A7]">
                  <div className="w-10 h-10 bg-[#0097A7]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Globe className="w-4 h-4 text-[#0097A7]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Web</p>
                    <p className="font-medium text-gray-700">cedanet.net</p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/18096279180?text=Hola%2C%20me%20interesa%20conocer%20m%C3%A1s%20sobre%20los%20servicios%20de%20Cedanet%20Solutions."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-[#25D366] text-white font-semibold rounded-xl hover:bg-[#1EBE57] transition-all shadow-md hover:shadow-lg"
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
