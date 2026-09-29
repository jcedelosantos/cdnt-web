'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, Shield, ShieldCheck, SlidersHorizontal, Users } from 'lucide-react'
import { FormularioContacto, Navegacion, Pasos, Resultado, opcionClass as opcion, useSolicitud } from './estimador-comun'

type Marca = 'fortinet' | 'aruba'
type Usuarios = '25' | '75' | '150'
type Configuracion = 'basica' | 'avanzada'

const MARCAS: { valor: Marca; titulo: string; detalle: string; etiqueta?: string; icon: typeof Shield }[] = [
  {
    valor: 'fortinet',
    titulo: 'Fortinet FortiGate',
    detalle: 'Filtrado web, antivirus y prevención de intrusos. Incluye licencia de seguridad por 1 año.',
    etiqueta: 'Recomendado',
    icon: ShieldCheck,
  },
  {
    valor: 'aruba',
    titulo: 'Aruba Instant On',
    detalle: 'Firewall básico para oficinas pequeñas, sin licencias anuales.',
    icon: Shield,
  },
]

const USUARIOS: { valor: Usuarios; titulo: string }[] = [
  { valor: '25', titulo: 'Hasta 25 personas' },
  { valor: '75', titulo: 'De 26 a 75 personas' },
  { valor: '150', titulo: 'Más de 75 personas' },
]

const CONFIGURACIONES: { valor: Configuracion; titulo: string; detalle: string; icon: typeof Settings }[] = [
  { valor: 'basica', titulo: 'Básica', detalle: 'Salida a internet, red interna y DHCP', icon: Settings },
  { valor: 'avanzada', titulo: 'Avanzada', detalle: 'Además VPN para trabajo remoto o sucursales y políticas de filtrado', icon: SlidersHorizontal },
]

export function EstimadorFirewall({ onElegirArea }: { onElegirArea?: () => void }) {
  const [paso, setPaso] = useState(0)
  const [marca, setMarca] = useState<Marca | null>(null)
  const [usuarios, setUsuarios] = useState<Usuarios | null>(null)
  const [configuracion, setConfiguracion] = useState<Configuracion | null>(null)
  const solicitud = useSolicitud('firewall')

  const pasos = ['Equipo', 'Personas', 'Configuración', 'Tus datos']
  const puedeSeguir = [!!marca, !!usuarios, !!configuracion][paso] ?? true
  const nombreMarca = marca === 'aruba' ? 'Aruba Instant On' : 'Fortinet'

  const enviar = async () => {
    if (await solicitud.enviar({ marca, usuarios, configuracion })) setPaso(4)
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
                <legend className="font-display text-2xl font-bold text-gray-900">¿Qué tipo de firewall prefieres?</legend>
                <p className="mt-2 text-gray-600">Protege tu red de ataques y controla el acceso a internet.</p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {MARCAS.map(({ valor, titulo, detalle, etiqueta, icon: Icon }) => (
                    <button
                      key={valor}
                      type="button"
                      aria-pressed={marca === valor}
                      onClick={() => setMarca(valor)}
                      className={opcion(marca === valor)}
                    >
                      <span className="flex items-center justify-between gap-2 mb-3">
                        <Icon className="w-7 h-7 text-brand" aria-hidden="true" />
                        {etiqueta && (
                          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-brand/10 text-brand-dark">{etiqueta}</span>
                        )}
                      </span>
                      <span className="block font-semibold text-gray-900">{titulo}</span>
                      <span className="block mt-1 text-sm text-gray-600">{detalle}</span>
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {paso === 1 && (
              <fieldset>
                <legend className="font-display text-2xl font-bold text-gray-900">¿Cuántas personas usan la red?</legend>
                <p className="mt-2 text-gray-600">Con eso elegimos el tamaño del equipo.</p>
                <div className="mt-6 space-y-3">
                  {USUARIOS.map(({ valor, titulo }) => (
                    <button
                      key={valor}
                      type="button"
                      aria-pressed={usuarios === valor}
                      onClick={() => setUsuarios(valor)}
                      className={`${opcion(usuarios === valor)} flex items-center gap-4`}
                    >
                      <Users className="w-6 h-6 text-brand flex-shrink-0" aria-hidden="true" />
                      <span className="font-semibold text-gray-900">{titulo}</span>
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            {paso === 2 && (
              <fieldset>
                <legend className="font-display text-2xl font-bold text-gray-900">¿Qué configuración necesitas?</legend>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CONFIGURACIONES.map(({ valor, titulo, detalle, icon: Icon }) => (
                    <button
                      key={valor}
                      type="button"
                      aria-pressed={configuracion === valor}
                      onClick={() => setConfiguracion(valor)}
                      className={opcion(configuracion === valor)}
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
                descripcion={`Tu firewall ${nombreMarca}`}
                aclaracion="Es un estimado orientativo. El precio final depende de la visita técnica (tu conexión a internet, cantidad de redes y sucursales). Te contactaremos pronto para afinarlo."
                whatsapp={`Hola, hice el estimado de firewall ${nombreMarca} en la web y me gustaría coordinar una visita.`}
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
