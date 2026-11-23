import { useState } from 'react';
import { BookOpen, BookOpenText, BriefcaseBusiness, CalendarDays, ChevronRight, GraduationCap, Layers, MessageSquare, Settings, Target, Megaphone } from 'lucide-react';
import { navigationEntries, sidebarSections, pathFor, type NavigationId } from '../../app/navigation';
import type { ChatSession } from '../../core/domain/chat';
import type { Navigate } from '../../app/router';
import { ExpandRegion } from '../../ui/motion';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../../ui';
export function AppSidebar({active,expanded,onNewChat,navigate,mobile=false,sessions=[],activeSessionId}:{active?:NavigationId;expanded:boolean;onNewChat:()=>void;navigate:Navigate;mobile?:boolean;sessions?:ChatSession[];activeSessionId?:string}){
 const [groups,setGroups]=useState<Record<string,boolean>>({Обучение:true});
 return <Sidebar collapsible={mobile?'none':'icon'} className="h-full w-full gap-0 p-2 transition-none" aria-label="Боковое меню">
 <SidebarHeader className="mb-6"><div className="flex h-9 items-center gap-2 overflow-hidden px-2"><GraduationCap className="size-5 shrink-0"/>{expanded&&<span className="text-sm font-semibold">LMS 2.0.1</span>}</div></SidebarHeader>
 <SidebarContent><nav aria-label="Основная навигация"><SidebarMenu>{sidebarSections.map((section,index)=>{
 const children:NavigationId[]|undefined='children' in section?section.children:undefined;
 const item='id' in section?navigationEntries.find(n=>n.id===section.id):undefined;
 const Icon=item?.icon??(section.title==='Карьера'?BriefcaseBusiness:section.title==='Сервисы'?Layers:section.title==='События'?Megaphone:section.title==='Хэндбук'?BookOpenText:section.title==='Мои цели'?Target:section.title==='Расписание'?CalendarDays:BookOpen);
 const selected=children?.includes(active!)||(!!item&&active===item.id);
 const row=<SidebarMenuButton tooltip={section.title} isActive={selected} aria-label={section.title} aria-expanded={children?!!groups[section.title]:undefined} onClick={()=>!children&&(item?.id==='navigator'?onNewChat():item&&navigate(item.id))}><Icon className="size-4"/><span className={expanded?'flex-1':'sr-only'}>{section.title}</span>{expanded&&children&&<ChevronRight className={groups[section.title]?'size-4 rotate-90':'size-4'}/>}</SidebarMenuButton>;
 return <SidebarMenuItem key={section.title}>{expanded&&(index===0||section.group!==sidebarSections[index-1]?.group)&&<div className="px-2 pb-1 pt-3 text-2xs font-semibold uppercase tracking-wider text-text-tertiary">{section.group}</div>}{children?<><div onClick={()=>setGroups(current=>({...current,[section.title]:!current[section.title]}))}>{row}</div><ExpandRegion open={expanded&&!!groups[section.title]}><ul className="ml-5 space-y-0.5 py-1">{children.map(id=>{const child=navigationEntries.find(n=>n.id===id)!;return <li key={id}><SidebarMenuButton asChild isActive={active===id}><a href={'#'+pathFor(id)} onClick={event=>{if(event.metaKey||event.ctrlKey)return;event.preventDefault();navigate(id);}} aria-current={active===id?'page':undefined}>{id==='assignments'?'Домашки':id==='grades'?'Ведомости':child.title}</a></SidebarMenuButton></li>;})}</ul></ExpandRegion></>:row}
 {item?.id==='history'&&expanded&&sessions.some(session=>session.messages.length)&&<ul className="ml-5 space-y-0.5 py-1" aria-label="Диалоги">{sessions.filter(s=>s.messages.length).map(s=><li key={s.id}><SidebarMenuButton asChild isActive={s.id===activeSessionId}><a href={'#'+pathFor('chat',{sessionId:s.id})} onClick={event=>{event.preventDefault();navigate('chat',{sessionId:s.id});}}><MessageSquare className="size-3.5"/><span className="truncate">{s.title}</span></a></SidebarMenuButton></li>)}</ul>}
 </SidebarMenuItem>;
 })}</SidebarMenu></nav></SidebarContent>
 <SidebarFooter><SidebarMenuButton onClick={()=>navigate('settings')} aria-label="Настройки"><Settings className="size-4"/>{expanded&&'Настройки'}</SidebarMenuButton></SidebarFooter>
 </Sidebar>;
}
