#!/usr/bin/env node

/**
 * Supabase campaigns 테이블에 합성 데이터를 생성하는 스크립트
 * 다양한 상태의 캠페인을 생성하여 Flutter 앱 테스트에 사용
 * 
 * 사용법:
 *   node scripts/generate_campaigns.mjs          # 기본 5개 생성
 *   node scripts/generate_campaigns.mjs --count 10  # 10개 생성
 *   node scripts/generate_campaigns.mjs --wipe   # 기존 데이터 삭제 후 생성
 */

import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import 'dotenv/config';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing env: SUPABASE_URL / SUPABASE_SERVICE_KEY');
  console.error('   .env.local 파일에 Supabase 설정을 추가하세요.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// 명령줄 인자 파싱
const args = process.argv.slice(2);
const COUNT = parseInt(args.find(arg => arg.startsWith('--count='))?.split('=')[1] || '5');
const WIPE = args.includes('--wipe') || args.includes('-w');

// 합성 데이터 템플릿
const campaignTemplates = [
  {
    status: 'pending',
    s3_key: `campaign-briefs/new/brief-form-${Date.now()}-${uuidv4()}.json`,
    ai_analysis: null,
    matched_youtubers: null,
    generated_proposal: null,
    generated_contract: null,
  },
  {
    status: 'pending_approval',
    s3_key: `campaign-briefs/new/brief-form-${Date.now() - 3600000}-${uuidv4()}.json`,
    ai_analysis: {
      companyName: '테크스타트업',
      advertiserName: '김개발',
      email: 'dev@techstartup.com',
      productName: 'AI 코딩 어시스턴트',
      budgetUSD: 50000,
      targetDemographics: 'MALE_20-30',
      targetCPM: 20000,
      targetCTR: 3.0,
      summary: 'AI 코딩 어시스턴트 제품을 개발자 커뮤니티에 홍보하기 위한 캠페인입니다. 기술에 관심이 많은 20-30대 남성 개발자들을 타겟으로 합니다.'
    },
    matched_youtubers: null,
    generated_proposal: null,
    generated_contract: null,
  },
  {
    status: 'pending_proposal_approval',
    s3_key: `campaign-briefs/new/brief-form-${Date.now() - 7200000}-${uuidv4()}.json`,
    ai_analysis: {
      companyName: '뷰티브랜드',
      advertiserName: '이뷰티',
      email: 'beauty@brand.com',
      productName: '쿠션 파운데이션',
      budgetUSD: 30000,
      targetDemographics: 'FEMALE_20-30',
      targetCPM: 25000,
      targetCTR: 4.0,
      summary: '쿠션 파운데이션 신제품 런칭 캠페인입니다. 20-30대 여성 소비자들에게 제품의 자연스러운 커버력과 지속력을 강조합니다.'
    },
    matched_youtubers: {
      channel_name: 'Beauty02 뷰티',
      content_summary: '뷰티 제품 리뷰와 메이크업 튜토리얼을 제공하는 채널',
      original_cost_per_video_usd: 1450,
      cost_per_video_usd: 30000, // Agent 2가 총 예산으로 덮어쓴 값
      avg_cpm: 24188,
      avg_ctr_percent: 4.19,
      similarity: 0.8750,
      reason: '정성적 부합: 뷰티 제품 전문 채널로 타겟 고객층과 완벽히 일치합니다(유사도: 0.875). 정량적 근거: 목표 CPM 25000 이하, CTR 4.0 이상을 모두 만족합니다.'
    },
    generated_proposal: `# 유튜버 협업 제안서
뷰티브랜드 – *쿠션 파운데이션 런칭 캠페인*

---

## 1. 제안 개요

본 제안서는 뷰티브랜드의 신규 쿠션 파운데이션 초기 인지도 확보를 목표로, 데이터 기반으로 정성적 적합도, 정량 성과 지표, AI 콘텐츠 유사도를 종합 평가하여 최적의 유튜버를 추천합니다.

---

## 2. 예산 요약 (USD)

  * 총 예산: 30000
  * **권장 집행안 (최종 선정)**
      * Beauty02 뷰티: **30000**
      - 잔여 예산: **0**

---

## 3. (중요) 후보 상세 분석

### 3.1 Beauty02 뷰티

**비용: 1450 USD**
**평균 CPM: 24188**
**평균 CTR: 4.19%**
**콘텐츠 유사도: 0.875**

#### 추천 이유

정성적 부합: 뷰티 제품 전문 채널로 타겟 고객층과 완벽히 일치합니다(유사도: 0.875). 정량적 근거: 목표 CPM 25000 이하, CTR 4.0 이상을 모두 만족합니다.

### 3.2 Palette26 뷰티

**비용: 5050 USD**
**평균 CPM: 24800**
**평균 CTR: 4.15%**
**콘텐츠 유사도: 0.823**

#### 추천 이유

뷰티 전문 채널로 타겟 고객층과 일치하며(유사도: 0.823), 목표 CPM과 CTR을 만족합니다.

---

## 4. 최종 추천 전략 및 사유

Palette26 뷰티 대비 Beauty02 뷰티가 예산 효율성($1,450 vs $5,050)과 AI 유사도(0.875 vs 0.823)에서 우수하여 최종 선정했습니다. 따라서 가장 적합한 Beauty02 뷰티에게 총 예산 30,000 USD를 모두 배정하여 캠페인 성과를 극대화하는 것을 제안합니다.

## 5. 결론

상기 분석(콘텐츠 적합도, 성과 지표, AI 유사도)을 바탕으로, 쿠션 파운데이션 캠페인의 초기 성과 확보에 **Beauty02 뷰티** 이(가) 가장 적합하다고 판단하여 최종 추천합니다.`,
    generated_contract: null,
  },
  {
    status: 'completed',
    s3_key: `campaign-briefs/new/brief-form-${Date.now() - 10800000}-${uuidv4()}.json`,
    ai_analysis: {
      companyName: '게임스튜디오',
      advertiserName: '박게임',
      email: 'game@studio.com',
      productName: '모바일 RPG 게임',
      budgetUSD: 100000,
      targetDemographics: 'MALE_10-20',
      targetCPM: 15000,
      targetCTR: 2.5,
      summary: '신규 모바일 RPG 게임 런칭 캠페인입니다. 게임에 관심이 많은 10-20대 남성 유저들을 타겟으로 합니다.'
    },
    matched_youtubers: {
      channel_name: 'Boss03 게임',
      content_summary: '게임 리뷰와 공략 영상을 제공하는 대형 게임 채널',
      original_cost_per_video_usd: 14500,
      cost_per_video_usd: 100000, // Agent 2가 총 예산으로 덮어쓴 값
      avg_cpm: 18114,
      avg_ctr_percent: 2.09,
      similarity: 0.9123,
      reason: '정성적 부합: 대형 게임 채널로 타겟 유저층과 완벽히 일치합니다(유사도: 0.912). 정량적 근거: 목표 CPM과 CTR을 모두 만족합니다.'
    },
    generated_proposal: `# 유튜버 협업 제안서
게임스튜디오 – *모바일 RPG 게임 런칭 캠페인*

---

## 1. 제안 개요

본 제안서는 게임스튜디오의 신규 모바일 RPG 게임 초기 인지도 확보를 목표로, 데이터 기반으로 정성적 적합도, 정량 성과 지표, AI 콘텐츠 유사도를 종합 평가하여 최적의 유튜버를 추천합니다.

---

## 2. 예산 요약 (USD)

  * 총 예산: 100000
  * **권장 집행안 (최종 선정)**
      * Boss03 게임: **100000**
      - 잔여 예산: **0**

---

## 3. (중요) 후보 상세 분석

### 3.1 Boss03 게임

**비용: 14500 USD**
**평균 CPM: 18114**
**평균 CTR: 2.09%**
**콘텐츠 유사도: 0.912**

#### 추천 이유

정성적 부합: 대형 게임 채널로 타겟 유저층과 완벽히 일치합니다(유사도: 0.912). 정량적 근거: 목표 CPM과 CTR을 모두 만족합니다.

---

## 5. 결론

상기 분석(콘텐츠 적합도, 성과 지표, AI 유사도)을 바탕으로, 모바일 RPG 게임 캠페인의 초기 성과 확보에 **Boss03 게임** 이(가) 가장 적합하다고 판단하여 최종 추천합니다.`,
    generated_contract: `# 광고 용역 계약서

**갑**: 게임스튜디오
**을**: Boss03 게임

## 계약 내용
- **계약 금액**: $100,000 USD
- **제작 비디오 수**: 5개
- **비디오당 단가**: $20,000 USD

## 계약 기간
2024년 1월 1일 ~ 2024년 1월 31일`,
    final_contract_s3_key: `campaign-briefs/contracts/contract-${uuidv4()}.pdf`,
  },
  {
    status: 'pending_approval',
    s3_key: `campaign-briefs/new/brief-form-${Date.now() - 1800000}-${uuidv4()}.json`,
    ai_analysis: {
      companyName: '패션브랜드',
      advertiserName: '최스타일',
      email: 'style@fashion.com',
      productName: '스니커즈 컬렉션',
      budgetUSD: 25000,
      targetDemographics: 'FEMALE_20-30',
      targetCPM: 20000,
      targetCTR: 3.5,
      summary: '스니커즈 신제품 컬렉션 홍보 캠페인입니다. 패션에 관심이 많은 20-30대 여성을 타겟으로 합니다.'
    },
    matched_youtubers: null,
    generated_proposal: null,
    generated_contract: null,
  },
];

async function wipeCampaigns() {
  console.log('🗑️  Wiping existing campaigns...');
  
  const { count } = await supabase
    .from('campaigns')
    .select('*', { count: 'exact', head: true });
  
  if (count === 0) {
    console.log('   No campaigns to delete');
    return;
  }

  const { error } = await supabase
    .from('campaigns')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');

  if (error) {
    throw new Error(`Failed to delete campaigns: ${error.message}`);
  }

  console.log(`✅ Deleted ${count} campaigns`);
}

async function generateCampaigns(count) {
  console.log(`\n🔄 Generating ${count} campaigns...\n`);

  const campaigns = [];
  for (let i = 0; i < count; i++) {
    const template = campaignTemplates[i % campaignTemplates.length];
    const timestamp = Date.now() - (i * 600000); // 각각 10분씩 차이
    
    campaigns.push({
      s3_key: template.s3_key.replace(/brief-form-\d+/, `brief-form-${timestamp}`),
      status: template.status,
      ai_analysis: template.ai_analysis,
      matched_youtubers: template.matched_youtubers,
      generated_proposal: template.generated_proposal,
      generated_contract: template.generated_contract,
      final_contract_s3_key: template.final_contract_s3_key,
    });
  }

  const { data, error } = await supabase
    .from('campaigns')
    .insert(campaigns)
    .select();

  if (error) {
    throw new Error(`Failed to insert campaigns: ${error.message}`);
  }

  console.log(`✅ Successfully inserted ${data.length} campaigns:\n`);
  
  data.forEach((campaign, idx) => {
    console.log(`${idx + 1}. ${campaign.status.padEnd(25)} | ${campaign.s3_key}`);
  });

  return data.length;
}

async function main() {
  try {
    if (WIPE) {
      await wipeCampaigns();
    }

    const inserted = await generateCampaigns(COUNT);

    console.log(`\n🎉 Done! Generated ${inserted} campaigns.`);
    console.log('\n💡 Tips:');
    console.log('   - Flutter 앱에서 실시간 업데이트를 확인하세요');
    console.log('   - 다양한 status 값을 테스트할 수 있습니다');
    console.log('   - --wipe 옵션으로 기존 데이터를 삭제할 수 있습니다\n');
  } catch (error) {
    console.error('\n❌ Failed:', error.message);
    process.exit(1);
  }
}

main();

