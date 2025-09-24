# Vercel 배포 가이드

## 📋 배포 전 체크리스트

### 1. 환경 변수 설정
- `VITE_OPENAI_API_KEY`: OpenAI API 키
- `VITE_GOOGLE_MAPS_API_KEY`: Google Maps API 키

### 2. 빌드 설정 확인
- `package.json`의 빌드 스크립트: `"build": "vite build"`
- 출력 디렉토리: `build`
- Vite 설정에서 `outDir: 'build'` 확인

## 🚀 배포 방법

### 방법 1: Vercel CLI 사용 (권장)

1. **Vercel CLI 설치**
   ```bash
   npm i -g vercel
   ```

2. **프로젝트 디렉토리에서 로그인**
   ```bash
   vercel login
   ```

3. **배포 실행**
   ```bash
   vercel --prod
   ```

4. **환경 변수 설정**
   - Vercel 대시보드에서 프로젝트 선택
   - Settings > Environment Variables에서 추가:
     - `VITE_OPENAI_API_KEY`: OpenAI API 키
     - `VITE_GOOGLE_MAPS_API_KEY`: Google Maps API 키

### 방법 2: GitHub 연동

1. **GitHub에 코드 푸시**
2. **Vercel 대시보드에서 Import Project**
3. **환경 변수 설정**
4. **자동 배포 활성화**

## ⚙️ 설정 파일

### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

## 🔧 빌드 최적화

### Vite 설정 최적화
- `target: 'esnext'` 사용
- Tree shaking 활성화
- 코드 분할 최적화

### 성능 최적화
- 이미지 최적화
- 번들 크기 최적화
- 캐싱 전략

## 🐛 문제 해결

### 일반적인 문제들
1. **빌드 실패**: 환경 변수 누락 확인
2. **API 키 오류**: Vercel 환경 변수 설정 확인
3. **라우팅 오류**: SPA 라우팅 설정 확인

### 디버깅
- Vercel 빌드 로그 확인
- 로컬 빌드 테스트: `npm run build`
- 환경 변수 확인: `console.log(import.meta.env)`

## 📝 배포 후 확인사항

- [ ] 홈페이지 로딩 확인
- [ ] Google Maps 표시 확인
- [ ] AI 채팅 기능 확인
- [ ] 모든 화면 정상 작동 확인
- [ ] 모바일 반응형 확인

## 🔄 자동 배포 설정

GitHub 연동 시:
- `main` 브랜치 푸시 시 자동 배포
- Pull Request 미리보기 배포
- 커밋별 배포 히스토리 관리
