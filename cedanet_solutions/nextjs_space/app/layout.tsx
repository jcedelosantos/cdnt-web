import { DM_Sans, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { ChunkLoadErrorHandler } from '@/components/chunk-load-error-handler'
import { MotionProvider } from '@/components/site/motion-provider'
import type { Metadata } from 'next'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' })
const jakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-display' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.SITE_URL || 'https://www.cedanet.net'
  return {
    metadataBase: new URL(siteUrl),
    title: 'Cedanet Solutions | Soluciones Tecnológicas Integrales',
    description: 'Diseñamos, implementamos y administramos infraestructuras tecnológicas seguras, eficientes y escalables para redes, seguridad, comunicaciones, CCTV, soporte técnico y automatización empresarial.',
    alternates: { canonical: '/' },
    keywords: ['soluciones tecnológicas', 'redes', 'CCTV', 'firewall', 'telefonía IP', 'WiFi empresarial', 'soporte técnico', 'República Dominicana'],
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.svg',
    },
    openGraph: {
      title: 'Cedanet Solutions | Soluciones Tecnológicas Integrales',
      description: 'Diseñamos, implementamos y administramos infraestructuras tecnológicas seguras y escalables.',
      images: ['/og-image.png'],
      type: 'website',
      locale: 'es_DO',
      siteName: 'Cedanet Solutions',
    },
  }
}

const siteUrl = process.env.SITE_URL || 'https://www.cedanet.net'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Cedanet Solutions',
  description:
    'Soluciones tecnológicas integrales: redes, firewall, CCTV, telefonía IP, WiFi empresarial, soporte técnico, servidores y automatización.',
  url: siteUrl,
  logo: `${siteUrl}/assets/logo.png`,
  image: `${siteUrl}/og-image.png`,
  telephone: '+1-809-627-9180',
  email: 'javis.cedano@cedanet.net',
  areaServed: { '@type': 'Country', name: 'República Dominicana' },
  address: { '@type': 'PostalAddress', addressCountry: 'DO' },
  sameAs: ['https://instagram.com/cedanetrd'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${jakartaSans.variable} ${jetbrainsMono.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
          <MotionProvider>{children}</MotionProvider>
          <Toaster />
          <ChunkLoadErrorHandler />
        </ThemeProvider>
      </body>
    </html>
  )
}
