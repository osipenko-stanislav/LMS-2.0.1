import { useEffect, useState } from 'react';
import type { RouteParams } from '../../app/navigation';
import type { Navigate } from '../../app/router';
import { PageIntro } from '../../compositions/shell/SharedViews';
import { handbookAncestors, handbookChildren, handbookPages, handbookRoot, loadHandbookContent, type HandbookNode } from '../../data/handbook';
function HandbookContent({node}:{node:HandbookNode}){
  if(node.type==='text') return <>{node.text}</>;
  const children=node.content?.map((child,index)=><HandbookContent key={index} node={child}/>);
  if(node.type==='heading') return <h2 className="mt-8 text-xl font-semibold tracking-tight">{children}</h2>;
  if(node.type==='paragraph') return <p className="mt-4 text-sm leading-7 text-text-secondary">{children}</p>;
  if(node.type==='bulletList') return <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-text-secondary">{children}</ul>;
  if(node.type==='listItem') return <li>{children}</li>;
  if(node.type==='hardBreak') return <br/>;
  return <>{children}</>;
}
export function HandbookPageView({params,navigate}:{params:RouteParams;navigate:Navigate}){
  const [selected,setSelected]=useState(params.handbookId ?? handbookRoot?.id ?? '');
  const [content,setContent]=useState<{content?:HandbookNode[]}>();
  useEffect(()=>{let active=true;void loadHandbookContent(selected).then(value=>{if(active)setContent(value)}).catch(()=>{if(active)setContent(undefined)});return()=>{active=false}},[selected]);
  const page=handbookPages.find(item=>item.id===selected) ?? handbookRoot;
  const children=page?handbookChildren(page.id):[];
  return <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,768px)]">
    <aside className="rounded-xl bg-surface-panel p-3 lg:sticky lg:top-4 lg:self-start"><p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-text-tertiary">Хэндбук</p><nav aria-label="Навигация по хэндбуку" className="space-y-1">{(page ? handbookAncestors(page.id)[0] ? [handbookAncestors(page.id)[0], ...handbookChildren(handbookAncestors(page.id)[0]!.id)] : [] : []).map(item=><button key={item.id} type="button" aria-current={item.id===page?.id?'page':undefined} className="block w-full rounded-md px-2 py-2 text-left text-sm transition-colors hover:bg-fill-hover aria-[current=page]:bg-fill-hover aria-[current=page]:font-medium" onClick={()=>setSelected(item.id)}>{item.title}</button>)}{children.map(item=><button key={item.id} type="button" className="block w-full rounded-md px-2 py-2 text-left text-sm text-text-secondary transition-colors hover:bg-fill-hover" onClick={()=>setSelected(item.id)}>{item.title}</button>)}</nav></aside>
    <article className="lms-reading-column"><PageIntro description="Материалы и правила Центрального университета."/><h1 className="text-3xl font-semibold tracking-tight">{page?.title ?? 'Хэндбук'}</h1>{page?.summary&&<p className="mt-4 text-sm leading-7 text-text-secondary">{page.summary}</p>}<div className="mt-6">{content?.content?.map((node,index)=><HandbookContent key={index} node={node}/>)}</div>{children.length>0&&<div className="mt-10 pt-6"><h2 className="text-sm font-semibold">Разделы</h2><div className="mt-3 grid gap-2 sm:grid-cols-2">{children.map(item=><button key={item.id} type="button" className="rounded-lg bg-fill-secondary p-3 text-left text-sm hover:bg-fill-hover" onClick={()=>setSelected(item.id)}>{item.title}</button>)}</div></div>}</article>
  </div>;
}

