// 설문 폼 데이터 타입
export interface SurveyFormData {
  name: string;
  phone: string;
  company_email: string;
  company_name: string;
  position: Position;
  company_size: CompanySize;
  satisfaction: number;
  comment?: string;
}

// 직책 타입
export type Position = "개발자" | "매니저" | "임원" | "기타";

// 회사 규모 타입
export type CompanySize = "1-10명" | "11-50명" | "51-200명" | "201명 이상";

// 대시보드 통계 데이터 타입
export interface DashboardStats {
  total_respondents: number;
  nps_score: number;
  position_distribution: {
    position: Position;
    count: number;
  }[];
  company_size_distribution: {
    company_size: CompanySize;
    count: number;
  }[];
}

// API 응답 타입
export interface SubmitResponse {
  success: boolean;
  message: string;
  nps_score?: number;
}

export interface ErrorResponse {
  error: string;
}


