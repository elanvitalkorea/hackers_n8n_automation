'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 에러를 콘솔에 로깅
    console.error('에러 발생:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold text-white mb-4">❌ 에러가 발생했습니다</h1>
        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 mb-4">
          <p className="text-red-200 text-sm font-mono break-all">
            {error.message || '알 수 없는 에러가 발생했습니다.'}
          </p>
          {error.digest && (
            <p className="text-red-300 text-xs mt-2">에러 ID: {error.digest}</p>
          )}
        </div>
        <div className="flex gap-4">
          <button
            onClick={reset}
            className="glass-button flex-1"
          >
            다시 시도
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="glass-button flex-1"
            style={{ background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)' }}
          >
            홈으로 돌아가기
          </button>
        </div>
        <details className="mt-4">
          <summary className="text-gray-400 cursor-pointer text-sm">스택 트레이스 보기</summary>
          <pre className="mt-2 text-xs text-gray-500 overflow-auto bg-black/20 p-4 rounded">
            {error.stack}
          </pre>
        </details>
      </div>
    </div>
  )
}

