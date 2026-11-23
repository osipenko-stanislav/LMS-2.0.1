import { useCallback, useEffect, useState } from 'react';
import type { ChatSession, ChatSessionId, ChatMessage, ChatMessageId, ChatAttachment } from '../core/domain/chat';
import type { WorkspaceViewModel } from '../core/workspace-contracts';
import { localReply } from '../content/navigator';
export function useChatSessions(data?:WorkspaceViewModel){
  const [sessions,setSessions]=useState<ChatSession[]>(()=>{try{const value=JSON.parse(localStorage.getItem('lms-chat-sessions:v1')??'null');if(value?.version!==1||!Array.isArray(value.sessions))return [];return value.sessions.filter((s:ChatSession)=>s&&typeof s.id==='string'&&typeof s.title==='string'&&typeof s.updatedAt==='string'&&Array.isArray(s.messages)&&s.messages.every(m=>m&&typeof m.id==='string'&&typeof m.text==='string'&&(m.suggestion===undefined||typeof m.suggestion==='string')&&(m.attachments===undefined||(Array.isArray(m.attachments)&&m.attachments.every(f=>f&&typeof f.id==='string'&&typeof f.name==='string'&&typeof f.mimeType==='string'&&typeof f.size==='number'&&Number.isFinite(f.size)&&f.size>=0)))&&['user','assistant'].includes(m.role)&&Array.isArray(m.blocks)&&m.blocks.every(b=>b?.type==='course'&&typeof b.courseId==='string')));}catch{return [];}});
  const [storageError,setStorageError]=useState<string>();
  useEffect(()=>{try{localStorage.setItem('lms-chat-sessions:v1',JSON.stringify({version:1,sessions:sessions.filter(s=>s.messages.length)}));setStorageError(undefined);}catch{setStorageError('Не удалось сохранить диалоги. История доступна до перезагрузки.');}},[sessions]);
  const [lastActiveId,setLastActiveId]=useState<ChatSessionId>();
  const create=useCallback(()=>{
    const now=new Date().toISOString(),id=crypto.randomUUID() as ChatSessionId;
    const session:ChatSession={id,title:'Новый диалог',createdAt:now,updatedAt:now,messages:[],provenance:{origin:'user',source:'local-chat',createdAt:now}};
    setSessions(items=>[session,...items]);setLastActiveId(id);return id;
  },[]);
  const send=(sessionId:ChatSessionId|undefined,text:string,suggestion?:string,attachments:ChatAttachment[]=[])=>{
    if(!text.trim()&&!attachments.length)return sessionId;
    const id=sessionId??create(),now=new Date().toISOString(),reply=localReply(text,data);
    const messages:ChatMessage[]=[
      {id:crypto.randomUUID() as ChatMessageId,sessionId:id,role:'user',text:text.trim(),suggestion,attachments,createdAt:now,blocks:[],provenance:{origin:'user',source:'local-chat',createdAt:now}},
      {id:crypto.randomUUID() as ChatMessageId,sessionId:id,role:'assistant',...reply,createdAt:now,provenance:{origin:'fixture',source:'local-navigator-demo',createdAt:now}},
    ];
    setSessions(items=>items.map(session=>session.id===id?{...session,title:session.messages.length?session.title:(text.trim()||attachments[0]?.name||'Новый диалог').slice(0,70),updatedAt:now,messages:[...session.messages,...messages]}:session));setLastActiveId(id);return id;
  };
  const rename=(id:ChatSessionId,title:string)=>{if(title.trim())setSessions(items=>items.map(s=>s.id===id?{...s,title:title.trim()}:s));};
  const remove=(id:ChatSessionId)=>setSessions(items=>items.filter(s=>s.id!==id));
  return {sessions,lastActiveId,create,send,setLastActiveId,rename,remove,storageError};
}
