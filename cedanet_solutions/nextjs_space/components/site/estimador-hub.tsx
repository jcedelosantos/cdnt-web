'use client'

import { useState } from 'react'
import { Bot, Camera, Network, Phone, Server, Shield, Wifi, Wrench } from 'lucide-react'
import { EstimadorCctv } from './estimador-cctv'
import { EstimadorTelefonia } from './estimador-telefonia'
import { EstimadorWifi } from './estimador-wifi'
import { EstimadorFirewall } from './estimador-firewall'
import { EstimadorRedes } from './estimador-redes'

type Area = 'cctv' | 'telefonia' | 'wifi' | 'firewall' | 'redes'

// Áreas del estimador. Las que aún no tienen tarifa se muestran deshabilitadas.
const AREAS: { id: string; titulo: string; detalle: string; icon: typeof Camera; activa: boolean }[] = [
  { id: 'cctv', titulo: 'CCTV y videovigilancia', detalle: 'Cámaras IP, grabador y cableado', icon: Camera, activa: true },
  { id: 'redes', titulo: 'Redes e infraestructura', detalle: 'Cableado estructurado y puntos de red', icon: Network, activa: true },
  { id: 'wifi', titulo: 'WiFi empresarial', detalle: 'Access points y cobertura', icon: Wifi, activa: true },
  { id: 'firewall', titulo: 'Firewall y seguridad', detalle: 'Seguridad perimetral y VPN', icon: Shield, activa: true },
  { id: 'telefonia', titulo: 'Central telefónica', detalle: 'Central IP, teléfonos y extensiones', icon: Phone, activa: true },
  { id: 'soporte', titulo: 'Soporte técnico', detalle: 'Mantenimiento y asistencia', icon: Wrench, activa: false },
  { id: 'servidores', titulo: 'Servidores y cloud', detalle: 'Virtualización y backups', icon: Server, activa: false },
  { id: 'automatizacion', titulo: 'Automatización', detalle: 'Procesos y monitoreo', icon: Bot, activa: false },
]

export function EstimadorHub() {
  const [area, setArea] = useState<Area | null>(null)

  if (area === 'cctv') {
    return <EstimadorCctv onElegirArea={() => setArea(null)} />
  }
  if (area === 'telefonia') {
    return <EstimadorTelefonia onElegirArea={() => setArea(null)} />
  }
  if (area === 'wifi') {
    return <EstimadorWifi onElegirArea={() => setArea(null)} />
  }
  if (area === 'firewall') {
    return <EstimadorFirewall onElegirArea={() => setArea(null)} />
  }
  if (area === 'redes') {
    return <EstimadorRedes onElegirArea={() => setArea(null)} />
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl shadow-navy/10 border border-gray-100 p-6 sm:p-8">
      <h2 className="font-display text-2xl font-bold text-gray-900">¿Qué quieres estimar?</h2>
      <p className="mt-2 text-gray-600">Elige un área. Vamos sumando más; mientras tanto, te cotizamos las demás directamente.</p>
      <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {AREAS.map(({ id, titulo, detalle, icon: Icon, activa }) => (
          <li key={id}>
            <button
              type="button"
              disabled={!activa}
              onClick={() => activa && setArea(id as Area)}
              className={`w-full h-full text-left p-4 rounded-2xl border-2 flex items-start gap-4 transition-all ${
                activa
                  ? 'border-gray-200 bg-white hover:border-brand hover:shadow-md'
                  : 'border-gray-100 bg-gray-50 cursor-not-allowed'
              }`}
            >
              <span
                className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  activa ? 'bg-brand text-white' : 'bg-gray-200 text-gray-400'
                }`}
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
              </span>
              <span className="flex-1">
                <span className={`block font-semibold ${activa ? 'text-gray-900' : 'text-gray-500'}`}>{titulo}</span>
                <span className={`block text-sm ${activa ? 'text-gray-600' : 'text-gray-500'}`}>{detalle}</span>
                {!activa && (
                  <span className="mt-2 inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-gray-200 text-gray-600">
                    Próximamente
                  </span>
                )}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-gray-600">
        ¿Tu proyecto es de otra área?{' '}
        <a href="/#contacto" className="font-semibold text-brand-dark hover:underline">
          Solicita una cotización
        </a>{' '}
        y te respondemos con una propuesta.
      </p>
    </div>
  )
}
