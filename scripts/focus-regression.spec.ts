import { test, expect } from '@playwright/test';
for (const width of [1440,375]) for (const theme of ['light','dark']) {
  test(`sidebar focus ring ${width} ${theme}`, async ({page}) => {
    await page.setViewportSize({width,height:900});
    await page.addInitScript(theme => localStorage.setItem('linear-ui-theme',theme), theme);
    await page.goto('http://127.0.0.1:5173/#/courses');
    const links=page.getByRole('navigation',{name:'Основная навигация'}).getByRole('link');
    if(width<1024){await page.getByRole('button',{name:'Открыть меню'}).click();}
    const courses=page.getByRole('link',{name:'Курсы',exact:true});await courses.focus();await expect(courses).toBeFocused();
    const result=await courses.evaluate(el=>{const style=getComputedStyle(el);return {overflow:style.overflow,shadow:style.boxShadow,outlineStyle:style.outlineStyle,outlineWidth:style.outlineWidth,outlineOffset:style.outlineOffset};});
    expect(result.overflow).toBe('visible');if(width>=1024){expect(result.outlineStyle).toBe('solid');expect(Number.parseFloat(result.outlineWidth)).toBeGreaterThan(0);expect(Number.parseFloat(result.outlineOffset)).toBeGreaterThanOrEqual(2);} 
    for(let i=0;i<await links.count();i++){await links.nth(i).focus();await expect(links.nth(i)).toBeFocused();}
    await page.screenshot({path:`artifacts/bughunt-after-sidebar-${width}-${theme}.png`,fullPage:true});
  });
}
