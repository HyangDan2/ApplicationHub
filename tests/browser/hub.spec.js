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
  await page.route('**/assets/apps/midpoint.jpg', route => route.abort());
  await ready(page);
  await expect(page.locator('[data-app="midpoint"] img')).toHaveAttribute('src', './assets/apps/placeholder.svg');
});

test('draft, maintenance, and hostile metadata render safely', async ({ page }) => {
  const data = structuredClone(catalog);
  data.apps.find(app => app.id === 'midpoint').status = 'draft';
  data.apps.find(app => app.id === 'shutterplate').status = 'maintenance';
  data.apps.find(app => app.id === 'dos-player').title = '<img src=x onerror=alert(1)>';
  await page.route('**/data/apps.json', route => route.fulfill({ json: data }));
  await page.goto('./');
  await expect(page.locator('.app-card')).toHaveCount(published.length - 2);
  await expect(page.locator('[data-app="shutterplate"]')).toHaveCount(0);
  await expect(page.locator('[data-app="dos-player"] h3')).toHaveText('<img src=x onerror=alert(1)>');
  await expect(page.locator('[data-app="dos-player"] h3 img')).toHaveCount(0);
});

test('HD2Lab brand, shared hub tabs, and icon links are in place', async ({ page }) => {
  await ready(page);
  await expect(page.locator('.brand .brand-name')).toHaveText('HD2Lab');
  await expect(page.locator('.brand em')).toHaveText('ApplicationHub');

  // One tab row for the whole family: Home, Apps, Play, Tech, Diary (dropdown),
  // Info (dropdown), About.
  const tabs = page.locator('.header-nav .nav-tab');
  await expect(tabs).toHaveCount(7);
  await expect(tabs.nth(0)).toHaveText('Home');
  await expect(tabs.nth(0)).toHaveAttribute('href', 'https://hyangdan2.github.io/');
  await expect(tabs.nth(1)).toHaveText('Apps');
  await expect(tabs.nth(1)).toHaveAttribute('href', 'https://hyangdan2.github.io/ApplicationHub/');
  await expect(tabs.nth(2)).toHaveAttribute('href', 'https://hyangdan2.github.io/GameHub/');
  await expect(tabs.nth(3)).toHaveAttribute('href', 'https://hyangdan2.github.io/TechnicalHub/');
  await expect(tabs.nth(4)).toHaveAttribute('href', 'https://hyangdan2.github.io/diary/');
  await expect(tabs.nth(5)).toHaveText('Info');
  await expect(tabs.nth(5)).toHaveAttribute('href', 'https://hyangdan2.github.io/InformationHub/');
  await expect(tabs.nth(6)).toHaveText('About');
  await expect(tabs.nth(6)).toHaveAttribute('href', 'https://hyangdan2.github.io/about/');
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

const PLAY_MENU = [
  ['VALKYRIE EIRA', 'https://hyangdan2.github.io/AGPilot0001/'],
  ['Particle Beat', 'https://hyangdan2.github.io/CDXPilot0004/'],
  ['VALKYRIE', 'https://hyangdan2.github.io/CDXPilot0005/'],
  ['ChibiLink', 'https://hyangdan2.github.io/CDXPilot0006/'],
];
const DIARY_MENU = [
  ['Devlog', 'https://hyangdan2.github.io/diary/categories/devlog/'],
  ['Architecture', 'https://hyangdan2.github.io/diary/categories/architecture/'],
  ['Troubleshooting', 'https://hyangdan2.github.io/diary/categories/troubleshooting/'],
  ['Notes', 'https://hyangdan2.github.io/diary/categories/notes/'],
];
const INFO_MENU = [
  ['China AI', 'https://hyangdan2.github.io/InformationHub/china-ai/'],
  ['US Markets', 'https://hyangdan2.github.io/InformationHub/us-markets/'],
];

test('the mobile ≡ unfolds the right drawer as a one-line list whose Apps, Play, Diary, and Info rows unfold one at a time', async ({ page }) => {
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

  // One compact line per hub: no index meta, no description card.
  const items = drawer.locator('.drawer-item');
  await expect(items).toHaveCount(7);
  for (const [index, label] of ['Web-HQ', 'Apps', 'Play', 'Tech', 'Diary', 'Info', 'About'].entries()) {
    await expect(items.nth(index)).toHaveText(label);
    const row = await items.nth(index).boundingBox();
    expect(row.height).toBeGreaterThanOrEqual(44);
    expect(row.height).toBeLessThanOrEqual(48);
  }
  await expect(items.nth(0)).toHaveAttribute('href', 'https://hyangdan2.github.io/');
  await expect(items.nth(5)).toHaveAttribute('href', 'https://hyangdan2.github.io/InformationHub/');
  await expect(items.nth(6)).toHaveAttribute('href', 'https://hyangdan2.github.io/about/');
  await expect(drawer.locator('.drawer-item-meta, .drawer-item-desc')).toHaveCount(0);
  await expect(drawer.locator('[aria-current="page"]')).toHaveCount(1);
  await expect(drawer.locator('[aria-current="page"]')).toHaveText('Apps');
  // Web-HQ (Home), Tech, and About stay plain links: exactly four accordions.
  await expect(drawer.locator('.drawer-group')).toHaveCount(4);
  // No "Top" entry in any section list: the row label above is the top page.
  await expect(drawer.locator('.drawer-sub a').filter({ hasText: /^Top$/ })).toHaveCount(0);

  const group = key => drawer.locator(`.drawer-group[data-drawer-group="${key}"]`);
  const heightOf = locator => locator.evaluate(node => Math.round(node.getBoundingClientRect().height));
  const linksOf = key => group(key).locator('.drawer-sub a');

  // Apps is the hub you are on, so its group starts unfolded.
  const appsToggle = drawer.getByRole('button', { name: 'Apps sections' });
  await expect(appsToggle).toHaveAttribute('aria-expanded', 'true');
  await expect(linksOf('apps')).toHaveCount(published.length);
  for (const [index, [label, href]] of published.map(app => [app.title, app.launchUrl]).entries()) {
    await expect(linksOf('apps').nth(index)).toHaveText(label);
    await expect(linksOf('apps').nth(index)).toHaveAttribute('href', href);
  }
  // The catalogue is longer than the 224px window the Apps group unfolds into, so
  // that panel scrolls instead of pushing Play / Tech / Diary off the drawer.
  const appsSub = group('apps').locator('.drawer-sub');
  await expect(appsSub).toHaveClass(/is-scroll/);
  expect(await appsSub.evaluate(node => getComputedStyle(node).maxHeight)).toBe('224px');
  expect(await appsSub.evaluate(node => getComputedStyle(node).overflowY)).toBe('auto');
  expect(await heightOf(appsSub)).toBe(224);
  expect(await appsSub.evaluate(node => node.scrollHeight)).toBeGreaterThan(224);

  // Play starts closed. Opening it folds Apps — one accordion at a time.
  const playToggle = drawer.getByRole('button', { name: 'Play sections' });
  await expect(playToggle).toHaveAttribute('aria-expanded', 'false');
  expect(await heightOf(group('play').locator('.drawer-sub'))).toBe(0);
  expect(await linksOf('play').first().evaluate(node => node.closest('[inert]') !== null)).toBe(true);
  await playToggle.click();
  await expect(playToggle).toHaveAttribute('aria-expanded', 'true');
  await expect(appsToggle).toHaveAttribute('aria-expanded', 'false');
  await expect.poll(() => heightOf(appsSub)).toBe(0);
  await expect(linksOf('play')).toHaveCount(PLAY_MENU.length);
  for (const [index, [label, href]] of PLAY_MENU.entries()) {
    await expect(linksOf('play').nth(index)).toHaveText(label);
    await expect(linksOf('play').nth(index)).toHaveAttribute('href', href);
  }
  await expect.poll(() => heightOf(group('play').locator('.drawer-sub'))).toBeGreaterThan(PLAY_MENU.length * 38);
  expect(await linksOf('play').first().evaluate(node => node.closest('[inert]') !== null)).toBe(false);

  // Diary is its own accordion with the four categories under it, and it folds Play.
  const diaryRow = group('diary').locator('.drawer-split .drawer-item');
  await expect(diaryRow).toHaveAttribute('href', 'https://hyangdan2.github.io/diary/');
  const diaryToggle = drawer.getByRole('button', { name: 'Diary sections' });
  await expect(diaryToggle).toHaveAttribute('aria-expanded', 'false');
  await diaryToggle.click();
  await expect(diaryToggle).toHaveAttribute('aria-expanded', 'true');
  await expect(playToggle).toHaveAttribute('aria-expanded', 'false');
  await expect(linksOf('diary')).toHaveCount(DIARY_MENU.length);
  for (const [index, [label, href]] of DIARY_MENU.entries()) {
    await expect(linksOf('diary').nth(index)).toHaveText(label);
    await expect(linksOf('diary').nth(index)).toHaveAttribute('href', href);
  }
  await expect.poll(() => heightOf(group('diary').locator('.drawer-sub'))).toBeGreaterThan(150);

  // One step of indentation under the Diary row.
  const diaryLeft = (await diaryRow.boundingBox()).x;
  const sectionLeft = (await linksOf('diary').first().boundingBox()).x;
  expect(sectionLeft - diaryLeft).toBeGreaterThanOrEqual(12);
  expect(await linksOf('diary').first().evaluate(node => getComputedStyle(node).paddingLeft)).toBe('20px');

  // Info is its own accordion with the China AI channel under it.
  const infoRow = group('info').locator('.drawer-split .drawer-item');
  await expect(infoRow).toHaveAttribute('href', 'https://hyangdan2.github.io/InformationHub/');
  const infoToggle = drawer.getByRole('button', { name: 'Info sections' });
  await expect(infoToggle).toHaveAttribute('aria-expanded', 'false');
  await infoToggle.click();
  await expect(infoToggle).toHaveAttribute('aria-expanded', 'true');
  await expect(linksOf('info')).toHaveCount(INFO_MENU.length);
  for (const [index, [label, href]] of INFO_MENU.entries()) {
    await expect(linksOf('info').nth(index)).toHaveText(label);
    await expect(linksOf('info').nth(index)).toHaveAttribute('href', href);
  }
  await expect.poll(() => heightOf(group('info').locator('.drawer-sub'))).toBeGreaterThan(38);
  await expect(diaryToggle).toHaveAttribute('aria-expanded', 'false');
  const infoLeft = (await infoRow.boundingBox()).x;
  expect((await linksOf('info').first().boundingBox()).x - infoLeft).toBeGreaterThanOrEqual(12);

  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

  // Folding the open group leaves every accordion closed.
  await infoToggle.click();
  await expect(playToggle).toHaveAttribute('aria-expanded', 'false');
  await expect(diaryToggle).toHaveAttribute('aria-expanded', 'false');
  await expect(infoToggle).toHaveAttribute('aria-expanded', 'false');
  await expect.poll(() => heightOf(group('play').locator('.drawer-sub'))).toBe(0);
  await expect.poll(() => heightOf(group('diary').locator('.drawer-sub'))).toBe(0);
  await expect.poll(() => heightOf(group('info').locator('.drawer-sub'))).toBe(0);

  // The theme toggle now lives in the header, so it stays put while the drawer
  // is open; the drawer backdrop is what covers it.
  expect(await page.locator('#theme-toggle').evaluate(node => getComputedStyle(node).opacity)).toBe('1');
  expect(await page.locator('#theme-toggle').evaluate(node => !!node.closest('.site-header'))).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

  await page.keyboard.press('Escape');
  await expect(drawer).not.toHaveClass(/is-open/);
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('body')).not.toHaveClass(/drawer-open/);
  await expect(menu).toBeFocused();
});

test('the Apps, Play, Diary, and Info tabs unfold their sections on hover and keep their own links', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await ready(page);
  const menus = [
    ['apps', 'Apps', 'https://hyangdan2.github.io/ApplicationHub/', published.map(app => [app.title, app.launchUrl])],
    ['play', 'Play', 'https://hyangdan2.github.io/GameHub/', PLAY_MENU],
    ['diary', 'Diary', 'https://hyangdan2.github.io/diary/', DIARY_MENU],
    ['info', 'Info', 'https://hyangdan2.github.io/InformationHub/', INFO_MENU],
  ];
  for (const [key, label, href, entries] of menus) {
    const wrapper = page.locator(`.nav-dropdown[data-nav-group="${key}"]`);
    const tab = wrapper.locator('.nav-tab');
    await expect(tab).toHaveText(label);
    await expect(tab).toHaveAttribute('href', href);
    const panel = wrapper.locator('.nav-dropdown-panel');
    const visibility = () => panel.evaluate(node => getComputedStyle(node).visibility);
    expect(await visibility()).toBe('hidden');

    await tab.hover();
    await expect.poll(visibility).toBe('visible');
    await expect(panel.locator('a')).toHaveCount(entries.length);
    for (const [index, [text, target]] of entries.entries()) {
      await expect(panel.locator('a').nth(index)).toHaveText(text);
      await expect(panel.locator('a').nth(index)).toHaveAttribute('href', target);
    }
    await expect(panel.locator('a').filter({ hasText: /^Top$/ })).toHaveCount(0);
    await expect(panel.locator('a').first()).toBeVisible();
    // A section longer than five entries scrolls inside the menu instead of running off screen.
    if (entries.length > 5) {
      await expect(panel).toHaveClass(/is-scroll/);
      expect(await panel.evaluate(node => getComputedStyle(node).maxHeight)).toBe('224px');
      expect(await panel.evaluate(node => getComputedStyle(node).overflowY)).toBe('auto');
      expect(await panel.evaluate(node => node.scrollHeight)).toBeGreaterThan(await panel.evaluate(node => node.clientHeight));
    } else {
      await expect(panel).not.toHaveClass(/is-scroll/);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

    await page.mouse.move(10, 600);
    await expect.poll(visibility).toBe('hidden');

    // Keyboard users reach the sections by focusing the tab, then tabbing in.
    await tab.focus();
    await expect.poll(visibility).toBe('visible');
    await page.keyboard.press('Tab');
    await expect(panel.locator('a').first()).toBeFocused();
    await expect.poll(visibility).toBe('visible');
    // Info holds a single channel; the others have more than one link.
    if (entries.length > 1) {
      await page.keyboard.press('Tab');
      await expect(panel.locator('a').nth(1)).toBeFocused();
      await expect.poll(visibility).toBe('visible');
    }
  }
});

test('keyboard order reaches the skip link and a card link with visible focus', async ({ page }) => {
  await ready(page);
  await page.keyboard.press('Tab');
  await expect(page.getByText('Skip to content')).toBeFocused();
  const app = appById('film-studio');
  const target = page.getByRole('link', { name: `Open ${app.title}` });
  for (let i = 0; i < 60 && !(await target.evaluate(node => node === document.activeElement)); i++) await page.keyboard.press('Tab');
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
