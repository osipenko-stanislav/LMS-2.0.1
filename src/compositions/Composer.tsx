import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import { ArrowUp, FileText, LoaderCircle, Paperclip, Square, X, Plus, Mic, Globe, GraduationCap, Check } from 'lucide-react';
import { Button, Textarea, Popover, PopoverTrigger, PopoverContent, PopoverClose } from '../ui';
import './composer.css';
import { mockAudioTranscript } from '../content/navigator';
import { useGradientBorder } from '../vendor/linear-ui/lib/useGradientBorder';

export type ComposerStatus = 'idle' | 'sending' | 'generating' | 'error' | 'success';
export interface ComposerAttachment { id:string; name:string; previewUrl?:string; status?:'loading'|'ready'|'error'; error?:string }
export interface ComposerProps {
  value:string; onValueChange:(value:string)=>void; onSend:()=>void;
  placeholder?:string; label?:string; inputRef?:RefObject<HTMLTextAreaElement|null>;
  status?:ComposerStatus; error?:string; disabled?:boolean; onStop?:()=>void;
  suggestion?:string; onClearSuggestion?:()=>void;
  actions?:ReactNode; attachments?:ComposerAttachment[];
  onFilesSelected?:(files:File[])=>void;
  onAttach?:()=>void; onRemoveAttachment?:(id:string)=>void;
}

/** Shared controlled input; upload, transport and message history belong to its owner. */
export function Composer({value,onValueChange,onSend,placeholder,label='Сообщение навигатору',inputRef,status='idle',error,disabled=false,onStop,suggestion,onClearSuggestion,actions,attachments=[],onAttach,onFilesSelected,onRemoveAttachment}:ComposerProps){
  const internalRef=useRef<HTMLTextAreaElement>(null),field=inputRef??internalRef;
  const gradientRef=useGradientBorder<HTMLFormElement>();
  const hintId=useId(),errorId=useId();
  const [multiline,setMultiline]=useState(false);
  const [recording,setRecording]=useState(false);
  const [searchScope,setSearchScope]=useState<'web'|'lms'|null>(null);
  const [localFiles,setLocalFiles]=useState<ComposerAttachment[]>([]);
  const fileInput=useRef<HTMLInputElement>(null);
  const shownAttachments=[...attachments,...localFiles];
  const busy=status==='sending'||status==='generating';
  const canSend=!!(value.trim()||suggestion||shownAttachments.length)&&!busy&&!disabled&&!recording&&!shownAttachments.some(item=>item.status==='loading'||item.status==='error');
  const latestInput=useRef({value,onValueChange});
  useLayoutEffect(()=>{latestInput.current={value,onValueChange};},[value,onValueChange]);
  useEffect(()=>{
    if(!recording)return;
    if(disabled||busy){setRecording(false);return;}
    const timer=setTimeout(()=>{
      const {value:current,onValueChange:change}=latestInput.current;
      change(`${current}${current&&!/\s$/.test(current)?' ':''}${mockAudioTranscript}`);
      setRecording(false);
      field.current?.focus();
    },3000);
    return ()=>clearTimeout(timer);
  },[recording,disabled,busy,field]);
  useLayoutEffect(()=>{
    const node=field.current,form=node?.closest('form');if(!node||!form)return;
    function measure(){
      if(!node||!form)return;
      const controls=form.querySelector<HTMLElement>('.lms-composer-controls');
      const badge=form.querySelector<HTMLElement>('.lms-composer-suggestion');
      const probe=node.cloneNode() as HTMLTextAreaElement;
      probe.removeAttribute('id');probe.removeAttribute('aria-label');probe.setAttribute('aria-hidden','true');probe.tabIndex=-1;
      const css=getComputedStyle(form);
      const controlsWidth=controls?Array.from(controls.children).reduce((sum,item)=>sum+item.getBoundingClientRect().width,0)+parseFloat(getComputedStyle(controls).columnGap)*(controls.children.length-1):0;
      const compactWidth=form.clientWidth-parseFloat(css.paddingLeft)-parseFloat(css.paddingRight)-28-controlsWidth-16-(badge?badge.offsetWidth+8:0);
      probe.style.cssText=`position:fixed;left:-10000px;top:0;height:0;min-height:0;max-height:none;width:${Math.max(40,compactWidth)}px;visibility:hidden;`;
      probe.value=value;document.body.appendChild(probe);
      const expanded=value.includes('\n')||probe.scrollHeight>parseFloat(getComputedStyle(node).lineHeight)*1.5;
      probe.remove();setMultiline(expanded);
      node.style.height='auto';node.style.height=`${Math.min(node.scrollHeight,160)}px`;
    }
    measure();let width=form.clientWidth;
    const observer=new ResizeObserver(()=>{if(form.clientWidth!==width){width=form.clientWidth;measure();}});
    observer.observe(form);return ()=>observer.disconnect();
  },[value,field,suggestion,multiline]);
  function send(){if(!canSend)return;onSend();field.current?.focus();}
  return <form data-multiline={multiline||undefined} ref={gradientRef} data-gradient-surface="composer" aria-label="Ввод сообщения" onSubmit={event=>{event.preventDefault();send();}} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 rounded-[25px] border border-border bg-bg-primary p-2.5 shadow-xs focus-within:border-accent">
    {!!shownAttachments.length&&<ul aria-label="Вложения" className="col-span-3 flex flex-wrap gap-2 p-1">{shownAttachments.map(item=><li key={item.id} className="flex max-w-full items-center gap-2 rounded-lg bg-fill-hover p-2 text-xs">
      {item.previewUrl?<img src={item.previewUrl} alt="" className="size-9 rounded-md object-cover"/>:<FileText aria-hidden="true" className="size-4 shrink-0"/>}
      <span className="min-w-0 break-words">{item.name}{item.status==='loading'&&<span role="status"> · Загрузка</span>}{item.status==='error'&&<span className="block text-danger">{item.error??'Не удалось добавить файл'}</span>}</span>
      {(onRemoveAttachment||localFiles.some(file=>file.id===item.id))&&<Button type="button" variant="subtle" iconOnly disabled={busy||disabled} aria-label={`Убрать ${item.name}`} onClick={()=>localFiles.some(file=>file.id===item.id)?setLocalFiles(files=>files.filter(file=>file.id!==item.id)):onRemoveAttachment?.(item.id)}><X className="size-4"/></Button>}
    </li>)}</ul>}
    <input ref={fileInput} type="file" multiple className="hidden" aria-label="Выбрать файлы" onChange={event=>{const files=Array.from(event.target.files??[]);if(onFilesSelected){onFilesSelected(files);event.target.value='';return;}setLocalFiles(current=>[...current,...files.map(file=>({id:crypto.randomUUID(),name:file.name,status:'ready' as const}))]);event.target.value='';}}/>
    <Popover><PopoverTrigger asChild><Button type="button" variant="ghost" iconOnly disabled={busy||disabled||recording} aria-label="Добавить контекст" className="lms-composer-plus"><Plus className="size-4"/></Button></PopoverTrigger>
      <PopoverContent side="top" align="start" className="w-56 max-w-[calc(100vw-2rem)] p-1" aria-label="Контекст сообщения">
        <PopoverClose asChild><Button type="button" variant="ghost" className="w-full justify-start" onClick={()=>onAttach?onAttach():fileInput.current?.click()}><Paperclip className="size-4"/>Добавить файл</Button></PopoverClose>
        <PopoverClose asChild><Button type="button" variant="ghost" className="w-full justify-start" aria-pressed={searchScope==='web'} onClick={()=>setSearchScope(current=>current==='web'?null:'web')}><Globe className="size-4"/>Поиск по вебу{searchScope==='web'&&<Check className="ml-auto size-4"/>}</Button></PopoverClose>
        <PopoverClose asChild><Button type="button" variant="ghost" className="w-full justify-start" aria-pressed={searchScope==='lms'} onClick={()=>setSearchScope(current=>current==='lms'?null:'lms')}><GraduationCap className="size-4"/>Поиск по LMS{searchScope==='lms'&&<Check className="ml-auto size-4"/>}</Button></PopoverClose>
      </PopoverContent>
    </Popover>
    <div className="lms-composer-input flex min-w-0 flex-wrap items-center gap-2">
      {suggestion&&<span className="lms-composer-suggestion inline-flex h-7 max-w-full shrink-0 items-center rounded-md bg-accent/10 px-2.5 text-sm font-medium text-accent"><span className="truncate">/{suggestion}</span></span>}
    <Textarea ref={field} rows={1} aria-label={label} aria-describedby={`${hintId}${error?` ${errorId}`:''}`} aria-invalid={status==='error'||undefined} placeholder={suggestion?'':recording&&!value?'Слушаю тебя':placeholder} value={value} disabled={disabled} onChange={event=>onValueChange(event.target.value)} onBeforeInput={event=>{const type=(event.nativeEvent as InputEvent).inputType;const input=event.currentTarget;if(suggestion&&onClearSuggestion&&!busy&&!recording&&!value&&(type==='deleteContentBackward'||type==='deleteContentForward')){event.preventDefault();onClearSuggestion();}}} onKeyDown={event=>{const input=event.currentTarget;if(suggestion&&onClearSuggestion&&!busy&&!recording&&!event.nativeEvent.isComposing&&input.selectionStart===input.selectionEnd&&((event.key==='Backspace'&&input.selectionStart===0)||(event.key==='Delete'&&!value))){event.preventDefault();onClearSuggestion();return;}if(event.key==='Enter'&&!event.shiftKey&&!event.nativeEvent.isComposing&&event.keyCode!==229){event.preventDefault();send();}}} className="min-w-0 min-h-0 flex-1 basis-24 max-h-40 resize-none overflow-y-auto rounded-none border-0 bg-transparent p-0 leading-[1.4] focus:shadow-none focus-visible:shadow-none"/>
    </div>
    <div className="lms-composer-controls flex items-center justify-end gap-2"><div className="flex min-w-0 flex-wrap items-center gap-2">
      {actions}
      <span id={hintId} className="sr-only"><span>Enter — отправить</span><span>Shift+Enter — перенос</span></span>
    </div><Button type="button" variant="ghost" iconOnly disabled={busy||disabled} aria-pressed={recording} aria-label={recording?'Остановить запись':'Записать аудио'} onClick={()=>setRecording(current=>!current)} className={recording?'rounded-full bg-accent/10 text-accent hover:bg-accent/20 hover:text-accent':'rounded-full'}>{recording?<span aria-hidden="true" className="flex h-4 items-center gap-0.5">{[0,1,2].map(index=><span key={index} className="lms-composer-audio-bar h-3 w-[3px] rounded-full bg-current" style={{animationDuration:`${0.75+index*0.13}s`,animationDelay:`${-index*0.19}s`}}/>)}</span>:<Mic className="size-4"/>}</Button>{busy&&onStop?<Button type="button" iconOnly aria-label="Остановить генерацию" onClick={onStop}><Square className="size-4"/></Button>:<Button type="submit" variant="primary" iconOnly className="rounded-full disabled:bg-fill-active disabled:text-text-secondary disabled:opacity-100" aria-label={busy?'Отправка сообщения':'Отправить сообщение'} disabled={!canSend}>{busy?<LoaderCircle aria-hidden="true" className="size-4 animate-spin motion-reduce:animate-none"/>:<ArrowUp className="size-4"/>}</Button>}</div>
    {searchScope&&<div className="col-span-3 flex flex-wrap items-center gap-2 text-xs text-text-secondary">{searchScope&&<Button type="button" variant="subtle" aria-label="Убрать режим поиска" disabled={busy||disabled} onClick={()=>setSearchScope(null)}>{searchScope==='web'?<Globe className="size-4"/>:<GraduationCap className="size-4"/>}{searchScope==='web'?'Поиск по вебу':'Поиск по LMS'}<X className="size-3.5"/></Button>}</div>}
    <span role="status" className="sr-only">{status==='sending'?'Отправка сообщения':status==='generating'?'Генерация ответа':status==='success'?'Сообщение отправлено':''}</span>
    {error&&<p id={errorId} role="alert" className="col-span-3 px-2 py-1 text-xs text-danger">{error}</p>}
  </form>;
}
