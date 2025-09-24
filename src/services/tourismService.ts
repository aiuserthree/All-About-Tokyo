// 도쿄 관광지 혼잡도 정보 API 서비스 - 모바일 최적화
export interface TouristSpot {
  id: string;
  name: string;
  category: 'temple' | 'park' | 'shopping' | 'museum' | 'landmark' | 'market' | 'entertainment';
  location: string;
  crowding: 'low' | 'medium' | 'high' | 'very_high';
  waitingTime: number; // 분 단위
  rating: number; // 1-5
  price: string;
  openHours: string;
  lastUpdated: string;
  imageUrl?: string;
  description: string;
}

export interface TourismResponse {
  spots: TouristSpot[];
  totalSpots: number;
  recommendations: TouristSpot[];
}

// 관광지 카테고리 정보
const categoryInfo: Record<TouristSpot['category'], { icon: string; color: string; label: string }> = {
  temple: { icon: '⛩️', color: '#8B4513', label: '사원/신사' },
  park: { icon: '🌸', color: '#90EE90', label: '공원' },
  shopping: { icon: '🛍️', color: '#FF69B4', label: '쇼핑' },
  museum: { icon: '🏛️', color: '#4682B4', label: '박물관' },
  landmark: { icon: '🗼', color: '#FFD700', label: '랜드마크' },
  market: { icon: '🏪', color: '#FF8C00', label: '시장' },
  entertainment: { icon: '🎡', color: '#9370DB', label: '엔터테인먼트' }
};

// 도쿄 주요 관광지 데이터
const tokyoTouristSpots: TouristSpot[] = [
  {
    id: '1',
    name: '아사쿠사 센소지',
    category: 'temple',
    location: '아사쿠사',
    crowding: 'high',
    waitingTime: 45,
    rating: 4.5,
    price: '무료',
    openHours: '06:00-17:00',
    lastUpdated: '',
    imageUrl: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400',
    description: '도쿄 최고의 전통 사원'
  },
  {
    id: '2',
    name: '시부야 스크램블 교차로',
    category: 'landmark',
    location: '시부야',
    crowding: 'very_high',
    waitingTime: 0,
    rating: 4.2,
    price: '무료',
    openHours: '24시간',
    lastUpdated: '',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
    description: '세계에서 가장 붐비는 교차로'
  },
  {
    id: '3',
    name: '도쿄 타워',
    category: 'landmark',
    location: '미나토',
    crowding: 'medium',
    waitingTime: 20,
    rating: 4.3,
    price: '900-1,200엔',
    openHours: '09:00-22:30',
    lastUpdated: '',
    imageUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400',
    description: '도쿄의 상징적인 타워'
  },
  {
    id: '4',
    name: '우에노 공원',
    category: 'park',
    location: '우에노',
    crowding: 'medium',
    waitingTime: 0,
    rating: 4.1,
    price: '무료',
    openHours: '05:00-23:00',
    lastUpdated: '',
    imageUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400',
    description: '벚꽃 명소로 유명한 공원'
  },
  {
    id: '5',
    name: '하라주쿠 타케시타 거리',
    category: 'shopping',
    location: '하라주쿠',
    crowding: 'high',
    waitingTime: 30,
    rating: 4.0,
    price: '무료',
    openHours: '10:00-20:00',
    lastUpdated: '',
    imageUrl: 'https://images.unsplash.com/photo-1555992336-03a23b2e5e31?w=400',
    description: '젊은이들의 패션 거리'
  },
  {
    id: '6',
    name: '도쿄 국립박물관',
    category: 'museum',
    location: '우에노',
    crowding: 'low',
    waitingTime: 5,
    rating: 4.6,
    price: '1,000엔',
    openHours: '09:30-17:00',
    lastUpdated: '',
    imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
    description: '일본 최고의 국립박물관'
  },
  {
    id: '7',
    name: '아메요코 시장',
    category: 'market',
    location: '우에노',
    crowding: 'medium',
    waitingTime: 10,
    rating: 4.2,
    price: '무료',
    openHours: '09:00-19:00',
    lastUpdated: '',
    imageUrl: 'https://images.unsplash.com/photo-1555992336-03a23b2e5e31?w=400',
    description: '도쿄 최대 재래시장'
  },
  {
    id: '8',
    name: '도쿄 스카이트리',
    category: 'landmark',
    location: '스미다',
    crowding: 'high',
    waitingTime: 60,
    rating: 4.4,
    price: '2,100-3,100엔',
    openHours: '08:00-22:00',
    lastUpdated: '',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
    description: '일본 최고층 건물'
  },
  {
    id: '9',
    name: '긴자 식스',
    category: 'shopping',
    location: '긴자',
    crowding: 'medium',
    waitingTime: 15,
    rating: 4.3,
    price: '무료',
    openHours: '10:00-21:00',
    lastUpdated: '',
    imageUrl: 'https://images.unsplash.com/photo-1555992336-03a23b2e5e31?w=400',
    description: '고급 쇼핑몰'
  },
  {
    id: '10',
    name: '요요기 공원',
    category: 'park',
    location: '시부야',
    crowding: 'low',
    waitingTime: 0,
    rating: 4.0,
    price: '무료',
    openHours: '24시간',
    lastUpdated: '',
    imageUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400',
    description: '현지인들이 사랑하는 공원'
  }
];

// 도쿄 관광지 정보 가져오기
export async function getTokyoTourismInfo(): Promise<TourismResponse> {
  try {
    // 실제 환경에서는 Google Places API나 관광청 API 사용
    // 현재는 모의 데이터 사용
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // 현재 시간과 요일에 따른 혼잡도 시뮬레이션
        const now = new Date();
        const hour = now.getHours();
        const dayOfWeek = now.getDay(); // 0=일요일, 6=토요일
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const isPeakTime = (hour >= 10 && hour <= 12) || (hour >= 14 && hour <= 17);
        
        const updatedSpots = tokyoTouristSpots.map(spot => {
          let crowding: TouristSpot['crowding'] = spot.crowding;
          let waitingTime = spot.waitingTime;
          
          // 시간대별 혼잡도 조정
          if (isWeekend || isPeakTime) {
            if (spot.crowding === 'low') {
              crowding = 'medium';
              waitingTime += 10;
            } else if (spot.crowding === 'medium') {
              crowding = 'high';
              waitingTime += 20;
            } else if (spot.crowding === 'high') {
              crowding = 'very_high';
              waitingTime += 30;
            }
          } else if (hour < 9 || hour > 20) {
            // 조조/야간 시간대는 혼잡도 감소
            if (spot.crowding === 'very_high') {
              crowding = 'high';
              waitingTime = Math.max(0, waitingTime - 20);
            } else if (spot.crowding === 'high') {
              crowding = 'medium';
              waitingTime = Math.max(0, waitingTime - 15);
            }
          }
          
          return {
            ...spot,
            crowding,
            waitingTime,
            lastUpdated: new Date().toISOString()
          };
        });
        
        // 추천 관광지 (혼잡도가 낮고 평점이 높은 곳)
        const recommendations = updatedSpots
          .filter(spot => spot.crowding === 'low' && spot.rating >= 4.0)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);
        
        resolve({
          spots: updatedSpots,
          totalSpots: updatedSpots.length,
          recommendations
        });
      }, 900);
    });
  } catch (error) {
    console.error('관광지 정보 가져오기 실패:', error);
    
    return {
      spots: [],
      totalSpots: 0,
      recommendations: []
    };
  }
}

// 혼잡도에 따른 색상과 아이콘
export function getCrowdingInfo(crowding: TouristSpot['crowding']): { color: string; icon: string; label: string } {
  switch (crowding) {
    case 'low':
      return { color: '#00AA00', icon: '🟢', label: '한산' };
    case 'medium':
      return { color: '#FF8800', icon: '🟡', label: '보통' };
    case 'high':
      return { color: '#FF4444', icon: '🟠', label: '혼잡' };
    case 'very_high':
      return { color: '#AA0000', icon: '🔴', label: '매우 혼잡' };
    default:
      return { color: '#888888', icon: '⚪', label: '알 수 없음' };
  }
}

// 대기시간에 따른 메시지
export function getWaitingTimeMessage(waitingTime: number): string {
  if (waitingTime === 0) {
    return "대기 없음";
  } else if (waitingTime < 30) {
    return `대기 ${waitingTime}분`;
  } else if (waitingTime < 60) {
    return `대기 ${waitingTime}분 (혼잡)`;
  } else {
    return `대기 ${waitingTime}분 (매우 혼잡)`;
  }
}

// 관광지 카테고리 정보
export function getCategoryInfo(category: TouristSpot['category']) {
  return categoryInfo[category];
}

// 관광지 요약 정보
export function getTourismSummary(spots: TouristSpot[]): string {
  const lowCrowding = spots.filter(s => s.crowding === 'low').length;
  const highCrowding = spots.filter(s => s.crowding === 'high' || s.crowding === 'very_high').length;
  
  if (highCrowding > 0) {
    return `혼잡한 곳 ${highCrowding}개, 한산한 곳 ${lowCrowding}개`;
  } else {
    return `대부분 관광지가 원활합니다 (한산한 곳 ${lowCrowding}개)`;
  }
}

// 방문 추천 메시지
export function getVisitRecommendation(spot: TouristSpot): string {
  const crowdingInfo = getCrowdingInfo(spot.crowding);
  
  if (spot.crowding === 'very_high') {
    return "매우 혼잡합니다. 오전 일찍 방문을 추천합니다.";
  } else if (spot.crowding === 'high') {
    return "혼잡합니다. 평일 오전이나 저녁 방문을 고려하세요.";
  } else if (spot.crowding === 'medium') {
    return "적당히 혼잡합니다. 지금 방문하기 좋습니다.";
  } else {
    return "한산합니다. 지금 방문하기 최적입니다!";
  }
}
