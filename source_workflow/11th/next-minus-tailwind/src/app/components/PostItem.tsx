import { Post } from '@/types';
import LikeButton from './LikeButton';

type PostItemProps = {
  post: Post;
};

/**
 * 포스트 아이템 컴포넌트 (서버 컴포넌트)
 * 
 * 💡 서버/클라이언트 조합: PostItem(서버) + LikeButton(클라이언트)
 * 
 * 🤔 일반 CSS: className만 보고는 스타일 모름 → CSS 파일 확인 필요
 * ✅ Tailwind: className="p-6 bg-white rounded-xl shadow-md" → 즉시 파악
 */
export default function PostItem({ post }: PostItemProps) {
  return (
    <article className="post-card">
      <h2 className="post-title">
        {post.title}
      </h2>
      <p className="post-body">{post.body}</p>
      
      {/* 클라이언트 컴포넌트 (인터랙티브) */}
      <LikeButton postId={post.id} />
    </article>
  );
}

