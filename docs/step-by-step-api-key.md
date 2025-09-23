# 🔑 Google Maps API 키 발급받기 - 완전 가이드

## 📋 준비사항
- Google 계정 (Gmail 계정 사용 가능)
- 신용카드 (월 $200 무료 크레딧 제공)
- 10-15분 소요

## 🚀 단계별 발급 과정

### 1단계: Google Cloud Console 접속
1. **브라우저에서 [Google Cloud Console](https://console.cloud.google.com/) 접속**
2. **Google 계정으로 로그인** (Gmail 계정 사용 가능)

### 2단계: 새 프로젝트 생성
1. **상단의 프로젝트 선택 드롭다운 클릭**
   - 현재 선택된 프로젝트 이름 옆의 화살표 클릭
2. **"새 프로젝트" 클릭**
3. **프로젝트 정보 입력**:
   - 프로젝트 이름: `Tokyo Travel Guide` (또는 원하는 이름)
   - 조직: `없음` (개인 사용)
4. **"만들기" 클릭**
5. **생성 완료까지 1-2분 대기**

### 3단계: 결제 계정 설정 (중요!)
1. **왼쪽 메뉴에서 "결제" 클릭**
2. **"결제 계정 연결" 클릭**
3. **결제 정보 입력**:
   - 국가/지역: `대한민국`
   - 신용카드 정보 입력
   - 주소 정보 입력
4. **"무료 체험판 시작" 클릭**
   - 월 $200 무료 크레딧 제공
   - 신용카드로 인증만 하고 실제 과금은 없음

### 4단계: Maps JavaScript API 활성화
1. **왼쪽 메뉴에서 "API 및 서비스" → "라이브러리" 클릭**
2. **검색창에 "Maps JavaScript API" 입력**
3. **"Maps JavaScript API" 선택**
4. **"사용" 버튼 클릭**
5. **활성화 완료까지 1-2분 대기**

### 5단계: API 키 생성
1. **왼쪽 메뉴에서 "API 및 서비스" → "사용자 인증 정보" 클릭**
2. **"사용자 인증 정보 만들기" 클릭**
3. **"API 키" 선택**
4. **생성된 API 키 복사**
   - 예: `AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - 39자리 문자열, `AIzaSyB`로 시작

### 6단계: API 키 보안 설정 (권장)
1. **생성된 API 키 옆의 연필 아이콘 클릭**
2. **"애플리케이션 제한사항"에서 "HTTP 리퍼러" 선택**
3. **"웹사이트 제한사항"에 다음 추가**:
   ```
   http://localhost:3000/*
   http://localhost:3001/*
   http://localhost:3002/*
   https://yourdomain.com/* (배포 시)
   ```
4. **"API 제한사항"에서 "키 제한" 선택**
5. **"Maps JavaScript API" 선택**
6. **"저장" 클릭**

## 💰 비용 정보
- **무료 크레딧**: 월 $200 제공
- **Maps JavaScript API**: 월 28,000회 로드까지 무료
- **일반적인 사용량**: 무료로 사용 가능
- **초과 시**: $7 per 1,000 requests

## 🔒 보안 주의사항
- API 키를 공개 저장소에 커밋하지 마세요
- `.env.local` 파일은 `.gitignore`에 포함되어야 합니다
- 프로덕션 환경에서는 반드시 API 키 제한을 설정하세요

## 🚨 문제 해결
- **403 오류**: API 키 제한 설정 확인
- **지도가 표시되지 않음**: API 키가 올바르게 설정되었는지 확인
- **과금 경고**: 사용량 모니터링 설정

## 📞 지원
- [Google Maps Platform 문서](https://developers.google.com/maps?hl=ko)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Google Cloud 지원](https://cloud.google.com/support)
