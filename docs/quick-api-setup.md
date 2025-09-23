# 🚀 Google Maps API 키 빠른 설정 가이드

## ⚡ 5분 만에 설정하기

### 1단계: Google Cloud Console 접속
1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. Google 계정으로 로그인

### 2단계: 프로젝트 생성
1. 상단 프로젝트 선택 → "새 프로젝트"
2. 프로젝트 이름: `Tokyo Travel Guide`
3. "만들기" 클릭

### 3단계: 결제 계정 설정
1. 왼쪽 메뉴 "결제" 클릭
2. "결제 계정 연결" 클릭
3. 신용카드 정보 입력 (월 $200 무료 크레딧)

### 4단계: Maps API 활성화
1. "API 및 서비스" → "라이브러리"
2. "Maps JavaScript API" 검색
3. "사용" 클릭

### 5단계: API 키 생성
1. "API 및 서비스" → "사용자 인증 정보"
2. "사용자 인증 정보 만들기" → "API 키"
3. 생성된 키 복사 (예: `AIzaSyB...`)

### 6단계: 프로젝트에 적용

#### 방법 1: 환경 변수 (권장)
프로젝트 루트에 `.env.local` 파일 생성:
```env
VITE_GOOGLE_MAPS_API_KEY=발급받은_실제_API_키
```

#### 방법 2: 직접 설정
`src/config/maps.ts` 파일에서:
```typescript
apiKey: '발급받은_실제_API_키', // AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx를 실제 키로 교체
```

### 7단계: 테스트
1. 개발 서버 재시작: `pnpm run dev`
2. 브라우저에서 "먹기" 탭 → "지도에서 보기" 클릭
3. 실제 Google Maps가 표시되는지 확인

## 🔧 현재 상태
- ✅ 패키지 설치 완료
- ✅ 데모 모드 작동 중
- ⏳ 실제 API 키 설정 필요

## 💡 팁
- API 키는 `AIzaSyB`로 시작하는 39자리 문자열입니다
- 월 $200 무료 크레딧으로 충분히 사용 가능합니다
- 설정 후 즉시 실제 Google Maps 사용 가능합니다
