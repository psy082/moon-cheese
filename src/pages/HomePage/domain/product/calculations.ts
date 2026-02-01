import type { Product } from './types';

/**
 * 같은 ID의 상품들의 가격을 합산하여 반환합니다.
 *
 * 본질: "상품 목록에서 같은 ID를 가진 상품들을 하나로 합치고 가격을 합산한다"
 */
export function aggregateProductsByID(products: Product[]): Product[] {
  return products.reduce((acc, product) => {
    const existing = acc.find(p => p.id === product.id);
    if (existing) {
      return acc.map(p => (p.id === product.id ? { ...p, price: p.price + product.price } : p));
    } else {
      return [...acc, { ...product }];
    }
  }, [] as Product[]);
}
