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

// 주간 예보 데이터 인터페이스
export interface DailyForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  uvIndex: number;
}

export interface WeeklyForecastResponse {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
    relative_humidity_2m: number[];
    wind_speed_10m: number[];
    precipitation_probability_max: number[];
    uv_index_max: number[];
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
    // Open-Meteo API 직접 호출
    const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=35.6762&longitude=139.6503&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=Asia%2FTokyo';
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });

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

// 주간 날씨 예보 가져오기
export async function getTokyoWeeklyForecast(): Promise<DailyForecast[]> {
  try {
    // Open-Meteo API를 사용한 주간 예보 (무료)
    const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=35.6762&longitude=139.6503&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=Asia%2FTokyo&forecast_days=7';
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`예보 API 오류: ${response.status}`);
    }

    const data: WeeklyForecastResponse = await response.json();
    
    // 데이터 변환
    const forecasts: DailyForecast[] = data.daily.time.map((date, index) => {
      const weatherInfo = getWeatherCondition(data.daily.weather_code[index]);
      
      return {
        date: date,
        maxTemp: Math.round(data.daily.temperature_2m_max[index]),
        minTemp: Math.round(data.daily.temperature_2m_min[index]),
        condition: weatherInfo.condition,
        icon: weatherInfo.icon,
        humidity: data.daily.relative_humidity_2m ? data.daily.relative_humidity_2m[index] : 60,
        windSpeed: data.daily.wind_speed_10m ? data.daily.wind_speed_10m[index] : 5,
        precipitation: data.daily.precipitation_probability_max ? data.daily.precipitation_probability_max[index] : 20,
        uvIndex: data.daily.uv_index_max ? data.daily.uv_index_max[index] : 5
      };
    });

    return forecasts;
  } catch (error) {
    console.error('주간 예보 가져오기 실패:', error);
    console.log('모의 주간 예보 데이터를 사용합니다.');
    
    // 오류 시 모의 데이터 반환
    return generateMockWeeklyForecast();
  }
}

// 모의 주간 예보 데이터 생성
function generateMockWeeklyForecast(): DailyForecast[] {
  const today = new Date();
  const forecasts: DailyForecast[] = [];
  
  const mockConditions = [
    { condition: "맑음", icon: "☀️", code: 0 },
    { condition: "대체로 맑음", icon: "🌤️", code: 1 },
    { condition: "부분적으로 흐림", icon: "⛅", code: 2 },
    { condition: "흐림", icon: "☁️", code: 3 },
    { condition: "가벼운 비", icon: "🌧️", code: 61 },
    { condition: "중간 비", icon: "🌧️", code: 63 },
    { condition: "강한 비", icon: "⛈️", code: 65 }
  ];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const condition = mockConditions[i % mockConditions.length];
    const baseTemp = 20 + Math.random() * 15; // 20-35도
    
    forecasts.push({
      date: date.toISOString().split('T')[0],
      maxTemp: Math.round(baseTemp + 5),
      minTemp: Math.round(baseTemp - 5),
      condition: condition.condition,
      icon: condition.icon,
      humidity: Math.round(50 + Math.random() * 30),
      windSpeed: Math.round(3 + Math.random() * 7),
      precipitation: Math.round(Math.random() * 80),
      uvIndex: Math.round(1 + Math.random() * 10)
    });
  }
  
  return forecasts;
}

// 날짜 포맷팅 함수
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  if (date.toDateString() === today.toDateString()) {
    return "오늘";
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return "내일";
  } else {
    return date.toLocaleDateString('ko-KR', { 
      month: 'short', 
      day: 'numeric',
      weekday: 'short'
    });
  }
}

// 주간 예보 요약 정보
export function getWeeklySummary(forecasts: DailyForecast[]): string {
  const avgMaxTemp = Math.round(forecasts.reduce((sum, f) => sum + f.maxTemp, 0) / forecasts.length);
  const avgMinTemp = Math.round(forecasts.reduce((sum, f) => sum + f.minTemp, 0) / forecasts.length);
  const rainyDays = forecasts.filter(f => f.condition.includes('비')).length;
  
  if (rainyDays > 3) {
    return `${avgMinTemp}°C~${avgMaxTemp}°C, 비가 많이 올 예정입니다. 우산을 준비하세요!`;
  } else if (rainyDays > 0) {
    return `${avgMinTemp}°C~${avgMaxTemp}°C, ${rainyDays}일간 비가 예상됩니다.`;
  } else {
    return `${avgMinTemp}°C~${avgMaxTemp}°C, 대체로 맑은 날씨가 예상됩니다.`;
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
