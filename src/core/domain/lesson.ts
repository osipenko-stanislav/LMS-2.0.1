import type { Id } from './shared';
import type { CourseId } from './course';
export type LessonId = Id<'lesson'>;
export interface Lesson {
  id:LessonId; courseId:CourseId; title:string; contentId:string; order:number;
  moduleId?:string; summary?:string; focus?:string[]; readingMinutes?:number;
}
export interface CourseModule { id:string; courseId:CourseId; title:string; order:number; lessonIds:LessonId[] }
