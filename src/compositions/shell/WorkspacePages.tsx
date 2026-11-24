import type { Action } from '../../core/actions';
import type { ChatSession, ChatSessionId, ChatAttachment } from '../../core/domain/chat';
import type { DataView, WorkspaceViewModel } from '../../core/workspace-contracts';
import type { CourseViewModel, ViewContract } from '../../core/view-contracts';
import type { NavigationId, RouteParams } from '../../app/navigation';
import type { Navigate } from '../../app/router';
import { DataGuard, EmptyView } from './SharedViews';
import { HistoryPage } from '../../features/history/HistoryPage';
import { SearchPage } from '../../features/search/SearchPage';
import { SettingsPage } from '../../features/settings/SettingsPage';
import { StatusPage } from '../../features/student-status/StatusPage';
import { HandbookPageView } from '../../features/handbook/HandbookPage';
import { CatalogPage } from '../../features/courses/CatalogPage';
import { CoursePage } from '../../features/courses/CoursePage';
import { AssignmentsPage, AssignmentPage } from '../../features/assignments/AssignmentsPage';
import { GradesPage } from '../../features/grades/GradesPage';
import { LibraryPage } from '../../features/library/LibraryPage';
import { MaterialPage } from '../../features/materials/MaterialPage';
import { SchedulePage } from '../../features/schedule/SchedulePage';

interface PagesProps {
  id:NavigationId;params:RouteParams;view:DataView<WorkspaceViewModel>;course:ViewContract<CourseViewModel>;
  onFileOpen:(file:ChatAttachment)=>Promise<void>;
  sessions:ChatSession[];activeSessionId?:ChatSessionId;onSession:(id:ChatSessionId)=>void;
  navigate:Navigate;onAction:(action:Action)=>Promise<void>;pending:boolean;onRetry:()=>void;
}
export function WorkspacePages(props:PagesProps){
 const {id,params,view,sessions,navigate,onAction,pending}=props;
 if(id==='history')return <HistoryPage sessions={sessions} activeSessionId={props.activeSessionId} onSession={props.onSession}/>;
 if(id==='search')return <SearchPage view={view} navigate={navigate}/>;
 if(id==='settings')return <SettingsPage/>;
 if(id==='transcript'||id==='late-days'||id==='notifications')return <StatusPage id={id}/>;
 if(id==='handbook')return <HandbookPageView params={params} navigate={navigate}/>;
 return <DataGuard view={view} onRetry={props.onRetry}>{data=>{
  if(id==='courses')return <CatalogPage data={data} navigate={navigate}/>;
  if(id==='course')return <CoursePage data={data} course={props.course} courseId={params.courseId} navigate={navigate} pending={pending} onAction={onAction}/>;
  if(id==='assignments')return <AssignmentsPage data={data} navigate={navigate}/>;
  if(id==='assignment')return <AssignmentPage data={data} assignmentId={params.assignmentId} pending={pending} onAction={onAction}/>;
  if(id==='grades')return <GradesPage data={data} pending={pending} onAction={onAction}/>;
  if(id==='library')return <LibraryPage sessions={sessions} onFileOpen={props.onFileOpen}/>;
  if(id==='material')return <MaterialPage data={data} courseId={params.courseId} lessonId={params.lessonId}/>;
  if(id==='schedule')return <SchedulePage data={data}/>;
  return <EmptyView title="Раздел готовится" description="Здесь появятся ваши данные."/>;
 }}</DataGuard>;
}
