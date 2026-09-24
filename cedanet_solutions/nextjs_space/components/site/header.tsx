'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Soporte', href: '#proceso' },
  { label: 'Contacto', href: '#contacto' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView?.({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#inicio" className="flex-shrink-0">
            <div className="relative w-[160px] h-[50px] md:w-[180px] md:h-[56px]">
              <Image
                src="/assets/logo.png"
                alt="Cedanet Solutions - Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks?.map?.((link: any) => (
              <button
                key={link?.href}
                onClick={() => handleNavClick(link?.href)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  scrolled
                    ? 'text-gray-700 hover:text-[#0097A7] hover:bg-[#0097A7]/5'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {link?.label}
              </button>
            )) ?? []}
            <button
              onClick={() => handleNavClick('#contacto')}
              className="ml-3 px-5 py-2.5 bg-[#0097A7] text-white text-sm font-semibold rounded-lg hover:bg-[#00838F] transition-colors shadow-md hover:shadow-lg"
            >
              Solicitar cotización
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg"
            aria-label="Abrir menú"
          >
            {mobileOpen ? (
              <X className={`w-6 h-6 ${scrolled ? 'text-gray-800' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${scrolled ? 'text-gray-800' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t shadow-lg overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks?.map?.((link: any) => (
                <button
                  key={link?.href}
                  onClick={() => handleNavClick(link?.href)}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:text-[#0097A7] hover:bg-[#0097A7]/5 rounded-lg transition-colors font-medium"
                >
                  {link?.label}
                </button>
              )) ?? []}
              <button
                onClick={() => handleNavClick('#contacto')}
                className="w-full mt-2 px-5 py-3 bg-[#0097A7] text-white font-semibold rounded-lg hover:bg-[#00838F] transition-colors"
              >
                Solicitar cotización
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
