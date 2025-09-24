// 환율 정보 서비스

export interface ExchangeRateData {
  base: string; // 기준 통화 (JPY)
  date: string; // 업데이트 날짜
  rates: {
    USD: number; // 미국 달러
    EUR: number; // 유로
    KRW: number; // 한국 원
    CNY: number; // 중국 위안
    GBP: number; // 영국 파운드
    AUD: number; // 호주 달러
    CAD: number; // 캐나다 달러
    CHF: number; // 스위스 프랑
    THB: number; // 태국 바트
    SGD: number; // 싱가포르 달러
  };
  lastUpdated: string;
}

export interface ExchangeRateSummary {
  jpy100ToKrw: number; // 100엔 = ?원
  usdToJpy: number; // 1달러 = ?엔
  eurToJpy: number; // 1유로 = ?엔
  recommendation: string;
  trend: 'up' | 'down' | 'stable';
}

// 환율 정보 가져오기 (엔화 기준)
export async function getTokyoExchangeRates(): Promise<ExchangeRateData> {
  try {
    // ExchangeRate-API 사용 (무료, API 키 불필요) - 엔화 기준
    const apiUrl = 'https://api.exchangerate-api.com/v4/latest/JPY';
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`환율 API 오류: ${response.status}`);
    }

    const data = await response.json();
    console.log('환율 API 응답:', data);
    
    return {
      base: data.base,
      date: data.date,
      rates: {
        USD: Math.round(data.rates.USD * 10000) / 10000,
        EUR: Math.round(data.rates.EUR * 10000) / 10000,
        KRW: Math.round(data.rates.KRW * 100) / 100, // 1엔 = ?원
        CNY: Math.round(data.rates.CNY * 10000) / 10000,
        GBP: Math.round(data.rates.GBP * 10000) / 10000,
        AUD: Math.round(data.rates.AUD * 10000) / 10000,
        CAD: Math.round(data.rates.CAD * 10000) / 10000,
        CHF: Math.round(data.rates.CHF * 10000) / 10000,
        THB: Math.round(data.rates.THB * 100) / 100,
        SGD: Math.round(data.rates.SGD * 10000) / 10000,
      },
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('환율 정보 가져오기 실패:', error);
    console.log('모의 환율 데이터를 사용합니다.');
    
    // 오류 시 모의 데이터 반환 (현실적인 환율 - 엔화 기준)
    return {
      base: 'JPY',
      date: new Date().toISOString().split('T')[0],
      rates: {
        USD: 0.0067, // 1엔 = 0.0067달러
        EUR: 0.0061, // 1엔 = 0.0061유로
        KRW: 8.95,   // 1엔 = 8.95원
        CNY: 0.048,  // 1엔 = 0.048위안
        GBP: 0.0053, // 1엔 = 0.0053파운드
        AUD: 0.0101, // 1엔 = 0.0101호주달러
        CAD: 0.0091, // 1엔 = 0.0091캐나다달러
        CHF: 0.0058, // 1엔 = 0.0058스위스프랑
        THB: 0.24,   // 1엔 = 0.24바트
        SGD: 0.0090, // 1엔 = 0.0090싱가포르달러
      },
      lastUpdated: new Date().toISOString()
    };
  }
}

// 환율 요약 정보 생성 (엔화 기준)
export function getExchangeRateSummary(rates: ExchangeRateData['rates']): ExchangeRateSummary {
  const jpy100ToKrw = Math.round(rates.KRW * 100); // 100엔 = ?원
  const usdToJpy = Math.round((1 / rates.USD) * 100) / 100;   // 1달러 = ?엔
  const eurToJpy = Math.round((1 / rates.EUR) * 100) / 100;   // 1유로 = ?엔
  
  // 환율 추세 분석 (간단한 로직)
  const trend: 'up' | 'down' | 'stable' = 'stable'; // 실제로는 이전 데이터와 비교 필요
  
  let recommendation = '';
  if (jpy100ToKrw < 900) {
    recommendation = '💚 한국 원화가 강세입니다. 일본 여행에 좋은 시기!';
  } else if (jpy100ToKrw > 1000) {
    recommendation = '⚠️ 한국 원화가 약세입니다. 환전 시기를 고려해보세요.';
  } else {
    recommendation = '📊 환율이 안정적입니다. 적당한 환전 시기입니다.';
  }
  
  return {
    jpy100ToKrw,
    usdToJpy,
    eurToJpy,
    recommendation,
    trend
  };
}

// 통화별 아이콘 반환
export function getCurrencyIcon(currency: string): string {
  const icons: { [key: string]: string } = {
    USD: '💵',
    EUR: '💶',
    KRW: '🇰🇷',
    CNY: '🇨🇳',
    GBP: '💷',
    AUD: '🇦🇺',
    CAD: '🇨🇦',
    CHF: '🇨🇭',
    THB: '🇹🇭',
    SGD: '🇸🇬'
  };
  return icons[currency] || '💰';
}

// 통화별 이름 반환
export function getCurrencyName(currency: string): string {
  const names: { [key: string]: string } = {
    USD: '미국 달러',
    EUR: '유로',
    KRW: '한국 원',
    CNY: '중국 위안',
    GBP: '영국 파운드',
    AUD: '호주 달러',
    CAD: '캐나다 달러',
    CHF: '스위스 프랑',
    THB: '태국 바트',
    SGD: '싱가포르 달러'
  };
  return names[currency] || currency;
}

// 환율 변화 방향 아이콘
export function getTrendIcon(trend: 'up' | 'down' | 'stable'): string {
  switch (trend) {
    case 'up': return '📈';
    case 'down': return '📉';
    case 'stable': return '➡️';
    default: return '➡️';
  }
}
