import type { FixtureSeed } from '../../core/data-source';
import type { ContentId, Course, CourseModule, Entity, Lesson } from '../../core/domain';
import { courses as importedCourses, handbookUrl } from './catalog';
import { curriculumBlocks, courseLessons, courseInfo } from './machine-learning/structure';
import { importedCourseIds, importedLessonId } from './ids';

/** Import boundary: two content sources, one identity and one domain contract. */
export function adaptCourseCatalog(seed:FixtureSeed):FixtureSeed {
  const courses=new Map(seed.collections.courses.map(course=>[course.id,{...course}]));
  const catalogCourseIds=importedCourses.map(course=>importedCourseIds[course.id]);
  const studyPlanCourseIds=seed.collections.courses.map(course=>course.id);
  const lessons:Entity<Lesson>[]=[],modules:CourseModule[]=[],content=[...seed.content];
  const provenance={origin:'external' as const,source:handbookUrl,createdAt:'2026-11-23T00:00:00.000Z'};
  for(const imported of importedCourses){
    const id=importedCourseIds[imported.id];
    if(!id)throw new Error(`Missing explicit course identity: ${imported.id}`);
    const existing=courses.get(id);
    const catalog={area:imported.area,category:imported.category,levels:imported.levels,syllabusUrl:imported.syllabusUrl,description:imported.id==='machine-learning'?courseInfo.description:`${imported.title}. Учебная программа и материалы курса.`};
    courses.set(id,{
      ...existing,id,title:existing?.title??imported.title,
      lessonIds:existing?.lessonIds??[],assignmentIds:existing?.assignmentIds??[],
      catalog,sourceTitles:{plan:existing?.title,catalog:imported.title},
      provenance:existing?.provenance??provenance,
    } satisfies Entity<Course>);
    if(imported.id!=='machine-learning')continue;
    for(const [order,source] of courseLessons.entries()){
      const lessonId=importedLessonId(source.id),contentId=`content:machine-learning:${source.id}` as ContentId;
      lessons.push({id:lessonId,courseId:id,title:source.title,contentId,order:order+1,moduleId:`module:machine-learning:${source.blockId}`,summary:source.summary,focus:source.focus,readingMinutes:source.readingMinutes,provenance});
      content.push({id:contentId,text:source.summary,format:'markdown'});
    }
    for(const [order,block] of curriculumBlocks.entries())modules.push({id:`module:machine-learning:${block.id}`,courseId:id,title:block.title,order:order+1,lessonIds:block.entities.filter(entity=>entity.kind==='lesson'&&entity.lessonId).map(entity=>importedLessonId(entity.lessonId!))});
    courses.get(id)!.lessonIds=lessons.filter(lesson=>lesson.courseId===id).map(lesson=>lesson.id);
  }
  return {...seed,content,collections:{...seed.collections,courses:[...courses.values()],lessons:[...seed.collections.lessons,...lessons],modules,catalogCourseIds,studyPlanCourseIds}};
}
