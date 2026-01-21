-- Supabase import script for the 16–17차 매칭 시스템
-- Creates tables & policies only. Data insertion is handled by insert_synthetic_data.mjs

-- Extensions (Supabase usually has pgcrypto; keep IF NOT EXISTS for id generation)
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS vector;

-- Table: youtubers (structured specs)
CREATE TABLE IF NOT EXISTS youtubers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  channel_name TEXT NOT NULL,
  subscriber_count INT NOT NULL CHECK (subscriber_count >= 0),
  category TEXT,
  avg_views INT NOT NULL DEFAULT 0 CHECK (avg_views >= 0),
  keywords TEXT[],
  channel_link TEXT UNIQUE,
  tone_and_manner TEXT DEFAULT 'informative',
  cost_per_video_usd INT CHECK (cost_per_video_usd >= 0),
  avg_cpm INT CHECK (avg_cpm >= 0),
  avg_ctr_percent NUMERIC(4,2) CHECK (avg_ctr_percent >= 0 AND avg_ctr_percent <= 100),
  main_demographics TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE youtubers ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "youtubers anon read" ON youtubers
FOR SELECT USING (true);

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_youtubers_category ON youtubers(category);
CREATE INDEX IF NOT EXISTS idx_youtubers_demo ON youtubers(main_demographics);
CREATE INDEX IF NOT EXISTS idx_youtubers_cpm ON youtubers(avg_cpm);
CREATE INDEX IF NOT EXISTS idx_youtubers_ctr ON youtubers(avg_ctr_percent);
CREATE INDEX IF NOT EXISTS idx_youtubers_cost ON youtubers(cost_per_video_usd);

-- Table: documents (vector store for semantic search)
CREATE TABLE IF NOT EXISTS documents (
  id BIGSERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  embedding VECTOR(1536),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY IF NOT EXISTS "documents anon read" ON documents
FOR SELECT USING (true);

-- Table: campaigns (workflow state)
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  s3_key TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  ai_analysis JSONB,
  matched_youtubers JSONB,
  generated_proposal TEXT,
  generated_contract TEXT,
  final_contract_s3_key TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
-- Allow anon read for dashboard + service role full write via JWT role checks (Supabase)
CREATE POLICY IF NOT EXISTS "campaigns anon read" ON campaigns FOR SELECT USING (true);
CREATE POLICY IF NOT EXISTS "campaigns service_role all" ON campaigns
FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');

-- ======================
-- Hybrid Search RPC Function
-- ======================
-- (중요) 17차시 Agent 2는 (1) SQL로 필터링된 후보군 내에서 (2) RAG 검색을 수행해야 합니다.
-- n8n의 기본 Supabase Vector Store 노드는 메타데이터 필터링을 지원하지 않으므로,
-- 이 RPC 함수를 사용하여 필터링된 ID 배열 내에서만 벡터 검색을 수행합니다.
CREATE FUNCTION match_documents_by_ids(
  query_embedding vector(1536),
  match_count int,
  filter_ids uuid[] -- channel_id가 UUID 타입이므로 uuid[] 사용
)
returns table (
  id bigint,
  content text,
  metadata jsonb,
  similarity float
)
language sql stable
as $$
  select
    documents.id,
    documents.content,
    documents.metadata,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  -- (핵심) metadata의 channel_id가 filter_ids 배열에 포함된 것만 검색
  where (documents.metadata->>'channel_id')::uuid = ANY(filter_ids)
  order by documents.embedding <=> query_embedding
  limit match_count;
$$;

-- ======================
-- Realtime Publication
-- ======================
-- Flutter 앱이 campaigns 테이블의 변경사항을 실시간으로 받으려면,
-- 테이블을 Supabase Realtime 발행에 추가해야 합니다.
ALTER PUBLICATION supabase_realtime ADD TABLE campaigns;

-- ======================
-- Data insertion
-- ======================
-- Note: Youtuber data insertion is handled by insert_synthetic_data.mjs
-- Run: node insert_synthetic_data.mjs
--
-- 이 SQL 파일은 Supabase SQL Editor에서 직접 실행할 수 있습니다:
-- 1. Supabase Dashboard > SQL Editor로 이동
-- 2. "New query" 클릭
-- 3. 이 파일의 전체 내용을 복사하여 붙여넣기
-- 4. "Run" 버튼 클릭하여 실행
