import { useState } from 'react';
type Preferences={widgets:string[];suggestions:string[]};
const key='lms-navigator-preferences';
export function useNavigatorPreferences(){
 const [hidden,setHidden]=useState<Preferences>(()=>{try{const value=JSON.parse(localStorage.getItem(key)??'null');return {widgets:Array.isArray(value?.widgets)?value.widgets.filter((v:unknown)=>typeof v==='string'):[],suggestions:Array.isArray(value?.suggestions)?value.suggestions.filter((v:unknown)=>typeof v==='string'):[]};}catch{return {widgets:[],suggestions:[]};}});
 function toggle(group:keyof Preferences,item:string){setHidden(current=>{const next={...current,[group]:current[group].includes(item)?current[group].filter(value=>value!==item):[...current[group],item]};try{localStorage.setItem(key,JSON.stringify(next));}catch{}return next;});}
 return {hidden,toggle};
}
