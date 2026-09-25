'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { SectionHeader } from './section-header'
import { estimadorActivo } from '@/lib/features'
import {
  Network, Shield, Camera, Phone, Wifi, Wrench, Server, Bot
} from 'lucide-react'

const services = [
  {
    icon: Network,
    title: 'Redes e infraestructura',
    desc: 'Diseño, instalación y certificación de cableado estructurado, racks, gabinetes, patch panels, switches, VLANs y segmentación de red.',
    image: '/illustrations/redes.svg',
  },
  {
    icon: Shield,
    title: 'Firewall y seguridad perimetral',
    desc: 'Implementación y administración de firewalls, políticas de seguridad, VPN, control de tráfico, filtrado web y segmentación segura.',
    image: '/illustrations/firewall.svg',
  },
  {
    icon: Camera,
    title: 'CCTV y videovigilancia',
    desc: 'Instalación de cámaras de seguridad, NVR, DVR, monitoreo, configuración remota y diseño de cobertura para hogares, comercios y empresas.',
    image: '/illustrations/cctv.svg',
  },
  {
    icon: Phone,
    title: 'Telefonía IP',
    desc: 'Configuración de centrales telefónicas IP, extensiones, troncales SIP, teléfonos IP, grabación de llamadas y soluciones de comunicación empresarial.',
    image: '/illustrations/telefonia.svg',
  },
  {
    icon: Wifi,
    title: 'WiFi empresarial',
    desc: 'Implementación de redes inalámbricas profesionales, control de acceso, portal cautivo, roaming, cobertura optimizada y redes para clientes e invitados.',
    image: '/illustrations/wifi.svg',
  },
  {
    icon: Wrench,
    title: 'Soporte técnico y mantenimiento',
    desc: 'Soporte preventivo y correctivo, monitoreo, administración de equipos, mantenimiento de sistemas y asistencia técnica en sitio o remota.',
    image: '/illustrations/soporte.svg',
  },
  {
    icon: Server,
    title: 'Servidores y soluciones cloud',
    desc: 'Configuración de servidores físicos, virtualización, almacenamiento, backups, servicios cloud y continuidad operativa.',
    image: '/illustrations/servidores.svg',
  },
  {
    icon: Bot,
    title: 'Automatización tecnológica',
    desc: 'Integración de herramientas digitales, procesos automatizados, monitoreo inteligente y soluciones con inteligencia artificial para mejorar la operación empresarial.',
    image: '/illustrations/automatizacion.svg',
  },
]

export function ServicesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="servicios" className="py-20 md:py-28 bg-gray-50 scroll-mt-16" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Lo que hacemos"
          title="Nuestros servicios"
          inView={inView}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(({ icon, title, desc, image }, i) => {
            const Icon = icon
            return (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200/70 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-brand/30 transition-all duration-300"
            >
              <div className="relative aspect-[16/10] bg-gray-200 overflow-hidden">
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 w-11 h-11 bg-brand rounded-xl flex items-center justify-center shadow-lg">
                  <Icon className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
              </div>
              <div className="flex-1 p-5">
                <h3 className="font-display text-base font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                {estimadorActivo && icon === Camera && (
                  <a href="/estimador" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-dark hover:underline">
                    Calcular precio en línea <span aria-hidden="true">→</span>
                  </a>
                )}
              </div>
              <div className="h-1 w-0 bg-gradient-to-r from-brand to-brand-light group-hover:w-full transition-all duration-500" aria-hidden="true" />
            </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
