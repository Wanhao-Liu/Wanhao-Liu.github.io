import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://wanhao-liu.github.io';
  const paths = ['/', '/en/', '/zh/', '/en/selected-publications/', '/zh/selected-publications/', '/en/publications/', '/zh/publications/', '/en/projects/', '/zh/projects/'];
  return paths.map((path) => ({ url: `${base}${path}`, lastModified: new Date('2026-08-10'), changeFrequency: path.includes('publications') ? 'monthly' : 'yearly', priority: path === '/' || path === '/en/' || path === '/zh/' ? 1 : 0.8 }));
}
