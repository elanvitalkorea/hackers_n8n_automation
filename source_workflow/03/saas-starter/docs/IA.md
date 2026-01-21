# IA (Information Architecture) — Next.js SaaS Starter

## 1) 사이트 맵(라우트 구조)

### 1.1 Public (비로그인 접근 가능)
- `/` — 마케팅 랜딩(터미널 애니메이션, 주요 가치/CTA)
- `/pricing` — 가격/플랜(Stripe Products/Prices 기반)
- `/sign-in` — 로그인
- `/sign-up` — 회원가입
- `404` — `app/not-found.tsx`

### 1.2 Protected (로그인 필요)
> 글로벌 미들웨어가 **`/dashboard` prefix**를 보호합니다. 세션이 없으면 `/sign-in`으로 리다이렉트됩니다.

- `/dashboard` — Team Settings (구독 상태 + 멤버 목록 + 초대)
  - **섹션**
    - Team Subscription: 현재 플랜/상태 표시 + Customer Portal 이동
    - Team Members: 멤버 목록/역할 표시 + 멤버 제거(일부 조건에서 버튼 노출)
    - Invite Team Member: 오너만 초대 가능(폼 비활성화 처리)
- `/dashboard/general` — General Settings (이름/이메일 변경)
- `/dashboard/security` — Security Settings (비밀번호 변경, 계정 삭제)
- `/dashboard/activity` — Activity Log (최근 활동 10개)

## 2) API IA (Next.js Route Handlers)

### 2.1 Public/Server-to-Server
- `POST /api/stripe/webhook`
  - Stripe webhook 수신
  - 서명 검증(`STRIPE_WEBHOOK_SECRET`)
  - 이벤트: `customer.subscription.updated`, `customer.subscription.deleted` 처리

### 2.2 Authenticated (세션 기반 사용자 데이터)
- `GET /api/user`
  - 현재 세션 사용자 반환
- `GET /api/team`
  - 현재 세션 사용자의 팀(멤버 포함) 반환

### 2.3 Stripe Checkout Success Redirect
- `GET /api/stripe/checkout?session_id=...`
  - Checkout session 조회 → subscription/product 정보 조회
  - 사용자 team의 Stripe/플랜 정보를 DB에 업데이트
  - `/dashboard`로 리다이렉트

## 3) 액션/서비스 IA (서버 액션 및 내부 모듈)

### 3.1 서버 액션(`app/(login)/actions.ts`)
- **Auth**
  - `signIn` / `signUp` / `signOut`
- **Account**
  - `updateAccount`
  - `updatePassword`
  - `deleteAccount` (soft delete)
- **Team**
  - `inviteTeamMember` (초대 생성)
  - `removeTeamMember` (멤버 제거)
- **Activity Logging**
  - 주요 액션마다 `activity_logs` insert

### 3.2 결제 모듈(`lib/payments/*`)
- `createCheckoutSession` — Stripe Checkout Session 생성 후 redirect
- `createCustomerPortalSession` — Stripe Billing Portal Session 생성
- `handleSubscriptionChange` — 웹훅 기반 팀 구독 상태 업데이트
- `getStripeProducts` / `getStripePrices` — Pricing 렌더용 데이터

### 3.3 인증/세션 모듈(`lib/auth/*`)
- JWT 서명/검증(`AUTH_SECRET`)
- `session` 쿠키 저장/갱신/삭제
- 서버 액션용 입력 검증 헬퍼(zod)
- 팀 컨텍스트 래퍼(`withTeam`)

### 3.4 DB IA (`lib/db/*`)
- 스키마: `users`, `teams`, `team_members`, `invitations`, `activity_logs`
- 주요 쿼리:
  - `getUser`(세션→유저)
  - `getTeamForUser`(세션→팀/멤버 포함)
  - `getActivityLogs`(최근 10개)
  - Stripe customerId 기반 팀 조회/구독 업데이트

## 4) 네비게이션/화면 IA(내비 구조)
- **Header(공통)**:
  - 비로그인: `Pricing`, `Sign Up`
  - 로그인: Avatar 메뉴 → `Dashboard`, `Sign out`
- **Dashboard Sidebar**:
  - Team(`/dashboard`)
  - General(`/dashboard/general`)
  - Activity(`/dashboard/activity`)
  - Security(`/dashboard/security`)

