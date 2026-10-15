import type { MetadataRoute } from 'next'
import { estimadorActivo } from '@/lib/features'
import { GUIAS } from '@/lib/guias'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.SITE_URL || 'https://www.cedanet.net'

  return [
    {
      url: siteUrl,
      lastModified: new Date('2026-10-06'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...(estimadorActivo
      ? [{ url: `${siteUrl}/estimador`, lastModified: new Date('2026-09-25'), changeFrequency: 'monthly' as const, priority: 0.8 }]
      : []),
    { url: `${siteUrl}/guias`, lastModified: new Date('2026-10-15'), changeFrequency: 'monthly', priority: 0.7 },
    ...GUIAS.map((g) => ({ url: `${siteUrl}/guias/${g.slug}`, lastModified: new Date(g.publicada), changeFrequency: 'monthly' as const, priority: 0.7 })),
  ]
}
