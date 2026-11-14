import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import { filterApps } from '../../js/catalog.js';

const catalog = JSON.parse(await fs.readFile(new URL('../../data/apps.json', import.meta.url), 'utf8'));
const published = catalog.apps.filter(app => app.status === 'published');
const appById = id => catalog.apps.find(app => app.id === id);
const matching = state => filterApps(catalog.apps, { q: '', category: '', ...state }).length;
const ready = async page => {
  await page.goto('./');
  await expect(page.locator('.app-card')).toHaveCount(published.length);
};

test('published apps render as full-card links to their exact launch destination', async ({ page }) => {
  await ready(page);
  for (const app of published) {
    const link = page.getByRole('link', { name: `Open ${app.title}` });
    await expect(link).toHaveAttribute('href', app.launchUrl);
    await expect(link).toHaveClass(/app-card/);
  }
  await expect(page.locator('#app-count')).toHaveText(String(published.length).padStart(2, '0'));
});

test('the card itself is the link and no separate action button remains', async ({ page }) => {
  await ready(page);
  await expect(page.locator('a.app-card')).toHaveCount(published.length);
  await expect(page.locator('.action-link')).toHaveCount(0);
  await expect(page.locator('a.app-card button, a.app-card a')).toHaveCount(0);
  for (const app of published) {
    const card = page.locator(`[data-app="${app.id}"]`);
    await expect(card).toHaveCount(1);
    expect(await card.evaluate(node => node.tagName)).toBe('A');
    await expect(card.locator('.card-open')).toHaveCount(1);
  }
  const target = page.locator(`[data-app="${published[0].id}"]`);
  await page.route(published[0].launchUrl, route => route.fulfill({ body: '<h1>App destination</h1>', contentType: 'text/html' }));
  await target.locator('.card-title').click();
  await expect(page).toHaveURL(published[0].launchUrl);
});

for (const width of [360, 390, 768, 1440]) {
  test(`layout and assets at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await ready(page);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    for (const image of await page.locator('.card-image img').all()) {
      await expect(image).toHaveJSProperty('naturalWidth', 960);
    }
    const broken = await page.locator('.card-image img').evaluateAll(nodes => nodes.filter(node => !node.complete || node.naturalWidth === 0).length);
    expect(broken).toBe(0);
    expect(errors).toEqual([]);
  });
}

test('search, category filter, reset, and browser history stay in sync', async ({ page }) => {
  await ready(page);
  await page.getByRole('searchbox', { name: 'Search apps' }).fill('photo');
  await expect(page.locator('.app-card')).toHaveCount(matching({ q: 'photo' }));
  await page.getByRole('button', { name: 'Learning', exact: true }).click();
  await expect(page.getByText('No app matches that yet.')).toBeVisible();
  await page.getByRole('button', { name: 'Show all apps' }).click();
  await expect(page.locator('.app-card')).toHaveCount(published.length);
  await expect(page.locator('#search')).toHaveValue('');
  await page.getByRole('button', { name: 'Photo', exact: true }).click();
  await expect(page.locator('.app-card')).toHaveCount(matching({ category: 'Photo' }));
  await expect(page).toHaveURL(/category=Photo/);
  await page.goBack();
  await expect(page.locator('.app-card')).toHaveCount(published.length);
  await expect(page.getByRole('button', { name: 'Reset' })).toBeDisabled();
  await page.getByRole('button', { name: 'Photo', exact: true }).click();
  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(page.locator('.app-card')).toHaveCount(published.length);
  await expect(page).not.toHaveURL(/category=/);
});

test('catalog failure offers a working retry', async ({ page }) => {
  let fail = true;
  await page.route('**/data/apps.json', route => fail ? route.fulfill({ status: 503, body: '' }) : route.fulfill({ json: catalog }));
  await page.goto('./');
  await expect(page.getByRole('alert')).toBeVisible();
  fail = false;
  await page.getByRole('button', { name: 'Try again' }).click();
  await expect(page.locator('.app-card')).toHaveCount(published.length);
});

test('broken thumbnail falls back to the local placeholder', async ({ page }) => {
  await page.route('**/assets/apps/photos.jpg', route => route.abort());
  await ready(page);
  await expect(page.locator('[data-app="photos"] img')).toHaveAttribute('src', './assets/apps/placeholder.svg');
});

test('draft, maintenance, and hostile metadata render safely', async ({ page }) => {
  const data = structuredClone(catalog);
  data.apps.find(app => app.id === 'photos').status = 'draft';
  data.apps.find(app => app.id === 'film-studio').status = 'maintenance';
  data.apps.find(app => app.id === 'todo-master').title = '<img src=x onerror=alert(1)>';
  await page.route('**/data/apps.json', route => route.fulfill({ json: data }));
  await page.goto('./');
  await expect(page.locator('.app-card')).toHaveCount(published.length - 2);
  await expect(page.locator('[data-app="film-studio"]')).toHaveCount(0);
  await expect(page.locator('[data-app="todo-master"] h3')).toHaveText('<img src=x onerror=alert(1)>');
  await expect(page.locator('[data-app="todo-master"] h3 img')).toHaveCount(0);
});

test('HD2Lab brand, cross-hub navigation, and icon links are in place', async ({ page }) => {
  await ready(page);
  await expect(page.locator('.brand .brand-name')).toHaveText('HD2Lab');
  await expect(page.locator('.brand em')).toHaveText('ApplicationHub');
  await expect(page.getByRole('link', { name: 'GameHub' })).toHaveAttribute('href', 'https://hyangdan2.github.io/GameHub/');
  await expect(page.getByRole('link', { name: 'TechnicalHub' })).toHaveAttribute('href', 'https://hyangdan2.github.io/TechnicalHub/');
  await expect(page.locator('.web-hq-link')).toHaveAttribute('href', 'https://hyangdan2.github.io/');
  await expect(page.locator('link[rel="icon"][type="image/svg+xml"]')).toHaveAttribute('href', './assets/branding/favicon.svg');
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute('href', './assets/branding/apple-touch-icon.png');
  for (const href of ['./assets/branding/favicon.svg', './assets/branding/favicon-32x32.png', './assets/branding/apple-touch-icon.png', './assets/branding/favicon.ico']) {
    expect(await page.evaluate(async url => (await fetch(url)).status, href)).toBe(200);
  }
  await expect(page.locator('.brand-logo')).toHaveCount(1);
});

test('keyboard order reaches the skip link and a card link with visible focus', async ({ page }) => {
  await ready(page);
  await page.keyboard.press('Tab');
  await expect(page.getByText('Skip to content')).toBeFocused();
  const app = appById('film-studio');
  const target = page.getByRole('link', { name: `Open ${app.title}` });
  for (let i = 0; i < 24 && !(await target.evaluate(node => node === document.activeElement)); i++) await page.keyboard.press('Tab');
  await expect(target).toBeFocused();
  expect(await target.evaluate(node => getComputedStyle(node).outlineStyle)).toBe('solid');
  await page.route(app.launchUrl, route => route.fulfill({ body: '<h1>App destination</h1>', contentType: 'text/html' }));
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(app.launchUrl);
});

test('long titles and enlarged text fit a small screen', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  const data = structuredClone(catalog);
  data.apps.find(app => app.id === 'machine-learning-lab').title = 'A very long application name for a small browser window';
  await page.route('**/data/apps.json', route => route.fulfill({ json: data }));
  await ready(page);
  await page.addStyleTag({ content: 'p,a,h2,h3,span,small {font-size:140% !important}' });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('reduced motion removes card transitions', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await ready(page);
  expect(await page.locator('.app-card').first().evaluate(node => getComputedStyle(node).transitionDuration)).toBe('0s');
});
