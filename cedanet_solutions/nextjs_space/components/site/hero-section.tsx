'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'

export function HeroSection() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView?.({ behavior: 'smooth' })
  }

  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/assets/01_hero_server_room.jpg"
          alt="Sala de servidores moderna Cedanet Solutions"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1628]/90 via-[#0a1628]/75 to-[#0a1628]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0097A7]/20 border border-[#0097A7]/30 rounded-full text-[#4DD0E1] text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-[#4DD0E1] rounded-full animate-pulse" />
            Soluciones tecnológicas integrales
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
            Soluciones tecnológicas integrales para empresas{' '}
            <span className="text-[#4DD0E1]">modernas</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10 max-w-xl">
            En Cedanet Solutions diseñamos, implementamos y administramos infraestructuras
            tecnológicas seguras, eficientes y escalables para redes, seguridad, comunicaciones,
            CCTV, soporte técnico y automatización empresarial.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => scrollTo('#contacto')}
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#0097A7] text-white font-semibold rounded-lg hover:bg-[#00838F] transition-all shadow-lg hover:shadow-xl hover:shadow-[#0097A7]/20"
            >
              Solicitar cotización
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => scrollTo('#servicios')}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all"
            >
              Ver servicios
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <button onClick={() => scrollTo('#nosotros')} className="text-white/60 hover:text-white transition-colors">
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </button>
      </motion.div>
    </section>
  )
}
