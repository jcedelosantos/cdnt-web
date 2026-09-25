import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { estimadorActivo } from '@/lib/features'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { WhatsAppButton } from '@/components/site/whatsapp-button'
import { EstimadorHub } from '@/components/site/estimador-hub'

export const metadata: Metadata = {
  title: 'Estimador de precios | Cedanet Solutions',
  description:
    'Calcula en un minuto cuánto costaría tu proyecto de cámaras de seguridad y otras soluciones tecnológicas en República Dominicana.',
  alternates: { canonical: '/estimador' },
}

export default function EstimadorPage() {
  if (!estimadorActivo) notFound()
  return (
    <main id="contenido" className="min-h-screen bg-gray-50">
      <Header />
      <section className="relative bg-navy pt-32 pb-40 md:pt-40 md:pb-48 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        <div aria-hidden="true" className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand/20 blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/20 border border-brand/40 rounded-full text-brand-light text-sm font-medium mb-6">
            Estimador en línea
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
            ¿Cuánto costaría tu <span className="text-brand-light">proyecto</span>?
          </h1>
          <p className="mt-5 text-lg text-gray-300">
            Elige el área, responde unas preguntas y recibe un rango de precio al instante. Sin compromiso.
          </p>
        </div>
      </section>
      <section className="relative -mt-28 md:-mt-32 pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <EstimadorHub />
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
