const fs = require('fs');
const path = require('path');

// Read tools.ts
const toolsFile = fs.readFileSync(path.join(__dirname, 'src/data/tools.ts'), 'utf8');

// Extract tools using regex
const toolsRegex = /\{ id: '([^']+)', name: '([^']+)', description: '([^']+)', category: '([^']+)', icon: [^,]+, path: '([^']+)'(?:, trending: true)? \}/g;
let match;
const tools = [];

while ((match = toolsRegex.exec(toolsFile)) !== null) {
  tools.push({
    id: match[1],
    path: match[5]
  });
}

const DOMAIN = 'https://lumina.tools';

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${DOMAIN}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${DOMAIN}/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;

const categories = ['developer', 'image', 'pdf', 'text', 'calculator', 'utility', 'presentation'];
categories.forEach(cat => {
  sitemap += `  <url>
    <loc>${DOMAIN}/category/${cat}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
});

tools.forEach(tool => {
  sitemap += `  <url>
    <loc>${DOMAIN}${tool.path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>\n`;
});

sitemap += `</urlset>`;

fs.writeFileSync(path.join(__dirname, 'public/sitemap.xml'), sitemap);
console.log('Sitemap generated with ' + tools.length + ' tools.');
