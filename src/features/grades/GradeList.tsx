import { Plus } from 'lucide-react';
import type { Entity, Grade } from '../../core/domain';
import type { Action } from '../../core/actions';
import type { WorkspaceViewModel } from '../../core/workspace-contracts';
import { EmptyView, SourceBadge } from '../../compositions/shell/SharedViews';
import { Button, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../ui';
export function recordGrade(grade:Entity<Grade>,onAction:(action:Action)=>Promise<void>){void onAction({type:'grade.update',payload:{gradeId:grade.id,score:(grade.score??0)+1,feedbackContentId:grade.feedbackContentId}});}
export function GradeList({data,grades=data.grades,onRecord,pending}:{data:WorkspaceViewModel;grades?:Entity<Grade>[];onRecord:(grade:Entity<Grade>)=>void;pending:boolean}){
 if(!grades.length)return <EmptyView title="Оценок пока нет" description="Здесь появятся доступные оценки за задания."/>;
 return <div className="overflow-x-auto rounded-lg bg-surface-panel"><Table><TableHeader><TableRow><TableHead>Задание</TableHead><TableHead>Курс</TableHead><TableHead>Оценка</TableHead><TableHead>Источник</TableHead><TableHead className="text-right">Действие</TableHead></TableRow></TableHeader><TableBody>{grades.map(grade=>{
  const assignment=data.assignments.find(item=>item.id===grade.assignmentId),course=data.courses.find(item=>item.id===assignment?.courseId);
  return <TableRow key={grade.id}><TableCell className="min-w-40 font-medium">{assignment?.title??'Задание недоступно'}</TableCell><TableCell className="min-w-32 text-text-secondary">{course?.title??'Курс недоступен'}</TableCell><TableCell><span role="status" aria-label="Текущая оценка" aria-live="polite" className="tabular-nums">{grade.score??'—'}{assignment?` / ${assignment.maxScore}`:''}</span></TableCell><TableCell><SourceBadge origin={grade.provenance.origin}/></TableCell><TableCell className="text-right"><Button disabled={pending} aria-label="Record +1 point" onClick={()=>onRecord(grade)}><Plus className="size-3.5"/>+1 балл</Button></TableCell></TableRow>;
 })}</TableBody></Table></div>;
}

