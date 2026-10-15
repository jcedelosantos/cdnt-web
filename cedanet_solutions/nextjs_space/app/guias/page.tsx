import type { Metadata } from 'next'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { WhatsAppButton } from '@/components/site/whatsapp-button'
import { GUIAS } from '@/lib/guias'

export const metadata: Metadata = {
  title: 'Guías: menú QR, beeper digital y entradas con QR | Cedanet',
  description:
    'Guías prácticas sobre menú QR para restaurantes, beeper digital, entradas con QR para eventos y solicitudes de pacientes por QR en República Dominicana.',
  alternates: { canonical: '/guias' },
}

export default function GuiasPage() {
  return (
    <main id="contenido" className="min-h-screen bg-white">
      <Header />
      <section className="bg-navy pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">Guías</h1>
          <p className="mt-5 text-lg text-gray-300">
            Cómo funcionan, para quién sirven y cuánto cuestan en República Dominicana las soluciones con QR que
            desarrollamos.
          </p>
        </div>
      </section>
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <ul className="space-y-6">
          {GUIAS.map((g) => (
            <li key={g.slug} className="rounded-2xl border border-gray-200 p-6 hover:border-brand transition-colors">
              <a href={`/guias/${g.slug}`} className="block">
                <span className="text-sm font-medium text-brand">{g.producto}</span>
                <h2 className="mt-1 font-display text-xl font-bold text-navy">{g.titulo}</h2>
                <p className="mt-2 text-gray-600">{g.descripcion}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
