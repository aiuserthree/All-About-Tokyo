# 🗺️ Google Maps API 키 문제 해결

"InvalidKey" 오류가 발생하는 경우 다음 단계를 따라 해결하세요.

## ⚡ 빠른 해결 (2분)

### 1. Google Cloud Console 접속
- [Google Cloud Console](https://console.cloud.google.com/) 접속
- 로그인 후 프로젝트 선택

### 2. API 키 제한 해제
1. **"API 및 서비스" → "사용자 인증 정보"** 클릭
2. **API 키 옆의 연필 아이콘** (수정) 클릭
3. **"애플리케이션 제한사항"** 섹션에서 **"없음"** 선택
4. **"저장"** 클릭

### 3. Maps JavaScript API 활성화 확인
1. **"API 및 서비스" → "라이브러리"** 클릭
2. **"Maps JavaScript API"** 검색
3. **"사용"** 버튼 클릭 (이미 활성화되어 있다면 "관리" 버튼이 보임)

### 4. 결제 계정 확인
1. **"결제"** 메뉴 클릭
2. 유효한 결제 계정이 연결되어 있는지 확인
3. 연결되어 있지 않다면 **"결제 계정 연결"** 클릭

## 🔧 상세 해결 방법

### API 키 제한 설정 (보안 강화)

API 키가 정상 작동하는 것을 확인한 후, 보안을 위해 제한을 설정할 수 있습니다:

#### HTTP 리퍼러 제한 설정
1. **"애플리케이션 제한사항"** → **"HTTP 리퍼러 (웹사이트)"** 선택
2. **"웹사이트 제한사항"**에 다음 URL 추가:
   ```
   http://localhost:3000/*
   http://localhost:3001/*
   http://localhost:3002/*
   http://localhost:3003/*
   http://localhost:3004/*
   http://localhost:3005/*
   https://yourdomain.com/*
   ```

#### API 제한 설정
1. **"API 제한사항"** → **"키 제한"** 선택
2. **"Maps JavaScript API"** 선택
3. **"저장"** 클릭

## 💰 비용 정보

- **월 $200 크레딧** 제공 (무료)
- **Maps JavaScript API**: 월 28,000회 로드까지 무료
- **일반적인 사용량**: 무료로 사용 가능

## 🧪 테스트 방법

1. **브라우저에서 http://localhost:3000 접속**
2. **"먹기" 탭 선택**
3. **"지도에서 보기" 버튼 클릭**
4. **실제 Google Maps 표시 확인**

## ❌ 여전히 문제가 있다면

### 1. API 키 재발급
- 기존 API 키 삭제
- 새로운 API 키 생성
- `.env.local` 파일 업데이트

### 2. 브라우저 캐시 삭제
- `Ctrl + Shift + R` (강제 새로고침)
- 개발자 도구 → Application → Storage → Clear storage

### 3. 개발 서버 재시작
```bash
# 서버 중지 (Ctrl + C)
pnpm run dev
```

## ✅ 성공 확인

정상적으로 작동하면:
- ✅ 실제 Google Maps 표시
- ✅ 4개 맛집 마커 표시
- ✅ 마커 클릭 시 상세 정보 표시
- ✅ 줌 및 팬 기능 작동

이제 실제 Google Maps를 사용할 수 있습니다! 🗺️✨
