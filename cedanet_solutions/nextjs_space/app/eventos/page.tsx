import type { Metadata } from 'next'
import { Header } from '@/components/site/header'
import { Footer } from '@/components/site/footer'
import { WhatsAppButton } from '@/components/site/whatsapp-button'

// Propuesta de INTEG para quienes organizan eventos con frecuencia. Pensada para enviarse por
// WhatsApp y reenviarse entre organizadoras, por eso vive en cedanet.net y no en una página externa.
// Sigue la estructura de toda la comunicación de Cedanet: Problema, Prioridad, Claridad, Inversión.
// Los precios se copian a mano de integ-app (api/src/lib/azul-prices.ts y lib/plans.ts): si cambian
// allá, actualizarlos aquí y en lib/guias.ts.

export const metadata: Metadata = {
  title: 'INTEG para organizadores de eventos: entradas con QR y control en la puerta | Cedanet',
  description:
    'Una sola lista de asistentes, una entrada con QR por persona y registro de llegada desde el celular. Planes en pesos desde RD$3,500 al mes.',
  alternates: { canonical: '/eventos' },
  openGraph: {
    title: 'Organiza tus eventos con entradas QR y control en la puerta',
    description: 'INTEG de Cedanet: lista de asistentes, entradas con QR y escaneo desde el celular. Planes desde RD$3,500 al mes.',
    type: 'website',
    locale: 'es_DO',
    siteName: 'Cedanet Solutions',
    images: ['/og-image.png'],
  },
}

const PROBLEMAS = [
  'Paquetes de varias entradas vendidos por distintas personas, cada una con su propia lista.',
  'Es difícil saber cuántos cupos quedan de verdad y quién ya pagó.',
  'Beneficios especiales (una mentoría, un polo, un acceso VIP) se controlan de memoria o en papel.',
  'En la entrada, buscar nombres en una lista forma filas y deja pasar a quien no compró.',
]

const PASOS = [
  { titulo: 'Registro', texto: 'Cada asistente queda en una sola lista del evento, con su nombre y su tipo de entrada.' },
  { titulo: 'Entrada con QR', texto: 'Cada persona recibe su entrada con un código QR propio.' },
  { titulo: 'Escaneo', texto: 'El equipo de recepción escanea con la cámara del celular, con sonido y vibración al leer.' },
  { titulo: 'Asistencia', texto: 'Se ve en pantalla cuántos inscritos hay, cuántos han llegado y el porcentaje de asistencia.' },
]

const PLANES = [
  { nombre: 'Básico', precio: 'RD$3,500', incluye: 'Registro de asistentes, entradas con QR y escaneo. Hasta 75 asistentes por evento. Ideal para empezar.' },
  { nombre: 'Intermedio', precio: 'RD$6,000', incluye: 'Todo lo anterior, página pública de inscripción, reportes avanzados y venta de artículos. Hasta 200 asistentes por evento.' },
  { nombre: 'Avanzado', precio: 'RD$10,500', incluye: 'Todo lo anterior, cobro en línea y control de cupo con sala de espera. Hasta 500 asistentes por evento.' },
]

const ENLACES = [
  { texto: 'Conoce INTEG', detalle: 'integ.cedanet.net', href: 'https://integ.cedanet.net/site-web' },
  { texto: 'Contratar un evento único', detalle: 'Sin mensualidad, desde RD$6,500', href: 'https://integ.cedanet.net/evento-unico' },
  { texto: 'Guía: entradas con QR para eventos', detalle: 'Cómo funciona, paso a paso', href: '/guias/entradas-con-qr-para-eventos' },
]

const whatsapp = `https://wa.me/18096279180?text=${encodeURIComponent('Hola, vi la propuesta de INTEG para eventos y me interesa.')}`

export default function EventosPage() {
  return (
    <main id="contenido" className="min-h-screen bg-white">
      <Header />

      <section className="bg-navy pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">INTEG para organizadores de eventos</p>
          <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Organiza tus eventos con entradas QR y control en la puerta
          </h1>
          <p className="mt-5 text-lg text-gray-300 leading-relaxed">
            Para quienes organizan eventos con frecuencia: talleres, conferencias, paneles y encuentros. INTEG lleva la
            lista de asistentes, entrega cada entrada con su código QR y permite registrar la llegada desde el celular.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-5 py-3 rounded-xl bg-brand text-white font-semibold hover:bg-brand-dark transition-colors">
              Escribir por WhatsApp
            </a>
            <a href="#inversion" className="inline-flex items-center px-5 py-3 rounded-xl border border-gray-500 text-white font-semibold hover:border-brand transition-colors">
              Ver planes
            </a>
          </div>
        </div>
      </section>

      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14 text-gray-700 leading-relaxed">
        <section className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">El problema</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-navy tracking-tight">
            Vender por WhatsApp y con varias personas deja muchas cuentas abiertas
          </h2>
          <ul className="mt-4 list-disc pl-6 space-y-2">
            {PROBLEMAS.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>

        <section className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">Por qué es prioridad</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-navy tracking-tight">Con cupo limitado, un error de conteo cuesta</h2>
          <p className="mt-4">
            Si se vende de más, alguien se queda fuera y se lleva una mala experiencia. Si se cuenta de menos, quedan sillas
            vacías que pudieron venderse. Un evento es toda una experiencia, y esa experiencia se vive desde la puerta.
          </p>
        </section>

        <section className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">Cómo lo resuelve INTEG</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-navy tracking-tight">
            Una sola lista, una entrada por persona, un registro en la puerta
          </h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-2">
            {PASOS.map((p, i) => (
              <li key={p.titulo} className="rounded-2xl border border-gray-200 p-5">
                <span className="font-mono text-sm text-brand">Paso {i + 1}</span>
                <p className="mt-1 font-display font-bold text-navy">{p.titulo}</p>
                <p className="mt-1 text-sm text-gray-600">{p.texto}</p>
              </li>
            ))}
          </ol>
          <ul className="mt-6 list-disc pl-6 space-y-2">
            <li>Puntos de acceso separados, por ejemplo la entrada general y una sesión exclusiva, para que cada quien entre a lo que compró.</li>
            <li>Reportes del evento para saber quién vino y planificar el próximo.</li>
            <li>En planes superiores: página pública para que la gente se inscriba sola, venta de artículos (como el polo del evento) con entrega marcada por QR, y cobro en línea.</li>
          </ul>
        </section>

        <section className="mb-12 rounded-2xl border-2 border-dashed border-brand bg-gray-50 p-6 sm:p-8">
          <span className="inline-block rounded-full bg-brand px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">Recomendación</span>
          <h2 className="mt-3 font-display text-2xl font-bold text-navy tracking-tight">Empezar con lo esencial y crecer después</h2>
          <p className="mt-4">
            <strong className="text-navy">Para un evento que ya está cerca:</strong> usar solo el registro de asistentes y el
            escaneo en la puerta. Se cargan las personas que ya compraron, cada una recibe su QR y el equipo de recepción
            registra las llegadas desde el celular. No cambia la forma de vender que ya tienen.
          </p>
          <p className="mt-4">
            <strong className="text-navy">Para los próximos eventos:</strong> sumar la página de inscripción, el control de
            cupo, la venta del polo u otros artículos y el cobro en línea, con tiempo para prepararlo bien.
          </p>
        </section>

        <section id="inversion" className="mb-12 scroll-mt-28">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">Inversión</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-navy tracking-tight">Planes mensuales en pesos, ITBIS incluido</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {PLANES.map((p) => (
              <li key={p.nombre} className="rounded-2xl border border-gray-200 p-5">
                <p className="font-display font-bold text-navy">{p.nombre}</p>
                <p className="mt-1 font-mono text-xl font-semibold text-navy">
                  {p.precio}
                  <span className="text-sm font-normal text-gray-500"> /mes</span>
                </p>
                <p className="mt-3 text-sm text-gray-600">{p.incluye}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-gray-600">
            Pagando el año completo, 10% menos. Eventos ilimitados dentro del mes. ¿Solo un evento? También hay pago único
            por evento, desde RD$6,500 hasta 100 asistentes, sin mensualidad.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-navy tracking-tight">Enlaces</h2>
          <ul className="mt-4 space-y-3">
            {ENLACES.map((e) => (
              <li key={e.href}>
                <a href={e.href} className="flex items-center justify-between gap-4 rounded-2xl border border-gray-200 p-5 hover:border-brand transition-colors">
                  <span>
                    <span className="block font-semibold text-navy">{e.texto}</span>
                    <span className="block text-sm text-gray-500">{e.detalle}</span>
                  </span>
                  <span className="text-brand font-semibold" aria-hidden="true">›</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <div className="rounded-2xl bg-navy p-6 sm:p-8 text-white">
          <p className="font-display text-xl font-bold">¿Lo vemos juntos?</p>
          <p className="mt-2 text-gray-300">Escríbenos por WhatsApp al 809-627-9180 y te mostramos INTEG con tu propio evento.</p>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center px-5 py-3 rounded-xl bg-brand text-white font-semibold hover:bg-brand-dark transition-colors">
            Escribir por WhatsApp
          </a>
        </div>
      </article>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}
