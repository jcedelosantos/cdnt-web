'use client'

import Image from 'next/image'
import { Phone, Mail, Instagram, Globe } from 'lucide-react'

const quickLinks = [
  { label: 'Inicio', href: '/#inicio' },
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Productos', href: '/#productos' },
  { label: 'Nosotros', href: '/#nosotros' },
  { label: 'Contacto', href: '/#contacto' },
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
  return (
    <footer className="bg-navy text-gray-300 py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="relative w-[150px] h-[47px] mb-4">
              <Image
                src="/assets/logo.png"
                alt="Cedanet Solutions"
                fill
                sizes="150px"
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
            <h3 className="text-white font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2.5">
              {quickLinks?.map?.((link: any) => (
                <li key={link?.href}>
                  <a href={link?.href} className="text-sm hover:text-brand-light transition-colors">
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2.5">
              {mainServices?.map?.((svc: string) => (
                <li key={svc}>
                  <a href="/#servicios" className="text-sm hover:text-brand-light transition-colors">{svc}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <a href="tel:+18096279180" className="flex items-center gap-2 text-sm hover:text-brand-light transition-colors">
                <Phone className="w-4 h-4" aria-hidden="true" /> 809-627-9180
              </a>
              <a href="mailto:javis.cedano@cedanet.net" className="flex items-center gap-2 text-sm hover:text-brand-light transition-colors">
                <Mail className="w-4 h-4" aria-hidden="true" /> <span className="break-all">javis.cedano@cedanet.net</span>
              </a>
              <a href="https://instagram.com/cedanetsrd" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-brand-light transition-colors">
                <Instagram className="w-4 h-4" aria-hidden="true" /> @cedanetsrd
              </a>
              <a href="https://www.cedanet.net" className="flex items-center gap-2 text-sm text-brand-light hover:text-white transition-colors">
                <Globe className="w-4 h-4" aria-hidden="true" /> www.cedanet.net
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Cedanet Solutions. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
