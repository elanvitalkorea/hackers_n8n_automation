# 일기 웹앱

Next.js + shadcn/ui + Supabase를 사용하여 만든 일기 작성 및 관리 웹앱입니다.

## 기능

- 📝 일기 작성 (제목, 내용, 날짜/시간)
- 💾 Supabase 데이터베이스에 자동 저장
- 🔗 n8n 웹훅으로 자동 전송
- 📚 일기 목록 조회
- 🎨 모던하고 깔끔한 UI 디자인

## 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **UI**: shadcn/ui + Tailwind CSS
- **Database**: Supabase
- **Form**: react-hook-form + zod

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 환경변수를 설정하세요:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
N8N_WEBHOOK_URL=your_n8n_webhook_url
```

### 3. Supabase 데이터베이스 설정

이 프로젝트는 Supabase MCP를 통해 `diaries` 테이블이 자동으로 생성됩니다. 테이블 구조는 다음과 같습니다:

- `id` (UUID, Primary Key)
- `title` (TEXT)
- `content` (TEXT)
- `timestamp` (TIMESTAMPTZ)
- `created_at` (TIMESTAMPTZ)

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 웹훅 형식

일기가 저장되면 다음 형식으로 n8n 웹훅 URL로 전송됩니다:

```json
{
  "title": "2025년 12월 8일 일기",
  "content": "오늘은 n8n 웹훅 설정을 완료했다! 자동화가 정말 쉬워졌다.",
  "timestamp": "2025-12-08T10:51:19Z"
}
```

## 프로젝트 구조

```
diaryweb/
├── app/
│   ├── actions.ts          # 서버 액션 (Supabase 저장 및 웹훅 전송)
│   ├── page.tsx            # 메인 페이지 (일기 작성 폼)
│   ├── diaries/
│   │   └── page.tsx        # 일기 목록 페이지
│   └── layout.tsx          # 루트 레이아웃
├── components/
│   └── ui/                 # shadcn/ui 컴포넌트
├── lib/
│   ├── supabase.ts         # Supabase 클라이언트 설정
│   └── utils.ts            # 유틸리티 함수
└── .env.local              # 환경변수 파일 (생성 필요)
```

## 배포

Vercel에 배포하는 것이 가장 쉽습니다:

1. GitHub에 프로젝트를 푸시합니다
2. [Vercel](https://vercel.com)에 로그인하고 프로젝트를 import합니다
3. 환경변수를 설정합니다
4. 배포를 완료합니다

## 라이선스

MIT
