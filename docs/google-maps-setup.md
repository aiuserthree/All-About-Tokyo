# Google Maps API 설정 가이드

## 🗺️ Google Maps API 키 발급 방법

### 1단계: Google Cloud Console 접속
1. [Google Cloud Console](https://console.cloud.google.com/)에 접속
2. Google 계정으로 로그인

### 2단계: 프로젝트 생성
1. 상단의 프로젝트 선택 드롭다운 클릭
2. "새 프로젝트" 클릭
3. 프로젝트 이름 입력 (예: "Tokyo Travel Guide")
4. "만들기" 클릭

### 3단계: Maps JavaScript API 활성화
1. 왼쪽 메뉴에서 "API 및 서비스" > "라이브러리" 클릭
2. "Maps JavaScript API" 검색
3. "Maps JavaScript API" 선택 후 "사용" 클릭

### 4단계: API 키 발급
1. 왼쪽 메뉴에서 "API 및 서비스" > "사용자 인증 정보" 클릭
2. "사용자 인증 정보 만들기" > "API 키" 클릭
3. 생성된 API 키 복사

### 5단계: API 키 제한 설정 (권장)
1. 생성된 API 키 옆의 연필 아이콘 클릭
2. "애플리케이션 제한사항"에서 "HTTP 리퍼러" 선택
3. "웹사이트 제한사항"에 다음 추가:
   - `http://localhost:3000/*`
   - `http://localhost:3001/*`
   - `https://yourdomain.com/*` (배포 시)

### 6단계: 프로젝트에 API 키 적용

#### 방법 1: 환경 변수 사용 (권장)
프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 입력:
```env
VITE_GOOGLE_MAPS_API_KEY=발급받은_API_키_여기에_입력
```

#### 방법 2: 직접 설정
`src/config/maps.ts` 파일에서 직접 수정:
```typescript
export const GOOGLE_MAPS_CONFIG = {
  apiKey: '발급받은_API_키_여기에_입력',
  version: 'weekly',
  libraries: ['places', 'geometry'] as const,
};
```

#### 방법 3: 임시 테스트용
테스트를 위해 임시로 설정하려면 `src/config/maps.ts`에서:
```typescript
apiKey: 'YOUR_GOOGLE_MAPS_API_KEY_HERE', // 이 부분을 실제 API 키로 교체
```

## 💰 비용 정보
- Google Maps API는 월 $200 크레딧 제공
- Maps JavaScript API: 월 28,000회 로드까지 무료
- 일반적인 사용량에서는 무료로 사용 가능

## 🔒 보안 주의사항
- API 키를 공개 저장소에 커밋하지 마세요
- `.env.local` 파일은 `.gitignore`에 추가되어야 합니다
- 프로덕션 환경에서는 API 키 제한을 반드시 설정하세요

## 🚀 테스트
API 키 설정 후 개발 서버를 재시작하고 "지도에서 보기" 버튼을 클릭하여 지도가 정상적으로 표시되는지 확인하세요.
