import * as fs from 'fs';
import { getAllPosts } from '../lib/api';
const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({ res }) => {
  const BASE_URL = 'http://www.calloutsevolved.com';

  const standardPaths = fs
    .readdirSync('pages')
    .filter((standardPage) => {
      return ![
        'api',
        'blog',
        'join',
        'session',
        '_app.js',
        '_document.js',
        '404.js',
        'sitemap.xml.js',
        'updateProfile.js',
      ].includes(standardPage);
    })
    .map((standardPagePath) => {
      return `${BASE_URL}/${standardPagePath.slice(0, -3)}`;
    });

  const blogPaths = getAllPosts(['slug']).map((blogPagePath) => {
    return `${BASE_URL}/blog/${blogPagePath.slug}`;
  });

  const allPaths = [...standardPaths, ...blogPaths];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPaths
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>monthly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
