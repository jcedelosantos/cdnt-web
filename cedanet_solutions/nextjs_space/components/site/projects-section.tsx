'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const projects = [
  { title: 'Organización y rediseño de racks', image: '/assets/racks-organizados.jpg' },
  { title: 'Segmentación de redes corporativas', image: '/assets/segmentacion-redes.png' },
  { title: 'Implementación de firewalls', image: '/assets/projects/firewall-hardware.jpg' },
  { title: 'Instalación de cámaras de seguridad', image: '/assets/projects/cctv-cameras.jpg' },
  { title: 'Redes WiFi empresariales', image: '/assets/projects/wifi-access-points.jpg' },
  { title: 'Telefonía IP y comunicaciones', image: '/assets/projects/voip-pbx-system.jpg' },
  { title: 'Soporte tecnológico para empresas', image: '/assets/projects/it-technician-working.jpg' },
  { title: 'Infraestructura para oficinas e instituciones', image: '/assets/infraestructura-oficinas.jpg' },
]

export function ProjectsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="proyectos" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#0097A7] text-sm font-semibold uppercase tracking-wider">Portafolio</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mt-3">
            Soluciones que implementamos
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {projects?.map?.((proj: any, i: number) => (
            <motion.div
              key={proj?.title ?? i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-200"
            >
              <Image
                src={proj?.image ?? ''}
                alt={proj?.title ?? 'Proyecto'}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-semibold text-sm leading-snug">{proj?.title}</h3>
              </div>
            </motion.div>
          )) ?? []}
        </div>
      </div>
    </section>
  )
}
