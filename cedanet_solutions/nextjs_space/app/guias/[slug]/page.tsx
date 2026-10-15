import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { WhatsAppButton } from '@/components/site/whatsapp-button'
import { GUIAS, guiaPorSlug } from '@/lib/guias'

type Props = { params: { slug: string } }

export function generateStaticParams() {
  return GUIAS.map((g) => ({ slug: g.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const guia = guiaPorSlug(params.slug)
  if (!guia) return {}
  return {
    title: guia.tituloBuscador,
    description: guia.descripcion,
    alternates: { canonical: `/guias/${guia.slug}` },
    openGraph: { title: guia.titulo, description: guia.descripcion, type: 'article', locale: 'es_DO', siteName: 'Cedanet Solutions', images: ['/og-image.png'] },
  }
}

export default function GuiaPage({ params }: Props) {
  const guia = guiaPorSlug(params.slug)
  if (!guia) notFound()

  const siteUrl = process.env.SITE_URL || 'https://www.cedanet.net'
  const url = `${siteUrl}/guias/${guia.slug}`
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guia.titulo,
      description: guia.descripcion,
      inLanguage: 'es',
      datePublished: guia.publicada,
      dateModified: guia.publicada,
      mainEntityOfPage: url,
      author: { '@type': 'Organization', name: 'Cedanet Solutions', url: siteUrl },
      publisher: { '@type': 'Organization', name: 'Cedanet Solutions', logo: { '@type': 'ImageObject', url: `${siteUrl}/assets/logo.png` } },
      about: { '@type': 'SoftwareApplication', name: guia.producto, url: guia.urlProducto.split('?')[0] },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: siteUrl },
        { '@type': 'ListItem', position: 2, name: 'Guías', item: `${siteUrl}/guias` },
        { '@type': 'ListItem', position: 3, name: guia.titulo, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: guia.preguntas.map((q) => ({ '@type': 'Question', name: q.pregunta, acceptedAnswer: { '@type': 'Answer', text: q.respuesta } })),
    },
  ]
  const otras = GUIAS.filter((g) => g.slug !== guia.slug)
  const whatsapp = `https://wa.me/18096279180?text=${encodeURIComponent(`Hola, me interesa ${guia.producto}.`)}`

  return (
    <main id="contenido" className="min-h-screen bg-white">
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <section className="bg-navy pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <nav aria-label="Ruta" className="text-sm text-gray-400 mb-6">
            <a href="/" className="hover:text-white">Inicio</a> <span aria-hidden="true">/</span>{' '}
            <a href="/guias" className="hover:text-white">Guías</a>
          </nav>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">{guia.titulo}</h1>
          <p className="mt-5 text-lg text-gray-300 leading-relaxed">{guia.intro}</p>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14 text-gray-700 leading-relaxed">
        {guia.secciones.map((s) => (
          <section key={s.titulo} className="mb-10">
            <h2 className="font-display text-2xl font-bold text-navy mb-4">{s.titulo}</h2>
            {s.parrafos?.map((p) => (
              <p key={p} className="mb-4">{p}</p>
            ))}
            {s.lista && (
              <ul className="list-disc pl-6 space-y-2">
                {s.lista.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold text-navy mb-4">Preguntas frecuentes</h2>
          {guia.preguntas.map((q) => (
            <div key={q.pregunta} className="mb-5">
              <h3 className="font-semibold text-navy">{q.pregunta}</h3>
              <p className="mt-1">{q.respuesta}</p>
            </div>
          ))}
        </section>

        <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6 sm:p-8">
          <p className="font-display text-xl font-bold text-navy">Conoce {guia.producto}</p>
          <p className="mt-2">Mira cómo funciona, prueba el demo o escríbenos para instalarlo en tu negocio.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href={guia.urlProducto} className="inline-flex items-center px-5 py-3 rounded-xl bg-brand text-white font-semibold hover:bg-brand-dark transition-colors">
              Ver {guia.producto}
            </a>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-3 rounded-xl border border-gray-300 text-navy font-semibold hover:border-brand transition-colors">
              Escribir por WhatsApp
            </a>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="font-display text-xl font-bold text-navy mb-4">Otras guías</h2>
          <ul className="space-y-2">
            {otras.map((g) => (
              <li key={g.slug}>
                <a href={`/guias/${g.slug}`} className="text-brand hover:underline">{g.titulo}</a>
              </li>
            ))}
          </ul>
        </section>
      </article>
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
