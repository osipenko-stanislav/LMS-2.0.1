export type Id<T extends string> = string & { readonly __brand: T };
export type DataOrigin = 'fixture' | 'user' | 'external' | 'ai';
export type Provenance = { origin: DataOrigin; source: string; createdAt: string; updatedAt?: string };
export type Entity<T> = T & { provenance: Provenance };
export type ContentId = string & { readonly __brand: 'content' };
export type TextContent = { id: ContentId; text: string; format: 'plain' | 'markdown' };
