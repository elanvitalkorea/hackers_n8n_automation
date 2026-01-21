# 🎨 shadcn/ui 학습 가이드

## 📚 프로젝트 개요

이 프로젝트는 **Tailwind CSS**와 **shadcn/ui**의 차이점과 장점을 명확하게 이해할 수 있도록 구성된 학습 예제입니다.

### 🎯 학습 목표

1. **Tailwind CSS만 사용할 때의 문제점** 이해하기
2. **shadcn/ui가 해결하는 문제들** 파악하기
3. **실제 코드 비교**를 통해 개선점 체감하기

---

## 🔑 핵심 개념

### Tailwind CSS (재료) 🎨

```tsx
// 문제: 클래스 지옥
<button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
  클릭
</button>
```

**장점:**
- 유틸리티 우선 접근 방식
- 빠른 프로토타이핑
- CSS 파일 크기 최소화

**문제점:**
- ❌ 클래스 문자열이 너무 김
- ❌ 복사/붙여넣기 반복
- ❌ 유지보수 어려움
- ❌ 일관성 유지 어려움

### shadcn/ui (설계도) 📦

```tsx
// 해결: 컴포넌트 추상화
<Button variant="default" size="md">
  클릭
</Button>
```

**장점:**
- ✅ prop으로 스타일 제어
- ✅ 일관된 디자인 시스템
- ✅ 완전한 소유권 (코드 직접 수정)
- ✅ 접근성 자동 처리
- ✅ 가벼운 번들 크기

---

## 💡 shadcn/ui의 3가지 핵심 가치

### 1️⃣ 완전한 소유권 (You Own the Code)

```bash
# 일반 라이브러리 (node_modules에 설치)
npm install @mui/material  ❌

# shadcn/ui (소스 코드를 내 프로젝트에 복사)
npx shadcn-ui@latest add button  ✅
```

**결과:**
- `src/components/ui/button.tsx` 파일이 생성됨
- 이 파일을 직접 수정하여 커스터마이징 가능
- 라이브러리 업데이트에 영향받지 않음

### 2️⃣ 일관된 디자인 시스템 (Design System)

**CSS 변수 기반 테마:**

```css
/* globals.css */
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --muted-foreground: 215.4 16.3% 46.9%;
}
```

**컴포넌트에서 사용:**

```tsx
<h1 className="text-foreground">제목</h1>
<p className="text-muted-foreground">설명</p>
<Button>버튼</Button> {/* 자동으로 --primary 색상 사용 */}
```

**장점:**
- 모든 컴포넌트가 동일한 색상 팔레트 공유
- Dark mode 자동 지원
- 한 곳만 수정하면 전체 앱 테마 변경

### 3️⃣ 가벼운 번들 (Lightweight Bundle)

```bash
# 필요한 컴포넌트만 추가
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add alert

# 전체 라이브러리를 설치하지 않음! ✅
```

**결과:**
- 사용하지 않는 컴포넌트는 번들에 포함되지 않음
- Radix UI로 접근성 자동 처리
- Tailwind로 스타일 최적화

---

## 📂 프로젝트 구조

```
src/
├── app/
│   ├── page.tsx              # 메인 페이지 (shadcn 장점 설명)
│   ├── about/page.tsx        # 소개 페이지
│   └── api/likes/route.ts    # API 엔드포인트
├── components/
│   ├── PostItem.tsx          # 포스트 카드 (Before/After 비교)
│   ├── LikeButton.tsx        # 좋아요 버튼 (Before/After 비교)
│   └── ui/                   # shadcn/ui 컴포넌트
│       ├── button.tsx
│       ├── card.tsx
│       └── alert.tsx
└── types/
    └── index.ts              # TypeScript 타입 정의
```

---

## 📖 코드 비교 예제

### 1. Button 컴포넌트

#### ❌ BEFORE (Tailwind만 사용)

```tsx
<button
  onClick={handleClick}
  disabled={isLoading}
  className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
>
  {isLoading ? '...' : '좋아요'}
</button>
```

**문제점:**
- 15개 이상의 클래스가 한 줄에
- 다른 버튼을 만들려면 전체 복사
- primary 버튼 색상 변경 시 모든 파일 수정 필요

#### ✅ AFTER (shadcn/ui 사용)

```tsx
<Button
  onClick={handleClick}
  disabled={isLoading}
  variant="default"
  size="sm"
>
  {isLoading ? <Loader2 className="animate-spin" /> : '좋아요'}
</Button>
```

**개선점:**
- prop으로 스타일 제어 (`variant`, `size`)
- 전문적인 로딩 아이콘
- 일관된 디자인
- 접근성 자동 처리

### 2. Card 컴포넌트

#### ❌ BEFORE (Tailwind만 사용)

```tsx
<article className="p-6 bg-white border border-gray-200 rounded-xl shadow-md space-y-3 hover:shadow-lg transition-shadow">
  <h2 className="text-2xl font-bold text-gray-800 capitalize">
    {post.title}
  </h2>
  <p className="text-gray-600">{post.body}</p>
  <LikeButton postId={post.id} />
</article>
```

**문제점:**
- 10개 이상의 유틸리티 클래스 나열
- 하드코딩된 색상 (gray-800, gray-600)
- 구조가 불명확
- 재사용 어려움

#### ✅ AFTER (shadcn/ui 사용)

```tsx
<Card className="hover:shadow-md transition-shadow">
  <CardHeader>
    <CardTitle className="capitalize">{post.title}</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-muted-foreground mb-4">{post.body}</p>
    <LikeButton postId={post.id} />
  </CardContent>
</Card>
```

**개선점:**
- 명확한 구조 (Header, Content)
- CSS 변수 사용 (text-muted-foreground)
- 시맨틱 HTML
- 접근성 향상

---

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

### 3. 브라우저에서 확인

```
http://localhost:3001
```

---

## 🎓 학습 포인트

### 파일별 학습 내용

1. **`src/app/page.tsx`**
   - shadcn/ui의 핵심 가치 3가지
   - 전체 페이지 레이아웃 구성

2. **`src/components/PostItem.tsx`**
   - Tailwind vs shadcn 비교 (Card 컴포넌트)
   - 5가지 문제점과 개선점

3. **`src/components/LikeButton.tsx`**
   - Tailwind vs shadcn 비교 (Button 컴포넌트)
   - 로딩 상태 처리
   - variant 예시

4. **`src/components/ui/`**
   - shadcn 컴포넌트 소스 코드
   - 직접 수정 가능

---

## 🔧 커스터마이징 예제

### Button 색상 변경

**파일:** `src/components/ui/button.tsx`

```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center...",
  {
    variants: {
      variant: {
        // 이 부분을 수정하면 앱 전체 버튼이 변경됨!
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        // 빨간색으로 변경
        default: "bg-red-500 text-white hover:bg-red-600",
      },
    },
  }
)
```

### 테마 색상 변경

**파일:** `src/app/globals.css`

```css
:root {
  /* 파란색 → 초록색 */
  --primary: 142 76% 36%;  /* 초록색 */
  --primary-foreground: 355.7 100% 97.3%;
}
```

---

## 📊 비교 요약

| 항목 | Tailwind만 | shadcn/ui |
|------|-----------|-----------|
| **클래스 수** | 15+ | 2-3 (prop 사용) |
| **재사용성** | 복사/붙여넣기 | 컴포넌트 import |
| **유지보수** | 어려움 | 쉬움 (한 파일만 수정) |
| **테마** | 하드코딩 | CSS 변수 |
| **접근성** | 직접 구현 | 자동 처리 |
| **번들 크기** | 작음 | 작음 (필요한 것만) |
| **소유권** | 없음 | 완전 소유 |

---

## 💎 결론

**Tailwind가 레고 블록(재료)이라면,  
shadcn/ui는 그 블록으로 만든 멋진 자동차의 설계도(소스 코드)를  
내 방에 직접 배달해주는 서비스입니다.**

- 🎨 **재료:** Tailwind CSS
- 📦 **설계도:** shadcn/ui
- 🏠 **소유권:** 내 프로젝트
- ✨ **결과:** 완벽한 조합

---

## 📚 추가 자료

- [shadcn/ui 공식 문서](https://ui.shadcn.com/)
- [Tailwind CSS 문서](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Next.js 15 문서](https://nextjs.org/)

---

## 🤝 기여

이 프로젝트는 학습 목적으로 만들어졌습니다. 개선 사항이나 질문이 있으시면 이슈를 열어주세요!

