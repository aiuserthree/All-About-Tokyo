// 도쿄 지역별 장소 데이터
export interface Place {
  id: string;
  title: string;
  category: string;
  description?: string;
  image: string;
  distance?: string;
  price?: string;
  rating: number;
  openTime?: string;
  tags: string[];
  lat: number;
  lng: number;
  address: string;
  location: string; // 지역 정보 추가
}

// 신주쿠 지역
export const shinjukuPlaces: Place[] = [
  {
    id: "shinjuku-1",
    title: "이치란 라멘 신주쿠점",
    category: "라멘 전문점",
    description: "24시간 운영하는 유명한 라멘집",
    image: "https://images.unsplash.com/photo-1580827929620-e1a34bc162fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGZvb2QlMjByYW1lbiUyMHN1c2hpfGVufDF8fHx8MTc1ODYyMjA4NXww&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "300m",
    price: "1,200엔",
    rating: 4.5,
    openTime: "24시간",
    tags: ["혼밥OK", "24시간", "한국어"],
    lat: 35.6938,
    lng: 139.7034,
    address: "도쿄도 신주쿠구 신주쿠 3-34-11",
    location: "shinjuku"
  },
  {
    id: "shinjuku-2",
    title: "신주쿠 고렌지",
    category: "일식",
    description: "신주쿠의 유명한 일식당",
    image: "https://images.unsplash.com/photo-1602421312666-5883f16a7c85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHJlc3RhdXJhbnQlMjB0b2t5b3xlbnwxfHx8fDE3NTg2MjIxNzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "500m",
    price: "2,500엔",
    rating: 4.3,
    openTime: "17:00-23:00",
    tags: ["로컬맛집", "한국어"],
    lat: 35.6909,
    lng: 139.7005,
    address: "도쿄도 신주쿠구 신주쿠 3-17-2",
    location: "shinjuku"
  },
  {
    id: "shinjuku-3",
    title: "신주쿠 어드밴스",
    category: "전망대",
    description: "신주쿠의 전망대",
    image: "https://images.unsplash.com/photo-1588486691401-93624c48459b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0b2t5byUyMGNpdHlzY2FwZSUyMHNreWxpbmV8ZW58MXx8fHwxNzU4NTU0NTQ1fDA&ixlib=rb-4.0.3&q=80&w=1080",
    distance: "200m",
    price: "무료",
    rating: 4.2,
    openTime: "9:00-22:00",
    tags: ["무료", "전망", "사진"],
    lat: 35.6909,
    lng: 139.7005,
    address: "도쿄도 신주쿠구 니시신주쿠 1-1-1",
    location: "shinjuku"
  }
];

// 시부야 지역
export const shibuyaPlaces: Place[] = [
  {
    id: "shibuya-1",
    title: "시부야 스크램블 교차로",
    category: "랜드마크",
    description: "세계에서 가장 유명한 교차로",
    image: "https://images.unsplash.com/photo-1693392416487-a2534530b808?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGF0dHJhY3Rpb25zJTIwc2hpYnV5YSUyMGNyb3NzaW5nfGVufDF8fHx8MTc1ODYyMjIwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "100m",
    price: "무료",
    rating: 4.6,
    openTime: "24시간",
    tags: ["무료", "야외", "현대", "사진"],
    lat: 35.6598,
    lng: 139.7006,
    address: "도쿄도 시부야구 시부야 2-1-1",
    location: "shibuya"
  },
  {
    id: "shibuya-2",
    title: "모스버거 시부야점",
    category: "햄버거",
    description: "일본식 햄버거 체인점",
    image: "https://images.unsplash.com/photo-1693822998952-b8d18c61043b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxqYXBhbmVzZSUyMHJlc3RhdXJhbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTg1MDc5NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "200m",
    price: "800엔",
    rating: 4.2,
    openTime: "7:00-23:00",
    tags: ["가성비", "아이동반"],
    lat: 35.6581,
    lng: 139.7016,
    address: "도쿄도 시부야구 시부야 2-15-1",
    location: "shibuya"
  },
  {
    id: "shibuya-3",
    title: "하치코 동상",
    category: "랜드마크",
    description: "충성견 하치코의 동상",
    image: "https://images.unsplash.com/photo-1497995503975-3db53068450a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHRlbXBsZSUyMHNocmluZSUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc1ODYyMjA4OXww&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "50m",
    price: "무료",
    rating: 4.7,
    openTime: "24시간",
    tags: ["무료", "야외", "사진"],
    lat: 35.6593,
    lng: 139.7006,
    address: "도쿄도 시부야구 시부야 1-1-1",
    location: "shibuya"
  }
];

// 긴자 지역
export const ginzaPlaces: Place[] = [
  {
    id: "ginza-1",
    title: "스시 잔마이",
    category: "스시 전문점",
    description: "고급 스시를 맛볼 수 있는 곳",
    image: "https://images.unsplash.com/photo-1602421312666-5883f16a7c85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHJlc3RhdXJhbnQlMjB0b2t5b3xlbnwxfHx8fDE3NTg2MjIxNzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "100m",
    price: "3,000엔",
    rating: 4.7,
    openTime: "11:00-22:00",
    tags: ["로컬맛집", "한국어"],
    lat: 35.6762,
    lng: 139.6503,
    address: "도쿄도 지요다구 긴자 5-2-1",
    location: "ginza"
  },
  {
    id: "ginza-2",
    title: "규카츠 교토 가츠산도",
    category: "돈카츠",
    description: "바삭한 튀김옷과 부드러운 고기",
    image: "https://images.unsplash.com/photo-1580827929620-e1a34bc162fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGZvb2QlMjByYW1lbiUyMHN1c2hpfGVufDF8fHx8MTc1ODYyMjA4NXww&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "300m",
    price: "1,800엔",
    rating: 4.8,
    openTime: "11:30-21:00",
    tags: ["로컬맛집", "가성비"],
    lat: 35.6762,
    lng: 139.6503,
    address: "도쿄도 지요다구 긴자 6-5-1",
    location: "ginza"
  },
  {
    id: "ginza-3",
    title: "긴자 백화점",
    category: "백화점",
    description: "고급 백화점과 명품 쇼핑",
    image: "https://images.unsplash.com/photo-1649773965074-26c817bc7636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0b2t5byUyMHNob3BwaW5nJTIwaGFyYWp1a3UlMjBzdHJlZXR8ZW58MXx8fHwxNzU4NjIyMjUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "200m",
    price: "다양",
    rating: 4.8,
    openTime: "10:00-21:00",
    tags: ["명품", "고급", "면세점"],
    lat: 35.6762,
    lng: 139.6503,
    address: "도쿄도 지요다구 긴자 4-6-16",
    location: "ginza"
  }
];

// 아사쿠사 지역
export const asakusaPlaces: Place[] = [
  {
    id: "asakusa-1",
    title: "센소지 절",
    category: "불교 사찰",
    description: "도쿄에서 가장 오래된 불교 사찰",
    image: "https://images.unsplash.com/photo-1497995503975-3db53068450a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHRlbXBsZSUyMHNocmluZSUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc1ODYyMjA4OXww&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "100m",
    price: "무료",
    rating: 4.8,
    openTime: "6:00-17:00",
    tags: ["무료", "야외", "역사", "사진"],
    lat: 35.7148,
    lng: 139.7967,
    address: "도쿄도 다이토구 아사쿠사 2-3-1",
    location: "asakusa"
  },
  {
    id: "asakusa-2",
    title: "나카미세도리",
    category: "상점가",
    description: "전통 기념품과 간식거리",
    image: "https://images.unsplash.com/photo-1649773965074-26c817bc7636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0b2t5byUyMHNob3BwaW5nJTIwaGFyYWp1a3UlMjBzdHJlZXR8ZW58MXx8fHwxNzU4NjIyMjUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "50m",
    price: "다양",
    rating: 4.4,
    openTime: "9:00-19:00",
    tags: ["전통", "기념품", "흥정가능"],
    lat: 35.7148,
    lng: 139.7967,
    address: "도쿄도 다이토구 아사쿠사 1-36-3",
    location: "asakusa"
  }
];

// 하라주쿠 지역 - 25개 장소
export const harajukuPlaces: Place[] = [
  // 맛집 (10개)
  {
    id: "harajuku-1",
    title: "하라주쿠 라멘 이치란",
    category: "라멘 전문점",
    description: "하라주쿠의 유명한 라멘집",
    image: "https://images.unsplash.com/photo-1580827929620-e1a34bc162fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGZvb2QlMjByYW1lbiUyMHN1c2hpfGVufDF8fHx8MTc1ODYyMjA4NXww&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "200m",
    price: "1,100엔",
    rating: 4.4,
    openTime: "11:00-22:00",
    tags: ["가성비", "혼밥OK"],
    lat: 35.6700,
    lng: 139.7020,
    address: "도쿄도 시부야구 하라주쿠 1-2-1",
    location: "harajuku"
  },
  {
    id: "harajuku-2",
    title: "하라주쿠 스시 마스다",
    category: "스시 전문점",
    description: "하라주쿠의 유명한 스시집",
    image: "https://images.unsplash.com/photo-1602421312666-5883f16a7c85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHJlc3RhdXJhbnQlMjB0b2t5b3xlbnwxfHx8fDE3NTg2MjIxNzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "300m",
    price: "3,800엔",
    rating: 4.6,
    openTime: "18:00-23:00",
    tags: ["고급", "예약필수"],
    lat: 35.6695,
    lng: 139.7015,
    address: "도쿄도 시부야구 하라주쿠 1-3-2",
    location: "harajuku"
  },
  {
    id: "harajuku-3",
    title: "하라주쿠 일식 고렌지",
    category: "일식",
    description: "하라주쿠의 전통 일식당",
    image: "https://images.unsplash.com/photo-1602421312666-5883f16a7c85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHJlc3RhdXJhbnQlMjB0b2t5b3xlbnwxfHx8fDE3NTg2MjIxNzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "150m",
    price: "2,300엔",
    rating: 4.3,
    openTime: "17:00-23:00",
    tags: ["로컬맛집", "한국어"],
    lat: 35.6705,
    lng: 139.7025,
    address: "도쿄도 시부야구 하라주쿠 1-4-3",
    location: "harajuku"
  },
  {
    id: "harajuku-4",
    title: "하라주쿠 이자카야 토라노아나",
    category: "이자카야",
    description: "하라주쿠의 대표 이자카야",
    image: "https://images.unsplash.com/photo-1602421312666-5883f16a7c85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHJlc3RhdXJhbnQlMjB0b2t5b3xlbnwxfHx8fDE3NTg2MjIxNzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "250m",
    price: "2,500엔",
    rating: 4.2,
    openTime: "17:00-02:00",
    tags: ["술", "그룹", "야간"],
    lat: 35.6698,
    lng: 139.7018,
    address: "도쿄도 시부야구 하라주쿠 1-5-1",
    location: "harajuku"
  },
  {
    id: "harajuku-5",
    title: "하라주쿠 카페 스타벅스",
    category: "카페",
    description: "하라주쿠의 트렌디한 카페",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWZlJTIwY3JlcGV8ZW58MXx8fHx8MTc1ODYyMjIxOHww&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "100m",
    price: "550엔",
    rating: 4.1,
    openTime: "7:00-22:00",
    tags: ["카페", "데이트", "트렌디"],
    lat: 35.6702,
    lng: 139.7026,
    address: "도쿄도 시부야구 하라주쿠 1-1-1",
    location: "harajuku"
  },
  {
    id: "harajuku-6",
    title: "하라주쿠 돈카츠 마이스",
    category: "돈카츠",
    description: "하라주쿠의 유명한 돈카츠집",
    image: "https://images.unsplash.com/photo-1580827929620-e1a34bc162fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGZvb2QlMjByYW1lbiUyMHN1c2hpfGVufDF8fHx8MTc1ODYyMjA4NXww&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "180m",
    price: "1,700엔",
    rating: 4.4,
    openTime: "11:30-21:30",
    tags: ["가성비", "혼밥OK", "아이동반"],
    lat: 35.6692,
    lng: 139.7012,
    address: "도쿄도 시부야구 하라주쿠 1-6-2",
    location: "harajuku"
  },
  {
    id: "harajuku-7",
    title: "하라주쿠 우동 야마모토",
    category: "우동",
    description: "하라주쿠의 수제 우동집",
    image: "https://images.unsplash.com/photo-1602421312666-5883f16a7c85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHJlc3RhdXJhbnQlMjB0b2t5b3xlbnwxfHx8fDE3NTg2MjIxNzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "220m",
    price: "1,300엔",
    rating: 4.2,
    openTime: "11:00-21:00",
    tags: ["가성비", "혼밥OK", "전통"],
    lat: 35.6708,
    lng: 139.7028,
    address: "도쿄도 시부야구 하라주쿠 1-7-3",
    location: "harajuku"
  },
  {
    id: "harajuku-8",
    title: "하라주쿠 야키니쿠 한우마을",
    category: "야키니쿠",
    description: "하라주쿠의 고급 야키니쿠집",
    image: "https://images.unsplash.com/photo-1529042410759-befb1204b468?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YWtpbmlrdSUyMHJlc3RhdXJhbnR8ZW58MXx8fHx8MTc1ODYyMjIxN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "350m",
    price: "5,500엔",
    rating: 4.6,
    openTime: "17:00-24:00",
    tags: ["고급", "그룹", "한국어"],
    lat: 35.6690,
    lng: 139.7010,
    address: "도쿄도 시부야구 하라주쿠 1-8-1",
    location: "harajuku"
  },
  {
    id: "harajuku-9",
    title: "하라주쿠 햄버거 모스",
    category: "햄버거",
    description: "하라주쿠의 일본식 햄버거",
    image: "https://images.unsplash.com/photo-1693822998952-b8d18c61043b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxqYXBhbmVzZSUyMHJlc3RhdXJhbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTg1MDc5NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "130m",
    price: "900엔",
    rating: 4.0,
    openTime: "7:00-23:00",
    tags: ["가성비", "아이동반"],
    lat: 35.6703,
    lng: 139.7027,
    address: "도쿄도 시부야구 하라주쿠 1-9-2",
    location: "harajuku"
  },
  {
    id: "harajuku-10",
    title: "하라주쿠 돈부리 야마모토",
    category: "일식",
    description: "하라주쿠의 돈부리 전문점",
    image: "https://images.unsplash.com/photo-1602421312666-5883f16a7c85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHJlc3RhdXJhbnQlMjB0b2t5b3xlbnwxfHx8fDE3NTg2MjIxNzR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "170m",
    price: "1,600엔",
    rating: 4.3,
    openTime: "11:30-21:00",
    tags: ["가성비", "전통", "혼밥OK"],
    lat: 35.6695,
    lng: 139.7015,
    address: "도쿄도 시부야구 하라주쿠 1-10-3",
    location: "harajuku"
  },

  // 명소 (8개)
  {
    id: "harajuku-11",
    title: "메이지 신궁",
    category: "신사",
    description: "도쿄 중심부의 신토 신사",
    image: "https://images.unsplash.com/photo-1497995503975-3db53068450a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHRlbXBsZSUyMHNocmluZSUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc1ODYyMjA4OXww&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "500m",
    price: "무료",
    rating: 4.6,
    openTime: "6:00-18:00",
    tags: ["무료", "야외", "역사", "사진"],
    lat: 35.6762,
    lng: 139.6993,
    address: "도쿄도 시부야구 요요기 1-1",
    location: "harajuku"
  },
  {
    id: "harajuku-12",
    title: "하라주쿠 다케시타 거리",
    category: "랜드마크",
    description: "10대, 트렌디한 거리",
    image: "https://images.unsplash.com/photo-1649773965074-26c817bc7636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0b2t5byUyMHNob3BwaW5nJTIwaGFyYWp1a3UlMjBzdHJlZXR8ZW58MXx8fHwxNzU4NjIyMjUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "100m",
    price: "무료",
    rating: 4.6,
    openTime: "24시간",
    tags: ["무료", "야외", "현대", "사진"],
    lat: 35.6702,
    lng: 139.7026,
    address: "도쿄도 시부야구 하라주쿠 1-17-1",
    location: "harajuku"
  },
  {
    id: "harajuku-13",
    title: "하라주쿠 공원",
    category: "공원",
    description: "하라주쿠의 중심 공원",
    image: "https://images.unsplash.com/photo-1670232095739-a2a959bd9fc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGltcGVyaWFsJTIwcGFsYWNlJTIwZ2FyZGVufGVufDF8fHx8MTc1ODYyMjIwOXww&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "300m",
    price: "무료",
    rating: 4.3,
    openTime: "24시간",
    tags: ["무료", "야외", "가족"],
    lat: 35.6710,
    lng: 139.7030,
    address: "도쿄도 시부야구 하라주쿠 1-12-1",
    location: "harajuku"
  },
  {
    id: "harajuku-14",
    title: "하라주쿠 미술관",
    category: "미술관",
    description: "하라주쿠의 현대 미술관",
    image: "https://images.unsplash.com/photo-1588486691401-93624c48459b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0b2t5byUyMGNpdHlzY2FwZSUyMHNreWxpbmV8ZW58MXx8fHwxNzU4NTU0NTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "400m",
    price: "1,100엔",
    rating: 4.4,
    openTime: "10:00-18:00",
    tags: ["실내", "문화", "현대"],
    lat: 35.6685,
    lng: 139.7005,
    address: "도쿄도 시부야구 하라주쿠 1-14-1",
    location: "harajuku"
  },
  {
    id: "harajuku-15",
    title: "하라주쿠 박물관",
    category: "박물관",
    description: "하라주쿠의 역사 박물관",
    image: "https://images.unsplash.com/photo-1588486691401-93624c48459b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0b2t5byUyMGNpdHlzY2FwZSUyMHNreWxpbmV8ZW58MXx8fHwxNzU4NTU0NTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "500m",
    price: "700엔",
    rating: 4.1,
    openTime: "9:00-17:00",
    tags: ["실내", "역사", "가족"],
    lat: 35.6680,
    lng: 139.7000,
    address: "도쿄도 시부야구 하라주쿠 1-16-2",
    location: "harajuku"
  },
  {
    id: "harajuku-16",
    title: "하라주쿠 정원",
    category: "정원",
    description: "하라주쿠의 아름다운 정원",
    image: "https://images.unsplash.com/photo-1670232095739-a2a959bd9fc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGltcGVyaWFsJTIwcGFsYWNlJTIwZ2FyZGVufGVufDF8fHx8MTc1ODYyMjIwOXww&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "600m",
    price: "무료",
    rating: 4.5,
    openTime: "6:00-20:00",
    tags: ["무료", "야외", "가족"],
    lat: 35.6715,
    lng: 139.7035,
    address: "도쿄도 시부야구 하라주쿠 1-18-3",
    location: "harajuku"
  },
  {
    id: "harajuku-17",
    title: "하라주쿠 전망대",
    category: "전망대",
    description: "하라주쿠의 전망대",
    image: "https://images.unsplash.com/photo-1588486691401-93624c48459b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0b2t5byUyMGNpdHlzY2FwZSUyMHNreWxpbmV8ZW58MXx8fHwxNzU4NTU0NTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "350m",
    price: "1,800엔",
    rating: 4.4,
    openTime: "10:00-22:00",
    tags: ["전망", "사진", "현대"],
    lat: 35.6698,
    lng: 139.7018,
    address: "도쿄도 시부야구 하라주쿠 1-20-1",
    location: "harajuku"
  },
  {
    id: "harajuku-18",
    title: "하라주쿠 랜드마크",
    category: "랜드마크",
    description: "하라주쿠의 대표 랜드마크",
    image: "https://images.unsplash.com/photo-1497995503975-3db53068450a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHRlbXBsZSUyMHNocmluZSUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc1ODYyMjA4OXww&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "120m",
    price: "무료",
    rating: 4.5,
    openTime: "24시간",
    tags: ["무료", "야외", "사진"],
    lat: 35.6705,
    lng: 139.7025,
    address: "도쿄도 시부야구 하라주쿠 1-22-2",
    location: "harajuku"
  },

  // 쇼핑 (7개)
  {
    id: "harajuku-19",
    title: "하라주쿠 다케시타 거리",
    category: "패션·액세서리",
    description: "10대, 트렌디한 아이템",
    image: "https://images.unsplash.com/photo-1649773965074-26c817bc7636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0b2t5byUyMHNob3BwaW5nJTIwaGFyYWp1a3UlMjBzdHJlZXR8ZW58MXx8fHwxNzU4NjIyMjUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "100m",
    price: "다양",
    rating: 4.6,
    openTime: "10:00-20:00",
    tags: ["10대", "트렌디", "저렴"],
    lat: 35.6702,
    lng: 139.7026,
    address: "도쿄도 시부야구 하라주쿠 1-17-1",
    location: "harajuku"
  },
  {
    id: "harajuku-20",
    title: "하라주쿠 쇼핑몰",
    category: "쇼핑몰",
    description: "하라주쿠의 대형 쇼핑몰",
    image: "https://images.unsplash.com/photo-1649773965074-26c817bc7636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0b2t5byUyMHNob3BwaW5nJTIwaGFyYWp1a3UlMjBzdHJlZXR8ZW58MXx8fHwxNzU4NjIyMjUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "150m",
    price: "다양",
    rating: 4.4,
    openTime: "10:00-21:00",
    tags: ["쇼핑몰", "패션", "젊은층"],
    lat: 35.6698,
    lng: 139.7022,
    address: "도쿄도 시부야구 하라주쿠 1-24-1",
    location: "harajuku"
  },
  {
    id: "harajuku-21",
    title: "하라주쿠 백화점",
    category: "백화점",
    description: "하라주쿠의 백화점",
    image: "https://images.unsplash.com/photo-1649773965074-26c817bc7636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0b2t5byUyMHNob3BwaW5nJTIwaGFyYWp1a3UlMjBzdHJlZXR8ZW58MXx8fHwxNzU4NjIyMjUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "200m",
    price: "다양",
    rating: 4.3,
    openTime: "10:00-21:00",
    tags: ["백화점", "면세점", "고급"],
    lat: 35.6695,
    lng: 139.7019,
    address: "도쿄도 시부야구 하라주쿠 1-26-2",
    location: "harajuku"
  },
  {
    id: "harajuku-22",
    title: "하라주쿠 상점가",
    category: "상점가",
    description: "하라주쿠의 전통 상점가",
    image: "https://images.unsplash.com/photo-1649773965074-26c817bc7636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0b2t5byUyMHNob3BwaW5nJTIwaGFyYWp1a3UlMjBzdHJlZXR8ZW58MXx8fHwxNzU4NjIyMjUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "180m",
    price: "다양",
    rating: 4.2,
    openTime: "10:00-20:00",
    tags: ["상점가", "전통", "기념품"],
    lat: 35.6700,
    lng: 139.7020,
    address: "도쿄도 시부야구 하라주쿠 1-28-3",
    location: "harajuku"
  },
  {
    id: "harajuku-23",
    title: "하라주쿠 면세점",
    category: "면세점",
    description: "하라주쿠의 면세점",
    image: "https://images.unsplash.com/photo-1649773965074-26c817bc7636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0b2t5byUyMHNob3BwaW5nJTIwaGFyYWp1a3UlMjBzdHJlZXR8ZW58MXx8fHwxNzU4NjIyMjUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "160m",
    price: "다양",
    rating: 4.5,
    openTime: "10:00-21:00",
    tags: ["면세점", "고급", "기념품"],
    lat: 35.6703,
    lng: 139.7023,
    address: "도쿄도 시부야구 하라주쿠 1-30-1",
    location: "harajuku"
  },
  {
    id: "harajuku-24",
    title: "하라주쿠 시장",
    category: "시장",
    description: "하라주쿠의 전통 시장",
    image: "https://images.unsplash.com/photo-1649773965074-26c817bc7636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0b2t5byUyMHNob3BwaW5nJTIwaGFyYWp1a3UlMjBzdHJlZXR8ZW58MXx8fHwxNzU4NjIyMjUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "250m",
    price: "다양",
    rating: 4.0,
    openTime: "8:00-18:00",
    tags: ["시장", "전통", "흥정가능"],
    lat: 35.6690,
    lng: 139.7010,
    address: "도쿄도 시부야구 하라주쿠 1-32-2",
    location: "harajuku"
  },
  {
    id: "harajuku-25",
    title: "하라주쿠 액세서리 샵",
    category: "패션·액세서리",
    description: "하라주쿠의 액세서리 전문점",
    image: "https://images.unsplash.com/photo-1649773965074-26c817bc7636?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0b2t5byUyMHNob3BwaW5nJTIwaGFyYWp1a3UlMjBzdHJlZXR8ZW58MXx8fHwxNzU4NjIyMjUwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    distance: "140m",
    price: "다양",
    rating: 4.1,
    openTime: "11:00-20:00",
    tags: ["액세서리", "젊은층", "저렴"],
    lat: 35.6705,
    lng: 139.7025,
    address: "도쿄도 시부야구 하라주쿠 1-34-3",
    location: "harajuku"
  }
];

// 모든 장소 데이터 통합
export const allTokyoPlaces: Place[] = [
  ...shinjukuPlaces,
  ...shibuyaPlaces,
  ...ginzaPlaces,
  ...asakusaPlaces,
  ...harajukuPlaces,
  ...uenoPlaces,
  ...roppongiPlaces,
  ...otherPlaces,
  ...cafePlaces
];

// 지역별 장소 데이터 매핑
export const placesByLocation: { [key: string]: Place[] } = {
  all: allTokyoPlaces,
  shinjuku: shinjukuPlaces,
  shibuya: shibuyaPlaces,
  ginza: ginzaPlaces,
  asakusa: asakusaPlaces,
  harajuku: harajukuPlaces,
  roppongi: roppongiPlaces,
  ueno: uenoPlaces,
  other: otherPlaces,
  cafe: cafePlaces,
  akihabara: [],
  tsukiji: [],
  "tokyo-station": [],
  skytree: []
};

// 장소 타입별 분류
export const placesByType: { [key: string]: Place[] } = {
  restaurant: allTokyoPlaces.filter(place => 
    ['라멘 전문점', '일식', '햄버거', '스시 전문점', '돈카츠', '우동', '소바', '야키니쿠', '이자카야', '양식', '이탈리안', '야키토리', '라멘', '몬자야키', '로바타'].includes(place.category)
  ),
  attraction: allTokyoPlaces.filter(place => 
    ['전망대', '랜드마크', '불교 사찰', '신사', '공원', '정원', '명소', '산책로', '사찰', '미술관', '박물관', '전시관'].includes(place.category)
  ),
  shopping: allTokyoPlaces.filter(place => 
    ['백화점', '상점가', '패션·액세서리', '쇼핑몰', '면세점', '쇼핑', '서점', '시장'].includes(place.category)
  ),
  cafe: allTokyoPlaces.filter(place => 
    ['카페', '바', '테마카페'].includes(place.category)
  ),
  culture: allTokyoPlaces.filter(place => 
    ['문화행사', '미술관', '박물관', '교통', '전시관'].includes(place.category)
  ),
  dessert: allTokyoPlaces.filter(place => 
    ['디저트', '당고'].includes(place.category)
  )
};
