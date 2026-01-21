export interface SurveyFormData {
  name: string;
  phone: string;
  company_email: string;
  company_name: string;
  position: string;
  company_size: string;
  satisfaction: number;
  comment?: string;
}

export interface DashboardStats {
  total_respondents: number;
  nps_score: number;
  position_distribution: Array<{
    position: string;
    count: number;
  }>;
  company_size_distribution: Array<{
    size: string;
    count: number;
  }>;
}

export type Position = '개발자' | '매니저' | '임원' | '기타';
export type CompanySize = '1-10명' | '11-50명' | '51-200명' | '201명 이상';

