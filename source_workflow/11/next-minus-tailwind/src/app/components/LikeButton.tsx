"use client";

import { useState, useEffect } from 'react';

/**
 * 좋아요 버튼 컴포넌트 (클라이언트 컴포넌트)
 * 
 * 📡 통신 흐름:
 * - 마운트 시: GET /api/likes?postId=X → 좋아요 수 조회
 * - 클릭 시: POST /api/likes → 좋아요 수 증가
 * 
 * ⚠️ GitHub Pages 배포 시: API Routes 작동 안 함 → localStorage 사용 또는 별도 API 서버 필요
 * 
 * 🤔 일반 CSS: 버튼 하나에 30줄 CSS 필요 (기본 + 호버 + 비활성화)
 * ✅ Tailwind: className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
 */

type LikeButtonProps = {
  postId: number;
};

export default function LikeButton({ postId }: LikeButtonProps) {
  const [likes, setLikes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchLikes();
  }, [postId]);

  const fetchLikes = async () => {
    try {
      const response = await fetch(`/api/likes?postId=${postId}`);
      if (response.ok) {
        const data = await response.json();
        setLikes(data.likes);
      }
    } catch (error) {
      console.error('좋아요 수 조회 실패:', error);
    }
  };

  const handleClick = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: postId.toString() }),
      });

      if (response.ok) {
        const data = await response.json();
        setLikes(data.likes);
      } else {
        console.error('좋아요 증가 실패');
      }
    } catch (error) {
      console.error('API 호출 에러:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="like-button"
    >
      {isLoading ? (
        <span>
          <span className="loading-spinner"></span>
          ...
        </span>
      ) : (
        `👍 좋아요 (${likes})`
      )}
    </button>
  );
}

