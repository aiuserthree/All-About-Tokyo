// Open-Meteo API를 사용한 도쿄 날씨 서비스
// API 키가 필요 없는 무료 서비스

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
}

export interface WeatherResponse {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
}

// 날씨 코드를 한국어 조건으로 변환
const getWeatherCondition = (weatherCode: number): { condition: string; description: string; icon: string } => {
  const conditions: Record<number, { condition: string; description: string; icon: string }> = {
    0: { condition: "맑음", description: "외출하기 좋은 날씨입니다!", icon: "☀️" },
    1: { condition: "대체로 맑음", description: "가벼운 구름이 있는 날씨", icon: "🌤️" },
    2: { condition: "부분적으로 흐림", description: "구름이 많은 날씨", icon: "⛅" },
    3: { condition: "흐림", description: "구름이 꽉 찬 날씨", icon: "☁️" },
    45: { condition: "안개", description: "안개가 낀 날씨", icon: "🌫️" },
    48: { condition: "서리 안개", description: "서리가 내린 안개", icon: "🌫️" },
    51: { condition: "가벼운 이슬비", description: "가벼운 이슬비", icon: "🌦️" },
    53: { condition: "중간 이슬비", description: "중간 이슬비", icon: "🌦️" },
    55: { condition: "강한 이슬비", description: "강한 이슬비", icon: "🌧️" },
    61: { condition: "가벼운 비", description: "가벼운 비", icon: "🌧️" },
    63: { condition: "중간 비", description: "중간 비", icon: "🌧️" },
    65: { condition: "강한 비", description: "강한 비", icon: "⛈️" },
    71: { condition: "가벼운 눈", description: "가벼운 눈", icon: "🌨️" },
    73: { condition: "중간 눈", description: "중간 눈", icon: "🌨️" },
    75: { condition: "강한 눈", description: "강한 눈", icon: "❄️" },
    77: { condition: "눈송이", description: "눈송이", icon: "❄️" },
    80: { condition: "가벼운 소나기", description: "가벼운 소나기", icon: "🌦️" },
    81: { condition: "중간 소나기", description: "중간 소나기", icon: "🌧️" },
    82: { condition: "강한 소나기", description: "강한 소나기", icon: "⛈️" },
    85: { condition: "가벼운 눈보라", description: "가벼운 눈보라", icon: "🌨️" },
    86: { condition: "강한 눈보라", description: "강한 눈보라", icon: "❄️" },
    95: { condition: "천둥번개", description: "천둥번개", icon: "⛈️" },
    96: { condition: "우박과 천둥번개", description: "우박과 천둥번개", icon: "⛈️" },
    99: { condition: "강한 우박과 천둥번개", description: "강한 우박과 천둥번개", icon: "⛈️" }
  };

  return conditions[weatherCode] || { condition: "알 수 없음", description: "날씨 정보를 가져올 수 없습니다", icon: "❓" };
};

// 도쿄 날씨 정보 가져오기
export async function getTokyoWeather(): Promise<WeatherData> {
  try {
    // Vercel API Route를 통한 프록시 (CORS 문제 해결)
    const apiUrl = '/api/weather';
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`날씨 API 오류: ${response.status}`);
    }

    const data: WeatherResponse = await response.json();
    
    const weatherInfo = getWeatherCondition(data.current.weather_code);
    
    return {
      temperature: Math.round(data.current.temperature_2m),
      condition: weatherInfo.condition,
      humidity: data.current.relative_humidity_2m,
      windSpeed: data.current.wind_speed_10m,
      description: weatherInfo.description,
      icon: weatherInfo.icon
    };
  } catch (error) {
    console.error('날씨 정보 가져오기 실패:', error);
    
    // 오류 시 기본값 반환
    return {
      temperature: 22,
      condition: "맑음",
      humidity: 60,
      windSpeed: 5,
      description: "외출하기 좋은 날씨입니다!",
      icon: "☀️"
    };
  }
}

// 날씨에 따른 추천 메시지 생성
export function getWeatherRecommendation(weather: WeatherData): string {
  const { condition, temperature } = weather;
  
  if (condition.includes("비") || condition.includes("소나기")) {
    return "우산을 챙기세요! 실내 명소를 추천드립니다.";
  } else if (condition.includes("눈")) {
    return "따뜻하게 입고 외출하세요!";
  } else if (condition.includes("안개")) {
    return "안개로 인해 가시거리가 짧을 수 있습니다.";
  } else if (temperature > 30) {
    return "더운 날씨입니다! 수분 섭취를 잊지 마세요.";
  } else if (temperature < 10) {
    return "추운 날씨입니다! 따뜻하게 입고 외출하세요.";
  } else {
    return "외출하기 좋은 날씨입니다!";
  }
}
