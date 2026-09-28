'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building, LayoutGrid, Minus, Plus, Users, Warehouse, Wifi } from 'lucide-react'
import { FormularioContacto, Navegacion, Pasos, Resultado, opcionClass as opcion, useSolicitud } from './estimador-comun'

type Espacio = 'abierto' | 'paredes' | 'nave'
type Personas = '20' | '50' | '100' | '150'

const ESPACIOS: { valor: Espacio; titulo: string; detalle: string; icon: typeof Building }[] = [
  { valor: 'abierto', titulo: 'Abierto', detalle: 'Oficina abierta, local, restaurante', icon: LayoutGrid },
  { valor: 'paredes', titulo: 'Con paredes', detalle: 'Oficinas cerradas, clínica, hotel', icon: Building },
  { valor: 'nave', titulo: 'Nave o almacén', detalle: 'Techos altos, áreas grandes', icon: Warehouse },
]

const PERSONAS: { valor: Personas; titulo: string }[] = [
  { valor: '20', titulo: 'Hasta 20 personas' },
  { valor: '50', titulo: 'Hasta 50 personas' },
  { valor: '100', titulo: 'Hasta 100 personas' },
  { valor: '150', titulo: 'Más de 100 personas' },
]

const PRESETS = [150, 400, 1000]
const MIN = 50
const MAX = 5000
const PASO_M2 = 50

export function EstimadorWifi({ onElegirArea }: { onElegirArea?: () => void }) {
  const [paso, setPaso] = useState(0)
  const [metros, setMetros] = useState(400)
  const [espacio, setEspacio] = useState<Espacio | null>(null)
  const [personas, setPersonas] = useState<Personas | null>(null)
  const solicitud = useSolicitud('wifi')

  const pasos = ['Área', 'Tipo de espacio', 'Personas', 'Tus datos']
  const puedeSeguir = [metros >= MIN, !!espacio, !!personas][paso] ?? true

  const enviar = async () => {
    if (await solicitud.enviar({ metros, espacio, personas })) setPaso(4)
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
                <legend className="font-display text-2xl font-bold text-gray-900">¿Qué área quieres cubrir con WiFi?</legend>
                <p className="mt-2 text-gray-600">Metros cuadrados aproximados. Si no estás seguro, lo medimos en la visita.</p>
                <div className="mt-8 flex items-center justify-center gap-5">
                  <button
                    type="button"
                    onClick={() => setMetros((m) => Math.max(MIN, m - PASO_M2))}
                    className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center hover:border-brand hover:text-brand-dark transition-colors"
                    aria-label={`Quitar ${PASO_M2} metros cuadrados`}
                  >
                    <Minus className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <div className="text-center min-w-[140px]">
                    <Wifi className="w-8 h-8 text-brand mx-auto mb-1" aria-hidden="true" />
                    <output className="block font-display text-5xl font-bold text-gray-900 tabular-nums" aria-live="polite">
                      {metros.toLocaleString('es-DO')}
                    </output>
                    <span className="text-sm text-gray-500">m²</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMetros((m) => Math.min(MAX, m + PASO_M2))}
                    className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center hover:border-brand hover:text-brand-dark transition-colors"
                    aria-label={`Agregar ${PASO_M2} metros cuadrados`}
                  >
                    <Plus className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-6 flex justify-center gap-2">
                  {PRESETS.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setMetros(n)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                        metros === n ? 'bg-brand text-white border-brand' : 'border-gray-200 text-gray-700 hover:border-brand/40'
                      }`}
                    >
                      {n.toLocaleString('es-DO')} m²
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-center text-xs text-gray-500">Hasta {MAX.toLocaleString('es-DO')} m². Para más, escríbenos.</p>
              </fieldset>
            )}

            {paso === 1 && (
              <fieldset>
                <legend className="font-display text-2xl font-bold text-gray-900">¿Cómo es el lugar?</legend>
                <p className="mt-2 text-gray-600">Las paredes y los techos altos cambian cuántos equipos hacen falta.</p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {ESPACIOS.map(({ valor, titulo, detalle, icon: Icon }) => (
                    <button
                      key={valor}
                      type="button"
                      aria-pressed={espacio === valor}
                      onClick={() => setEspacio(valor)}
                      className={opcion(espacio === valor)}
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
                <legend className="font-display text-2xl font-bold text-gray-900">¿Cuántas personas se conectan a la vez?</legend>
                <p className="mt-2 text-gray-600">Cuenta empleados y visitantes en el momento de más uso.</p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PERSONAS.map(({ valor, titulo }) => (
                    <button
                      key={valor}
                      type="button"
                      aria-pressed={personas === valor}
                      onClick={() => setPersonas(valor)}
                      className={`${opcion(personas === valor)} flex items-center gap-4`}
                    >
                      <Users className="w-6 h-6 text-brand flex-shrink-0" aria-hidden="true" />
                      <span className="font-semibold text-gray-900">{titulo}</span>
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {paso === 3 && <FormularioContacto solicitud={solicitud} onEnviar={enviar} onAtras={() => setPaso(2)} />}

            {paso === 4 && (
              <Resultado
                rango={solicitud.rango}
                descripcion={`Tu red WiFi para ${metros.toLocaleString('es-DO')} m²`}
                aclaracion="Es un estimado orientativo. El precio final depende de la visita técnica (paredes, recorridos del cable, equipos que ya tengas). Te contactaremos pronto para afinarlo."
                whatsapp={`Hola, hice el estimado de WiFi en la web (${metros} m²) y me gustaría coordinar una visita.`}
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
