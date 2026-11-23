import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';

for(const width of [1440,375])for(const theme of ['light','dark'])test(`Library contains files, not chats ${width} ${theme}`,async({page})=>{
  await page.setViewportSize({width,height:900});
  await page.addInitScript(theme=>localStorage.setItem('linear-ui-theme',theme),theme);
  await page.goto('http://127.0.0.1:5173/#/navigator');
  const input=page.getByRole('textbox',{name:'Сообщение навигатору'});
  await input.fill('Диалог без файлов');await input.press('Enter');
  await page.goto('http://127.0.0.1:5173/#/library');
  await expect(page.getByText('Библиотека пуста',{exact:true})).toBeVisible();
  await expect(page.locator('[data-page-content]').getByText('Диалог без файлов',{exact:true})).toHaveCount(0);
  await page.goto('http://127.0.0.1:5173/#/navigator');
  await page.getByRole('button',{name:'Добавить контекст'}).click();
  const chooser=page.waitForEvent('filechooser');await page.getByRole('button',{name:'Добавить файл',exact:true}).click();
  await (await chooser).setFiles([
    {name:'Конспект.txt',mimeType:'text/plain',buffer:Buffer.from('Учебные заметки')},
    {name:'Изображение.png',mimeType:'image/png',buffer:Buffer.from('image-test')},
  ]);
  await expect(page.getByRole('list',{name:'Вложения'})).toContainText('Конспект.txt');
  await page.getByRole('button',{name:'Отправить сообщение',exact:true}).click();
  await expect(page.getByRole('article',{name:'Ваше сообщение'})).toContainText('Конспект.txt');
  await page.goto('http://127.0.0.1:5173/#/library');await page.reload();
  await expect(page.getByRole('button',{name:'Скачать Конспект.txt'})).toBeVisible();
  await expect(page.getByRole('button',{name:'Скачать Изображение.png'})).toBeVisible();
  await page.getByRole('button',{name:'Медиа',exact:true}).click();
  await expect(page.getByRole('button',{name:'Скачать Конспект.txt'})).toHaveCount(0);
  await expect(page.getByRole('button',{name:'Скачать Изображение.png'})).toBeVisible();
  await page.getByRole('button',{name:'Файлы',exact:true}).click();
  await expect(page.getByRole('button',{name:'Скачать Изображение.png'})).toHaveCount(0);
  await page.getByRole('textbox',{name:'Искать в библиотеке'}).fill('несуществующий');
  await expect(page.getByText('Файлы не найдены',{exact:true})).toBeVisible();
  await page.getByRole('textbox',{name:'Искать в библиотеке'}).fill('Конспект');
  const download=page.waitForEvent('download');await page.getByRole('button',{name:'Скачать Конспект.txt'}).click();
  const file=await download;expect(file.suggestedFilename()).toBe('Конспект.txt');
  expect(await readFile((await file.path())!,'utf8')).toBe('Учебные заметки');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:`artifacts/library-files-${width}-${theme}.png`,fullPage:true});
});
