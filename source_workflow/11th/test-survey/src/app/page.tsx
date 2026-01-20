"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { SurveyFormData, Position, CompanySize } from "@/lib/types";
import { validateEmail, validatePhone, formatPhoneNumber } from "@/lib/validation";

export default function Home() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<SurveyFormData>({
    name: "",
    phone: "",
    company_email: "",
    company_name: "",
    position: "개발자",
    company_size: "1-10명",
    satisfaction: 5,
    comment: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    // 전화번호 자동 포맷팅
    if (name === "phone") {
      const formatted = formatPhoneNumber(value);
      setFormData((prev) => ({ ...prev, [name]: formatted }));
      return;
    }
    
    // 만족도는 숫자로 변환
    if (name === "satisfaction") {
      setFormData((prev) => ({ ...prev, [name]: parseInt(value, 10) }));
      return;
    }
    
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 클라이언트 사이드 유효성 검사
    if (!formData.name.trim()) {
      alert("이름을 입력해주세요.");
      setIsSubmitting(false);
      return;
    }

    if (!validatePhone(formData.phone)) {
      alert("전화번호를 올바른 형식으로 입력해주세요. (010-XXXX-XXXX)");
      setIsSubmitting(false);
      return;
    }

    if (!validateEmail(formData.company_email)) {
      alert("올바른 이메일 주소를 입력해주세요.");
      setIsSubmitting(false);
      return;
    }

    if (!formData.company_name.trim()) {
      alert("회사명을 입력해주세요.");
      setIsSubmitting(false);
      return;
    }

    if (formData.satisfaction < 1 || formData.satisfaction > 10) {
      alert("만족도는 1-10 사이의 값이어야 합니다.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "설문 제출에 실패했습니다.");
      }

      // 성공 시 통계 페이지로 이동
      router.push("/stats");
    } catch (error) {
      alert(error instanceof Error ? error.message : "설문 제출에 실패했습니다.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="glass-card p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI 자동화 강의 만족도 조사
          </h1>
          <p className="text-center text-white/60 mb-8">
            여러분의 소중한 의견을 들려주세요
          </p>

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
                className="glass-input"
                placeholder="홍길동"
                required
              />
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
                className="glass-input"
                placeholder="010-1234-5678"
                maxLength={13}
                required
              />
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
                className="glass-input"
                placeholder="hong@example.com"
                required
              />
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
                className="glass-input"
                placeholder="테크컴퍼니"
                required
              />
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
                className="glass-select"
                required
              >
                <option value="개발자">개발자</option>
                <option value="매니저">매니저</option>
                <option value="임원">임원</option>
                <option value="기타">기타</option>
              </select>
            </div>

            {/* 회사 규모 */}
            <div>
              <label className="glass-label">
                회사 규모 <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                {(["1-10명", "11-50명", "51-200명", "201명 이상"] as CompanySize[]).map((size) => (
                  <label
                    key={size}
                    className="flex items-center p-3 glass-card cursor-pointer hover:bg-white/10 transition-colors"
                  >
                    <input
                      type="radio"
                      name="company_size"
                      value={size}
                      checked={formData.company_size === size}
                      onChange={handleInputChange}
                      className="mr-2"
                      required
                    />
                    <span className="text-sm">{size}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 강의 만족도 */}
            <div>
              <label htmlFor="satisfaction" className="glass-label">
                강의 만족도 <span className="text-red-400">*</span>
                <span className="ml-2 text-purple-400 font-bold">
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
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-600"
                required
              />
              <div className="flex justify-between text-xs text-white/50 mt-1">
                <span>1점</span>
                <span>10점</span>
              </div>
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
                className="glass-input min-h-[100px] resize-none"
                placeholder="강의에 대한 의견을 자유롭게 남겨주세요..."
              />
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="glass-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "제출 중..." : "설문 제출하기"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}


