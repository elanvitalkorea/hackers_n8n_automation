# PRD (Product Requirements Document) — Next.js SaaS Starter

## 1) 제품 개요
- **제품 한줄 설명**: 이메일/비밀번호 기반 인증, 팀/권한(RBAC), Stripe 구독 결제(Checkout + Customer Portal), 계정 설정, 활동 로그를 포함한 SaaS 스타터 템플릿.
- **대상 고객**: SaaS MVP를 빠르게 출시하려는 개발자/팀.
- **핵심 가치**: “가입 → 팀 생성/초대 → 구독 시작/관리 → 계정/보안 관리”의 SaaS 표준 흐름을 최소 구현으로 제공.

## 2) 목표(Goals)
- **G1.** 이메일/비밀번호 인증으로 로그인 세션을 유지한다(쿠키 기반 JWT).
- **G2.** 사용자와 팀(Workspace) 기본 모델을 제공하고 팀 멤버를 관리한다.
- **G3.** Stripe를 통한 구독 결제 시작 및 변경/해지를 사용자 포털로 위임한다.
- **G4.** 계정 정보 변경, 비밀번호 변경, 계정 삭제(소프트 삭제)를 제공한다.
- **G5.** 주요 사용자 이벤트를 활동 로그로 남기고 조회한다.

## 3) 비목표(Non-goals)
- 소셜 로그인/SSO, 이메일 인증(verify email), 비밀번호 재설정(Reset password)
- 인보이스/세금계산서/쿠폰 정책 등 고급 결제 운영 기능
- 멀티 팀 전환 UX(한 사용자가 여러 팀에 속하는 복잡한 워크스페이스 UX)
- 프로필 이미지 업로드/저장(현재 UI에 힌트만 존재)

## 4) 성공 지표(Success Metrics) — 스타터 관점
- **개발 생산성**: 로컬에서 `db:setup` → `db:migrate` → `db:seed` 후 즉시 동작(README 흐름).
- **핵심 플로우 완주율**: (1) 회원가입→(2) 대시보드 진입→(3) Pricing에서 Checkout→(4) 구독 상태가 팀에 반영→(5) Portal에서 구독 관리.
- **안정성**: Stripe 웹훅 처리 실패율/재시도 성공률, 세션 검증 실패 시 안전한 리다이렉트.

## 5) 사용자/역할(Personas & Roles)
- **익명 방문자(Anonymous)**: 랜딩/가격 확인, 가입/로그인 진입.
- **일반 사용자(Member)**: 대시보드 접근, 계정/보안 설정, 팀 정보 조회.
- **팀 소유자(Owner)**: 멤버 초대, (의도상) 멤버 관리, 구독 관리.

## 6) 주요 기능 범위(Functional Requirements)

### 6.1 인증/세션
- **FR-AUTH-01**: 이메일/비밀번호로 회원가입/로그인한다.
- **FR-AUTH-02**: 로그인 시 `session` 쿠키에 JWT를 저장한다.
- **FR-AUTH-03**: 보호된 경로(`/dashboard` 하위)에 대해 인증이 없으면 `/sign-in`으로 리다이렉트한다.
- **FR-AUTH-04**: GET 요청 시 세션 쿠키를 1일 연장(갱신)한다(토큰 verify 후 재발급).

### 6.2 팀(Workspace) 및 멤버십
- **FR-TEAM-01**: 회원가입 시 기본 팀을 생성하고 가입자를 team owner로 등록한다(초대가 없는 경우).
- **FR-TEAM-02**: 팀은 멤버 목록을 가진다(`team_members`).
- **FR-TEAM-03**: 오너는 이메일로 멤버를 초대할 수 있다(초대 레코드 생성).
- **FR-TEAM-04**: 초대 수락(가입 시 `inviteId`) 시 해당 팀에 지정 role로 조인한다.
- **FR-TEAM-05**: 팀 구독 상태(플랜/상태/Stripe IDs)를 보관한다.

### 6.3 결제/구독(Stripe)
- **FR-BILL-01**: `/pricing`에서 Stripe 가격/상품을 조회해 플랜을 표시한다(SSR, `revalidate=3600`).
- **FR-BILL-02**: 구독 Checkout 세션을 생성하고 Stripe로 리다이렉트한다.
- **FR-BILL-03**: Checkout 성공 시 팀 레코드에 `stripeCustomerId`, `stripeSubscriptionId`, `stripeProductId`, `planName`, `subscriptionStatus`를 갱신한다.
- **FR-BILL-04**: Customer Portal로 이동해 구독 변경/취소/결제수단 변경을 처리한다.
- **FR-BILL-05**: Stripe webhook(`subscription.updated/deleted`)을 수신해 팀 구독 상태를 동기화한다.

### 6.4 계정/보안 설정
- **FR-ACC-01**: 계정 이름/이메일을 수정한다.
- **FR-SEC-01**: 비밀번호를 변경한다(현재 비밀번호 검증 + 새 비밀번호 정책).
- **FR-SEC-02**: 계정을 소프트 삭제한다(`deletedAt` 설정 + email 유니크 보장용 suffix).
- **FR-SEC-03**: 로그아웃 시 세션 쿠키를 제거한다.

### 6.5 활동 로그(Activity Log)
- **FR-ACT-01**: 주요 이벤트(가입/로그인/로그아웃/비밀번호 변경/계정 삭제/팀 생성/초대/초대수락/멤버 제거 등)를 DB에 저장한다.
- **FR-ACT-02**: 최근 활동 10개를 조회한다(현재 구현은 “내 userId 기준”).

## 7) 데이터 모델(요약)
- **users**: id, name, email(unique), passwordHash, role(default member), deletedAt(soft delete)
- **teams**: id, name, Stripe customer/subscription/product IDs, planName, subscriptionStatus
- **team_members**: userId ↔ teamId, role
- **invitations**: teamId, email, role, status(pending/accepted)
- **activity_logs**: teamId, userId, action(ActivityType), ipAddress, timestamp

## 8) 정책/제약 및 구현 기반 가정
- **세션 보안**: 쿠키 `httpOnly`, `secure: true`, `sameSite: lax` (로컬 개발은 https 환경이 아니면 주의 필요).
- **대시보드 보호 범위**: 글로벌 미들웨어는 현재 `/dashboard` prefix만 보호.
- **권한 체크**:
  - UI 상 초대는 `owner`만 가능하도록 disable 처리됨.
  - 일부 팀 멤버 제거 동작은 서버 액션에서 role 검증이 약할 수 있으므로, 프로덕션 사용 시 “오너만 제거 가능” 등 정책을 서버에서 강제하는 보강이 권장됨.

## 9) 비기능 요구사항(Non-functional Requirements)
- **보안**: 패스워드 bcrypt 해시, JWT 서명 키(`AUTH_SECRET`) 필수.
- **결제 안정성**: 웹훅 서명 검증(`STRIPE_WEBHOOK_SECRET`) 및 idempotency 고려(추가 보강 여지).
- **성능**: Pricing 데이터는 1시간 캐시(재검증).
- **감사 가능성**: 주요 계정/팀 이벤트를 activity log로 추적.

