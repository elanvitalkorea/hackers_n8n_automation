# AI x n8n 업무자동화 실전 프로젝트

> 해커스HRD **AI x n8n 업무자동화 실전 프로젝트** 강의 수강생용 **참조 자료 모음**입니다.  
> (차시별 학습노트 + n8n 워크플로우 `.json` + 예제 소스코드/프로젝트)

## 강의 소개

이 강의는 단순히 n8n 사용법만 익히는 것이 아니라, **백엔드, 프론트엔드, 데이터베이스, 클라우드 배포까지 실제 서비스를 만드는 전체 개발 흐름(Full-Stack)**을 경험하도록 설계되었습니다.

### 학습 목표

1. **개발의 필수 개념**을 공부하여 스스로 확장이 가능하도록 합니다
2. **업무 자동화의 개념**을 이해하고 직접 경험합니다
3. **Backend 직접 구현**을 통해 개발에 대한 깊은 이해를 돕습니다

### 학습 대상

- 바이브코딩으로 개발 능력을 확장하고 싶은 개발자
- 바이브코딩을 경험했지만, 실제 개발적인 백그라운드가 부족하다고 느낀 개발 초급자
- 전통 개발은 잘하지만 AI를 이용한 개발 능력을 가지고 싶은 개발자

---

## 빠르게 시작하기 (수강생용)

- **학습노트부터 보기**: `lecture_note/`에서 해당 차시 파일을 열어 따라가세요.
- **n8n 워크플로우 가져오기**: `source_workflow/**/**/*.json` 파일을 n8n에서 Import 하면 됩니다. (아래 “n8n 워크플로우 import” 참고)
- **소스코드 실행**: `source_workflow/` 아래에는 **여러 개의 독립 프로젝트**가 들어있습니다. 루트에서 설치/실행하지 말고, **원하는 프로젝트 폴더로 이동 후** 실행하세요.

---

## 디렉토리 구조

```
official_n8n/
├── lecture_note/            # 차시별 학습노트 (1~18차시 + 무료차시)
└── source_workflow/         # 차시별 소스코드 및 n8n 워크플로우
    ├── free/                # 무료차시 - 다이어리 웹
    ├── 2nd/                 # 2차시 - Cursor AI HTML/JS
    ├── 3rd/                 # 3차시 - SaaS Starter
    ├── 4th/                 # 4차시 - Node.js 백엔드 (CRUD)
    ├── 5th/                 # 5차시 - 인증 시스템
    ├── 6th/                 # 6차시 - MCP 실습
    ├── 8th/                 # 8차시 - SNS 콘텐츠 자동화
    ├── 9th/                 # 9차시 - 웹크롤링 (FireCrawl)
    ├── 10th/                # 10차시 - AI Agent & RAG
    ├── 11th/                # 11차시 - Next.js 설문 리포트 + Next.js UI 실습(여러 예제)
    ├── 12th/                # 12차시 - 웹앱 배포
    ├── 13th/                # 13차시 - 백엔드 배포
    ├── 14th/                # 14차시 - Smart RAG 파이프라인
    ├── 15th/                # 15차시 - Flutter 명함 인식 앱
    ├── 16th/                # 16차시 - 유튜버-광고주 매칭 준비
    ├── 17th/                # 17차시 - 매칭 Agent 구현 (+ `survey_backend3` 백엔드/배포 예제)
    └── 18th/                # 18차시 - MCP 서버 및 Agent 연계 (+ Python 에이전트 예제)
```

> 참고: 1차시/7차시는 성격상 “코드 프로젝트 폴더”가 없을 수 있으며, 내용은 `lecture_note/` 중심으로 제공됩니다.

---

## 커리큘럼

### Phase 1: 기초 (1~6차시)

| 차시 | 주제 | 내용 |
|------|------|------|
| **1차시** | 자동화의 필요성 & 바이브 코딩 | 바이브 코딩 정의, 문제 해결 검색 팁 |
| **2차시** | Cursor AI 시작하기 | 설치, 환경설정, 기본 인터페이스, TAB 완성 |
| **3차시** | Cursor AI 응용 | Rules, Context 정보 제공, Git 사용, 기존 소스 온보딩 |
| **4차시** | 백엔드 구현 (자동화 필수 개념) | Node.js, JavaScript 필수 개념, API, CRUD 구현 |
| **5차시** | 백엔드 구현 (인증 시스템) | Bearer 토큰, 구글 인증, Supabase DB |
| **6차시** | MCP 이해하기 | MCP 이해, 기본 사용, 응용, 제작 실습 |

### Phase 2: 자동화 (7~10차시)

| 차시 | 주제 | 내용 |
|------|------|------|
| **7차시** | n8n 설치하기 | n8n 소개, Hostinger/Mac/Windows 설치 |
| **8차시** | [실전 1] SNS 콘텐츠 자동 생성 | 시나리오 설명, 구글 인증, Discord 연동 |
| **9차시** | [실전 2] 뉴스 크롤링 자동화 | 웹크롤링 기본, DOM, FireCrawl |
| **10차시** | [실전 3] AI 자동 응답 시스템 | Telegram Agent, Voice Agent, SubAgent, RAG |

### Phase 3: 확장 (11~15차시)

| 차시 | 주제 | 내용 |
|------|------|------|
| **11차시** | [실전 4] 설문 리포트 웹 | React/Next.js, 문자 서비스, n8n 워크플로우 |
| **12차시** | 웹앱 배포하기 | 정적/동적 배포, GitHub Pages, Vercel, AWS Amplify |
| **13차시** | [실전 5] 백엔드 배포 | AWS S3, Render, GCP Cloud Run |
| **14차시** | [실전 6] Smart RAG 파이프라인 | 데이터 중복 방지, 적합도 평가, 인사이트 AI Agent |
| **15차시** | [실전 7] 명함 인식 앱 | Flutter, Upstage OCR API, 명함 워크플로우 |

### Phase 4: 완성 (16~18차시)

| 차시 | 주제 | 내용 |
|------|------|------|
| **16차시** | [실전 8] 유튜버-광고주 매칭 준비 | 시나리오 소개, 프로필 DB, 클라이언트 구축 |
| **17차시** | [실전 완성] 매칭 Agent 구현 | 캠페인 분석, 매칭/제안서, 계약서 Agent |
| **18차시** | MCP 서버 및 Agent 연계 | MCP 서버 등록, Dify, OpenAI Agent Builder, Google OPAL |

---

## 주요 프로젝트

### n8n 워크플로우 파일 (.json)

워크플로우 파일은 주로 `source_workflow/{차시}/` 아래에 있습니다. 예:
- `source_workflow/free/free_n8n diary flow.json`
- `source_workflow/10th/10-1. Telegram Agent.json`

| 파일명 | 설명 |
|--------|------|
| `8.컨텐츠 자동화.json` | SNS 콘텐츠 자동 생성 워크플로우 |
| `9.웹크롤링.json` | 뉴스 크롤링 자동화 워크플로우 |
| `10-1. Telegram Agent.json` | 텔레그램 AI Agent |
| `10-2. VoiceAgent.json` | 음성 AI Agent (ElevenLabs) |
| `10-3. SubAgent.json` | AI SubAgent 시스템 |
| `10-4. RAG Vector Store.json` | RAG with Supabase VectorStore |
| `11. survey_report.json` | 설문 리포트 워크플로우 |
| `13. survey_backend.json` | 설문 백엔드 워크플로우 |
| `14. AI News Curation - Ingest.json` | 뉴스 수집 파이프라인 |
| `14. AI New Curation - Query.json` | 뉴스 조회 파이프라인 |
| `17. Match Youtubers Agent1.json` | 광고 캠페인 분석 Agent |
| `17. Match Youtubers Agent2.json` | 유튜버 매칭 & 제안서 Agent |
| `17. Match Youtubers Agent3.json` | 계약서 생성 Agent |
| `18. AI News Curation For Workflow call.json` | MCP 워크플로우 호출 |
| `18. ai news curation mcp trigger.json` | MCP 트리거 워크플로우 |

### 웹/앱 프로젝트

| 프로젝트 | 기술 스택 | 설명 |
|----------|-----------|------|
| `4thhackers`, `5thhackers` | Node.js | 백엔드 CRUD & 인증 |
| `saas-starter` | Next.js | SaaS 스타터 템플릿 |
| `mcptest`, `mcpmemo5` | MCP | MCP 실습 프로젝트 |
| `survey_report` | Next.js + ShadCN | 설문 리포트 웹 |
| `next-ts-hands-on` | Next.js + TypeScript | Next.js 핸즈온 |
| `bzcard` | Flutter | 명함 인식 앱 |
| `quotes` | Flutter | 명언 앱 |
| `match-youtubers-front` | Next.js | 광고주 클라이언트 |
| `mobile-match-youtubers` | Flutter | 관리자 모바일 앱 |
| `diaryweb` | Next.js | 다이어리 웹 (무료차시) |

> 각 프로젝트 폴더에 `README.md`, `env.sample`, `.env.example` 같은 실행/설정 문서가 따로 있는 경우가 많습니다. **해당 폴더의 README를 우선** 참고하세요.

---

## 사용 방법

### 학습노트 활용

`lecture_note/` 폴더에서 각 차시별 학습노트를 참고하세요.

```bash
# 예: 1차시 학습노트 확인
cat lecture_note/1차시\ 학습노트.md
```

### n8n 워크플로우 import

1. n8n 대시보드에서 **Workflows** → **Import from File** 선택
2. `source_workflow/` 폴더의 `.json` 파일 선택
3. 워크플로우 활성화 및 credential 설정

#### 자주 막히는 포인트

- **Credentials 재설정 필요**: `.json`을 가져오면 API Key/토큰/DB 연결은 보안상 그대로 동작하지 않는 경우가 많아, n8n에서 Credential을 새로 연결해야 합니다.
- **환경변수/URL 확인**: Supabase/웹훅 URL/외부 API 엔드포인트는 수강생 환경에 맞게 수정이 필요합니다.

### 소스코드 실행

```bash
# Node.js 프로젝트 (예: 4차시)
cd source_workflow/4th/4thhackers
npm install
npm start

# Next.js 프로젝트 (예: 11차시)
cd source_workflow/11th/survey_report
npm install
npm run dev

# Flutter 프로젝트 (예: 15차시)
cd source_workflow/15th/bzcard
flutter pub get
flutter run
```

#### 실행 팁 (환경설정 파일)

- **Node/Next.js**: 프로젝트 폴더에 `env.sample` 또는 `.env.example`가 있으면, 이를 참고해 `.env` / `.env.local`을 구성하세요.
- **Docker**: `docker-compose.yml`이 있는 프로젝트(예: `source_workflow/17th/survey_backend3`)는 Docker 기반으로도 실행할 수 있습니다.

---

## 기술 스택

- **Backend**: Node.js, Express.js
- **Frontend**: React, Next.js, Flutter
- **Database**: Supabase, PostgreSQL
- **자동화**: n8n
- **AI/ML**: OpenAI, ElevenLabs, Upstage OCR
- **배포**: Vercel, AWS Amplify, Render, GCP Cloud Run
- **도구**: Cursor AI, MCP, FireCrawl

---

## 참고 자료

- [n8n 공식 문서](https://docs.n8n.io/)
- [Cursor AI](https://cursor.sh/)
- [Supabase 문서](https://supabase.com/docs)
- [Next.js 문서](https://nextjs.org/docs)
- [Flutter 문서](https://flutter.dev/docs)

---

## 라이선스

이 저장소의 자료는 해커스HRD 강의 수강생을 위한 학습 목적으로 제공됩니다.

---

**문의**: 강의 관련 문의사항은 해커스HRD를 통해 연락해주세요.
