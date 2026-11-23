import type { DataSource } from './data-source'; import type { GradeId } from './domain';
export type Action = { type: 'grade.update'; payload: { gradeId: GradeId; score: number | null; feedbackContentId?: string } };
export type ActionResult = { ok: true } | { ok: false; error: string };
export async function dispatchAction(source: DataSource, action: Action): Promise<ActionResult> { try { if (action.type === 'grade.update') await source.updateGrade(action.payload.gradeId, { score: action.payload.score, feedbackContentId: action.payload.feedbackContentId }); return { ok: true }; } catch (error) { return { ok: false, error: error instanceof Error ? error.message : 'Action failed' }; } }
