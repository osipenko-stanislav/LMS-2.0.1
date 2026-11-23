import type { ChatSession } from '../core/domain/chat';
import { useRef, useState, useSyncExternalStore, type ReactNode } from 'react';
import { motion } from 'motion/react';
import type { NavigationEntry, NavigationNode, RouteParams } from '../app/navigation';
import type { Navigate } from '../app/router';
import { Dialog, DialogContent, DialogDescription, DialogTitle, SidebarInset, SidebarProvider } from '../ui';
import { useMotionSettings } from '../ui/motion';
import { AppSidebar } from './shell/AppSidebar';
import { AppHeader } from './shell/AppHeader';
const media=()=>window.matchMedia('(min-width:1024px)');
const subscribe=(fn:()=>void)=>{const query=media();query.addEventListener('change',fn);return()=>query.removeEventListener('change',fn);};
export interface AppShellProps {
  sessions?:ChatSession[];activeSessionId?:string;entry?:NavigationEntry;params:RouteParams;title:string;titleFor:(node:NavigationNode)=>string;
  navigate:Navigate;onNewChat:()=>void;children:ReactNode;aiPanel:(navigate:Navigate)=>ReactNode;actionError?:string;
}
export function AppShell({sessions,activeSessionId,entry,params,title,titleFor,navigate,onNewChat,children,aiPanel,actionError}:AppShellProps){
 const desktop=useSyncExternalStore(subscribe,()=>media().matches,()=>false);
 const [desktopOpen,setDesktopOpen]=useState(true),[mobileOpen,setMobileOpen]=useState(false),[aiOpen,setAiOpen]=useState(false);
 const aiOpener=useRef<HTMLElement|null>(null);
 const {reduced,transition}=useMotionSettings('layout');
 const expanded=desktop?desktopOpen:mobileOpen;
 const go:Navigate=(id,routeParams)=>{navigate(id,routeParams);setMobileOpen(false);setAiOpen(false);};
 const newChat=()=>{onNewChat();setMobileOpen(false);setAiOpen(false);};
 return <Dialog open={!desktop&&mobileOpen} onOpenChange={setMobileOpen}><SidebarProvider open={expanded} onOpenChange={desktop?setDesktopOpen:setMobileOpen} className="h-dvh min-h-0 overflow-hidden">
   {desktop&&<motion.div data-shell-sidebar="" initial={false} animate={{width:desktopOpen?240:52}} transition={reduced?{duration:0}:transition} className="h-full shrink-0 overflow-hidden" data-motion-level="fluid"><AppSidebar sessions={sessions} activeSessionId={activeSessionId} active={entry?.sectionId} expanded={desktopOpen} onNewChat={newChat} navigate={go}/></motion.div>}
   <SidebarInset className="min-h-0 min-w-0"><div className="flex h-full min-h-0 min-w-0 flex-col"><AppHeader title={title} ancestors={entry?.ancestors??[]} params={params} titleFor={titleFor} navigate={go} mobile={!desktop} onNewChat={newChat} onOpenAi={()=>{aiOpener.current=document.activeElement as HTMLElement;setAiOpen(true);}} isChat={entry?.sectionId==='navigator'}/>{actionError&&<p role="alert" className="border-b border-border-subtle px-5 py-2 text-xs text-danger">{actionError}</p>}<div data-page-content="" className="min-h-0 min-w-0 flex-1 overflow-auto">{children}</div></div></SidebarInset>
   {!desktop&&<DialogContent data-gradient-border="off" className="fixed inset-y-0 left-0 top-0 h-dvh w-64 max-w-[85vw] translate-x-0 translate-y-0 rounded-none border-l-0 p-0"><DialogTitle className="sr-only">Навигация</DialogTitle><DialogDescription className="sr-only">Разделы LMS</DialogDescription><AppSidebar sessions={sessions} activeSessionId={activeSessionId} active={entry?.sectionId} expanded onNewChat={newChat} navigate={go} mobile/></DialogContent>}
   <Dialog open={aiOpen} onOpenChange={setAiOpen}><DialogContent className="fixed inset-y-2 right-2 top-2 left-auto flex h-[calc(100dvh-1rem)] w-[calc(100%-1rem)] max-w-md translate-x-0 translate-y-0 flex-col gap-0 p-0" onCloseAutoFocus={event=>{event.preventDefault();aiOpener.current?.focus({preventScroll:true});}} onOpenAutoFocus={event=>{const composer=(event.currentTarget as HTMLElement).querySelector<HTMLTextAreaElement>('textarea');if(composer){event.preventDefault();composer.focus();}}}><div className="border-b border-border-subtle px-5 py-4 pr-12"><DialogTitle>AI Navigator</DialogTitle><DialogDescription>Локальные демонстрационные ответы</DialogDescription></div><div className="min-h-0 flex-1">{aiPanel(go)}</div></DialogContent></Dialog>
 </SidebarProvider></Dialog>;
}
