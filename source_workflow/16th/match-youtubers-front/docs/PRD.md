# 광고주 클라이언트 구축 (Next.js 웹앱)

### 1\. 프로젝트 기획 (PRD 요약)

  * **목표**: 광고주가 캠페인 정보(**예산, 목표 CPM/CTR, 타겟 인구통계** 포함)를 제출하면, **JSON 파일**로 변환하여 AWS S3 (`campaign-briefs/new/`)에 업로드합니다.
  * **기술 스택**: Next.js 15 (App Router), Tailwind CSS v4, Next.js API Routes, **AWS SDK (`@aws-sdk/client-s3`)**, Vercel, **`.env.local` 환경 변수 관리**
  * **주요 설정 파일**:
    * `postcss.config.mjs`: `@tailwindcss/postcss` 플러그인 설정 (Tailwind CSS v4 필수)
    * `next.config.js`: React Strict Mode 비활성화 (`reactStrictMode: false`)
    * `app/globals.css`: `@import "tailwindcss";` 구문 (v4 방식) + Dark Glassmorphism 커스텀 컴포넌트 클래스
    * **중요**: v4에서는 `tailwind.config.js` 파일이 불필요함 (삭제됨)

### 1.1. UI/UX 디자인

#### 1.1.1. 디자인 컨셉
**Dark Glassmorphism**
- 어두운 배경 (`#0a0a0f`) + 다채로운 radial-gradient 효과
- 반투명 카드 (`backdrop-filter: blur(16px)`)
- 넉넉한 레이아웃 (적절한 폼 너비, 충분한 패딩)
- 부드러운 애니메이션 및 호버 효과
- 집중도 높은 모던 UI

#### 1.1.2. Tailwind CSS v4 특징
```css
/* globals.css */
@import "tailwindcss";  /* v4 새로운 구문 */

@layer base {
  body {
    background: #0a0a0f;
    background-image:
      radial-gradient(at 27% 37%, hsla(215, 98%, 61%, 0.1) 0px, transparent 50%),
      radial-gradient(at 97% 21%, hsla(125, 98%, 72%, 0.05) 0px, transparent 50%),
      radial-gradient(at 52% 99%, hsla(354, 98%, 61%, 0.05) 0px, transparent 50%),
      radial-gradient(at 10% 29%, hsla(256, 96%, 67%, 0.1) 0px, transparent 50%),
      radial-gradient(at 97% 96%, hsla(38, 60%, 74%, 0.05) 0px, transparent 50%),
      radial-gradient(at 33% 50%, hsla(222, 67%, 73%, 0.05) 0px, transparent 50%),
      radial-gradient(at 79% 53%, hsla(343, 68%, 79%, 0.05) 0px, transparent 50%);
  }
}

@layer components {
  .glass-card {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  }
  
  .glass-input {
    @apply w-full px-4 py-3 rounded-lg text-white placeholder-gray-500 transition-all text-sm;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.15);
  }
  
  .glass-input:focus {
    @apply outline-none ring-2 ring-blue-500/50;
    border-color: rgba(59, 130, 246, 0.5);
  }
  
  .glass-button {
    @apply py-3 px-6 rounded-lg font-semibold text-base transition-all duration-300 ease-in-out;
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  
  .glass-button:hover:not(:disabled) {
    background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    transform: translateY(-1px);
  }
  
  .glass-label {
    @apply block text-sm font-medium text-gray-200 mb-2;
  }
  
  .glass-select {
    @apply appearance-none pr-10;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3e%3cpath d='M7 7l3-3 3 3m0 6l-3 3-3-3' stroke='%239CA3AF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 1.5em 1.5em;
  }
}
```

#### 1.1.3. 주요 컴포넌트 클래스
| 클래스명 | 용도 | 주요 스타일 |
|---------|------|------------|
| `glass-card` | 폼 카드 컨테이너 | 반투명 배경 + blur(16px) |
| `glass-input` | 입력 필드 / textarea | 반투명 배경 + blur(8px) + focus ring |
| `glass-button` | 제출 버튼 | 그라데이션 + hover 효과 |
| `glass-label` | 필드 라벨 | 반투명 흰색 텍스트 |
| `glass-select` | 드롭다운 | blur + 커스텀 화살표 |
| 폼 레이아웃 | 전체 폼 구조 | `max-w-2xl` + `space-y-6` + `p-8 md:p-12` |

### 2\. 페이지 명세 (11차시 복습)

  * **`/` (메인: 브리프 제출 페이지)**

      * **렌더링**: **SSG (Static Site Generation)** (폼 자체는 정적이므로 로딩 속도 최적화)
      * **UI**: Dark Glassmorphic 디자인의 폼 카드 (`"use client"` 필요). 타겟 시스템 기반으로 어두운 배경(`#0a0a0f`)에 다채로운 radial-gradient 효과, 반투명 카드(`max-w-2xl`), 넉넉한 폼 간격(`space-y-6`), 적절한 레이블 크기(`text-sm`), 충분한 패딩(`p-8 md:p-12`), 밝은 텍스트와 부드러운 포커스 링으로 모던한 UI를 제공합니다.
      * **입력 필드** (17차시 AI 분석 기준):
          * 광고주명 (text, 필수)
          * 회사 이메일 (email, 필수, 연락용)
          * 회사명 (text, 필수)
          * 제품/서비스명 (text, 필수)
          * **(수정됨)** 캠페인 총 예산 (number, 필수, **USD** 달러 기준)
          * **(신규)** 목표 CPM (number, 선택, 예: 20000원 이하)
          * **(신규)** 목표 CTR (number, 선택, 예: 3.5% 이상)
          * **(신규)** 핵심 타겟 인구통계 (Select, 필수, ENUM 값 사용)
              * **ENUM 값 목록** (DB `youtubers.main_demographics` 컬럼과 정확히 일치해야 함):
                  * `MALE_10-20` (10-20대 남성)
                  * `MALE_20-30` (20-30대 남성)
                  * `MALE_30-50` (30-50대 남성)
                  * `FEMALE_20-30` (20-30대 여성)
                  * `FEMALE_20-40` (20-40대 여성)
                  * `FEMALE_30-40` (30-40대 여성)
                  * `FEMALE_40-60` (40-60대 여성)
              * **중요**: selectbox의 `value` 속성은 ENUM 값으로, 표시 텍스트는 한글로 설정됨. 이 값은 17차시 Agent 2의 SQL 필터링에서 `main_demographics eq {{ ENUM값 }}` 형식으로 사용됨.
          * 캠페인 상세 내용 (textarea, 필수, 캠페인 의도)
      * **상태 관리 및 데이터 보존**:
          * `useState`로 폼 데이터 관리 (`formData` 객체)
          * **useRef를 활용한 selectbox 값 유지**: selectbox의 DOM 요소와 이전 값을 추적하여 리렌더링 시에도 선택값이 유지되도록 보장
          * **Fast Refresh 대응**: Next.js 개발 환경의 HMR (Hot Module Replacement) 발생 시에도 입력값 유지
          * **Controlled Component 패턴**: 모든 입력 필드를 controlled component로 구현하여 React state와 동기화
      * **제출 로직**:
          * '브리프 제출하기' 버튼 클릭 시 클라이언트 사이드 유효성 검사 수행.
          * 성공 시 `POST /api/brief` API 호출 (호출 중 로딩 스피너 표시).
          * API 호출 성공 시 폼 데이터 초기화 후 `/success` 페이지로 리다이렉트 (`router.push('/success')`).

  * **`/success` (제출 완료 페이지)**

      * **렌더링**: **SSG (Static Site Generation)** (정적 감사 메시지).
      * **핵심 기능**:
        1.  "✅ 브리프 제출이 완료되었습니다." 메시지 표시.
        2.  "담당자가 검토 후 영업일 기준 1-2일 내에 기입하신 이메일로 연락드릴 예정입니다." 안내 문구.
        3.  '새 브리프 작성하기' 버튼 (`<Link href="/">`)

### 3\. API 명세: `POST /api/brief` (핵심 로직)

  * 11차시에서 배운 `src/app/api/brief/route.ts` 파일을 생성합니다.
  * **역할**: 폼 데이터를 S3에 `.json` 파일로 업로드하는 서버리스 백엔드.
  * **주요 로직**:
    1.  `await request.json()`: 클라이언트 폼에서 보낸 JSON 데이터를 수신합니다.
    2.  **[Logic] 데이터 변환**: 수신한 JSON을 17차시 AI Agent가 분석할 **JSON 형식**으로 변환합니다. (문자열 필드는 그대로, 숫자 필드(`budgetUSD`, `targetCPM`, `targetCTR`)는 숫자 타입으로 변환) (아래 예시 참조)
    3.  **[Logic] 파일명 생성**: 고유 파일명 생성 (예: `brief-form-${Date.now()}-${uuid()}.json`).
    4.  **[AWS] S3 클라이언트 초기화**: `new S3Client(...)`
          * **(보안)** **로컬 개발 시에는 `.env.local` 파일에, 프로덕션 배포 시에는 Vercel 환경 변수**에 `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION` 키를 등록하여 `process.env`로 안전하게 호출합니다. (11차시 API Route 장점 복습)
    5.  **[AWS] S3 업로드**: `new PutObjectCommand(...)`
          * **Bucket**: `[고유이름]-hackers-campaigns`
          * **Key**: `campaign-briefs/new/[생성된 고유 파일명].json`
          * **Body**: `JSON.stringify(jsonDataToSave, null, 2)` (JSON 문자열)
          * **ContentType**: `application/json`
    6.  `NextResponse.json({ success: true }, { status: 201 })`: 성공 응답을 반환합니다.

> **JSON 형식 예시 (S3에 저장될 `.json` 파일 내용)**:
>
> ```json
> {
>   "companyName": "기가코퍼레이션",
>   "advertiserName": "박민수",
>   "email": "marketing@giga.co.kr",
>   "productName": "AI 가속 노트북 'GigaBook X1'",
>   "budgetUSD": 12000,
>   "targetDemographics": "MALE_20-30",
>   "targetCPM": 20000,
>   "targetCTR": 3.0,
>   "details": "AI 업무자동화와 개발자 워크플로우를 중심으로 성능을 보여주는 인플루언서 리뷰를 원합니다. 실사용 벤치마크와 n8n/RAG 활용 예시가 포함되면 좋습니다."
> }
> ```

### 4\. 개발 과정에서 발견된 주요 이슈 및 해결책

#### 4.1. 폼 상태 리셋 문제 (특히 selectbox)
**문제**: 개발 환경에서 Fast Refresh (HMR) 발생 시 또는 폼 제출/리렌더링 시 selectbox 선택값이 초기화되는 현상

**원인**:
- Next.js의 Hot Module Replacement로 컴포넌트가 재마운트될 때 상태 초기화
- React state와 DOM 요소 간 동기화 문제
- form의 `key` 속성 변경으로 인한 리마운트

**해결책**:
1. **useRef를 활용한 selectbox 값 추적**:
   - `selectRef`: selectbox DOM 요소에 직접 접근하기 위한 ref
   - `previousSelectValue`: 이전 선택값을 저장하는 ref (리렌더링 시에도 유지)
   - `handleChange`에서 selectbox 변경 시 ref에 즉시 저장
   - `useEffect`로 DOM 값과 state 값 동기화 보장

2. **form key 제거**:
   - form의 `key="brief-form"` 속성 제거
   - key 변경으로 인한 불필요한 리마운트 방지

3. **Controlled Component 패턴 유지**:
   - 모든 입력 필드를 `value`와 `onChange`로 제어
   - state 업데이트와 DOM 동기화를 `useEffect`로 보장

**구현 예시**:
```typescript
const selectRef = useRef<HTMLSelectElement>(null)
const previousSelectValue = useRef<string>('')

const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  if (e.target.name === 'targetDemographics') {
    previousSelectValue.current = e.target.value
  }
  setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
}

useEffect(() => {
  if (selectRef.current) {
    const currentStateValue = formData.targetDemographics ?? ''
    const currentDomValue = selectRef.current.value
    
    if (currentDomValue !== currentStateValue) {
      selectRef.current.value = currentStateValue
      previousSelectValue.current = currentStateValue
    }
  }
}, [formData.targetDemographics])
```

**장점**:
- localStorage 없이도 값 유지 가능 (브라우저 스토리지 의존성 제거)
- 컴포넌트 리마운트 시에도 ref 값 유지
- DOM과 state 간 동기화 보장

#### 4.2. Tailwind CSS v4 설정
**문제**: 초기 Tailwind CSS v4 설정 시 500 Internal Server Error 발생

**해결책**:
1. **올바른 PostCSS 설정**:
   - `postcss.config.mjs` 생성
   - `@tailwindcss/postcss` 플러그인 추가
   
2. **globals.css 구문 변경**:
   - `@tailwind` 디렉티브 제거
   - `@import "tailwindcss";` 사용 (v4 방식)

3. **불필요한 설정 파일 제거**:
   - `tailwind.config.js` 삭제 (v4에서는 불필요)
   - `postcss.config.js` 삭제 (`.mjs` 확장자로 대체)

#### 4.3. ENUM 값과 Agent 연동
**문제**: selectbox의 인구통계 값이 DB의 `main_demographics` 컬럼과 일치하지 않아 Agent 2의 SQL 필터링이 실패하는 문제

**원인 분석**:
- 실제 DB (`youtubers` 테이블)와 캠페인 파일에서 사용되는 ENUM 값 패턴 확인
- DB에서 사용되는 값: `MALE_10-20`, `MALE_20-30`, `MALE_30-50`, `FEMALE_20-30`, `FEMALE_20-40`, `FEMALE_30-40`, `FEMALE_40-60`
- 초기 selectbox 옵션이 실제 사용되는 값과 불일치

**해결책**:
1. **DB 및 캠페인 파일 분석**:
   - `supabase_schema_setup.sql` 파일에서 실제 사용되는 `main_demographics` 값 확인
   - `campaign_briefs_15/` 폴더의 모든 캠페인 파일에서 사용되는 ENUM 값 패턴 분석
   - 실제 사용되는 7가지 ENUM 값으로 selectbox 옵션 수정

2. **ENUM 값 표준화**:
   - selectbox의 `value` 속성을 ENUM 값으로 설정 (예: `value="MALE_20-30"`)
   - 표시 텍스트는 한글로 설정 (예: `20-30대 남성`)
   - DB의 `main_demographics` 컬럼 값과 정확히 일치하도록 보장

3. **Agent 연동 보장**:
   - Agent 1: Markdown에서 `핵심 타겟 인구통계: MALE_20-30` 추출 → JSON `targetDemographics: "MALE_20-30"` 저장
   - Agent 2: SQL 필터링에서 `main_demographics eq MALE_20-30` 형식으로 사용
   - ENUM 값이 정확히 일치해야 SQL 필터링이 정상 동작

**최종 ENUM 값 목록**:
```typescript
<option value="MALE_10-20">10-20대 남성</option>
<option value="MALE_20-30">20-30대 남성</option>
<option value="MALE_30-50">30-50대 남성</option>
<option value="FEMALE_20-30">20-30대 여성</option>
<option value="FEMALE_20-40">20-40대 여성</option>
<option value="FEMALE_30-40">30-40대 여성</option>
<option value="FEMALE_40-60">40-60대 여성</option>
```

**주의사항**:
- ENUM 값은 대소문자와 하이픈(`-`) 위치가 정확해야 함
- DB 스키마 변경 시 selectbox 옵션도 함께 업데이트 필요
- 새로운 인구통계 세그먼트 추가 시 DB와 폼 양쪽 모두 수정 필요

#### 4.4. 주요 학습 포인트
- **상태 관리**: React 개발 환경의 특성을 고려한 상태 보존 전략
- **useRef 활용**: DOM 요소 접근 및 값 추적을 통한 리렌더링 대응
- **Controlled Component**: React state와 DOM 동기화 패턴 이해
- **ENUM 값 표준화**: 프론트엔드와 백엔드 간 데이터 일관성 보장
- **Agent 연동**: 폼 데이터가 AI Agent 워크플로우에서 정확히 사용되도록 설계
- **Tailwind v4 마이그레이션**: 새로운 설정 방식 및 구문 이해
- **디버깅**: Next.js Fast Refresh와 React 라이프사이클 이해
