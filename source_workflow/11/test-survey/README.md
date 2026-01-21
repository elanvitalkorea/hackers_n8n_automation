# AI 자동화 강의 만족도 조사 웹 애플리케이션

Next.js 15 기반의 설문조사 및 실시간 통계 대시보드 웹 애플리케이션입니다.

## 주요 기능

- ✅ **설문 제출**: Dark Glassmorphism 디자인의 모던한 설문 폼
- ✅ **실시간 통계**: ISR을 활용한 실시간 데이터 시각화 (60초 간격 갱신)
- ✅ **자동화 연동**: n8n 웹훅을 통한 SMS 발송 및 관리자 알림
- ✅ **NPS 계산**: Supabase SQL 함수를 통한 실시간 NPS 점수 계산
- ✅ **반응형 디자인**: 모바일/태블릿/데스크톱 대응

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.7+
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts 2.15+
- **Database**: Supabase (PostgreSQL)
- **Build Tool**: Turbopack

## 빠른 시작

### 1. 프로젝트 클론 및 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

```bash
cp env.sample .env.local
```

`.env.local` 파일을 열어서 실제 Supabase 설정값을 입력하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
N8N_WEBHOOK_URL=https://your-n8n-webhook-url (선택사항)
PORT=3001
```

### 3. Supabase 데이터베이스 설정

Supabase Dashboard > SQL Editor에서 다음 파일들을 순서대로 실행하세요:

1. `supabase_schema.sql` - 테이블 생성
2. `supabase_functions.sql` - SQL 함수 생성

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3001` (또는 표시된 포트)로 접속하세요.

## 프로젝트 구조

```
survey_report/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   ├── stats/             # 통계 페이지
│   │   ├── layout.tsx         # 루트 레이아웃
│   │   ├── page.tsx           # 메인 설문 페이지
│   │   └── globals.css         # Tailwind v4 스타일
│   └── lib/                    # 공통 라이브러리
│       ├── supabase.ts        # Supabase 클라이언트
│       ├── types.ts           # TypeScript 타입 정의
│       └── validation.ts      # 유효성 검사 함수
├── docs/                      # 문서
│   └── PRD.md                # 제품 요구사항 정의서
├── supabase_schema.sql        # 테이블 스키마
├── supabase_functions.sql     # SQL 함수 정의
└── README.md                  # 프로젝트 소개
```

## 주요 스크립트

```bash
npm run dev      # 개발 서버 실행 (Turbopack)
npm run build    # 프로덕션 빌드
npm start        # 빌드된 앱 실행
npm run lint     # ESLint 검사
```

## 배포

Vercel을 통한 배포를 권장합니다. 자세한 내용은 `docs/PRD.md`의 배포 가이드를 참고하세요.

## 문서

더 자세한 내용은 `docs/PRD.md`를 참고하세요.


