import { createContext, useContext, useState } from 'react';
import type { Currency } from '@/domain/currency/types';

export type { Currency, ExchangeRate } from '@/domain/currency/types';

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider');
  }
  return context;
}

export function useCurrencyState() {
  const [currency, setCurrency] = useState<Currency>('USD');
  return { currency, setCurrency };
}

export { CurrencyContext };
