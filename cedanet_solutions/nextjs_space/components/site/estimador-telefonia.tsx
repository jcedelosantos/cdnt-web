'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cable, CircleHelp, Minus, Network, Phone, Plus, Router, X } from 'lucide-react'
import { FormularioContacto, Navegacion, Pasos, Resultado, opcionClass as opcion, useSolicitud } from './estimador-comun'

type Cableado = 'existente' | 'corta' | 'larga'
type Poe = 'si' | 'no' | 'nose'

const CABLEADOS: { valor: Cableado; titulo: string; detalle: string; icon: typeof Cable }[] = [
  { valor: 'existente', titulo: 'No, ya hay puntos de red', detalle: 'Cada teléfono tiene un punto de red cerca', icon: Network },
  { valor: 'corta', titulo: 'Sí, en un área pequeña', detalle: 'Un piso u oficina, menos de 20 m hasta el rack', icon: Cable },
  { valor: 'larga', titulo: 'Sí, en un área grande', detalle: 'Varios pisos o naves, más de 20 m', icon: Cable },
]

const POES: { valor: Poe; titulo: string; detalle: string; icon: typeof Router }[] = [
  { valor: 'si', titulo: 'Sí', detalle: 'Tengo un switch PoE con puertos libres', icon: Router },
  { valor: 'no', titulo: 'No', detalle: 'Hay que instalar uno', icon: X },
  { valor: 'nose', titulo: 'No estoy seguro', detalle: 'Lo incluimos y lo confirmamos en la visita', icon: CircleHelp },
]

const PRESETS = [5, 10, 20]
const MAX = 48

export function EstimadorTelefonia({ onElegirArea }: { onElegirArea?: () => void }) {
  const [paso, setPaso] = useState(0)
  const [extensiones, setExtensiones] = useState(10)
  const [cableado, setCableado] = useState<Cableado | null>(null)
  const [poe, setPoe] = useState<Poe | null>(null)
  const solicitud = useSolicitud('telefonia')

  const pasos = ['Extensiones', 'Cableado', 'Switch PoE', 'Tus datos']
  const puedeSeguir = [extensiones >= 1, !!cableado, !!poe][paso] ?? true

  const enviar = async () => {
    // "No estoy seguro" se estima con switch incluido
    if (await solicitud.enviar({ extensiones, cableado, poe: poe === 'si' ? 'si' : 'no' })) setPaso(4)
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl shadow-navy/10 border border-gray-100 overflow-hidden">
      {paso < 4 && <Pasos pasos={pasos} paso={paso} />}

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
                <legend className="font-display text-2xl font-bold text-gray-900">¿Cuántas extensiones necesitas?</legend>
                <p className="mt-2 text-gray-600">Una extensión por cada teléfono IP. Incluimos la central telefónica.</p>
                <div className="mt-8 flex items-center justify-center gap-5">
                  <button
                    type="button"
                    onClick={() => setExtensiones((n) => Math.max(1, n - 1))}
                    className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center hover:border-brand hover:text-brand-dark transition-colors"
                    aria-label="Quitar una extensión"
                  >
                    <Minus className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <div className="text-center min-w-[120px]">
                    <Phone className="w-8 h-8 text-brand mx-auto mb-1" aria-hidden="true" />
                    <output className="block font-display text-5xl font-bold text-gray-900 tabular-nums" aria-live="polite">
                      {extensiones}
                    </output>
                    <span className="text-sm text-gray-500">{extensiones === 1 ? 'extensión' : 'extensiones'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setExtensiones((n) => Math.min(MAX, n + 1))}
                    className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center hover:border-brand hover:text-brand-dark transition-colors"
                    aria-label="Agregar una extensión"
                  >
                    <Plus className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-6 flex justify-center gap-2">
                  {PRESETS.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setExtensiones(n)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                        extensiones === n ? 'bg-brand text-white border-brand' : 'border-gray-200 text-gray-700 hover:border-brand/40'
                      }`}
                    >
                      {n} extensiones
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-center text-xs text-gray-500">Hasta {MAX} extensiones. Para más, escríbenos.</p>
              </fieldset>
            )}

            {paso === 1 && (
              <fieldset>
                <legend className="font-display text-2xl font-bold text-gray-900">¿Hay que instalar cableado nuevo?</legend>
                <p className="mt-2 text-gray-600">Los teléfonos IP se conectan a la red con cable.</p>
                <div className="mt-6 space-y-3">
                  {CABLEADOS.map(({ valor, titulo, detalle, icon: Icon }) => (
                    <button
                      key={valor}
                      type="button"
                      aria-pressed={cableado === valor}
                      onClick={() => setCableado(valor)}
                      className={`${opcion(cableado === valor)} flex items-center gap-4`}
                    >
                      <Icon className="w-6 h-6 text-brand flex-shrink-0" aria-hidden="true" />
                      <span>
                        <span className="block font-semibold text-gray-900">{titulo}</span>
                        <span className="block text-sm text-gray-600">{detalle}</span>
                      </span>
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {paso === 2 && (
              <fieldset>
                <legend className="font-display text-2xl font-bold text-gray-900">¿Ya tienes un switch con PoE?</legend>
                <p className="mt-2 text-gray-600">El switch PoE le da energía a los teléfonos por el mismo cable de red.</p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {POES.map(({ valor, titulo, detalle, icon: Icon }) => (
                    <button
                      key={valor}
                      type="button"
                      aria-pressed={poe === valor}
                      onClick={() => setPoe(valor)}
                      className={opcion(poe === valor)}
                    >
                      <Icon className="w-7 h-7 text-brand mb-3" aria-hidden="true" />
                      <span className="block font-semibold text-gray-900">{titulo}</span>
                      <span className="block mt-1 text-sm text-gray-600">{detalle}</span>
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {paso === 3 && <FormularioContacto solicitud={solicitud} onEnviar={enviar} onAtras={() => setPaso(2)} />}

            {paso === 4 && (
              <Resultado
                rango={solicitud.rango}
                descripcion={`Tu central telefónica con ${extensiones} ${extensiones === 1 ? 'extensión' : 'extensiones'}`}
                aclaracion="Es un estimado orientativo. El precio final depende de la visita técnica (recorridos, modelos de teléfono, líneas con tu proveedor). Te contactaremos pronto para afinarlo."
                whatsapp={`Hola, hice el estimado de central telefónica en la web (${extensiones} extensiones) y me gustaría coordinar una visita.`}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {paso < 3 && (
          <Navegacion
            paso={paso}
            puedeSeguir={puedeSeguir}
            onAtras={() => setPaso((p) => p - 1)}
            onSiguiente={() => setPaso((p) => p + 1)}
            onElegirArea={onElegirArea}
          />
        )}
      </div>
    </div>
  )
}
