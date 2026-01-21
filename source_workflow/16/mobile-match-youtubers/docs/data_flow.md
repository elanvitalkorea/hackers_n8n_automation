# 데이터 흐름 가이드 (Data Flow Guide)

n8n Agent 구현을 위한 DB와 JSON 등 Flutter와의 상호작용 데이터 상세 가이드

---

## 📋 목차

1. [전체 데이터 흐름 개요](#전체-데이터-흐름-개요)
2. [Agent 1: 광고 캠페인 분석](#agent-1-광고-캠페인-분석)
3. [Agent 2: 유튜버 매칭 및 제안서 생성](#agent-2-유튜버-매칭-및-제안서-생성)
4. [Agent 3: 계약서 초안 생성](#agent-3-계약서-초안-생성)
5. [마무리 워크플로우: PDF 변환 및 최종 보고](#마무리-워크플로우-pdf-변환-및-최종-보고)

---

## 전체 데이터 흐름 개요

```
[Next.js 폼] → [S3] → [Agent 1] → [Supabase DB] → [Flutter 앱]
                                                      ↓
[Flutter 앱] → [Agent 2 Webhook] → [Supabase DB] → [Flutter 앱]
                                                      ↓
[Flutter 앱] → [Agent 3 Webhook] → [Supabase DB] → [마무리 워크플로우] → [S3 PDF] → [Flutter 앱]
```

---

## Agent 1: 광고 캠페인 분석

### 1. 입력 데이터 (S3 JSON 파일)

**위치**: `s3://[bucket-name]/campaign-briefs/new/brief-form-1234567890-abc123.json`

**예시 내용**:
```json
{
  "companyName": "기가코퍼레이션",
  "advertiserName": "홍길동",
  "email": "hong@example.com",
  "productName": "AI 노트북 Pro",
  "budgetUSD": 10000,
  "targetDemographics": "MALE_20-30",
  "targetCPM": 20000,
  "targetCTR": 3.0,
  "details": "AI를 활용한 업무 자동화 툴 리뷰를 위한 전문가 유튜버 매칭. 실무 활용법과 ROI를 강조한 콘텐츠를 원합니다."
}
```

### 2. JSON 파싱 및 요약 생성

**n8n 노드**: `Set (Parse JSON)` → `OpenAI (Generate Summary)`

**처리 과정**:
1. **S3에서 JSON 파일 읽기**: `{{ $node["AWS S3"].json.data | binaryToText | parseJson }}`
2. **JSON 파싱**: S3에서 읽은 JSON 문자열을 객체로 변환
3. **요약 생성**: `details` 필드만 LLM으로 요약하여 `summary` 생성

**OpenAI 응답 형식**:
```json
{
  "choices": [
    {
      "message": {
        "content": "AI를 활용한 업무 자동화 툴 리뷰 및 실무 활용법 소개를 위한 전문가 유튜버 매칭"
      }
    }
  ]
}
```

**최종 ai_analysis JSON** (원본 JSON + summary 결합):
```json
{
  "companyName": "기가코퍼레이션",
  "advertiserName": "홍길동",
  "email": "hong@example.com",
  "productName": "AI 노트북 Pro",
  "budgetUSD": 10000,
  "targetDemographics": "MALE_20-30",
  "targetCPM": 20000,
  "targetCTR": 3.0,
  "details": "AI를 활용한 업무 자동화 툴 리뷰를 위한 전문가 유튜버 매칭. 실무 활용법과 ROI를 강조한 콘텐츠를 원합니다.",
  "summary": "AI를 활용한 업무 자동화 툴 리뷰 및 실무 활용법 소개를 위한 전문가 유튜버 매칭"
}
```

### 3. Supabase DB 저장

**n8n 노드**: `Supabase (Save State)`

**테이블**: `campaigns`

**저장 데이터**:
```sql
INSERT INTO campaigns (
  id,
  s3_key,
  status,
  ai_analysis,
  created_at
) VALUES (
  'f36d2920-3396-49ef-923f-97faf7cdeff2',  -- UUID 자동 생성
  'campaign-briefs/new/brief-form-1234567890-abc123.json',
  'pending_approval',
  '{
    "companyName": "기가코퍼레이션",
    "advertiserName": "홍길동",
    "email": "hong@example.com",
    "productName": "AI 노트북 Pro",
    "budgetUSD": 10000,
    "targetDemographics": "MALE_20-30",
    "targetCPM": 20000,
    "targetCTR": 3.0,
    "details": "AI를 활용한 업무 자동화 툴 리뷰를 위한 전문가 유튜버 매칭. 실무 활용법과 ROI를 강조한 콘텐츠를 원합니다.",
    "summary": "AI를 활용한 업무 자동화 툴 리뷰 및 실무 활용법 소개를 위한 전문가 유튜버 매칭"
  }'::jsonb,
  '2024-01-15 10:30:00+00'
);
```

**n8n 표현식**:
- `s3_key`: `{{ $node["AWS S3"].json.key }}`
- `ai_analysis`: `{{ $node["Set"].json.ai_analysis }}` (원본 JSON + summary 결합된 객체)
- `status`: `pending_approval`

### 4. Flutter 앱에서 표시되는 데이터

**화면**: `home_screen.dart` → `detail_screen.dart`

**StreamBuilder로 받는 데이터**:
```json
{
  "id": "f36d2920-3396-49ef-923f-97faf7cdeff2",
  "s3_key": "campaign-briefs/new/brief-form-1234567890-abc123.json",
  "status": "pending_approval",
  "ai_analysis": {
    "companyName": "기가코퍼레이션",
    "advertiserName": "홍길동",
    "email": "hong@example.com",
    "productName": "AI 노트북 Pro",
    "budgetUSD": 10000,
    "targetDemographics": "MALE_20-30",
    "targetCPM": 20000,
    "targetCTR": 3.0,
    "details": "AI를 활용한 업무 자동화 툴 리뷰를 위한 전문가 유튜버 매칭. 실무 활용법과 ROI를 강조한 콘텐츠를 원합니다.",
    "summary": "AI를 활용한 업무 자동화 툴 리뷰 및 실무 활용법 소개를 위한 전문가 유튜버 매칭"
  },
  "matched_youtubers": null,
  "generated_proposal": null,
  "generated_contract": null,
  "final_contract_s3_key": null,
  "created_at": "2024-01-15T10:30:00Z"
}
```

**Flutter에서의 표시**:
- **회사명/제품명 헤더**: "기가코퍼레이션" / "AI 노트북 Pro"
- **기존 제출 내용 섹션**:
  - 이메일: `hong@example.com`
  - 캠페인 핵심 의도: `ai_analysis['summary']`
  - 캠페인 총 예산 (USD): `ai_analysis['budgetUSD']`
  - 목표 CPM: `ai_analysis['targetCPM']`
  - 목표 CTR (%): `ai_analysis['targetCTR']`
  - 회사명: `ai_analysis['companyName']`
  - 제품/서비스명: `ai_analysis['productName']`
  - 광고주명: `ai_analysis['advertiserName']`
  - 핵심 타겟 인구통계: `ai_analysis['targetDemographics']`

---

## Agent 2: 유튜버 매칭 및 제안서 생성

### 1. Flutter 앱에서 웹훅 호출

**화면**: `detail_screen.dart` → `_triggerN8nAgent` 함수

**HTTP POST 요청**:
```http
POST https://[YOUR_N8N_URL]/webhook/17-2-approve
Content-Type: application/json

{
  "campaign_id": "f36d2920-3396-49ef-923f-97faf7cdeff2"
}
```

**n8n Webhook 노드에서 받는 데이터**:
```json
{
  "body": {
    "campaign_id": "f36d2920-3396-49ef-923f-97faf7cdeff2"
  },
  "headers": { ... },
  "query": { ... }
}
```

### 2. Supabase에서 캠페인 데이터 조회

**n8n 노드**: `Supabase (Get Data)`

**쿼리**:
```sql
SELECT * FROM campaigns 
WHERE id = 'f36d2920-3396-49ef-923f-97faf7cdeff2';
```

**응답 데이터**:
```json
[
  {
    "id": "f36d2920-3396-49ef-923f-97faf7cdeff2",
    "s3_key": "campaign-briefs/new/brief-form-1234567890-abc123.json",
    "status": "pending_approval",
    "ai_analysis": {
      "companyName": "기가코퍼레이션",
      "advertiserName": "홍길동",
      "email": "hong@example.com",
      "productName": "AI 노트북 Pro",
      "budgetUSD": 10000,
      "targetDemographics": "MALE_20-30",
      "targetCPM": 20000,
      "targetCTR": 3.0,
      "summary": "AI를 활용한 업무 자동화 툴 리뷰 및 실무 활용법 소개를 위한 전문가 유튜버 매칭"
    },
    "matched_youtubers": null,
    "generated_proposal": null,
    "generated_contract": null,
    "final_contract_s3_key": null,
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

**n8n 표현식**:
- 캠페인 ID: `{{ $node["Supabase"].json[0].id }}`
- 예산: `{{ $node["Supabase"].json[0].ai_analysis.budgetUSD }}`
- 타겟 인구통계: `{{ $node["Supabase"].json[0].ai_analysis.targetDemographics }}`
- 목표 CPM: `{{ $node["Supabase"].json[0].ai_analysis.targetCPM }}`
- 목표 CTR: `{{ $node["Supabase"].json[0].ai_analysis.targetCTR }}`
- 캠페인 의도: `{{ $node["Supabase"].json[0].ai_analysis.summary }}`

### 3. 정량 필터링 (SQL)

**n8n 노드**: `Supabase (Filter Candidates)`

**테이블**: `youtubers`

**필터 조건**:
```sql
SELECT * FROM youtubers
WHERE cost_per_video_usd <= 10000
  AND main_demographics = 'MALE_20-30'
  AND avg_cpm <= 20000
  AND avg_ctr_percent >= 3.0;
```

**응답 데이터 예시**:
```json
[
  {
    "id": "uuid-elanvital",
    "channel_name": "Elanvital AI",
    "subscriber_count": 150000,
    "cost_per_video_usd": 5000,
    "avg_cpm": 15000,
    "avg_ctr_percent": 3.5,
    "main_demographics": "MALE_20-30",
    "category": "IT",
    "avg_views": 50000,
    "keywords": ["AI", "n8n", "업무자동화"],
    "channel_link": "https://youtube.com/@elanvitalai",
    "tone_and_manner": "professional",
    "created_at": "2024-01-01T00:00:00Z"
  },
  {
    "id": "uuid-techgeek",
    "channel_name": "테크긱(TechGeek)",
    "subscriber_count": 85000,
    "cost_per_video_usd": 3000,
    "avg_cpm": 18000,
    "avg_ctr_percent": 2.8,
    "main_demographics": "MALE_20-30",
    "category": "IT",
    "avg_views": 25000,
    "keywords": ["신제품", "가젯", "리뷰"],
    "channel_link": "https://youtube.com/techgeek",
    "tone_and_manner": "humorous",
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

**n8n 표현식**:
- 후보 ID 목록: `{{ $node["Supabase (Filter Candidates)"].items.map(item => item.id) }}`
  - 결과: `["uuid-elanvital", "uuid-techgeek"]`

### 4. 정성 매칭 (RAG)

**n8n 노드**: `Supabase Vector Store (RAG Search)`

**테이블**: `documents`

**쿼리 텍스트**: `{{ $node["Set"].json.query_text }}`
- 값: `"AI를 활용한 업무 자동화 툴 리뷰 및 실무 활용법 소개를 위한 전문가 유튜버 매칭"`

**Metadata Filter**:
```json
{
  "channel_id": {
    "$in": ["uuid-elanvital", "uuid-techgeek"]
  }
}
```

**응답 데이터 예시**:
```json
[
  {
    "id": 1,
    "content": "AI와 n8n을 활용한 실무 업무 자동화(RPA) 전문가. RAG, LLM 등 최신 AI 기술을 비개발자도 이해하기 쉽게 설명하며, 실제 기업 컨설팅 사례를 바탕으로 한 전문적이고 깊이 있는 튜토리얼을 제공합니다.",
    "metadata": {
      "channel_id": "uuid-elanvital",
      "channel_name": "Elanvital AI"
    },
    "embedding": [0.123, -0.456, ...]  // 1536차원 벡터
  },
  {
    "id": 2,
    "content": "최신 IT 기기, 스마트폰, 노트북, 혁신적인 가젯을 유쾌하고 재치있게 리뷰합니다. 복잡한 기술 용어 대신 실사용자 관점의 장단점을 솔직하게 비교하며, 20-30대 얼리어답터 남성 시청자들에게 인기가 높습니다.",
    "metadata": {
      "channel_id": "uuid-techgeek",
      "channel_name": "테크긱(TechGeek)"
    },
    "embedding": [0.234, -0.567, ...]
  }
]
```

### 5. 유튜버 상세 스펙 조회

**n8n 노드**: `Supabase (Get Full Specs)`

**쿼리**:
```sql
SELECT * FROM youtubers
WHERE id IN ('uuid-elanvital', 'uuid-techgeek');
```

**응답 데이터**:
```json
[
  {
    "id": "uuid-elanvital",
    "channel_name": "Elanvital AI",
    "cost_per_video_usd": 5000,
    "avg_cpm": 15000,
    "avg_ctr_percent": 3.5,
    ...
  },
  {
    "id": "uuid-techgeek",
    "channel_name": "테크긱(TechGeek)",
    "cost_per_video_usd": 3000,
    "avg_cpm": 18000,
    "avg_ctr_percent": 2.8,
    ...
  }
]
```

### 6. 데이터 조합 (Set 노드)

**n8n 노드**: `Set (Combine Data)`

**입력 데이터 조합**:
```json
[
  {
    "channel_name": "Elanvital AI",
    "content": "AI와 n8n을 활용한 실무 업무 자동화(RPA) 전문가. RAG, LLM 등 최신 AI 기술을 비개발자도 이해하기 쉽게 설명하며, 실제 기업 컨설팅 사례를 바탕으로 한 전문적이고 깊이 있는 튜토리얼을 제공합니다.",
    "cost_per_video_usd": 5000,
    "avg_cpm": 15000,
    "avg_ctr_percent": 3.5,
    "target_cpm": 20000,
    "target_ctr": 3.0
  },
  {
    "channel_name": "테크긱(TechGeek)",
    "content": "최신 IT 기기, 스마트폰, 노트북, 혁신적인 가젯을 유쾌하고 재치있게 리뷰합니다. 복잡한 기술 용어 대신 실사용자 관점의 장단점을 솔직하게 비교하며, 20-30대 얼리어답터 남성 시청자들에게 인기가 높습니다.",
    "cost_per_video_usd": 3000,
    "avg_cpm": 18000,
    "avg_ctr_percent": 2.8,
    "target_cpm": 20000,
    "target_ctr": 3.0
  }
]
```

### 7. Summary & Reason 생성 (OpenAI)

**n8n 노드**: `OpenAI (Generate Summary & Reason)`

**입력 프롬프트**: (위 조합 데이터 + 캠페인 정보)

**응답 데이터**:
```json
{
  "choices": [
    {
      "message": {
        "content": "[\n  {\n    \"channel_name\": \"Elanvital AI\",\n    \"content_summary\": \"AI, n8n, 업무 자동화 전문가로, 캠페인 의도와 일치함.\",\n    \"cost_per_video_usd\": 5000,\n    \"avg_cpm\": 15000,\n    \"avg_ctr_percent\": 3.5,\n    \"reason\": \"캠페인의 'AI를 활용한 업무 자동화 툴 리뷰' 의도와 100% 일치하며, 목표 CPM(20000) 및 CTR(3.0)을 완벽히 만족합니다.\"\n  },\n  {\n    \"channel_name\": \"테크긱(TechGeek)\",\n    \"content_summary\": \"최신 IT 기기 리뷰 전문 채널로, 실사용자 관점의 솔직한 리뷰 제공.\",\n    \"cost_per_video_usd\": 3000,\n    \"avg_cpm\": 18000,\n    \"avg_ctr_percent\": 2.8,\n    \"reason\": \"IT 기기 리뷰 전문 채널로, 목표 CPM(20000)을 충족하며, 유머러스한 톤으로 젊은 타겟층에게 효과적입니다.\"\n  }\n]"
      }
    }
  ]
}
```

**파싱된 JSON** (`parseJson` 후):
```json
[
  {
    "channel_name": "Elanvital AI",
    "content_summary": "AI, n8n, 업무 자동화 전문가로, 캠페인 의도와 일치함.",
    "cost_per_video_usd": 5000,
    "avg_cpm": 15000,
    "avg_ctr_percent": 3.5,
    "reason": "캠페인의 'AI를 활용한 업무 자동화 툴 리뷰' 의도와 100% 일치하며, 목표 CPM(20000) 및 CTR(3.0)을 완벽히 만족합니다."
  },
  {
    "channel_name": "테크긱(TechGeek)",
    "content_summary": "최신 IT 기기 리뷰 전문 채널로, 실사용자 관점의 솔직한 리뷰 제공.",
    "cost_per_video_usd": 3000,
    "avg_cpm": 18000,
    "avg_ctr_percent": 2.8,
    "reason": "IT 기기 리뷰 전문 채널로, 목표 CPM(20000)을 충족하며, 유머러스한 톤으로 젊은 타겟층에게 효과적입니다."
  }
]
```

### 8. 제안서 생성 (OpenAI)

**n8n 노드**: `OpenAI (Generate Proposal)`

**입력**: 위 `matched_youtubers` JSON + 캠페인 정보

**응답 데이터**:
```json
{
  "choices": [
    {
      "message": {
        "content": "# 유튜버 협업 제안서\n\n## 캠페인 개요\n- **회사명**: 기가코퍼레이션\n- **제품명**: AI 노트북 Pro\n- **캠페인 총 예산**: $10,000 USD\n\n## 추천 유튜버\n\n### 1. Elanvital AI\n**채널 소개**: AI, n8n, 업무 자동화 전문가로, 캠페인 의도와 일치함.\n\n**성과 지표**:\n- 건당 광고 단가: $5,000 USD\n- 평균 CPM: 15,000원\n- 평균 CTR: 3.5%\n\n**매칭 근거**:\n- **정성적(의미) 부합**: 캠페인의 'AI를 활용한 업무 자동화 툴 리뷰' 의도와 100% 일치하며, 전문적이고 깊이 있는 리뷰 스타일이 제품의 기술적 우수성을 효과적으로 전달할 수 있습니다.\n- **정량적(성과) 근거**: 목표 CPM(20,000원) 및 CTR(3.0%)을 완벽히 만족하며, 평균 CPM 15,000원으로 예산 대비 효율적인 마케팅이 가능합니다.\n\n### 2. 테크긱(TechGeek)\n**채널 소개**: 최신 IT 기기 리뷰 전문 채널로, 실사용자 관점의 솔직한 리뷰 제공.\n\n**성과 지표**:\n- 건당 광고 단가: $3,000 USD\n- 평균 CPM: 18,000원\n- 평균 CTR: 2.8%\n\n**매칭 근거**:\n- **정성적(의미) 부합**: IT 기기 리뷰 전문 채널로, 실사용자 관점의 솔직한 리뷰 스타일이 제품의 실용성을 효과적으로 전달할 수 있습니다.\n- **정량적(성과) 근거**: 목표 CPM(20,000원)을 충족하며, 유머러스한 톤으로 젊은 타겟층에게 효과적입니다.\n\n## 총 예산 배분\n- Elanvital AI: $5,000 USD\n- 테크긱(TechGeek): $3,000 USD\n- **총 예산**: $8,000 USD\n\n## 결론\n위 두 유튜버 모두 캠페인 목표를 달성할 수 있는 우수한 후보입니다."
      }
    }
  ]
}
```

### 9. Supabase DB 저장

**n8n 노드**: `Supabase (Save Proposal)`

**테이블**: `campaigns`

**UPDATE 쿼리**:
```sql
UPDATE campaigns
SET 
  matched_youtubers = '[
    {
      "channel_name": "Elanvital AI",
      "content_summary": "AI, n8n, 업무 자동화 전문가로, 캠페인 의도와 일치함.",
      "cost_per_video_usd": 5000,
      "avg_cpm": 15000,
      "avg_ctr_percent": 3.5,
      "reason": "캠페인의 'AI를 활용한 업무 자동화 툴 리뷰' 의도와 100% 일치하며, 목표 CPM(20000) 및 CTR(3.0)을 완벽히 만족합니다."
    },
    {
      "channel_name": "테크긱(TechGeek)",
      "content_summary": "최신 IT 기기 리뷰 전문 채널로, 실사용자 관점의 솔직한 리뷰 제공.",
      "cost_per_video_usd": 3000,
      "avg_cpm": 18000,
      "avg_ctr_percent": 2.8,
      "reason": "IT 기기 리뷰 전문 채널로, 목표 CPM(20000)을 충족하며, 유머러스한 톤으로 젊은 타겟층에게 효과적입니다."
    }
  ]'::jsonb,
  generated_proposal = '# 유튜버 협업 제안서\n\n## 캠페인 개요\n...',
  status = 'pending_proposal_approval'
WHERE id = 'f36d2920-3396-49ef-923f-97faf7cdeff2';
```

**n8n 표현식**:
- `matched_youtubers`: `{{ $node["OpenAI (Generate Summary & Reason)"].json.choices[0].message.content | parseJson }}`
- `generated_proposal`: `{{ $node["OpenAI (Generate Proposal)"].json.choices[0].message.content }}`
- `status`: `pending_proposal_approval`

### 10. Flutter 앱에서 표시되는 데이터

**StreamBuilder로 받는 업데이트된 데이터**:
```json
{
  "id": "f36d2920-3396-49ef-923f-97faf7cdeff2",
  "s3_key": "campaign-briefs/new/brief-form-1234567890-abc123.json",
  "status": "pending_proposal_approval",
  "ai_analysis": {
    "companyName": "기가코퍼레이션",
    "advertiserName": "홍길동",
    "email": "hong@example.com",
    "productName": "AI 노트북 Pro",
    "budgetUSD": 10000,
    "targetDemographics": "MALE_20-30",
    "targetCPM": 20000,
    "targetCTR": 3.0,
    "details": "AI를 활용한 업무 자동화 툴 리뷰를 위한 전문가 유튜버 매칭. 실무 활용법과 ROI를 강조한 콘텐츠를 원합니다.",
    "summary": "AI를 활용한 업무 자동화 툴 리뷰 및 실무 활용법 소개를 위한 전문가 유튜버 매칭"
  },
  "matched_youtubers": [
    {
      "channel_name": "Elanvital AI",
      "content_summary": "AI, n8n, 업무 자동화 전문가로, 캠페인 의도와 일치함.",
      "cost_per_video_usd": 5000,
      "avg_cpm": 15000,
      "avg_ctr_percent": 3.5,
      "reason": "캠페인의 'AI를 활용한 업무 자동화 툴 리뷰' 의도와 100% 일치하며, 목표 CPM(20000) 및 CTR(3.0)을 완벽히 만족합니다."
    },
    {
      "channel_name": "테크긱(TechGeek)",
      "content_summary": "최신 IT 기기 리뷰 전문 채널로, 실사용자 관점의 솔직한 리뷰 제공.",
      "cost_per_video_usd": 3000,
      "avg_cpm": 18000,
      "avg_ctr_percent": 2.8,
      "reason": "IT 기기 리뷰 전문 채널로, 목표 CPM(20000)을 충족하며, 유머러스한 톤으로 젊은 타겟층에게 효과적입니다."
    }
  ],
  "generated_proposal": "# 유튜버 협업 제안서\n\n## 캠페인 개요\n...",
  "generated_contract": null,
  "final_contract_s3_key": null,
  "created_at": "2024-01-15T10:30:00Z"
}
```

**Flutter에서의 표시**:
- **섹션 1: AI 제안서 내용**
  - 제안서 마크다운: `generated_proposal` 필드를 `MarkdownBody`로 렌더링
  - 매칭된 유튜버 요약 정보: `matched_youtubers` 배열을 카드 형식으로 표시
    - 각 카드: 채널명, `content_summary`, 성과 지표 Chip, `reason` (파란색 박스)
- **섹션 2: 기존 제출 내용**: `ai_analysis` 필드를 Key-Value 레이블 형식으로 표시

---

## Agent 3: 계약서 초안 생성

### 1. Flutter 앱에서 웹훅 호출

**화면**: `detail_screen.dart` → `_triggerN8nAgent` 함수

**HTTP POST 요청**:
```http
POST https://[YOUR_N8N_URL]/webhook/17-3-contract
Content-Type: application/json

{
  "campaign_id": "f36d2920-3396-49ef-923f-97faf7cdeff2"
}
```

### 2. Supabase에서 캠페인 데이터 조회

**n8n 노드**: `Supabase (Get Data)`

**응답 데이터**:
```json
[
  {
    "id": "f36d2920-3396-49ef-923f-97faf7cdeff2",
    "s3_key": "campaign-briefs/new/brief-form-1234567890-abc123.json",
    "status": "pending_proposal_approval",
    "ai_analysis": {
      "companyName": "기가코퍼레이션",
      "advertiserName": "홍길동",
      "email": "hong@example.com",
      "productName": "AI 노트북 Pro",
      "budgetUSD": 10000,
      ...
    },
    "matched_youtubers": [
      {
        "channel_name": "Elanvital AI",
        "cost_per_video_usd": 5000,
        ...
      },
      {
        "channel_name": "테크긱(TechGeek)",
        "cost_per_video_usd": 3000,
        ...
      }
    ],
    "generated_proposal": "# 유튜버 협업 제안서\n\n...",
    "generated_contract": null,
    ...
  }
]
```

### 3. 계약서 생성 (OpenAI)

**n8n 노드**: `OpenAI (Generate Contract)`

**입력**: `ai_analysis` + `matched_youtubers`

**응답 데이터**:
```json
{
  "choices": [
    {
      "message": {
        "content": "# 광고 캠페인 용역 계약서\n\n## 계약 당사자\n\n**갑 (의뢰인)**: 기가코퍼레이션\n**을 (수행인)**: 아래 명시된 유튜버\n\n## 계약 목적\n\n기가코퍼레이션의 'AI 노트북 Pro' 제품에 대한 광고 캠페인을 수행하기 위한 용역 계약입니다.\n\n## 협업 대상 및 용역비\n\n### 1. Elanvital AI\n- **채널명**: Elanvital AI\n- **용역 내용**: AI 노트북 Pro 제품 리뷰 및 실무 활용법 소개 영상 제작\n- **계약 금액**: $5,000 USD\n\n### 2. 테크긱(TechGeek)\n- **채널명**: 테크긱(TechGeek)\n- **용역 내용**: AI 노트북 Pro 제품 리뷰 및 실사용자 관점 평가 영상 제작\n- **계약 금액**: $3,000 USD\n\n## 총 계약 금액\n\n**합계**: $8,000 USD\n\n## 계약 기간\n\n- 계약 체결일로부터 30일 이내 영상 제작 및 게시 완료\n\n## 비밀 유지 조항\n\n계약 기간 중 및 계약 종료 후에도 계약서에 명시된 정보를 제3자에게 공개하지 않아야 합니다.\n\n## 기타\n\n- 계약서에 명시되지 않은 사항은 상호 협의하여 결정합니다.\n- 분쟁 발생 시 관련 법령에 따라 해결합니다.\n"
      }
    }
  ]
}
```

### 4. Supabase DB 저장

**n8n 노드**: `Supabase (Save Contract Draft)`

**UPDATE 쿼리**:
```sql
UPDATE campaigns
SET 
  generated_contract = '# 광고 캠페인 용역 계약서\n\n## 계약 당사자\n\n**갑 (의뢰인)**: 기가코퍼레이션\n...'
WHERE id = 'f36d2920-3396-49ef-923f-97faf7cdeff2';
```

**n8n 표현식**:
- `generated_contract`: `{{ $node["OpenAI"].json.choices[0].message.content }}`

### 5. 마무리 워크플로우 트리거

**n8n 노드**: `Execute Workflow`

**전달 파라미터**:
```json
{
  "campaign_id": "f36d2920-3396-49ef-923f-97faf7cdeff2"
}
```

---

## 마무리 워크플로우: PDF 변환 및 최종 보고

### 1. 워크플로우 트리거

**n8n 노드**: `Execute Workflow (Trigger)`

**받는 파라미터**:
```json
{
  "campaign_id": "f36d2920-3396-49ef-923f-97faf7cdeff2"
}
```

### 2. Supabase에서 계약서 데이터 조회

**n8n 노드**: `Supabase (Get Data)`

**쿼리**:
```sql
SELECT generated_contract, id FROM campaigns 
WHERE id = 'f36d2920-3396-49ef-923f-97faf7cdeff2';
```

**응답 데이터**:
```json
[
  {
    "id": "f36d2920-3396-49ef-923f-97faf7cdeff2",
    "generated_contract": "# 광고 캠페인 용역 계약서\n\n## 계약 당사자\n\n**갑 (의뢰인)**: 기가코퍼레이션\n..."
  }
]
```

### 3. PDF 백엔드 호출 준비

**n8n 노드**: `Set (Format for PDF Backend)`

**포맷팅된 데이터**:
```json
{
  "markdownContent": "# 광고 캠페인 용역 계약서\n\n## 계약 당사자\n\n**갑 (의뢰인)**: 기가코퍼레이션\n..."
}
```

### 4. PDF 백엔드 호출

**n8n 노드**: `HTTP Request (Call PDF Backend)`

**요청**:
```http
POST https://[PDF_BACKEND_URL]/generate
Content-Type: application/json

{
  "markdownContent": "# 광고 캠페인 용역 계약서\n\n..."
}
```

**응답**:
```json
{
  "bucket": "my-bucket-name",
  "key": "reports/contract-f36d2920-3396-49ef-923f-97faf7cdeff2.pdf"
}
```

### 5. Supabase DB 업데이트

**n8n 노드**: `Supabase (Update State)`

**UPDATE 쿼리**:
```sql
UPDATE campaigns
SET 
  status = 'completed',
  final_contract_s3_key = 'reports/contract-f36d2920-3396-49ef-923f-97faf7cdeff2.pdf'
WHERE id = 'f36d2920-3396-49ef-923f-97faf7cdeff2';
```

**n8n 표현식**:
- `status`: `completed`
- `final_contract_s3_key`: `{{ $node["HTTP Request"].json.key }}`

### 6. S3 Pre-signed URL 생성

**n8n 노드**: `AWS S3 (Create Pre-signed URL)`

**요청**:
- Bucket: `my-bucket-name`
- Key: `reports/contract-f36d2920-3396-49ef-923f-97faf7cdeff2.pdf`
- Expiration: 15분

**응답**:
```json
{
  "url": "https://my-bucket-name.s3.ap-northeast-2.amazonaws.com/reports/contract-f36d2920-3396-49ef-923f-97faf7cdeff2.pdf?X-Amz-Algorithm=...&X-Amz-Expires=900&..."
}
```

### 7. Flutter 앱에서 표시되는 최종 데이터

**StreamBuilder로 받는 업데이트된 데이터**:
```json
{
  "id": "f36d2920-3396-49ef-923f-97faf7cdeff2",
  "s3_key": "campaign-briefs/new/brief-form-1234567890-abc123.json",
  "status": "completed",
  "ai_analysis": { ... },
  "matched_youtubers": [ ... ],
  "generated_proposal": "# 유튜버 협업 제안서\n\n...",
  "generated_contract": "# 광고 캠페인 용역 계약서\n\n...",
  "final_contract_s3_key": "reports/contract-f36d2920-3396-49ef-923f-97faf7cdeff2.pdf",
  "created_at": "2024-01-15T10:30:00Z"
}
```

**Flutter에서의 표시**:
- `home_screen.dart`: "완료" 섹션에 표시
- `detail_screen.dart`: 버튼이 "🎉 작업 완료"로 비활성화

---

## 📝 주요 n8n 표현식 참고

### Supabase 데이터 접근

```javascript
// 단일 레코드 조회 시
{{ $node["Supabase"].json[0].id }}
{{ $node["Supabase"].json[0].ai_analysis.companyName }}
{{ $node["Supabase"].json[0].ai_analysis.budgetUSD }}

// 배열 필드 접근
{{ $node["Supabase"].json[0].matched_youtubers[0].channel_name }}
{{ $node["Supabase"].json[0].matched_youtubers[0].cost_per_video_usd }}
```

### JSON 파싱

```javascript
// OpenAI 응답 파싱
{{ $node["OpenAI"].json.choices[0].message.content | parseJson }}

// 직접 JSON 문자열 파싱
{{ $json.someField | parseJson }}
```

### 배열 조작

```javascript
// 배열에서 ID 추출
{{ $node["Supabase"].items.map(item => item.id) }}

// 배열 필터링
{{ $json.items.filter(item => item.status === 'active') }}
```

### 조건부 처리

```javascript
// IF 노드에서 사용
{{ $items.length > 0 }}

// null 체크
{{ $json.field != null ? $json.field : 'default' }}
```

---

## 🔍 디버깅 팁

1. **Supabase 데이터 확인**: 각 Agent 실행 전후로 `campaigns` 테이블의 데이터를 확인하세요.
2. **JSON 형식 검증**: OpenAI 응답이 올바른 JSON 형식인지 확인하세요.
3. **필드 경로 확인**: n8n 표현식에서 필드 경로가 정확한지 확인하세요 (배열 인덱스, 중첩 객체 등).
4. **Flutter 실시간 업데이트**: Supabase Realtime이 활성화되어 있는지 확인하세요.

---

## 📚 관련 문서

- [PRD.md](./PRD.md) - Flutter 앱 UI/UX 명세
- [16차시 학습노트.md](./16차시%20학습노트.md) - 인프라 및 DB 스키마
- [17차시 학습노트.md](./17차시%20학습노트.md) - n8n Agent 구현 가이드
