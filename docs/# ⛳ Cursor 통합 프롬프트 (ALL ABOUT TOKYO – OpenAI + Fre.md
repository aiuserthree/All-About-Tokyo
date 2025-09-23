# ⛳ Cursor 통합 프롬프트 (ALL ABOUT TOKYO – OpenAI + Free APIs)

**\[SYSTEM]**
너는 Next.js(App Router)+TypeScript+Tailwind 환경에서 동작하는 시니어 프론트엔드 엔지니어다.
모든 지시는 **“ALL ABOUT TOKYO” 모바일 가이드 앱(MVP)** 개발을 위한 것이다.
코드는 클린(ESLint/TS)하고, 접근성/성능(LCP≤2.5s, 터치 44px+)을 고려한다.

**\[USER]**
다음 요구사항을 기반으로 코드를 생성/수정해줘. 결과는 실행 가능한 Next.js 프로젝트 구조로 제시해야 한다.

---

## 0) 프로젝트 Scaffold

1. 없으면 새로 생성:

```bash
pnpm create next-app tokyo-guide --ts --tailwind --app --eslint --src-dir
cd tokyo-guide
pnpm add @tanstack/react-query zustand openai
```

2. `.env` 추가:

```bash
OPENAI_API_KEY=sk-...
OPENAI_MODEL=gpt-4.1-mini   # 또는 gpt-4.1
NEXT_PUBLIC_BASE_URL=http://localhost:3000
UNSPLASH_ACCESS_KEY=...     # 옵션
```

---

## 1) 레이아웃 & 네비게이션

* `src/app/layout.tsx`: 상단 AppBar, 본문, 하단 TabBar(홈/이동/먹기/보기/쇼핑) + 우측 FAB(“AI”).
* 기본 라우트: `/`(홈), `/onboarding`, `/transport`, `/eat`, `/see-do`, `/shop`, `/essentials`, `/ai`.

공용 컴포넌트:

* `components/AppBar.tsx`
* `components/TabBar.tsx`
* `components/FAB.tsx`
* `components/Card.tsx`

---

## 2) 무료/키리스 툴 API 라우트

아래 파일 생성 (App Router, `cache:"no-store"`).

* `/api/tools/weather` → **Open-Meteo** (키리스)
* `/api/tools/geocode` → **Nominatim (OSM)** (search/reverse, UA 명시, 정책 준수)
* `/api/tools/places` → **Overpass API (OSM)** (예: `amenity=restaurant/cafe/fast_food`)
* `/api/tools/photos` → **Wikimedia Commons 기본**, 옵션 provider `"unsplash"` (환경변수 필요)
* `/api/tools/fx` → **exchangerate.host** (JPY base → KRW, USD)
* `/api/tools/tips` → 정적 JSON(`src/data/tips.json`)

---

## 3) AI 오케스트레이터 (OpenAI Responses API)

파일: `src/app/api/ai/route.ts`

* **모델**: `process.env.OPENAI_MODEL` (기본 `gpt-4.1-mini`)
* **tools**: getWeather, searchPlaces, searchPhotos, getFx, getTips
* **흐름**:

  1. 사용자 메시지 전달 → 모델이 툴콜 생성
  2. 서버에서 실제 `/api/tools/*` 호출 실행
  3. 결과를 `tool_result`로 다시 모델에 전달
  4. 모델이 최종 한국어 추천 응답 생성 (포맷: TL;DR → 추천 3선 → 사진 → 팁 → 액션 버튼 제안)
* 응답: `{ ok:true, toolResults, answer }`

---

## 4) /ai 클라이언트 페이지

파일: `src/app/ai/page.tsx`

* 입력창 + Ask 버튼
* API `/api/ai` 호출 → `answer`는 본문 카드로 표시
* `toolResults`는 `<details>`로 디버그 확인 가능
* 로딩 상태(`…`) 및 에러 처리 포함

---

## 5) 테스트 데이터

`src/data/tips.json`

```json
{
  "first_60m": ["공항 Wi-Fi 또는 eSIM 활성화","Welcome Suica/교통카드 세팅","공항→숙소 최단 경로 확인"],
  "subway_manners": ["전화 통화 지양, 문자 위주","줄서기·좌석 배려","음식 섭취 제한 준수"],
  "tax_free": ["여권 필수","같은 날·같은 매장 합산 기준","개봉 전까지 개봉 금지"],
  "general_manners": ["쓰레기 분리·금연구역","식당의 오토시(자리비) 이해"]
}
```

---

## 6) 실행 & 시나리오

```bash
pnpm dev
# http://localhost:3000/ai
```

테스트 문구:

* “지금 비 오면 어디 갈까?” → 날씨 카드 표시
* “시부야 근처 맛집 추천” → Overpass 장소 목록
* “도쿄 야경 사진 보여줘” → Wikimedia 이미지 그리드
* “환율 알려줘” → JPY→KRW, USD 환율

---

## 7) 주의 & 확장

* Nominatim/Overpass는 공용 인프라 → UA/캐시/쿼리 절제, 트래픽 증가 시 자체 호스팅 고려
* Unsplash 사용 시 크레딧 문구 필수
* MapLibre+OSM 타일 렌더는 추후 선택적 추가

---

👉 위 요구사항을 순서대로 반영해, 필요한 모든 파일과 코드 스니펫을 한 답변에 정리해줘.

---

