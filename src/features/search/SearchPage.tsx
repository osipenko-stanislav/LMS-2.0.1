import { useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { searchWorkspace } from '../../app/search';
import type { WorkspaceViewModel, DataView } from '../../core/workspace-contracts';
import type { Navigate } from '../../app/router';
import { EmptyView, PageIntro, RecordRow } from '../../compositions/shell/SharedViews';
import { Button, Input } from '../../ui';

export function SearchPage({view,navigate}:{view:DataView<WorkspaceViewModel>;navigate:Navigate}){
 const [query,setQuery]=useState(()=>new URLSearchParams(window.location.hash.split('?')[1]).get('q')??'');
 const inputRef=useRef<HTMLInputElement>(null);
 useEffect(()=>{const timer=window.setTimeout(()=>inputRef.current?.focus(),450);return()=>window.clearTimeout(timer);},[]);
 const results=searchWorkspace(query,view.state==='ready'?view.data:undefined);
 return <><PageIntro description="Ищите разделы, курсы, задания и материалы учебного плана."/><div className="flex items-center gap-2"><Input ref={inputRef} autoFocus className="min-w-0 flex-1" leadingIcon={<Search/>} aria-label="Поиск по приложению" placeholder="Название курса, задания или раздела" value={query} onChange={event=>setQuery(event.target.value)}/><Button iconOnly variant="ghost" disabled={!query} aria-label="Очистить поиск" onClick={()=>{setQuery('');document.querySelector<HTMLInputElement>('[aria-label="Поиск по приложению"]')?.focus();}}><X className="size-4"/></Button></div>{view.state==='error'&&<p role="alert" className="mt-3 text-xs text-danger">Данные не загрузились. Поиск по разделам доступен.</p>}{!query.trim()?<EmptyView title="Что найти?" description="Введите название или часть названия."/>:results.length?<div className="mt-4 space-y-1">{results.map(result=><RecordRow key={result.key} title={result.title} description={result.description} icon={<Search/>} onOpen={()=>navigate(result.route,result.params)}/>)}</div>:<EmptyView title="Ничего не найдено" description="Попробуйте другое название или более короткий запрос."/>}</>;
}

