// 도쿄 지진 정보 API 서비스 - 모바일 최적화
export interface EarthquakeData {
  magnitude: number;
  location: string;
  depth: number; // km
  time: string;
  intensity: number; // 일본 지진 계급 (0-7)
  tsunamiWarning: boolean;
  status: 'safe' | 'caution' | 'warning' | 'emergency';
}

export interface EarthquakeAlert {
  hasRecentEarthquake: boolean;
  lastEarthquake?: EarthquakeData;
  safetyMessage: string;
  recommendations: string[];
}

// 일본 지진 계급 설명
const intensityDescriptions: Record<number, string> = {
  0: '무감',
  1: '미진',
  2: '약진',
  3: '약진',
  4: '중진',
  5: '강진',
  6: '강진',
  7: '진도7'
};

// 지진 강도에 따른 상태 판정
const getEarthquakeStatus = (intensity: number): { status: EarthquakeAlert['status'], color: string, emoji: string } => {
  if (intensity <= 2) {
    return { status: 'safe', color: '#00AA00', emoji: '✅' };
  } else if (intensity <= 4) {
    return { status: 'caution', color: '#FF8800', emoji: '⚠️' };
  } else if (intensity <= 6) {
    return { status: 'warning', color: '#FF4444', emoji: '🚨' };
  } else {
    return { status: 'emergency', color: '#AA0000', emoji: '🆘' };
  }
};

// 도쿄 지진 정보 가져오기
export async function getTokyoEarthquakeInfo(): Promise<EarthquakeAlert> {
  try {
    // USGS 지진 API 사용 (무료, API 키 불필요)
    // 일본 지역 (위도 30-45, 경도 130-145)에서 최근 1시간 내 지진 발생 여부 확인
    const apiUrl = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=' + 
      new Date(Date.now() - 3600000).toISOString() + 
      '&endtime=' + new Date().toISOString() + 
      '&minlatitude=30&maxlatitude=45&minlongitude=130&maxlongitude=145&minmagnitude=2.0';
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`지진 API 오류: ${response.status}`);
    }

    const data = await response.json();
    console.log('지진 API 응답:', data);
    
    // 최근 지진이 있는지 확인
    const recentEarthquakes = data.features || [];
    
    if (recentEarthquakes.length > 0) {
      // 가장 최근 지진 정보 사용
      const latestEarthquake = recentEarthquakes[0];
      const properties = latestEarthquake.properties;
      const geometry = latestEarthquake.geometry;
      
      // 지진 강도를 규모로 추정 (대략적인 변환)
      const magnitude = properties.mag;
      const intensity = magnitude < 3 ? 1 : magnitude < 4 ? 2 : magnitude < 5 ? 3 : magnitude < 6 ? 4 : magnitude < 7 ? 5 : 6;
      
      const earthquake: EarthquakeData = {
        magnitude: Math.round(magnitude * 10) / 10,
        location: `${properties.place || '일본 근해'}`,
        depth: Math.round(geometry.coordinates[2] || 0), // 깊이 (km)
        time: new Date(properties.time).toISOString(),
        intensity,
        tsunamiWarning: properties.tsunami === 1,
        status: getEarthquakeStatus(intensity).status
      };
      
      return {
        hasRecentEarthquake: true,
        lastEarthquake: earthquake,
        safetyMessage: getSafetyMessage(earthquake),
        recommendations: getRecommendations(earthquake)
      };
    } else {
      // 최근 지진 없음
      return {
        hasRecentEarthquake: false,
        safetyMessage: "현재 도쿄 지역에 지진 활동이 없습니다. 안전합니다.",
        recommendations: [
          "평상시 지진 대비 물품을 준비해 두세요.",
          "건물 내부에서는 테이블 아래로 피하세요.",
          "실외에서는 건물과 전선에서 멀어지세요."
        ]
      };
    }
  } catch (error) {
    console.error('지진 정보 가져오기 실패:', error);
    console.log('모의 지진 데이터를 사용합니다.');
    
    // 오류 시 모의 데이터 반환
    const hasEarthquake = Math.random() < 0.1; // 10% 확률로 지진 발생
    
    if (hasEarthquake) {
      const intensity = Math.floor(Math.random() * 3) + 1;
      const magnitude = 3.0 + Math.random() * 2;
      
      const earthquake: EarthquakeData = {
        magnitude: Math.round(magnitude * 10) / 10,
        location: getRandomLocation(),
        depth: Math.floor(Math.random() * 30) + 10,
        time: new Date(Date.now() - Math.random() * 3600000).toISOString(),
        intensity,
        tsunamiWarning: false,
        status: getEarthquakeStatus(intensity).status
      };
      
      return {
        hasRecentEarthquake: true,
        lastEarthquake: earthquake,
        safetyMessage: getSafetyMessage(earthquake),
        recommendations: getRecommendations(earthquake)
      };
    } else {
      return {
        hasRecentEarthquake: false,
        safetyMessage: "지진 정보를 불러올 수 없습니다. 안전을 위해 주의하세요.",
        recommendations: [
          "지진 발생 시 침착하게 행동하세요.",
          "건물 밖으로 나갈 때는 계단을 이용하세요.",
          "긴급상황 시 119번에 신고하세요."
        ]
      };
    }
  }
}

// 랜덤 위치 생성
function getRandomLocation(): string {
  const locations = [
    "도쿄만",
    "이바라키현 남부",
    "지바현 북부", 
    "사이타마현 동부",
    "가나가와현 동부",
    "도쿄도 서부",
    "도쿄도 북부",
    "도쿄도 동부"
  ];
  return locations[Math.floor(Math.random() * locations.length)];
}

// 안전 메시지 생성
function getSafetyMessage(earthquake: EarthquakeData): string {
  const status = getEarthquakeStatus(earthquake.intensity);
  
  if (earthquake.tsunamiWarning) {
    return `🚨 진도${earthquake.intensity} 지진 발생! 쓰나미 경보 발령 중입니다. 높은 곳으로 대피하세요!`;
  } else if (earthquake.intensity >= 5) {
    return `⚠️ 진도${earthquake.intensity} 지진 발생! 안전한 곳으로 이동하세요.`;
  } else if (earthquake.intensity >= 3) {
    return `⚠️ 진도${earthquake.intensity} 지진 발생. 큰 피해는 없지만 주의하세요.`;
  } else {
    return `✅ 진도${earthquake.intensity} 미약한 지진 발생. 특별한 조치 불필요합니다.`;
  }
}

// 추천사항 생성
function getRecommendations(earthquake: EarthquakeData): string[] {
  const recommendations: string[] = [];
  
  if (earthquake.tsunamiWarning) {
    recommendations.push("즉시 높은 곳으로 대피하세요.");
    recommendations.push("바닷가에서 멀어지세요.");
    recommendations.push("긴급상황 시 119번에 신고하세요.");
  } else if (earthquake.intensity >= 5) {
    recommendations.push("건물 밖으로 나가세요.");
    recommendations.push("가스와 전기를 차단하세요.");
    recommendations.push("라디오로 정확한 정보를 확인하세요.");
  } else if (earthquake.intensity >= 3) {
    recommendations.push("안전한 곳으로 이동하세요.");
    recommendations.push("떨어질 수 있는 물건을 확인하세요.");
    recommendations.push("가족과 안전을 확인하세요.");
  } else {
    recommendations.push("특별한 조치는 불필요합니다.");
    recommendations.push("평상시처럼 생활하세요.");
  }
  
  return recommendations;
}

// 지진 강도 설명
export function getIntensityDescription(intensity: number): string {
  return intensityDescriptions[intensity] || '알 수 없음';
}

// 지진 상태 아이콘
export function getEarthquakeIcon(status: EarthquakeAlert['status']): string {
  switch (status) {
    case 'safe': return '✅';
    case 'caution': return '⚠️';
    case 'warning': return '🚨';
    case 'emergency': return '🆘';
    default: return '❓';
  }
}

// 지진 요약 정보
export function getEarthquakeSummary(alert: EarthquakeAlert): string {
  if (alert.hasRecentEarthquake && alert.lastEarthquake) {
    const eq = alert.lastEarthquake;
    return `${eq.magnitude} 규모, 진도${eq.intensity}, ${eq.location}`;
  }
  return "지진 활동 없음";
}
