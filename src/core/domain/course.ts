export type CourseOrigin = 'fixture' | 'user' | 'external' | 'ai-generated';
export type CatalogCourseId = `catalog-course:${string}`;
export interface CourseCatalogEntity { id: CatalogCourseId; sourceId: string; title: string; area: 'development'|'math'|'general'; category: 'required'|'elective'|'auditor'|'internal'; levels: ('basic'|'medium'|'advanced')[]; description: string; provenance: { origin: CourseOrigin; source?: string }; }
