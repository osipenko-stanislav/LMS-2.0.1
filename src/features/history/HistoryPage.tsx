import type { ChatSession, ChatSessionId } from '../../core/domain/chat';
import { EmptyView, PageIntro, RecordRow, formatDate } from '../../compositions/shell/SharedViews';
import { Badge } from '../../ui';

export function HistoryPage({sessions,activeSessionId,onSession}:{sessions:ChatSession[];activeSessionId?:ChatSessionId;onSession:(id:ChatSessionId)=>void}){return <><PageIntro description="Ваши диалоги в этой вкладке. Выберите диалог, чтобы продолжить."/>{!sessions.length?<EmptyView title="История пока пуста" description="Начните диалог с навигатором — он появится здесь."/>:<div className="space-y-1">{sessions.map(session=><button key={session.id} type="button" aria-current={activeSessionId===session.id?'true':undefined} className="block w-full rounded-lg px-3 text-left transition-colors hover:bg-fill-hover aria-[current=true]:bg-fill-hover" onClick={()=>onSession(session.id)}><RecordRow title={session.title} description={`${session.messages.length} сообщений · ${formatDate(session.updatedAt)}`} meta={activeSessionId===session.id?<Badge variant="outline">Последний диалог</Badge>:undefined}/></button>)}</div>}</>;
}
