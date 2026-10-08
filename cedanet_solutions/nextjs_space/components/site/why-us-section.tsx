'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { SectionHeader } from './section-header'
import { Target, Calculator, ClipboardCheck, Users, LifeBuoy, Layers } from 'lucide-react'

const reasons = [
  { icon: Target, text: 'Empezamos por lo que le cuesta tiempo o dinero a tu negocio, no por el equipo' },
  { icon: Layers, text: 'Red y software de la misma empresa: nadie te dice "eso es del otro proveedor"' },
  { icon: Calculator, text: 'Precio claro en pesos antes de empezar, con estimador en línea' },
  { icon: ClipboardCheck, text: 'Todo rotulado y documentado, para que tu operación no dependa de nadie' },
  { icon: LifeBuoy, text: 'Soporte local en español, con cuota fija si lo prefieres' },
  { icon: Users, text: 'Te acompañamos antes, durante y después, midiendo resultados' },
]

export function WhyUsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-20 md:py-28 bg-brand-50" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Nuestras fortalezas" title="Por qué elegir Cedanet Solutions" inView={inView} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map(({ icon: Icon, text }, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-start gap-4 bg-white rounded-2xl p-6 border border-brand/10 shadow-sm hover:shadow-md hover:border-brand/30 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-11 h-11 bg-brand/10 rounded-xl flex items-center justify-center">
                <Icon className="w-5 h-5 text-brand-dark" aria-hidden="true" />
              </div>
              <p className="text-gray-800 font-medium leading-relaxed pt-2">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
