/**
 * 통화 도메인 타입
 *
 * 전역 도메인 - 서비스 전체에서 사용하는 통화 개념
 */

export type Currency = 'KRW' | 'USD';

export type ExchangeRate = Record<Currency, number>;
