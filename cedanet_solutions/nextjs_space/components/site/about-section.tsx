'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Activity, Users, TrendingUp, Handshake } from 'lucide-react'
import { SectionHeader } from './section-header'

const highlights = [
  { icon: Activity, title: 'Más eficiencia', desc: 'Tu operación funciona sin interrupciones: menos caídas, menos llamadas perdidas y menos tiempo resolviendo problemas.' },
  { icon: Users, title: 'Mejor servicio', desc: 'Tus clientes son atendidos más rápido, con tiempos medidos en tableros en vivo con Hey! Rest, Hey! Bee, Hey! Med e INTEG.' },
  { icon: TrendingUp, title: 'Mejores resultados', desc: 'Más rotación, menos tareas repetitivas y menos equipos que reponer. La tecnología como una inversión que se paga.' },
  { icon: Handshake, title: 'Un solo responsable', desc: 'La misma empresa monta la red y hace el software que corre sobre ella. Respondemos por todo, aquí en RD.' },
]

export function AboutSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="nosotros" className="py-20 md:py-28 bg-white scroll-mt-16" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Quiénes somos"
          title="Sobre Cedanet Solutions"
          description="Trabajamos con restaurantes, comida rápida, clubes y eventos, centros de salud y oficinas que dependen de la tecnología pero no tienen un departamento de TI. Primero entendemos qué le cuesta tiempo o dinero a tu operación; después montamos la red y el software que lo resuelven, con precio claro en pesos antes de empezar."
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
