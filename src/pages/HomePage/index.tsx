import BannerSection from './components/BannerSection';
import CurrentLevelSection from './components/CurrentLevelSection';
import ProductListSection from './components/ProductListSection';
import RecentPurchaseSection from './components/RecentPurchaseSection';
import { CurrencyContext, useCurrencyState } from './useCurrency';

export { useCurrency } from './useCurrency';

function HomePage() {
  const currencyState = useCurrencyState();

  return (
    <CurrencyContext.Provider value={currencyState}>
      <BannerSection />
      <CurrentLevelSection />
      <RecentPurchaseSection />
      <ProductListSection />
    </CurrencyContext.Provider>
  );
}

export default HomePage;
