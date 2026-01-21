-- 설문 응답 데이터 테이블
CREATE TABLE IF NOT EXISTS surveys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  company_email TEXT NOT NULL,
  company_name TEXT NOT NULL,
  position TEXT NOT NULL,
  company_size TEXT NOT NULL,
  satisfaction SMALLINT NOT NULL CHECK (satisfaction >= 1 AND satisfaction <= 10),
  comment TEXT
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_surveys_created_at ON surveys(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_surveys_position ON surveys(position);
CREATE INDEX IF NOT EXISTS idx_surveys_company_size ON surveys(company_size);
CREATE INDEX IF NOT EXISTS idx_surveys_satisfaction ON surveys(satisfaction);

-- RLS (Row Level Security) 설정
-- 공개 설문이므로 모든 사용자가 읽기/쓰기 가능
ALTER TABLE surveys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON surveys
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON surveys
  FOR INSERT WITH CHECK (true);


