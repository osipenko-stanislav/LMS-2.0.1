import { BookOpen, ChevronRight } from 'lucide-react';
import type { WorkspaceViewModel, DataView } from '../../core/workspace-contracts';
import { Button, Empty, EmptyDescription, EmptyTitle, Item, ItemContent, ItemDescription, ItemMedia, ItemTitle, Skeleton } from '../../ui';
export function EmptyView({title,description,children}:{title:string;description:string;children?:React.ReactNode}){
  return <Empty className="border-none py-16"><EmptyTitle>{title}</EmptyTitle><EmptyDescription>{description}</EmptyDescription>{children}</Empty>;
}
export function LoadingView(){return <div role="status" aria-label="Загрузка данных" className="flex flex-col gap-4 py-8"><Skeleton className="h-7 w-2/3"/><Skeleton className="h-20 w-full"/><Skeleton className="h-20 w-full"/></div>;}
export function SourceBadge({origin:_origin}:{origin:string}){return null;}
export function RecordRow({title,description,icon,meta,onOpen}:{title:string;description?:string;icon?:React.ReactNode;meta?:React.ReactNode;onOpen?:()=>void}){
  const body=<Item interactive={!!onOpen} className="w-full group-focus-visible/record:bg-fill-hover"><ItemMedia>{icon??<BookOpen className="size-4"/>}</ItemMedia><ItemContent><ItemTitle className="whitespace-normal break-words">{title}</ItemTitle>{description&&<ItemDescription className="whitespace-normal break-words">{description}</ItemDescription>}</ItemContent>{meta}<ChevronRight className={`size-4 shrink-0 text-text-tertiary ${onOpen?'':'invisible'}`}/></Item>;
  return onOpen?<button type="button" className="group/record block w-full rounded-lg text-left" onClick={onOpen}>{body}</button>:body;
}
export function PageIntro({description,action}:{description?:string;action?:React.ReactNode}){return <div className="mb-6 flex flex-wrap items-start justify-between gap-3">{description&&<p className="max-w-2xl text-sm text-text-secondary">{description}</p>}{action}</div>;}
export function formatDate(value:string,options:Intl.DateTimeFormatOptions={day:'numeric',month:'long',year:'numeric'}){return new Intl.DateTimeFormat('ru-RU',{...options,timeZone:'Europe/Moscow'}).format(new Date(value));}

export function DataGuard({view,onRetry,children}:{view:DataView<WorkspaceViewModel>;onRetry:()=>void;children:(data:WorkspaceViewModel)=>React.ReactNode}){
  if(view.state==='loading')return <LoadingView/>;
  if(view.state==='error')return <div role="alert"><EmptyView title="Не удалось загрузить данные" description={view.error}><Button className="mt-4" onClick={onRetry}>Повторить</Button></EmptyView></div>;
  return children(view.data);
}
