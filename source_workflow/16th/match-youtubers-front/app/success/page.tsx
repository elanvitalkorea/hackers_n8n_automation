import Link from 'next/link'

export default function SuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="glass-card w-full max-w-2xl p-8 md:p-12 text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-4">
            <svg
              className="w-10 h-10 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ✅ 브리프 제출이 완료되었습니다
          </h1>
          <p className="text-gray-300 text-lg mb-2">
            소중한 정보를 제출해 주셔서 감사합니다.
          </p>
          <p className="text-gray-400 text-base">
            담당자가 검토 후 영업일 기준 1-2일 내에 <br />
            기입하신 이메일로 연락드릴 예정입니다.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <Link
            href="/"
            className="glass-button inline-block"
          >
            새 브리프 작성하기
          </Link>
          
          <p className="text-gray-500 text-sm mt-4">
            추가 문의사항이 있으시면 이메일로 연락 주세요.
          </p>
        </div>
      </div>
    </div>
  )
}
