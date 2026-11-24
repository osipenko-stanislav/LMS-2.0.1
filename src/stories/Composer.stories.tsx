import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Composer } from '../compositions/Composer';

const meta={title:'LMS/Composer',component:Composer,args:{value:'',onValueChange:()=>{},onSend:()=>{}},parameters:{layout:'padded',docs:{description:{component:'Единый Composer для AI Navigator и других диалоговых сценариев. Использует Linear UI и поддерживает состояния ввода, вложений, генерации и ошибок.'}}},render:args=>{const [value,setValue]=useState(args.value);return <div className="mx-auto w-full max-w-3xl"><Composer {...args} value={value} onValueChange={setValue} onSend={()=>setValue('')}/></div>;}} satisfies Meta<typeof Composer>;
export default meta;
type Story=StoryObj<typeof meta>;
export const Default:Story={};
export const Attachments:Story={args:{attachments:[{id:'file',name:'Конспект.pdf',status:'ready'}],onAttach:()=>{},onRemoveAttachment:()=>{}}};
export const Sending:Story={args:{value:'Построй план недели',status:'sending'}};
export const Generating:Story={args:{status:'generating',onStop:()=>{}}};
export const Error:Story={args:{value:'Построй план недели',status:'error',error:'Не удалось отправить сообщение. Попробуйте ещё раз.'}};
export const Success:Story={args:{status:'success'}};

export const Disabled:Story={args:{disabled:true}};
export const Multiline:Story={args:{value:"Первая строка\nВторая строка\nТретья строка"}};
export const Suggestion:Story={args:{suggestion:'Моя неделя',value:'Расскажи про ближайшие задачи',onClearSuggestion:()=>{}}};
