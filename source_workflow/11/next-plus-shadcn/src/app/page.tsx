import { Post } from '@/types';
import PostItem from '@/components/PostItem';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

/**
 * ═══════════════════════════════════════════════════════════════════
 * shadcn/ui의 핵심 가치: Tailwind의 재료 + 컴포넌트의 설계도
 * ═══════════════════════════════════════════════════════════════════
 * 
 * 🎨 Tailwind CSS (재료):
 * - 유틸리티 클래스: p-4, text-lg, bg-blue-500 등
 * - 문제: 클래스가 길어지고, 반복되고, 유지보수가 어려움
 * 
 * 📦 shadcn/ui (설계도):
 * - 컴포넌트: Button, Card, Alert 등
 * - 해결책: prop으로 스타일 제어, 테마 공유, 소유권 유지
 * 
 * 💡 shadcn/ui의 3가지 핵심 장점:
 * 
 * 1️⃣ 완전한 소유권 (You Own the Code)
 *    - npm install이 아닌 소스 코드 복사 방식
 *    - src/components/ui/ 파일을 직접 수정 가능
 *    - 라이브러리에 종속되지 않음
 * 
 * 2️⃣ 일관된 디자인 시스템 (Design System)
 *    - CSS 변수 기반: --primary, --foreground 등
 *    - 앱 전체에서 동일한 테마 공유
 *    - Dark mode 자동 지원
 * 
 * 3️⃣ 가벼운 번들 (Lightweight Bundle)
 *    - 필요한 컴포넌트만 추가
 *    - Radix UI로 접근성 자동 처리
 *    - Tailwind로 스타일 최적화
 * 
 * ═══════════════════════════════════════════════════════════════════
 */

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5', {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <main className="max-w-4xl mx-auto p-8 bg-background min-h-screen space-y-8">
      {/* 헤더 섹션: shadcn Button으로 깔끔한 네비게이션 */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-foreground">
          Next.js 15 + TypeScript + shadcn/ui
        </h1>
        <p className="text-muted-foreground text-lg">
          Tailwind의 유연성 + shadcn의 컴포넌트 = 완벽한 조합 ✨
        </p>
        <Link href="/about">
          <Button variant="outline" size="lg">
            소개 페이지로 가기 →
          </Button>
        </Link>
      </div>
      
      {/* 포스트 목록: shadcn Card 컴포넌트로 일관된 디자인 */}
      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map((post) => <PostItem key={post.id} post={post} />)
        ) : (
          // 에러 상태: shadcn Alert으로 접근성 향상
          <Alert className="max-w-md mx-auto">
            <AlertDescription>
              포스트를 불러오지 못했습니다. 네트워크를 확인하세요.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </main>
  );
}

