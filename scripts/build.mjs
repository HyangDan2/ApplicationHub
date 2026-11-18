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
// Social card: same HD2Lab header spec as PKPilot0001~0003 (100px mark + 62px wordmark).
// The image URL is absolute so previews resolve even from a local build.
const socialImage = `${origin ?? 'https://hyangdan2.github.io/ApplicationHub/'}assets/branding/share.png?v=20261116-soft-iris`;

const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({ amp: '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] ?? c));

// Runs in <head>, before the first paint: dark mode from localStorage('hd2-theme').
const THEME_BOOT = "(function(){try{if(localStorage.getItem('hd2-theme')==='dark'){document.documentElement.dataset.theme='dark';var m=document.getElementById('theme-color');if(m)m.setAttribute('content','#0B1020');}}catch(e){}})();";

function head(prefix) {
  const title = 'ApplicationHub — HD2Lab’s web app shelf';
  const description = 'HD2Lab’s web applications in one place. To-dos, photos, film developing, and machine-learning practice — all open right in your browser, no install.';
  return [
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    '<meta name="theme-color" id="theme-color" content="#FAFAFD">',
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}">`,
    '<meta property="og:type" content="website">',
    '<meta property="og:site_name" content="ApplicationHub">',
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    origin ? `<link rel="canonical" href="${escapeHtml(origin)}">` : '',
    origin ? `<meta property="og:url" content="${escapeHtml(origin)}">` : '',
    `<meta property="og:image" content="${escapeHtml(socialImage)}">`,
    `<meta property="og:image:secure_url" content="${escapeHtml(socialImage)}">`,
    '<meta property="og:image:type" content="image/png">',
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    '<meta property="og:image:alt" content="HD2Lab | ApplicationHub — pick your next app.">',
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="twitter:title" content="${escapeHtml(title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(description)}">`,
    `<meta name="twitter:image" content="${escapeHtml(socialImage)}">`,
    `<link rel="icon" href="${prefix}assets/branding/favicon.svg" type="image/svg+xml">`,
    `<link rel="icon" href="${prefix}assets/branding/favicon-32x32.png" sizes="32x32" type="image/png">`,
    `<link rel="apple-touch-icon" href="${prefix}assets/branding/apple-touch-icon.png" sizes="180x180">`,
    `<link rel="shortcut icon" href="${prefix}assets/branding/favicon.ico">`,
    `<link rel="stylesheet" href="${prefix}css/style.css?v=20261118-hub-nav">`,
    // Apply a stored theme before first paint so dark mode never flashes light.
    `<script>${THEME_BOOT}</script>`,
  ].filter(Boolean).join('');
}

// One navigation for the whole HD2Lab family (Web-HQ, ApplicationHub, GameHub,
// TechnicalHub, HD2's Diary, About). Same markup and classes as Web-HQ so the
// desktop tabs and the mobile drawer stay interchangeable between the hubs.
const HQ = { key: 'home', label: 'Home', index: '00 / HQ', name: 'Web-HQ', desc: 'The front door of HD2Lab', href: 'https://hyangdan2.github.io/' };
const HUBS = [
  { key: 'apps', label: 'Apps', index: '01 / APPS', name: 'ApplicationHub', desc: 'Web applications &amp; tools', href: 'https://hyangdan2.github.io/ApplicationHub/' },
  { key: 'play', label: 'Play', index: '02 / PLAY', name: 'GameHub', desc: 'Games &amp; interaction', href: 'https://hyangdan2.github.io/GameHub/' },
  { key: 'tech', label: 'Tech', index: '03 / EXPLORE', name: 'TechnicalHub', desc: 'Technology, projects &amp; ideas', href: 'https://hyangdan2.github.io/TechnicalHub/' },
  { key: 'diary', label: 'Diary', index: '04 / DIARY', name: 'HD2&rsquo;s Diary', desc: 'Build notes &amp; architecture', href: 'https://hyangdan2.github.io/diary/' },
];
const ABOUT = { key: 'about', label: 'About', index: '05 / ABOUT', name: 'About HD2Lab', desc: 'Who builds this and why', href: 'https://hyangdan2.github.io/about/' };

const tab = (item, active) => item.key === active
  ? `<a class="nav-tab is-active" href="${item.href}" aria-current="page">${item.label}</a>`
  : `<a class="nav-tab" href="${item.href}">${item.label}</a>`;
const drawerItem = (item, active) => `<a class="drawer-item${item.key === active ? ' is-current' : ''}" href="${item.href}"${item.key === active ? ' aria-current="page"' : ''}>
        <span class="drawer-item-meta">${item.index}</span>
        <span class="drawer-item-row"><strong>${item.name}</strong><span aria-hidden="true">↗</span></span>
        <span class="drawer-item-desc">${item.desc}</span>
      </a>`;

const header = (prefix, active = 'apps') => `<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header">
  <div class="header-inner shell">
    <a class="brand" href="${prefix}" aria-label="ApplicationHub home"><span class="mark" aria-hidden="true"></span><span class="brand-name">HD2Lab</span><em>ApplicationHub</em></a>
    <nav class="header-nav" aria-label="Hub categories">
      ${tab(HQ, active)}
      ${HUBS.map(hub => tab(hub, active)).join('\n      ')}
      ${tab(ABOUT, active)}
    </nav>
    <button class="menu-button" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-drawer">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 5.5H17M3 10H17M3 14.5H17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
    </button>
  </div>
</header>
<div class="drawer-backdrop" hidden></div>
<aside id="mobile-drawer" class="mobile-drawer" aria-label="Hub navigation" aria-hidden="true">
  <div class="drawer-head">
    <span class="drawer-title"><span class="mark mark-sm" aria-hidden="true"></span><span>Navigation</span></span>
    <button class="drawer-close" type="button" aria-label="Close menu">&times;</button>
  </div>
  <nav class="drawer-list" aria-label="Hub categories">
      ${drawerItem(HQ, active)}
      ${HUBS.map(hub => drawerItem(hub, active)).join('\n      ')}
      ${drawerItem(ABOUT, active)}
  </nav>
</aside>`;

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
