'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ArrowRight } from 'lucide-react'

export function CtaSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-br from-navy via-navy-800 to-navy-700" ref={ref}>
      <div aria-hidden="true" className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand/20 blur-3xl" />
      <div aria-hidden="true" className="absolute -bottom-32 -left-24 w-96 h-96 rounded-full bg-brand-light/10 blur-3xl" />
      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-6">
            ¿Necesitas mejorar la infraestructura{' '}
            <span className="text-brand-light">tecnológica</span> de tu empresa?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            En Cedanet Solutions podemos ayudarte a diseñar, implementar y administrar una solución
            segura, moderna y eficiente.
          </p>
          <a
            href="#contacto"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-brand text-white font-semibold text-lg rounded-lg hover:bg-brand-dark transition-all shadow-lg hover:shadow-xl hover:shadow-brand/30"
          >
            Solicitar evaluación técnica
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
