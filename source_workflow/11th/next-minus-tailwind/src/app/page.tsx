import { Post } from '@/types';
import PostItem from '@/app/components/PostItem';
import Link from 'next/link';

/**
 * 외부 API에서 포스트 데이터를 가져오는 함수
 * 
 * 📌 현재: Dynamic (SSR) - GitHub Pages 배포 불가 ❌
 * 🔧 GitHub Pages 배포용: cache: 'no-store' 제거 또는 'force-cache'로 변경
 */
async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5', {
      cache: 'no-store', // SSR 설정 (항상 최신 데이터)
      
      // GitHub Pages 배포용: 아래 옵션 중 하나 선택
      // cache: 'force-cache',  // Static 생성
      // next: { revalidate: 3600 },  // ISR (Vercel 등)
    });
    
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

/**
 * 메인 페이지 컴포넌트 (서버 컴포넌트)
 * 
 * 💡 서버 컴포넌트 장점: 초기 로딩 빠름, SEO 최적화, JS 번들 크기 감소
 */
export default async function HomePage() {
  const posts = await getPosts();

  return (
    // 🤔 일반 CSS: className만 보고는 스타일 알 수 없음 → common.css 확인 필요
    // ✅ Tailwind: <main className="max-w-4xl mx-auto p-8"> → 한눈에 파악
    <main className="main-container">
      <h1 className="page-title">
        Next.js + TypeScript 실습
      </h1>
      
      <div className="link-container">
        <Link href="/about" className="link-style">
          소개 페이지로 가기
        </Link>
      </div>
      
      <div className="posts-space">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostItem key={post.id} post={post} />
          ))
        ) : (
          <p className="error-message fade-in">포스트를 불러오지 못했습니다.</p>
        )}
      </div>
    </main>
  );
}

