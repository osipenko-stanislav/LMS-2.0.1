import { ArrowUpRight, BookOpen, Code2, GraduationCap, Lightbulb, Star } from 'lucide-react';
import type { Course, Entity } from '../../core/domain';
import { useGradientBorder } from '../../vendor/linear-ui/lib/useGradientBorder';
import { SourceBadge } from '../../compositions/shell/SharedViews';
export function CourseCard({course,onOpen}:{course:Entity<Course>;onOpen:()=>void}){
  return <button type="button" onClick={onOpen} className="group w-full rounded-lg bg-bg-primary px-4 py-4 text-left transition-colors hover:bg-fill-hover focus-visible:rounded-lg" aria-label={`Открыть курс ${course.title}`}>
    <div className="flex items-start gap-3"><BookOpen strokeWidth={1.8} className="mt-0.5 size-5 shrink-0 text-text-tertiary"/><div className="min-w-0 flex-1"><p className="break-words text-sm font-medium text-text-primary">{course.title}</p><p className="mt-1 text-xs text-text-secondary">{course.code} · Занятия: {course.lessonIds.length} · Задания: {course.assignmentIds.length}</p></div><ArrowUpRight className="size-4 shrink-0 text-text-tertiary"/></div>
    <div className="mt-4 flex items-center justify-between"><span className="text-xs text-text-secondary">Открыть курс</span><SourceBadge origin={course.provenance.origin}/></div>
  </button>;
}
const areaIcon={development:Code2,math:GraduationCap,general:Lightbulb} as const;
const levelColor={basic:'text-[#3978ff]',medium:'text-[#ef4444]',advanced:'text-[#171717] dark:text-[#f5f5f5]'} as const;
export function CatalogCourseCard({course,onOpen}:{course:Course;onOpen:()=>void}){
 const {area,levels}=course.catalog!;
 const Icon=areaIcon[area];
 const gradientRef=useGradientBorder<HTMLButtonElement>();
 return <button ref={gradientRef} type="button" onClick={onOpen} style={{backgroundImage:'radial-gradient(ellipse at top right, var(--accent-subtle-bg), transparent 65%)',backgroundSize:'100% 100%',backgroundRepeat:'no-repeat'}} className="group relative flex h-full w-full min-w-0 flex-col gap-3 rounded-xl border border-border bg-bg-elevated p-4 text-left transition-colors hover:bg-fill-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none">
  <div className="flex min-w-0 items-center gap-2 pr-14"><span className="grid size-6 shrink-0 place-items-center rounded-lg bg-fill-hover text-text-secondary"><Icon className="size-4"/></span><span className="truncate text-sm text-text-secondary">{area==='development'?'Разработка':area==='math'?'Математика':'Общие'}</span></div>
  <div className="min-w-0 flex-1"><p className="min-h-[2lh] break-words text-sm font-medium leading-5 text-text-primary">{course.title}</p></div>
  <div className="absolute right-4 top-5 flex items-center gap-0.5" aria-label={`Уровни: ${levels.length||'не указаны'}`}>{levels.map((level,index)=><Star key={`${level}-${index}`} className={`size-4 fill-current ${levelColor[level]}`} strokeWidth={1.5}/>)}</div>
 </button>;
}

