import { test, expect } from '@playwright/test';

test('Storybook gallery: every registered story renders', async ({ page, request }) => {
  test.setTimeout(60_000);
  const index = await (await request.get('http://localhost:6006/index.json')).json();
  const entries = Object.values(index.entries) as { id: string; type: string }[];
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [1440, 375]) {
   await page.setViewportSize({ width, height: 900 });
   for (const entry of entries.filter(item => item.type === 'story')) {
    await page.goto(`http://localhost:6006/iframe.html?id=${entry.id}&viewMode=story`);
    await expect(page.locator('#storybook-root')).not.toBeEmpty();
    await expect(page.locator('.sb-errordisplay')).not.toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), entry.id).toBe(true);
   }
  }
  expect(errors).toEqual([]);
});

test('Storybook dialog interaction', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto('http://localhost:6006/iframe.html?id=linear-ui-gallery--dialog&viewMode=story');
  const trigger = page.getByRole('button', { name: 'Delete project', exact: true }).first();
  await trigger.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
});
