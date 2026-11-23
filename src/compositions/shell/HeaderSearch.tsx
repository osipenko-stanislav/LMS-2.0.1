import { useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Button, Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, Input, Kbd } from '../../ui';

const categories=['Все','Курсы','Материалы','Задания','Уроки','Ведомости','Хэндбук','Разделы'];
export function HeaderSearch(){
 const [open,setOpen]=useState(false),[query,setQuery]=useState(''),[category,setCategory]=useState('Все');
 const input=useRef<HTMLInputElement>(null),trigger=useRef<HTMLButtonElement>(null),dialog=useRef<HTMLDivElement>(null),restore=useRef<HTMLElement|null>(null);
 function changeOpen(next:boolean){if(next){restore.current=document.activeElement instanceof HTMLElement?document.activeElement:null;setQuery('');setCategory('Все');}setOpen(next);}
 useEffect(()=>{function shortcut(event:KeyboardEvent){if(!(event.metaKey||event.ctrlKey)||event.altKey||event.isComposing||event.repeat||event.key.toLowerCase()!=='k')return;const current=document.querySelector('[role="dialog"][data-state="open"]');if(current&&current!==dialog.current)return;event.preventDefault();if(open)input.current?.focus();else changeOpen(true);}window.addEventListener('keydown',shortcut);return()=>window.removeEventListener('keydown',shortcut);},[open]);
 return <Dialog open={open} onOpenChange={changeOpen}>
  <DialogTrigger asChild><Button ref={trigger} variant="subtle" className="min-w-0 flex-1 justify-start text-text-tertiary" aria-label="Поиск по LMS" aria-keyshortcuts="Meta+k Control+k"><Search className="size-4"/><span className="flex-1 text-left">Поиск</span><Kbd>⌘ + K</Kbd></Button></DialogTrigger>
  <DialogContent ref={dialog} hideClose className="flex max-h-[calc(100dvh-32px)] max-w-2xl flex-col gap-4 overflow-y-auto" onOpenAutoFocus={event=>{event.preventDefault();input.current?.focus();}} onCloseAutoFocus={event=>{event.preventDefault();(restore.current?.isConnected?restore.current:trigger.current)?.focus({preventScroll:true});}}>
   <DialogTitle className="sr-only">Поиск по LMS</DialogTitle><DialogDescription className="sr-only">Введите запрос. Escape закрывает окно поиска.</DialogDescription>
   <div className="flex min-w-0 items-center gap-2"><Input ref={input} className="min-w-0 flex-1" leadingIcon={<Search/>} aria-label="Поисковый запрос" placeholder="Поиск по LMS" value={query} autoComplete="off" spellCheck={false} onChange={event=>setQuery(event.target.value)}/>{query&&<Button iconOnly variant="ghost" aria-label="Очистить поиск" onClick={()=>{setQuery('');input.current?.focus();}}><X className="size-4"/></Button>}<Button iconOnly variant="ghost" aria-label="Закрыть поиск" onClick={()=>setOpen(false)}><X className="size-4"/></Button></div>
   <div className="flex min-h-48 flex-col gap-4 sm:flex-row"><div role="group" aria-label="Категории поиска" className="flex shrink-0 flex-wrap gap-1 sm:w-36 sm:flex-col">{categories.map(item=><Button key={item} variant={category===item?'subtle':'ghost'} className="justify-start" aria-pressed={category===item} onClick={()=>setCategory(item)}>{item}</Button>)}</div><div className="flex min-w-0 flex-1 items-center justify-center px-4 py-8"><p className="text-sm text-text-secondary">Ищите курсы, задания и материалы</p></div></div>
  </DialogContent>
 </Dialog>;
}
