import { queryOptions } from '@tanstack/react-query';
import { http } from '@/utils/http';
import type { GradePoint } from './types';

interface GradePointResponse {
  gradePointList: GradePoint[];
}

export const getGradePoints = () => http.get<GradePointResponse>('/api/grade/point');

export const gradePointsQueryOptions = () =>
  queryOptions({
    queryKey: ['grade-points'],
    queryFn: getGradePoints,
  });
