import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import BannerSection from './components/BannerSection';
import CurrentLevelSection from './components/CurrentLevelSection';
import ProductListSection from './components/ProductListSection';
import RecentPurchaseSection from './components/RecentPurchaseSection';
import ErrorSection from '@/components/ErrorSection';
import LoadingSection from '@/components/LoadingSection';

function HomePage() {
  return (
    <>
      <BannerSection />
      <ErrorBoundary fallback={<ErrorSection />}>
        <Suspense fallback={<LoadingSection />}>
          <CurrentLevelSection />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary fallback={<ErrorSection />}>
        <Suspense fallback={<LoadingSection />}>
          <RecentPurchaseSection />
        </Suspense>
      </ErrorBoundary>
      <ProductListSection />
    </>
  );
}

export default HomePage;
