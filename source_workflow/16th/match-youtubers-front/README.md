# Match YouTubers Front - 광고 캠페인 브리프 제출 시스템

광고주가 캠페인 정보를 제출하면 Markdown 파일로 변환하여 AWS S3에 업로드하는 Next.js 웹 애플리케이션입니다.

## 🚀 기술 스택

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4** (Dark Glassmorphism 디자인)
- **AWS SDK** (S3 업로드)
- **Vercel** (배포)

## 📦 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.example` 파일을 복사하여 `.env.local` 파일을 생성하고 AWS 자격 증명을 입력하세요:

```bash
cp .env.example .env.local
```

`.env.local` 파일에 다음 정보를 입력:

```env
AWS_ACCESS_KEY_ID=your_access_key_id_here
AWS_SECRET_ACCESS_KEY=your_secret_access_key_here
AWS_REGION=us-east-1
AWS_S3_BUCKET_NAME=your-bucket-name-hackers-campaigns
```

### 3. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📁 프로젝트 구조

```
/
├── app/
│   ├── api/
│   │   └── brief/
│   │       └── route.ts        # S3 업로드 API 엔드포인트
│   ├── success/
│   │   └── page.tsx            # 제출 완료 페이지
│   ├── globals.css             # Tailwind CSS v4 + 글래스모피즘 스타일
│   ├── layout.tsx              # 루트 레이아웃
│   └── page.tsx                # 메인 브리프 제출 폼
├── docs/
│   ├── PRD.md                  # 프로젝트 요구사항 문서
│   └── campaign_briefs_15/     # 샘플 브리프 파일들
├── .env.local                  # 환경 변수 (gitignore)
├── .env.example                # 환경 변수 예시
├── package.json
├── tsconfig.json
└── next.config.js
```

## 🎨 디자인 시스템

**Dark Glassmorphism** 테마를 사용합니다:

- 어두운 배경 (`#0a0a0f`) + 다채로운 radial-gradient 효과
- 반투명 카드 (`backdrop-filter: blur(16px)`)
- 커스텀 CSS 클래스:
  - `.glass-card` - 폼 카드 컨테이너
  - `.glass-input` - 입력 필드
  - `.glass-button` - 제출 버튼
  - `.glass-select` - 드롭다운

## 📝 주요 기능

### 1. 브리프 제출 폼 (`/`)

광고주가 다음 정보를 입력할 수 있습니다:

- 광고주명 (필수)
- 회사 이메일 (필수)
- 회사명 (필수)
- 제품/서비스명 (필수)
- 캠페인 총 예산 (USD, 필수)
- 목표 CPM (선택)
- 목표 CTR (선택)
- 핵심 타겟 인구통계 (필수)
- 캠페인 상세 내용 (필수)

### 2. API 엔드포인트 (`POST /api/brief`)

- 폼 데이터를 받아 Markdown 형식으로 변환
- AWS S3 버킷의 `campaign-briefs/new/` 경로에 업로드
- 고유한 파일명 생성 (`brief-form-{timestamp}-{uuid}.md`)

### 3. 제출 완료 페이지 (`/success`)

- 제출 완료 메시지 표시
- 새 브리프 작성 링크 제공

## 🌐 배포

Vercel에 배포하는 방법:

1. Vercel 계정에 프로젝트 연결
2. 환경 변수 설정 (Settings > Environment Variables):
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION`
   - `AWS_S3_BUCKET_NAME`
3. 배포 완료!

## 🔒 보안

- AWS 자격 증명은 `.env.local` 파일에 저장 (절대 Git에 커밋하지 않음)
- 프로덕션 환경에서는 Vercel 환경 변수 사용
- API Route가 서버 사이드에서만 실행되어 보안 유지

## 📄 라이선스

MIT
