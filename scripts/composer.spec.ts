import { test, expect } from '@playwright/test';

for(const width of [1440,375])for(const theme of ['light','dark']){
  test(`Composer keyboard and history ${width} ${theme}`,async({page})=>{
    await page.setViewportSize({width,height:900});
    await page.addInitScript(theme=>localStorage.setItem('linear-ui-theme',theme),theme);
    await page.goto('http://127.0.0.1:5173/#/navigator');
    const field=page.getByRole('textbox',{name:'Сообщение навигатору'});
    await expect(field).toBeVisible();
    await expect(page.getByRole('button',{name:'Отправить сообщение',exact:true})).toBeDisabled();
    await field.fill('   ');await field.press('Enter');await expect(page.getByRole('article')).toHaveCount(0);
    await field.fill('Покажи курсы');await field.press('Shift+Enter');await field.press('a');
    await expect(field).toHaveValue('Покажи курсы\na');
    await field.dispatchEvent('keydown',{key:'Enter',code:'Enter',isComposing:true});
    await expect(page.getByRole('article')).toHaveCount(0);
    const initial=await field.evaluate(el=>el.clientHeight);
    await field.fill(Array(14).fill('Строка учебного плана').join('\n'));
    expect(await field.evaluate(el=>el.clientHeight)).toBeGreaterThan(initial);
    expect(await field.evaluate(el=>el.clientHeight)).toBeLessThanOrEqual(160);
    await field.fill('Покажи курсы');await field.press('Enter');
    await expect(page.getByRole('article',{name:'Ваше сообщение'})).toHaveCount(1);
    await expect(field).toHaveValue('');await expect(field).toBeFocused();
    const url=page.url();await page.reload();await expect(page.getByRole('article',{name:'Ваше сообщение'})).toContainText('Покажи курсы');expect(page.url()).toBe(url);
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    await page.screenshot({path:`artifacts/composer-${width}-${theme}.png`,fullPage:true});
  });
}

test('Composer controlled states and attachment previews',async({page})=>{
  await page.setViewportSize({width:375,height:850});await page.emulateMedia({reducedMotion:'reduce'});
  for(const story of ['attachments','sending','generating','error','success']){
    await page.goto(`http://127.0.0.1:6006/iframe.html?id=lms-composer--${story}&viewMode=story&globals=theme:dark`);
    await expect(page.getByRole('textbox')).toBeVisible();
    if(story==='attachments'){await expect(page.getByRole('list',{name:'Вложения'})).toContainText('Конспект.pdf');await page.getByRole('button',{name:'Добавить контекст'}).click();await expect(page.getByRole('button',{name:'Добавить файл',exact:true})).toBeVisible();await page.keyboard.press('Escape');}
    if(story==='sending')await expect(page.getByRole('button',{name:'Отправка сообщения'})).toBeDisabled();
    if(story==='generating'){await expect(page.getByRole('button',{name:'Остановить генерацию'})).toBeEnabled();await expect(page.getByRole('status')).toContainText('Генерация ответа');}
    if(story==='error'){await expect(page.getByRole('alert')).toBeVisible();await expect(page.getByRole('textbox')).toHaveAttribute('aria-invalid','true');await expect(page.getByRole('button',{name:'Отправить сообщение'})).toBeEnabled();}
    if(story==='success')await expect(page.getByRole('status')).toContainText('Сообщение отправлено');
    expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
    await page.screenshot({path:`artifacts/composer-state-${story}.png`,fullPage:true});
  }
});

for(const theme of ['light','dark'])test(`Composer context and audio ${theme}`,async({page})=>{
  await page.setViewportSize({width:375,height:850});
  await page.goto(`http://127.0.0.1:6006/iframe.html?id=lms-composer--default&viewMode=story&globals=theme:${theme}`);
  const plus=page.getByRole('button',{name:'Добавить контекст'});
  await plus.click();await expect(page.getByRole('button',{name:'Поиск по LMS',exact:true})).toBeVisible();
  await page.screenshot({path:`artifacts/composer-context-${theme}.png`});
  await page.keyboard.press('Escape');await expect(plus).toBeFocused();
  await plus.click();await page.getByRole('button',{name:'Поиск по вебу',exact:true}).click();
  await expect(page.getByRole('button',{name:'Убрать режим поиска'})).toContainText('Поиск по вебу');
  await page.getByRole('button',{name:'Убрать режим поиска'}).click();
  await plus.click();const chooser=page.waitForEvent('filechooser');await page.getByRole('button',{name:'Добавить файл',exact:true}).click();
  await (await chooser).setFiles({name:'Конспект.txt',mimeType:'text/plain',buffer:Buffer.from('Текст')});
  await expect(page.getByRole('list',{name:'Вложения'})).toContainText('Конспект.txt');
  await page.getByRole('button',{name:'Убрать Конспект.txt'}).click();await expect(page.getByRole('list',{name:'Вложения'})).toHaveCount(0);
  await page.getByRole('button',{name:'Записать аудио'}).click();
  await expect(page.getByRole('button',{name:'Остановить запись'})).toHaveAttribute('aria-pressed','true');
  await expect(plus).toBeDisabled();await page.getByRole('button',{name:'Остановить запись'}).click();
  await expect(plus).toBeEnabled();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});

test('Fake audio transcribes after three seconds and appends without expanding empty Composer',async({page})=>{
  await page.clock.install();
  await page.goto('http://127.0.0.1:6006/iframe.html?id=lms-composer--default&viewMode=story');
  const field=page.getByRole('textbox');await expect(field).toBeVisible();
  await page.clock.pauseAt(await page.evaluate(()=>Date.now()+1000));
  const height=await page.locator('form').evaluate(el=>el.clientHeight);
  await page.getByRole('button',{name:'Записать аудио'}).click();
  await expect(field).toHaveAttribute('placeholder','Слушаю тебя');
  expect(await page.locator('form').evaluate(el=>el.clientHeight)).toBe(height);
  await page.clock.fastForward(2999);await expect(field).toHaveValue('');
  await page.clock.fastForward(1);await expect(field).toHaveValue('Помоги составить план учебы на неделю.');
  await page.getByRole('button',{name:'Записать аудио'}).click();
  await expect(field).not.toHaveAttribute('placeholder','Слушаю тебя');
  await expect(page.getByText('Запись аудио…',{exact:true})).toHaveCount(0);
  await page.clock.fastForward(3000);
  await expect(field).toHaveValue('Помоги составить план учебы на неделю. Помоги составить план учебы на неделю.');
  await page.getByRole('button',{name:'Записать аудио'}).click();
  await page.getByRole('button',{name:'Остановить запись'}).click();
  await page.clock.fastForward(3000);
  await expect(field).toHaveValue('Помоги составить план учебы на неделю. Помоги составить план учебы на неделю.');
});
