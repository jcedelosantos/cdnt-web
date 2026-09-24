'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight } from 'lucide-react'

export function CtaSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView?.({ behavior: 'smooth' })
  }

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-[#0a1628] via-[#0d2137] to-[#0a2a3a]" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
            ¿Necesitas mejorar la infraestructura{' '}
            <span className="text-[#4DD0E1]">tecnológica</span> de tu empresa?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            En Cedanet Solutions podemos ayudarte a diseñar, implementar y administrar una solución
            segura, moderna y eficiente.
          </p>
          <button
            onClick={() => scrollTo('#contacto')}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-[#0097A7] text-white font-semibold text-lg rounded-lg hover:bg-[#00838F] transition-all shadow-lg hover:shadow-xl hover:shadow-[#0097A7]/30"
          >
            Solicitar evaluación técnica
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
