import type { CatalogLessonId } from './lesson';
export type LearningMaterialId = `learning-material:${string}`;
export type LearningMaterialKind = 'markdown'|'pdf'|'notebook'|'link'|'image';
export interface LearningMaterial { id: LearningMaterialId; lessonId: CatalogLessonId; title: string; kind: LearningMaterialKind; href?: string; contentPath?: string; provenance: { origin: 'fixture'|'user'|'external'|'ai-generated'; source?: string }; }
