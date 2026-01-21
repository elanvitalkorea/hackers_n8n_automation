#!/usr/bin/env node

/**
 * 캠페인 브리프와 유튜버 데이터 간 매칭 분석 스크립트
 * 각 브리프가 유튜버 데이터와 매칭되는지 확인하고, 매칭되지 않는 경우 조정 방안 제시
 */

import { readFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { youtubers } from '../docs/dbsetup/esm_dataset_100.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')
const BRIEFS_DIR = join(projectRoot, 'docs', 'campaign_briefs_15')

/**
 * Markdown 파일을 파싱하여 JSON 객체로 변환
 */
function parseBriefFile(filePath) {
  const content = readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')
  
  let companyName = ''
  let advertiserName = ''
  let email = ''
  let productName = ''
  let budgetUsd = 0
  let targetDemographics = ''
  let targetCpm = 0
  let targetCtr = 0
  let details = ''
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    
    if (line.includes('**회사명:**')) {
      companyName = line.split('**회사명:**')[1].trim()
    } else if (line.includes('**담당자명:**')) {
      advertiserName = line.split('**담당자명:**')[1].trim()
    } else if (line.includes('**이메일:**')) {
      email = line.split('**이메일:**')[1].trim()
    } else if (line.includes('**제품/서비스:**')) {
      productName = line.split('**제품/서비스:**')[1].trim()
    } else if (line.includes('**캠페인 총 예산 (USD):**')) {
      budgetUsd = parseInt(line.split('**캠페인 총 예산 (USD):**')[1].trim(), 10)
    } else if (line.includes('**핵심 타겟 인구통계:**')) {
      targetDemographics = line.split('**핵심 타겟 인구통계:**')[1].trim()
    } else if (line.includes('**목표 CPM (이하):**')) {
      targetCpm = parseInt(line.split('**목표 CPM (이하):**')[1].trim(), 10)
    } else if (line.includes('**목표 CTR (이상):**')) {
      targetCtr = parseFloat(line.split('**목표 CTR (이상):**')[1].trim())
    } else if (line.includes('**상세 내용:**')) {
      details = line.split('**상세 내용:**')[1].trim()
    }
  }
  
  return {
    companyName,
    advertiserName,
    email,
    productName,
    budgetUSD: budgetUsd,
    targetDemographics,
    targetCPM: targetCpm || null,
    targetCTR: targetCtr || null,
    details
  }
}

/**
 * 유튜버가 브리프 조건을 만족하는지 확인
 */
function matchesBrief(youtuber, brief) {
  // 1. 예산 체크
  if (youtuber.cost_per_video_usd > brief.budgetUSD) {
    return { match: false, reason: `예산 초과: ${youtuber.cost_per_video_usd} > ${brief.budgetUSD}` }
  }
  
  // 2. 인구통계 체크
  if (youtuber.main_demographics !== brief.targetDemographics) {
    return { match: false, reason: `인구통계 불일치: ${youtuber.main_demographics} !== ${brief.targetDemographics}` }
  }
  
  // 3. CPM 체크 (targetCPM이 있는 경우)
  if (brief.targetCPM !== null && youtuber.avg_cpm > brief.targetCPM) {
    return { match: false, reason: `CPM 초과: ${youtuber.avg_cpm} > ${brief.targetCPM}` }
  }
  
  // 4. CTR 체크 (targetCTR이 있는 경우)
  if (brief.targetCTR !== null && youtuber.avg_ctr_percent < brief.targetCTR) {
    return { match: false, reason: `CTR 미달: ${youtuber.avg_ctr_percent} < ${brief.targetCTR}` }
  }
  
  return { match: true }
}

/**
 * 브리프에 매칭되는 유튜버 찾기
 */
function findMatchingYoutubers(brief) {
  return youtubers.filter(youtuber => {
    const result = matchesBrief(youtuber, brief)
    return result.match
  })
}

/**
 * 매칭되지 않는 브리프의 조정 방안 제시
 */
function suggestAdjustments(brief, matchingCount) {
  const suggestions = []
  
  if (matchingCount === 0) {
    // 인구통계별 유튜버 찾기
    const demoSpecific = youtubers.filter(y => y.main_demographics === brief.targetDemographics)
    
    if (demoSpecific.length === 0) {
      suggestions.push(`⚠️ 인구통계 ${brief.targetDemographics}에 해당하는 유튜버가 없습니다.`)
    } else {
      // 예산 문제 확인
      const affordable = demoSpecific.filter(y => y.cost_per_video_usd <= brief.budgetUSD)
      if (affordable.length === 0) {
        const minCost = Math.min(...demoSpecific.map(y => y.cost_per_video_usd))
        suggestions.push(`💰 예산 부족: 최소 단가 ${minCost} USD 필요 (현재: ${brief.budgetUSD} USD)`)
        suggestions.push(`   → 예산을 ${minCost} USD 이상으로 조정하거나, 유튜버 단가를 낮춰야 합니다.`)
      }
      
      // CPM 문제 확인
      if (brief.targetCPM !== null) {
        const cpmOk = affordable.filter(y => y.avg_cpm <= brief.targetCPM)
        if (cpmOk.length === 0 && affordable.length > 0) {
          const maxCpm = Math.max(...affordable.map(y => y.avg_cpm))
          suggestions.push(`📊 CPM 목표 너무 낮음: 최소 ${maxCpm} 필요 (현재 목표: ${brief.targetCPM})`)
          suggestions.push(`   → 목표 CPM을 ${maxCpm} 이상으로 조정하거나, 유튜버 CPM을 낮춰야 합니다.`)
        }
      }
      
      // CTR 문제 확인
      if (brief.targetCTR !== null) {
        const ctrOk = affordable.filter(y => y.avg_ctr_percent >= brief.targetCTR)
        if (ctrOk.length === 0 && affordable.length > 0) {
          const maxCtr = Math.max(...affordable.map(y => y.avg_ctr_percent))
          suggestions.push(`📈 CTR 목표 너무 높음: 최대 ${maxCtr} 가능 (현재 목표: ${brief.targetCTR})`)
          suggestions.push(`   → 목표 CTR을 ${maxCtr} 이하로 조정하거나, 유튜버 CTR을 높여야 합니다.`)
        }
      }
    }
  }
  
  return suggestions
}

async function main() {
  console.log('🔍 캠페인 브리프와 유튜버 데이터 매칭 분석 시작...\n')
  
  // 모든 브리프 파일 읽기
  const briefFiles = readdirSync(BRIEFS_DIR)
    .filter(file => file.endsWith('.md'))
    .sort()
  
  const briefs = briefFiles.map(file => {
    const filePath = join(BRIEFS_DIR, file)
    const brief = parseBriefFile(filePath)
    return { filename: file, ...brief }
  })
  
  console.log(`📋 총 ${briefs.length}개의 브리프 분석 중...\n`)
  
  let totalMatching = 0
  let totalNoMatch = 0
  
  // 각 브리프 분석
  for (const brief of briefs) {
    const matching = findMatchingYoutubers(brief)
    const count = matching.length
    
    if (count > 0) {
      totalMatching++
      console.log(`✅ ${brief.filename}`)
      console.log(`   매칭된 유튜버: ${count}명`)
      console.log(`   조건: 예산 ${brief.budgetUSD} USD, 인구통계 ${brief.targetDemographics}, CPM ≤ ${brief.targetCPM || 'N/A'}, CTR ≥ ${brief.targetCTR || 'N/A'}`)
      if (count <= 3) {
        console.log(`   매칭 유튜버: ${matching.map(y => y.channel_name).join(', ')}`)
      }
      console.log('')
    } else {
      totalNoMatch++
      console.log(`❌ ${brief.filename}`)
      console.log(`   매칭된 유튜버: 0명`)
      console.log(`   조건: 예산 ${brief.budgetUSD} USD, 인구통계 ${brief.targetDemographics}, CPM ≤ ${brief.targetCPM || 'N/A'}, CTR ≥ ${brief.targetCTR || 'N/A'}`)
      
      const suggestions = suggestAdjustments(brief, 0)
      if (suggestions.length > 0) {
        console.log(`   조정 방안:`)
        suggestions.forEach(s => console.log(`   ${s}`))
      }
      console.log('')
    }
  }
  
  // 요약
  console.log('='.repeat(80))
  console.log('📊 분석 요약')
  console.log('='.repeat(80))
  console.log(`총 브리프 수: ${briefs.length}`)
  console.log(`✅ 매칭 성공: ${totalMatching}개`)
  console.log(`❌ 매칭 실패: ${totalNoMatch}개`)
  console.log('')
  
  if (totalNoMatch > 0) {
    console.log('💡 조정이 필요한 브리프:')
    briefs.forEach(brief => {
      const matching = findMatchingYoutubers(brief)
      if (matching.length === 0) {
        console.log(`   - ${brief.filename}: ${brief.companyName} - ${brief.productName}`)
      }
    })
  }
}

main().catch(console.error)

