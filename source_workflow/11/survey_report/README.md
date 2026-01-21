# AI 자동화 강의 만족도 조사 웹 애플리케이션

Next.js 15 + Supabase로 구현한 실시간 설문조사 및 통계 대시보드 애플리케이션입니다.

## 🚀 주요 기능

- ✅ **설문 제출**: Dark Glassmorphism 디자인의 모던한 설문 폼
- ✅ **실시간 통계**: ISR을 활용한 실시간 데이터 시각화 (60초 간격 갱신)
- ✅ **자동화 연동**: n8n 웹훅을 통한 SMS 발송 및 관리자 알림 (상세 로깅 포함)
- ✅ **NPS 계산**: Supabase SQL 함수를 통한 실시간 NPS 점수 계산
- ✅ **반응형 디자인**: 모바일/태블릿/데스크톱 대응
- ✅ **타입 안전성**: TypeScript 전면 적용

## 📦 기술 스택

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.7+
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss"`)
- **UI Components**: Custom Glassmorphism 컴포넌트
- **Charts**: Recharts 2.15+
- **Build Tool**: Turbopack

### Backend
- **API**: Next.js API Routes (서버리스)
- **Database**: Supabase (PostgreSQL)
- **DB Logic**: Supabase SQL Functions (RPC)

### Automation & Infrastructure
- **Workflow**: n8n (Webhook)
- **Hosting**: Vercel
- **CI/CD**: Vercel Auto Deploy

## 📁 프로젝트 구조

```
survey_report/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── submit/route.ts       # POST - 설문 제출
│   │   │   └── stats/route.ts        # GET - 통계 조회
│   │   ├── stats/
│   │   │   ├── page.tsx              # 통계 대시보드 (ISR, 60초)
│   │   │   └── StatsClient.tsx       # 차트 컴포넌트
│   │   ├── layout.tsx                # 루트 레이아웃
│   │   ├── page.tsx                  # 메인 설문 페이지
│   │   └── globals.css               # 스타일
│   └── lib/
│       ├── supabase.ts               # Supabase 클라이언트
│       ├── types.ts                  # 타입 정의
│       └── validation.ts             # 유효성 검사
├── docs/
│   ├── PRD.md                        # 제품 요구사항 정의서
│   └── supabase_rpc.sql              # RPC 함수
├── supabase_schema.sql               # 테이블 스키마
├── supabase_functions.sql            # SQL 함수
└── README.md                          # 프로젝트 소개
```

## 🛠 빠른 시작

### 1. 프로젝트 클론 및 의존성 설치

```bash
git clone [repository-url]
cd survey_report
npm install
```

### 2. 환경변수 설정

`.env.sample` 파일을 복사하여 `.env.local` 파일을 생성하고 실제 값으로 채워주세요:

```bash
cp .env.sample .env.local
```

그런 다음 `.env.local` 파일을 열어서 다음 값들을 입력하세요:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# n8n Webhook URL (선택사항)
N8N_WEBHOOK_URL=https://your-n8n-domain.com/webhook/your-webhook-id

# Default PORT (선택사항, 기본값: 3000)
PORT=3001
```

#### Supabase 설정
- Supabase Dashboard > Settings > API에서 확인
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase 프로젝트 URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Anonymous (공개) 키
- `SUPABASE_SERVICE_ROLE_KEY`: Service Role (비밀) 키

#### n8n 웹훅 URL
- n8n 워크플로우에서 생성한 웹훅 URL (선택사항)

**⚠️ 중요:** `.env.local` 파일은 절대 Git에 커밋하지 마세요!

### 3. Supabase 데이터베이스 설정

#### 3.1. 테이블 생성

Supabase Dashboard > SQL Editor에서 `supabase_schema.sql` 파일의 내용을 실행하세요.

#### 3.2. SQL 함수 생성

Supabase Dashboard > Database > Functions에서 `supabase_functions.sql` 파일의 내용을 실행하여 다음 함수들을 생성하세요:

- `calculate_current_nps()`: NPS 점수 계산
- `get_dashboard_stats()`: 대시보드 통계 데이터 조회

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3001](http://localhost:3001) 접속

**참고**: 포트 3000이 이미 사용 중인 경우 자동으로 3001, 3002 등 다른 포트가 할당됩니다.

## 🎨 UI/UX 디자인

### Dark Glassmorphism
- 어두운 배경 (`#0a0a0f`) + 그라데이션 효과
- 반투명 카드 (`backdrop-filter: blur(16px)`)
- 부드러운 애니메이션 및 호버 효과
- 반응형 디자인 (모바일/태블릿/데스크톱)

### 주요 CSS 클래스
- `glass-card`: 반투명 카드 컨테이너
- `glass-input`: 입력 필드
- `glass-button`: 그라데이션 버튼
- `glass-select`: 드롭다운 셀렉트
- `glass-label`: 레이블 텍스트

## 📊 API 명세

### POST /api/submit

설문 데이터를 제출하고 n8n 웹훅을 트리거합니다.

**Request Body:**
```json
{
  "name": "홍길동",
  "phone": "010-1234-5678",
  "company_email": "example@company.com",
  "company_name": "회사명",
  "position": "개발자",
  "company_size": "11-50명",
  "satisfaction": 9,
  "comment": "좋은 강의였습니다."
}
```

**Response:**
```json
{
  "success": true,
  "message": "설문이 성공적으로 제출되었습니다.",
  "nps_score": 75.5
}
```

**특징:**
- 유효성 검사 (이메일, 전화번호, 만족도 범위)
- NPS 점수 실시간 계산
- n8n 웹훅 트리거 (상세 로깅: 🔔📤✅❌)
- 웹훅 실패 시에도 설문 제출은 정상 완료

### GET /api/stats

대시보드 통계 데이터를 조회합니다.

**Response:**
```json
{
  "total_respondents": 150,
  "nps_score": 45.3,
  "position_distribution": [
    { "position": "개발자", "count": 80 },
    { "position": "매니저", "count": 40 }
  ],
  "company_size_distribution": [
    { "company_size": "1-10명", "count": 30 },
    { "company_size": "11-50명", "count": 70 }
  ]
}
```

**참고**: `company_size_distribution`의 필드명은 `company_size`입니다.

## 🔄 렌더링 전략

- **메인 페이지 (`/`)**: **SSG** - 빌드 시점에 정적 생성
- **통계 페이지 (`/stats`)**: **ISR** - 60초마다 재검증 (실시간 데이터 갱신)

## 🚀 배포

### Vercel 배포

1. **프로덕션 빌드**
   ```bash
   npm run build
   ```

2. **Vercel 배포**
   - GitHub 레포지토리 연결
   - 환경변수 설정 (Vercel Dashboard > Settings > Environment Variables)
   - 자동 배포 활성화

3. **환경변수 설정 (Vercel)**
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `N8N_WEBHOOK_URL` (선택사항)

## 🛠️ 문제 해결

### n8n 웹훅 디버깅

서버 콘솔에서 다음 로그를 확인하세요:
- 🔔 `n8n Webhook URL: 설정됨/설정 안됨`
- 📤 `n8n 웹훅 호출 시작`
- ✅ `n8n 웹훅 응답`
- ❌ `n8n webhook error`

### 포트 충돌

포트 3000이 사용 중인 경우:
```bash
# .env.local에 추가
PORT=3001
```

## 📚 문서

- **PRD.md**: 제품 요구사항 정의서 (상세 명세)
- **docs/supabase_create.sql**: Supabase 테이블 생성 스크립트
- **docs/supabase_rpc.sql**: RPC 함수 정의

## 📝 라이선스

이 프로젝트는 교육 목적으로 작성되었습니다.

