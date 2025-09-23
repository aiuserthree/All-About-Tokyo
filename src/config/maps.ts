// Google Maps API 설정
export const GOOGLE_MAPS_CONFIG = {
  // Google Cloud Console에서 발급받은 API 키를 입력하세요
  // 1. https://console.cloud.google.com/ 에서 프로젝트 생성
  // 2. Maps JavaScript API 활성화
  // 3. API 키 발급 후 아래에 입력
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyDgdVBSYKIZBWmSvNl8_g4f-0O4c5R_psw',
  version: 'weekly',
  libraries: ['places', 'geometry'] as const,
};

// 기본 지도 설정
export const MAP_DEFAULT_CONFIG = {
  center: {
    lat: 35.6762, // 도쿄 중심 좌표
    lng: 139.6503,
  },
  zoom: 13,
  mapTypeId: 'roadmap' as const,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ],
};
