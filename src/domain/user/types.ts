/**
 * 사용자 도메인 타입
 *
 * 전역 도메인 - 서비스 전체에서 사용하는 사용자 개념
 */

import type { Grade } from '@/pages/HomePage/domain/grade/types';

export interface MyInfo {
  point: number;
  grade: Grade;
}
