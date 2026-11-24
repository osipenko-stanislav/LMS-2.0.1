import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { Button, Input, Label, Select, Slider } from '../../ui';
import { MotionProvider, motionPresets, type MotionPhysics } from '../../ui/motion';
import { OverlayDemo, SelectionDemo, ExpandDemo, LayoutDemo, FeedbackDemo } from './Patterns';
import { ThinkingDemo, StreamingReplyDemo, TaskRowsDemo, ApprovalDemo, AnimatedComposerDemo, JellySliderDemo, ToastDemo, StaggerListDemo, ContextCardsDemo } from './Labs';

export const patterns = {
  overlay: { title: 'Overlay', description: 'Origin-aware springs for Dropdown, Popover and Dialog. Radix continues to own positioning, dismissal and focus.', Component: OverlayDemo },
  selection: { title: 'Selection', description: 'A shared tab underline, a travelling segmented pill and a spring-driven switch thumb.', Component: SelectionDemo },
  expand: { title: 'Expand / Collapse', description: 'Natural content height, reversible springs and sections that stay out of the focus order while collapsed.', Component: ExpandDemo },
  layout: { title: 'Layout Transition', description: 'Preserved element identity as rows reorder and containers alternate between compact and expanded geometry.', Component: LayoutDemo },
  feedback: { title: 'Feedback', description: 'A restrained press response, interruptible confirmation and a clean return to the initial state.', Component: FeedbackDemo },
  thinking: { title: 'Thinking', description: 'A multi-stage AI state with restartable progress and reduced-motion-safe feedback.', Component: ThinkingDemo },
  streaming: { title: 'Streaming Reply', description: 'Interruptible token arrival with a restrained cursor and replay control.', Component: StreamingReplyDemo },
  taskRows: { title: 'Task Rows', description: 'Agent work represented as expandable, reversible rows.', Component: TaskRowsDemo },
  approval: { title: 'Approval Card', description: 'A compact human-in-the-loop confirmation with a morphing success state.', Component: ApprovalDemo },
  animatedComposer: { title: 'Animated Composer', description: 'Action affordance morphs with the input state while the field remains stable.', Component: AnimatedComposerDemo },
  jellySlider: { title: 'Jelly Slider', description: 'A control value responds with a compact elastic confirmation.', Component: JellySliderDemo },
  toast: { title: 'Animated Toast', description: 'Interruptible enter and exit for a transient confirmation.', Component: ToastDemo },
  staggerList: { title: 'Animated List Reorder', description: 'Stable item identity and layout projection during reorder.', Component: StaggerListDemo },
  contextCards: { title: 'Context Cards', description: 'Source cards preserve identity while the context set changes.', Component: ContextCardsDemo },
};
export interface GalleryProps extends MotionPhysics { pattern: keyof typeof patterns }
export function MotionGallery({ pattern, stiffness, damping, mass }: GalleryProps) {
  const systemReduced = useReducedMotion();
  const [physics, setPhysics] = useState({stiffness,damping,mass});
  const [iteration, setIteration] = useState(0);
  useEffect(() => setPhysics({stiffness,damping,mass}), [stiffness,damping,mass]);
  const { title, description, Component } = patterns[pattern];
  return <main className="min-h-dvh overflow-x-hidden bg-bg-primary px-5 py-10 sm:px-8" data-motion-gallery={pattern}>
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-semibold">{title}</h1><p className="mt-2 max-w-2xl text-sm text-text-secondary">{description}</p>
      <section aria-label="Physics controls" className="mt-7 border-y border-border-subtle py-5">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-3"><h2 className="text-sm font-medium">Physics</h2><Select aria-label="Physics preset" value={Object.entries(motionPresets).find(([, value])=>value.stiffness === physics.stiffness && value.damping === physics.damping && value.mass === physics.mass)?.[0] ?? ""} placeholder="Custom physics" options={Object.keys(motionPresets).map(value=>({value,label:value}))} onValueChange={value => setPhysics(motionPresets[value as keyof typeof motionPresets])} /></div><Button variant="ghost" onClick={()=>setIteration(value=>value+1)}>Reset examples</Button></div>
        <div className="grid gap-6 sm:grid-cols-3">{([
          {name:'stiffness',label:'Stiffness',min:150,max:800,step:10},
          {name:'damping',label:'Damping',min:20,max:60,step:1},
          {name:'mass',label:'Mass',min:0.5,max:1.5,step:0.1},
        ] as const).map(control=><div key={control.name} className="flex flex-col gap-3"><div className="flex items-center justify-between gap-2"><Label htmlFor={`physics-${control.name}`}>{control.label}</Label><Input id={`physics-${control.name}`} type="number" className="w-20" min={control.min} max={control.max} step={control.step} value={physics[control.name]} onChange={event=>{const value=event.target.valueAsNumber;if(Number.isFinite(value))setPhysics(current=>({...current,[control.name]:Math.max(control.min,Math.min(control.max,value))}));}} /></div><Slider aria-label={`${control.label} slider`} value={[physics[control.name]]} min={control.min} max={control.max} step={control.step} onValueChange={([value])=>setPhysics(current=>({...current,[control.name]:value!}))}/></div>)}</div>
        <p className="mt-4 text-xs text-text-secondary">Base physics are shared; each pattern calibrates its response. {systemReduced ? 'Reduced Motion is active: spatial animations are disabled.' : 'Reduced Motion follows your system.'} Keyboard actions settle immediately.</p>
      </section>
      <div className="mt-8 grid items-start gap-8 md:grid-cols-2" key={iteration}>
        <section aria-label="Original Linear UI"><h2 className="mb-5 text-sm font-semibold">Original Linear UI</h2><MotionProvider enabled={false}><Component /></MotionProvider></section>
        <section aria-label="With motion" data-lms-motion-scope=""><h2 className="mb-5 text-sm font-semibold">With motion</h2><MotionProvider physics={physics}><Component /></MotionProvider></section>
      </div>
    </div>
  </main>;
}
