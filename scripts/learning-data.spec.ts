import { test, expect } from '@playwright/test';
import { fixtureSeed } from '../src/core/fixtures';
import { FixtureDataSource } from '../src/core/data-source';
import { getWorkspaceView } from '../src/core/workspace-contracts';
import { getCourseView } from '../src/core/view-contracts';
import { searchWorkspace } from '../src/app/search';
import { resolveRoute } from '../src/app/navigation';
import { importedCourseIds } from '../src/data/courses/ids';
import { adaptCourseCatalog } from '../src/data/courses';
import type { CourseId } from '../src/core/domain';
import { courses as importedCourses } from '../src/data/courses/catalog';
import { courseLessons, curriculumBlocks } from '../src/data/courses/machine-learning/structure';

test('Canonical course identities preserve source membership, names and existing study relations',async()=>{
 const data=await getWorkspaceView(new FixtureDataSource(fixtureSeed));
 expect(new Set(data.courses.map(course=>course.id)).size).toBe(data.courses.length);
 expect(data.courses).toHaveLength(19);expect(data.catalogCourseIds).toHaveLength(16);expect(data.studyPlanCourseIds).toHaveLength(7);
 expect(data.courses.filter(course=>course.id===importedCourseIds.algorithms)).toHaveLength(1);
 const algorithms=data.courses.find(course=>course.id==='course:algorithms')!;
 expect(algorithms.title).toBe('Алгоритмы и\u00a0структуры данных\u00a01');
 expect(algorithms.sourceTitles?.catalog).toBe('Алгоритмы и\u00a0структуры данных');
 expect(algorithms.catalog?.levels).toEqual(['medium','advanced']);
 for(const imported of importedCourses){const course=data.courses.find(course=>course.id===importedCourseIds[imported.id])!;expect(course.sourceTitles?.catalog).toBe(imported.title);expect(course.catalog?.levels).toEqual(imported.levels);}
 expect(data.assignments).toHaveLength(14);expect(data.grades).toHaveLength(5);expect(data.scheduleEvents).toHaveLength(3);
 for(const assignment of data.assignments){expect(data.courses.some(course=>course.id===assignment.courseId)).toBe(true);expect(data.lessons.some(lesson=>lesson.id===assignment.lessonId&&lesson.courseId===assignment.courseId)).toBe(true);}
 for(const grade of data.grades)expect(data.assignments.some(assignment=>assignment.id===grade.assignmentId)).toBe(true);
 for(const event of data.scheduleEvents)expect(data.courses.some(course=>course.id===event.courseId)).toBe(true);
 for(const course of data.courses){expect(course.lessonIds).toEqual(data.lessons.filter(lesson=>lesson.courseId===course.id).map(lesson=>lesson.id));expect(course.assignmentIds).toEqual(data.assignments.filter(assignment=>assignment.courseId===course.id).map(assignment=>assignment.id));}
 const seed=structuredClone(fixtureSeed);
 seed.collections.courses=seed.collections.courses.filter(course=>data.studyPlanCourseIds!.includes(course.id));
 seed.collections.lessons=seed.collections.lessons.filter(lesson=>data.studyPlanCourseIds!.includes(lesson.courseId));
 seed.collections.courses.push({...algorithms,id:'course:unrelated-same-title' as CourseId,lessonIds:[],assignmentIds:[]});
 const adapted=adaptCourseCatalog(seed);
 expect(adapted.collections.courses.filter(course=>course.title===algorithms.title)).toHaveLength(2);
 expect(adapted.collections.courses.some(course=>course.id==='course:unrelated-same-title')).toBe(true);
});

test('Imported lessons, materials and search use the same course identity; legacy links resolve at routing',async()=>{
 const source=new FixtureDataSource(fixtureSeed),data=await getWorkspaceView(source);
 for(const imported of importedCourses){const canonical=importedCourseIds[imported.id];expect(resolveRoute(`/courses/${imported.id}`)?.params.courseId).toBe(canonical);expect(resolveRoute(`/courses/catalog-course:${imported.id}`)?.params.courseId).toBe(canonical);expect(resolveRoute(`/courses/${canonical}`)?.params.courseId).toBe(canonical);}
 expect(resolveRoute('/courses/unknown-course')?.params.courseId).toBe('unknown-course');
 expect(data.modules).toHaveLength(curriculumBlocks.length);
 const ml=data.courses.find(course=>course.id===importedCourseIds['machine-learning'])!;
 expect(ml.lessonIds).toHaveLength(courseLessons.length);
 for(const old of courseLessons){
   const route=resolveRoute(`/courses/machine-learning/lessons/${old.id}`)!;
   const lesson=data.lessons.find(lesson=>lesson.id===route.params.lessonId)!;
   expect(lesson.courseId).toBe(ml.id);expect(lesson.title).toBe(old.title);expect(lesson.summary).toBe(old.summary);expect(lesson.focus).toEqual(old.focus);
   expect(data.materials.find(material=>material.lessonId===lesson.id)?.text).toBe(old.summary);
   expect(searchWorkspace(old.title,data).some(result=>result.route==='material'&&result.params?.courseId===ml.id&&result.params.lessonId===lesson.id)).toBe(true);
 }
 expect(searchWorkspace('Алгоритмы и структуры данных',data).filter(result=>result.route==='course').map(result=>result.params?.courseId)).toEqual(['course:algorithms']);
 expect(searchWorkspace('Машинное обучение',data).filter(result=>result.route==='course')).toHaveLength(1);
 const course=await getCourseView(source,importedCourseIds['machine-learning']);expect(course.data?.course.id).toBe(ml.id);expect(course.data?.lessons).toHaveLength(courseLessons.length);
});
