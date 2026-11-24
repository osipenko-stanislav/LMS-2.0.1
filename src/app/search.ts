import { navigationEntries, type NavigationId, type RouteParams } from './navigation';
import type { WorkspaceViewModel } from '../core/workspace-contracts';
export interface SearchResult { key:string;title:string;description:string;route:NavigationId;params?:RouteParams }
export function searchWorkspace(query:string,data?:WorkspaceViewModel):SearchResult[]{
  const normalized=query.trim().replace(/\s+/g,' ').toLocaleLowerCase('ru-RU');if(!normalized)return [];
  const records:SearchResult[]=[
    ...navigationEntries.filter(item=>!item.ancestors.length).map(item=>({key:`nav:${item.id}`,title:item.title,description:'Раздел приложения',route:item.id})),
    ...(data?.courses??[]).map(item=>({key:item.id,title:item.title,description:item.code?`Курс · ${item.code}`:'Курс',route:'course' as const,params:{courseId:item.id}})),
    ...(data?.assignments??[]).map(item=>({key:item.id,title:item.title,description:`Задание · ${data?.courses.find(course=>course.id===item.courseId)?.title??''}`,route:'assignment' as const,params:{assignmentId:item.id}})),
    ...(data?.materials??[]).map(item=>({key:`material:${item.id}`,title:item.title,description:'Материал курса',route:'material' as const,params:{courseId:item.courseId,lessonId:item.lessonId}})),
    ...(data?.scheduleEvents??[]).map(item=>({key:item.id,title:item.title,description:`Расписание · ${item.location??''}`,route:'schedule' as const})),
  ];
  return records.filter(item=>`${item.title} ${item.description}`.replace(/\s+/g,' ').toLocaleLowerCase('ru-RU').includes(normalized));
}
