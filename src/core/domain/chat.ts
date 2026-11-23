import type { Id, Provenance } from './shared';
import type { CourseId } from './learning';
export type ChatSessionId = Id<'chat-session'>;
export type ChatMessageId = Id<'chat-message'>;
export type ChatBlock = { type: 'course'; courseId: CourseId };
export interface ChatAttachment { id:string; name:string; mimeType:string; size:number }
export interface ChatMessage { id: ChatMessageId; sessionId: ChatSessionId; role: 'user' | 'assistant'; text: string; suggestion?: string; attachments?:ChatAttachment[]; createdAt: string; provenance: Provenance; blocks: ChatBlock[] }
export interface ChatSession { id: ChatSessionId; title: string; createdAt: string; updatedAt: string; messages: ChatMessage[]; provenance: Provenance }
