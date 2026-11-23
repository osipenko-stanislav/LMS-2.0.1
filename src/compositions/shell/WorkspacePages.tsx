import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, CalendarDays, CheckSquare, FileText, Search, X } from 'lucide-react';
import type { Action } from '../../core/actions';
import type { Grade, Entity } from '../../core/domain';
import type { ChatSession, ChatSessionId, ChatAttachment } from '../../core/domain/chat';
import type { DataView, WorkspaceViewModel } from '../../core/workspace-contracts';
import type { CourseViewModel, ViewContract } from '../../core/view-contracts';
import type { NavigationId, RouteParams } from '../../app/navigation';
import type { Navigate } from '../../app/router';
import { searchWorkspace } from '../../app/search';
import { Badge, Button, Input, SettingsSection } from '../../ui';
import { ThemeControl } from '../../ui/ThemeControl';
import { CatalogCourseCard, CourseCard, EmptyView, GradeList, LoadingView, PageIntro, RecordRow, SourceBadge, formatDate } from './SharedViews';
import { getMigratedCourse, getMigratedLesson, migratedCourses } from '../../data/courses';
import { handbookAncestors, handbookChildren, handbookPages, handbookRoot, loadHandbookContent, type HandbookNode } from '../../data/handbook';

interface PagesProps {
  id:NavigationId;params:RouteParams;view:DataView<WorkspaceViewModel>;course:ViewContract<CourseViewModel>;
  onFileOpen:(file:ChatAttachment)=>Promise<void>;
  sessions:ChatSession[];activeSessionId?:ChatSessionId;onSession:(id:ChatSessionId)=>void;
  navigate:Navigate;onAction:(action:Action)=>Promise<void>;pending:boolean;onRetry:()=>void;
}
function record(grade:Entity<Grade>,onAction:PagesProps['onAction']){void onAction({type:'grade.update',payload:{gradeId:grade.id,score:(grade.score??0)+1,feedbackContentId:grade.feedbackContentId}});}
function DataGuard({view,onRetry,children}:{view:DataView<WorkspaceViewModel>;onRetry:()=>void;children:(data:WorkspaceViewModel)=>React.ReactNode}){
  if(view.state==='loading')return <LoadingView/>;
  if(view.state==='error')return <div role="alert"><EmptyView title="Не удалось загрузить данные" description={view.error}><Button className="mt-4" onClick={onRetry}>Повторить</Button></EmptyView></div>;
  return children(view.data);
}
export function WorkspacePages(props:PagesProps){
  const {id,params,view,sessions,navigate,onAction,pending}=props;
  if(id==='history')return <><PageIntro description="Ваши диалоги в этой вкладке. Выберите диалог, чтобы продолжить."/>{!sessions.length?<EmptyView title="История пока пуста" description="Начните диалог с навигатором — он появится здесь."/>:<div className="space-y-1">{sessions.map(session=><button key={session.id} type="button" aria-current={props.activeSessionId===session.id?'true':undefined} className="block w-full rounded-lg px-3 text-left transition-colors hover:bg-fill-hover aria-[current=true]:bg-fill-hover" onClick={()=>props.onSession(session.id)}><RecordRow title={session.title} description={`${session.messages.length} сообщений · ${formatDate(session.updatedAt)}`} meta={props.activeSessionId===session.id?<Badge variant="outline">Последний диалог</Badge>:undefined}/></button>)}</div>}</>;
  if(id==='search')return <SearchPage view={view} navigate={navigate}/>;
  if(id==='settings')return <><PageIntro description="Настройте оформление рабочего пространства."/><SettingsSection title="Оформление"><div className="flex flex-wrap items-center justify-between gap-4 py-4"><div><p className="text-sm font-medium">Тема интерфейса</p><p className="mt-1 text-xs text-text-secondary">Системная, светлая или темная. Выбор сохраняется.</p></div><ThemeControl/></div></SettingsSection></>;
  if(id==='transcript')return <EmptyView title="Итоговые результаты недоступны" description="В доступных данных есть оценки за задания. Итоговые академические результаты пока не представлены."/>;
  if(id==='late-days')return <EmptyView title="Данные Late Days недоступны" description="Остаток и история использования не подключены. Доступных операций списания нет."/>;
  if(id==='handbook')return <HandbookPageView params={params} navigate={navigate}/>;
  if(id==='notifications')return <EmptyView title="Уведомлений пока нет" description="В локальных данных нет уведомлений."/>;
  return <DataGuard view={view} onRetry={props.onRetry}>{data=>{
    if(id==='courses')return <><div className="grid auto-rows-fr grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">{migratedCourses.map(course=><CatalogCourseCard key={course.id} course={course} onOpen={()=>navigate('course',{courseId:course.id})}/>)}</div></>;
    if(id==='course'){
      const migrated=getMigratedCourse(params.courseId ?? '');
      if(migrated)return <><PageIntro description={`${migrated.area} · ${migrated.category}`} /><p className="max-w-3xl text-sm leading-relaxed text-text-secondary">{migrated.description}</p>{migrated.modules.length?<div className="mt-8 space-y-6">{migrated.modules.map(module=><SettingsSection key={module.id} title={module.title}><div className="space-y-1">{module.lessons.map((lesson,index)=><RecordRow key={lesson.id} title={lesson.title} description={`${lesson.readingMinutes} минут · ${lesson.summary}`} meta={<span className="text-xs text-text-tertiary">{index+1}</span>} onOpen={()=>navigate('material',{courseId:migrated.id,lessonId:lesson.id})}/>)}</div></SettingsSection>)}</div>:<EmptyView title="Структура курса недоступна" description="Для этого курса в источнике нет перенесённых уроков."/>}</>;
      const contract=props.course;
      if(contract.state==='loading')return <LoadingView/>;
      if(contract.state==='error'||!contract.data)return <EmptyView title="Курс недоступен" description={contract.error??'Не удалось найти курс.'}/>;
      const model=contract.data;
      return <><PageIntro description={model.course.code} action={<SourceBadge origin={model.course.provenance.origin}/>}/><SettingsSection title="Занятия">{model.lessons.length?<div className="space-y-1">{model.lessons.map(lesson=><RecordRow key={lesson.id} title={lesson.title} description={`Занятие ${lesson.order}`} onOpen={()=>navigate('material',{courseId:lesson.courseId,lessonId:lesson.id})}/>)}</div>:<EmptyView title="Занятий пока нет" description="Материалы курса еще не добавлены."/>}</SettingsSection><div className="mt-8"><SettingsSection title="Домашние задания"><AssignmentList data={data} courseId={model.course.id} navigate={navigate}/></SettingsSection></div><div className="mt-8"><SettingsSection title="Оценки"><GradeList data={data} grades={model.grades} pending={pending} onRecord={grade=>record(grade,onAction)}/></SettingsSection></div></>;
    }
    if(id==='assignments')return <><PageIntro description="Доступные задания и сроки. Статус отображается только при наличии данных."/><AssignmentList data={data} navigate={navigate}/></>;
    if(id==='assignment'){
      const assignment=data.assignments.find(item=>item.id===params.assignmentId);
      if(!assignment)return <EmptyView title="Задание не найдено" description="В подключенных данных нет этого задания."/>;
      const course=data.courses.find(course=>course.id===assignment.courseId),grades=data.grades.filter(grade=>grade.assignmentId===assignment.id);
      return <><PageIntro description={course?.title} action={<SourceBadge origin={assignment.provenance.origin}/>}/><dl className="grid gap-5 border-y border-border-subtle py-5 sm:grid-cols-3"><div><dt className="text-xs text-text-secondary">Срок сдачи</dt><dd className="mt-1 text-sm">{formatDate(assignment.dueAt,{day:'numeric',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit'})}</dd></div><div><dt className="text-xs text-text-secondary">Статус</dt><dd className="mt-1 text-sm">Не указан</dd></div><div><dt className="text-xs text-text-secondary">Максимальный балл</dt><dd className="mt-1 text-sm">{assignment.maxScore}</dd></div></dl><p className="my-6 text-sm text-text-secondary">Условия и отправка решения пока недоступны.</p><GradeList data={data} grades={grades} pending={pending} onRecord={grade=>record(grade,onAction)}/></>;
    }
    if(id==='grades')return <><PageIntro description="Оценки за задания. Изменения сразу отражаются в курсе и ведомости."/><GradeList data={data} pending={pending} onRecord={grade=>record(grade,onAction)}/><p className="mt-4 text-xs text-text-secondary">Изменения сразу отражаются в учебном плане.</p></>;
    if(id==='library')return <LibraryPage sessions={sessions} onFileOpen={props.onFileOpen}/>;
    if(id==='material'){
      const migrated=getMigratedCourse(params.courseId ?? ''), lesson=migrated&&getMigratedLesson(migrated.id,params.lessonId ?? '');
      if(migrated&&lesson)return <article className="lms-reading-column"><PageIntro description={migrated.title} action={<Badge variant="outline">Учебный материал</Badge>}/><h1 className="text-2xl font-semibold tracking-tight">{lesson.title}</h1><p className="mt-4 text-sm leading-relaxed text-text-secondary">{lesson.summary}</p><h2 className="mt-8 text-sm font-semibold">Темы урока</h2><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">{lesson.focus.map(item=><li key={item}>{item}</li>)}</ul><p className="mt-8 text-xs text-text-tertiary">Содержимое и порядок соответствуют программе курса.</p></article>;
      const material=data.materials.find(item=>item.lessonId===params.lessonId&&item.courseId===params.courseId);
      if(!material)return <EmptyView title="Материал недоступен" description="Для этого занятия нет текстового материала."/>;
      return <article className="lms-reading-column"><PageIntro description={data.courses.find(course=>course.id===material.courseId)?.title} action={<SourceBadge origin={material.provenance.origin}/>}/><pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed">{material.text}</pre></article>;
    }
    if(id==='schedule')return <SchedulePage data={data}/>;
    return <EmptyView title="Раздел готовится" description="Здесь появятся ваши данные."/>;
  }}</DataGuard>;
}
function HandbookContent({node}:{node:HandbookNode}){
  if(node.type==='text') return <>{node.text}</>;
  const children=node.content?.map((child,index)=><HandbookContent key={index} node={child}/>);
  if(node.type==='heading') return <h2 className="mt-8 text-xl font-semibold tracking-tight">{children}</h2>;
  if(node.type==='paragraph') return <p className="mt-4 text-sm leading-7 text-text-secondary">{children}</p>;
  if(node.type==='bulletList') return <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-text-secondary">{children}</ul>;
  if(node.type==='listItem') return <li>{children}</li>;
  if(node.type==='hardBreak') return <br/>;
  return <>{children}</>;
}
function HandbookPageView({params,navigate}:{params:RouteParams;navigate:Navigate}){
  const [selected,setSelected]=useState(params.handbookId ?? handbookRoot?.id ?? '');
  const [content,setContent]=useState<{content?:HandbookNode[]}>();
  useEffect(()=>{let active=true;void loadHandbookContent(selected).then(value=>{if(active)setContent(value)}).catch(()=>{if(active)setContent(undefined)});return()=>{active=false}},[selected]);
  const page=handbookPages.find(item=>item.id===selected) ?? handbookRoot;
  const children=page?handbookChildren(page.id):[];
  return <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,768px)]">
    <aside className="rounded-xl bg-surface-panel p-3 lg:sticky lg:top-4 lg:self-start"><p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-text-tertiary">Хэндбук</p><nav aria-label="Навигация по хэндбуку" className="space-y-1">{(page ? handbookAncestors(page.id)[0] ? [handbookAncestors(page.id)[0], ...handbookChildren(handbookAncestors(page.id)[0]!.id)] : [] : []).map(item=><button key={item.id} type="button" aria-current={item.id===page?.id?'page':undefined} className="block w-full rounded-md px-2 py-2 text-left text-sm transition-colors hover:bg-fill-hover aria-[current=page]:bg-fill-hover aria-[current=page]:font-medium" onClick={()=>setSelected(item.id)}>{item.title}</button>)}{children.map(item=><button key={item.id} type="button" className="block w-full rounded-md px-2 py-2 text-left text-sm text-text-secondary transition-colors hover:bg-fill-hover" onClick={()=>setSelected(item.id)}>{item.title}</button>)}</nav></aside>
    <article className="lms-reading-column"><PageIntro description="Материалы и правила Центрального университета."/><h1 className="text-3xl font-semibold tracking-tight">{page?.title ?? 'Хэндбук'}</h1>{page?.summary&&<p className="mt-4 text-sm leading-7 text-text-secondary">{page.summary}</p>}<div className="mt-6">{content?.content?.map((node,index)=><HandbookContent key={index} node={node}/>)}</div>{children.length>0&&<div className="mt-10 pt-6"><h2 className="text-sm font-semibold">Разделы</h2><div className="mt-3 grid gap-2 sm:grid-cols-2">{children.map(item=><button key={item.id} type="button" className="rounded-lg bg-fill-secondary p-3 text-left text-sm hover:bg-fill-hover" onClick={()=>setSelected(item.id)}>{item.title}</button>)}</div></div>}</article>
  </div>;
}
function AssignmentList({data,courseId,navigate}:{data:WorkspaceViewModel;courseId?:string;navigate:Navigate}){
 const assignments=data.assignments.filter(item=>!courseId||item.courseId===courseId).sort((a,b)=>a.dueAt.localeCompare(b.dueAt));
 if(!assignments.length)return <EmptyView title="Заданий пока нет" description="Здесь появятся доступные домашние задания."/>;
 const today=new Date(); today.setHours(0,0,0,0);
 const tomorrow=new Date(today); tomorrow.setDate(tomorrow.getDate()+1);
 const weekEnd=new Date(today); weekEnd.setDate(weekEnd.getDate()+7);
 const groups=[
   {id:'overdue',title:'Просрочено',items:assignments.filter(item=>new Date(item.dueAt)<today)},
   {id:'today',title:'Сегодня',items:assignments.filter(item=>{const date=new Date(item.dueAt);return date>=today&&date<tomorrow;})},
   {id:'week',title:'Ближайшие 7 дней',items:assignments.filter(item=>{const date=new Date(item.dueAt);return date>=tomorrow&&date<weekEnd;})},
   {id:'later',title:'Позже',items:assignments.filter(item=>new Date(item.dueAt)>=weekEnd)},
 ];
 return <div className="space-y-7">{groups.filter(group=>group.items.length>0).map(group=><section key={group.id} aria-labelledby={`assignment-group-${group.id}`}><div className="mb-2 flex items-baseline gap-2"><h2 id={`assignment-group-${group.id}`} className="text-sm font-semibold">{group.title}</h2><span className="text-xs text-text-tertiary">{group.items.length}</span></div><div className="space-y-1">{group.items.map(assignment=><RecordRow key={assignment.id} icon={<CheckSquare/>} title={assignment.title} description={`${data.courses.find(course=>course.id===assignment.courseId)?.title??'Курс недоступен'} · До ${formatDate(assignment.dueAt)}`} meta={<span className="hidden text-xs text-text-tertiary sm:block">Статус не указан</span>} onOpen={()=>navigate('assignment',{assignmentId:assignment.id})}/>)}</div></section>)}</div>;
}
function SearchPage({view,navigate}:{view:DataView<WorkspaceViewModel>;navigate:Navigate}){
 const [query,setQuery]=useState(()=>new URLSearchParams(window.location.hash.split('?')[1]).get('q')??'');
 const inputRef=useRef<HTMLInputElement>(null);
 useEffect(()=>{const timer=window.setTimeout(()=>inputRef.current?.focus(),450);return()=>window.clearTimeout(timer);},[]);
 const results=searchWorkspace(query,view.state==='ready'?view.data:undefined);
 return <><PageIntro description="Ищите разделы, курсы, задания и материалы учебного плана."/><div className="flex items-center gap-2"><Input ref={inputRef} autoFocus className="min-w-0 flex-1" leadingIcon={<Search/>} aria-label="Поиск по приложению" placeholder="Название курса, задания или раздела" value={query} onChange={event=>setQuery(event.target.value)}/><Button iconOnly variant="ghost" disabled={!query} aria-label="Очистить поиск" onClick={()=>{setQuery('');document.querySelector<HTMLInputElement>('[aria-label="Поиск по приложению"]')?.focus();}}><X className="size-4"/></Button></div>{view.state==='error'&&<p role="alert" className="mt-3 text-xs text-danger">Данные не загрузились. Поиск по разделам доступен.</p>}{!query.trim()?<EmptyView title="Что найти?" description="Введите название или часть названия."/>:results.length?<div className="mt-4 space-y-1">{results.map(result=><RecordRow key={result.key} title={result.title} description={result.description} icon={<Search/>} onOpen={()=>navigate(result.route,result.params)}/>)}</div>:<EmptyView title="Ничего не найдено" description="Попробуйте другое название или более короткий запрос."/>}</>;
}
function LibraryPage({sessions,onFileOpen}:{sessions:ChatSession[];onFileOpen:(file:ChatAttachment)=>Promise<void>}){
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
function weekStart(date:Date){const day=new Date(date);day.setHours(0,0,0,0);day.setDate(day.getDate()-((day.getDay()+6)%7));return day;}
function SchedulePage({data}:{data:WorkspaceViewModel}){
 const [start,setStart]=useState(()=>weekStart(new Date())),[selectedDay,setSelectedDay]=useState<number|null>(null);
 const end=new Date(start);end.setDate(end.getDate()+7);
 const events=data.scheduleEvents.filter(event=>{const date=new Date(event.startsAt);return date>=start&&date<end&&(selectedDay===null||date.getDate()===new Date(start.getFullYear(),start.getMonth(),start.getDate()+selectedDay).getDate());}).sort((a,b)=>a.startsAt.localeCompare(b.startsAt));
 function shift(delta:number){setStart(current=>{const next=new Date(current);next.setDate(next.getDate()+delta*7);return next;});setSelectedDay(null);}
 return <><PageIntro description="Занятия из существующих данных расписания."/><div className="flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-2"><Button iconOnly aria-label="Предыдущая неделя" onClick={()=>shift(-1)}><ArrowLeft/></Button><p className="text-sm font-medium">{formatDate(start.toISOString(),{day:'numeric',month:'long'})} — {formatDate(new Date(end.getTime()-86400000).toISOString(),{day:'numeric',month:'long',year:'numeric'})}</p><Button iconOnly aria-label="Следующая неделя" onClick={()=>shift(1)}><ArrowRight/></Button></div><Button onClick={()=>{setStart(weekStart(new Date()));setSelectedDay(null);}}>Сегодня</Button></div><div className="my-5 grid grid-cols-7 gap-1">{Array.from({length:7},(_,index)=>{const day=new Date(start);day.setDate(day.getDate()+index);return <button key={index} type="button" aria-pressed={selectedDay===index} onClick={()=>setSelectedDay(current=>current===index?null:index)} className={`rounded-md px-1 py-3 text-center transition-colors ${selectedDay===index?'bg-accent-subtle text-accent-subtle-text':'hover:bg-fill-hover'}`}><span className="block text-2xs text-text-secondary">{formatDate(day.toISOString(),{weekday:'short'})}</span><span className="mt-1 block text-sm font-medium tabular-nums">{day.getDate()}</span></button>;})}</div>{events.length?<div className="space-y-1">{events.map(event=><RecordRow key={event.id} icon={<CalendarDays/>} title={event.title} description={`${formatDate(event.startsAt,{day:'numeric',month:'long',hour:'2-digit',minute:'2-digit'})} — ${formatDate(event.endsAt,{hour:'2-digit',minute:'2-digit'})}${event.location?` · ${event.location}`:''}`} meta={<SourceBadge origin={event.provenance.origin}/>}/>)}</div>:<EmptyView title="На выбранные даты занятий нет" description="В расписании нет событий на этот период."/>}{data.scheduleEvents.length>0&&<Button variant="ghost" className="mt-4" onClick={()=>{setStart(weekStart(new Date([...data.scheduleEvents].sort((a,b)=>a.startsAt.localeCompare(b.startsAt))[0]!.startsAt)));setSelectedDay(null);}}>К сохраненным событиям ({data.scheduleEvents.length})</Button>}</>;
}
