import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, LayoutGroup, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight, Check, ChevronDown, House, TreePine, X } from 'lucide-react';
import { Button } from '../../ui';
import { MotionProvider, useMotionSettings, type MotionPhysics } from '../../ui/motion';

import { expressiveFixtures as fixtures } from './expressive-fixtures';

export function ExpressiveFrame({ title, description, physics, children }: { title: string; description: string; physics: MotionPhysics; children: ReactNode }) {
  return <MotionProvider physics={physics}><main className="min-h-dvh bg-bg-primary px-5 py-10 sm:px-8"><div className="mx-auto max-w-3xl"><h1 className="text-2xl font-semibold">{title}</h1><p className="mt-2 max-w-xl text-sm text-text-secondary">{description}</p><div className="mt-8">{children}</div><p className="mt-6 text-xs text-text-secondary">Use the theme toolbar and physics controls in Storybook. Repeated actions retarget the movement. Reduced Motion removes spatial transforms.</p></div></main></MotionProvider>;
}

export function MorphingDropdownDemo() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('In progress');
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const options = useRef<(HTMLButtonElement | null)[]>([]);
  const menuId = useId();
  const reduced = useReducedMotion() ?? false;
  const { transition } = useMotionSettings('overlay');
  const spatial = reduced ? { duration: 0 } : transition;
  function close(restore = true) { setOpen(false); if (restore) trigger.current?.focus({ preventScroll: true }); }
  useLayoutEffect(() => { if (open) options.current[fixtures.statuses.indexOf(value)]?.focus({preventScroll:true}); }, [open, value]);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) close(false); };
    document.addEventListener('pointerdown',outside);
    return () => document.removeEventListener('pointerdown',outside);
  }, [open]);
  return <div className="grid min-h-96 place-items-center overflow-hidden rounded-xl border border-border-subtle bg-surface-app p-5">
    <motion.div ref={root} data-expressive-surface="dropdown" initial={false}
      animate={{ width: open ? 272 : 172, height: open ? 236 : 40, y: open && !reduced ? -8 : 0, borderRadius: open ? 'var(--radius-xl)' : 'var(--radius-md)' }} transition={spatial}
      className="relative max-w-full overflow-hidden border border-border bg-bg-elevated shadow-popover"
      onBlur={event => { if (open && !event.currentTarget.contains(event.relatedTarget as Node)) close(false); }}
      onKeyDown={event => {
        if (event.key === 'Escape') {event.preventDefault(); close();}
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'Home' || event.key === 'End') {
          event.preventDefault();
          if (!open) {setOpen(true);return;}
          const current=options.current.findIndex(option=>option===document.activeElement);
          const next=event.key==='Home'?0:event.key==='End'?3:(current+(event.key==='ArrowDown'?1:3))%4;
          options.current[next]?.focus();
        }
      }}>
      <Button ref={trigger} variant="ghost" aria-haspopup="menu" aria-expanded={open} aria-controls={open ? menuId : undefined}
        className="absolute inset-x-0 top-0 h-10 w-full justify-between rounded-none px-3 text-text-primary" onClick={()=>open?close():setOpen(true)}>
        <span className="inline-flex items-center gap-2"><span className="size-2 rounded-full bg-accent" />{value}</span>
        <motion.span animate={{rotate:open?180:0}} transition={spatial}><ChevronDown className="size-4" /></motion.span>
      </Button>
      <motion.div id={menuId} role="menu" aria-label="Project status" aria-hidden={!open} inert={!open} initial={false}
        animate={{opacity:open?1:0,y:open||reduced?0:10}} transition={reduced?{duration:0}:{...transition,opacity:{duration:open?.14:.08,delay:open?.06:0}}} className="absolute inset-x-0 top-10 p-2">
        <p className="px-2 pb-2 pt-1 text-xs text-text-tertiary">Change status</p>
        {fixtures.statuses.map((option,index)=><motion.button key={option} ref={node=>{options.current[index]=node;}} role="menuitemradio" aria-checked={value===option} tabIndex={-1}
          animate={{opacity:open?1:0,x:open||reduced?0:-8}} transition={reduced?{duration:0}:{...transition,delay:open?index*.025:0}}
          className="flex h-9 w-full items-center justify-between rounded-md px-2 text-left text-sm hover:bg-fill-hover focus:bg-fill-hover focus:outline-none focus:shadow-none"
          onClick={()=>{setValue(option);close();}}>{option}{value===option&&<Check className="size-4 text-accent" />}</motion.button>)}
      </motion.div>
    </motion.div>
  </div>;
}

export function ExpandableCardDemo() {
  const [selected,setSelected]=useState<string|null>(null);
  const roots=useRef<Record<string,HTMLDivElement|null>>({});
  const closeRef=useRef<HTMLButtonElement>(null);
  const group=useId();
  const reduced=useReducedMotion()??false;
  const {transition}=useMotionSettings('layout');
  const spring=reduced?{duration:0}:transition;
  function close() {const id=selected;setSelected(null);if(id)roots.current[id]?.focus({preventScroll:true});}
  useLayoutEffect(()=>{
    Object.entries(roots.current).forEach(([id,node])=>{
      if(!node)return;
      node.inert=!!selected&&selected!==id;
      const details=node.querySelector<HTMLElement>('[data-card-details]');
      if(details){details.inert=selected!==id;details.setAttribute('aria-hidden',String(selected!==id));}
    });
    if(selected)closeRef.current?.focus({preventScroll:true});
  },[selected]);
  return <LayoutGroup id={group}><div className="min-h-[430px] rounded-xl border border-border-subtle bg-surface-app p-4 sm:p-6">
    <motion.div layout={!reduced} transition={spring} className="relative flex flex-col gap-3">
      <AnimatePresence initial={false} mode="popLayout">{fixtures.stays.filter(stay=>!selected||stay.id===selected).map(stay=>{
        const expanded=selected===stay.id;
        const Icon=stay.id==='atlas'?House:TreePine;
        return <motion.div key={stay.id} ref={node=>{roots.current[stay.id]=node;}} layout={!reduced} layoutId={reduced?undefined:`surface-${stay.id}`} transition={spring}
          initial={false} animate={{opacity:1,scale:1,y:0}} exit={reduced?{opacity:0}:{opacity:0,scale:.96,y:14}}
          role={expanded?'region':'button'} aria-label={stay.title} tabIndex={expanded?-1:0} data-expressive-card={stay.id} data-expanded={expanded}
          className={`relative overflow-hidden rounded-xl border border-border bg-bg-elevated p-3 shadow-xs ${expanded?'':'cursor-pointer hover:bg-control-hover'}`}
          onClick={()=>{if(!expanded)setSelected(stay.id);}}
          onKeyDown={event=>{if(event.key==='Escape'){event.preventDefault();close();}else if(!expanded&&(event.key==='Enter'||event.key===' ')){event.preventDefault();setSelected(stay.id);}}}>
          <motion.div layout={!reduced} transition={spring} className={expanded?'flex flex-col gap-4':'flex items-center gap-3'}>
            <motion.div layout={!reduced} layoutId={reduced?undefined:`image-${stay.id}`} transition={spring}
              className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-accent-subtle text-accent ${expanded?'h-36 w-full':'size-14'}`}>
              <motion.div layout={!reduced} transition={spring}><Icon strokeWidth={1.4} className={expanded?'size-20':'size-8'} /></motion.div>
              {expanded&&<span className="absolute bottom-3 left-3 text-xs text-accent-subtle-text">{stay.meta.split(' · ')[0]}</span>}
            </motion.div>
            <motion.div layout="position" transition={spring} className="flex min-w-0 flex-1 items-start justify-between gap-3">
              <div><motion.h2 layout={!reduced} layoutId={reduced?undefined:`title-${stay.id}`} transition={spring} className={expanded?'text-xl font-semibold':'text-sm font-medium'}>{stay.title}</motion.h2><motion.p layout="position" transition={spring} className="mt-1 text-xs text-text-secondary">{stay.meta}</motion.p></div>
              <motion.span layout={!reduced} layoutId={reduced?undefined:`price-${stay.id}`} transition={spring} className={expanded?'text-lg font-semibold':'text-sm font-medium'}>{stay.price}</motion.span>
            </motion.div>
          </motion.div>
          <AnimatePresence initial={false}>{expanded&&<motion.div key="details" data-card-details="" initial={reduced?false:{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:reduced?0:6}} transition={reduced?{duration:0}:{...transition,opacity:{duration:.14,delay:.08}}}>
            <p className="mt-5 text-sm leading-relaxed text-text-secondary">{stay.detail}</p><div className="mt-5 flex items-center justify-between gap-3"><Button ref={closeRef} variant="ghost" onClick={event=>{event.stopPropagation();close();}}><X className="size-4" />Close</Button><Button variant="primary" onClick={event=>{event.stopPropagation();close();}}>Back to stays<ArrowUpRight className="size-4" /></Button></div>
          </motion.div>}</AnimatePresence>
        </motion.div>;
      })}</AnimatePresence>
    </motion.div>
  </div></LayoutGroup>;
}

export function ElasticSelectionDemo() {
  const options=['Overview','Projects','Team','Settings'];
  const [active,setActive]=useState(0);
  const [direction,setDirection]=useState(1);
  const refs=useRef<(HTMLButtonElement|null)[]>([]);
  const bar=useRef<HTMLDivElement>(null);
  const immediate=useRef(true);
  const id=useId();
  const reduced=useReducedMotion()??false;
  const {transition}=useMotionSettings('selection');
  const physics=transition as Partial<MotionPhysics>;
  const stiffness=physics.stiffness??380,damping=physics.damping??32,mass=physics.mass??1;
  const leftTarget=useMotionValue(0),rightTarget=useMotionValue(0);
  const left=useSpring(leftTarget,{stiffness:stiffness*(direction>0?.45:1.65),damping:damping*(direction>0?.65:1.2),mass});
  const right=useSpring(rightTarget,{stiffness:stiffness*(direction>0?1.65:.45),damping:damping*(direction>0?1.2:.65),mass});
  const width=useTransform([left,right],([a,b])=>Math.max(0,Number(b)-Number(a)));
  useLayoutEffect(()=>{
    function measure(){const node=refs.current[active];if(!node)return;const a=node.offsetLeft,b=a+node.offsetWidth;leftTarget.set(a);rightTarget.set(b);if(reduced||immediate.current){left.jump(a);right.jump(b);}immediate.current=false;}
    measure();let lastWidth=bar.current?.clientWidth;const observer=new ResizeObserver(()=>{const next=bar.current?.clientWidth;if(next!==lastWidth){lastWidth=next;immediate.current=true;measure();}});if(bar.current)observer.observe(bar.current);return()=>observer.disconnect();
  },[active,reduced,left,right,leftTarget,rightTarget,direction]);
  function pick(index:number,keyboard=false){immediate.current=keyboard;setDirection(index>active?1:-1);setActive(index);if(keyboard)refs.current[index]?.focus();}
  return <div className="flex min-h-80 flex-col items-center justify-center rounded-xl border border-border-subtle bg-surface-app p-4 sm:p-6">
    <div ref={bar} role="tablist" aria-label="Elastic selection" className="relative flex w-full max-w-md gap-1 rounded-lg border border-border bg-bg-tertiary p-1">
      <motion.span data-elastic-indicator="" aria-hidden="true" className="pointer-events-none absolute bottom-1 top-1 rounded-md bg-bg-primary shadow-xs ring-1 ring-border-strong/60" style={{left,width}} />
      {options.map((option,index)=><button ref={node=>{refs.current[index]=node;}} key={option} role="tab" id={`${id}-${index}`} aria-selected={active===index} aria-controls={`${id}-panel`} tabIndex={active===index?0:-1}
        className={`relative z-10 flex h-9 min-w-0 flex-1 items-center justify-center rounded-md px-1 text-xs font-medium sm:text-sm ${active===index?'text-text-primary':'text-text-secondary'}`}
        onClick={()=>pick(index)} onKeyDown={event=>{let next=index;if(event.key==='ArrowRight')next=(index+1)%4;else if(event.key==='ArrowLeft')next=(index+3)%4;else if(event.key==='Home')next=0;else if(event.key==='End')next=3;else return;event.preventDefault();pick(next,true);}}>{option}</button>)}
    </div>
    <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-${active}`} className="mt-7 text-center"><p className="text-sm font-medium">{options[active]}</p><p className="mt-2 max-w-sm text-xs text-text-secondary">The leading edge travels first. The trailing edge catches up, restoring the pill. Reverse direction before it settles.</p></div>
  </div>;
}
