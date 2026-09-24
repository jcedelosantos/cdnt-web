'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { SectionHeader } from './section-header'
import { Search, PenTool, Settings, FileText, HeadphonesIcon } from 'lucide-react'

const steps = [
  { icon: Search, number: '01', title: 'Evaluación inicial', desc: 'Analizamos la necesidad, infraestructura actual y objetivos del cliente.' },
  { icon: PenTool, number: '02', title: 'Diseño de solución', desc: 'Creamos una propuesta técnica adaptada al entorno y presupuesto.' },
  { icon: Settings, number: '03', title: 'Implementación', desc: 'Instalamos, configuramos y ponemos en marcha la solución.' },
  { icon: FileText, number: '04', title: 'Documentación y entrega', desc: 'Entregamos detalles técnicos, diagramas, accesos y recomendaciones.' },
  { icon: HeadphonesIcon, number: '05', title: 'Soporte continuo', desc: 'Acompañamos al cliente con mantenimiento, mejoras y asistencia técnica.' },
]

export function ProcessSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="proceso" className="py-20 md:py-28 bg-gray-50 scroll-mt-16" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Cómo trabajamos" title="Nuestro proceso" inView={inView} />

        <div className="relative">
          <div className="hidden lg:block absolute top-9 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-brand/10 via-brand/40 to-brand/10" aria-hidden="true" />

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map(({ icon: Icon, number, title, desc }, i) => (
              <motion.li
                key={number}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative text-center"
              >
                <div className="relative z-10 w-[72px] h-[72px] mx-auto bg-white border-2 border-brand/30 rounded-2xl rotate-45 flex items-center justify-center mb-6 shadow-sm">
                  <Icon className="w-7 h-7 text-brand-dark -rotate-45" aria-hidden="true" />
                </div>
                <span className="text-brand-dark font-mono text-xs font-bold">Paso {number}</span>
                <h3 className="font-display text-base font-semibold text-gray-900 mt-1 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
