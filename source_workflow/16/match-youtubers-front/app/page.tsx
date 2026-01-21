'use client'

import { useState, FormEvent, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface FormData {
  advertiserName: string
  companyEmail: string
  companyName: string
  productName: string
  budgetUsd: string
  targetCpm: string
  targetCtr: string
  targetDemographics: string
  details: string
}

const getInitialFormData = (): FormData => ({
  advertiserName: '',
  companyEmail: '',
  companyName: '',
  productName: '',
  budgetUsd: '',
  targetCpm: '',
  targetCtr: '',
  targetDemographics: '',
  details: '',
})

export default function BriefSubmissionPage() {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>(getInitialFormData)
  
  // selectbox 값 추적을 위한 ref
  const selectRef = useRef<HTMLSelectElement>(null)
  const previousSelectValue = useRef<string>('')

  // 클라이언트 사이드에서만 실행되도록 보장
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    
    // selectbox 변경 시 ref에 즉시 저장하여 값 유지
    if (name === 'targetDemographics') {
      previousSelectValue.current = value
    }
    
    setFormData((prev) => {
      const newData = { ...prev, [name]: value }
      return newData
    })
  }

  // selectbox 값이 state와 동기화되도록 보장
  useEffect(() => {
    if (!mounted || !selectRef.current) return
    
    const currentStateValue = formData.targetDemographics ?? ''
    const currentDomValue = selectRef.current.value
    
    // DOM 값과 state 값이 다르면 state 값으로 동기화
    if (currentDomValue !== currentStateValue) {
      selectRef.current.value = currentStateValue
      previousSelectValue.current = currentStateValue
    } else if (currentStateValue) {
      // state에 값이 있으면 ref에도 저장
      previousSelectValue.current = currentStateValue
    }
  }, [formData.targetDemographics, mounted])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/brief', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage = errorData.message || '브리프 제출에 실패했습니다.'
        throw new Error(errorMessage)
      }

      // 제출 성공 시 폼 초기화
      setFormData(getInitialFormData())
      previousSelectValue.current = ''
      router.push('/success')
    } catch (error) {
      console.error('제출 오류:', error)
      alert('브리프 제출 중 오류가 발생했습니다. 다시 시도해주세요.')
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <div className="glass-card w-full max-w-2xl p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">
          🚀 광고 캠페인 브리프 제출
        </h1>
        <p className="text-gray-400 text-center mb-8">
          캠페인 정보를 입력하시면 담당자가 검토 후 연락드립니다
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 광고주명 */}
          <div>
            <label htmlFor="advertiserName" className="glass-label">
              광고주명 *
            </label>
            <input
              type="text"
              id="advertiserName"
              name="advertiserName"
              value={formData.advertiserName ?? ''}
              onChange={handleChange}
              className="glass-input"
              placeholder="담당자 이름을 입력하세요"
              required
            />
          </div>

          {/* 회사 이메일 */}
          <div>
            <label htmlFor="companyEmail" className="glass-label">
              회사 이메일 *
            </label>
            <input
              type="email"
              id="companyEmail"
              name="companyEmail"
              value={formData.companyEmail ?? ''}
              onChange={handleChange}
              className="glass-input"
              placeholder="contact@company.com"
              required
            />
          </div>

          {/* 회사명 */}
          <div>
            <label htmlFor="companyName" className="glass-label">
              회사명 *
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName ?? ''}
              onChange={handleChange}
              className="glass-input"
              placeholder="회사명을 입력하세요"
              required
            />
          </div>

          {/* 제품/서비스명 */}
          <div>
            <label htmlFor="productName" className="glass-label">
              제품/서비스명 *
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formData.productName ?? ''}
              onChange={handleChange}
              className="glass-input"
              placeholder="제품 또는 서비스명을 입력하세요"
              required
            />
          </div>

          {/* 캠페인 총 예산 */}
          <div>
            <label htmlFor="budgetUsd" className="glass-label">
              캠페인 총 예산 (USD) *
            </label>
            <input
              type="number"
              id="budgetUsd"
              name="budgetUsd"
              value={formData.budgetUsd ?? ''}
              onChange={handleChange}
              className="glass-input"
              placeholder="예: 50000"
              min="0"
              step="1"
              required
            />
          </div>

          {/* 목표 CPM */}
          <div>
            <label htmlFor="targetCpm" className="glass-label">
              목표 CPM (원, 선택)
            </label>
            <input
              type="number"
              id="targetCpm"
              name="targetCpm"
              value={formData.targetCpm ?? ''}
              onChange={handleChange}
              className="glass-input"
              placeholder="예: 20000 (이하)"
              min="0"
              step="1"
            />
          </div>

          {/* 목표 CTR */}
          <div>
            <label htmlFor="targetCtr" className="glass-label">
              목표 CTR (%, 선택)
            </label>
            <input
              type="number"
              id="targetCtr"
              name="targetCtr"
              value={formData.targetCtr ?? ''}
              onChange={handleChange}
              className="glass-input"
              placeholder="예: 3.5 (이상)"
              min="0"
              step="0.1"
            />
          </div>

          {/* 핵심 타겟 인구통계 */}
          <div>
            <label htmlFor="targetDemographics" className="glass-label">
              핵심 타겟 인구통계 *
            </label>
            <select
              ref={selectRef}
              id="targetDemographics"
              name="targetDemographics"
              value={formData.targetDemographics ?? ''}
              onChange={handleChange}
              className="glass-input glass-select"
              required
            >
              <option value="">선택하세요</option>
              <option value="MALE_10-20">10-20대 남성</option>
              <option value="MALE_20-30">20-30대 남성</option>
              <option value="MALE_30-50">30-50대 남성</option>
              <option value="FEMALE_20-30">20-30대 여성</option>
              <option value="FEMALE_20-40">20-40대 여성</option>
              <option value="FEMALE_30-40">30-40대 여성</option>
              <option value="FEMALE_40-60">40-60대 여성</option>
            </select>
          </div>

          {/* 캠페인 상세 내용 */}
          <div>
            <label htmlFor="details" className="glass-label">
              캠페인 상세 내용 *
            </label>
            <textarea
              id="details"
              name="details"
              value={formData.details ?? ''}
              onChange={handleChange}
              className="glass-input min-h-[150px] resize-y"
              placeholder="캠페인의 목적, 핵심 메시지, 원하는 효과 등을 자세히 작성해주세요"
              required
            />
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="glass-button w-full"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                제출 중...
              </span>
            ) : (
              '브리프 제출하기'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

