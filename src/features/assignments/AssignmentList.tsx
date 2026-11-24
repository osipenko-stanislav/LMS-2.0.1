import { CheckSquare } from 'lucide-react';
import type { WorkspaceViewModel } from '../../core/workspace-contracts';
import type { Navigate } from '../../app/router';
import { EmptyView, RecordRow, formatDate } from '../../compositions/shell/SharedViews';

export function AssignmentList({data,courseId,navigate}:{data:WorkspaceViewModel;courseId?:string;navigate:Navigate}){
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

