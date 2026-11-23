import type { ChatAttachment } from '../core/domain/chat';

function database():Promise<IDBDatabase>{
  return new Promise((resolve,reject)=>{
    const request=indexedDB.open('lms-chat-files',1);
    request.onupgradeneeded=()=>request.result.createObjectStore('files');
    request.onsuccess=()=>resolve(request.result);
    request.onerror=()=>reject(new Error('Не удалось открыть хранилище файлов.'));
  });
}
export async function saveChatFiles(files:File[]):Promise<ChatAttachment[]>{
  const db=await database();
  const attachments=files.map(file=>({id:crypto.randomUUID(),name:file.name,mimeType:file.type,size:file.size}));
  try{
    await new Promise<void>((resolve,reject)=>{
      const tx=db.transaction('files','readwrite');
      files.forEach((file,index)=>tx.objectStore('files').put(file,attachments[index].id));
      tx.oncomplete=()=>resolve();
      tx.onabort=()=>reject(new Error('Не удалось сохранить файлы. Проверьте свободное место в браузере.'));
      tx.onerror=()=>reject(new Error('Не удалось сохранить файлы.'));
    });
    return attachments;
  }finally{db.close();}
}
export async function downloadChatFile(file:ChatAttachment):Promise<void>{
  const db=await database();
  try{
    const blob=await new Promise<Blob|undefined>((resolve,reject)=>{
      const request=db.transaction('files').objectStore('files').get(file.id);
      request.onsuccess=()=>resolve(request.result);
      request.onerror=()=>reject(new Error('Не удалось прочитать файл.'));
    });
    if(!(blob instanceof Blob))throw new Error('Файл недоступен в этом браузере. Добавьте его заново.');
    const url=URL.createObjectURL(blob),link=document.createElement('a');
    link.href=url;link.download=file.name;link.click();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }finally{db.close();}
}
