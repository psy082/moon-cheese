export type Grade = 'EXPLORER' | 'PILOT' | 'COMMANDER';

export interface GradePoint {
  type: Grade;
  minPoint: number;
};
