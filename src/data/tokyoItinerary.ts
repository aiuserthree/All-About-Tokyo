// 도쿄 3일 여행 일정 데이터
import { Place } from './tokyoLocations';

export interface ItineraryItem {
  id: string;
  time: string;
  place: string;
  activity: string;
  travelTime?: string;
  notes?: string;
  placeInfo?: Place; // 기존 장소 데이터와 연결
}

export interface DayItinerary {
  day: number;
  title: string;
  description: string;
  items: ItineraryItem[];
  tips?: string[];
}

// 1일차 일정
export const day1Itinerary: DayItinerary = {
  day: 1,
  title: "공항 → 숙소 → 도쿄타워 → 오다이바 → 츠키시마",
  description: "첫날 도쿄의 대표 랜드마크들을 둘러보며 도쿄의 매력을 느껴보세요",
  items: [
    {
      id: "day1-1",
      time: "14:00",
      place: "숙소",
      activity: "체크인 및 짐 정리",
      notes: "도쿄 도심 숙소 추천"
    },
    {
      id: "day1-2", 
      time: "15:00",
      place: "츠지한 도쿄 미드타운점",
      activity: "점심식사",
      notes: "카이센동 전문점 - 미드타운점이 웨이팅 덜함"
    },
    {
      id: "day1-3",
      time: "16:30", 
      place: "도쿄타워 세븐일레븐",
      activity: "포토스팟 도착",
      travelTime: "지하철 30분",
      notes: "세븐일레븐과 도쿄타워 조합 포토스팟"
    },
    {
      id: "day1-4",
      time: "17:00",
      place: "도쿄타워",
      activity: "일몰 사진 촬영",
      notes: "도쿄의 상징적인 랜드마크"
    },
    {
      id: "day1-5",
      time: "18:30",
      place: "오다이바",
      activity: "건담 구경 및 사진 촬영", 
      travelTime: "50분",
      notes: "다이바시티 도쿄 프라자에서 건담 앞에서 사진"
    },
    {
      id: "day1-6",
      time: "19:15",
      place: "오다이바 해변",
      activity: "해변 산책",
      travelTime: "도보 15분",
      notes: "야경 감상하기 좋은 해변"
    },
    {
      id: "day1-7",
      time: "19:30",
      place: "해변 카페",
      activity: "커피/아이스크림과 야경 감상",
      notes: "오다이바 해변 근처 카페"
    },
    {
      id: "day1-8",
      time: "21:00",
      place: "몬자사토",
      activity: "몬자야키 저녁식사",
      travelTime: "지하철 40분",
      notes: "전통 몬자야키 맛집"
    },
    {
      id: "day1-9",
      time: "22:30",
      place: "숙소",
      activity: "편의점 쇼핑 후 숙소에서 2차",
      notes: "편의점에서 간식과 음료 구매"
    }
  ],
  tips: [
    "지하철 패스 구매 권장",
    "도쿄타워 일몰 시간 확인 필수",
    "오다이바는 야경이 아름다우니 충분히 감상하세요"
  ]
};

// 2일차 일정
export const day2Itinerary: DayItinerary = {
  day: 2,
  title: "오모테산도 → 시부야 → 하라주쿠 → 신주쿠 → 이자카야",
  description: "도쿄의 핫한 지역들을 둘러보며 쇼핑과 맛집 탐방을 즐겨보세요",
  items: [
    {
      id: "day2-1",
      time: "11:00",
      place: "점심식사",
      activity: "점심식사",
      notes: "자유롭게 선택"
    },
    {
      id: "day2-2",
      time: "13:00",
      place: "오모테산도",
      activity: "카페 타임",
      notes: "도쿄의 압구정 로데오 - 고급 쇼핑 거리"
    },
    {
      id: "day2-3",
      time: "14:00",
      place: "시부야",
      activity: "쇼핑 및 관광",
      notes: "시부야 스카이, 스크램블 스퀘어 등"
    },
    {
      id: "day2-4",
      time: "자유시간",
      place: "하라주쿠",
      activity: "자유시간 (선택)",
      notes: "시간 여유시 하라주쿠 타케시타 거리"
    },
    {
      id: "day2-5",
      time: "17:00",
      place: "신주쿠",
      activity: "쇼핑 및 관광",
      notes: "신주쿠의 다양한 쇼핑몰과 거리"
    },
    {
      id: "day2-6",
      time: "19:00-20:00",
      place: "멘야스고",
      activity: "츠케멘 저녁식사",
      notes: "멘야스고 등 츠케멘 전문점"
    },
    {
      id: "day2-7",
      time: "밤",
      place: "곤파치 니시아자부",
      activity: "이자카야",
      notes: "곤파치 니시아자부, 하카타 꼬치전문점 조우몬 등"
    },
    {
      id: "day2-8",
      time: "귀가",
      place: "숙소",
      activity: "귀가",
      travelTime: "신주쿠→숙소 40분",
      notes: "문 아트 나이트 선택 가능"
    }
  ],
  tips: [
    "오모테산도는 고급 쇼핑 거리입니다",
    "시부야 스카이는 예약이 필요할 수 있습니다",
    "이자카야는 예약을 미리 하는 것이 좋습니다"
  ]
};

// 3일차 일정  
export const day3Itinerary: DayItinerary = {
  day: 3,
  title: "도쿄역 → 우에노 → 아사쿠사/우에노공원/긴자 → 공항",
  description: "마지막 날, 도쿄의 전통과 현대를 모두 경험해보세요",
  items: [
    {
      id: "day3-1",
      time: "10:00",
      place: "도쿄역",
      activity: "체크아웃 후 캐리어 보관",
      notes: "도쿄역에서 캐리어 보관소 이용"
    },
    {
      id: "day3-2",
      time: "11:00",
      place: "치즈철판버거",
      activity: "점심",
      notes: "도쿄역 근처 치즈철판버거 맛집"
    },
    {
      id: "day3-3",
      time: "13:00",
      place: "아사쿠사 센소지",
      activity: "전통 문화 체험",
      notes: "• 아사쿠사 센소지\n• 우에노공원\n• 긴자 쇼핑"
    },
    {
      id: "day3-4",
      time: "15:30",
      place: "이른 저녁/디저트 빵",
      activity: "선택사항",
      notes: "마지막 도쿄 맛집 탐방"
    },
    {
      id: "day3-5",
      time: "16:00-16:30",
      place: "도쿄역",
      activity: "공항버스 탑승",
      travelTime: "공항까지 1시간 2분",
      notes: "도쿄역에서 공항버스 이용"
    }
  ],
  tips: [
    "아사쿠사 센소지는 전통적인 일본 문화를 경험할 수 있습니다",
    "우에노공원은 벚꽃 시즌에 특히 아름답습니다",
    "긴자는 고급 쇼핑과 미슐랭 맛집이 많습니다"
  ]
};

// 모든 일정 데이터
export const allItineraries: DayItinerary[] = [
  day1Itinerary,
  day2Itinerary, 
  day3Itinerary
];

// 일정별 장소 매핑 함수
export const getPlaceInfo = (placeName: string, allPlaces: Place[]): Place | undefined => {
  // 정확한 매칭을 위한 키워드 매핑
  const placeMappings: { [key: string]: string[] } = {
    "도쿄타워": ["도쿄타워"],
    "오다이바": ["다이바시티", "건담"],
    "몬자사토": ["몬자사토"],
    "츠지한": ["츠지한"],
    "오모테산도": ["오모테산도", "도큐 플라자"],
    "시부야": ["시부야", "시부야 스카이", "시부야 스크램블"],
    "하라주쿠": ["하라주쿠", "타케시타"],
    "신주쿠": ["신주쿠", "곤파치", "하카타"],
    "멘야스고": ["멘야스고"],
    "곤파치": ["곤파치"],
    "아사쿠사": ["아사쿠사", "센소지", "아사쿠사 센소지"],
    "우에노": ["우에노", "우에노공원"],
    "긴자": ["긴자", "긴자 식스"]
  };

  // 매핑된 키워드로 검색
  for (const [key, keywords] of Object.entries(placeMappings)) {
    if (placeName.includes(key)) {
      for (const keyword of keywords) {
        const matchedPlace = allPlaces.find(place => 
          place.title.includes(keyword) || 
          place.address.includes(keyword) ||
          place.tags.some(tag => tag.includes(keyword))
        );
        if (matchedPlace) return matchedPlace;
      }
    }
  }

  // 정확한 이름 매칭 (우선순위 높음)
  const exactMatch = allPlaces.find(place => 
    place.title === placeName
  );
  if (exactMatch) return exactMatch;

  // 특별한 케이스들 처리
  if (placeName === "아사쿠사 센소지") {
    const asakusaSensoji = allPlaces.find(place => 
      place.title.includes("아사쿠사") && place.title.includes("센소지")
    );
    if (asakusaSensoji) return asakusaSensoji;
  }

  // 일반적인 검색
  const matchedPlace = allPlaces.find(place => 
    place.title.includes(placeName) || 
    placeName.includes(place.title) ||
    place.address.includes(placeName)
  );
  
  return matchedPlace;
};

// 특정 일정의 장소 정보 업데이트
export const updateItineraryWithPlaces = (itinerary: DayItinerary, allPlaces: Place[]): DayItinerary => {
  const updatedItems = itinerary.items.map(item => {
    const placeInfo = getPlaceInfo(item.place, allPlaces);
    return {
      ...item,
      placeInfo
    };
  });
  
  return {
    ...itinerary,
    items: updatedItems
  };
};
