# 🔧 Google Maps API 키 문제 해결

## ❌ 현재 발생한 오류
- **오류**: `InvalidKey`
- **원인**: API 키가 올바르게 설정되지 않음

## 🚨 해결 방법

### 1단계: Google Cloud Console에서 API 키 확인
1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 프로젝트 선택
3. "API 및 서비스" → "사용자 인증 정보" 클릭
4. API 키가 활성화되어 있는지 확인

### 2단계: Maps JavaScript API 활성화 확인
1. "API 및 서비스" → "라이브러리" 클릭
2. "Maps JavaScript API" 검색
3. "사용" 상태인지 확인
4. 활성화되지 않았다면 "사용" 클릭

### 3단계: 결제 계정 설정 확인
1. "결제" 메뉴 클릭
2. 결제 계정이 연결되어 있는지 확인
3. 연결되지 않았다면 "결제 계정 연결" 클릭

### 4단계: API 키 제한 설정 확인
1. API 키 옆의 연필 아이콘 클릭
2. "애플리케이션 제한사항"에서 "HTTP 리퍼러" 선택
3. "웹사이트 제한사항"에 다음 추가:
   ```
   http://localhost:3000/*
   http://localhost:3001/*
   http://localhost:3002/*
   http://localhost:3003/*
   http://localhost:3004/*
   ```
4. "API 제한사항"에서 "키 제한" 선택
5. "Maps JavaScript API" 선택
6. "저장" 클릭

### 5단계: 새 API 키 생성 (필요시)
1. "사용자 인증 정보" → "사용자 인증 정보 만들기" → "API 키"
2. 새 API 키 복사
3. `src/config/maps.ts`에서 API 키 업데이트

## 🔍 문제 진단

### API 키가 올바른지 확인
- API 키는 `AIzaSy`로 시작하는 39자리 문자열
- 현재 설정된 키: `AIzaSyDWtVLXxuncEmWPF12xqr_zHNDaMg5tH7s`

### 일반적인 오류 원인
1. **API 키 제한 설정**: HTTP 리퍼러 제한이 너무 엄격
2. **API 비활성화**: Maps JavaScript API가 활성화되지 않음
3. **결제 계정 없음**: 결제 계정이 연결되지 않음
4. **잘못된 키**: 복사 과정에서 키가 잘못됨

## 🚀 빠른 해결 방법

### 방법 1: API 키 제한 해제
1. Google Cloud Console에서 API 키 편집
2. "애플리케이션 제한사항"에서 "없음" 선택
3. "저장" 클릭
4. 브라우저에서 새로고침

### 방법 2: 새 API 키 생성
1. 새 API 키 생성
2. 제한 없이 설정
3. `src/config/maps.ts`에서 업데이트

## 📞 추가 도움
- [Google Maps Platform 문서](https://developers.google.com/maps?hl=ko)
- [API 키 문제 해결](https://developers.google.com/maps/documentation/javascript/error-messages)
