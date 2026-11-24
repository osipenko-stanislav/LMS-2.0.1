import { resolveLegacyLearningParams } from '../data/courses/ids';
import { Bell, BookOpen, BookOpenText, CalendarDays, CheckSquare, Clock3, FileText, GraduationCap, History, Library, Megaphone, Search, Settings, Sparkles, Table2, Target, type LucideIcon } from 'lucide-react';

export interface NavigationNode {
  id: string;
  title: string;
  path: string;
  icon: LucideIcon;
  interaction: 'route' | 'panel';
  action?: 'new-chat';
  children?: readonly NavigationNode[];
}
export const navigation = [
  { title: 'Основное', items: [
    { id: 'navigator', title: 'Навигатор', path: '/navigator', icon: Sparkles, interaction: 'route', action: 'new-chat', children: [
      { id: 'chat', title: 'Навигатор', path: '/navigator/:sessionId', icon: Sparkles, interaction: 'route' },
    ] },
    { id: 'history', title: 'История', path: '/history', icon: History, interaction: 'route' },
    { id: 'search', title: 'Поиск', path: '/search', icon: Search, interaction: 'route' },
    { id: 'library', title: 'Библиотека', path: '/library', icon: Library, interaction: 'route' },
  ] },
  { title: 'Обучение', items: [
    { id: 'courses', title: 'Курсы', path: '/courses', icon: GraduationCap, interaction: 'route', children: [
      { id: 'course', title: 'Курс', path: '/courses/:courseId', icon: BookOpen, interaction: 'route', children: [
        { id: 'material', title: 'Материал', path: '/courses/:courseId/lessons/:lessonId', icon: FileText, interaction: 'route' },
      ] },
    ] },
    { id: 'assignments', title: 'Домашние задания', path: '/assignments', icon: CheckSquare, interaction: 'route', children: [
      { id: 'assignment', title: 'Задание', path: '/assignments/:assignmentId', icon: CheckSquare, interaction: 'route' },
    ] },
    { id: 'schedule', title: 'Расписание', path: '/schedule', icon: CalendarDays, interaction: 'route' },
    { id: 'grades', title: 'Ведомость', path: '/grades', icon: Table2, interaction: 'route' },
    { id: 'transcript', title: 'Зачётка', path: '/transcript', icon: FileText, interaction: 'route' },
    { id: 'late-days', title: 'Late Days', path: '/late-days', icon: Clock3, interaction: 'route' },
  ] },
  { title: 'Ресурсы', items: [
    { id: 'handbook', title: 'Хэндбук', path: '/handbook', icon: BookOpen, interaction: 'route' },
    { id: 'notifications', title: 'Уведомления', path: '/notifications', icon: Bell, interaction: 'route' },
    { id: 'settings', title: 'Настройки', path: '/settings', icon: Settings, interaction: 'route' },
    { id: 'goals', title: 'Мои цели', path: '/goals', icon: BookOpen, interaction: 'route' },
    { id: 'plan', title: 'Учебный план', path: '/plan', icon: BookOpen, interaction: 'route' },
    { id: 'forecast', title: 'Прогноз', path: '/forecast', icon: BookOpen, interaction: 'route' },
    { id: 'enrollment', title: 'Запись на пары', path: '/enrollment', icon: BookOpen, interaction: 'route' },
    { id: 'attendance', title: 'Посещаемость', path: '/attendance', icon: BookOpen, interaction: 'route' },
    { id: 'course-choice', title: 'Выбор курсов', path: '/course-choice', icon: BookOpen, interaction: 'route' },
    { id: 'profiles', title: 'Профили', path: '/profiles', icon: BookOpen, interaction: 'route' },
    { id: 'vacancies', title: 'Вакансии', path: '/vacancies', icon: BookOpen, interaction: 'route' },
    { id: 'applications', title: 'Отклики', path: '/applications', icon: BookOpen, interaction: 'route' },
    { id: 'events', title: 'События', path: '/events', icon: BookOpen, interaction: 'route' },
    { id: 'time', title: 'Time', path: '/time', icon: BookOpen, interaction: 'route' },
    { id: 'appointments', title: 'Онлайн-запись', path: '/appointments', icon: BookOpen, interaction: 'route' },
    { id: 'it-services', title: 'IT-сервисы', path: '/it-services', icon: BookOpen, interaction: 'route' },
    { id: 'support', title: 'Поддержка', path: '/support', icon: BookOpen, interaction: 'route' },
  ] },
] as const satisfies readonly { title: string; items: readonly NavigationNode[] }[];
type NodeId<T> = T extends { id: infer I extends string; children: readonly (infer C)[] } ? I | NodeId<C> : T extends { id: infer I extends string } ? I : never;
export type NavigationId = NodeId<(typeof navigation)[number]['items'][number]>;
export interface NavigationEntry extends NavigationNode { id: NavigationId; ancestors: NavigationNode[]; sectionId: NavigationId }
function flatten(nodes: readonly NavigationNode[], ancestors: NavigationNode[] = []): NavigationEntry[] {
  return nodes.flatMap(node => [{...node, id: node.id as NavigationId, ancestors, sectionId: (ancestors[0]?.id ?? node.id) as NavigationId}, ...flatten(node.children ?? [], [...ancestors,node])]);
}
export const navigationEntries = navigation.flatMap(group => flatten(group.items));
export type RouteParams = Record<string,string>;
export function pathFor(id: NavigationId, params: RouteParams = {}) {
  const entry=navigationEntries.find(node=>node.id===id)!;
  return entry.path.replace(/:([a-zA-Z]+)/g, (_,key:string)=>{ if(!params[key])throw new Error(`Missing route parameter: ${key}`);return encodeURIComponent(params[key]); });
}
export function resolveRoute(path: string) {
  for(const entry of navigationEntries){
    const keys:string[]=[];
    const pattern=entry.path.replace(/:([a-zA-Z]+)/g,(_,key:string)=>{keys.push(key);return '([^/]+)';});
    const match=new RegExp(`^${pattern}/?$`).exec(path);
    if(match){try{return {entry, params:resolveLegacyLearningParams(Object.fromEntries(keys.map((key,index)=>[key,decodeURIComponent(match[index+1]!)])))};}catch{return null;}}
  }
  return null;
}

// Sidebar composition is independent of detail routes and breadcrumbs.
export const sidebarSections = [
 {group:'AI',id:'navigator',title:'Навигатор'},
 {group:'AI',id:'history',title:'История'},
 {group:'AI',id:'library',title:'Библиотека'},
 {group:'Учёба',id:'goals',title:'Мои цели'},
 {group:'Учёба',title:'Обучение',children:['courses','late-days','plan','grades','transcript','forecast','assignments','enrollment','attendance','course-choice']},
 {group:'Учёба',title:'Расписание',id:'schedule'},
 {group:'Университет',title:'Хэндбук',id:'handbook'},
 {group:'Университет',title:'События',id:'events'},
 {group:'Университет',title:'Сервисы',children:['time','appointments','it-services','support']},
] satisfies {group:string;id?:NavigationId;title:string;children?:NavigationId[]}[];
