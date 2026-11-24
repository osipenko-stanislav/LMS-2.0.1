import type { WorkspaceViewModel } from '../../core/workspace-contracts';
import { PageIntro } from '../../compositions/shell/SharedViews';
import type { Action } from '../../core/actions';
import { GradeList, recordGrade } from './GradeList';
export function GradesPage({data,pending,onAction}:{data:WorkspaceViewModel;pending:boolean;onAction:(action:Action)=>Promise<void>}){return <><PageIntro description="Оценки за задания. Изменения сразу отражаются в курсе и ведомости."/><GradeList data={data} pending={pending} onRecord={grade=>recordGrade(grade,onAction)}/><p className="mt-4 text-xs text-text-secondary">Изменения сразу отражаются в учебном плане.</p></>;
}
