import { courses as sourceCourses, type Course as SourceCourse } from './catalog';
import { curriculumBlocks, courseLessons, courseInfo } from './machine-learning/structure';

export type MigratedCourse = SourceCourse & {
  description: string;
  modules: { id: string; title: string; lessons: { id: string; title: string; summary: string; focus: string[]; readingMinutes: number }[] }[];
};

export const migratedCourses: MigratedCourse[] = sourceCourses.map(course => ({
  ...course,
  description: course.id === 'machine-learning' ? courseInfo.description : `${course.title}. Учебная программа и материалы курса.`,
  modules: course.id === 'machine-learning' ? curriculumBlocks.map(block => ({
    id: block.id,
    title: block.title,
    lessons: block.entities.filter(entity => entity.kind === 'lesson' && entity.lessonId).map(entity => {
      const lesson = courseLessons.find(item => item.id === entity.lessonId)!;
      return { id: lesson.id, title: lesson.title, summary: lesson.summary, focus: lesson.focus, readingMinutes: lesson.readingMinutes };
    }),
  })) : [],
}));

export function getMigratedCourse(id: string) { return migratedCourses.find(course => course.id === id); }
export function getMigratedLesson(courseId: string, lessonId: string) {
  return getMigratedCourse(courseId)?.modules.flatMap(module => module.lessons).find(lesson => lesson.id === lessonId);
}
