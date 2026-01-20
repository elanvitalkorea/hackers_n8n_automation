-- Supabase 대시보드의 'Database' > 'Functions' 메뉴에서
-- 'New Function'을 눌러 아래 함수 2개를 각각 생성합니다.

-- ----------------------------------------------------------------
-- 함수 1: calculate_current_nps()
-- 역할: 현재 시점의 NPS 점수만 계산하여 반환합니다. (/api/submit -> n8n 용)
-- ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION calculate_current_nps()
RETURNS float
LANGUAGE sql
AS $$
  SELECT
    COALESCE(
      (
        (
          COUNT(CASE WHEN satisfaction >= 9 THEN 1 END) -- Promoters
          - 
          COUNT(CASE WHEN satisfaction <= 6 THEN 1 END) -- Detractors
        )::float / COUNT(id)::float
      ) * 100
    , 0) -- 응답자가 0명일 경우 0 반환
  FROM surveys;
$$;


-- ----------------------------------------------------------------
-- 함수 2: get_dashboard_stats()
-- 역할: 대시보드에 필요한 모든 통계 데이터를 JSON 객체로 한 번에 반환합니다. (/api/stats 용)
-- ----------------------------------------------------------------
CREATE OR REPLACE FUNCTION get_dashboard_stats()
RETURNS jsonb
LANGUAGE sql
AS $$
  SELECT jsonb_build_object(
    'total_respondents',
    (SELECT COUNT(id) FROM surveys),
    
    'nps_score',
    (SELECT calculate_current_nps()), -- 위에서 만든 함수 재사용
    
    'position_distribution',
    (
      SELECT COALESCE(jsonb_agg(stats), '[]'::jsonb)
      FROM (
        SELECT position, COUNT(id) AS count
        FROM surveys
        GROUP BY position
        ORDER BY count DESC
      ) AS stats
    ),
    
    'company_size_distribution',
    (
      SELECT COALESCE(jsonb_agg(stats), '[]'::jsonb)
      FROM (
        SELECT company_size, COUNT(id) AS count
        FROM surveys
        GROUP BY company_size
        ORDER BY count DESC
      ) AS stats
    )
  );
$$;
