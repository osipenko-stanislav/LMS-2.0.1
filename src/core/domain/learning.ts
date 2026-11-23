import type { Id } from './shared';
export type CourseId = Id<'course'>; export type LessonId = Id<'lesson'>;
export type AssignmentId = Id<'assignment'>; export type GradeId = Id<'grade'>;
export type ScheduleEventId = Id<'schedule-event'>; export type UserId = Id<'user'>;
export type Course = { id: CourseId; title: string; code: string; lessonIds: LessonId[]; assignmentIds: AssignmentId[]; instructorId: UserId };
export type Lesson = { id: LessonId; courseId: CourseId; title: string; contentId: string; order: number };
export type Assignment = { id: AssignmentId; courseId: CourseId; title: string; lessonId?: LessonId; dueAt: string; maxScore: number };
export type Grade = { id: GradeId; assignmentId: AssignmentId; studentId: UserId; score: number | null; feedbackContentId?: string };
export type ScheduleEvent = { id: ScheduleEventId; courseId?: CourseId; title: string; startsAt: string; endsAt: string; location?: string };
