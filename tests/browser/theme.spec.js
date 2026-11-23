import { test, expect } from '@playwright/test';

const ready = async page => {
  await page.goto('./');
  await expect(page.locator('.app-card').first()).toBeVisible();
};

const thumb = page => page.locator('#theme-toggle .theme-switch-thumb');
const moon = page => page.locator('#theme-toggle .theme-switch-ic[data-icon="moon"]');
const sun = page => page.locator('#theme-toggle .theme-switch-ic[data-icon="sun"]');

test('the header toggle switches to Navy & Lavender and persists', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await ready(page);
  const toggle = page.locator('#theme-toggle');
  await expect(toggle).toBeVisible();
  expect(await toggle.evaluate(node => getComputedStyle(node).position)).not.toBe('fixed');

  // It closes the top navigation: inside the header, right of the About tab.
  const inHeader = await toggle.evaluate(node => !!node.closest('.site-header'));
  expect(inHeader).toBe(true);
  const about = await page.locator('.header-nav > .nav-tab').last().boundingBox();
  const box = await toggle.boundingBox();
  expect(box.x).toBeGreaterThan(about.x + about.width - 1);
  await expect(page.locator('html')).not.toHaveAttribute('data-theme', 'dark');

  // A 56×30 slide switch: sun, moon and a thumb that sits on the active side.
  expect(Math.round(box.width)).toBe(56);
  expect(Math.round(box.height)).toBe(30);
  expect(await toggle.evaluate(node => getComputedStyle(node).borderRadius)).toBe('999px');
  expect(await toggle.getAttribute('role')).toBe('switch');
  expect((await toggle.innerText()).trim()).toBe('');
  await expect(sun(page)).toBeVisible();
  await expect(moon(page)).toBeVisible();
  await expect(thumb(page)).toHaveCSS('transform', 'none');
  await expect(toggle).toHaveAttribute('aria-checked', 'false');

  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(thumb(page)).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 26, 0)');
  await expect(toggle).toHaveAttribute('aria-checked', 'true');
  await expect(toggle).toHaveAttribute('aria-label', 'Switch to light mode');
  await expect(toggle).toHaveAttribute('title', 'Switch to light mode');
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#0B1020');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).backgroundColor)).toBe('rgb(11, 16, 32)');
  expect(await page.evaluate(() => localStorage.getItem('hd2-theme'))).toBe('dark');

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(thumb(page)).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 26, 0)');

  await page.locator('#theme-toggle').click();
  await expect(page.locator('html')).not.toHaveAttribute('data-theme', 'dark');
  await expect(toggle).toHaveAttribute('aria-checked', 'false');
  await expect(thumb(page)).toHaveCSS('transform', 'none');
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#FAFAFD');
  await page.reload();
  await expect(page.locator('html')).not.toHaveAttribute('data-theme', 'dark');
  await expect(thumb(page)).toHaveCSS('transform', 'none');
});

test('on mobile the toggle sits immediately left of the menu button', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await ready(page);
  const toggle = page.locator('#theme-toggle');
  const menu = page.locator('.menu-button');
  await expect(menu).toBeVisible();
  await expect(toggle).toBeVisible();
  const t = await toggle.boundingBox();
  const m = await menu.boundingBox();
  expect(Math.round(t.width)).toBe(56);
  expect(Math.round(t.height)).toBe(30);
  expect(t.x + t.width).toBeLessThanOrEqual(m.x);
  expect(m.x - (t.x + t.width)).toBeLessThanOrEqual(16);
  // same row
  expect(Math.abs(t.y + t.height / 2 - (m.y + m.height / 2))).toBeLessThanOrEqual(2);
});

test('the floating share button copies the URL and confirms with a toast', async ({ page, context }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await ready(page);
  const share = page.locator('#share-toggle');
  await expect(share).toBeVisible();
  expect(await share.evaluate(node => getComputedStyle(node).position)).toBe('fixed');

  const box = await share.boundingBox();
  expect(Math.round(box.width)).toBe(48);
  expect(Math.round(box.height)).toBe(48);
  expect(await share.evaluate(node => getComputedStyle(node).backgroundColor)).toBe('rgb(124, 92, 255)');
  expect(await share.evaluate(node => getComputedStyle(node).color)).toBe('rgb(255, 255, 255)');
  expect(await share.evaluate(node => getComputedStyle(node).borderRadius)).toBe('999px');
  // bottom-right corner
  expect(await page.evaluate(() => {
    const r = document.getElementById('share-toggle').getBoundingClientRect();
    return innerWidth - r.right <= 20 && innerHeight - r.bottom <= 24;
  })).toBe(true);

  await share.click();
  const toast = page.locator('#share-toast');
  await expect(toast).toHaveText('Link copied');
  await expect(toast).toHaveClass(/is-visible/);
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(page.url());
});

for (const width of [1440, 390]) {
  test(`both themes render without overflow or errors at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await ready(page);
    for (const theme of ['light', 'dark']) {
      await page.evaluate(value => localStorage.setItem('hd2-theme', value), theme);
      await page.reload();
      await expect(page.locator('.app-card').first()).toBeVisible();
      await expect(page.locator('#theme-toggle')).toBeVisible();
      await expect(page.locator('#share-toggle')).toBeVisible();
      await expect(page.locator('#theme-toggle')).toHaveAttribute('aria-checked', theme === 'dark' ? 'true' : 'false');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    expect(errors).toEqual([]);
  });
}
