import { HeaderSearch } from './HeaderSearch';
import { ArrowLeft, Bookmark, PanelLeft, Plus, Sparkles } from 'lucide-react';
import type { NavigationNode } from '../../app/navigation';
import type { Navigate } from '../../app/router';
import { pathFor, type NavigationId, type RouteParams } from '../../app/navigation';
import { Button, DialogTrigger, SidebarTrigger, Popover, PopoverTrigger, PopoverContent } from '../../ui';
import { ThemeControl } from '../../ui/ThemeControl';
export function AppHeader({title,ancestors,params,titleFor,navigate,mobile,onNewChat,onOpenAi,isChat}:{title:string;ancestors:NavigationNode[];params:RouteParams;titleFor:(node:NavigationNode)=>string;navigate:Navigate;mobile:boolean;onNewChat:()=>void;onOpenAi:()=>void;isChat:boolean}){
 const parent=ancestors.at(-1);
 return <header data-shell-header="" className="relative grid min-h-14 shrink-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 px-3 py-2 sm:gap-3 sm:px-5">
  <div className="flex min-w-0 items-center gap-2 md:max-w-[25%]">
  {mobile?<DialogTrigger asChild><Button variant="ghost" iconOnly aria-label="Открыть меню"><PanelLeft className="size-4"/></Button></DialogTrigger>:<SidebarTrigger aria-label="Свернуть или развернуть меню"/>}
  {parent&&<Button variant="ghost" iconOnly aria-label="Назад" onClick={()=>navigate(parent.id as NavigationId,params)}><ArrowLeft className="size-4"/></Button>}
  <div className="min-w-0 flex-1">{ancestors.length>=2&&<nav aria-label="Хлебные крошки" className="mb-1 flex items-center gap-1 overflow-hidden text-2xs text-text-secondary">{ancestors.map((node,index)=><span key={node.id} className="inline-flex min-w-0 items-center gap-1">{index>0&&<span aria-hidden="true">/</span>}<a href={`#${pathFor(node.id as NavigationId,params)}`} className="truncate hover:text-text-primary" onClick={event=>{event.preventDefault();navigate(node.id as NavigationId,params);}}>{titleFor(node)}</a></span>)}</nav>}<h1 data-page-heading="" className="truncate text-sm font-semibold">{title}</h1></div>
  </div>
  <div className="col-span-2 row-start-2 flex w-full min-w-0 items-center gap-2 md:col-span-1 md:row-start-1 md:absolute md:left-1/2 md:top-1/2 md:w-[42%] md:max-w-[480px] md:-translate-x-1/2 md:-translate-y-1/2">
   <HeaderSearch/>
   <Popover><PopoverTrigger asChild><Button variant="ghost" iconOnly aria-label="Закладки"><Bookmark className="size-4"/></Button></PopoverTrigger><PopoverContent align="end"><h2 className="font-medium">Закладки</h2><p className="mt-2 text-xs text-text-secondary">У вас пока нет закладок.</p></PopoverContent></Popover>
  </div>
  <div className="col-start-2 row-start-1 flex items-center justify-end gap-2">
  {isChat?<Button variant="ghost" iconOnly aria-label="Новый диалог" onClick={onNewChat}><Plus className="size-4"/></Button>:<Button variant="ghost" iconOnly aria-label="Открыть AI Navigator" onClick={onOpenAi}><Sparkles className="size-4"/></Button>}
<div className="hidden h-4 w-px bg-border-subtle sm:block"/><ThemeControl/></div>
 </header>;
}
