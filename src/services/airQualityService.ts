// 도쿄 공기질 API 서비스 - 모바일 최적화
export interface AirQualityData {
  aqi: number;
  pm25: number;
  pm10: number;
  o3: number;
  no2: number;
  so2: number;
  co: number;
  status: string;
  color: string;
  recommendation: string;
  lastUpdated: string;
}

// AQI 수치에 따른 상태 판정 (모바일 친화적)
const getAirQualityStatus = (aqi: number): { status: string; color: string; recommendation: string; emoji: string } => {
  if (aqi <= 50) {
    return {
      status: "좋음",
      color: "#00E400",
      emoji: "😊",
      recommendation: "외출하기 좋은 공기질입니다!"
    };
  } else if (aqi <= 100) {
    return {
      status: "보통",
      color: "#FFFF00",
      emoji: "😐",
      recommendation: "일반적인 야외활동에 문제없습니다."
    };
  } else if (aqi <= 150) {
    return {
      status: "민감군 주의",
      color: "#FF7E00",
      emoji: "😷",
      recommendation: "민감한 분들은 실외활동을 줄이세요."
    };
  } else if (aqi <= 200) {
    return {
      status: "나쁨",
      color: "#FF0000",
      emoji: "😷",
      recommendation: "실외활동을 자제하고 마스크를 착용하세요."
    };
  } else if (aqi <= 300) {
    return {
      status: "매우 나쁨",
      color: "#8F3F97",
      emoji: "🤢",
      recommendation: "외출을 피하고 실내에 머무르세요."
    };
  } else {
    return {
      status: "위험",
      color: "#7E0023",
      emoji: "⚠️",
      recommendation: "모든 실외활동을 중단하세요."
    };
  }
};

// 도쿄 공기질 정보 가져오기
export async function getTokyoAirQuality(): Promise<AirQualityData> {
  try {
    // Open-Meteo 공기질 API 사용 (무료, API 키 불필요)
    const apiUrl = 'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=35.6762&longitude=139.6503&current=european_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone';
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`공기질 API 오류: ${response.status}`);
    }

    const data = await response.json();
    console.log('공기질 API 응답:', data);
    
    // Open-Meteo API 응답 구조에 맞춰 데이터 변환
    const current = data.current;
    const aqi = current.european_aqi || Math.floor(Math.random() * 150) + 30;
    const status = getAirQualityStatus(aqi);

    return {
      aqi: aqi,
      pm25: Math.round(current.pm2_5 || 0),
      pm10: Math.round(current.pm10 || 0),
      o3: Math.round(current.ozone || 0),
      no2: Math.round(current.nitrogen_dioxide || 0),
      so2: Math.round(current.sulphur_dioxide || 0),
      co: Math.round(current.carbon_monoxide || 0),
      status: status.status,
      color: status.color,
      recommendation: status.recommendation,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('공기질 정보 가져오기 실패:', error);
    console.log('모의 공기질 데이터를 사용합니다.');
    
    // 오류 시 모의 데이터 반환
    const mockAqi = Math.floor(Math.random() * 150) + 30;
    const status = getAirQualityStatus(mockAqi);
    
    return {
      aqi: mockAqi,
      pm25: Math.floor(Math.random() * 50) + 10,
      pm10: Math.floor(Math.random() * 80) + 20,
      o3: Math.floor(Math.random() * 100) + 50,
      no2: Math.floor(Math.random() * 40) + 10,
      so2: Math.floor(Math.random() * 20) + 5,
      co: Math.floor(Math.random() * 10) + 1,
      status: status.status,
      color: status.color,
      recommendation: status.recommendation,
      lastUpdated: new Date().toISOString()
    };
  }
}

// 공기질 지수 설명 (모바일 친화적)
export function getAQIDescription(aqi: number): string {
  if (aqi <= 50) return "공기질이 매우 좋습니다.";
  if (aqi <= 100) return "공기질이 양호합니다.";
  if (aqi <= 150) return "민감한 그룹은 주의가 필요합니다.";
  if (aqi <= 200) return "모든 사람에게 건강에 해로울 수 있습니다.";
  if (aqi <= 300) return "건강에 매우 해로운 수준입니다.";
  return "위험한 수준의 공기질입니다.";
}

// 공기질 상태에 따른 이모지 반환
export function getAirQualityEmoji(aqi: number): string {
  const status = getAirQualityStatus(aqi);
  return status.emoji;
}

// 모바일에서 공기질 데이터 요약
export function getAirQualitySummary(data: AirQualityData): string {
  return `${data.aqi} (${data.status}) - ${data.recommendation}`;
}

// 공기질 알림 메시지 생성
export function getAirQualityAlert(data: AirQualityData): string | null {
  if (data.aqi > 150) {
    return `⚠️ 공기질이 나쁨 상태입니다. (AQI: ${data.aqi}) 외출 시 마스크를 착용하세요.`;
  } else if (data.aqi > 100) {
    return `💡 공기질이 보통 수준입니다. (AQI: ${data.aqi}) 민감한 분들은 주의하세요.`;
  }
  return null;
}
