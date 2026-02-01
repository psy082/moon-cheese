import type { Currency } from './types';

/**
 * USD 금액을 KRW로 변환합니다.
 */
export function convertUSDToKRW(amountInUSD: number, usdToKrwRate: number): number {
  return amountInUSD * usdToKrwRate;
}

/**
 * USD 금액을 선택된 통화로 변환합니다.
 *
 * 본질: "USD 금액을 선택된 통화로 변환한다"
 */
export function convertCurrency(amountInUSD: number, currency: Currency, usdToKrwRate: number): number {
  if (currency === 'USD') {
    return amountInUSD;
  }
  return convertUSDToKRW(amountInUSD, usdToKrwRate);
}

/**
 * 금액을 통화 형식에 맞게 포맷팅합니다.
 *
 * 본질: "숫자를 통화 문자열로 변환한다"
 */
export function formatCurrency(amount: number, currency: Currency): string {
  if (currency === 'USD') {
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  } else {
    return `₩${Math.round(amount).toLocaleString('ko-KR')}`;
  }
}
