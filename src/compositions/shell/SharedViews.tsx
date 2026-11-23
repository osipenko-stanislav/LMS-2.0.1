import { ArrowUpRight, BookOpen, ChevronRight, Code2, GraduationCap, Lightbulb, Plus, Star } from 'lucide-react';
import { useGradientBorder } from '../../vendor/linear-ui/lib/useGradientBorder';
import type { Course, Entity, Grade } from '../../core/domain';
import type { WorkspaceViewModel } from '../../core/workspace-contracts';
import { Badge, Button, Empty, EmptyDescription, EmptyTitle, Item, ItemContent, ItemDescription, ItemMedia, ItemTitle, Skeleton, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui';
export function EmptyView({title,description,children}:{title:string;description:string;children?:React.ReactNode}){
  return <Empty className="border-none py-16"><EmptyTitle>{title}</EmptyTitle><EmptyDescription>{description}</EmptyDescription>{children}</Empty>;
}
export function LoadingView(){return <div role="status" aria-label="Загрузка данных" className="flex flex-col gap-4 py-8"><Skeleton className="h-7 w-2/3"/><Skeleton className="h-20 w-full"/><Skeleton className="h-20 w-full"/></div>;}
export function SourceBadge({origin:_origin}:{origin:string}){return null;}
export function CourseCard({course,onOpen}:{course:Entity<Course>;onOpen:()=>void}){
  return <button type="button" onClick={onOpen} className="group w-full rounded-lg bg-bg-primary px-4 py-4 text-left transition-colors hover:bg-fill-hover focus-visible:rounded-lg" aria-label={`Открыть курс ${course.title}`}>
    <div className="flex items-start gap-3"><BookOpen strokeWidth={1.8} className="mt-0.5 size-5 shrink-0 text-text-tertiary"/><div className="min-w-0 flex-1"><p className="break-words text-sm font-medium text-text-primary">{course.title}</p><p className="mt-1 text-xs text-text-secondary">{course.code} · Занятия: {course.lessonIds.length} · Задания: {course.assignmentIds.length}</p></div><ArrowUpRight className="size-4 shrink-0 text-text-tertiary"/></div>
    <div className="mt-4 flex items-center justify-between"><span className="text-xs text-text-secondary">Открыть курс</span><SourceBadge origin={course.provenance.origin}/></div>
  </button>;
}
const areaIcon={development:Code2,math:GraduationCap,general:Lightbulb} as const;
const levelColor={basic:'text-[#3978ff]',medium:'text-[#ef4444]',advanced:'text-[#171717] dark:text-[#f5f5f5]'} as const;
export function CatalogCourseCard({course,onOpen}:{course:{title:string;area:'development'|'math'|'general';levels:('basic'|'medium'|'advanced')[]};onOpen:()=>void}){
 const Icon=areaIcon[course.area];
 const gradientRef=useGradientBorder<HTMLButtonElement>();
 return <button ref={gradientRef} type="button" onClick={onOpen} style={{backgroundImage:'radial-gradient(ellipse at top right, var(--accent-subtle-bg), transparent 65%)',backgroundSize:'100% 100%',backgroundRepeat:'no-repeat'}} className="group relative flex h-full w-full min-w-0 flex-col gap-3 rounded-xl border border-border bg-bg-elevated p-4 text-left transition-colors hover:bg-fill-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none">
  <div className="flex min-w-0 items-center gap-2 pr-14"><span className="grid size-6 shrink-0 place-items-center rounded-lg bg-fill-hover text-text-secondary"><Icon className="size-4"/></span><span className="truncate text-sm text-text-secondary">{course.area==='development'?'Разработка':course.area==='math'?'Математика':'Общие'}</span></div>
  <div className="min-w-0 flex-1"><p className="min-h-[2lh] break-words text-sm font-medium leading-5 text-text-primary">{course.title}</p></div>
  <div className="absolute right-4 top-5 flex items-center gap-0.5" aria-label={`Уровни: ${course.levels.length||'не указаны'}`}>{course.levels.map((level,index)=><Star key={`${level}-${index}`} className={`size-4 fill-current ${levelColor[level]}`} strokeWidth={1.5}/>)}</div>
 </button>;
}
export function RecordRow({title,description,icon,meta,onOpen}:{title:string;description?:string;icon?:React.ReactNode;meta?:React.ReactNode;onOpen?:()=>void}){
  const body=<Item interactive={!!onOpen} className="w-full group-focus-visible/record:bg-fill-hover"><ItemMedia>{icon??<BookOpen className="size-4"/>}</ItemMedia><ItemContent><ItemTitle className="whitespace-normal break-words">{title}</ItemTitle>{description&&<ItemDescription className="whitespace-normal break-words">{description}</ItemDescription>}</ItemContent>{meta}<ChevronRight className={`size-4 shrink-0 text-text-tertiary ${onOpen?'':'invisible'}`}/></Item>;
  return onOpen?<button type="button" className="group/record block w-full rounded-lg text-left" onClick={onOpen}>{body}</button>:body;
}
export function GradeList({data,grades=data.grades,onRecord,pending}:{data:WorkspaceViewModel;grades?:Entity<Grade>[];onRecord:(grade:Entity<Grade>)=>void;pending:boolean}){
 if(!grades.length)return <EmptyView title="Оценок пока нет" description="Здесь появятся доступные оценки за задания."/>;
 return <div className="overflow-x-auto rounded-lg bg-surface-panel"><Table><TableHeader><TableRow><TableHead>Задание</TableHead><TableHead>Курс</TableHead><TableHead>Оценка</TableHead><TableHead>Источник</TableHead><TableHead className="text-right">Действие</TableHead></TableRow></TableHeader><TableBody>{grades.map(grade=>{
  const assignment=data.assignments.find(item=>item.id===grade.assignmentId),course=data.courses.find(item=>item.id===assignment?.courseId);
  return <TableRow key={grade.id}><TableCell className="min-w-40 font-medium">{assignment?.title??'Задание недоступно'}</TableCell><TableCell className="min-w-32 text-text-secondary">{course?.title??'Курс недоступен'}</TableCell><TableCell><span role="status" aria-label="Текущая оценка" aria-live="polite" className="tabular-nums">{grade.score??'—'}{assignment?` / ${assignment.maxScore}`:''}</span></TableCell><TableCell><SourceBadge origin={grade.provenance.origin}/></TableCell><TableCell className="text-right"><Button disabled={pending} aria-label="Record +1 point" onClick={()=>onRecord(grade)}><Plus className="size-3.5"/>+1 балл</Button></TableCell></TableRow>;
 })}</TableBody></Table></div>;
}
export function PageIntro({description,action}:{description?:string;action?:React.ReactNode}){return <div className="mb-6 flex flex-wrap items-start justify-between gap-3">{description&&<p className="max-w-2xl text-sm text-text-secondary">{description}</p>}{action}</div>;}
export function formatDate(value:string,options:Intl.DateTimeFormatOptions={day:'numeric',month:'long',year:'numeric'}){return new Intl.DateTimeFormat('ru-RU',{...options,timeZone:'Europe/Moscow'}).format(new Date(value));}
