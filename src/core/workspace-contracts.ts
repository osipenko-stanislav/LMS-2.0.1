import type { DataSource, Collections } from './data-source';
import type { ContentId, LearningMaterial } from './domain';
import { dispatchAction, type Action, type ActionResult } from './actions';
export type MaterialView = LearningMaterial;
export interface WorkspaceViewModel extends Collections { materials: MaterialView[] }
export type DataView<T> = { state:'loading' } | { state:'error';error:string } | { state:'ready';data:T };
export interface WorkspaceActions { dispatch(action:Action):Promise<ActionResult> }
export async function getWorkspaceView(source:DataSource):Promise<WorkspaceViewModel>{
  const data=await source.getCollections();
  const content=await Promise.all(data.lessons.map(async lesson=>{
    const text=await source.getTextContent(lesson.contentId as ContentId);
    return text ? {id:text.id,lessonId:lesson.id,courseId:lesson.courseId,title:lesson.title,text:text.text,format:text.format,provenance:lesson.provenance} : undefined;
  }));
  return {...data,materials:content.filter((material):material is MaterialView=>!!material)};
}
export function getWorkspaceActions(source:DataSource):WorkspaceActions{return {dispatch:action=>dispatchAction(source,action)};}
