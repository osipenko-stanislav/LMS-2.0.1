import type { CatalogCourseId } from './course';
export type CatalogLessonId = `catalog-lesson:${string}`;
export interface CourseModule { id: string; courseId: CatalogCourseId; title: string; order: number; }
export interface CatalogLesson { id: CatalogLessonId; courseId: CatalogCourseId; moduleId: string; title: string; order: number; summary: string; focus: string[]; readingMinutes: number; }
