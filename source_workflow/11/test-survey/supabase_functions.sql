-- NPS 점수 계산 함수
-- NPS = ((Promoters - Detractors) / 총응답자수) × 100
-- Promoters: satisfaction >= 9
-- Detractors: satisfaction <= 6
CREATE OR REPLACE FUNCTION calculate_current_nps()
RETURNS FLOAT AS $$
DECLARE
  total_count INTEGER;
  promoters_count INTEGER;
  detractors_count INTEGER;
  nps_score FLOAT;
BEGIN
  -- 총 응답자 수
  SELECT COUNT(*) INTO total_count FROM surveys;
  
  -- 응답자가 없으면 0 반환
  IF total_count = 0 THEN
    RETURN 0;
  END IF;
  
  -- Promoters 수 (9-10점)
  SELECT COUNT(*) INTO promoters_count 
  FROM surveys 
  WHERE satisfaction >= 9;
  
  -- Detractors 수 (1-6점)
  SELECT COUNT(*) INTO detractors_count 
  FROM surveys 
  WHERE satisfaction <= 6;
  
  -- NPS 계산
  nps_score := ((promoters_count::FLOAT - detractors_count::FLOAT) / total_count::FLOAT) * 100;
  
  RETURN nps_score;
END;
$$ LANGUAGE plpgsql;

-- 대시보드 통계 데이터 조회 함수
CREATE OR REPLACE FUNCTION get_dashboard_stats()
RETURNS JSONB AS $$
DECLARE
  result JSONB;
BEGIN
  SELECT jsonb_build_object(
    'total_respondents', COUNT(*),
    'nps_score', calculate_current_nps(),
    'position_distribution', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'position', position,
          'count', count
        ) ORDER BY count DESC
      )
      FROM (
        SELECT position, COUNT(*) as count
        FROM surveys
        GROUP BY position
      ) AS pos_dist
    ),
    'company_size_distribution', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'company_size', company_size,
          'count', count
        ) ORDER BY count DESC
      )
      FROM (
        SELECT company_size, COUNT(*) as count
        FROM surveys
        GROUP BY company_size
      ) AS size_dist
    )
  ) INTO result
  FROM surveys;
  
  -- 데이터가 없을 경우 기본값 반환
  IF result IS NULL OR (result->>'total_respondents')::INTEGER = 0 THEN
    RETURN jsonb_build_object(
      'total_respondents', 0,
      'nps_score', 0,
      'position_distribution', '[]'::jsonb,
      'company_size_distribution', '[]'::jsonb
    );
  END IF;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;


