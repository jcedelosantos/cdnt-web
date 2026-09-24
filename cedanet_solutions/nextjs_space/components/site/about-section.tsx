'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Cpu, Headphones, TrendingUp, ShieldCheck } from 'lucide-react'
import { SectionHeader } from './section-header'

const highlights = [
  { icon: Cpu, title: 'Implementación profesional', desc: 'Soluciones técnicas planificadas y ejecutadas con los más altos estándares de calidad.' },
  { icon: Headphones, title: 'Soporte técnico especializado', desc: 'Asistencia técnica dedicada para mantener tu operación funcionando sin interrupciones.' },
  { icon: TrendingUp, title: 'Soluciones escalables', desc: 'Infraestructuras diseñadas para crecer junto con tu negocio, sin comprometer rendimiento.' },
  { icon: ShieldCheck, title: 'Seguridad y continuidad', desc: 'Protección integral y planes de continuidad para la estabilidad operativa de tu empresa.' },
]

export function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="nosotros" className="py-20 md:py-28 bg-white scroll-mt-16" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Quiénes somos"
          title="Sobre Cedanet Solutions"
          description="Cedanet Solutions es una empresa especializada en soluciones tecnológicas integrales, enfocada en ayudar a empresas y organizaciones a optimizar su infraestructura, mejorar la seguridad, garantizar la conectividad y simplificar la operación de sus sistemas tecnológicos. Combinamos experiencia técnica, atención personalizada y soluciones adaptadas a las necesidades reales de cada cliente."
          inView={inView}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-gray-50 rounded-2xl p-6 border border-transparent hover:border-brand/20 hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 bg-brand/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-brand group-hover:text-white text-brand-dark transition-colors">
                <Icon className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
