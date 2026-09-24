'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Cpu, Headphones, TrendingUp, ShieldCheck } from 'lucide-react'

const highlights = [
  { icon: Cpu, title: 'Implementación profesional', desc: 'Soluciones técnicas planificadas y ejecutadas con los más altos estándares de calidad.' },
  { icon: Headphones, title: 'Soporte técnico especializado', desc: 'Asistencia técnica dedicada para mantener tu operación funcionando sin interrupciones.' },
  { icon: TrendingUp, title: 'Soluciones escalables', desc: 'Infraestructuras diseñadas para crecer junto con tu negocio, sin comprometer rendimiento.' },
  { icon: ShieldCheck, title: 'Seguridad y continuidad', desc: 'Protección integral y planes de continuidad para la estabilidad operativa de tu empresa.' },
]

export function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="nosotros" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <span className="text-[#0097A7] text-sm font-semibold uppercase tracking-wider">Quiénes somos</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mt-3 mb-6">
            Sobre Cedanet Solutions
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Cedanet Solutions es una empresa especializada en soluciones tecnológicas integrales, enfocada en ayudar a empresas
            y organizaciones a optimizar su infraestructura, mejorar la seguridad, garantizar la conectividad y simplificar la
            operación de sus sistemas tecnológicos. Combinamos experiencia técnica, atención personalizada y soluciones adaptadas
            a las necesidades reales de cada cliente.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights?.map?.((item: any, i: number) => {
            const Icon = item?.icon
            return (
              <motion.div
                key={item?.title ?? i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-gray-50 rounded-xl p-6 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-[#0097A7]/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#0097A7]/20 transition-colors">
                  {Icon && <Icon className="w-6 h-6 text-[#0097A7]" />}
                </div>
                <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">{item?.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item?.desc}</p>
              </motion.div>
            )
          }) ?? []}
        </div>
      </div>
    </section>
  )
}
