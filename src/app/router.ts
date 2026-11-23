import { useSyncExternalStore } from 'react';
import { pathFor, resolveRoute, type NavigationId, type RouteParams } from './navigation';
const subscribe=(callback:()=>void)=>{window.addEventListener('hashchange',callback);return()=>window.removeEventListener('hashchange',callback);};
const snapshot=()=>window.location.hash.slice(1)||pathFor('navigator');
export type Navigate = (id: NavigationId, params?: RouteParams) => void;
export function useAppRoute(){
  const path=useSyncExternalStore(subscribe,snapshot,()=>pathFor('navigator'));
  const navigate:Navigate=(id,params)=>{window.location.hash=pathFor(id,params);};
  return {path,route:resolveRoute(path.split('?')[0]!),navigate};
}
