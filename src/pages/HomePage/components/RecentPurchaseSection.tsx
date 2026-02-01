import { Flex, styled } from 'styled-system/jsx';
import { Spacing, Text } from '@/ui-lib';
import { useSuspenseQueries } from '@tanstack/react-query';
import { useCurrency } from '@/providers/useCurrency';
import { aggregateProductsByID } from '../domain/product/calculations';
import { recentProductsQueryOptions } from '../domain/product/api';
import { exchangeRateQueryOptions } from '@/domain/currency/api';
import { convertCurrency, formatCurrency } from '@/domain/currency/calculations';

function RecentPurchaseSection() {
  const [{ data }, { data: exchangeRateData }] = useSuspenseQueries({
    queries: [recentProductsQueryOptions(), exchangeRateQueryOptions()],
  });

  const { currency } = useCurrency();
  const aggregated = aggregateProductsByID(data.recentProducts);

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
        {aggregated.map(product => {
          const amount = convertCurrency(product.price, currency, exchangeRateData.exchangeRate.KRW);

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
                <Text variant="H1_Bold">{formatCurrency(amount, currency)}</Text>
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </styled.section>
  );
}

export default RecentPurchaseSection;
