'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { estimadorActivo } from '@/lib/features'

const todosLosEnlaces = [
  { label: 'Inicio', href: '/#inicio' },
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Nosotros', href: '/#nosotros' },
  { label: 'Proyectos', href: '/#proyectos' },
  { label: 'Proceso', href: '/#proceso' },
  { label: 'Estimar CCTV', href: '/estimador' },
  { label: 'Contacto', href: '/#contacto' },
]
const navLinks = todosLosEnlaces.filter((l) => estimadorActivo || l.href !== '/estimador')

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || mobileOpen

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-gray-900 focus:rounded-lg focus:shadow"
      >
        Saltar al contenido
      </a>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="/#inicio" className="flex-shrink-0" aria-label="Cedanet Solutions, ir al inicio">
            <div className="relative w-[150px] h-[46px] md:w-[180px] md:h-[56px]">
              <Image
                src="/assets/logo.png"
                alt="Cedanet Solutions"
                fill
                sizes="180px"
                className={`object-contain transition-[filter] duration-300 ${solid ? '' : 'brightness-0 invert'}`}
                priority
              />
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Principal">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  solid
                    ? 'text-gray-700 hover:text-brand-dark hover:bg-brand/5'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/#contacto"
              className="ml-3 px-5 py-2.5 bg-brand text-white text-sm font-semibold rounded-lg hover:bg-brand-dark transition-colors shadow-md hover:shadow-lg"
            >
              Solicitar cotización
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="lg:hidden p-2 rounded-lg"
            aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileOpen}
            aria-controls="menu-movil"
          >
            {mobileOpen ? (
              <X className="w-6 h-6 text-gray-800" />
            ) : (
              <Menu className={`w-6 h-6 ${solid ? 'text-gray-800' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="menu-movil"
            aria-label="Principal"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t shadow-lg overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:text-brand-dark hover:bg-brand/5 rounded-lg transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/#contacto"
                onClick={() => setMobileOpen(false)}
                className="block text-center mt-2 px-5 py-3 bg-brand text-white font-semibold rounded-lg hover:bg-brand-dark transition-colors"
              >
                Solicitar cotización
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
