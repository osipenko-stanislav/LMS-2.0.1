import type { WorkspaceViewModel } from '../../core/workspace-contracts';
import { EmptyView, PageIntro, SourceBadge } from '../../compositions/shell/SharedViews';
import { Badge } from '../../ui';
export function MaterialPage({data,courseId,lessonId}:{data:WorkspaceViewModel;courseId?:string;lessonId?:string}){
 const course=data.courses.find(item=>item.id===courseId),lesson=data.lessons.find(item=>item.id===lessonId&&item.courseId===courseId);
 if(course&&lesson?.focus)return <article className="lms-reading-column"><PageIntro description={course.title} action={<Badge variant="outline">Учебный материал</Badge>}/><h1 className="text-2xl font-semibold tracking-tight">{lesson.title}</h1><p className="mt-4 text-sm leading-relaxed text-text-secondary">{lesson.summary}</p><h2 className="mt-8 text-sm font-semibold">Темы урока</h2><ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">{lesson.focus.map(item=><li key={item}>{item}</li>)}</ul><p className="mt-8 text-xs text-text-tertiary">Содержимое и порядок соответствуют программе курса.</p></article>;
      const material=data.materials.find(item=>item.lessonId===lessonId&&item.courseId===courseId);
      if(!material)return <EmptyView title="Материал недоступен" description="Для этого занятия нет текстового материала."/>;
      return <article className="lms-reading-column"><PageIntro description={data.courses.find(course=>course.id===material.courseId)?.title} action={<SourceBadge origin={material.provenance.origin}/>}/><pre className="whitespace-pre-wrap break-words font-sans text-sm leading-relaxed">{material.text}</pre></article>;

}
