import { queryOptions } from '@tanstack/react-query';
import { http } from '@/utils/http';
import type { MyInfo } from './types';

export const getMyInfo = () => http.get<MyInfo>('/api/me');

export const myInfoQueryOptions = () =>
  queryOptions({
    queryKey: ['me'],
    queryFn: getMyInfo,
  });
