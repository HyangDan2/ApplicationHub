import fs from 'node:fs/promises';
import { chromium } from '@playwright/test';

const base = process.env.PUBLIC_URL;
if (!base || !base.startsWith('https://') || !base.endsWith('/ApplicationHub/')) {
  throw Error('No deployment configured. Set PUBLIC_URL to the confirmed HTTPS /ApplicationHub/ URL after authorized deployment.');
}
const local = JSON.parse(await fs.readFile('dist/release.json', 'utf8'));
const remote = await fetch(`${base}release.json`, { signal: AbortSignal.timeout(10000) })
  .then(response => { if (!response.ok) throw Error(`Release HTTP ${response.status}`); return response.json(); });
if (local.digest !== remote.digest) throw Error('Deployed content differs from local build.');

const catalog = JSON.parse(await fs.readFile('dist/data/apps.json', 'utf8'));
const apps = catalog.apps.filter(app => app.status === 'published');
const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto(base);
  await page.locator('.app-card').first().waitFor();
  if (await page.locator('.app-card').count() !== local.count) throw Error('Card count mismatch');
  for (const app of apps) {
    const link = page.getByRole('link', { name: `${app.title} 열기` });
    if (await link.getAttribute('href') !== app.launchUrl) throw Error(`Launch link mismatch: ${app.id}`);
  }
  for (const icon of await page.locator('link[rel="icon"], link[rel="apple-touch-icon"]').all()) {
    const href = await icon.getAttribute('href');
    const status = await page.evaluate(async url => (await fetch(url, { method: 'HEAD' })).status, href);
    if (status !== 200) throw Error(`Icon not served: ${href}`);
  }
  console.log(`Hosted release verified: ${apps.length} apps, launch links and icons intact.`);
} finally {
  await browser.close();
}
