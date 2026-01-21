"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

type LikeButtonProps = {
  postId: number;
};

/**
 * ═══════════════════════════════════════════════════════════════════
 * 학습 예제: Tailwind만 사용 vs shadcn/ui 사용 비교
 * ═══════════════════════════════════════════════════════════════════
 * 
 * 📌 BEFORE (Tailwind만 사용):
 * ────────────────────────────────────────────────────────────────
 * <button
 *   onClick={handleClick}
 *   disabled={isLoading}
 *   className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold 
 *              hover:bg-blue-600 transition-colors shadow-sm 
 *              disabled:opacity-50 disabled:cursor-not-allowed"
 * >
 *   {isLoading ? '...' : `👍 좋아요 (${likes})`}
 * </button>
 * 
 * ❌ 문제점:
 * 1. 클래스 지옥: 15개 이상의 유틸리티 클래스가 한 줄에
 * 2. 복사/붙여넣기: 다른 버튼을 만들려면 전체 문자열 복사
 * 3. 유지보수 어려움: primary 버튼 색상 변경 시 모든 파일 수정
 * 4. 로딩 상태 단순: "..." 텍스트로만 표시
 * 5. variant 없음: destructive, outline 등 변형 구현 어려움
 * 
 * ═══════════════════════════════════════════════════════════════════
 * 
 * 📌 AFTER (shadcn/ui 사용):
 * ────────────────────────────────────────────────────────────────
 * 아래 코드 참조
 * 
 * ✅ 개선점:
 * 1. Prop 기반 스타일: variant="default" 또는 "outline", "destructive" 선택
 * 2. 일관된 디자인: 앱 전체의 모든 버튼이 동일한 스타일 공유
 * 3. 전문적인 로딩: Loader2 아이콘으로 animate-spin 효과
 * 4. 접근성 자동: disabled 상태, ARIA 속성 자동 적용
 * 5. 쉬운 커스텀: src/components/ui/button.tsx 파일만 수정하면 
 *                앱 전체 버튼이 한 번에 업데이트
 * 
 * 💡 variant 예시:
 * - variant="default" : primary 스타일 (기본)
 * - variant="outline"  : 테두리만 있는 스타일
 * - variant="ghost"    : 배경 없는 텍스트 버튼
 * - variant="destructive" : 빨간색 삭제 버튼
 * 
 * ═══════════════════════════════════════════════════════════════════
 */

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
    <Button
      onClick={handleClick}
      disabled={isLoading}
      variant="default"
      size="sm"
      className="font-semibold"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          저장 중...
        </>
      ) : (
        `👍 좋아요 (${likes})`
      )}
    </Button>
  );
}
