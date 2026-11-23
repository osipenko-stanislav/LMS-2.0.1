import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, Popover, PopoverContent, PopoverTrigger, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Input } from '../ui';
import { useGradientBorder } from '../vendor/linear-ui/lib/useGradientBorder';
import type { CSSProperties } from 'react';

function Sample({gradient,artwork=false}:{gradient:boolean;artwork?:boolean}){
 const ref=useGradientBorder<HTMLDivElement>();
 const style:CSSProperties|undefined=artwork?{backgroundImage:'radial-gradient(ellipse at top right, var(--accent-subtle-bg), transparent 65%)',backgroundSize:'100% 100%',backgroundRepeat:'no-repeat'}:undefined;
 return <div ref={gradient?ref:undefined} data-border-example={gradient?'gradient':'plain'} style={style} className="rounded-xl border border-border bg-bg-elevated p-5 shadow-popover"><p className="text-sm font-medium">{gradient?'Gradient border':'Standard border'}</p><p className="mt-2 text-xs text-text-secondary">Same tokens, radius, padding and one-pixel border.</p><Input aria-label={gradient?'Gradient sample field':'Standard sample field'} className="mt-5" placeholder="Focus remains visible"/></div>;
}
function Comparison(){return <main className="mx-auto max-w-4xl px-5 py-10"><h1 className="text-2xl font-semibold">Gradient Borders</h1><p className="mt-2 text-sm text-text-secondary">Dark-only elevated surfaces. Use the theme toolbar to compare Light and Dark.</p><div className="mt-7 grid gap-5 sm:grid-cols-2"><Sample gradient={false}/><Sample gradient/></div><h2 className="mt-8 text-sm font-semibold">Existing background image</h2><div className="mt-4 grid gap-5 sm:grid-cols-2"><Sample gradient={false} artwork/><Sample gradient artwork/></div><h2 className="mt-8 text-sm font-semibold">Real components</h2><div className="mt-4 flex flex-wrap gap-3"><Dialog><DialogTrigger asChild><Button>Dialog</Button></DialogTrigger><DialogContent><DialogTitle>Elevated dialog</DialogTitle><DialogDescription>Dark gradient border with the original focus treatment.</DialogDescription><Input aria-label="Dialog field" className="mt-4"/></DialogContent></Dialog><Popover><PopoverTrigger asChild><Button>Popover</Button></PopoverTrigger><PopoverContent><p className="text-sm font-medium">Elevated popover</p><Input aria-label="Popover field" className="mt-3"/></PopoverContent></Popover><DropdownMenu><DropdownMenuTrigger asChild><Button>Dropdown</Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem>First action</DropdownMenuItem><DropdownMenuItem>Second action</DropdownMenuItem></DropdownMenuContent></DropdownMenu></div></main>;}
const meta={title:'Linear UI/Surfaces/Gradient Borders',component:Comparison,parameters:{layout:'fullscreen'}} satisfies Meta<typeof Comparison>;
export default meta;
type Story=StoryObj<typeof meta>;
export const ComparisonStory:Story={name:'Comparison'};
