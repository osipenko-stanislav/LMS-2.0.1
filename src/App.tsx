import { saveChatFiles, downloadChatFile } from './data/chat-files';
import { useEffect } from 'react';
import { FixtureDataSource, type DataSource } from './core/data-source';
import { fixtureSeed } from './core/fixtures';
import type { ChatSessionId, ChatAttachment } from './core/domain/chat';
import { useAppRoute } from './app/router';
import { useWorkspace } from './app/useWorkspace';
import { useChatSessions } from './app/useChatSessions';
import type { NavigationNode } from './app/navigation';
import { AppShell } from './compositions/AppShell';
import { AiNavigator } from './compositions/shell/AiNavigator';
import { WorkspacePages } from './compositions/shell/WorkspacePages';
import { EmptyView } from './compositions/shell/SharedViews';
import { Button } from './ui';
const defaultSource=new FixtureDataSource(fixtureSeed);
export function App({source=defaultSource}:{source?:DataSource}){
 const {route,navigate,path}=useAppRoute();
 const workspace=useWorkspace(source,route?.params.courseId);
 const data=workspace.view.state==='ready'?workspace.view.data:undefined;
 const chat=useChatSessions(data);
 const chatId=route?.entry.id==='chat'?route.params.sessionId:undefined;
 const session=chat.sessions.find(session=>session.id===chatId);
 const panelSession=chat.sessions.find(session=>session.id===chat.lastActiveId);
 useEffect(()=>{if(session)chat.setLastActiveId(session.id);},[session?.id]);
 function newChat(){const id=chat.create();navigate('chat',{sessionId:id});}
 function openSession(id:ChatSessionId){chat.setLastActiveId(id);navigate('chat',{sessionId:id});}
 function send(text:string,suggestion?:string,attachments?:ChatAttachment[]){const id=chat.send(session?.id,text,suggestion,attachments);if(id&&chatId!==id)navigate('chat',{sessionId:id});}
 function titleFor(node:NavigationNode){
  if(node.id==='course')return data?.courses.find(item=>item.id===route?.params.courseId)?.title??node.title;
  if(node.id==='material')return data?.lessons.find(item=>item.id===route?.params.lessonId)?.title??node.title;
  if(node.id==='assignment')return data?.assignments.find(item=>item.id===route?.params.assignmentId)?.title??node.title;
  return node.title;
 }
 const mainChat=route?.entry.sectionId==='navigator';
 return <AppShell sessions={chat.sessions} activeSessionId={chatId} entry={route?.entry} params={route?.params??{}} title={route?titleFor(route.entry):'Страница не найдена'} titleFor={titleFor} navigate={navigate} onNewChat={newChat} actionError={workspace.actionError??chat.storageError}
   aiPanel={go=><AiNavigator session={panelSession} data={data} navigate={go} onFilesSelected={saveChatFiles} onFileOpen={downloadChatFile} onSend={(text,suggestion,attachments)=>{chat.send(panelSession?.id,text,suggestion,attachments);}} compact/>}>
   {mainChat?<div className="h-full min-h-0">{chatId&&!session?<EmptyView title="Диалог не найден" description="История хранится в текущей вкладке. Начните новый диалог."><Button onClick={newChat}>Новый диалог</Button></EmptyView>:<AiNavigator session={session} data={data} onSend={send} onFilesSelected={saveChatFiles} onFileOpen={downloadChatFile} navigate={navigate}/>}</div>:<div key={path} className="lms-workspace-column">{route?<WorkspacePages onFileOpen={downloadChatFile} id={route.entry.id} params={route.params} view={workspace.view} course={workspace.course} sessions={chat.sessions} activeSessionId={chat.lastActiveId} onSession={openSession} navigate={navigate} onAction={workspace.act} pending={workspace.pending} onRetry={()=>void workspace.reload()}/>:<EmptyView title="Страница не найдена" description="Выберите раздел в меню."/>}</div>}
 </AppShell>;
}
