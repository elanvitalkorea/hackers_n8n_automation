import { Post } from '@/types';
import LikeButton from '@/components/LikeButton';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type PostItemProps = {
  post: Post;
};

/**
 * ═══════════════════════════════════════════════════════════════════
 * 학습 예제: Tailwind만 사용 vs shadcn/ui 사용 비교
 * ═══════════════════════════════════════════════════════════════════
 * 
 * 📌 BEFORE (Tailwind만 사용):
 * ────────────────────────────────────────────────────────────────
 * <article className="p-6 bg-white border border-gray-200 rounded-xl shadow-md space-y-3 hover:shadow-lg transition-shadow">
 *   <h2 className="text-2xl font-bold text-gray-800 capitalize">{post.title}</h2>
 *   <p className="text-gray-600">{post.body}</p>
 *   <LikeButton postId={post.id} />
 * </article>
 * 
 * ❌ 문제점:
 * 1. 클래스 지옥: 10개 이상의 유틸리티 클래스를 직접 나열
 * 2. 테마 불일치: gray-800, gray-600 등 하드코딩된 색상
 * 3. 구조 불명확: article 태그에 모든 스타일이 집중
 * 4. 재사용 어려움: 동일한 카드 스타일을 매번 복사/붙여넣기
 * 5. 유지보수 어려움: 디자인 변경 시 모든 파일 수정 필요
 * 
 * ═══════════════════════════════════════════════════════════════════
 * 
 * 📌 AFTER (shadcn/ui 사용):
 * ────────────────────────────────────────────────────────────────
 * 아래 코드 참조
 * 
 * ✅ 개선점:
 * 1. 컴포넌트 추상화: Card, CardHeader, CardContent로 명확한 구조
 * 2. 테마 시스템: text-foreground, text-muted-foreground 등 CSS 변수 사용
 * 3. 완전한 소유권: src/components/ui/card.tsx를 직접 수정 가능
 * 4. 일관된 디자인: 앱 전체에서 동일한 카드 스타일 공유
 * 5. 접근성 자동: ARIA 속성이 자동으로 적용됨
 * 
 * ═══════════════════════════════════════════════════════════════════
 */

export default function PostItem({ post }: PostItemProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle className="capitalize">{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{post.body}</p>
        <LikeButton postId={post.id} />
      </CardContent>
    </Card>
  );
}
