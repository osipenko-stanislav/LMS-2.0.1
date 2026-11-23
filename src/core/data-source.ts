import type { Assignment, ContentId, Course, Entity, Grade, Lesson, ScheduleEvent, TextContent, UserId } from './domain';
export type Collections = { courses: Entity<Course>[]; lessons: Entity<Lesson>[]; assignments: Entity<Assignment>[]; grades: Entity<Grade>[]; scheduleEvents: Entity<ScheduleEvent>[] };
export interface DataSource {
  getCollections(): Promise<Collections>;
  getTextContent(id: ContentId): Promise<TextContent | undefined>;
  updateGrade(id: Grade['id'], patch: Pick<Grade, 'score' | 'feedbackContentId'>): Promise<Entity<Grade>>;
}
export type FixtureSeed = { collections: Collections; content: TextContent[]; currentUserId: UserId };
export class FixtureDataSource implements DataSource {
  private readonly state: FixtureSeed;
  constructor(seed: FixtureSeed) { this.state = structuredClone(seed); }
  async getCollections() { return structuredClone(this.state.collections); }
  async getTextContent(id: ContentId) { return this.state.content.find((item) => item.id === id); }
  async updateGrade(id: Grade['id'], patch: Pick<Grade, 'score' | 'feedbackContentId'>) {
    const grade = this.state.collections.grades.find((item) => item.id === id); if (!grade) throw new Error(`Grade ${id} not found`);
    Object.assign(grade, patch, { provenance: { ...grade.provenance, origin: 'user', updatedAt: new Date().toISOString() } }); return structuredClone(grade);
  }
}
