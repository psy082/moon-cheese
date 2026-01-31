import { createContext, useContext, useState } from 'react';

type Currency = 'KRW' | 'USD';

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
