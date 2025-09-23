# 🚀 Google Maps API 키 빠른 해결 방법

## ❌ 현재 오류
- **오류**: `InvalidKey`
- **원인**: API 키 제한 설정이 너무 엄격함

## ⚡ 2분 만에 해결하기

### 1단계: Google Cloud Console 접속
1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 프로젝트 선택

### 2단계: API 키 제한 해제
1. **"API 및 서비스" → "사용자 인증 정보" 클릭**
2. **API 키 옆의 연필 아이콘 클릭**
3. **"애플리케이션 제한사항"에서 "없음" 선택**
4. **"저장" 클릭**

### 3단계: 테스트
1. 브라우저에서 새로고침
2. "지도에서 보기" 버튼 클릭
3. 실제 Google Maps가 표시되는지 확인

## 🔒 보안 설정 (나중에)

API 키가 작동한 후 보안을 위해 제한을 설정할 수 있습니다:

### HTTP 리퍼러 제한 설정
1. API 키 편집
2. "애플리케이션 제한사항"에서 "HTTP 리퍼러" 선택
3. "웹사이트 제한사항"에 다음 추가:
   ```
   http://localhost:3000/*
   http://localhost:3001/*
   http://localhost:3002/*
   http://localhost:3003/*
   http://localhost:3004/*
   https://yourdomain.com/* (배포 시)
   ```
4. "저장" 클릭

## 🎯 확인사항

### API 키가 올바른지 확인
- 현재 설정된 키: `AIzaSyDWtVLXxuncEmWPF12xqr_zHNDaMg5tH7s`
- 39자리 문자열, `AIzaSy`로 시작

### Maps JavaScript API 활성화 확인
1. "API 및 서비스" → "라이브러리"
2. "Maps JavaScript API" 검색
3. "사용" 상태인지 확인

### 결제 계정 연결 확인
1. "결제" 메뉴 클릭
2. 결제 계정이 연결되어 있는지 확인

## 🚨 문제가 계속되면

1. **새 API 키 생성**:
   - "사용자 인증 정보" → "사용자 인증 정보 만들기" → "API 키"
   - 새 키 복사 후 `src/config/maps.ts`에서 업데이트

2. **프로젝트 재생성**:
   - 새 프로젝트 생성
   - Maps JavaScript API 활성화
   - 새 API 키 생성

## 💡 팁
- API 키 제한을 해제하면 즉시 작동합니다
- 나중에 보안 설정을 추가할 수 있습니다
- 월 $200 무료 크레딧으로 충분히 사용 가능합니다
