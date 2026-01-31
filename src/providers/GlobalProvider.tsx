import { EnhancedToastProvider } from '@/ui-lib/components/toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CurrencyContext, useCurrencyState } from './useCurrency';

const queryClient = new QueryClient();

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const currencyState = useCurrencyState();

  return (
    <QueryClientProvider client={queryClient}>
      <CurrencyContext.Provider value={currencyState}>
        <EnhancedToastProvider>{children}</EnhancedToastProvider>
      </CurrencyContext.Provider>
    </QueryClientProvider>
  );
};

export default GlobalProvider;
