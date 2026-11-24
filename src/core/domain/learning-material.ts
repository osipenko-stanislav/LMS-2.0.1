import type { ContentId, Provenance, TextContent } from './shared';
import type { CourseId } from './course';
import type { LessonId } from './lesson';
export type LearningMaterialId = ContentId;
export type LearningMaterialKind = 'markdown'|'pdf'|'notebook'|'link'|'image'|'plain';
export interface LearningMaterial {
  id:LearningMaterialId; courseId:CourseId; lessonId:LessonId; title:string;
  text:string; format:TextContent['format']; kind?:LearningMaterialKind;
  href?:string; contentPath?:string; provenance:Provenance;
}
