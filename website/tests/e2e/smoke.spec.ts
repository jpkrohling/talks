import { expect, test } from '@playwright/test';

// baseURL in playwright.config.ts is 'http://localhost:4321/talks/' (the Astro
// `base`). Paths below are relative to that base so they resolve to the real
// URLs the site ships on (/talks/, /talks/talks/, /talks/badges/, ...).

test('homepage renders identity + featured talks', async ({ page }) => {
  await page.goto('');
  await expect(page).toHaveTitle(/Juraci Paixão Kröhling/);
  await expect(page.locator('h1')).toContainText('Juraci Paixão Kröhling');
});

test('talks archive lists talks', async ({ page }) => {
  await page.goto('talks/');
  await expect(page.locator('h1')).toHaveText(/Talks/);
  const rows = await page.locator('.rows a').count();
  expect(rows).toBeGreaterThan(5);
});

test('a talk detail page loads with expected metadata', async ({ page }) => {
  await page.goto('talks/');
  const firstTalk = page.locator('.rows a').first();
  await firstTalk.click();
  await expect(page.locator('article h1')).toBeVisible();
  // BaseLayout emits Person; talk page emits PresentationDigitalDocument
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(2);
});

test('badges page loads', async ({ page }) => {
  await page.goto('badges/');
  await expect(page.locator('h1')).toHaveText('Badges');
});

test('press page loads + language toggle shows/hides bios', async ({ page }) => {
  await page.goto('press/');
  await expect(page.locator('h1')).toHaveText(/Press/);
  await page.locator('button[data-lang="de"]').click();
  await expect(page.locator('[data-bio-lang="de"]')).toBeVisible();
  await expect(page.locator('[data-bio-lang="en"]')).toBeHidden();
});

test('llms.txt and rss.xml are served', async ({ request }) => {
  const llms = await request.get('llms.txt');
  expect(llms.status()).toBe(200);
  expect(await llms.text()).toContain('Juraci Paixão Kröhling');
  const rss = await request.get('rss.xml');
  expect(rss.status()).toBe(200);
  expect(await rss.text()).toContain('<rss');
});
