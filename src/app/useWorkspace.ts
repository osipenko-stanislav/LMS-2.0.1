import { useCallback, useEffect, useRef, useState } from 'react';
import type { DataSource } from '../core/data-source';
import type { Action } from '../core/actions';
import { getWorkspaceActions, getWorkspaceView, type DataView, type WorkspaceViewModel } from '../core/workspace-contracts';
import { getCourseView, type CourseViewModel, type ViewContract } from '../core/view-contracts';
export function useWorkspace(source:DataSource,courseId?:string){
  const [view,setView]=useState<DataView<WorkspaceViewModel>>({state:'loading'});
  const [course,setCourse]=useState<ViewContract<CourseViewModel>>({state:'loading',actions:{dispatch:async()=>{}}});
  const [pending,setPending]=useState(false),[actionError,setActionError]=useState<string>();
  const generation=useRef(0),courseGeneration=useRef(0),busy=useRef(false);
  const reload=useCallback(async()=>{
    const current=++generation.current;
    try{const data=await getWorkspaceView(source);if(generation.current===current)setView({state:'ready',data});}
    catch(error){if(generation.current===current)setView({state:'error',error:error instanceof Error?error.message:'Не удалось загрузить данные'});}
  },[source]);
  const reloadCourse=useCallback(async()=>{
    const current=++courseGeneration.current;
    if(!courseId)return;
    const data=await getCourseView(source,courseId as CourseViewModel['course']['id']);
    if(courseGeneration.current===current)setCourse(data);
  },[source,courseId]);
  useEffect(()=>{setView({state:'loading'});void reload();return()=>{generation.current++;};},[reload]);
  useEffect(()=>{setCourse({state:'loading',actions:{dispatch:async()=>{}}});void reloadCourse();return()=>{courseGeneration.current++;};},[reloadCourse]);
  async function act(action:Action){
    if(busy.current)return;busy.current=true;setPending(true);setActionError(undefined);
    try{const result=await getWorkspaceActions(source).dispatch(action);if(!result.ok)throw new Error(result.error);await Promise.all([reload(),reloadCourse()]);}
    catch(error){setActionError(error instanceof Error?error.message:'Не удалось выполнить действие');}
    finally{busy.current=false;setPending(false);}
  }
  return {view,course,pending,actionError,act,reload};
}
