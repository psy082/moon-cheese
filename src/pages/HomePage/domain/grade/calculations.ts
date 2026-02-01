import type { MyInfo } from '@/domain/user/types';
import type { Grade, GradePoint } from './types';

const GRADE_ORDER = ['EXPLORER', 'PILOT', 'COMMANDER'] as const satisfies readonly Grade[];

export interface GradeProgress {
  pointsToNextGrade: number;
  progress: number;
}

/**
 * 다음 등급까지 남은 포인트와 진행도를 계산합니다.
 *
 * 본질: "현재 등급의 시작 포인트부터 다음 등급의 시작 포인트까지의 범위에서
 *       사용자의 현재 포인트 위치를 백분율로 계산한다"
 *
 * @returns pointsToNextGrade - 다음 등급까지 남은 포인트 (최고 등급이면 0)
 * @returns progress - 현재 등급 내 진행도 (0~1, 최고 등급이면 1)
 */
export function calculateGradeProgress(myInfo: MyInfo, gradePointList: GradePoint[]): GradeProgress {
  const currentGradeIndex = GRADE_ORDER.indexOf(myInfo.grade);
  const nextGradeIndex = currentGradeIndex + 1;
  const isMaxGrade = nextGradeIndex >= GRADE_ORDER.length;

  const gradePointMap = new Map(gradePointList.map(g => [g.type, g.minPoint]));
  const currentGradeMinPoint = gradePointMap.get(myInfo.grade) ?? 0;

  if (isMaxGrade) {
    return {
      pointsToNextGrade: 0,
      progress: 1,
    };
  }

  const nextGradeMinPoint = gradePointMap.get(GRADE_ORDER[nextGradeIndex]) ?? 0;
  const gradeRange = nextGradeMinPoint - currentGradeMinPoint;

  return {
    pointsToNextGrade: nextGradeMinPoint - myInfo.point,
    progress: gradeRange === 0 ? 1 : (myInfo.point - currentGradeMinPoint) / gradeRange,
  };
}
