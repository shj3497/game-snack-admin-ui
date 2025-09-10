## 개요

Game snak Admin UI는 광고 운영을 위한 관리자 웹 애플리케이션입니다. 광고 관련 Config 값을 등록·관리하고, 이벤트를 생성하여 Google Publisher Tag(GPT), Mezzo, Dawin, Adpopcorn 등 다양한 광고 제공사 노출 우선순위와 정책을 정의합니다. 클라이언트(게임/앱) 측은 해당 Admin에서 설정된 값을 Admin API를 통해 조회하여 실제 광고 노출을 수행합니다.

- **핵심 목적**: 광고 슬롯/단말/앱별 정책화, 광고 제공사 우선순위 관리, 이벤트 기반 전략 운영
- **대상 사용자**: 운영자, 광고 담당자, 슈퍼관리자(SUPER_ADMIN)

---

## 주요 기능

- **광고 설정 관리**: GPT, Mezzo, Dawin, Adpopcorn 등 광고 제공사별 Config 등록 및 수정
- **이벤트 기반 우선순위**: 이벤트 생성으로 광고 노출 우선순위와 조건 정의
- **워크스페이스 운영**: `workspace` 단위의 설정/리포트/계정 관리
- **슈퍼스페이스 운영**: `superspace` 전역 수준 관리(슈퍼관리자 전용)
- **리포트 조회**: 집계 차트/테이블 조회, 기간/필터 검색, 엑셀 다운로드
- **권한/인증**: `next-auth` 기반 로그인, JWT 세션, 라우팅 가드(middleware)

## 기술 스택

- **Framework**: Next.js 15(App Router)
- **Language**: TypeScript
- **UI**: MUI v7, Emotion
- **State & Data**: TanStack Query v5, Zustand
- **Auth**: NextAuth(Credentials, JWT)
- **API Client**: Orval(OpenAPI → React Query client 생성), 커스텀 fetch
- **Etc.**: notistack, xlsx, recharts

## 폴더 구조(요약)

```
src/
  app/
    (authed)/              # 인증 후 영역, 세션 컨텍스트 주입
      layout.tsx
      workspace/           # 일반 운영 공간(설정, 리포트, 이벤트 등)
      superspace/          # 슈퍼관리자 전용 전역 운영 공간
    api/auth/[...nextauth]/route.ts  # NextAuth 라우트
    layout.tsx             # 전역 Provider(MUI, Query, i18n 등)
    middleware.ts          # 인증/권한 라우팅 가드
  components/              # UI 컴포넌트(Atoms/Molecules/Organisms)
  lib/
    auth/auth.ts           # NextAuth 옵션 및 auth() 유틸
    service/
      api-client/          # 클라이언트 사이드 Orval 생성물
      api-server/          # 서버 사이드 Orval 생성물
      custom-fetch.*.ts    # 공용 fetch 래퍼(토큰/URL/에러 처리)
      query-client.ts      # React Query Client 팩토리
    theme/                 # MUI 테마/폰트
    utils/                 # 공통 유틸/훅
```

## 빠른 시작

사전 요구사항

- Node.js 20.x
- Yarn

설치 및 실행

```bash
yarn install
yarn dev
# http://localhost:3000
```

빌드/실행

```bash
yarn build
yarn start
```

린트

```bash
yarn lint
```

## 환경 변수

다음 값들이 주요하게 사용됩니다.

- `API_BASE_URL`: 서버(SSR/서버 액션)에서 호출할 Admin API 기본 URL
- `NEXT_PUBLIC_BASE_URL`: 클라이언트에서 사용할 기본 URL(리라이트 대상으로 다시 API_BASE_URL로 프록시)
- `AUTH_SECRET`: NextAuth JWT 서명에 사용

샘플(`.env.local`)

```bash
# Admin API 엔드포인트
API_BASE_URL=https://admin-api-test.ad.finflow.co.kr
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# NextAuth
AUTH_SECRET=your_secret_here
```

리라이트 설정(`next.config.ts`)

```ts
rewrites: async () => [
  {
    source: '/admin/api/:path*',
    destination: `${process.env.API_BASE_URL}/admin/api/:path*`,
  },
],
```

- 클라이언트는 `/admin/api/*` 로 호출 → Next.js가 `API_BASE_URL` 로 프록시
- 서버(SSR/서버 액션)는 직접 `API_BASE_URL` 로 호출

## 인증과 권한

- `next-auth` Credentials Provider로 로그인 처리 → `adminAuthLogin` API 호출
- 세션 전략은 JWT, 30일 만료
- `middleware.ts`에서 전역 가드 동작
  - 미인증 시 `/auth/signin` 으로 리다이렉트
  - 루트(`/`) 접근 시 인증되면 `/workspace` 로 이동
  - `SUPER_ADMIN` 이 아닌 사용자는 `superspace` 접근 불가
- `(authed)/layout.tsx`에서 `auth()` 로 세션 조회 후 `SessionProvider`에 주입

## API 클라이언트 & 데이터 패칭

- **Orval(OpenAPI → Client 생성)**
  - 설정: `orval.config.cjs`
  - 스키마 소스: `https://admin-api-test.ad.finflow.co.kr/v3/api-docs`
  - 생성물: `src/lib/service/api-client/*`, `src/lib/service/api-server/*`
  - 실행: `yarn orval`
- **커스텀 fetch**
  - 파일: `src/lib/service/custom-fetch.client.ts`, `custom-fetch.server.ts`
  - 공통 헤더/토큰 주입(`Authorization: Bearer <token>`), JSON/텍스트/PDF 응답 케이스 처리
  - 클라이언트는 `NEXT_PUBLIC_BASE_URL` 기준으로 호출 후 리라이트, 서버는 `API_BASE_URL` 사용
- **TanStack Query**
  - `QueryClientProvider.client.tsx` + `ReactQueryStreamedHydration`
  - Devtools 포함(개발 기본 비활성화)

## 광고 설정/이벤트 운영 흐름(개념)

1. 운영자가 관리자에서 광고 제공사별 Config를 등록/수정합니다.
2. 이벤트를 생성하고 노출 우선순위(예: GPT → Mezzo → Dawin → Adpopcorn) 및 조건을 정의합니다.
3. 클라이언트(게임/앱)는 Admin API를 통해 해당 설정/이벤트 정보를 조회합니다.
4. 클라이언트는 조회한 우선순위/정책에 따라 광고 SDK/태그를 초기화하고 노출을 수행합니다.

