'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Building2, Home, Layers, Minus, Plus, Ruler, Camera, CheckCircle2, MessageCircle } from 'lucide-react'
import { toast } from 'sonner'

type Distancia = 'corta' | 'media' | 'larga'
type Instalacion = 'interior' | 'exterior' | 'mixta'

const INSTALACIONES: { valor: Instalacion; titulo: string; detalle: string; icon: typeof Home }[] = [
  { valor: 'interior', titulo: 'Interior', detalle: 'Oficinas, pasillos, recepción', icon: Home },
  { valor: 'exterior', titulo: 'Exterior', detalle: 'Fachada, parqueo, perímetro', icon: Building2 },
  { valor: 'mixta', titulo: 'Ambos', detalle: 'Cámaras dentro y fuera', icon: Layers },
]

const DISTANCIAS: { valor: Distancia; titulo: string; detalle: string }[] = [
  { valor: 'corta', titulo: 'Corta', detalle: 'Menos de 20 m del lugar donde irá el grabador' },
  { valor: 'media', titulo: 'Media', detalle: 'Entre 20 y 50 m' },
  { valor: 'larga', titulo: 'Larga', detalle: 'Más de 50 m (naves, parqueos grandes)' },
]

const PRESETS = [4, 8, 16]
const dop = (n: number) => `RD$ ${n.toLocaleString('es-DO', { maximumFractionDigits: 0 })}`
const inputClass =
  'w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all'

export function EstimadorCctv() {
  const [paso, setPaso] = useState(0)
  const [camaras, setCamaras] = useState(8)
  const [instalacion, setInstalacion] = useState<Instalacion | null>(null)
  const [distancia, setDistancia] = useState<Distancia | null>(null)
  const [contacto, setContacto] = useState({ nombre: '', empresa: '', telefono: '', email: '', ubicacion: '', mensaje: '' })
  const [website, setWebsite] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [rango, setRango] = useState<{ minimo: number; maximo: number } | null>(null)

  const pasos = ['Cámaras', 'Ubicación', 'Distancia', 'Tus datos']
  const puedeSeguir = [camaras >= 1, !!instalacion, !!distancia][paso] ?? true

  const cambiar = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setContacto((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contacto.nombre.trim() || contacto.telefono.trim().length < 7) {
      toast.error('Escribe tu nombre y un teléfono válido.')
      return
    }
    setEnviando(true)
    try {
      const res = await fetch('/api/estimador', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entrada: { camaras, instalacion, distancia }, contacto, website }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        toast.error(data.message ?? 'No pudimos calcular el estimado. Intenta de nuevo.')
        return
      }
      setRango(data.rango)
      setPaso(4)
    } catch {
      toast.error('No pudimos calcular el estimado. Intenta de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  const opcion = (activa: boolean) =>
    `w-full text-left p-5 rounded-2xl border-2 transition-all ${
      activa ? 'border-brand bg-brand/5 shadow-md' : 'border-gray-200 hover:border-brand/40 bg-white'
    }`

  return (
    <div className="bg-white rounded-3xl shadow-2xl shadow-navy/10 border border-gray-100 overflow-hidden">
      {paso < 4 && (
        <div className="px-6 sm:px-8 pt-6">
          <ol className="flex items-center gap-2" aria-label="Pasos del estimador">
            {pasos.map((nombre, i) => (
              <li key={nombre} className="flex-1">
                <div className={`h-1.5 rounded-full transition-colors ${i <= paso ? 'bg-brand' : 'bg-gray-200'}`} />
                <span className={`mt-2 hidden sm:block text-xs font-medium ${i === paso ? 'text-brand-dark' : 'text-gray-500'}`}>
                  {i + 1}. {nombre}
                </span>
              </li>
            ))}
          </ol>
          <p className="sm:hidden mt-2 text-xs font-medium text-brand-dark">
            Paso {paso + 1} de {pasos.length}: {pasos[paso]}
          </p>
        </div>
      )}

      <div className="p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={paso}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {paso === 0 && (
              <fieldset>
                <legend className="font-display text-2xl font-bold text-gray-900">¿Cuántas cámaras necesitas?</legend>
                <p className="mt-2 text-gray-600">Si no estás seguro, elige un aproximado; lo ajustamos en la visita.</p>
                <div className="mt-8 flex items-center justify-center gap-5">
                  <button
                    type="button"
                    onClick={() => setCamaras((c) => Math.max(1, c - 1))}
                    className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center hover:border-brand hover:text-brand-dark transition-colors"
                    aria-label="Quitar una cámara"
                  >
                    <Minus className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <div className="text-center min-w-[120px]">
                    <Camera className="w-8 h-8 text-brand mx-auto mb-1" aria-hidden="true" />
                    <output className="block font-display text-5xl font-bold text-gray-900 tabular-nums" aria-live="polite">
                      {camaras}
                    </output>
                    <span className="text-sm text-gray-500">{camaras === 1 ? 'cámara' : 'cámaras'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCamaras((c) => Math.min(32, c + 1))}
                    className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center hover:border-brand hover:text-brand-dark transition-colors"
                    aria-label="Agregar una cámara"
                  >
                    <Plus className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-6 flex justify-center gap-2">
                  {PRESETS.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setCamaras(n)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                        camaras === n ? 'bg-brand text-white border-brand' : 'border-gray-200 text-gray-700 hover:border-brand/40'
                      }`}
                    >
                      {n} cámaras
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-center text-xs text-gray-500">Hasta 32 cámaras. Para más, escríbenos.</p>
              </fieldset>
            )}

            {paso === 1 && (
              <fieldset>
                <legend className="font-display text-2xl font-bold text-gray-900">¿Dónde irán las cámaras?</legend>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {INSTALACIONES.map(({ valor, titulo, detalle, icon: Icon }) => (
                    <button
                      key={valor}
                      type="button"
                      aria-pressed={instalacion === valor}
                      onClick={() => setInstalacion(valor)}
                      className={opcion(instalacion === valor)}
                    >
                      <Icon className="w-7 h-7 text-brand mb-3" aria-hidden="true" />
                      <span className="block font-semibold text-gray-900">{titulo}</span>
                      <span className="block mt-1 text-sm text-gray-600">{detalle}</span>
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {paso === 2 && (
              <fieldset>
                <legend className="font-display text-2xl font-bold text-gray-900">¿Qué tan lejos estarán las cámaras?</legend>
                <p className="mt-2 text-gray-600">Distancia promedio desde el punto donde irá el grabador (NVR).</p>
                <div className="mt-6 space-y-3">
                  {DISTANCIAS.map(({ valor, titulo, detalle }) => (
                    <button
                      key={valor}
                      type="button"
                      aria-pressed={distancia === valor}
                      onClick={() => setDistancia(valor)}
                      className={`${opcion(distancia === valor)} flex items-center gap-4`}
                    >
                      <Ruler className="w-6 h-6 text-brand flex-shrink-0" aria-hidden="true" />
                      <span>
                        <span className="block font-semibold text-gray-900">{titulo}</span>
                        <span className="block text-sm text-gray-600">{detalle}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {paso === 3 && (
              <form onSubmit={enviar} noValidate>
                <h2 className="font-display text-2xl font-bold text-gray-900">¿A quién le enviamos el estimado?</h2>
                <p className="mt-2 text-gray-600">Verás el rango al instante y te contactamos para afinar la cotización.</p>
                <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                  <label>
                    No completar este campo
                    <input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                  </label>
                </div>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="est-nombre" className="block text-sm font-medium text-gray-700 mb-1.5">Nombre *</label>
                    <input id="est-nombre" name="nombre" required maxLength={100} value={contacto.nombre} onChange={cambiar} className={inputClass} placeholder="Tu nombre" autoComplete="name" />
                  </div>
                  <div>
                    <label htmlFor="est-empresa" className="block text-sm font-medium text-gray-700 mb-1.5">Empresa</label>
                    <input id="est-empresa" name="empresa" maxLength={150} value={contacto.empresa} onChange={cambiar} className={inputClass} placeholder="Nombre de tu empresa" autoComplete="organization" />
                  </div>
                  <div>
                    <label htmlFor="est-telefono" className="block text-sm font-medium text-gray-700 mb-1.5">Teléfono / WhatsApp *</label>
                    <input id="est-telefono" name="telefono" type="tel" required maxLength={30} value={contacto.telefono} onChange={cambiar} className={inputClass} placeholder="809-000-0000" autoComplete="tel" />
                  </div>
                  <div>
                    <label htmlFor="est-email" className="block text-sm font-medium text-gray-700 mb-1.5">Correo electrónico</label>
                    <input id="est-email" name="email" type="email" maxLength={150} value={contacto.email} onChange={cambiar} className={inputClass} placeholder="tu@empresa.com" autoComplete="email" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="est-ubicacion" className="block text-sm font-medium text-gray-700 mb-1.5">Ubicación del proyecto</label>
                    <input id="est-ubicacion" name="ubicacion" maxLength={150} value={contacto.ubicacion} onChange={cambiar} className={inputClass} placeholder="Ej.: Santo Domingo, Piantini" />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="est-mensaje" className="block text-sm font-medium text-gray-700 mb-1.5">Algo más que debamos saber</label>
                    <textarea id="est-mensaje" name="mensaje" rows={3} maxLength={2000} value={contacto.mensaje} onChange={cambiar} className={`${inputClass} resize-none`} placeholder="Opcional" />
                  </div>
                </div>
                <div className="mt-8 flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
                  <button type="button" onClick={() => setPaso(2)} className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium">
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Atrás
                  </button>
                  <button type="submit" disabled={enviando} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-brand text-white font-semibold rounded-lg hover:bg-brand-dark transition-colors shadow-md disabled:opacity-50">
                    {enviando ? 'Calculando…' : 'Ver mi estimado'}
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
                <p className="mt-4 text-xs text-gray-500">Usamos tus datos solo para atender esta solicitud.</p>
              </form>
            )}

            {paso === 4 && (
              <div className="text-center py-4">
                <CheckCircle2 className="w-14 h-14 text-brand mx-auto" aria-hidden="true" />
                {rango ? (
                  <>
                    <p className="mt-4 text-gray-600">Tu sistema de {camaras} {camaras === 1 ? 'cámara' : 'cámaras'} costaría aproximadamente</p>
                    <p className="mt-2 font-display text-3xl sm:text-4xl font-bold text-gray-900">
                      {dop(rango.minimo)} – {dop(rango.maximo)}
                    </p>
                    <p className="mt-2 text-sm text-gray-500">Incluye equipos, materiales, instalación e ITBIS.</p>
                  </>
                ) : (
                  <p className="mt-4 font-display text-2xl font-bold text-gray-900">¡Recibimos tu solicitud!</p>
                )}
                <div className="mt-6 mx-auto max-w-md rounded-xl bg-brand-50 border border-brand/20 p-4 text-sm text-gray-700">
                  Es un estimado orientativo. El precio final depende de la visita técnica (recorridos, altura, marca de
                  los equipos). Te contactaremos pronto para afinarlo.
                </div>
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                  <a
                    href={`https://wa.me/18096279180?text=${encodeURIComponent(`Hola, hice el estimado de CCTV en la web (${camaras} cámaras) y me gustaría coordinar una visita.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-whatsapp text-white font-semibold rounded-lg hover:bg-whatsapp-dark transition-colors"
                  >
                    <MessageCircle className="w-5 h-5" aria-hidden="true" /> Coordinar por WhatsApp
                  </a>
                  <a href="/" className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-gray-200 text-gray-700 font-semibold hover:border-brand/40">
                    Volver al inicio
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {paso < 3 && (
          <div className="mt-8 flex justify-between gap-3">
            <button
              type="button"
              onClick={() => setPaso((p) => Math.max(0, p - 1))}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg text-gray-700 hover:bg-gray-100 font-medium ${paso === 0 ? 'invisible' : ''}`}
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Atrás
            </button>
            <button
              type="button"
              disabled={!puedeSeguir}
              onClick={() => setPaso((p) => p + 1)}
              className="inline-flex items-center gap-2 px-7 py-3 bg-brand text-white font-semibold rounded-lg hover:bg-brand-dark transition-colors shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Siguiente <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
