'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
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
    <section id="proceso" className="py-20 md:py-28 bg-gray-50" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#0097A7] text-sm font-semibold uppercase tracking-wider">Cómo trabajamos</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mt-3">
            Nuestro proceso
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line - desktop */}
          <div className="hidden lg:block absolute top-[52px] left-0 right-0 h-0.5 bg-[#0097A7]/20" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps?.map?.((step: any, i: number) => {
              const Icon = step?.icon
              return (
                <motion.div
                  key={step?.number ?? i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="relative text-center"
                >
                  <div className="relative z-10 w-[72px] h-[72px] mx-auto bg-white border-2 border-[#0097A7]/20 rounded-full flex items-center justify-center mb-5 shadow-sm">
                    {Icon && <Icon className="w-7 h-7 text-[#0097A7]" />}
                  </div>
                  <span className="text-[#0097A7] font-mono text-xs font-bold">{step?.number}</span>
                  <h3 className="font-display text-base font-semibold text-gray-900 mt-1 mb-2">{step?.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step?.desc}</p>
                </motion.div>
              )
            }) ?? []}
          </div>
        </div>
      </div>
    </section>
  )
}
