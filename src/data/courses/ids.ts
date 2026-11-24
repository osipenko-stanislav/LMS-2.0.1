import type { CourseId, LessonId } from '../../core/domain';

// Confirmed identity mapping, never inferred from titles. Existing plan IDs win.
export const importedCourseIds:Readonly<Record<string,CourseId>> = {
  'machine-learning':'course:machine-learning' as CourseId,
  algorithms:'course:algorithms' as CourseId,
  architecture:'course:architecture' as CourseId,
  probability:'course:probability' as CourseId,
  'discrete-math':'course:discrete' as CourseId,
  databases:'course:databases' as CourseId,
  'computer-vision':'course:computer-vision' as CourseId,
  nlp:'course:nlp' as CourseId,
  calculus:'course:calculus' as CourseId,
  'python-basic':'course:python-basic' as CourseId,
  'data-engineering':'course:data-engineering' as CourseId,
  optimization:'course:optimization' as CourseId,
  cpp:'course:cpp' as CourseId,
  statistics:'course:statistics' as CourseId,
  'self-organization':'course:self-organization' as CourseId,
  'critical-thinking':'course:critical-thinking' as CourseId,
};
export function importedLessonId(sourceId:string):LessonId{return `lesson:machine-learning:${sourceId}` as LessonId;}

/** Used only at the routing boundary; current canonical and unknown IDs pass through. */
export function resolveLegacyLearningParams(params:Record<string,string>):Record<string,string>{
  if(!params.courseId)return params;
  const sourceId=params.courseId.replace(/^catalog-course:/,'');
  const courseId=importedCourseIds[sourceId]??params.courseId;
  const lessonId=params.lessonId?.replace(/^catalog-lesson:/,'');
  return {...params,courseId,...(lessonId&&courseId===importedCourseIds['machine-learning']&&/^block-\d+-topic-\d+$/.test(lessonId)?{lessonId:importedLessonId(lessonId)}:{})};
}
