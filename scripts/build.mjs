import fs from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { root, loadCatalog } from './validate-catalog.mjs';
import { sortApps } from '../js/catalog.js';
import { BASE, resolveOrigin } from './base.mjs';

const catalog = await loadCatalog();
const out = path.join(root, 'dist');

await fs.rm(out, { recursive: true, force: true });
await fs.mkdir(out, { recursive: true });
await fs.writeFile(path.join(out, '.nojekyll'), '');
for (const dir of ['css', 'js', 'assets']) await fs.cp(path.join(root, dir), path.join(out, dir), { recursive: true });

const apps = sortApps(catalog.apps.filter(app => app.status === 'published'));
const publicApps = apps.map(({ evidencePath, ...app }) => app);
await fs.mkdir(path.join(out, 'data'));
await fs.writeFile(path.join(out, 'data/apps.json'), JSON.stringify({ schemaVersion: catalog.schemaVersion, apps: publicApps }));

const origin = resolveOrigin(process.env.PUBLIC_URL);

const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({ amp: '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] ?? c));

function head(prefix) {
  const title = 'ApplicationHub — HD2Lab’s web app shelf';
  const description = 'HD2Lab’s web applications in one place. To-dos, photos, film developing, and machine-learning practice — all open right in your browser, no install.';
  return [
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    '<meta name="theme-color" content="#101110">',
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}">`,
    '<meta property="og:type" content="website">',
    '<meta property="og:site_name" content="ApplicationHub">',
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    origin ? `<link rel="canonical" href="${escapeHtml(origin)}">` : '',
    origin ? `<meta property="og:url" content="${escapeHtml(origin)}">` : '',
    origin ? `<meta property="og:image" content="${escapeHtml(origin)}assets/branding/share.png">` : '',
    '<meta name="twitter:card" content="summary_large_image">',
    `<link rel="icon" href="${prefix}assets/branding/favicon.svg" type="image/svg+xml">`,
    `<link rel="icon" href="${prefix}assets/branding/favicon-32x32.png" sizes="32x32" type="image/png">`,
    `<link rel="apple-touch-icon" href="${prefix}assets/branding/apple-touch-icon.png" sizes="180x180">`,
    `<link rel="shortcut icon" href="${prefix}assets/branding/favicon.ico">`,
    `<link rel="stylesheet" href="${prefix}css/style.css">`,
  ].filter(Boolean).join('');
}

const header = prefix => `<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header shell">
  <a class="brand" href="${prefix}" aria-label="ApplicationHub home"><span class="mark" aria-hidden="true"></span><span class="brand-name">HD2Lab</span><em>ApplicationHub</em></a>
  <nav aria-label="Main menu">
    <a class="nav-active" href="${prefix}#apps">Browse Apps</a>
    <a class="hub-link" href="https://hyangdan2.github.io/GameHub/">GameHub <span aria-hidden="true">↗</span></a>
    <a class="hub-link" href="https://hyangdan2.github.io/TechnicalHub/">TechnicalHub <span aria-hidden="true">↗</span></a>
    <a class="web-hq-link" href="https://hyangdan2.github.io/">Web-HQ <span aria-hidden="true">↗</span></a>
  </nav>
</header>`;

const footer = `<footer class="shell site-footer">
  <div><span class="footer-brand">HD2Lab <span class="accent">/</span> ApplicationHub</span><p>A shelf of small, useful web apps.</p></div>
  <a href="https://github.com/HyangDan2">Made by HyangDan2 <span aria-hidden="true">↗</span></a>
</footer>`;

let home = await fs.readFile(path.join(root, 'index.html'), 'utf8');
home = home.replace('<!--HEAD-->', head('./')).replace('<!--HEADER-->', header('./')).replace('<!--FOOTER-->', footer);
await fs.writeFile(path.join(out, 'index.html'), home);

const digest = createHash('sha256').update(JSON.stringify(publicApps)).digest('hex');
await fs.writeFile(path.join(out, 'release.json'), JSON.stringify({ digest, count: publicApps.length }));
console.log(`Built ${publicApps.length} published apps in dist/ (base ${BASE}).`);
