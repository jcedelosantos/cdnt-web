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
    desc: 'Una red ordenada que no se cae y que cualquier técnico entiende, con cada punto rotulado y documentado. Cableado estructurado, racks, switches y segmentación.',
    image: '/illustrations/redes.svg',
  },
  {
    icon: Shield,
    title: 'Firewall y seguridad perimetral',
    desc: 'Que un virus o un clic equivocado no te detenga la caja ni exponga tus datos. Firewall, VPN, filtrado web y reglas de seguridad administradas.',
    image: '/illustrations/firewall.svg',
  },
  {
    icon: Camera,
    title: 'CCTV y videovigilancia',
    desc: 'Mira tu negocio desde el celular y ten la prueba cuando algo pase. Cámaras, grabadores y cobertura diseñada para comercios, empresas y hogares.',
    image: '/illustrations/cctv.svg',
  },
  {
    icon: Phone,
    title: 'Telefonía IP',
    desc: 'Que ninguna llamada de un cliente se quede sin contestar, con desvío al celular y grabación. Centrales IP, extensiones, troncales SIP y teléfonos IP.',
    image: '/illustrations/telefonia.svg',
  },
  {
    icon: Wifi,
    title: 'WiFi empresarial',
    desc: 'WiFi que llega a todas las mesas y oficinas, con la red de clientes separada de la de tu caja. Cobertura medida, portal de invitados y roaming.',
    image: '/illustrations/wifi.svg',
  },
  {
    icon: Wrench,
    title: 'Soporte técnico y mantenimiento',
    desc: 'Tu departamento de TI por una cuota fija al mes, sin sorpresas ni emergencias. Mantenimiento preventivo, monitoreo y asistencia en sitio o remota.',
    image: '/illustrations/soporte.svg',
  },
  {
    icon: Server,
    title: 'Servidores y soluciones cloud',
    desc: 'Si se daña un equipo, tu información sigue ahí y vuelves a trabajar en horas, no en días. Servidores, virtualización, respaldos y nube.',
    image: '/illustrations/servidores.svg',
  },
  {
    icon: Bot,
    title: 'Automatización tecnológica',
    desc: 'Lo que tu equipo hace a mano todos los días, que lo haga el sistema. Integración de herramientas, procesos automáticos e inteligencia artificial.',
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
