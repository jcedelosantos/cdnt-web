'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { SectionHeader } from './section-header'

const projects = [
  { title: 'Organización y rediseño de racks', image: '/illustrations/racks.svg' },
  { title: 'Segmentación de redes corporativas', image: '/illustrations/segmentacion.svg' },
  { title: 'Implementación de firewalls', image: '/illustrations/firewall.svg' },
  { title: 'Instalación de cámaras de seguridad', image: '/illustrations/cctv.svg' },
  { title: 'Redes WiFi empresariales', image: '/illustrations/wifi.svg' },
  { title: 'Telefonía IP y comunicaciones', image: '/illustrations/telefonia.svg' },
  { title: 'Soporte tecnológico para empresas', image: '/illustrations/soporte.svg' },
  { title: 'Infraestructura para oficinas e instituciones', image: '/illustrations/oficinas.svg' },
]

export function ProjectsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="proyectos" className="py-20 md:py-28 bg-white scroll-mt-16" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Portafolio" title="Soluciones que implementamos" inView={inView} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:auto-rows-[220px] gap-5">
          {projects.map(({ title, image }, i) => (
            <motion.figure
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className={`group relative rounded-2xl overflow-hidden bg-gray-200 ${
                [0, 3, 4, 7].includes(i) ? 'aspect-[4/3] sm:aspect-auto sm:col-span-2' : 'aspect-[4/3] sm:aspect-auto'
              }`}
            >
              <Image
                src={image}
                alt=""
                fill
                unoptimized
                sizes="(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/40 to-transparent" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-5">
                <span className="block h-0.5 w-8 bg-brand-light mb-3 group-hover:w-14 transition-all duration-300" aria-hidden="true" />
                <h3 className="text-white font-semibold leading-snug">{title}</h3>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
