import type { MetadataRoute } from 'next';

const base = 'https://screening.joblynk.ai';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/pricing',
    '/features',
    '/services',
    '/blog',
    '/contact-us',
    '/faq',
    '/security',
    '/privacy-policy',
    '/terms-conditions',
    '/login',
    '/forgot-password',
    '/reset-password',
  ];

  const now = new Date();
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));
}
