import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Copy, GripVertical, Maximize2, MoreHorizontal, Save } from 'lucide-react';
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger, Badge, Button,
  Collapsible, CollapsibleContent, CollapsibleTrigger,
  Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
  Input, Item, ItemContent, ItemDescription, ItemMedia, ItemTitle, Label,
  Popover, PopoverContent, PopoverTrigger, SegmentedControl, Switch,
  Tabs, TabsContent, TabsList, TabsTrigger,
} from '../../ui';
import { LayoutRegion, useMotionSettings } from '../../ui/motion';
import { motionDemoFixtures as fixtures } from './fixtures';

export function OverlayDemo() {
  const noteId = useId();
  const titleId = useId();
  const [picked, setPicked] = useState('No action selected');
  return <div className="flex flex-col gap-6">
    <div className="flex flex-wrap gap-2">
      <DropdownMenu><DropdownMenuTrigger asChild><Button><MoreHorizontal />Dropdown</Button></DropdownMenuTrigger>
        <DropdownMenuContent><DropdownMenuItem onSelect={() => setPicked('Link copied')} icon={<Copy />}>Copy link</DropdownMenuItem><DropdownMenuItem disabled>Unavailable</DropdownMenuItem></DropdownMenuContent>
      </DropdownMenu>
      <Popover><PopoverTrigger asChild><Button>Popover</Button></PopoverTrigger>
        <PopoverContent className="max-w-[calc(100vw-2rem)]" align="start"><div className="flex flex-col gap-3"><Label htmlFor={noteId}>Note</Label><Input id={noteId} placeholder="Type a note…" /><p className="text-xs text-text-secondary">Press Escape or click outside to close.</p></div></PopoverContent>
      </Popover>
      <Dialog><DialogTrigger asChild><Button>Dialog</Button></DialogTrigger>
        <DialogContent><DialogHeader><DialogTitle>Preview changes</DialogTitle><DialogDescription>A motion study using the existing Linear UI dialog.</DialogDescription></DialogHeader>
          <Label htmlFor={titleId}>Title</Label><Input id={titleId} defaultValue="Motion study" className="mt-2" />
          <DialogFooter><DialogClose asChild><Button>Cancel</Button></DialogClose><DialogClose asChild><Button variant="primary" onClick={() => setPicked('Changes confirmed')}>Confirm</Button></DialogClose></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    <p role="status" className="text-xs text-text-secondary">{picked}</p>
    <p className="text-xs text-text-secondary">Open, dismiss and reopen. Dropdown selection and dialog confirmation keep their original handlers.</p>
  </div>;
}

export function SelectionDemo() {
  const [tab, setTab] = useState('overview');
  const [view, setView] = useState('list');
  const [checked, setChecked] = useState(false);
  return <div className="flex flex-col gap-7">
    <Tabs value={tab} onValueChange={setTab}>
      <TabsList aria-label="Preview tabs"><TabsTrigger value="overview">Overview</TabsTrigger><TabsTrigger value="activity">Activity</TabsTrigger><TabsTrigger value="files">Files</TabsTrigger></TabsList>
      <TabsContent value="overview"><p className="text-sm text-text-secondary">A shared indicator follows the selected tab.</p></TabsContent>
      <TabsContent value="activity"><p className="text-sm text-text-secondary">Change direction before the spring settles.</p></TabsContent>
      <TabsContent value="files"><p className="text-sm text-text-secondary">Arrow keys retain native Radix navigation.</p></TabsContent>
    </Tabs>
    <div><p className="mb-3 text-xs text-text-secondary">View mode</p><SegmentedControl aria-label="View mode" value={view} onValueChange={setView} items={[{value:'list', label:'List'}, {value:'board',label:'Board'}, {value:'timeline',label:'Timeline'}]} /></div>
    <Switch checked={checked} onChange={e => setChecked(e.target.checked)} label="Show details" />
  </div>;
}

export function ExpandDemo() {
  const [extra, setExtra] = useState(false);
  const [paragraph, setParagraph] = useState(false);
  return <div className="flex flex-col gap-6">
    <Accordion type="single" collapsible>
      <AccordionItem value="details"><AccordionTrigger>Details</AccordionTrigger><AccordionContent><p>{fixtures.details}</p><Button size="sm" className="mt-3" onClick={() => setParagraph(value => !value)}>Change content</Button>{paragraph && <p className="mt-3">An extra paragraph changes the natural height without a fixed maximum.</p>}</AccordionContent></AccordionItem>
      <AccordionItem value="notes"><AccordionTrigger>Notes</AccordionTrigger><AccordionContent><p>One section can close while another opens. Focus stays on the trigger.</p></AccordionContent></AccordionItem>
    </Accordion>
    <Collapsible open={extra} onOpenChange={setExtra}><CollapsibleTrigger asChild><Button>{extra ? 'Hide' : 'Show'} additional options</Button></CollapsibleTrigger><CollapsibleContent><div className="pt-4"><Switch label="Include annotations" defaultChecked /></div></CollapsibleContent></Collapsible>
  </div>;
}

export function LayoutDemo() {
  const [expanded, setExpanded] = useState(false);
  const [items, setItems] = useState(fixtures.items);
  return <div className="flex flex-col gap-4">
    <div className="flex flex-wrap gap-2"><Button onClick={() => setExpanded(value => !value)}><Maximize2 />{expanded ? 'Compact' : 'Expand'}</Button><Button onClick={() => setItems(list => [...list.slice(1), list[0]!])}>Reorder</Button></div>
    <LayoutRegion className="rounded-lg border border-border-subtle bg-bg-primary">
      {items.map(item => <Item key={item.id} data-layout-item={item.id} size={expanded ? 'md' : 'sm'}><ItemMedia><GripVertical className="size-4" /></ItemMedia><ItemContent><ItemTitle>{item.title}</ItemTitle>{expanded && <ItemDescription>{item.description}</ItemDescription>}</ItemContent></Item>)}
    </LayoutRegion>
    <p className="text-xs text-text-secondary">Reorder while the container is changing size. Item identity and focus are preserved.</p>
  </div>;
}

const MotionButton = motion.create(Button);

export function FeedbackDemo() {
  const [state, setState] = useState<'idle' | 'saving' | 'saved'>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const { enabled, reduced, transition } = useMotionSettings('feedback');
  const Control = (enabled ? MotionButton : Button) as typeof Button;
  useEffect(() => () => clearTimeout(timer.current), []);
  function save() { clearTimeout(timer.current); setState('saving'); timer.current = setTimeout(() => setState('saved'), 600); }
  const content = <span className="inline-flex items-center gap-1.5">{state === 'saved' ? <Check className="size-4" /> : <Save className="size-4" />}{state === 'saved' ? 'Saved' : state === 'saving' ? 'Saving…' : 'Save changes'}</span>;
  return <div className="flex flex-col items-start gap-5">
    <div className="flex flex-wrap gap-2"><Control {...(enabled ? {layout: !reduced, transition} : {})} variant="primary" aria-label={state === 'saved' ? 'Saved' : state === 'saving' ? 'Saving…' : 'Save changes'} aria-busy={state === 'saving'} disabled={state === 'saving'} onClick={save} className={enabled ? 'active:scale-100' : undefined}>
      {enabled ? <motion.span layout={!reduced} transition={transition} className="relative inline-flex"><AnimatePresence initial={false} mode="popLayout"><motion.span key={state} initial={reduced ? false : {opacity:0,y:5,scale:0.97}} animate={{opacity:1,y:0,scale:1}} exit={reduced ? {opacity:0} : {opacity:0,y:-5,scale:0.97}} transition={{...transition,opacity:{duration:reduced ? 0 : 0.1}}}>{content}</motion.span></AnimatePresence></motion.span> : content}
    </Control><Button variant="ghost" onClick={() => {clearTimeout(timer.current);setState('idle');}}>Reset</Button></div>
    <div className="min-h-7"><AnimatePresence initial={false}>{state === 'saved' && <motion.div initial={enabled && !reduced ? {opacity:0,scale:0.96,y:4} : false} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0}} transition={transition}><Badge variant="success" dot>Changes saved</Badge></motion.div>}</AnimatePresence></div>
    <p role="status" className="text-xs text-text-secondary">{state === 'saving' ? 'Simulated save in progress' : state === 'saved' ? 'Demo action confirmed. Save again or reset.' : 'Demo only — no data is sent.'}</p>
  </div>;
}
