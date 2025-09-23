
  # Tokyo Travel Guide App

  This is a code bundle for Tokyo Travel Guide App. The original project is available at https://www.figma.com/design/YKjUnoamyOfs2Gl45Qgaok/Tokyo-Travel-Guide-App.

  ## Features

  - 🍽️ 맛집 검색 및 필터링
  - 🗺️ Google Maps 연동 지도 기능
  - 🚇 교통 정보 및 교통패스 추천
  - 🛍️ 쇼핑 정보
  - 🎯 관광지 추천
  - 🤖 AI 채팅 기능

  ## Running the code

  Run `pnpm i` to install the dependencies.

  Run `pnpm run dev` to start the development server.

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
     ```

  ### 🎮 데모 모드
  API 키가 설정되지 않은 경우 자동으로 데모 모드로 전환됩니다:
  - 시각적 지도 인터페이스
  - 클릭 가능한 마커
  - 상세 정보 표시

  ### 📖 상세 가이드
  - [Google Maps 설정 가이드](docs/google-maps-setup.md)
  - [API 키 설정 완전 가이드](docs/api-key-setup-guide.md)

  ### 💰 비용
  - 월 $200 크레딧 제공
  - Maps JavaScript API: 월 28,000회 로드까지 무료
  - 일반적인 사용량에서는 무료로 사용 가능
  