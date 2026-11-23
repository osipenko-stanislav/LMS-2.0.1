import { test, expect, type Page } from '@playwright/test';

async function section(page:Page,name:string,width:number){
 if(width<1024){await page.getByRole('button',{name:'Открыть меню',exact:true}).click();await expect(page.getByRole('dialog',{name:'Навигация',exact:true})).toBeVisible();}
 const link=page.getByRole('navigation',{name:'Основная навигация'}).getByRole('link',{name,exact:true});
 await link.click();
 if(width<1024)await expect(page.getByRole('dialog',{name:'Навигация',exact:true})).toHaveCount(0);
 await expect(page.getByRole('heading',{level:1,name,exact:true})).toBeVisible();
}
for(const width of [1440,375])for(const theme of ['light','dark'])for(const reduced of [false,true]){
 test(`app shell ${width} ${theme} reduced=${reduced}`,async({page})=>{
  test.setTimeout(90_000);
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
  await page.setViewportSize({width,height:900});await page.emulateMedia({reducedMotion:reduced?'reduce':'no-preference'});
  await page.addInitScript(theme=>{if(!localStorage.getItem('linear-ui-theme'))localStorage.setItem('linear-ui-theme',theme);},theme);
  await page.goto('http://127.0.0.1:5173/#/history');await expect(page.getByText('История пока пуста',{exact:true})).toBeVisible();
  await section(page,'Навигатор',width);
  const composer=page.getByRole('textbox',{name:'Сообщение навигатору'});
  await composer.fill('Покажи мои курсы');await composer.press('Enter');
  await expect(page.getByRole('article',{name:'Ваше сообщение'})).toContainText('Покажи мои курсы');
  await expect(page.getByRole('article',{name:'Локальный демо-ответ'})).toContainText('локальный демонстрационный ответ');
  await expect(page.getByRole('button',{name:'Открыть курс TypeScript Foundations',exact:true})).toBeVisible();
  const firstPath=page.url();
  await page.getByRole('button',{name:'Новый диалог',exact:true}).click();
  expect(page.url()).not.toBe(firstPath);await expect(page.getByRole('log')).toHaveCount(0);
  await composer.fill('Другой вопрос');await page.getByRole('button',{name:'Отправить сообщение',exact:true}).click();
  await expect(page.getByRole('article',{name:'Ваше сообщение'})).toContainText('Другой вопрос');
  await section(page,'История',width);
  await page.getByRole('button',{name:/Покажи мои курсы/}).click();
  await expect(page.getByRole('article',{name:'Ваше сообщение'})).toContainText('Покажи мои курсы');
  await expect(page.getByRole('article',{name:'Ваше сообщение'})).not.toContainText('Другой вопрос');
  await page.getByRole('button',{name:'Открыть курс TypeScript Foundations',exact:true}).click();
  await expect(page.getByRole('heading',{level:1,name:'TypeScript Foundations',exact:true})).toBeVisible();
  if(width>=1024)await expect(page.getByRole('link',{name:'Курсы',exact:true})).toHaveAttribute('aria-current','page');
  await page.getByRole('button',{name:/^Introduction/}).click();
  await expect(page.getByRole('heading',{level:1,name:'Introduction',exact:true})).toBeVisible();
  const crumbs=page.getByRole('navigation',{name:'Хлебные крошки'});
  await expect(crumbs.getByRole('link',{name:'Курсы',exact:true})).toBeVisible();await expect(crumbs.getByRole('link',{name:'TypeScript Foundations',exact:true})).toBeVisible();await expect(crumbs).not.toContainText('Introduction');
  await page.getByRole('button',{name:'Назад',exact:true}).click();
  await expect(page.getByRole('navigation',{name:'Хлебные крошки'})).toHaveCount(0);
  await page.getByRole('button',{name:'Record +1 point',exact:true}).click();
  await expect(page.getByRole('status',{name:'Текущая оценка'})).toHaveText('83 / 100');
  await section(page,'Ведомость',width);await expect(page.getByRole('status',{name:'Текущая оценка'})).toHaveText('83 / 100');
  await section(page,'Домашние задания',width);await page.getByRole('button',{name:/^First exercise/}).click();await expect(page.getByRole('heading',{level:1,name:'First exercise',exact:true})).toBeVisible();await expect(page.getByRole('status',{name:'Текущая оценка'})).toHaveText('83 / 100');
  await section(page,'Курсы',width);await expect(page.getByRole('button',{name:'Открыть курс TypeScript Foundations',exact:true})).toBeVisible();
  await section(page,'Библиотека',width);const materialSearch=page.getByRole('textbox',{name:'Поиск материалов'});await materialSearch.fill('not-existing');await expect(page.getByText('Материалы не найдены',{exact:true})).toBeVisible();await materialSearch.fill('');await page.getByRole('button',{name:/^Introduction/}).click();await expect(page.getByRole('heading',{level:1,name:'Introduction',exact:true})).toBeVisible();await expect(page.getByText(/Welcome to the course/)).toBeVisible();
  await section(page,'Расписание',width);await page.getByRole('button',{name:/К сохраненным событиям/}).click();await expect(page.getByText('Live seminar',{exact:true})).toBeVisible();await page.getByRole('button',{name:'Следующая неделя',exact:true}).click();await expect(page.getByText('На выбранные даты занятий нет',{exact:true})).toBeVisible();
  for(const [name,empty] of [['Зачётка','Итоговые результаты недоступны'],['Late Days','Данные Late Days недоступны'],['Хэндбук','Хэндбук пока пуст'],['Уведомления','Уведомлений пока нет']]){await section(page,name!,width);await expect(page.getByText(empty!,{exact:true})).toBeVisible();}
  await section(page,'Поиск',width);const search=page.getByRole('textbox',{name:'Поиск по приложению'});await expect(search).toBeFocused();await search.fill('no-such-record');await expect(page.getByText('Ничего не найдено',{exact:true})).toBeVisible();await page.getByRole('button',{name:'Очистить поиск',exact:true}).click();await expect(search).toHaveValue('');await expect(search).toBeFocused();await search.fill('TypeScript');await page.getByText('TypeScript Foundations',{exact:true}).click();await expect(page.getByRole('heading',{level:1,name:'TypeScript Foundations',exact:true})).toBeVisible();
  const opener=page.getByRole('button',{name:'Открыть AI Navigator',exact:true});await opener.click();const panel=page.getByRole('dialog',{name:'AI Navigator',exact:true});await expect(panel).toBeVisible();await expect(panel.getByRole('textbox',{name:'Сообщение навигатору'})).toBeFocused();await page.keyboard.press('Escape');await expect(panel).toHaveCount(0);await expect(opener).toBeFocused();
  if(width>=1024){await page.getByRole('button',{name:'Свернуть или развернуть меню',exact:true}).click();await expect.poll(async()=>page.locator('[data-shell-sidebar]').evaluate(el=>el.getBoundingClientRect().width)).toBeLessThan(53);await page.keyboard.press('Control+b');await expect.poll(async()=>page.locator('[data-shell-sidebar]').evaluate(el=>el.getBoundingClientRect().width)).toBeGreaterThan(239);}else{await page.keyboard.press('Control+b');await expect(page.getByRole('dialog',{name:'Навигация',exact:true})).toBeVisible();await page.keyboard.press('Escape');await expect(page.getByRole('dialog',{name:'Навигация',exact:true})).toHaveCount(0);}
  await section(page,'Настройки',width);const themeControl=page.locator('[data-page-content]').getByRole('combobox',{name:'Interface theme'});await themeControl.click();const next=theme==='light'?'Dark':'Light';await page.getByRole('option',{name:next,exact:true}).click();await expect(page.locator('html')).toHaveClass(next==='Dark'?/dark/:/^$/);await page.reload();await expect(themeControl).toHaveText(next);await themeControl.click();await page.getByRole('option',{name:'System',exact:true}).click();await expect(themeControl).toHaveText('System');expect(await page.evaluate(()=>localStorage.getItem('linear-ui-theme'))).toBe('system');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:`artifacts/app-shell/verified-${width}-${theme}-${reduced}.png`,fullPage:true});expect(errors).toEqual([]);
 });
}
