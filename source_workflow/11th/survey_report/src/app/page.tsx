'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { SurveyFormData, Position, CompanySize } from '@/lib/types';
import { validateEmail, validatePhone, formatPhoneNumber } from '@/lib/validation';

const POSITIONS: Position[] = ['개발자', '매니저', '임원', '기타'];
const COMPANY_SIZES: CompanySize[] = ['1-10명', '11-50명', '51-200명', '201명 이상'];

export default function Home() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<SurveyFormData>({
    name: '',
    phone: '',
    company_email: '',
    company_name: '',
    position: '',
    company_size: '',
    satisfaction: 5,
    comment: '',
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      setFormData(prev => ({ ...prev, [name]: formatPhoneNumber(value) }));
    } else if (name === 'satisfaction') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 1 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // 에러 메시지 제거
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.';
    }

    if (!formData.phone) {
      newErrors.phone = '전화번호를 입력해주세요.';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = '전화번호는 010-XXXX-XXXX 형식이어야 합니다.';
    }

    if (!formData.company_email) {
      newErrors.company_email = '회사 이메일을 입력해주세요.';
    } else if (!validateEmail(formData.company_email)) {
      newErrors.company_email = '올바른 이메일 형식이 아닙니다.';
    }

    if (!formData.company_name.trim()) {
      newErrors.company_name = '회사명을 입력해주세요.';
    }

    if (!formData.position) {
      newErrors.position = '직책을 선택해주세요.';
    }

    if (!formData.company_size) {
      newErrors.company_size = '회사 규모를 선택해주세요.';
    }

    if (formData.satisfaction < 1 || formData.satisfaction > 10) {
      newErrors.satisfaction = '만족도는 1-10점 사이여야 합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || '설문 제출에 실패했습니다.');
      }

      // 성공 시 통계 페이지로 이동
      router.push('/stats');
    } catch (error) {
      console.error('Submit error:', error);
      alert(error instanceof Error ? error.message : '설문 제출 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-card p-8 md:p-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            강의 만족도 조사
          </h1>
          <p className="text-white/70">
            AI x n8n 업무 자동화 실전 프로젝트 강의에 참여해주셔서 감사합니다.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 이름 */}
          <div>
            <label htmlFor="name" className="glass-label">
              이름 <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="glass-input w-full"
              placeholder="홍길동"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name}</p>
            )}
          </div>

          {/* 전화번호 */}
          <div>
            <label htmlFor="phone" className="glass-label">
              전화번호 <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="glass-input w-full"
              placeholder="010-1234-5678"
              maxLength={13}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
            )}
          </div>

          {/* 회사 이메일 */}
          <div>
            <label htmlFor="company_email" className="glass-label">
              회사 이메일 <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="company_email"
              name="company_email"
              value={formData.company_email}
              onChange={handleInputChange}
              className="glass-input w-full"
              placeholder="example@company.com"
            />
            {errors.company_email && (
              <p className="mt-1 text-sm text-red-400">{errors.company_email}</p>
            )}
          </div>

          {/* 회사명 */}
          <div>
            <label htmlFor="company_name" className="glass-label">
              회사명 <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="company_name"
              name="company_name"
              value={formData.company_name}
              onChange={handleInputChange}
              className="glass-input w-full"
              placeholder="회사명을 입력하세요"
            />
            {errors.company_name && (
              <p className="mt-1 text-sm text-red-400">{errors.company_name}</p>
            )}
          </div>

          {/* 직책 */}
          <div>
            <label htmlFor="position" className="glass-label">
              직책 <span className="text-red-400">*</span>
            </label>
            <select
              id="position"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              className="glass-select w-full"
            >
              <option value="">선택하세요</option>
              {POSITIONS.map(pos => (
                <option key={pos} value={pos} className="bg-gray-800">
                  {pos}
                </option>
              ))}
            </select>
            {errors.position && (
              <p className="mt-1 text-sm text-red-400">{errors.position}</p>
            )}
          </div>

          {/* 회사 규모 */}
          <div>
            <label className="glass-label">
              회사 규모 <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              {COMPANY_SIZES.map(size => (
                <label
                  key={size}
                  className={`glass-card p-4 cursor-pointer transition-all hover:border-blue-500/50 ${
                    formData.company_size === size
                      ? 'border-blue-500 bg-blue-500/10'
                      : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="company_size"
                    value={size}
                    checked={formData.company_size === size}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <span className="text-white text-center block">{size}</span>
                </label>
              ))}
            </div>
            {errors.company_size && (
              <p className="mt-1 text-sm text-red-400">{errors.company_size}</p>
            )}
          </div>

          {/* 강의 만족도 */}
          <div>
            <label htmlFor="satisfaction" className="glass-label">
              강의 만족도 <span className="text-red-400">*</span>
              <span className="ml-2 text-blue-400 font-bold text-lg">
                {formData.satisfaction}점
              </span>
            </label>
            <input
              type="range"
              id="satisfaction"
              name="satisfaction"
              min="1"
              max="10"
              value={formData.satisfaction}
              onChange={handleInputChange}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-sm text-white/50 mt-1">
              <span>1점 (매우 불만)</span>
              <span>10점 (매우 만족)</span>
            </div>
            {errors.satisfaction && (
              <p className="mt-1 text-sm text-red-400">{errors.satisfaction}</p>
            )}
          </div>

          {/* 코멘트 */}
          <div>
            <label htmlFor="comment" className="glass-label">
              강의 관련 코멘트 (선택)
            </label>
            <textarea
              id="comment"
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              rows={4}
              className="glass-input w-full resize-none"
              placeholder="강의에 대한 의견을 자유롭게 작성해주세요."
            />
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="glass-button w-full relative"
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
              '제출하기'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

