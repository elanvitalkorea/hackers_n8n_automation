/**
 * 이메일 형식 검증
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 전화번호 형식 검증 (010-XXXX-XXXX)
 */
export function validatePhone(phone: string): boolean {
  const phoneRegex = /^010-\d{4}-\d{4}$/;
  return phoneRegex.test(phone);
}

/**
 * 전화번호 자동 포맷팅 (010XXXXXXXX -> 010-XXXX-XXXX)
 */
export function formatPhoneNumber(value: string): string {
  // 숫자만 추출
  const numbers = value.replace(/\D/g, "");
  
  // 010으로 시작하는지 확인
  if (!numbers.startsWith("010")) {
    return value;
  }
  
  // 길이 제한 (11자리: 010XXXXXXXX)
  const limited = numbers.slice(0, 11);
  
  // 포맷팅: 010-XXXX-XXXX
  if (limited.length <= 3) {
    return limited;
  } else if (limited.length <= 7) {
    return `${limited.slice(0, 3)}-${limited.slice(3)}`;
  } else {
    return `${limited.slice(0, 3)}-${limited.slice(3, 7)}-${limited.slice(7)}`;
  }
}


