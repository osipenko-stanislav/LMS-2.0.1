import type { WorkspaceViewModel } from '../../core/workspace-contracts';
import type { Navigate } from '../../app/router';
import { EmptyView, PageIntro, SourceBadge, formatDate } from '../../compositions/shell/SharedViews';
import type { Action } from '../../core/actions';
import { GradeList, recordGrade } from '../grades/GradeList';
import { AssignmentList } from './AssignmentList';
export function AssignmentsPage({data,navigate}:{data:WorkspaceViewModel;navigate:Navigate}){return <><PageIntro description="Доступные задания и сроки. Статус отображается только при наличии данных."/><AssignmentList data={data} navigate={navigate}/></>;
}
export function AssignmentPage({data,assignmentId,pending,onAction}:{data:WorkspaceViewModel;assignmentId?:string;pending:boolean;onAction:(action:Action)=>Promise<void>}){
      const assignment=data.assignments.find(item=>item.id===assignmentId);
      if(!assignment)return <EmptyView title="Задание не найдено" description="В подключенных данных нет этого задания."/>;
      const course=data.courses.find(course=>course.id===assignment.courseId),grades=data.grades.filter(grade=>grade.assignmentId===assignment.id);
      return <><PageIntro description={course?.title} action={<SourceBadge origin={assignment.provenance.origin}/>}/><dl className="grid gap-5 border-y border-border-subtle py-5 sm:grid-cols-3"><div><dt className="text-xs text-text-secondary">Срок сдачи</dt><dd className="mt-1 text-sm">{formatDate(assignment.dueAt,{day:'numeric',month:'long',year:'numeric',hour:'2-digit',minute:'2-digit'})}</dd></div><div><dt className="text-xs text-text-secondary">Статус</dt><dd className="mt-1 text-sm">Не указан</dd></div><div><dt className="text-xs text-text-secondary">Максимальный балл</dt><dd className="mt-1 text-sm">{assignment.maxScore}</dd></div></dl><p className="my-6 text-sm text-text-secondary">Условия и отправка решения пока недоступны.</p><GradeList data={data} grades={grades} pending={pending} onRecord={grade=>recordGrade(grade,onAction)}/></>;

}
