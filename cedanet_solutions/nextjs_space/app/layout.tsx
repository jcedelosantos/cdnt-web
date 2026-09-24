import { DM_Sans, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { ChunkLoadErrorHandler } from '@/components/chunk-load-error-handler'
import type { Metadata } from 'next'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' })
const jakartaSans = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-display' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.SITE_URL || 'https://cedanet.net'
  return {
    metadataBase: new URL(siteUrl),
    title: 'Cedanet Solutions | Soluciones Tecnológicas Integrales',
    description: 'Diseñamos, implementamos y administramos infraestructuras tecnológicas seguras, eficientes y escalables para redes, seguridad, comunicaciones, CCTV, soporte técnico y automatización empresarial.',
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
    },
  }
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
          {children}
          <Toaster />
          <ChunkLoadErrorHandler />
        </ThemeProvider>
      </body>
    </html>
  )
}
