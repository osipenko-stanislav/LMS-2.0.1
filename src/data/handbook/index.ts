import manifest from './manifest.json';
export type HandbookPage = { id: string; parentId: string | null; title: string; summary?: string };
export const handbookPages = manifest as HandbookPage[];
export const handbookRoot = handbookPages.find(page => page.parentId === null) ?? handbookPages[0];
export function handbookChildren(id: string) { return handbookPages.filter(page => page.parentId === id); }
export function handbookAncestors(id: string) { const result: HandbookPage[] = []; let page = handbookPages.find(item => item.id === id); while (page) { result.unshift(page); page = page.parentId ? handbookPages.find(item => item.id === page!.parentId) : undefined; } return result; }
export async function loadHandbookContent(id: string) { const response = await fetch(`${import.meta.env.BASE_URL}handbook/${id}.json`); if (!response.ok) throw new Error('Не удалось загрузить страницу хэндбука'); return response.json() as Promise<{ type: string; content?: HandbookNode[] }>; }
export type HandbookNode = { type: string; text?: string; attrs?: Record<string, unknown>; content?: HandbookNode[] };
export function handbookText(node: HandbookNode): string { return node.text ?? (node.content ?? []).map(handbookText).join(''); }
