'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'
import { SectionHeader } from './section-header'

// Software propio de Cedanet. Vive acá y no en "Servicios" porque no es un servicio que se cotiza:
// son productos con su propio sitio, su demo y sus términos.
//
// Las tarjetas solo PRESENTAN y mandan el clic. Cada producto ya tiene su landing con la copy
// completa (integ.cedanet.net); duplicarla acá crearía una segunda versión que se queda vieja.
//
// La línea `limite` de Hey! Rest y Hey! Med no es humildad ni relleno: es la cláusula de alcance que
// está en los términos de servicio de cada uno. Decirla desde el primer contacto es lo que evita que
// un cliente compre esperando un punto de venta o un sistema de llamado de enfermería.
const products = [
  {
    name: 'INTEG',
    tagline: 'Gestión de eventos con QR',
    sector: 'Eventos',
    anillo: 'ring-indigo-200 bg-indigo-50',
    desc: 'Vende y valida entradas, controla el acceso desde varias puertas a la vez y mira las ventas y la asistencia en tiempo real.',
    features: ['Entrada con QR al instante', 'Check-in simultáneo en varias puertas', 'Reportes de venta y asistencia'],
    limite: '',
    href: 'https://integ.cedanet.net/site-web',
    logo: '/productos/integ-logo.png',
  },
  {
    name: 'Hey! Rest',
    tagline: 'Atención en mesa, en tiempo real',
    sector: 'Restaurantes',
    anillo: 'ring-amber-200 bg-amber-50',
    desc: 'El comensal escanea el QR de su mesa y pide desde ahí. El personal lo ve en un tablero en vivo, con tiempos objetivo y reportería.',
    features: ['Pedidos de atención desde la mesa', 'Tablero en vivo para el personal', 'Encuesta de satisfacción'],
    limite: 'Complementa el punto de venta y al personal de servicio; no los sustituye.',
    href: 'https://integ.cedanet.net/hey-demo',
    logo: '/productos/hey-rest.png',
  },
  {
    name: 'Hey! Med',
    tagline: 'Atención al paciente, medida',
    sector: 'Centros de salud',
    anillo: 'ring-emerald-200 bg-emerald-50',
    desc: 'Desde la habitación, el paciente o su acompañante solicita servicios de hotelería, limpieza, mantenimiento o cafetería, y el personal los atiende desde un tablero.',
    features: ['Solicitudes no clínicas por QR', 'Tablero por departamento', 'Tiempos de respuesta medidos'],
    limite: 'Uso exclusivamente no clínico. No sustituye el llamado de enfermería ni ningún sistema de alerta médica.',
    href: 'https://integ.cedanet.net/hey-med',
    logo: '/productos/hey-med.png',
  },
]

export function ProductsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  return (
    <section id="productos" className="py-20 md:py-28 bg-white scroll-mt-16" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Lo que desarrollamos"
          title="Nuestro software"
          description="Además de la infraestructura, desarrollamos y operamos nuestras propias plataformas. Las mismas manos que montan la red sostienen el software que corre sobre ella."
          inView={inView}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(({ name, tagline, sector, anillo, desc, features, limite, href, logo }, i) => (
            <motion.article
              key={name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200/70 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-brand/30 transition-all duration-300"
            >
              <div className="flex-1 p-6">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className={`relative w-16 h-16 rounded-2xl p-1.5 ring-2 ${anillo}`}>
                    <div className="relative w-full h-full">
                      <Image src={logo} alt="" fill sizes="56px" className="object-contain rounded-xl" />
                    </div>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{sector}</span>
                </div>
                <h3 className="font-display text-xl font-bold text-gray-900">{name}</h3>
                <p className="text-brand-dark text-sm font-semibold mt-1">{tagline}</p>
                <p className="text-gray-600 text-sm leading-relaxed mt-3">{desc}</p>

                <ul className="mt-4 space-y-2">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {limite && <p className="mt-4 text-xs text-gray-500 leading-relaxed border-l-2 border-gray-200 pl-3">{limite}</p>}
              </div>

              <div className="px-6 pb-6">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand-dark hover:underline"
                >
                  Conocer {name} <span aria-hidden="true">→</span>
                </a>
              </div>

              <div className="h-1 w-0 bg-gradient-to-r from-brand to-brand-light group-hover:w-full transition-all duration-500" aria-hidden="true" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
