'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Network, Shield, Camera, Wifi, Phone, Server } from 'lucide-react'

const highlights = [
  { icon: Network, label: 'Redes' },
  { icon: Shield, label: 'Firewall' },
  { icon: Camera, label: 'CCTV' },
  { icon: Wifi, label: 'WiFi' },
  { icon: Phone, label: 'Telefonía IP' },
  { icon: Server, label: 'Servidores' },
]

export function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-[100svh] flex items-center overflow-hidden bg-navy">
      <div className="absolute inset-0">
        <Image
          src="/illustrations/hero-red.svg"
          alt=""
          fill
          unoptimized
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />
        {/* Cuadrícula sutil de fondo */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 30% 50%, #000 40%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 30% 50%, #000 40%, transparent 100%)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 md:pt-40 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/20 border border-brand/40 rounded-full text-brand-light text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-brand-light rounded-full animate-pulse" aria-hidden="true" />
            Soluciones tecnológicas integrales
          </div>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
            Soluciones tecnológicas integrales para empresas{' '}
            <span className="bg-gradient-to-r from-brand-light to-brand bg-clip-text text-transparent">
              modernas
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed mb-10 max-w-xl">
            En Cedanet Solutions diseñamos, implementamos y administramos infraestructuras
            tecnológicas seguras, eficientes y escalables para redes, seguridad, comunicaciones,
            CCTV, soporte técnico y automatización empresarial.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contacto"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-brand text-white font-semibold rounded-lg hover:bg-brand-dark transition-all shadow-lg shadow-brand/20 hover:shadow-xl hover:shadow-brand/30"
            >
              Solicitar cotización
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border border-white/20 hover:bg-white/20 transition-all"
            >
              Ver servicios
            </a>
          </div>

          <ul className="mt-12 flex flex-wrap gap-2" aria-label="Áreas de servicio">
            {highlights.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-200"
              >
                <Icon className="w-4 h-4 text-brand-light" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.a
        href="#nosotros"
        aria-label="Bajar a la siguiente sección"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 p-2 text-white/60 hover:text-white transition-colors"
      >
        <ChevronDown className="w-6 h-6 animate-bounce motion-reduce:animate-none" aria-hidden="true" />
      </motion.a>
    </section>
  )
}
