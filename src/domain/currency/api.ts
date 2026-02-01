import { queryOptions } from '@tanstack/react-query';
import { http } from '@/utils/http';
import type { ExchangeRate } from './types';

interface ExchangeRateResponse {
  exchangeRate: ExchangeRate;
}

export const getExchangeRate = () => http.get<ExchangeRateResponse>('/api/exchange-rate');

export const exchangeRateQueryOptions = () =>
  queryOptions({
    queryKey: ['exchange-rate'],
    queryFn: getExchangeRate,
  });
