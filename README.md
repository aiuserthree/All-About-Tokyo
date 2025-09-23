# All-About-Tokyo - Tokyo Travel Guide App

This is a comprehensive Tokyo Travel Guide App built with React and TypeScript. The original project design is available at https://www.figma.com/design/YKjUnoamyOfs2Gl45Qgaok/Tokyo-Travel-Guide-App.

## ✨ Features

- 🍽️ **맛집 검색 및 필터링** - 실시간 검색 기능과 카테고리별 필터링
- 🗺️ **Google Maps 연동** - 인터랙티브 지도와 마커 기능
- 🚇 **교통 정보** - 교통패스 추천 및 경로 안내
- 🛍️ **쇼핑 정보** - 쇼핑몰 및 상점 검색 기능
- 🎯 **관광지 추천** - 명소 및 활동 정보
- ☕ **카페 & 디저트** - 카페와 디저트 전문 정보
- 🤖 **AI 채팅** - OpenAI 연동 AI 여행 어시스턴트
- 📍 **주소 정보** - 모든 장소의 상세 주소 표시

## 🚀 Getting Started

### 설치 및 실행
```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm run dev
```

## 🗺️ Google Maps API 설정

### 🚀 빠른 시작
```bash
# API 키 설정 도구 실행
pnpm run setup-api
```

### 📋 수동 설정
1. [Google Cloud Console](https://console.cloud.google.com/)에서 프로젝트 생성
2. Maps JavaScript API 활성화
3. API 키 발급
4. `.env.local` 파일 생성:
   ```
   VITE_GOOGLE_MAPS_API_KEY=발급받은_API_키
   VITE_OPENAI_API_KEY=발급받은_OpenAI_API_키
   ```

### 🎮 데모 모드
API 키가 설정되지 않은 경우 자동으로 데모 모드로 전환됩니다:
- 시각적 지도 인터페이스
- 클릭 가능한 마커
- 상세 정보 표시

### 📖 상세 가이드
- [Google Maps 설정 가이드](docs/google-maps-setup.md)
- [API 키 설정 완전 가이드](docs/api-key-setup-guide.md)
- [OpenAI 설정 가이드](docs/openai-setup-guide.md)

### 💰 비용
- **Google Maps**: 월 $200 크레딧 제공, Maps JavaScript API 월 28,000회 로드까지 무료
- **OpenAI**: 사용량에 따른 요금제
- 일반적인 사용량에서는 무료로 사용 가능

## 🛠️ 기술 스택

- **Frontend**: React 18, TypeScript, Vite
- **UI**: Tailwind CSS, shadcn/ui
- **Maps**: Google Maps JavaScript API
- **AI**: OpenAI GPT API
- **Package Manager**: pnpm

## 📱 주요 화면

- **홈**: 메인 대시보드 및 빠른 액세스
- **맛집**: 레스토랑 검색 및 필터링
- **보기**: 관광지 및 활동 정보
- **쇼핑**: 쇼핑몰 및 상점 정보
- **카페**: 카페 및 음료 정보
- **디저트**: 디저트 및 과자 정보
- **필수품**: 여행 필수품 정보
- **AI 채팅**: AI 여행 어시스턴트

## 🔍 최근 업데이트

- ✅ 보기 탭과 쇼핑 탭에 검색 기능 추가
- ✅ 모든 카드에 주소 정보 표시 기능 추가
- ✅ 카페 및 디저트 탭 카드 표시 문제 해결
- ✅ 실시간 검색 필터링 기능 개선
- ✅ 사용자 경험 향상
