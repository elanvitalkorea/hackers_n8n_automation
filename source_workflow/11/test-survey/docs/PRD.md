# PRD: AI 자동화 강의 만족도 조사 웹 애플리케이션
- **프로젝트명**: 11차시 - Next.js 설문조사 프론트엔드
- **작성자**: (담당자 이름)
- **최종 수정일**: 2025년 10월 22일
- **상태**: Production Ready
- **개발 서버**: http://localhost:3001 (기본 포트, 충돌 시 자동으로 3001, 3002 등으로 할당됨)
- **배포**: Vercel

---

## 목차
1. [프로젝트 개요](#1-프로젝트-개요)
2. [프로젝트 목표](#2-프로젝트-목표)
3. [기술 스택](#3-기술-스택)
4. [프로젝트 구조](#4-프로젝트-구조)
5. [환경변수 설정](#5-환경변수-설정)
6. [UI/UX 디자인](#6-uiux-디자인)
7. [페이지 명세](#7-페이지-명세)
8. [API 명세](#8-api-명세)
9. [데이터베이스 스키마](#9-데이터베이스-스키마)
10. [개발 가이드](#10-개발-가이드)
11. [배포 가이드](#11-배포-가이드)
12. [문제 해결](#12-문제-해결)

---

## 1. 프로젝트 개요
'AI x n8n 업무 자동화 실전 프로젝트' 강의 수강생(직장인)을 대상으로 강의 만족도를 수집하고, 제출된 데이터를 실시간으로 시각화하는 대시보드 웹 애플리케이션을 개발한다.

본 프로젝트는 Next.js의 핵심 기능(App Router, API Routes, SSR/ISR)과 Supabase(DB, SQL Functions)를 연동하는 풀스택 개발 경험을 목표로 한다.

### 주요 기능
- ✅ **설문 제출**: Dark Glassmorphism 디자인의 모던한 설문 폼
- ✅ **실시간 통계**: ISR을 활용한 실시간 데이터 시각화 (60초 간격 갱신)
- ✅ **자동화 연동**: n8n 웹훅을 통한 SMS 발송 및 관리자 알림
- ✅ **NPS 계산**: Supabase SQL 함수를 통한 실시간 NPS 점수 계산
- ✅ **반응형 디자인**: 모바일/태블릿/데스크톱 대응
- ✅ **타입 안전성**: TypeScript 전면 적용

---

## 2. 프로젝트 목표
1. **데이터 수집**: 강의 만족도 및 수강생 프로필(직책, 회사 규모 등) 데이터 수집.
2. **실시간 시각화**: 수집된 데이터를 즉각적으로 집계하여 그래프와 KPI로 시각화하는 대시보드 제공.
3. **자동화 연동**: 설문 제출 시 n8n 웹훅을 트리거하여 SMS 발송 및 관리자 알림 자동화 구현.
4. **기술 스택 활용**: Next.js 15, Tailwind CSS v4, Supabase의 주요 기능을 활용한 모던 웹 개발.
5. **최적의 성능**: SSG/ISR을 활용한 빠른 페이지 로딩과 실시간 데이터 갱신

---

## 3. 기술 스택

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.7+
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss"`)
- **UI Components**: Custom Glass morphism 컴포넌트
- **Charts**: Recharts 2.15+
- **Build Tool**: Turbopack

### Backend
- **API**: Next.js API Routes (서버리스)
- **Database**: Supabase (PostgreSQL)
- **DB Logic**: Supabase SQL Functions (RPC)
- **Authentication**: N/A (공개 설문)

### Automation & External Services
- **Workflow**: n8n (Webhook)
- **SMS**: Solapi API (n8n에서 호출)
- **Notification**: Telegram Bot (n8n에서 호출)

### Infrastructure
- **Hosting**: Vercel
- **Database**: Supabase Cloud
- **CI/CD**: Vercel Auto Deploy (GitHub 연동)

### Development Tools
- **Package Manager**: npm
- **Version Control**: Git
- **Code Quality**: ESLint, TypeScript Strict Mode
- **Project Structure**: src/ 디렉토리 기반

---

## 4. 프로젝트 구조

```
survey_report/
├── src/                                # 소스 코드 루트
│   ├── app/                           # Next.js App Router
│   │   ├── api/                       # API Routes
│   │   │   ├── submit/route.ts       # POST - 설문 제출 API
│   │   │   └── stats/route.ts        # GET - 통계 조회 API
│   │   ├── stats/                     # 통계 페이지
│   │   │   ├── page.tsx              # 통계 대시보드 (ISR, 60초)
│   │   │   └── StatsClient.tsx       # 클라이언트 차트 컴포넌트
│   │   ├── layout.tsx                 # 루트 레이아웃
│   │   ├── page.tsx                   # 메인 설문 페이지 (SSG)
│   │   └── globals.css                # Tailwind v4 스타일
│   └── lib/                           # 공통 라이브러리
│       ├── supabase.ts                # Supabase 클라이언트
│       ├── types.ts                   # TypeScript 타입 정의
│       └── validation.ts              # 유효성 검사 함수
├── docs/                              # 문서
│   ├── PRD.md                        # 제품 요구사항 정의서
│   └── supabase_rpc.sql              # RPC 함수 정의
├── supabase_schema.sql               # 테이블 스키마
├── supabase_functions.sql            # SQL 함수 정의
└── README.md                          # 프로젝트 소개
```

### 주요 파일 설명

#### src/app/page.tsx
- 메인 설문 페이지 (SSG)
- Dark Glassmorphism UI
- 클라이언트 사이드 유효성 검사
- 전화번호 자동 포맷팅 (010-XXXX-XXXX)

#### src/app/stats/page.tsx  
- 통계 대시보드 (ISR, 60초 재검증)
- KPI 카드 (총 응답자, NPS 점수)
- Recharts 차트 컴포넌트 임포트
- 동적 포트 처리 로직 (VERCEL_URL 또는 PORT 환경변수 사용)

#### src/app/api/submit/route.ts
- 설문 데이터 DB 저장
- NPS 점수 계산
- n8n 웹훅 트리거 (상세 로깅 포함: 🔔📤✅❌ 이모지로 구분)
- 유효성 검사 (이메일, 전화번호, 만족도 범위)

#### src/app/api/stats/route.ts
- Supabase RPC 함수 호출
- 대시보드 통계 데이터 반환

#### src/lib/supabase.ts
```typescript
// 클라이언트용 (브라우저)
export const supabase = createClient(url, anonKey)

// 서버용 (API Routes)
export const getServerSupabaseClient = () => 
  createClient(url, serviceRoleKey)
```
- 환경변수 검증 및 에러 처리 포함

#### src/lib/validation.ts
- `validateEmail()`: 이메일 형식 검증
- `validatePhone()`: 전화번호 형식 검증 (010-XXXX-XXXX)
- `formatPhoneNumber()`: 전화번호 자동 포맷팅

#### src/lib/types.ts
- `SurveyFormData`: 설문 폼 데이터 타입
- `DashboardStats`: 대시보드 통계 데이터 타입
- `Position`, `CompanySize`: 선택 옵션 타입 정의

---

## 5. 환경변수 설정

### 5.1. env.sample 파일
프로젝트 루트에 `env.sample` 파일이 제공됩니다. 이 파일을 복사하여 `.env.local` 파일을 생성하세요:

```bash
cp env.sample .env.local
```

### 5.2. 필요한 환경변수

```env
# Supabase Configuration
# Supabase Dashboard > Settings > API에서 확인

# Supabase Project URL
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co

# Supabase Anonymous Key (공개 키 - 클라이언트 사이드)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Supabase Service Role Key (비밀 키 - 서버 사이드 전용)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# n8n Webhook URL (선택사항)
N8N_WEBHOOK_URL=https://your-n8n-domain.com/webhook/your-webhook-id

# Default PORT
PORT=3001
```

### 5.3. 환경변수 확인 방법

#### Supabase 설정
1. [Supabase Dashboard](https://app.supabase.com) 로그인
2. 프로젝트 선택
3. **Settings > API** 메뉴로 이동
4. 값 복사:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY`

#### n8n 웹훅 URL
1. n8n 워크플로우에서 Webhook 노드 생성
2. Production URL 복사 → `N8N_WEBHOOK_URL`

### 5.4. 보안 주의사항

**✅ 안전:**
- `.env.local` 파일은 `.gitignore`에 포함 (Git 커밋 안 됨)
- `NEXT_PUBLIC_*` 접두사: 클라이언트에 노출되어도 안전
- `SUPABASE_SERVICE_ROLE_KEY`: 서버에서만 사용

**❌ 위험:**
- `.env.local` 파일을 Git에 커밋
- `SUPABASE_SERVICE_ROLE_KEY`를 클라이언트 코드에서 사용
- 환경변수를 코드에 하드코딩

---

## 6. UI/UX 디자인

### 6.1. 디자인 컨셉
**Dark Glassmorphism**
- 어두운 배경 (`#0a0a0f`) + 다채로운 그라데이션 효과
- 반투명 카드 (`backdrop-filter: blur(16px)`)
- 부드러운 애니메이션 및 호버 효과
- 집중도 높은 모던 UI

### 6.2. Tailwind CSS v4 특징
```css
/* globals.css */
@import "tailwindcss";  /* v4 새로운 구문 */

@layer utilities {
  .glass-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
}
```

### 6.3. 주요 컴포넌트 클래스

| 클래스명 | 용도 | 주요 스타일 |
|---------|------|------------|
| `glass-card` | 카드 컨테이너 | 반투명 배경 + blur |
| `glass-input` | 입력 필드 | blur + focus ring |
| `glass-button` | 액션 버튼 | 그라데이션 + hover |
| `glass-label` | 라벨 텍스트 | 반투명 흰색 |
| `glass-select` | 드롭다운 | blur + 커스텀 화살표 |

### 6.4. 반응형 브레이크포인트
- **Mobile**: < 768px
- **Tablet**: 768px ~ 1024px
- **Desktop**: > 1024px

---

## 7. 페이지 명세

### 7.1. 메인 (설문) 페이지 (`/`)
- **경로**: `/`
- **파일**: `src/app/page.tsx`
- **렌더링 전략**: **SSG (Static Site Generation)**
  - 설문지 폼 자체는 정적이므로 빌드 시점에 HTML을 생성하여 가장 빠른 속도를 제공한다.

#### 핵심 기능
1. **설문 폼**: Dark Glassmorphism 디자인의 폼 카드
2. **입력 필드**:
   - **이름** (text, 필수)
   - **전화번호** (text, 필수, `010-XXXX-XXXX` 자동 포맷팅)
   - **회사 이메일** (email, 필수, 도메인 검증)
   - **회사명** (text, 필수)
   - **직책** (select, 필수): `[개발자, 매니저, 임원, 기타]`
   - **회사 규모** (radio, 필수): `[1-10명, 11-50명, 51-200명, 201명 이상]`
   - **강의 만족도** (range, 1-10점, 필수)
   - **강의 관련 코멘트** (textarea, 선택)

3. **제출 플로우**:
   ```
   1. 사용자 입력 → 클라이언트 사이드 유효성 검사
   2. 유효 → POST /api/submit 호출 (로딩 스피너 표시)
   3. 성공 → router.push('/stats')
   4. 실패 → 에러 메시지 alert
   ```

#### 유효성 검사 규칙
- 이름: 비어있지 않아야 함
- 전화번호: `010-XXXX-XXXX` 정확한 형식
- 이메일: 유효한 이메일 형식
- 회사명: 비어있지 않아야 함
- 직책, 회사 규모: 선택 필수
- 만족도: 1-10 범위 내

### 7.2. 통계 대시보드 페이지 (`/stats`)
- **경로**: `/stats`
- **파일**: `src/app/stats/page.tsx`
- **렌더링 전략**: **ISR (Incremental Static Regeneration)**
  - `revalidate: 60` (1분)
  - 데이터가 자주 변경되지만, 모든 유저가 1초마다 DB를 조회할 필요는 없으므로 60초 주기의 ISR이 가장 효율적

#### 핵심 기능
1. **실시간 통계 데이터 시각화**: `GET /api/stats`로부터 받은 데이터 표시
2. **KPI 카드** (2개):
   - **총 응답자 수**: 전체 설문 응답 건수
   - **현재 NPS 점수**: 실시간 계산된 NPS (Net Promoter Score)
     - 50점 이상: 🎉 Excellent
     - 0~49점: 👍 Good
     - 음수: ⚠️ Needs Improvement

3. **차트** (Recharts 사용):
   - **직책별 분포**: 막대그래프 (Bar Chart)
     - X축: 직책 (개발자, 매니저, 임원, 기타)
     - Y축: 응답자 수
   - **회사 규모 분포**: 파이그래프 (Pie Chart)
     - 각 규모별 비율 표시
     - 6가지 색상 팔레트

4. **네비게이션**:
   - '설문으로 돌아가기' 버튼 (`<Link href="/">`)

---

## 8. API 명세

### 8.1. POST /api/submit

**역할**: 신규 설문 데이터 저장 및 n8n 워크플로우 트리거

**엔드포인트**: `POST /api/submit`

**Request Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "name": "홍길동",
  "phone": "010-1234-5678",
  "company_email": "hong@example.com",
  "company_name": "테크컴퍼니",
  "position": "개발자",
  "company_size": "11-50명",
  "satisfaction": 9,
  "comment": "좋은 강의였습니다. (선택)"
}
```

**Response (성공 - 201 Created)**:
```json
{
  "success": true,
  "message": "설문이 성공적으로 제출되었습니다.",
  "nps_score": 75.5
}
```

**Response (실패 - 400 Bad Request)**:
```json
{
  "error": "필수 입력 항목이 누락되었습니다."
}
```

**처리 로직**:
1. Request Body 데이터 유효성 검사
   - 필수 필드 확인
   - 이메일 형식 검증
   - 전화번호 형식 검증 (`010-XXXX-XXXX`)
   - 만족도 범위 확인 (1-10)

2. [Supabase] `surveys` 테이블에 데이터 INSERT
   ```sql
   INSERT INTO surveys (name, phone, company_email, ...) 
   VALUES (...)
   ```

3. [Supabase] NPS 점수 계산
   ```typescript
   const { data: npsData } = await supabase.rpc('calculate_current_nps')
   ```

4. [n8n] 웹훅 트리거 (비동기, 실패해도 사용자 응답에 영향 없음)
   ```typescript
   await fetch(N8N_WEBHOOK_URL, {
     method: 'POST',
     body: JSON.stringify({ 
       name: body.name,      // 제출자 이름
       phone: body.phone,    // 전화번호 (010-XXXX-XXXX)
       nps_score: currentNps // 현재 NPS 점수
     })
   })
   ```
   - 상세 로깅 포함 (🔔📤✅❌ 이모지로 구분)
   - 웹훅 실패 시에도 설문 제출은 정상 완료

5. 성공 응답 반환

**n8n 워크플로우** (본 프로젝트 범위 외):
- 웹훅으로 `{ name, phone, nps_score }` 수신
- [Solapi] SMS 발송: "{name}님, 설문 감사합니다. 20% 쿠폰: XXXXX"
- [Telegram] 관리자 알림: "신규 설문 제출! 현재 NPS: {nps_score}점"

### 8.2. GET /api/stats

**역할**: 대시보드 페이지에 필요한 모든 통계 데이터 제공

**엔드포인트**: `GET /api/stats`

**Request**: 없음

**Response (200 OK)**:
```json
{
  "total_respondents": 150,
  "nps_score": 45.3,
  "position_distribution": [
    { "position": "개발자", "count": 80 },
    { "position": "매니저", "count": 40 },
    { "position": "임원", "count": 20 },
    { "position": "기타", "count": 10 }
  ],
  "company_size_distribution": [
    { "company_size": "1-10명", "count": 30 },
    { "company_size": "11-50명", "count": 70 },
    { "company_size": "51-200명", "count": 40 },
    { "company_size": "201명 이상", "count": 10 }
  ]
}
```

**참고**: `company_size_distribution`의 필드명은 `size`가 아닌 `company_size`입니다.

**처리 로직**:
1. [Supabase] RPC 함수 1회 호출
   ```typescript
   const { data } = await supabase.rpc('get_dashboard_stats')
   ```

2. 반환된 JSON을 그대로 클라이언트에 응답

**성능 최적화**:
- 단일 RPC 호출로 모든 통계 데이터 조회
- DB 레벨에서 GROUP BY 집계 수행
- ISR 캐싱 (60초 유효)

---

## 9. 데이터베이스 스키마

### 핵심 전략
> **데이터 테이블은 `surveys` 1개만 운영한다.**
> 
> nps 및 stat 테이블은 사용하지 않으며, 모든 집계는 2개의 SQL 함수(RPC)를 통해 실시간으로 처리한다.

### 9.1. 테이블: `surveys`

**설명**: 모든 설문 응답 원본 데이터를 저장하는 유일한 테이블

| 컬럼명 | 타입 | 제약조건 | 설명 |
|---|---|---|---|
| `id` | `uuid` | `Primary Key`, `default gen_random_uuid()` | 고유 식별자 |
| `created_at` | `timestamptz` | `default now()` | 생성 시각 |
| `name` | `text` | `Not Null` | 이름 |
| `phone` | `text` | `Not Null` | 전화번호 |
| `company_email` | `text` | `Not Null` | 회사 이메일 |
| `company_name` | `text` | `Not Null` | 회사명 |
| `position` | `text` | `Not Null` | 직책 |
| `company_size` | `text` | `Not Null` | 회사 규모 |
| `satisfaction` | `smallint` | `Not Null`, `Check (1~10)` | 강의 만족도 (1-10) |
| `comment` | `text` | | 코멘트 (선택) |

**인덱스**:
```sql
CREATE INDEX idx_surveys_created_at ON surveys(created_at DESC);
CREATE INDEX idx_surveys_position ON surveys(position);
CREATE INDEX idx_surveys_company_size ON surveys(company_size);
CREATE INDEX idx_surveys_satisfaction ON surveys(satisfaction);
```

### 9.2. SQL 함수 (RPC)

**설명**: Supabase Dashboard > Database > Functions에서 생성  
**파일**: `supabase_functions.sql` 참고

#### 9.2.1. `calculate_current_nps()`

**역할**: `/api/submit`이 n8n에 보낼 현재 NPS 점수를 계산

**반환 타입**: `float`

**NPS 공식**:
```
NPS = ((Promoters - Detractors) / 총응답자수) × 100

- Promoters (추천자): satisfaction >= 9
- Passives (중립자): satisfaction = 7 or 8
- Detractors (비추천자): satisfaction <= 6
```

**로직**:
1. `surveys` 테이블에서 전체 응답 수 조회
2. Promoters (9-10점) 수 계산
3. Detractors (1-6점) 수 계산
4. NPS 공식 적용 후 반환

**사용 예시**:
```sql
SELECT calculate_current_nps();
-- 결과: 45.5
```

#### 9.2.2. `get_dashboard_stats()`

**역할**: `/api/stats`가 대시보드에 뿌릴 모든 데이터를 한 번에 JSON으로 집계

**반환 타입**: `jsonb`

**로직**:
1. `total_respondents`: 총 응답자 수 (`COUNT(*)`)
2. `nps_score`: NPS 점수 (`calculate_current_nps()` 호출)
3. `position_distribution`: 직책별 분포 (`GROUP BY position`)
4. `company_size_distribution`: 회사 규모별 분포 (`GROUP BY company_size`)
5. 위 4가지 데이터를 하나의 JSON 객체로 묶어 반환

**사용 예시**:
```sql
SELECT get_dashboard_stats();
-- 결과: { "total_respondents": 150, "nps_score": 45.3, ... }
```

**성능 이점**:
- 4개의 별도 쿼리 대신 1개의 RPC 호출
- DB 레벨에서 집계 처리 (애플리케이션 로드 감소)
- 네트워크 왕복 횟수 최소화

---

## 10. 개발 가이드

### 10.1. 프로젝트 설정 (최초 1회)

```bash
# 1. 프로젝트 클론
git clone [repository-url]
cd survey_report

# 2. 의존성 설치
npm install

# 3. 환경변수 설정
cp env.sample .env.local
# env.local 파일을 열어서 실제 값 입력

# 4. Supabase 테이블 생성
# Supabase Dashboard > SQL Editor에서 supabase_schema.sql 실행

# 5. Supabase SQL 함수 생성
# Supabase Dashboard > SQL Editor에서 supabase_functions.sql 실행
```

### 10.2. 개발 서버 실행

```bash
# Turbopack을 사용한 개발 서버 (빠른 HMR)
npm run dev

# 브라우저에서 http://localhost:3000 접속
```

### 10.3. 빌드 및 로컬 테스트

```bash
# 프로덕션 빌드
npm run build

# 빌드된 앱 실행
npm start

# 브라우저에서 http://localhost:3000 접속
```

### 10.4. 코드 스타일 검사

```bash
# ESLint 검사
npm run lint
```

### 10.5. 주요 npm 스크립트

```json
{
  "scripts": {
    "dev": "next dev --turbopack",       // 개발 서버 (Turbopack)
    "build": "next build --turbopack",   // 프로덕션 빌드
    "start": "next start",                // 빌드된 앱 실행
    "lint": "next lint"                   // ESLint 검사
  }
}
```

### 10.6. 개발 팁

#### TypeScript 경로 별칭
```typescript
// @/* 는 src/* 를 가리킵니다
import { supabase } from '@/lib/supabase'
import { Post } from '@/lib/types'
```

#### Tailwind CSS v4 커스텀 유틸리티
```css
/* src/app/globals.css */
@import "tailwindcss";

@layer utilities {
  .my-custom-class {
    /* 커스텀 스타일 */
  }
}
```

#### 환경변수 확인
```typescript
// 클라이언트: NEXT_PUBLIC_* 만 접근 가능
const url = process.env.NEXT_PUBLIC_SUPABASE_URL

// 서버 (API Routes, Server Components): 모든 환경변수 접근 가능
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
```

---

## 11. 배포 가이드

### 11.1. Vercel 배포 (권장)

#### 사전 준비
- GitHub 계정
- Vercel 계정 (GitHub 연동)
- Supabase 프로젝트 (프로덕션용)

#### 배포 단계

**1. GitHub 레포지토리 생성**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin [your-github-repo-url]
git push -u origin main
```

**2. Vercel 프로젝트 연결**
1. [Vercel Dashboard](https://vercel.com) 접속
2. "Add New Project" 클릭
3. GitHub 레포지토리 선택
4. 프레임워크: Next.js (자동 감지)
5. Root Directory: `.` (프로젝트 루트)
6. Build Command: `npm run build`
7. Output Directory: `.next` (기본값)

**3. 환경변수 설정**

Vercel Dashboard > Settings > Environment Variables에서 추가:

| 변수명 | 값 | 환경 |
|--------|---|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase URL | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Anon Key | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role Key | Production, Preview, Development |
| `N8N_WEBHOOK_URL` | n8n Webhook URL | Production (선택사항) |

**4. 배포 실행**
- "Deploy" 버튼 클릭
- 빌드 완료 후 자동 배포

**5. 자동 배포 설정**
- `main` 브랜치에 push하면 자동으로 프로덕션 배포
- PR 생성 시 Preview 배포 자동 생성

### 11.2. 배포 후 확인 사항

- [ ] 메인 페이지 (`/`) 정상 접근
- [ ] 설문 제출 기능 정상 작동
- [ ] `/stats` 페이지 정상 접근
- [ ] 차트 데이터 정상 표시
- [ ] n8n 웹훅 정상 작동 (선택사항)
- [ ] 반응형 디자인 확인 (모바일/태블릿)

### 11.3. 도메인 연결 (선택)

1. Vercel Dashboard > Settings > Domains
2. Custom Domain 추가
3. DNS 설정 (A 레코드 또는 CNAME)
4. SSL 자동 적용 (Let's Encrypt)

---

## 12. 문제 해결

### 12.1. 빌드 에러

#### "supabaseUrl is required"
**원인**: 환경변수가 설정되지 않음

**해결방법**:
1. `.env.local` 파일 확인
2. 파일명 확인 (`.env.local.txt` 아님)
3. 개발 서버 재시작: `npm run dev`

#### "Cannot find module '@/lib/...'"
**원인**: TypeScript 경로 설정 오류

**해결방법**:
```json
// tsconfig.json 확인
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]  // ./src/* 확인
    }
  }
}
```

### 12.2. API 에러

#### "Failed to fetch stats"
**원인**: Supabase 연결 실패 또는 SQL 함수 미생성

**해결방법**:
1. Supabase URL/Key 확인
2. Supabase 프로젝트 활성 상태 확인
3. SQL 함수 생성 여부 확인:
   ```sql
   SELECT get_dashboard_stats();
   ```

#### "좋아요 증가 실패" 또는 설문 제출 실패
**원인**: 테이블 권한 또는 유효성 검사 실패

**해결방법**:
1. Supabase Dashboard > Table Editor에서 `surveys` 테이블 확인
2. RLS (Row Level Security) 설정 확인
3. 브라우저 콘솔에서 에러 메시지 확인

### 12.3. 스타일 에러

#### "스타일이 적용되지 않음"
**원인**: Tailwind CSS v4 설정 오류

**해결방법**:
1. `postcss.config.mjs` 파일명 확인 (.mjs 확장자)
2. `globals.css`에 `@import "tailwindcss";` 확인
3. 개발 서버 재시작: `npm run dev`
4. 브라우저 캐시 삭제 (Cmd/Ctrl + Shift + R)

### 12.4. n8n 웹훅

#### "웹훅이 작동하지 않음"
**원인**: 웹훅 URL 오류 또는 워크플로우 비활성화

**해결방법**:
1. `N8N_WEBHOOK_URL` 환경변수 확인
2. n8n 워크플로우가 **Active** 상태인지 확인
3. 웹훅 URL을 브라우저에서 직접 접근하여 테스트
4. 웹훅은 선택사항이므로 없어도 설문 제출은 정상 작동

**디버깅**:
서버 콘솔에서 다음 로그 메시지를 확인하세요:
- 🔔 `n8n Webhook URL: 설정됨/설정 안됨` - 환경변수 설정 상태
- 📤 `n8n 웹훅 호출 시작` - 웹훅 호출 시작 (데이터 포함)
- ✅ `n8n 웹훅 응답` - 웹훅 성공 (HTTP 상태 코드 포함)
- ❌ `n8n webhook error` - 웹훅 실패 (에러 내용 포함)
- ⚠️ `N8N_WEBHOOK_URL이 설정되지 않았습니다` - 환경변수 미설정

**테스트 명령**:
```bash
curl -X POST $N8N_WEBHOOK_URL \
  -H "Content-Type: application/json" \
  -d '{"name": "테스트", "phone": "010-1234-5678", "nps_score": 75.5}'
```

### 12.5. 성능 이슈

#### "페이지 로딩이 느림"
**원인**: ISR 캐싱 미작동 또는 대용량 데이터

**해결방법**:
1. `/stats` 페이지의 `revalidate: 60` 설정 확인
2. Supabase 인덱스 생성 확인:
   ```sql
   \d surveys  -- 인덱스 목록 확인
   ```
3. 네트워크 탭에서 API 응답 시간 확인

### 12.6. 포트 관련 이슈

#### "개발 서버가 3000번이 아닌 다른 포트에서 실행됨"
**원인**: 3000번 포트가 이미 사용 중일 때 Next.js가 자동으로 다음 사용 가능한 포트(3001, 3002, 3003, 3004 등)를 할당함

**증상**:
- 개발 서버는 정상 실행되지만 다른 포트(예: 3004)에서 실행됨
- 통계 페이지(`/stats`)에서 404 오류 발생
- 브라우저 콘솔에 "Failed to fetch stats: 404" 에러 표시

**해결방법**:
1. **권장**: 다른 애플리케이션에서 사용 중인 포트를 종료:
   ```bash
   # 3000번 포트를 사용하는 프로세스 확인
   lsof -i :3000
   
   # 해당 프로세스 종료 (PID 확인 후)
   kill -9 [PID]
   ```

2. **대안**: `PORT` 환경변수를 `.env.local`에 추가:
   ```env
   PORT=3000
   ```

3. **코드 수정 완료**: `src/app/stats/page.tsx`에서 동적 포트 처리 로직이 이미 구현되어 있음:
   ```typescript
   const baseUrl = process.env.VERCEL_URL 
     ? `https://${process.env.VERCEL_URL}`
     : `http://localhost:${process.env.PORT || 3001}`;
   ```
   - Vercel 배포 환경: VERCEL_URL 사용
   - 로컬 개발 환경: PORT 환경변수 또는 기본값 3001 사용

**참고**: 이 이슈는 로컬 개발 환경에서만 발생하며, Vercel 배포 시에는 자동으로 올바른 URL이 설정됩니다.

---

## 13. 참고 문서

### 프로젝트 문서
- **README.md**: 프로젝트 소개 및 빠른 시작

### 외부 문서
- [Next.js 공식 문서](https://nextjs.org/docs)
- [Tailwind CSS v4 문서](https://tailwindcss.com/docs)
- [Supabase 문서](https://supabase.com/docs)
- [Recharts 문서](https://recharts.org/)
- [TypeScript 문서](https://www.typescriptlang.org/docs)

---

## 변경 이력

| 버전 | 날짜 | 변경 내용 |
|------|------|-----------|
| 1.0.0 | 2025-10-22 | 초기 버전 작성 |
| 1.1.0 | 2025-10-22 | src/ 디렉토리 구조로 변경 |
| 1.2.0 | 2025-10-22 | Tailwind CSS v4로 업그레이드 |
| 1.3.0 | 2025-10-22 | PRD 완전판 작성 (개발 가이드, 배포 가이드, 문제 해결 추가) |
| 1.3.1 | 2025-10-22 | 포트 관련 이슈 문서화 및 문제 해결 섹션 추가 (12.6) |
| 1.3.2 | 2025-10-22 | 소스 코드 검증 후 문서 업데이트: ISR 시간 정정(60초), n8n 웹훅 로깅 기능 추가, API 응답 필드명 정정, lib 파일 상세 설명 추가 |

---

**문서 끝**