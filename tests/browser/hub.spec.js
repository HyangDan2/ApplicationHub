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
      await image.scrollIntoViewIfNeeded();   // thumbnails are loading="lazy"; bring each one into view first
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

test('HD2Lab brand, shared hub tabs, and icon links are in place', async ({ page }) => {
  await ready(page);
  await expect(page.locator('.brand .brand-name')).toHaveText('HD2Lab');
  await expect(page.locator('.brand em')).toHaveText('ApplicationHub');

  // One tab row for the whole family: Home, Apps, Play, Tech, Diary, About.
  const tabs = page.locator('.header-nav .nav-tab');
  await expect(tabs).toHaveCount(6);
  await expect(tabs.nth(0)).toHaveText('Home');
  await expect(tabs.nth(0)).toHaveAttribute('href', 'https://hyangdan2.github.io/');
  await expect(tabs.nth(1)).toHaveText('Apps');
  await expect(tabs.nth(1)).toHaveAttribute('href', 'https://hyangdan2.github.io/ApplicationHub/');
  await expect(tabs.nth(2)).toHaveAttribute('href', 'https://hyangdan2.github.io/GameHub/');
  await expect(tabs.nth(3)).toHaveAttribute('href', 'https://hyangdan2.github.io/TechnicalHub/');
  await expect(tabs.nth(4)).toHaveAttribute('href', 'https://hyangdan2.github.io/diary/');
  await expect(tabs.nth(5)).toHaveText('About');
  await expect(tabs.nth(5)).toHaveAttribute('href', 'https://hyangdan2.github.io/about/');
  // Only this hub is marked current, and the old separate Web-HQ link is gone.
  await expect(page.locator('.header-nav [aria-current="page"]')).toHaveCount(1);
  await expect(tabs.nth(1)).toHaveAttribute('aria-current', 'page');
  await expect(page.locator('.web-hq-link, .hub-link')).toHaveCount(0);

  await expect(page.locator('link[rel="icon"][type="image/svg+xml"]')).toHaveAttribute('href', './assets/branding/favicon.svg');
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute('href', './assets/branding/apple-touch-icon.png');
  for (const href of ['./assets/branding/favicon.svg', './assets/branding/favicon-32x32.png', './assets/branding/apple-touch-icon.png', './assets/branding/favicon.ico']) {
    expect(await page.evaluate(async url => (await fetch(url)).status, href)).toBe(200);
  }
  await expect(page.locator('.header-inner .mark')).toHaveCount(1);
});

test('the mobile ≡ unfolds the right drawer with the full hub list', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await ready(page);
  await expect(page.locator('.header-nav')).toBeHidden();
  await expect(page.locator('#mobile-drawer')).not.toHaveClass(/is-open/);

  const menu = page.getByRole('button', { name: 'Open menu' });
  const box = await menu.boundingBox();
  expect(Math.round(box.width)).toBe(44);
  expect(Math.round(box.height)).toBe(44);
  await menu.click();

  const drawer = page.locator('#mobile-drawer');
  await expect(drawer).toHaveClass(/is-open/);
  await expect(drawer).toHaveAttribute('aria-hidden', 'false');
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('body')).toHaveClass(/drawer-open/);
  await expect(page.locator('.drawer-backdrop')).toBeVisible();

  const items = drawer.locator('.drawer-item');
  await expect(items).toHaveCount(6);
  await expect(items.nth(0)).toContainText('00 / HQ');
  await expect(items.nth(0)).toHaveAttribute('href', 'https://hyangdan2.github.io/');
  await expect(items.nth(1)).toContainText('01 / APPS');
  await expect(items.nth(2)).toContainText('02 / PLAY');
  await expect(items.nth(3)).toContainText('03 / EXPLORE');
  await expect(items.nth(4)).toContainText('04 / DIARY');
  await expect(items.nth(5)).toContainText('05 / ABOUT');
  await expect(items.nth(5)).toHaveAttribute('href', 'https://hyangdan2.github.io/about/');
  await expect(drawer.locator('[aria-current="page"]')).toHaveCount(1);
  await expect(drawer.locator('[aria-current="page"]')).toContainText('ApplicationHub');

  // The floating theme toggle steps aside while the drawer is open.
  await expect.poll(() => page.locator('#theme-toggle').evaluate(node => getComputedStyle(node).opacity)).toBe('0');
  expect(await page.locator('#theme-toggle').evaluate(node => getComputedStyle(node).pointerEvents)).toBe('none');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

  await page.keyboard.press('Escape');
  await expect(drawer).not.toHaveClass(/is-open/);
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('body')).not.toHaveClass(/drawer-open/);
  await expect(menu).toBeFocused();
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
