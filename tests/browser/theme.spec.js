import { test, expect } from '@playwright/test';

const ready = async page => {
  await page.goto('./');
  await expect(page.locator('.app-card').first()).toBeVisible();
};

const moon = page => page.locator('#theme-toggle .theme-toggle-ic[data-icon="moon"]');
const sun = page => page.locator('#theme-toggle .theme-toggle-ic[data-icon="sun"]');

test('the floating toggle switches to Navy & Lavender and persists', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await ready(page);
  const toggle = page.locator('#theme-toggle');
  await expect(toggle).toBeVisible();
  expect(await toggle.evaluate(node => getComputedStyle(node).position)).toBe('fixed');
  await expect(page.locator('html')).not.toHaveAttribute('data-theme', 'dark');

  // Icon-only 44×44 round button: moon in light mode, no text label.
  const box = await toggle.boundingBox();
  expect(Math.round(box.width)).toBe(44);
  expect(Math.round(box.height)).toBe(44);
  expect(await toggle.evaluate(node => getComputedStyle(node).borderRadius)).toBe('999px');
  expect((await toggle.innerText()).trim()).toBe('');
  await expect(moon(page)).toBeVisible();
  await expect(sun(page)).toBeHidden();

  await toggle.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(moon(page)).toBeHidden();
  await expect(sun(page)).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');
  await expect(toggle).toHaveAttribute('aria-label', 'Switch to light mode');
  await expect(toggle).toHaveAttribute('title', 'Switch to light mode');
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#0B1020');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).backgroundColor)).toBe('rgb(11, 16, 32)');
  expect(await page.evaluate(() => localStorage.getItem('hd2-theme'))).toBe('dark');

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(sun(page)).toBeVisible();
  await expect(moon(page)).toBeHidden();

  await page.locator('#theme-toggle').click();
  await expect(page.locator('html')).not.toHaveAttribute('data-theme', 'dark');
  await expect(moon(page)).toBeVisible();
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute('content', '#FAFAFD');
  await page.reload();
  await expect(page.locator('html')).not.toHaveAttribute('data-theme', 'dark');
  await expect(moon(page)).toBeVisible();
  await expect(sun(page)).toBeHidden();
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
      await expect(page.locator(`#theme-toggle .theme-toggle-ic[data-icon="${theme === 'dark' ? 'sun' : 'moon'}"]`)).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
    expect(errors).toEqual([]);
  });
}
