import { Flex, styled } from 'styled-system/jsx';
import { Spacing, Text } from '@/ui-lib';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { http } from '@/utils/http';
import { useCurrency, type Currency, type ExchangeRate } from '../useCurrency';

interface RecentProduct {
  id: number;
  thumbnail: string;
  name: string;
  price: number;
}

interface RecentProductsResponse {
  recentProducts: RecentProduct[];
}

interface ExchangeRateResponse {
  exchangeRate: ExchangeRate;
}

function convertUSDToKRW(priceInUSD: number, usdToKrwRate: number): number {
  return priceInUSD * usdToKrwRate;
}

function formatPrice(price: number, currency: Currency): string {
  if (currency === 'USD') {
    return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  } else {
    return `₩${Math.round(price).toLocaleString('ko-KR')}`;
  }
}

function RecentPurchaseSection() {
  const { currency } = useCurrency();

  const { data } = useQuery(
    queryOptions({
      queryKey: ['recent-products'],
      queryFn: () => http.get<RecentProductsResponse>('/api/recent/product/list'),
    })
  );

  const { data: exchangeRateData } = useQuery(
    queryOptions({
      queryKey: ['exchange-rate'],
      queryFn: () => http.get<ExchangeRateResponse>('/api/exchange-rate'),
    })
  );

  const recentProducts = data?.recentProducts ?? [];
  const usdToKrwRate = exchangeRateData?.exchangeRate.KRW ?? 1;

  return (
    <styled.section css={{ px: 5, pt: 4, pb: 8 }}>
      <Text variant="H1_Bold">최근 구매한 상품</Text>

      <Spacing size={4} />

      <Flex
        css={{
          bg: 'background.01_white',
          px: 5,
          py: 4,
          gap: 4,
          rounded: '2xl',
        }}
        direction={'column'}
      >
        {recentProducts.map(product => {
          const localizedPrice = currency === 'USD' ? product.price : convertUSDToKRW(product.price, usdToKrwRate);

          return (
            <Flex key={product.id} css={{ gap: 4 }}>
              <styled.img
                src={product.thumbnail}
                alt={product.name}
                css={{
                  w: '60px',
                  h: '60px',
                  objectFit: 'cover',
                  rounded: 'xl',
                }}
              />
              <Flex flexDir="column" gap={1}>
                <Text variant="B2_Medium">{product.name}</Text>
                <Text variant="H1_Bold">{formatPrice(localizedPrice, currency)}</Text>
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </styled.section>
  );
}

export default RecentPurchaseSection;
