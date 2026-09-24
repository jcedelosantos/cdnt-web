'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Target, Award, ClipboardCheck, Users, LifeBuoy, Rocket } from 'lucide-react'

const reasons = [
  { icon: Target, text: 'Soluciones diseñadas según la necesidad real del cliente' },
  { icon: Award, text: 'Experiencia en redes, seguridad, telefonía, CCTV y soporte' },
  { icon: ClipboardCheck, text: 'Implementaciones limpias, organizadas y documentadas' },
  { icon: Users, text: 'Acompañamiento antes, durante y después del proyecto' },
  { icon: LifeBuoy, text: 'Soporte técnico confiable' },
  { icon: Rocket, text: 'Enfoque en seguridad, estabilidad y crecimiento' },
]

export function WhyUsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="py-20 md:py-28 bg-[#f0f9fa]" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#0097A7] text-sm font-semibold uppercase tracking-wider">Nuestras fortalezas</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mt-3">
            Por qué elegir Cedanet Solutions
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons?.map?.((item: any, i: number) => {
            const Icon = item?.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start gap-4 bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex-shrink-0 w-11 h-11 bg-[#0097A7]/10 rounded-lg flex items-center justify-center">
                  {Icon && <Icon className="w-5 h-5 text-[#0097A7]" />}
                </div>
                <p className="text-gray-700 font-medium leading-relaxed pt-2">{item?.text}</p>
              </motion.div>
            )
          }) ?? []}
        </div>
      </div>
    </section>
  )
}
