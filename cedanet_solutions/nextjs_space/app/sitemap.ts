import type { MetadataRoute } from 'next'
import { estimadorActivo } from '@/lib/features'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.SITE_URL || 'https://www.cedanet.net'

  return [
    {
      url: siteUrl,
      lastModified: new Date('2026-09-24'),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...(estimadorActivo
      ? [{ url: `${siteUrl}/estimador`, lastModified: new Date('2026-09-25'), changeFrequency: 'monthly' as const, priority: 0.8 }]
      : []),
  ]
}
