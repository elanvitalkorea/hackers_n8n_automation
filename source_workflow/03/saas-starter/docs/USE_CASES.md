# Use Cases — Next.js SaaS Starter

## 표기 규칙
- **Actor**: 기능을 수행하는 주체(사용자/Stripe 등)
- **Preconditions**: 실행 전 조건
- **Trigger**: 시작 이벤트
- **Main Flow**: 기본 성공 시나리오
- **Alternative/Exception**: 예외/대체 흐름
- **Postconditions**: 실행 후 상태

---

## UC-01 회원가입(새 팀 생성)
- **Actor**: 익명 사용자
- **Preconditions**: 이메일이 미사용 상태
- **Trigger**: `/sign-up`에서 가입 폼 제출
- **Main Flow**
  - 이메일/비밀번호 유효성 검증
  - `users` 생성(기본 role `owner`로 설정)
  - `teams` 생성(예: “{email}'s Team”)
  - `team_members`에 owner로 매핑
  - `activity_logs`: `CREATE_TEAM`, `SIGN_UP` 기록
  - `session` 쿠키 설정 후 `/dashboard`로 이동
- **Alternative/Exception**
  - 이메일 중복: 에러 반환
  - 팀 생성 실패: 에러 반환
- **Postconditions**
  - 사용자/팀/멤버십이 생성되고 로그인 상태가 됨

---

## UC-02 회원가입(초대 수락을 통한 가입)
- **Actor**: 익명 사용자
- **Preconditions**: `invitations`에 `pending` 상태의 초대가 존재하고, 가입 이메일이 초대 이메일과 일치
- **Trigger**: `/sign-up?inviteId=...`로 진입 후 폼 제출
- **Main Flow**
  - 초대 레코드 검증(teamId/email/status)
  - 초대 `accepted` 처리
  - 해당 teamId로 `team_members` 생성(초대 role 적용)
  - `activity_logs`: `ACCEPT_INVITATION`, `SIGN_UP` 기록
  - 세션 설정 후 `/dashboard` 이동
- **Alternative/Exception**
  - inviteId 무효/만료: 에러 반환
- **Postconditions**
  - 기존 팀에 멤버로 편입되고 로그인 상태가 됨

---

## UC-03 로그인
- **Actor**: 익명 사용자
- **Preconditions**: 사용자가 존재, 패스워드 일치
- **Trigger**: `/sign-in` 폼 제출
- **Main Flow**
  - 이메일로 유저 조회 + bcrypt compare
  - 세션 쿠키 설정
  - `activity_logs`: `SIGN_IN` 기록
  - `/dashboard`로 이동
- **Alternative/Exception**
  - 인증 실패: 에러 반환(“Invalid email or password”)
- **Postconditions**
  - 로그인 상태(쿠키 JWT)로 보호된 페이지 접근 가능

---

## UC-04 로그아웃
- **Actor**: 로그인 사용자
- **Preconditions**: 유효한 세션
- **Trigger**: 헤더 메뉴에서 Sign out
- **Main Flow**
  - `activity_logs`: `SIGN_OUT` 기록
  - `session` 쿠키 삭제
  - 홈(`/`)으로 이동
- **Postconditions**
  - 세션이 제거되어 보호된 라우트 접근 시 로그인으로 리다이렉트

---

## UC-05 가격 페이지 조회
- **Actor**: 모든 사용자
- **Preconditions**: Stripe API 키 구성(운영/로컬)
- **Trigger**: `/pricing` 방문
- **Main Flow**
  - Stripe Prices/Products 조회(활성 recurring)
  - Base/Plus 플랜 카드 렌더
- **Alternative/Exception**
  - Stripe 설정 미흡 시: 기본값(코드 내 fallback 가격/트라이얼)으로 표시될 수 있음
- **Postconditions**
  - 사용자는 플랜을 비교하고 구독 구매를 시작할 수 있음

---

## UC-06 구독 구매 시작(Checkout)
- **Actor**: 사용자(로그인 또는 익명)
- **Preconditions**: 선택된 `priceId` 존재
- **Trigger**: `/pricing`에서 플랜 버튼 클릭(서버 액션)
- **Main Flow**
  - 로그인/팀 존재 여부 확인
  - 미로그인/팀 없음: `/sign-up?redirect=checkout&priceId=...`로 리다이렉트
  - 로그인+팀 존재: Stripe Checkout session 생성(mode=subscription, trial=14d)
  - Stripe Checkout URL로 리다이렉트
- **Postconditions**
  - Stripe 결제 플로우로 이동

---

## UC-07 Checkout 성공 처리(팀 구독 상태 반영)
- **Actor**: 시스템(Stripe redirect), 사용자
- **Preconditions**: Stripe Checkout 완료, `session_id` 존재
- **Trigger**: Stripe가 `success_url`로 리다이렉트 → `/api/stripe/checkout?session_id=...`
- **Main Flow**
  - Checkout session 조회(고객/구독 확장)
  - subscription 조회 후 product/plan 식별
  - `client_reference_id`로 사용자 식별
  - 해당 사용자의 팀(team_members)을 찾아 `teams`에 Stripe IDs/planName/status 업데이트
  - 세션 재설정 후 `/dashboard`로 리다이렉트
- **Alternative/Exception**
  - session_id 누락: `/pricing` 리다이렉트
  - Stripe 응답 불일치/DB 미존재: 에러 로깅 후 `/error` 리다이렉트(현재 라우트는 명시 구현은 없음)
- **Postconditions**
  - 대시보드에서 “Current Plan/Status”가 표시됨

---

## UC-08 Stripe Webhook 기반 구독 동기화
- **Actor**: Stripe(시스템)
- **Preconditions**: webhook endpoint 및 secret 설정
- **Trigger**: `customer.subscription.updated|deleted` 이벤트
- **Main Flow**
  - 서명 검증 후 이벤트 파싱
  - customerId로 팀 조회
  - status에 따라 팀 구독 상태 업데이트(active/trialing 유지, canceled/unpaid는 null 처리)
- **Postconditions**
  - Stripe 상태가 DB에 반영되어 UI에 일관되게 표시됨

---

## UC-09 Customer Portal에서 구독 관리
- **Actor**: 로그인 사용자
- **Preconditions**: 팀에 `stripeCustomerId` 및 `stripeProductId` 존재
- **Trigger**: `/dashboard`에서 “Manage Subscription” 클릭
- **Main Flow**
  - Billing portal configuration 생성/재사용
  - Portal session 생성 후 Stripe 포털로 리다이렉트
  - 포털에서 플랜 변경/취소/결제수단 변경
- **Alternative/Exception**
  - Stripe IDs 미존재: `/pricing`으로 리다이렉트
- **Postconditions**
  - 변경 결과는 웹훅 또는 다음 조회 시 팀 구독 상태에 반영

---

## UC-10 계정 정보 변경(General)
- **Actor**: 로그인 사용자
- **Preconditions**: 유효한 세션
- **Trigger**: `/dashboard/general` 폼 제출
- **Main Flow**
  - 이름/이메일 검증 후 `users` 업데이트
  - `activity_logs`: `UPDATE_ACCOUNT` 기록
- **Postconditions**
  - 사용자 정보가 변경되고 성공 메시지 표시

---

## UC-11 비밀번호 변경(Security)
- **Actor**: 로그인 사용자
- **Preconditions**: 유효한 세션, 현재 비밀번호 입력
- **Trigger**: `/dashboard/security`에서 비밀번호 변경 폼 제출
- **Main Flow**
  - 현재 비밀번호 검증
  - 새 비밀번호 정책 검증(길이/불일치/동일 여부)
  - `passwordHash` 업데이트
  - `activity_logs`: `UPDATE_PASSWORD` 기록
- **Alternative/Exception**
  - 현재 비밀번호 불일치/정책 위반: 에러 반환
- **Postconditions**
  - 비밀번호가 변경됨

---

## UC-12 계정 삭제(Security, Soft Delete)
- **Actor**: 로그인 사용자
- **Preconditions**: 유효한 세션, 비밀번호 확인
- **Trigger**: `/dashboard/security`에서 계정 삭제 폼 제출
- **Main Flow**
  - 비밀번호 검증
  - `activity_logs`: `DELETE_ACCOUNT` 기록
  - `users.deletedAt` 설정 + email 유니크 보장을 위해 email 변경(suffix)
  - 해당 팀 멤버십 삭제(team_members delete)
  - 세션 쿠키 삭제 후 `/sign-in` 이동
- **Alternative/Exception**
  - 비밀번호 불일치: 에러 반환
- **Postconditions**
  - 계정은 소프트 삭제되며 재로그인 불가(동일 이메일 재사용 가능)

---

## UC-13 팀 멤버 초대(Owner)
- **Actor**: 팀 Owner(의도상), 로그인 사용자
- **Preconditions**: 팀 소속, 대상 이메일이 팀 멤버가 아님, 기존 pending 초대가 없음
- **Trigger**: `/dashboard`에서 Invite 폼 제출
- **Main Flow**
  - 초대 이메일/role 검증
  - invitations 생성(status=pending)
  - `activity_logs`: `INVITE_TEAM_MEMBER` 기록
  - (TODO) 초대 이메일 발송 및 가입 링크(`?inviteId=`) 포함
- **Postconditions**
  - 초대 레코드가 생성됨

---

## UC-14 활동 로그 조회
- **Actor**: 로그인 사용자
- **Preconditions**: 유효한 세션
- **Trigger**: `/dashboard/activity` 방문
- **Main Flow**
  - 최근 10개의 활동 로그 조회 및 표시
- **Postconditions**
  - 사용자는 최근 계정/팀 관련 이벤트를 확인 가능

