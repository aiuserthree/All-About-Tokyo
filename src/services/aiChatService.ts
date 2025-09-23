// 무료 AI 챗봇 서비스 (모의 응답)
export interface AIResponse {
  content: string;
  recommendations?: Array<{
    title: string;
    category: string;
    description?: string;
    image?: string;
    rating?: number;
    distance?: string;
  }>;
}

// 도쿄 여행 관련 미리 정의된 응답들
const mockResponses: { [key: string]: AIResponse } = {
  // 맛집 관련
  "맛집": {
    content: "도쿄의 맛집을 추천해드릴게요! 🍜\n\n**라멘**: 이치란 라멘 신주쿠점 (24시간 운영, 1,200엔)\n**스시**: 스시 잔마이 (고급 스시, 3,000엔)\n**돈카츠**: 규카츠 교토 가츠산도 (가성비 좋음, 1,800엔)\n\n**팁**: 대부분의 맛집은 현금 결제를 선호해요!",
    recommendations: [
      {
        title: "이치란 라멘 신주쿠점",
        category: "라멘 전문점",
        description: "24시간 운영하는 유명한 라멘집",
        rating: 4.5,
        distance: "300m"
      },
      {
        title: "스시 잔마이",
        category: "스시 전문점", 
        description: "고급 스시를 맛볼 수 있는 곳",
        rating: 4.7,
        distance: "500m"
      }
    ]
  },
  "라멘": {
    content: "도쿄의 라멘을 추천해드릴게요! 🍜\n\n**이치란 라멘 신주쿠점**\n- 24시간 운영\n- 가격: 1,200엔\n- 특징: 진한 돈코츠 라멘\n\n**라멘 에티켓**:\n- 소리내서 먹어도 괜찮아요\n- 젓가락과 숟가락을 함께 사용\n- 국물까지 다 마시는 것이 예의"
  },
  "스시": {
    content: "도쿄의 스시를 추천해드릴게요! 🍣\n\n**스시 잔마이**\n- 가격: 3,000엔\n- 특징: 신선한 생선과 정통 스시\n\n**스시 에티켓**:\n- 손으로 먹는 것이 전통\n- 와사비는 이미 들어있어요\n- 간장은 생선 부분에만 찍기"
  },
  "돈카츠": {
    content: "도쿄의 돈카츠를 추천해드릴게요! 🐷\n\n**규카츠 교토 가츠산도**\n- 가격: 1,800엔\n- 특징: 바삭한 튀김옷과 부드러운 고기\n\n**돈카츠 팁**:\n- 소스는 한 번에 많이 찍지 마세요\n- 양배추와 함께 먹으면 더 맛있어요"
  },

  // 관광지 관련
  "관광지": {
    content: "도쿄의 관광지를 추천해드릴게요! 🗼\n\n**센소지 절** (무료)\n- 도쿄에서 가장 오래된 절\n- 아사쿠사 지역의 상징\n\n**도쿄 스카이트리** (2,100엔)\n- 634m 높이의 전망대\n- 일몰 시간이 가장 아름다워요\n\n**시부야 스크램블 교차로** (무료)\n- 세계에서 가장 유명한 교차로\n- 저녁 7-9시가 가장 활기차요",
    recommendations: [
      {
        title: "센소지 절",
        category: "불교 사찰",
        description: "도쿄에서 가장 오래된 불교 사찰",
        rating: 4.8,
        distance: "500m"
      },
      {
        title: "도쿄 스카이트리",
        category: "전망대",
        description: "634m 높이의 전망대",
        rating: 4.7,
        distance: "2.5km"
      }
    ]
  },
  "센소지": {
    content: "센소지 절에 대해 알려드릴게요! 🏛️\n\n**입장료**: 무료\n**운영시간**: 6:00-17:00\n**주소**: 도쿄도 다이토구 아사쿠사 2-3-1\n\n**볼거리**:\n- 대문(카미나리몬)\n- 본당(호도)\n- 5층탑\n- 나카미세도리 상점가\n\n**팁**: 오전 8-10시가 가장 한적해요!"
  },
  "스카이트리": {
    content: "도쿄 스카이트리에 대해 알려드릴게요! 🗼\n\n**입장료**: 2,100엔\n**운영시간**: 8:00-22:00\n**주소**: 도쿄도 스미다구 오시아게 1-1-2\n\n**볼거리**:\n- 350m 전망대 (텐카이데크)\n- 450m 전망대 (텐카이갤러리)\n- 스카이트리 타운\n\n**팁**: 일몰 시간(17:00-19:00)이 가장 아름다워요!"
  },

  // 쇼핑 관련
  "쇼핑": {
    content: "도쿄의 쇼핑을 추천해드릴게요! 🛍️\n\n**하라주쿠 다케시타 거리**\n- 10대, 트렌디한 아이템\n- 가격: 저렴\n\n**긴자**\n- 명품, 고급 브랜드\n- 면세점 이용 가능\n\n**아메요코 시장**\n- 전통 기념품\n- 흥정 가능\n\n**팁**: 5,000엔 이상 구매 시 Tax Free 가능!",
    recommendations: [
      {
        title: "하라주쿠 다케시타 거리",
        category: "패션·액세서리",
        description: "10대, 트렌디한 아이템",
        rating: 4.6,
        distance: "800m"
      },
      {
        title: "긴자",
        category: "명품·백화점",
        description: "명품, 고급 브랜드",
        rating: 4.8,
        distance: "2.1km"
      }
    ]
  },
  "기념품": {
    content: "도쿄 기념품을 추천해드릴게요! 🎁\n\n**인기 기념품**:\n- 킷캣 말차맛 (1,000-1,500엔)\n- 도쿄 바나나 (1,200엔)\n- 로이스 초콜릿 (2,000엔)\n- 유카타 (5,000-15,000엔)\n\n**구매처**:\n- 도쿄역 기념품샵\n- 하네다 공항 면세점\n- 아메요코 시장\n\n**팁**: 공항에서 구매하면 무게 걱정 없어요!"
  },

  // 교통 관련
  "교통": {
    content: "도쿄 교통 정보를 알려드릴게요! 🚇\n\n**JR 패스**:\n- 7일권: 29,650엔\n- JR 전선 무제한 이용\n\n**지하철**:\n- 도쿄 메트로 1일권: 800엔\n- 도에이 지하철 1일권: 700엔\n\n**택시**:\n- 기본요금: 410엔 (1km)\n- 밤 10시-오전 5시: 20% 할증\n\n**팁**: IC카드(Suica/Pasmo) 사용이 가장 편해요!"
  },
  "지하철": {
    content: "도쿄 지하철 이용법을 알려드릴게요! 🚇\n\n**주요 노선**:\n- JR 야마노테선 (순환선)\n- 도쿄 메트로 긴자선\n- 도에이 아사쿠사선\n\n**이용 방법**:\n1. IC카드(Suica/Pasmo) 구매\n2. 카드 터치하여 입장\n3. 목적지까지 이동\n4. 카드 터치하여 출장\n\n**팁**: 구글맵으로 경로 확인하세요!"
  },

  // 지역별 응답
  "신주쿠": {
    content: "신주쿠 지역을 추천해드릴게요! 🏢\n\n**맛집**:\n• 이치란 라멘 신주쿠점 (24시간 라멘)\n• 신주쿠 고렌지 (일식)\n\n**명소**:\n• 신주쿠 어드밴스 (전망대)\n• 신주쿠 어드밴스 (무료 전망)\n\n**특징**:\n• 도쿄의 비즈니스 중심가\n• 밤문화가 발달한 지역\n• 교통편이 매우 편리해요",
    recommendations: [
      {
        title: "이치란 라멘 신주쿠점",
        category: "라멘 전문점",
        description: "24시간 운영하는 유명한 라멘집",
        rating: 4.5,
        distance: "300m"
      },
      {
        title: "신주쿠 어드밴스",
        category: "전망대",
        description: "신주쿠의 전망대",
        rating: 4.2,
        distance: "200m"
      }
    ]
  },
  "시부야": {
    content: "시부야 지역을 추천해드릴게요! 🚦\n\n**명소**:\n• 시부야 스크램블 교차로 (무료)\n• 하치코 동상 (무료)\n\n**맛집**:\n• 모스버거 시부야점 (햄버거)\n\n**특징**:\n• 젊은이들의 거리\n• 패션과 문화의 중심지\n• 밤늦게까지 활기차요",
    recommendations: [
      {
        title: "시부야 스크램블 교차로",
        category: "랜드마크",
        description: "세계에서 가장 유명한 교차로",
        rating: 4.6,
        distance: "100m"
      },
      {
        title: "하치코 동상",
        category: "랜드마크",
        description: "충성견 하치코의 동상",
        rating: 4.7,
        distance: "50m"
      }
    ]
  },
  "긴자": {
    content: "긴자 지역을 추천해드릴게요! 💎\n\n**맛집**:\n• 스시 잔마이 (고급 스시)\n• 규카츠 교토 가츠산도 (돈카츠)\n\n**쇼핑**:\n• 긴자 백화점 (명품 쇼핑)\n\n**특징**:\n• 고급 쇼핑의 중심지\n• 명품 브랜드 집중\n• 세련된 분위기",
    recommendations: [
      {
        title: "스시 잔마이",
        category: "스시 전문점",
        description: "고급 스시를 맛볼 수 있는 곳",
        rating: 4.7,
        distance: "100m"
      },
      {
        title: "긴자 백화점",
        category: "백화점",
        description: "고급 백화점과 명품 쇼핑",
        rating: 4.8,
        distance: "200m"
      }
    ]
  },
  "아사쿠사": {
    content: "아사쿠사 지역을 추천해드릴게요! 🏛️\n\n**명소**:\n• 센소지 절 (무료)\n• 나카미세도리 (상점가)\n\n**특징**:\n• 전통적인 도쿄의 모습\n• 기념품 쇼핑의 천국\n• 역사와 문화가 살아있는 곳",
    recommendations: [
      {
        title: "센소지 절",
        category: "불교 사찰",
        description: "도쿄에서 가장 오래된 불교 사찰",
        rating: 4.8,
        distance: "100m"
      },
      {
        title: "나카미세도리",
        category: "상점가",
        description: "전통 기념품과 간식거리",
        rating: 4.4,
        distance: "50m"
      }
    ]
  },
  "하라주쿠": {
    content: "하라주쿠 지역을 추천해드릴게요! 👗\n\n**쇼핑**:\n• 하라주쿠 다케시타 거리 (패션)\n\n**명소**:\n• 메이지 신궁 (무료)\n\n**특징**:\n• 10대, 20대의 트렌드 중심지\n• 독특한 패션과 문화\n• 젊은 에너지가 넘치는 곳",
    recommendations: [
      {
        title: "하라주쿠 다케시타 거리",
        category: "패션·액세서리",
        description: "10대, 트렌디한 아이템",
        rating: 4.6,
        distance: "100m"
      },
      {
        title: "메이지 신궁",
        category: "신사",
        description: "도쿄 중심부의 신토 신사",
        rating: 4.6,
        distance: "500m"
      }
    ]
  },

  // 기본 응답
  "default": {
    content: "도쿄 여행에 대해 무엇이든 물어보세요! 🗼\n\n**추천 질문**:\n• 맛집 추천해줘\n• 관광지 어디가 좋아?\n• 쇼핑은 어디서 해야 해?\n• 교통편은 어떻게 이용해?\n• 기념품 뭐가 좋아?\n• 신주쿠 맛집 알려줘\n• 시부야 관광지 추천해줘\n• 긴자 쇼핑 어때?\n\n도쿄 여행의 모든 것을 도와드릴게요! 😊"
  }
};

// 키워드 매칭 함수
function findBestResponse(userMessage: string): AIResponse {
  const message = userMessage.toLowerCase();
  
  // 키워드별 매칭
  if (message.includes('맛집') || message.includes('음식') || message.includes('식당')) {
    if (message.includes('라멘')) return mockResponses['라멘'];
    if (message.includes('스시')) return mockResponses['스시'];
    if (message.includes('돈카츠')) return mockResponses['돈카츠'];
    return mockResponses['맛집'];
  }
  
  if (message.includes('관광지') || message.includes('명소') || message.includes('볼거리')) {
    if (message.includes('센소지')) return mockResponses['센소지'];
    if (message.includes('스카이트리')) return mockResponses['스카이트리'];
    return mockResponses['관광지'];
  }
  
  if (message.includes('쇼핑') || message.includes('쇼핑몰') || message.includes('백화점')) {
    if (message.includes('기념품')) return mockResponses['기념품'];
    return mockResponses['쇼핑'];
  }
  
  if (message.includes('교통') || message.includes('지하철') || message.includes('버스') || message.includes('택시')) {
    if (message.includes('지하철')) return mockResponses['지하철'];
    return mockResponses['교통'];
  }
  
  // 지역별 응답
  if (message.includes('신주쿠')) {
    return mockResponses['신주쿠'];
  }
  
  if (message.includes('시부야')) {
    return mockResponses['시부야'];
  }
  
  if (message.includes('긴자')) {
    return mockResponses['긴자'];
  }
  
  if (message.includes('아사쿠사')) {
    return mockResponses['아사쿠사'];
  }
  
  if (message.includes('하라주쿠')) {
    return mockResponses['하라주쿠'];
  }
  
  if (message.includes('안녕') || message.includes('hello') || message.includes('hi')) {
    return mockResponses['default'];
  }
  
  // 기본 응답
  return mockResponses['default'];
}

// AI 챗봇 서비스 클래스
export class AIChatService {
  async sendMessage(message: string): Promise<AIResponse> {
    // 실제 API 호출 대신 모의 응답 반환
    return new Promise((resolve) => {
      // 실제 API처럼 약간의 지연 시간 추가
      setTimeout(() => {
        const response = findBestResponse(message);
        resolve(response);
      }, 1000 + Math.random() * 1000); // 1-2초 랜덤 지연
    });
  }
}

// 싱글톤 인스턴스
export const aiChatService = new AIChatService();