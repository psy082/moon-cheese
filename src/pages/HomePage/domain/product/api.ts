import { queryOptions } from '@tanstack/react-query';
import { http } from '@/utils/http';
import type { Product } from './types';

interface RecentProductsResponse {
  recentProducts: Product[];
}

export const getRecentProducts = () => http.get<RecentProductsResponse>('/api/recent/product/list');

export const recentProductsQueryOptions = () =>
  queryOptions({
    queryKey: ['recent-products'],
    queryFn: getRecentProducts,
  });
