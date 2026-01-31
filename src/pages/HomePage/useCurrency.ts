import { createContext, useContext, useState } from 'react';

export type Currency = 'KRW' | 'USD';

export type ExchangeRate = Record<Currency, number>;

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within HomePage');
  }
  return context;
}

export function useCurrencyState() {
  const [currency, setCurrency] = useState<Currency>('USD');
  return { currency, setCurrency };
}

export { CurrencyContext };
