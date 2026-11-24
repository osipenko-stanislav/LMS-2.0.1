import type { WorkspaceViewModel } from '../../core/workspace-contracts';
import type { Navigate } from '../../app/router';
import { CatalogCourseCard } from './CourseCards';
export function CatalogPage({data,navigate}:{data:WorkspaceViewModel;navigate:Navigate}){
 const courses=(data.catalogCourseIds??data.courses.map(course=>course.id)).flatMap(id=>{const course=data.courses.find(item=>item.id===id);return course?.catalog?[course]:[];});
 return <><div className="grid auto-rows-fr grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">{courses.map(course=><CatalogCourseCard key={course.id} course={course} onOpen={()=>navigate('course',{courseId:course.id})}/>)}</div></>;
}
