import { Spinner } from '../vendor/linear-ui/lib/components/Spinner';
export function Thinking({label='Думаю…'}:{label?:string}){return <div role="status" className="flex items-center gap-2 text-sm text-text-secondary"><Spinner aria-hidden="true" role="presentation" className="motion-reduce:animate-none"/><span>{label}</span></div>}
