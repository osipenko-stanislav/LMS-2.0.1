import { test, expect } from '@playwright/test';

const gallery = (story: string, theme = 'light') => `http://localhost:6006/iframe.html?id=linear-ui-motion-gallery--${story}&viewMode=story&globals=theme:${theme}`;
for (const width of [1440, 375]) for (const theme of ['light', 'dark']) for (const reduced of [false, true]) {
  test(`motion ${width} ${theme} reduced=${reduced}: all five patterns`, async ({ page }) => {
    test.setTimeout(60_000);
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: reduced ? 'reduce' : 'no-preference' });
    const pane = page.getByRole('region', { name: 'With motion', exact: true });
    const original = page.getByRole('region', { name: 'Original Linear UI', exact: true });
    async function visit(story: string) {
      await page.goto(gallery(story, theme));
      await expect(pane).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), story).toBe(true);
      await expect(page.locator('html')).toHaveClass(theme === 'dark' ? /dark/ : /^$/);
    }
    await visit('overlay');
    await pane.getByRole('button', {name:'Dropdown',exact:true}).click();
    await page.getByRole('menuitem',{name:'Copy link',exact:true}).click();
    await expect(pane.getByRole('status')).toHaveText('Link copied');
    await expect(page.getByRole('menu')).toHaveCount(0);
    await expect(pane.getByRole('button',{name:'Dropdown',exact:true})).toBeFocused();
    const popover = pane.getByRole('button',{name:'Popover',exact:true});
    await popover.click();
    await expect(page.getByLabel('Note',{exact:true})).toBeFocused();
    // Reverse the same spring before it settles; no forced clicks or synthetic trigger events.
    await popover.click();
    await popover.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByLabel('Note',{exact:true})).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(popover).toBeFocused();
    const dialogTrigger = pane.getByRole('button',{name:'Dialog',exact:true});
    await dialogTrigger.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole('textbox',{name:'Title',exact:true})).toBeFocused();
    await page.keyboard.press('Shift+Tab');
    expect(await dialog.evaluate(el=>el.contains(document.activeElement))).toBe(true);
    await dialog.getByRole('button',{name:'Confirm',exact:true}).click();
    await expect(pane.getByRole('status')).toHaveText('Changes confirmed');
    await expect(dialog).toHaveCount(0);
    await expect(dialogTrigger).toBeFocused();
    await expect(page.locator('body')).toHaveCSS('pointer-events','auto');
    await original.getByRole('button',{name:'Dialog',exact:true}).click();
    await expect(page.getByRole('dialog')).not.toHaveClass(/lms-motion-surface/);
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);

    await visit('selection');
    await pane.getByRole('tab',{name:'Activity',exact:true}).click();
    await pane.getByRole('tab',{name:'Files',exact:true}).click();
    await pane.getByRole('tab',{name:'Overview',exact:true}).click();
    await expect(pane.getByRole('tab',{name:'Overview',exact:true})).toHaveAttribute('aria-selected','true');
    await page.keyboard.press('ArrowRight');
    await expect(pane.getByRole('tab',{name:'Activity',exact:true})).toBeFocused();
    await expect(pane.getByRole('tab',{name:'Activity',exact:true})).toHaveAttribute('aria-selected','true');
    for (const name of ['Board','Timeline','List']) await pane.getByRole('radio',{name,exact:true}).click();
    const toggle = pane.getByRole('switch',{name:'Show details',exact:true});
    await toggle.click();await toggle.click();await toggle.click();
    await expect(toggle).toBeChecked();
    expect(await original.locator('[data-motion-indicator]').count()).toBe(0);
    expect(await pane.locator('[data-motion-indicator]').count()).toBe(2);
    if (reduced) {
      await expect.poll(async()=>pane.getByRole('switch').evaluate(el=>getComputedStyle(el.nextElementSibling!.firstElementChild!).transform)).toMatch(/none|matrix\(1, 0, 0, 1, 14, 0\)/);
    }
    await page.screenshot({path:`artifacts/motion/selection-${width}-${theme}-${reduced}.png`,fullPage:true});

    await visit('expand-collapse');
    const details = pane.getByRole('button',{name:'Details',exact:true});
    await details.click();await details.click();await details.click();
    await expect(details).toHaveAttribute('aria-expanded','true');
    await pane.getByRole('button',{name:'Change content',exact:true}).click();
    await expect(pane.getByText('An extra paragraph', {exact:false})).toBeVisible();
    const region = pane.locator('[data-motion-expand]').first();
    await expect.poll(async()=>region.evaluate(el=>Math.abs(el.getBoundingClientRect().height-el.firstElementChild!.getBoundingClientRect().height))).toBeLessThan(1);
    await details.click();
    await expect(region).toHaveAttribute('inert','');
    await expect.poll(async()=>region.evaluate(el=>el.getBoundingClientRect().height)).toBeLessThan(0.1);
    await pane.getByRole('button',{name:'Show additional options',exact:true}).click();
    await expect(pane.getByRole('switch',{name:'Include annotations',exact:true})).toBeVisible();
    await pane.getByRole('button',{name:'Hide additional options',exact:true}).click();
    await expect(pane.getByRole('switch',{name:'Include annotations',exact:true})).toHaveCount(0);

    await visit('layout-transition');
    await pane.getByRole('button',{name:'Expand',exact:true}).click();
    await pane.getByRole('button',{name:'Reorder',exact:true}).click();
    await pane.getByRole('button',{name:'Compact',exact:true}).click();
    await pane.getByRole('button',{name:'Reorder',exact:true}).click();
    await expect(pane.locator('[data-layout-item]').first()).toHaveAttribute('data-layout-item','gamma');
    await pane.getByRole('button',{name:'Expand',exact:true}).click();
    await expect(pane.getByText('Focus and feedback',{exact:true})).toBeVisible();
    await page.screenshot({path:`artifacts/motion/layout-${width}-${theme}-${reduced}.png`,fullPage:true});

    await visit('feedback');
    await pane.getByRole('button',{name:'Save changes',exact:true}).click();
    await expect(pane.getByRole('button',{name:'Saving…',exact:true})).toBeDisabled();
    await pane.getByRole('button',{name:'Reset',exact:true}).click();
    await expect(pane.getByRole('button',{name:'Save changes',exact:true})).toBeEnabled();
    await pane.getByRole('button',{name:'Save changes',exact:true}).click();
    await expect(pane.getByRole('button',{name:'Saved',exact:true})).toBeEnabled();
    await expect(pane.getByText('Changes saved',{exact:true})).toBeVisible();
    await pane.getByRole('button',{name:'Saved',exact:true}).click();
    await pane.getByRole('button',{name:'Reset',exact:true}).click();
    await page.getByRole('spinbutton',{name:'Stiffness',exact:true}).fill('600');
    await expect(page.getByRole('spinbutton',{name:'Stiffness',exact:true})).toHaveValue('600');
    await expect(page.locator('body')).toHaveCSS('pointer-events','auto');
    expect(errors).toEqual([]);
  });
}
