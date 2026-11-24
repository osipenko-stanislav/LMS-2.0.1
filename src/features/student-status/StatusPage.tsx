import { EmptyView } from '../../compositions/shell/SharedViews';
export function StatusPage({id}:{id:'transcript'|'late-days'|'notifications'}){
  if(id==='transcript')return <EmptyView title="Итоговые результаты недоступны" description="В доступных данных есть оценки за задания. Итоговые академические результаты пока не представлены."/>;
  if(id==='late-days')return <EmptyView title="Данные Late Days недоступны" description="Остаток и история использования не подключены. Доступных операций списания нет."/>;
  if(id==='notifications')return <EmptyView title="Уведомлений пока нет" description="В локальных данных нет уведомлений."/>;
}
