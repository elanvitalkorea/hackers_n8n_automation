import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto p-8 text-center bg-background">
      <h1 className="text-5xl font-bold mb-10 text-foreground">
        소개 페이지
      </h1>
      <p className="text-xl text-muted-foreground mb-12">
        이 페이지는 React Router의 수동 설정 없이,
        단순히 `app/about/page.tsx` 파일을 생성하는 것만으로 만들어졌습니다.
      </p>
      <Button asChild className="text-primary-foreground">
        <Link href="/" className="hover:underline">
          홈으로 가기
        </Link>
      </Button>
    </main>
  );
}
