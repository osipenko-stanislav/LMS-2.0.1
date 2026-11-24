import { useState } from 'react';
import { Search, FileText } from 'lucide-react';
import type { ChatSession, ChatAttachment } from '../../core/domain/chat';
import { EmptyView, formatDate } from '../../compositions/shell/SharedViews';
import { Button, Input } from '../../ui';

export function LibraryPage({sessions,onFileOpen}:{sessions:ChatSession[];onFileOpen:(file:ChatAttachment)=>Promise<void>}){
 const [query,setQuery]=useState('');
 const [filter,setFilter]=useState<'all'|'media'|'files'>('all');
 const [error,setError]=useState<string>();
 const allFiles=Array.from(new Map(sessions.flatMap(session=>session.messages.flatMap(message=>(message.attachments??[]).map(file=>({...file,addedAt:message.createdAt})))).map(file=>[file.id,file])).values()).sort((a,b)=>b.addedAt.localeCompare(a.addedAt));
 const files=allFiles.filter(file=>{const media=/^(image|video|audio)\//.test(file.mimeType);return file.name.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase())&&(filter==='all'||(filter==='media'?media:!media));});
 return <><div><h1 className="text-2xl font-semibold tracking-tight">Библиотека</h1><p className="mt-2 text-sm text-text-secondary">Файлы, добавленные в сообщения Навигатора.</p></div>
 <div className="mt-6 flex flex-wrap items-center gap-2"><div className="flex gap-1" role="group" aria-label="Тип файлов">{([{id:'all',label:'Все'},{id:'media',label:'Медиа'},{id:'files',label:'Файлы'}] as const).map(item=><Button key={item.id} variant={filter===item.id?'subtle':'ghost'} aria-pressed={filter===item.id} onClick={()=>setFilter(item.id)}>{item.label}</Button>)}</div><Input className="ml-auto min-w-0 w-full sm:max-w-xs" aria-label="Искать в библиотеке" placeholder="Искать" leadingIcon={<Search/>} value={query} onChange={event=>setQuery(event.target.value)}/></div>
 {error&&<p role="alert" className="mt-3 text-sm text-danger">{error}</p>}
 {files.length?<div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{files.map(file=><button key={file.id} type="button" aria-label={`Скачать ${file.name}`} className="flex min-w-0 items-start gap-3 rounded-lg bg-surface-panel p-4 text-left transition-colors hover:bg-fill-hover" onClick={()=>{setError(undefined);void onFileOpen(file).catch(error=>setError(error instanceof Error?error.message:'Не удалось открыть файл.'));}}><FileText aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-text-secondary"/><span className="min-w-0"><span className="block break-words text-sm font-medium">{file.name}</span><span className="mt-1 block text-xs text-text-secondary">{file.size<1024?`${file.size} Б`:`${new Intl.NumberFormat('ru-RU',{maximumFractionDigits:1}).format(file.size/1024)} КБ`} · {formatDate(file.addedAt,{day:'numeric',month:'short'})}</span></span></button>)}</div>:<EmptyView title={allFiles.length?'Файлы не найдены':'Библиотека пуста'} description={allFiles.length?'Попробуйте другой запрос или тип файлов.':'Прикрепите файл к сообщению в Навигаторе — после отправки он появится здесь.'}/>}
 </>;
}

