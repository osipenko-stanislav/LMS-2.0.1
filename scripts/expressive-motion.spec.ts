import { test, expect } from '@playwright/test';

for(const width of [1440,375])for(const theme of ['light','dark'])for(const reduced of [false,true]){
 test(`expressive ${width} ${theme} reduced=${reduced}`,async({page})=>{
  test.setTimeout(45_000);
  const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
  await page.setViewportSize({width,height:1000});await page.emulateMedia({reducedMotion:reduced?'reduce':'no-preference'});
  const visit=async(story:string)=>{await page.goto(`http://localhost:6006/iframe.html?id=linear-ui-motion-gallery--${story}&viewMode=story&globals=theme:${theme}`);await page.getByRole('heading',{level:1}).waitFor();};
  await visit('morphing-dropdown');
  const surface=page.locator('[data-expressive-surface="dropdown"]');
  await expect.poll(async()=>surface.evaluate(el=>el.getBoundingClientRect().height)).toBe(40);
  await surface.evaluate(el=>el.setAttribute('data-retained','yes'));
  const trigger=page.getByRole('button',{name:'In progress',exact:true});
  await trigger.click();await expect(page.getByRole('menuitemradio',{name:'In progress',exact:true})).toBeFocused();
  await trigger.click();await trigger.click();
  await expect(surface).toHaveAttribute('data-retained','yes');
  await expect.poll(async()=>surface.evaluate(el=>Math.abs(el.getBoundingClientRect().height-236))).toBeLessThan(.5);
  await page.keyboard.press('End');await expect(page.getByRole('menuitemradio',{name:'Done',exact:true})).toBeFocused();
  await page.keyboard.press('Enter');await expect(page.getByRole('button',{name:'Done',exact:true})).toBeFocused();
  await expect(page.getByRole('menu')).toHaveCount(0);
  await page.getByRole('button',{name:'Done',exact:true}).press('ArrowDown');await expect(page.getByRole('menu')).toBeVisible();
  await page.keyboard.press('Escape');await expect(page.getByRole('button',{name:'Done',exact:true})).toBeFocused();
  await expect.poll(async()=>surface.evaluate(el=>Math.abs(el.getBoundingClientRect().height-40))).toBeLessThan(.5);

  await visit('expandable-card');
  const compact=page.getByRole('button',{name:'Atlas House',exact:true});
  const before=await compact.boundingBox();await compact.press('Enter');
  const panel=page.getByRole('region',{name:'Atlas House',exact:true});
  await expect(page.getByRole('button',{name:'Close',exact:true})).toBeFocused();
  await expect.poll(async()=>panel.evaluate(el=>el.getBoundingClientRect().height)).toBeGreaterThan(before!.height*2);
  await page.getByRole('button',{name:'Close',exact:true}).click();
  await expect(page.getByRole('button',{name:'Atlas House',exact:true})).toBeFocused();
  await page.getByRole('button',{name:'Atlas House',exact:true}).click();
  await page.keyboard.press('Escape');
  await page.getByRole('button',{name:'Pine Cabin',exact:true}).click();
  await expect(page.getByRole('region',{name:'Pine Cabin',exact:true})).toBeVisible();
  await page.getByRole('button',{name:'Back to stays',exact:true}).click();
  await expect(page.getByRole('button',{name:'Pine Cabin',exact:true})).toBeFocused();
  await page.screenshot({path:`artifacts/expressive-motion/card-${width}-${theme}-${reduced}.png`,fullPage:true});

  await visit('elastic-selection');
  const pill=page.locator('[data-elastic-indicator]');
  const initialWidth=await pill.evaluate(el=>el.getBoundingClientRect().width);
  // Collect a full trajectory to verify actual deformation, not only different timing.
  await page.evaluate(()=>{
   const record={widths:[] as number[],done:false};(window as unknown as {elasticRecord:typeof record}).elasticRecord=record;
   const start=performance.now();const frame=(time:number)=>{const el=document.querySelector('[data-elastic-indicator]');record.widths.push(el!.getBoundingClientRect().width);if(time-start<650)requestAnimationFrame(frame);else record.done=true;};requestAnimationFrame(frame);
  });
  await page.getByRole('tab',{name:'Settings',exact:true}).click();
  await expect.poll(()=>page.evaluate(()=>(window as unknown as {elasticRecord:{done:boolean}}).elasticRecord.done)).toBe(true);
  const widths=await page.evaluate(()=>(window as unknown as {elasticRecord:{widths:number[]}}).elasticRecord.widths);
  if(!reduced)expect(Math.max(...widths)).toBeGreaterThan(initialWidth*1.25);
  else expect(Math.max(...widths)-Math.min(...widths)).toBeLessThan(2);
  await page.getByRole('tab',{name:'Overview',exact:true}).click();
  await page.getByRole('tab',{name:'Team',exact:true}).click();
  await page.getByRole('tab',{name:'Projects',exact:true}).click();
  await page.keyboard.press('ArrowLeft');await expect(page.getByRole('tab',{name:'Overview',exact:true})).toBeFocused();
  await expect(page.getByRole('tab',{name:'Overview',exact:true})).toHaveAttribute('aria-selected','true');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:`artifacts/expressive-motion/selection-${width}-${theme}-${reduced}.png`,fullPage:true});
  expect(errors).toEqual([]);
 });
}
