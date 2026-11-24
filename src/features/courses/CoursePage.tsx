import type { WorkspaceViewModel } from '../../core/workspace-contracts';
import type { Navigate } from '../../app/router';
import { EmptyView, PageIntro, RecordRow, SourceBadge, LoadingView } from '../../compositions/shell/SharedViews';
import type { CourseViewModel, ViewContract } from '../../core/view-contracts';
import type { Action } from '../../core/actions';
import { SettingsSection } from '../../ui';
import { GradeList, recordGrade } from '../grades/GradeList';
import { AssignmentList } from '../assignments/AssignmentList';
export function CoursePage({data,course,courseId,navigate,pending,onAction}:{data:WorkspaceViewModel;course:ViewContract<CourseViewModel>;courseId?:string;navigate:Navigate;pending:boolean;onAction:(action:Action)=>Promise<void>}){
 const item=data.courses.find(item=>item.id===courseId);
 const catalog=item?.catalog;
 if(item&&catalog&&!data.studyPlanCourseIds?.includes(item.id)){
  const modules=(data.modules??[]).filter(module=>module.courseId===item.id);
  return <><PageIntro description={`${catalog.area} · ${catalog.category}`} /><p className="max-w-3xl text-sm leading-relaxed text-text-secondary">{catalog.description}</p>{modules.length?<div className="mt-8 space-y-6">{modules.map(module=><SettingsSection key={module.id} title={module.title}><div className="space-y-1">{module.lessonIds.map(id=>data.lessons.find(lesson=>lesson.id===id)!).map((lesson,index)=><RecordRow key={lesson.id} title={lesson.title} description={`${lesson.readingMinutes} минут · ${lesson.summary}`} meta={<span className="text-xs text-text-tertiary">{index+1}</span>} onOpen={()=>navigate('material',{courseId:item.id,lessonId:lesson.id})}/>)}</div></SettingsSection>)}</div>:<EmptyView title="Структура курса недоступна" description="Для этого курса в источнике нет перенесённых уроков."/>}</>;
 }
      const contract=course;
      if(contract.state==='loading')return <LoadingView/>;
      if(contract.state==='error'||!contract.data)return <EmptyView title="Курс недоступен" description={contract.error??'Не удалось найти курс.'}/>;
      const model=contract.data;
      return <><PageIntro description={model.course.code} action={<SourceBadge origin={model.course.provenance.origin}/>}/><SettingsSection title="Занятия">{model.lessons.length?<div className="space-y-1">{model.lessons.map(lesson=><RecordRow key={lesson.id} title={lesson.title} description={`Занятие ${lesson.order}`} onOpen={()=>navigate('material',{courseId:lesson.courseId,lessonId:lesson.id})}/>)}</div>:<EmptyView title="Занятий пока нет" description="Материалы курса еще не добавлены."/>}</SettingsSection><div className="mt-8"><SettingsSection title="Домашние задания"><AssignmentList data={data} courseId={model.course.id} navigate={navigate}/></SettingsSection></div><div className="mt-8"><SettingsSection title="Оценки"><GradeList data={data} grades={model.grades} pending={pending} onRecord={grade=>recordGrade(grade,onAction)}/></SettingsSection></div></>;

}
