import type { Id } from './shared';
import type { AssignmentId, UserId } from './learning';
import type { LessonId } from './lesson';

export type CourseId = Id<'course'>;
export type CourseArea = 'development' | 'math' | 'general';
export type CourseLevel = 'basic' | 'medium' | 'advanced';
export type CourseCategory = 'required' | 'elective' | 'auditor' | 'internal';
export interface CourseCatalogMetadata {
  area:CourseArea; category:CourseCategory; levels:CourseLevel[];
  description:string; syllabusUrl?:string;
}
export interface Course {
  id:CourseId; title:string; code?:string; instructorId?:UserId;
  lessonIds:LessonId[]; assignmentIds:AssignmentId[];
  description?:string; catalog?:CourseCatalogMetadata;
  sourceTitles?:{plan?:string;catalog?:string};
}
