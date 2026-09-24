import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.SITE_URL || 'https://cedanet.net'

  return [
    {
      url: siteUrl,
      lastModified: new Date('2026-09-24'),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
