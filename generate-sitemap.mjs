import fs from 'fs';
import path from 'path';
import { calculators } from './src/data/calculators.ts';

const SITE_URL = 'https://YOUR_DOMAIN.COM'; // IMPORTANT: Replace with your domain

const staticPages = [
  '/',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/analytics',
  '/help',
  '/feedback',
  '/cookie-policy',
  '/cookie-settings',
];

const calculatorPages = calculators.map(calc => `/calculator/${calc.id}`);

const allPages = [...staticPages, ...calculatorPages];

const sitemap = `
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages.map(page => `
    <url>
      <loc>${SITE_URL}${page}</loc>
      <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${page === '/' ? '1.0' : '0.8'}</priority>
    </url>
  `).join('')}
</urlset>
`.trim();

const distPath = path.resolve(process.cwd(), 'dist');
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath);
}

fs.writeFileSync(path.resolve(distPath, 'sitemap.xml'), sitemap);

console.log('✅ sitemap.xml generated successfully!');
