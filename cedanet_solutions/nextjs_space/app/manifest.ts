import type { MetadataRoute } from 'next'

// Permite instalar el sitio como app desde el navegador del teléfono
// (en iPhone: Safari > Compartir > Agregar a pantalla de inicio).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Cedanet Solutions',
    short_name: 'Cedanet',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      { src: '/pwa/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/pwa/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  }
}
