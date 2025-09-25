// Google Places API를 사용한 실제 장소 이미지 생성 유틸리티

export interface PlaceImageOptions {
  lat: number;
  lng: number;
  title: string;
  width?: number;
  height?: number;
  apiKey?: string;
}

export interface PlacePhotoResult {
  photo_reference: string;
  height: number;
  width: number;
}

export interface PlaceDetailsResult {
  place_id: string;
  photos?: PlacePhotoResult[];
  name: string;
  formatted_address: string;
}

/**
 * Google Places API를 사용하여 장소 ID 검색
 * @param options 장소 검색 옵션
 * @returns 장소 ID 또는 null
 */
export async function findPlaceId(options: PlaceImageOptions): Promise<string | null> {
  const {
    lat,
    lng,
    title,
    apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyDgdVBSYKIZBWmSvNl8_g4f-0O4c5R_psw'
  } = options;

  try {
    const searchUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=100&keyword=${encodeURIComponent(title)}&key=${apiKey}`;
    
    console.log('🔍 장소 검색:', { title, lat, lng, searchUrl });
    
    const response = await fetch(searchUrl);
    const data = await response.json();
    
    console.log('📋 Places API 응답:', data);
    
    if (data.results && data.results.length > 0) {
      console.log('✅ 장소 ID 찾음:', data.results[0].place_id);
      return data.results[0].place_id;
    }
    
    console.warn('❌ 장소를 찾을 수 없음:', title);
    return null;
  } catch (error) {
    console.warn('❌ 장소 ID 검색 실패:', error);
    return null;
  }
}

/**
 * Google Places API를 사용하여 장소 상세 정보 및 사진 가져오기
 * @param placeId 장소 ID
 * @param apiKey API 키
 * @returns 장소 상세 정보
 */
export async function getPlaceDetails(placeId: string, apiKey: string): Promise<PlaceDetailsResult | null> {
  try {
    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=place_id,name,formatted_address,photos&key=${apiKey}`;
    
    console.log('📸 장소 상세 정보 요청:', { placeId, detailsUrl });
    
    const response = await fetch(detailsUrl);
    const data = await response.json();
    
    console.log('📋 장소 상세 정보 응답:', data);
    
    if (data.result) {
      console.log('✅ 장소 상세 정보 성공:', {
        name: data.result.name,
        photos: data.result.photos?.length || 0
      });
      return data.result;
    }
    
    console.warn('❌ 장소 상세 정보 없음');
    return null;
  } catch (error) {
    console.warn('❌ 장소 상세 정보 가져오기 실패:', error);
    return null;
  }
}

/**
 * Google Places Photo API를 사용하여 실제 장소 이미지 URL 생성
 * @param photoReference 사진 참조 ID
 * @param options 이미지 옵션
 * @returns 실제 장소 이미지 URL
 */
export function generatePlacePhotoUrl(photoReference: string, options: { width?: number; height?: number; apiKey?: string }): string {
  const {
    width = 400,
    height = 300,
    apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyDgdVBSYKIZBWmSvNl8_g4f-0O4c5R_psw'
  } = options;

  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${width}&maxheight=${height}&photo_reference=${photoReference}&key=${apiKey}`;
}

/**
 * 장소의 실제 이미지 URL 생성 (Google Places API 사용)
 * @param place 장소 데이터
 * @returns 실제 장소 이미지 URL 또는 null
 */
export async function getRealPlaceImage(place: { lat: number; lng: number; title: string }): Promise<string | null> {
  try {
    console.log('🖼️ 실제 장소 이미지 요청:', place);
    
    // 1. 장소 ID 검색
    const placeId = await findPlaceId(place);
    if (!placeId) {
      console.warn('❌ 장소 ID 없음, 대체 이미지 사용');
      return null;
    }

    // 2. 장소 상세 정보 및 사진 가져오기
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyDgdVBSYKIZBWmSvNl8_g4f-0O4c5R_psw';
    const placeDetails = await getPlaceDetails(placeId, apiKey);
    
    if (placeDetails && placeDetails.photos && placeDetails.photos.length > 0) {
      // 3. 첫 번째 사진의 URL 생성
      const firstPhoto = placeDetails.photos[0];
      const photoUrl = generatePlacePhotoUrl(firstPhoto.photo_reference, { width: 400, height: 300, apiKey });
      console.log('✅ 실제 장소 이미지 URL 생성:', photoUrl);
      return photoUrl;
    }

    console.warn('❌ 장소 사진 없음, 대체 이미지 사용');
    return null;
  } catch (error) {
    console.warn('❌ 실제 장소 이미지 가져오기 실패:', error);
    return null;
  }
}

/**
 * 카테고리별 이미지 라이브러리
 */
const categoryImages = {
  // 맛집/음식 카테고리
  food: [
    'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGZvb2R8ZW58MXx8fHwxNzU4NjIyMDg5fDA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1602421312666-5883f16a7c85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHJlc3RhdXJhbnQlMjB0b2t5b3xlbnwxfHx8fDE3NTg2MjIxNzR8MA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1580827929620-e1a34bc162fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGZvb2QlMjByYW1lbiUyMHN1c2hpfGVufDF8fHx8MTc1ODYyMjA4NXww&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHN0cmVldCUyMGZvb2R8ZW58MXx8fHwxNzU4NjIyMDg5fDA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGZvb2R8ZW58MXx8fHwxNzU4NjIyMDg5fDA&ixlib=rb-4.1.0&q=80&w=400'
  ],
  
  // 관광명소/랜드마크 카테고리
  attraction: [
    'https://images.unsplash.com/photo-1497995503975-3db53068450a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHRlbXBsZSUyMHNocmluZSUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc1ODYyMjA4OXww&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHRvd2VyfGVufDF8fHx8MTc1ODYyMjA4OXww&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHRlbXBsZXxlbnwxfHx8fDE3NTg2MjIwODl8MA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1588486691401-93624c48459b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx0b2t5byUyMGNpdHlzY2FwZSUyMHNreWxpbmV8ZW58MXx8fHwxNzU4NTU0NTQ1fDA&ixlib=rb-4.0.3&q=80&w=400',
    'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGNpdHl8ZW58MXx8fHwxNzU4NjIyMDg5fDA&ixlib=rb-4.1.0&q=80&w=400'
  ],
  
  // 쇼핑 카테고리
  shopping: [
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHN0cmVldHxlbnwxfHx8fDE3NTg2MjIwODl8MA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1555529902-0b7b8b5b5b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHNob3BwaW5nfGVufDF8fHx8MTc1ODYyMjA4OXww&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1555529902-0b7b8b5b5b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGlidXlhJTIwc2hvcHBpbmd8ZW58MXx8fHwxNzU4NjIyMDg5fDA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1555529902-0b7b8b5b5b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGRlcGFydG1lbnQlMjBzdG9yZXxlbnwxfHx8fDE3NTg2MjIwODl8MA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1555529902-0b7b8b5b5b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMG1hcmtldHxlbnwxfHx8fDE3NTg2MjIwODl8MA&ixlib=rb-4.1.0&q=80&w=400'
  ],
  
  // 카페 카테고리
  cafe: [
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGNhZmV8ZW58MXx8fHwxNzU4NjIyMDg5fDA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMGNhZmV8ZW58MXx8fHwxNzU4NjIyMDg5fDA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGNvZmZlZXxlbnwxfHx8fDE3NTg2MjIwODl8MA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHRlYSUyMGNhZmV8ZW58MXx8fHwxNzU4NjIyMDg5fDA&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGRlc3NlcnR8ZW58MXx8fHwxNzU4NjIyMDg5fDA&ixlib=rb-4.1.0&q=80&w=400'
  ],
  
  // 기본 도쿄 이미지
  default: [
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGphcGFufGVufDF8fHx8MTc1ODYyMjA4OXww&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHRvd2VyfGVufDF8fHx8MTc1ODYyMjA4OXww&ixlib=rb-4.1.0&q=80&w=400',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHRlbXBsZXxlbnwxfHx8fDE3NTg2MjIwODl8MA&ixlib=rb-4.1.0&q=80&w=400'
  ]
};

/**
 * 장소의 카테고리를 감지하는 함수
 * @param place 장소 데이터
 * @returns 카테고리 키
 */
function detectCategory(place: { lat: number; lng: number; title: string; category?: string }): keyof typeof categoryImages {
  const title = place.title.toLowerCase();
  const category = place.category?.toLowerCase() || '';
  
  // 음식/맛집 관련 키워드
  const foodKeywords = ['라멘', '스시', '우동', '돈카츠', '함바그', '이자카야', '야키토리', '소바', '일식', '양식', '이탈리안', '햄버거', '카이센동', 'ramen', 'sushi', 'udon', 'tonkatsu', 'hamburger', 'izakaya', 'yakitori', 'soba'];
  
  // 관광명소 관련 키워드
  const attractionKeywords = ['타워', '사찰', '신사', '공원', '전망대', '랜드마크', '사진', '관광', 'tower', 'temple', 'shrine', 'park', 'landmark', 'observation', 'sky'];
  
  // 쇼핑 관련 키워드
  const shoppingKeywords = ['쇼핑', '백화점', '상점', '마켓', '몰', 'shopping', 'department', 'store', 'market', 'mall', 'boutique'];
  
  // 카페 관련 키워드
  const cafeKeywords = ['카페', '커피', '차', '디저트', '케이크', 'cafe', 'coffee', 'tea', 'dessert', 'cake', 'patisserie'];
  
  // 카테고리별 키워드 매칭
  if (foodKeywords.some(keyword => title.includes(keyword) || category.includes(keyword))) {
    return 'food';
  }
  
  if (attractionKeywords.some(keyword => title.includes(keyword) || category.includes(keyword))) {
    return 'attraction';
  }
  
  if (shoppingKeywords.some(keyword => title.includes(keyword) || category.includes(keyword))) {
    return 'shopping';
  }
  
  if (cafeKeywords.some(keyword => title.includes(keyword) || category.includes(keyword))) {
    return 'cafe';
  }
  
  return 'default';
}

/**
 * 대체 이미지 URL 생성 (카테고리별 적절한 이미지 선택)
 * @param place 장소 데이터
 * @returns 대체 이미지 URL
 */
export function getFallbackImage(place: { lat: number; lng: number; title: string; category?: string }): string {
  const detectedCategory = detectCategory(place);
  const images = categoryImages[detectedCategory];
  
  // 장소명의 해시값을 사용하여 일관된 이미지 선택
  let hash = 0;
  for (let i = 0; i < place.title.length; i++) {
    const char = place.title.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // 32bit 정수로 변환
  }
  
  const imageIndex = Math.abs(hash) % images.length;
  const selectedImage = images[imageIndex];
  
  console.log('🔄 카테고리별 대체 이미지 선택:', { 
    title: place.title, 
    category: place.category,
    detectedCategory,
    index: imageIndex, 
    image: selectedImage 
  });
  
  return selectedImage;
}

/**
 * 장소의 최적 이미지 URL 반환 (로컬 이미지 우선, 기존 이미지, 실제 장소 이미지, 최종 대체 이미지)
 * @param place 장소 데이터
 * @returns 최적 이미지 URL
 */
export async function getOptimalPlaceImage(place: { lat: number; lng: number; title: string; image?: string }): Promise<string> {
  console.log('🎯 최적 이미지 선택 시작:', place.title);
  
  // 우선순위 1: 로컬 이미지 경로가 있으면 우선 사용
  if (place.image && (place.image.startsWith('/image/') || place.image.startsWith('./image/'))) {
    console.log('✅ 로컬 이미지 사용:', place.image);
    return place.image;
  }
  
  // 우선순위 2: 기존 HTTP 이미지가 있으면 사용
  if (place.image && place.image.startsWith('http')) {
    console.log('✅ 기존 HTTP 이미지 사용:', place.image);
    return place.image;
  }

  // 우선순위 3: Google Places API로 실제 장소 이미지 시도
  try {
    const realImage = await getRealPlaceImage(place);
    if (realImage) {
      console.log('✅ 실제 장소 이미지 사용:', realImage);
      return realImage;
    }
  } catch (error) {
    console.warn('❌ 실제 장소 이미지 가져오기 실패:', error);
  }

  // 우선순위 4: 실패 시 대체 이미지
  const fallbackImage = getFallbackImage(place);
  console.log('🔄 대체 이미지 사용:', fallbackImage);
  return fallbackImage;
}
