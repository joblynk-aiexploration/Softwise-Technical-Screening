import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/talent/'],
    },
    sitemap: 'https://screening.joblynk.ai/sitemap.xml',
    host: 'https://screening.joblynk.ai',
  };
}
