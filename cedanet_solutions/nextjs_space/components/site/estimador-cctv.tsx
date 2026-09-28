'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2, Home, Layers, Minus, Plus, Ruler, Camera } from 'lucide-react'
import { FormularioContacto, Navegacion, Pasos, Resultado, opcionClass as opcion, useSolicitud } from './estimador-comun'

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

export function EstimadorCctv({ onElegirArea }: { onElegirArea?: () => void }) {
  const [paso, setPaso] = useState(0)
  const [camaras, setCamaras] = useState(8)
  const [instalacion, setInstalacion] = useState<Instalacion | null>(null)
  const [distancia, setDistancia] = useState<Distancia | null>(null)
  const solicitud = useSolicitud('cctv')

  const pasos = ['Cámaras', 'Ubicación', 'Distancia', 'Tus datos']
  const puedeSeguir = [camaras >= 1, !!instalacion, !!distancia][paso] ?? true

  const enviar = async () => {
    if (await solicitud.enviar({ camaras, instalacion, distancia })) setPaso(4)
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

            {paso === 3 && <FormularioContacto solicitud={solicitud} onEnviar={enviar} onAtras={() => setPaso(2)} />}

            {paso === 4 && (
              <Resultado
                rango={solicitud.rango}
                descripcion={`Tu sistema de ${camaras} ${camaras === 1 ? 'cámara' : 'cámaras'}`}
                aclaracion="Es un estimado orientativo. El precio final depende de la visita técnica (recorridos, altura, marca de los equipos). Te contactaremos pronto para afinarlo."
                whatsapp={`Hola, hice el estimado de CCTV en la web (${camaras} cámaras) y me gustaría coordinar una visita.`}
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
