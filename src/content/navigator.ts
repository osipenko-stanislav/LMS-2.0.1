import type { ChatBlock } from '../core/domain/chat';
import type { WorkspaceViewModel } from '../core/workspace-contracts';
export const navigatorCopy={
  emptyTitle:'С чего начнем?',
  emptyDescription:'Найдите курс, откройте задание или задайте вопрос.',
  placeholder:'Спросить навигатор…',
  suggestions:['Продолжить учебу','Расписание сегодня','Моя неделя','Домашки','🔥 Я в огне'],
};
export function localReply(text:string,data?:WorkspaceViewModel):{text:string;blocks:ChatBlock[]}{
  if(/(?:^|[^\p{L}\p{N}_])братишка(?=$|[^\p{L}\p{N}_])/iu.test(text))return {text:'Покушать принёс?',blocks:[]};
  const course=data?.courses[0];
  if(course&&/курс|course|учеб|материал/i.test(text))return {text:'Вот подходящий курс из вашего учебного плана — его можно открыть прямо отсюда.',blocks:[{type:'course',courseId:course.id}]};
  return {text:'Используйте поиск, курсы и домашние задания в меню, чтобы продолжить работу с учебным планом.',blocks:[]};
}

// Scripted transcription for the explicitly requested fake audio interaction.
export const mockAudioTranscript='Помоги составить план учебы на неделю.';
