// 생활 일본어 표현 데이터

export interface JapanesePhrase {
  id: string;
  category: string;
  situation: string;
  japanese: string;
  pronunciation: string; // 한국어 발음
  meaning: string;
  usage: string;
  isEssential: boolean; // 필수 표현 여부
}

export const japanesePhrases: JapanesePhrase[] = [
  // 인사 및 기본 예의
  {
    id: 'greeting_01',
    category: 'greeting',
    situation: '상점/식당 입장 시',
    japanese: 'こんにちは',
    pronunciation: '콘니치와',
    meaning: '안녕하세요',
    usage: '낮 시간 인사 (10시~오후 6시)',
    isEssential: true
  },
  {
    id: 'greeting_02',
    category: 'greeting',
    situation: '저녁 시간 인사',
    japanese: 'こんばんは',
    pronunciation: '콘반와',
    meaning: '안녕하세요 (저녁)',
    usage: '저녁 시간 인사 (오후 6시 이후)',
    isEssential: true
  },
  {
    id: 'greeting_03',
    category: 'greeting',
    situation: '고마움을 표현할 때',
    japanese: 'ありがとうございます',
    pronunciation: '아리가토 고자이마스',
    meaning: '감사합니다',
    usage: '정중한 감사 표현',
    isEssential: true
  },
  {
    id: 'greeting_04',
    category: 'greeting',
    situation: '미안할 때',
    japanese: 'すみません',
    pronunciation: '스미마센',
    meaning: '죄송합니다',
    usage: '사과, 부탁할 때, 주의 끌 때',
    isEssential: true
  },

  // 식당/카페
  {
    id: 'restaurant_01',
    category: 'restaurant',
    situation: '메뉴를 보고 싶을 때',
    japanese: 'メニューをください',
    pronunciation: '메뉴오 쿠다사이',
    meaning: '메뉴를 주세요',
    usage: '식당에서 메뉴 요청',
    isEssential: true
  },
  {
    id: 'restaurant_02',
    category: 'restaurant',
    situation: '주문할 때',
    japanese: 'これをください',
    pronunciation: '코레오 쿠다사이',
    meaning: '이것을 주세요',
    usage: '메뉴를 가리키며 주문',
    isEssential: true
  },
  {
    id: 'restaurant_03',
    category: 'restaurant',
    situation: '계산할 때',
    japanese: 'お会計お願いします',
    pronunciation: '오카이케오 오네가이시마스',
    meaning: '계산해주세요',
    usage: '식사 후 계산 요청',
    isEssential: true
  },
  {
    id: 'restaurant_04',
    category: 'restaurant',
    situation: '맛있을 때',
    japanese: 'おいしいです',
    pronunciation: '오이시이데스',
    meaning: '맛있습니다',
    usage: '음식 맛 표현',
    isEssential: true
  },
  {
    id: 'restaurant_05',
    category: 'restaurant',
    situation: '물을 달라고 할 때',
    japanese: 'お水をください',
    pronunciation: '오미즈오 쿠다사이',
    meaning: '물을 주세요',
    usage: '식당에서 물 요청',
    isEssential: false
  },

  // 쇼핑
  {
    id: 'shopping_01',
    category: 'shopping',
    situation: '가격을 물어볼 때',
    japanese: 'いくらですか',
    pronunciation: '이쿠라데스카',
    meaning: '얼마입니까?',
    usage: '상품 가격 문의',
    isEssential: true
  },
  {
    id: 'shopping_02',
    category: 'shopping',
    situation: '사고 싶을 때',
    japanese: 'これを買いたいです',
    pronunciation: '코레오 카이타이데스',
    meaning: '이것을 사고 싶습니다',
    usage: '구매 의사 표현',
    isEssential: true
  },
  {
    id: 'shopping_03',
    category: 'shopping',
    situation: '다른 색상을 원할 때',
    japanese: '他の色はありますか',
    pronunciation: '호카노 이로와 아리마스카',
    meaning: '다른 색상이 있나요?',
    usage: '상품 색상 문의',
    isEssential: false
  },
  {
    id: 'shopping_04',
    category: 'shopping',
    situation: '세금면제를 요청할 때',
    japanese: '免税でお願いします',
    pronunciation: '멘제이데 오네가이시마스',
    meaning: '세금면제로 해주세요',
    usage: '면세 쇼핑 시',
    isEssential: true
  },

  // 교통
  {
    id: 'transport_01',
    category: 'transport',
    situation: '길을 물어볼 때',
    japanese: 'すみません、道を教えてください',
    pronunciation: '스미마센, 미치오 오시에테 쿠다사이',
    meaning: '죄송합니다, 길을 알려주세요',
    usage: '길 안내 요청',
    isEssential: true
  },
  {
    id: 'transport_02',
    category: 'transport',
    situation: '택시에서 내릴 곳을 알릴 때',
    japanese: 'ここで止まってください',
    pronunciation: '코코데 토맛테 쿠다사이',
    meaning: '여기서 멈춰주세요',
    usage: '택시에서 하차 요청',
    isEssential: true
  },
  {
    id: 'transport_03',
    category: 'transport',
    situation: '지하철 역을 찾을 때',
    japanese: '駅はどこですか',
    pronunciation: '에키와 도코데스카',
    meaning: '역은 어디입니까?',
    usage: '지하철역 위치 문의',
    isEssential: true
  },

  // 호텔
  {
    id: 'hotel_01',
    category: 'hotel',
    situation: '체크인할 때',
    japanese: 'チェックインお願いします',
    pronunciation: '체크인 오네가이시마스',
    meaning: '체크인 해주세요',
    usage: '호텔 체크인',
    isEssential: true
  },
  {
    id: 'hotel_02',
    category: 'hotel',
    situation: '체크아웃할 때',
    japanese: 'チェックアウトお願いします',
    pronunciation: '체크아웃 오네가이시마스',
    meaning: '체크아웃 해주세요',
    usage: '호텔 체크아웃',
    isEssential: true
  },
  {
    id: 'hotel_03',
    category: 'hotel',
    situation: '룸키를 요청할 때',
    japanese: 'キーをください',
    pronunciation: '키오 쿠다사이',
    meaning: '키를 주세요',
    usage: '호텔 룸키 요청',
    isEssential: false
  },

  // 응급상황
  {
    id: 'emergency_01',
    category: 'emergency',
    situation: '도움이 필요할 때',
    japanese: '助けてください',
    pronunciation: '타스케테 쿠다사이',
    meaning: '도와주세요',
    usage: '응급상황, 도움 요청',
    isEssential: true
  },
  {
    id: 'emergency_02',
    category: 'emergency',
    situation: '의료진을 찾을 때',
    japanese: '医者を呼んでください',
    pronunciation: '이샤오 욘데 쿠다사이',
    meaning: '의사를 불러주세요',
    usage: '응급의료 요청',
    isEssential: true
  },
  {
    id: 'emergency_03',
    category: 'emergency',
    situation: '분실했을 때',
    japanese: 'なくしました',
    pronunciation: '나쿠시마시타',
    meaning: '잃어버렸습니다',
    usage: '물건 분실 신고',
    isEssential: true
  },

  // 기본 대화
  {
    id: 'conversation_01',
    category: 'conversation',
    situation: '이해하지 못했을 때',
    japanese: 'わかりません',
    pronunciation: '와카리마센',
    meaning: '모르겠습니다',
    usage: '이해하지 못함을 표현',
    isEssential: true
  },
  {
    id: 'conversation_02',
    category: 'conversation',
    situation: '한국어를 못한다고 할 때',
    japanese: '日本語がわかりません',
    pronunciation: '니혼고가 와카리마센',
    meaning: '일본어를 모르겠습니다',
    usage: '언어 장벽 표현',
    isEssential: true
  },
  {
    id: 'conversation_03',
    category: 'conversation',
    situation: '천천히 말해달라고 할 때',
    japanese: 'ゆっくり話してください',
    pronunciation: '유쿠리 하나시테 쿠다사이',
    meaning: '천천히 말해주세요',
    usage: '속도 조절 요청',
    isEssential: false
  },

  // 관광
  {
    id: 'tourism_01',
    category: 'tourism',
    situation: '사진을 찍어달라고 할 때',
    japanese: '写真を撮ってください',
    pronunciation: '샤신오 토테 쿠다사이',
    meaning: '사진을 찍어주세요',
    usage: '사진 촬영 요청',
    isEssential: true
  },
  {
    id: 'tourism_02',
    category: 'tourism',
    situation: '명소를 찾을 때',
    japanese: '観光地はどこですか',
    pronunciation: '칸코치와 도코데스카',
    meaning: '관광지는 어디입니까?',
    usage: '관광지 위치 문의',
    isEssential: false
  }
];

// 카테고리별로 그룹화
export const phrasesByCategory = japanesePhrases.reduce((acc, phrase) => {
  if (!acc[phrase.category]) {
    acc[phrase.category] = [];
  }
  acc[phrase.category].push(phrase);
  return acc;
}, {} as Record<string, JapanesePhrase[]>);

// 필수 표현만 추출
export const essentialPhrases = japanesePhrases.filter(phrase => phrase.isEssential);

// 카테고리 목록
export const categories = [
  { id: 'all', name: '전체', icon: '📚' },
  { id: 'greeting', name: '인사', icon: '👋' },
  { id: 'restaurant', name: '식당', icon: '🍽️' },
  { id: 'shopping', name: '쇼핑', icon: '🛍️' },
  { id: 'transport', name: '교통', icon: '🚇' },
  { id: 'hotel', name: '호텔', icon: '🏨' },
  { id: 'emergency', name: '응급상황', icon: '🚨' },
  { id: 'conversation', name: '기본대화', icon: '💬' },
  { id: 'tourism', name: '관광', icon: '📸' }
];
