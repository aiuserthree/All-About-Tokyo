// 도쿄 이벤트/축제 정보 API 서비스 - 모바일 최적화
export interface EventData {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: 'festival' | 'exhibition' | 'concert' | 'sports' | 'cultural' | 'food' | 'art';
  price: string;
  imageUrl?: string;
  status: 'ongoing' | 'upcoming' | 'ended';
  popularity: 'low' | 'medium' | 'high';
}

export interface EventsResponse {
  events: EventData[];
  totalEvents: number;
  featuredEvent?: EventData;
}

// 이벤트 카테고리별 아이콘과 색상
const categoryInfo: Record<EventData['category'], { icon: string; color: string; label: string }> = {
  festival: { icon: '🎪', color: '#FF6B6B', label: '축제' },
  exhibition: { icon: '🖼️', color: '#4ECDC4', label: '전시회' },
  concert: { icon: '🎵', color: '#45B7D1', label: '콘서트' },
  sports: { icon: '⚽', color: '#96CEB4', label: '스포츠' },
  cultural: { icon: '🏛️', color: '#FFEAA7', label: '문화' },
  food: { icon: '🍱', color: '#DDA0DD', label: '푸드' },
  art: { icon: '🎨', color: '#98D8C8', label: '아트' }
};

// 모의 이벤트 데이터
const mockEvents: EventData[] = [
  {
    id: '1',
    title: '도쿄 스카이트리 스타라이트 가든',
    description: '도쿄 스카이트리에서 펼쳐지는 야간 조명 축제',
    date: new Date().toISOString().split('T')[0],
    time: '18:00-22:00',
    location: '도쿄 스카이트리',
    category: 'festival',
    price: '무료',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
    status: 'ongoing',
    popularity: 'high'
  },
  {
    id: '2',
    title: '아사쿠사 센소지 사원 축제',
    description: '전통 사원 축제와 민속 공연',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '10:00-20:00',
    location: '아사쿠사 센소지',
    category: 'cultural',
    price: '무료',
    imageUrl: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400',
    status: 'upcoming',
    popularity: 'high'
  },
  {
    id: '3',
    title: '시부야 스트리트 푸드 페스티벌',
    description: '일본 전통 음식과 현대 퓨전 요리 체험',
    date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
    time: '11:00-21:00',
    location: '시부야 스크램블 스퀘어',
    category: 'food',
    price: '2,000-5,000엔',
    imageUrl: 'https://images.unsplash.com/photo-1555992336-03a23b2e5e31?w=400',
    status: 'upcoming',
    popularity: 'medium'
  },
  {
    id: '4',
    title: '도쿄 국립박물관 특별전',
    description: '일본 전통 미술품과 역사 유물 전시',
    date: new Date(Date.now() + 259200000).toISOString().split('T')[0],
    time: '09:30-17:00',
    location: '도쿄 국립박물관',
    category: 'exhibition',
    price: '1,000엔',
    imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
    status: 'upcoming',
    popularity: 'medium'
  },
  {
    id: '5',
    title: '하라주쿠 스트리트 아트 쇼',
    description: '젊은 아티스트들의 거리 미술 전시',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    time: '12:00-18:00',
    location: '하라주쿠 타케시타 거리',
    category: 'art',
    price: '무료',
    imageUrl: 'https://images.unsplash.com/photo-1555992336-03a23b2e5e31?w=400',
    status: 'ended',
    popularity: 'low'
  },
  {
    id: '6',
    title: '도쿄 돔 야구 경기',
    description: '야쿠르트 스왈로스 vs 한신 타이거스',
    date: new Date(Date.now() + 345600000).toISOString().split('T')[0],
    time: '18:00-21:00',
    location: '도쿄 돔',
    category: 'sports',
    price: '3,000-8,000엔',
    imageUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
    status: 'upcoming',
    popularity: 'high'
  },
  {
    id: '7',
    title: '긴자 야간 조명 쇼',
    description: '긴자 거리의 화려한 야간 조명 축제',
    date: new Date().toISOString().split('T')[0],
    time: '19:00-23:00',
    location: '긴자 거리',
    category: 'festival',
    price: '무료',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
    status: 'ongoing',
    popularity: 'medium'
  },
  {
    id: '8',
    title: '우에노 공원 벚꽃 축제',
    description: '봄 벚꽃 시즌 특별 이벤트',
    date: new Date(Date.now() + 432000000).toISOString().split('T')[0],
    time: '09:00-21:00',
    location: '우에노 공원',
    category: 'festival',
    price: '무료',
    imageUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?w=400',
    status: 'upcoming',
    popularity: 'high'
  }
];

// 도쿄 이벤트 정보 가져오기
export async function getTokyoEvents(): Promise<EventsResponse> {
  try {
    // 실제 환경에서는 도쿄 관광청 API나 Eventbrite API 사용
    // 현재는 모의 데이터 사용
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // 현재 시간 기준으로 이벤트 상태 업데이트
        const now = new Date();
        const updatedEvents = mockEvents.map(event => {
          const eventDate = new Date(event.date);
          const today = new Date(now.toDateString());
          const eventDay = new Date(eventDate.toDateString());
          
          let status: EventData['status'] = 'upcoming';
          if (eventDay < today) {
            status = 'ended';
          } else if (eventDay.getTime() === today.getTime()) {
            status = 'ongoing';
          }
          
          return { ...event, status };
        });
        
        // 진행 중이거나 예정된 이벤트만 필터링
        const activeEvents = updatedEvents.filter(event => event.status !== 'ended');
        
        // 인기 이벤트를 피처드 이벤트로 설정
        const featuredEvent = activeEvents.find(event => event.popularity === 'high') || activeEvents[0];
        
        resolve({
          events: activeEvents,
          totalEvents: activeEvents.length,
          featuredEvent
        });
      }, 700);
    });
  } catch (error) {
    console.error('이벤트 정보 가져오기 실패:', error);
    
    return {
      events: [],
      totalEvents: 0
    };
  }
}

// 이벤트 카테고리 정보 가져오기
export function getCategoryInfo(category: EventData['category']) {
  return categoryInfo[category];
}

// 이벤트 상태에 따른 색상
export function getEventStatusColor(status: EventData['status']): string {
  switch (status) {
    case 'ongoing': return '#00AA00';
    case 'upcoming': return '#FF8800';
    case 'ended': return '#888888';
    default: return '#666666';
  }
}

// 인기도에 따른 아이콘
export function getPopularityIcon(popularity: EventData['popularity']): string {
  switch (popularity) {
    case 'high': return '🔥';
    case 'medium': return '⭐';
    case 'low': return '💫';
    default: return '✨';
  }
}

// 이벤트 요약 정보
export function getEventsSummary(events: EventData[]): string {
  const ongoingCount = events.filter(e => e.status === 'ongoing').length;
  const upcomingCount = events.filter(e => e.status === 'upcoming').length;
  
  if (ongoingCount > 0 && upcomingCount > 0) {
    return `진행 중: ${ongoingCount}개, 예정: ${upcomingCount}개`;
  } else if (ongoingCount > 0) {
    return `현재 ${ongoingCount}개 이벤트 진행 중`;
  } else if (upcomingCount > 0) {
    return `${upcomingCount}개 이벤트 예정`;
  } else {
    return "현재 예정된 이벤트가 없습니다";
  }
}

// 시간 포맷팅
export function formatEventTime(date: string, time: string): string {
  const eventDate = new Date(date);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  let dateLabel = '';
  if (eventDate.toDateString() === today.toDateString()) {
    dateLabel = '오늘';
  } else if (eventDate.toDateString() === tomorrow.toDateString()) {
    dateLabel = '내일';
  } else {
    dateLabel = eventDate.toLocaleDateString('ko-KR', { 
      month: 'short', 
      day: 'numeric' 
    });
  }
  
  return `${dateLabel} ${time}`;
}
