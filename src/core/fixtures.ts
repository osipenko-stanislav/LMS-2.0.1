import type { FixtureSeed } from './data-source';
import type { Assignment, ContentId, Course, Entity, Grade, Lesson, ScheduleEvent } from './domain';
const p = { origin: 'external' as const, source: 'cu.ru', createdAt: '2026-11-23T00:00:00.000Z' };
const id = (kind:string, value:string) => `${kind}:${value}` as never;
const student = id('user','student-2025');
const courseDefs = [
  ['algorithms','Алгоритмы и структуры данных 1','DEV-201','Понятие алгоритма, асимптотика, поиск, сортировки, структуры данных и динамическое программирование.'],
  ['discrete','Дискретная математика','MATH-201','Комбинаторика, графы, логика, отношения и математические доказательства.'],
  ['architecture','Архитектура компьютера и операционные системы I','DEV-202','Процессор, память, процессы и базовые механизмы операционных систем.'],
  ['databases','Базы данных','DEV-203','Реляционная модель, SQL, нормализация и проектирование схем.'],
  ['english','Английский язык 201S3','LANG-201','Разговорная практика, письма, презентации и профессиональная коммуникация.'],
  ['agile','Командная работа по Agile','SOFT-201','Agile, Scrum, Kanban, метрики, ретроспективы и командные компетенции.'],
  ['theory-cs','Теоретические компьютерные науки','STEM-201','Сложность алгоритмов, машины Тьюринга, P vs NP и научное исследование в CS.'],
] as const;
const lessonDefs = [
 ['algorithms','Асимптотика и рекурсия','Понятие алгоритма, способы измерения времени выполнения, асимптотические нотации и мастер-теорема.'],
 ['algorithms','Поиск и сортировка','Бинарный поиск, сортировка слиянием, быстрая сортировка и структура данных «куча».'],
 ['algorithms','Структуры данных и динамика','Списки, стеки, очереди, хеширование и одномерное динамическое программирование.'],
 ['discrete','Комбинаторика и графы','Базовые дискретные структуры, графы и методы рассуждения о сложных системах.'],
 ['discrete','Логика и доказательства','Формальные утверждения, отношения, индукция и доказательства алгоритмических свойств.'],
 ['architecture','Компьютерная архитектура и ОС','Устройство вычислительных систем, память, процессы и планирование.'],
 ['databases','Модели данных и SQL','Реляционная модель, SQL-запросы, нормализация и проектирование базы данных.'],
 ['english','Communication and writing','Разговорная практика, формальные письма и презентационные навыки.'],
 ['agile','Agile, Scrum и Kanban','Ценности Agile, командная работа, планирование, ежедневный ритм и метрики процесса.'],
 ['theory-cs','Algorithm design and complexity','Сложность алгоритмов, «разделяй и властвуй», жадные и динамические алгоритмы.'],
 ['theory-cs','Computational complexity','Машины Тьюринга, проблема остановки, P vs NP, сводимость и NP-полнота.'],
] as const;
const lessonRows: Entity<Lesson>[] = lessonDefs.map(([course,title,text],i)=>({ provenance:p, id:id('lesson',`${course}-${i+1}`), courseId:id('course',course), title, contentId:id('content',`${course}-${i+1}`) as ContentId, order:i+1 }));
const assignmentDefs = [
 ['algorithms','Асимптотический анализ алгоритмов','2026-11-18'],['algorithms','Бинарный поиск и сортировки','2026-11-25'],['algorithms','Структуры данных: стек, очередь и хеш-таблица','2026-12-02'],['algorithms','Одномерное динамическое программирование','2026-12-09'],
 ['discrete','Задачи на графы и комбинаторику','2026-11-27'],['discrete','Доказательства и математическая индукция','2026-12-04'],['architecture','Разбор памяти и процессов','2026-12-01'],['databases','Спроектировать схему и написать SQL-запросы','2026-12-05'],['english','Formal email: project update','2026-11-26'],['english','Presentation Skills: short project pitch','2026-12-10'],['agile','Составить Kanban-доску и определить метрики','2026-11-24'],['agile','Провести ретроспективу команды','2026-12-08'],['theory-cs','Рекуррентные соотношения и сложность','2026-11-29'],['theory-cs','Сведение задач и NP-полнота','2026-12-13'],
] as const;
const assignments: Entity<Assignment>[] = assignmentDefs.map(([course,title,date],i)=>({ provenance:p, id:id('assignment',`${course}-${i+1}`), courseId:id('course',course), lessonId:lessonRows.find(l=>l.courseId===id('course',course))?.id, title, dueAt:`${date}T12:00:00Z`, maxScore:100 }));
const courses: Entity<Course>[] = courseDefs.map(([key,title,code])=>({ provenance:p, id:id('course',key), title, code, instructorId:id('user','school-of-technologies'), lessonIds:lessonRows.filter(l=>l.courseId===id('course',key)).map(l=>l.id), assignmentIds:assignments.filter(a=>a.courseId===id('course',key)).map(a=>a.id) }));
const grades: Entity<Grade>[] = assignments.slice(0,5).map((a,i)=>({ provenance:p, id:id('grade',`${i+1}`), assignmentId:a.id, studentId:student, score:[84,91,78,88,95][i] }));
export const fixtureSeed: FixtureSeed = { currentUserId:student, content:lessonRows.map(l=>({id:l.contentId as ContentId,text:l.title,format:'markdown' as const})), collections:{ courses, lessons:lessonRows, assignments, grades, scheduleEvents:[
 {provenance:p,id:id('schedule','algorithms'),courseId:id('course','algorithms'),title:'Алгоритмы и структуры данных 1 · семинар',startsAt:'2026-11-25T15:00:00Z',endsAt:'2026-11-25T16:30:00Z',location:'Аудитория 204'},
 {provenance:p,id:id('schedule','agile'),courseId:id('course','agile'),title:'Командная работа по Agile · семинар',startsAt:'2026-11-26T12:00:00Z',endsAt:'2026-11-26T13:30:00Z',location:'Онлайн'},
 {provenance:p,id:id('schedule','discrete'),courseId:id('course','discrete'),title:'Дискретная математика · лекция',startsAt:'2026-11-27T09:00:00Z',endsAt:'2026-11-27T10:30:00Z',location:'Аудитория 301'},
] satisfies Entity<ScheduleEvent>[] }};
