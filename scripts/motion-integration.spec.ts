import { test, expect } from '@playwright/test';

for (const width of [1440, 375]) for (const theme of ['light', 'dark']) for (const reduced of [false, true]) {
  test(`shared motion ${width} ${theme} reduced=${reduced}: tooltip, press and combobox`, async ({ page }) => {
    test.setTimeout(40_000);
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize({width,height:1000});
    await page.emulateMedia({reducedMotion:reduced ? 'reduce' : 'no-preference'});
    const visit = async (story: string) => {
      await page.goto(`http://localhost:6006/iframe.html?id=${story}&viewMode=story&globals=theme:${theme}`);
      await expect(page.locator('#storybook-root')).not.toBeEmpty();
    };
    await visit('linear-ui-controls-button--playground');
    const button = page.getByRole('button',{name:'Button',exact:true});
    await expect(button).toHaveClass(/lms-motion-feedback/);
    const box = await button.boundingBox();
    await page.mouse.move(box!.x+box!.width/2,box!.y+box!.height/2);
    await page.mouse.down();
    if (!reduced) await expect.poll(async()=>button.evaluate(el=>(getComputedStyle(el).scale === 'none' ? 1 : Number(getComputedStyle(el).scale)))).toBeLessThan(0.995);
    else expect(await button.evaluate(el=>(getComputedStyle(el).scale === 'none' ? 1 : Number(getComputedStyle(el).scale)))).toBe(1);
    await page.mouse.up();
    await expect.poll(async()=>button.evaluate(el=>Math.abs((getComputedStyle(el).scale === 'none' ? 1 : Number(getComputedStyle(el).scale))-1))).toBeLessThan(0.001);
    await button.focus();await page.keyboard.press('Space');
    expect(await button.evaluate(el=>(getComputedStyle(el).scale === 'none' ? 1 : Number(getComputedStyle(el).scale)))).toBe(1);
    // The first pointer action after keyboard input must retain its physical response.
    await page.mouse.move(box!.x+box!.width/2,box!.y+box!.height/2);await page.mouse.down();
    if (!reduced) await expect.poll(async()=>button.evaluate(el=>(getComputedStyle(el).scale === 'none' ? 1 : Number(getComputedStyle(el).scale)))).toBeLessThan(0.995);
    await page.mouse.up();
    await visit('linear-ui-gallery--combobox');
    const trigger = page.getByRole('button',{name:'Framework',exact:true});
    await trigger.click();
    const query=page.getByPlaceholder('Search…');
    await expect(query).toBeFocused();
    await expect(page.locator('.lms-motion-surface')).toBeVisible();
    await trigger.click();await trigger.click();
    await expect(query).toBeFocused();
    await query.fill('Vite');await page.keyboard.press('Enter');
    await expect(trigger).toHaveText('Vite');await expect(trigger).toBeFocused();
    await visit('linear-ui-gallery--tooltip');
    const target=page.getByRole('button',{name:'Top',exact:true});
    await target.hover();
    await expect(page.getByRole('tooltip')).toBeVisible();
    await expect(page.locator('.lms-motion-surface')).toBeVisible();
    await page.mouse.move(1,1,{steps:8});
    await expect(page.getByRole('tooltip')).toHaveCount(0);
    await target.focus();await expect(page.getByRole('tooltip')).toBeVisible();
    await page.keyboard.press('Escape');await expect(page.getByRole('tooltip')).toHaveCount(0);
    await expect(target).toBeFocused();
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    expect(errors).toEqual([]);
  });
}
