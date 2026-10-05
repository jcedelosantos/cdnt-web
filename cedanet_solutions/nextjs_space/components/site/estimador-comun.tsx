'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react'
import { toast } from 'sonner'

// Piezas compartidas por los estimadores de cada área (pasos, datos de contacto y resultado)

export type Rango = { minimo: number; maximo: number }

export const dop = (n: number) => `RD$ ${n.toLocaleString('es-DO', { maximumFractionDigits: 0 })}`

const inputClass =
  'w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all'

export const opcionClass = (activa: boolean) =>
  `w-full text-left p-5 rounded-2xl border-2 transition-all ${
    activa ? 'border-brand bg-brand/5 shadow-md' : 'border-gray-200 hover:border-brand/40 bg-white'
  }`

// Estado del formulario de contacto y envío a /api/estimador
export function useSolicitud(area: 'cctv' | 'telefonia' | 'wifi' | 'firewall' | 'redes') {
  const [contacto, setContacto] = useState({ nombre: '', empresa: '', telefono: '', email: '', ubicacion: '', mensaje: '' })
  const [website, setWebsite] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [rango, setRango] = useState<Rango | null>(null)

  const cambiar = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setContacto((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  // Devuelve true si la solicitud se registró
  const enviar = async (entrada: unknown): Promise<boolean> => {
    if (!contacto.nombre.trim() || contacto.telefono.trim().length < 7) {
      toast.error('Escribe tu nombre y un teléfono válido.')
      return false
    }
    setEnviando(true)
    try {
      const res = await fetch('/api/estimador', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ area, entrada, contacto, website }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        toast.error(data.message ?? 'No pudimos calcular el estimado. Intenta de nuevo.')
        return false
      }
      setRango(data.rango)
      return true
    } catch {
      toast.error('No pudimos calcular el estimado. Intenta de nuevo.')
      return false
    } finally {
      setEnviando(false)
    }
  }

  return { contacto, cambiar, website, setWebsite, enviando, rango, enviar }
}

export function Pasos({ pasos, paso }: { pasos: string[]; paso: number }) {
  return (
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
  )
}

// Botones Atrás / Siguiente de las preguntas. En el primer paso, "Atrás" vuelve a la lista de áreas.
export function Navegacion({
  paso,
  puedeSeguir,
  onAtras,
  onSiguiente,
  onElegirArea,
}: {
  paso: number
  puedeSeguir: boolean
  onAtras: () => void
  onSiguiente: () => void
  onElegirArea?: () => void
}) {
  return (
    <div className="mt-8 flex justify-between gap-3">
      <button
        type="button"
        onClick={() => (paso === 0 ? onElegirArea?.() : onAtras())}
        className={`inline-flex items-center gap-2 px-3 sm:px-5 py-3 whitespace-nowrap rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-medium ${paso === 0 && !onElegirArea ? 'invisible' : ''}`}
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" /> {paso === 0 ? 'Elegir otra área' : 'Atrás'}
      </button>
      <button
        type="button"
        disabled={!puedeSeguir}
        onClick={onSiguiente}
        className="inline-flex items-center gap-2 px-4 sm:px-7 py-3 whitespace-nowrap bg-brand text-white font-semibold rounded-lg hover:bg-brand-dark transition-colors shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Siguiente <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  )
}

export function FormularioContacto({
  solicitud,
  onEnviar,
  onAtras,
}: {
  solicitud: ReturnType<typeof useSolicitud>
  onEnviar: () => void
  onAtras: () => void
}) {
  const { contacto, cambiar, website, setWebsite, enviando } = solicitud
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onEnviar()
      }}
      noValidate
    >
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
        <button type="button" onClick={onAtras} className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Atrás
        </button>
        <button type="submit" disabled={enviando} className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-brand text-white font-semibold rounded-lg hover:bg-brand-dark transition-colors shadow-md disabled:opacity-50">
          {enviando ? 'Calculando…' : 'Ver mi estimado'}
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
      <p className="mt-4 text-xs text-gray-500">Usamos tus datos solo para atender esta solicitud.</p>
    </form>
  )
}

export function Resultado({
  rango,
  descripcion,
  aclaracion,
  whatsapp,
}: {
  rango: Rango | null
  descripcion: string // "Tu sistema de 8 cámaras"
  aclaracion: string
  whatsapp: string
}) {
  return (
    <div className="text-center py-4">
      <CheckCircle2 className="w-14 h-14 text-brand mx-auto" aria-hidden="true" />
      {rango ? (
        <>
          <p className="mt-4 text-gray-600">{descripcion} costaría aproximadamente</p>
          <p className="mt-2 font-display text-3xl sm:text-4xl font-bold text-gray-900">
            {dop(rango.minimo)} – {dop(rango.maximo)}
          </p>
          <p className="mt-2 text-sm text-gray-500">Incluye equipos, materiales, instalación e ITBIS.</p>
        </>
      ) : (
        <p className="mt-4 font-display text-2xl font-bold text-gray-900">¡Recibimos tu solicitud!</p>
      )}
      <div className="mt-6 mx-auto max-w-md rounded-xl bg-brand-50 border border-brand/20 p-4 text-sm text-gray-700">{aclaracion}</div>
      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
        <a
          href={`https://wa.me/18096279180?text=${encodeURIComponent(whatsapp)}`}
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
  )
}
