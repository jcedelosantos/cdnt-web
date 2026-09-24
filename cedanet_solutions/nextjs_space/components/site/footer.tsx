'use client'

import Image from 'next/image'
import { Phone, Mail, Instagram, Globe } from 'lucide-react'
import { useState, useEffect } from 'react'

const quickLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
]

const mainServices = [
  'Redes e infraestructura',
  'Firewall y seguridad',
  'CCTV y videovigilancia',
  'Telefonía IP',
  'WiFi empresarial',
  'Soporte técnico',
]

export function Footer() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])

  const email = mounted ? 'javis.cedano@cedanet.net' : ''

  return (
    <footer className="bg-[#0a1628] text-gray-400 py-16" suppressHydrationWarning>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="relative w-[150px] h-[47px] mb-4">
              <Image
                src="/assets/logo.png"
                alt="Cedanet Solutions"
                fill
                className="object-contain brightness-0 invert"
              />
            </div>
            <p className="text-sm leading-relaxed">
              Soluciones tecnológicas integrales para empresas. Diseñamos, implementamos
              y administramos infraestructuras seguras y escalables.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2.5">
              {quickLinks?.map?.((link: any) => (
                <li key={link?.href}>
                  <a href={link?.href} className="text-sm hover:text-[#4DD0E1] transition-colors">
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2.5">
              {mainServices?.map?.((svc: string) => (
                <li key={svc}>
                  <span className="text-sm">{svc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <div className="space-y-3">
              <a href="tel:+18096279180" className="flex items-center gap-2 text-sm hover:text-[#4DD0E1] transition-colors">
                <Phone className="w-4 h-4" /> 809-627-9180
              </a>
              <a href={mounted ? 'mailto:javis.cedano@cedanet.net' : '#'} className="flex items-center gap-2 text-sm hover:text-[#4DD0E1] transition-colors" suppressHydrationWarning>
                <Mail className="w-4 h-4" /> <span suppressHydrationWarning>{email}</span>
              </a>
              <a href="https://instagram.com/cedanetrd" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-[#4DD0E1] transition-colors">
                <Instagram className="w-4 h-4" /> @cedanetrd
              </a>
              <span className="flex items-center gap-2 text-sm text-[#4DD0E1]">
                <Globe className="w-4 h-4" /> cedanet.net
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-sm">© 2026 Cedanet Solutions. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
