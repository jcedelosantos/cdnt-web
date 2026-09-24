'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import {
  Network, Shield, Camera, Phone, Wifi, Wrench, Server, Bot
} from 'lucide-react'

const services = [
  {
    icon: Network,
    title: 'Redes e infraestructura',
    desc: 'Diseño, instalación y certificación de cableado estructurado, racks, gabinetes, patch panels, switches, VLANs y segmentación de red.',
    image: '/assets/02_network_cabling.jpg',
  },
  {
    icon: Shield,
    title: 'Firewall y seguridad perimetral',
    desc: 'Implementación y administración de firewalls, políticas de seguridad, VPN, control de tráfico, filtrado web y segmentación segura.',
    image: '/assets/03_cybersecurity_shield.jpg',
  },
  {
    icon: Camera,
    title: 'CCTV y videovigilancia',
    desc: 'Instalación de cámaras de seguridad, NVR, DVR, monitoreo, configuración remota y diseño de cobertura para hogares, comercios y empresas.',
    image: '/assets/04_cctv_cameras.webp',
  },
  {
    icon: Phone,
    title: 'Telefonía IP',
    desc: 'Configuración de centrales telefónicas IP, extensiones, troncales SIP, teléfonos IP, grabación de llamadas y soluciones de comunicación empresarial.',
    image: '/assets/05_ip_phone.jpg',
  },
  {
    icon: Wifi,
    title: 'WiFi empresarial',
    desc: 'Implementación de redes inalámbricas profesionales, control de acceso, portal cautivo, roaming, cobertura optimizada y redes para clientes e invitados.',
    image: '/assets/06_enterprise_wifi.jpg',
  },
  {
    icon: Wrench,
    title: 'Soporte técnico y mantenimiento',
    desc: 'Soporte preventivo y correctivo, monitoreo, administración de equipos, mantenimiento de sistemas y asistencia técnica en sitio o remota.',
    image: '/assets/soporte-tecnico.jpg',
  },
  {
    icon: Server,
    title: 'Servidores y soluciones cloud',
    desc: 'Configuración de servidores físicos, virtualización, almacenamiento, backups, servicios cloud y continuidad operativa.',
    image: '/assets/07_cloud_servers.jpg',
  },
  {
    icon: Bot,
    title: 'Automatización tecnológica',
    desc: 'Integración de herramientas digitales, procesos automatizados, monitoreo inteligente y soluciones con inteligencia artificial para mejorar la operación empresarial.',
    image: '/assets/08_automation_dashboard.jpg',
  },
]

export function ServicesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="servicios" className="py-20 md:py-28 bg-gray-50" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#0097A7] text-sm font-semibold uppercase tracking-wider">Lo que hacemos</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mt-3">
            Nuestros servicios
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services?.map?.((svc: any, i: number) => {
            const Icon = svc?.icon
            return (
              <motion.div
                key={svc?.title ?? i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-[16/10] bg-gray-200 overflow-hidden">
                  <Image
                    src={svc?.image ?? ''}
                    alt={svc?.title ?? 'Servicio'}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 w-10 h-10 bg-[#0097A7] rounded-lg flex items-center justify-center">
                    {Icon && <Icon className="w-5 h-5 text-white" />}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-base font-semibold text-gray-900 mb-2">{svc?.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{svc?.desc}</p>
                </div>
              </motion.div>
            )
          }) ?? []}
        </div>
      </div>
    </section>
  )
}
