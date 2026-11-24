import { test, expect, type Page } from '@playwright/test';

const courseTitle='Алгоритмы и\u00a0структуры данных\u00a01';
const courseTitlePattern=/Алгоритмы и\sструктуры данных\s1/;
const sectionRoutes:Record<string,string>={'Поиск':'/search','Уведомления':'/notifications'};
async function section(page:Page,name:string,width:number){
 if(sectionRoutes[name])await page.evaluate(path=>{location.hash=path;},sectionRoutes[name]);
 else {
  if(width<1024){await page.getByRole('button',{name:'Открыть меню',exact:true}).click();await expect(page.getByRole('dialog',{name:'Навигация',exact:true})).toBeVisible();}
  const nav=page.getByRole('navigation',{name:'Основная навигация'});
  const label=name==='Ведомость'?'Ведомости':name==='Домашние задания'?'Домашки':name;
  const link=nav.getByRole('link',{name:label,exact:true});
  if(await link.count())await link.click();else await page.getByRole('button',{name:label,exact:true}).click();
  if(width<1024)await expect(page.getByRole('dialog',{name:'Навигация',exact:true})).toHaveCount(0);
 }
 await expect(page.locator('[data-page-heading]')).toHaveText(name);
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
  await expect(page.getByRole('article',{name:'Ответ навигатора'})).toContainText('курс из вашего учебного плана');
  await expect(page.getByRole('button',{name:`Открыть курс ${courseTitle}`,exact:true})).toBeVisible();
  const firstPath=page.url();
  await page.getByRole('button',{name:'Новый диалог',exact:true}).click();
  expect(page.url()).not.toBe(firstPath);await expect(page.getByRole('log')).toHaveCount(0);
  await composer.fill('Другой вопрос');await page.getByRole('button',{name:'Отправить сообщение',exact:true}).click();
  await expect(page.getByRole('article',{name:'Ваше сообщение'})).toContainText('Другой вопрос');
  await section(page,'История',width);
  await page.locator('[data-page-content]').getByRole('button',{name:/Покажи мои курсы/}).click();
  await expect(page.getByRole('article',{name:'Ваше сообщение'})).toContainText('Покажи мои курсы');
  await expect(page.getByRole('article',{name:'Ваше сообщение'})).not.toContainText('Другой вопрос');
  await page.getByRole('button',{name:`Открыть курс ${courseTitle}`,exact:true}).click();
  await expect(page.locator('[data-page-heading]')).toHaveText(courseTitlePattern);
  if(width>=1024)await expect(page.getByRole('link',{name:'Курсы',exact:true})).toHaveAttribute('aria-current','page');
  await page.getByRole('button',{name:/^Асимптотика и рекурсия/}).click();
  await expect(page.locator('[data-page-heading]')).toHaveText('Асимптотика и рекурсия');
  await expect(page.locator('[data-page-content] pre')).toContainText('Асимптотика и рекурсия');
  const crumbs=page.getByRole('navigation',{name:'Хлебные крошки'});
  await expect(crumbs.getByRole('link',{name:'Курсы',exact:true})).toBeVisible();await expect(crumbs.getByRole('link',{name:courseTitlePattern})).toBeVisible();await expect(crumbs).not.toContainText('Асимптотика и рекурсия');
  await page.getByRole('button',{name:'Назад',exact:true}).click();await expect(crumbs).toHaveCount(0);
  await page.getByRole('button',{name:'Record +1 point',exact:true}).first().click();
  await expect(page.getByRole('status',{name:'Текущая оценка'}).first()).toHaveText('85 / 100');
  await section(page,'Ведомость',width);await expect(page.getByRole('status',{name:'Текущая оценка'}).first()).toHaveText('85 / 100');
  await section(page,'Домашние задания',width);await page.getByRole('button',{name:/^Асимптотический анализ алгоритмов/}).click();await expect(page.locator('[data-page-heading]')).toHaveText('Асимптотический анализ алгоритмов');await expect(page.getByRole('status',{name:'Текущая оценка'})).toHaveText('85 / 100');
  await section(page,'Курсы',width);
  await page.locator('[data-page-content]').getByText('Машинное обучение (Machine Learning)',{exact:true}).click();
  await expect(page.locator('[data-page-heading]')).toHaveText('Машинное обучение (Machine Learning)');
  await page.getByRole('button',{name:/^Метрики и функционалы потерь/}).click();
  await expect(page.getByRole('heading',{name:'Темы урока',exact:true})).toBeVisible();await expect(page.getByText('Средняя квадратичная и абсолютная ошибка',{exact:true})).toBeVisible();
  await section(page,'Библиотека',width);const fileSearch=page.getByRole('textbox',{name:'Искать в библиотеке'});await fileSearch.fill('not-existing');await expect(page.getByText('Библиотека пуста',{exact:true})).toBeVisible();await fileSearch.fill('');
  await section(page,'Расписание',width);await page.getByRole('button',{name:/К сохраненным событиям/}).click();await expect(page.getByText('Алгоритмы и структуры данных 1 · семинар',{exact:true})).toBeVisible();await page.getByRole('button',{name:'Следующая неделя',exact:true}).click();await expect(page.getByText('На выбранные даты занятий нет',{exact:true})).toBeVisible();
  for(const [name,empty] of [['Зачётка','Итоговые результаты недоступны'],['Late Days','Данные Late Days недоступны'],['Уведомления','Уведомлений пока нет']]){await section(page,name,width);await expect(page.getByText(empty,{exact:true})).toBeVisible();}
  await section(page,'Хэндбук',width);await expect(page.getByRole('navigation',{name:'Навигация по хэндбуку'})).toBeVisible();await expect(page.locator('[data-page-content] article')).toContainText('Разделы');
  await section(page,'Поиск',width);const search=page.getByRole('textbox',{name:'Поиск по приложению'});await expect(search).toBeFocused();await search.fill('no-such-record');await expect(page.getByText('Ничего не найдено',{exact:true})).toBeVisible();await page.getByRole('button',{name:'Очистить поиск',exact:true}).click();await expect(search).toHaveValue('');await expect(search).toBeFocused();await search.fill('Машинное обучение');await page.locator('[data-page-content]').getByText('Машинное обучение (Machine Learning)',{exact:true}).click();await expect(page.locator('[data-page-heading]')).toHaveText('Машинное обучение (Machine Learning)');
  const opener=page.getByRole('button',{name:'Открыть AI Navigator',exact:true});await opener.click();const panel=page.getByRole('dialog',{name:'AI Navigator',exact:true});await expect(panel).toBeVisible();await expect(panel.getByRole('textbox',{name:'Сообщение навигатору'})).toBeFocused();await page.keyboard.press('Escape');await expect(panel).toHaveCount(0);await expect(opener).toBeFocused();
  if(width>=1024){await page.getByRole('button',{name:'Свернуть или развернуть меню',exact:true}).click();await expect.poll(async()=>page.locator('[data-shell-sidebar]').evaluate(el=>el.getBoundingClientRect().width)).toBeLessThan(53);await page.keyboard.press('Control+b');await expect.poll(async()=>page.locator('[data-shell-sidebar]').evaluate(el=>el.getBoundingClientRect().width)).toBeGreaterThan(239);}else{await page.keyboard.press('Control+b');await expect(page.getByRole('dialog',{name:'Навигация',exact:true})).toBeVisible();await page.keyboard.press('Escape');await expect(page.getByRole('dialog',{name:'Навигация',exact:true})).toHaveCount(0);}
  await section(page,'Настройки',width);const themeControl=page.locator('[data-page-content]').getByRole('combobox',{name:'Interface theme'});await themeControl.click();const next=theme==='light'?'Dark':'Light';await page.getByRole('option',{name:next,exact:true}).click();await expect(page.locator('html')).toHaveClass(next==='Dark'?/dark/:/^$/);await page.reload();await expect(themeControl).toHaveText(next);await themeControl.click();await page.getByRole('option',{name:'System',exact:true}).click();await expect(themeControl).toHaveText('System');expect(await page.evaluate(()=>localStorage.getItem('linear-ui-theme'))).toBe('system');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:`artifacts/app-shell/verified-${width}-${theme}-${reduced}.png`,fullPage:true});expect(errors).toEqual([]);
 });
}
