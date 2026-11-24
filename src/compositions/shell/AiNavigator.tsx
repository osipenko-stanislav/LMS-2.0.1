import { NavigatorWidgets, VisibilitySettings } from './NavigatorWidgets';
import { useNavigatorPreferences } from '../../app/useNavigatorPreferences';
import { useEffect, useRef, useState } from 'react';
import { BookOpen, FileText } from 'lucide-react';
import { Composer } from '../Composer';
import type { ChatSession, ChatAttachment } from '../../core/domain/chat';
import type { WorkspaceViewModel } from '../../core/workspace-contracts';
import { navigatorCopy } from '../../content/navigator';
import { Button, Thinking } from '../../ui';
import { CourseCard } from '../../features/courses/CourseCards';
import type { Navigate } from '../../app/router';
export interface NavigatorProps { session?:ChatSession; data?:WorkspaceViewModel; onSend:(text:string,suggestion?:string,attachments?:ChatAttachment[])=>void; onFilesSelected?:(files:File[])=>Promise<ChatAttachment[]>; onFileOpen?:(file:ChatAttachment)=>Promise<void>; navigate:Navigate; compact?:boolean }
export function AiNavigator({session,data,onSend,onFilesSelected,onFileOpen,navigate,compact=false}:NavigatorProps){
  const {hidden,toggle}=useNavigatorPreferences();
  const [draft,setDraft]=useState('');
  const [attachments,setAttachments]=useState<ChatAttachment[]>([]);
  const [fileError,setFileError]=useState<string>();
  const [uploading,setUploading]=useState(false);
  const attachmentGeneration=useRef(0);
  async function addFiles(files:File[]){if(!onFilesSelected||!files.length)return;const generation=attachmentGeneration.current;setUploading(true);setFileError(undefined);try{const added=await onFilesSelected(files);if(generation===attachmentGeneration.current)setAttachments(current=>[...current,...added]);}catch(error){if(generation===attachmentGeneration.current)setFileError(error instanceof Error?error.message:'Не удалось добавить файлы.');}finally{if(generation===attachmentGeneration.current)setUploading(false);}}
  const [suggestion,setSuggestion]=useState<string>();
  const scroll=useRef<HTMLDivElement>(null),composer=useRef<HTMLTextAreaElement>(null);
  const nearBottom=useRef(true);
  const requestedReply=useRef(false);
  const [presentation,setPresentation]=useState<{id:string;count:number}|null>(null);
  useEffect(()=>{
    if(!requestedReply.current)return;
    const reply=session?.messages.at(-1);
    if(reply?.role!=='assistant')return;
    requestedReply.current=false;setPresentation({id:reply.id,count:0});
  },[session?.messages]);
  useEffect(()=>{
    if(!presentation)return;
    const reply=session?.messages.find(message=>message.id===presentation.id);
    if(!reply){setPresentation(null);return;}
    const timer=setTimeout(()=>setPresentation(current=>current&&current.id===reply.id?(current.count>=reply.text.length?null:{...current,count:Math.min(reply.text.length,current.count+8)}):current),presentation.count===0?400:25);
    return()=>clearTimeout(timer);
  },[presentation,session?.messages]);
  useEffect(()=>{setDraft('');setSuggestion(undefined);setAttachments([]);setFileError(undefined);setUploading(false);attachmentGeneration.current++;nearBottom.current=true;},[session?.id]);
  useEffect(()=>{if(nearBottom.current&&scroll.current)scroll.current.scrollTop=scroll.current.scrollHeight;},[session?.messages.length,session?.id]);
  function send(){const text=[suggestion,draft.trim()].filter(Boolean).join(' ');if((!text&&!attachments.length)||uploading)return;nearBottom.current=true;requestedReply.current=true;setPresentation(null);onSend(text,suggestion,attachments);setAttachments([]);setDraft('');setSuggestion(undefined);composer.current?.focus();}
  const home=!session?.messages.length&&!compact;
  return <section aria-label="AI Navigator" data-navigator-home={home || undefined} className="flex h-full min-h-0 min-w-0 flex-col">
    {home&&<NavigatorWidgets data={data} navigate={navigate} hidden={hidden.widgets} onToggle={item=>toggle('widgets',item)}/>}
    <div ref={scroll} className={home?"hidden":"lms-ai-history"} onScroll={event=>{const el=event.currentTarget;nearBottom.current=el.scrollHeight-el.scrollTop-el.clientHeight<100;}}>
      <div className="lms-ai-column">
        {!session?.messages.length?null:<div role="log" aria-label="Сообщения диалога" aria-live="polite" aria-relevant="additions" className="flex flex-col gap-7 pb-6">{session.messages.map(message=>{const isStreaming=presentation?.id===message.id;const text=isStreaming?message.text.slice(0,presentation!.count):message.text;return <article key={message.id} aria-label={message.role==='user'?'Ваше сообщение':'Ответ навигатора'} className={message.role==='user'?'ml-8 self-end rounded-3xl bg-accent-subtle px-4 py-3 text-text-primary':'w-full'}>{isStreaming&&presentation!.count===0?<Thinking/>:<p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{message.role==='user'&&message.suggestion&&message.text.startsWith(message.suggestion)?<><span className="font-medium text-accent"><BookOpen aria-hidden="true" className="mr-1.5 inline-block size-4 align-text-bottom"/>{message.suggestion}</span>{message.text.slice(message.suggestion.length)?' ':''}{message.text.slice(message.suggestion.length).trimStart()}</>:text}</p>}{!isStreaming&&message.blocks.map(block=>{const course=data?.courses.find(course=>course.id===block.courseId);return course?<div key={block.courseId} className="mt-4"><CourseCard course={course} onOpen={()=>navigate('course',{courseId:course.id})}/></div>:null;})}</article>})}</div>}
      </div>
    </div>
    <div className="lms-ai-composer"><div className="lms-ai-column">{home&&<h2 className="mb-7 text-center text-3xl font-semibold tracking-tight">{navigatorCopy.emptyTitle}</h2>}<Composer attachments={attachments} onFilesSelected={addFiles} onRemoveAttachment={id=>setAttachments(current=>current.filter(file=>file.id!==id))} disabled={uploading} error={fileError} suggestion={suggestion} onClearSuggestion={()=>setSuggestion(undefined)} value={draft} onValueChange={setDraft} onSend={send} inputRef={composer} placeholder={navigatorCopy.placeholder}/><div className={home?"mt-4 flex flex-wrap justify-center gap-2":"mt-2 flex flex-wrap justify-center gap-1.5 px-1 pb-1"}>{navigatorCopy.suggestions.filter(item=>!hidden.suggestions.includes(item)).map(suggestion=><Button key={suggestion} type="button" variant="subtle" onClick={()=>{setSuggestion(suggestion);composer.current?.focus();}}>{suggestion}</Button>)}<VisibilitySettings title="Настроить садджесты" items={navigatorCopy.suggestions} hidden={hidden.suggestions} onToggle={item=>toggle('suggestions',item)}/></div></div></div>
  </section>;
}
