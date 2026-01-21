#!/usr/bin/env node

/**
 * 캠페인 브리프와 유튜버 매칭 상세 리포트 생성 스크립트
 */

import { readFileSync, readdirSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { youtubers } from '../docs/dbsetup/esm_dataset_100.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')
const BRIEFS_DIR = join(projectRoot, 'docs', 'campaign_briefs_15')

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

function matchesBrief(youtuber, brief) {
  if (youtuber.cost_per_video_usd > brief.budgetUSD) return false
  if (youtuber.main_demographics !== brief.targetDemographics) return false
  if (brief.targetCPM !== null && youtuber.avg_cpm > brief.targetCPM) return false
  if (brief.targetCTR !== null && youtuber.avg_ctr_percent < brief.targetCTR) return false
  return true
}

function findMatchingYoutubers(brief) {
  return youtubers.filter(youtuber => matchesBrief(youtuber, brief))
}

async function main() {
  const briefFiles = readdirSync(BRIEFS_DIR)
    .filter(file => file.endsWith('.md'))
    .sort()
  
  const briefs = briefFiles.map(file => {
    const filePath = join(BRIEFS_DIR, file)
    const brief = parseBriefFile(filePath)
    return { filename: file, ...brief }
  })
  
  let report = '# 캠페인 브리프 - 유튜버 매칭 리포트\n\n'
  report += `생성일: ${new Date().toLocaleString('ko-KR')}\n\n`
  report += `총 브리프 수: ${briefs.length}개\n`
  report += `유튜버 데이터셋: ${youtubers.length}명\n\n`
  report += '---\n\n'
  
  let totalMatching = 0
  
  for (const brief of briefs) {
    const matching = findMatchingYoutubers(brief)
    const count = matching.length
    totalMatching += count > 0 ? 1 : 0
    
    report += `## ${brief.filename}\n\n`
    report += `**회사명:** ${brief.companyName}\n\n`
    report += `**제품/서비스:** ${brief.productName}\n\n`
    report += `**캠페인 조건:**\n`
    report += `- 예산: ${brief.budgetUSD} USD\n`
    report += `- 타겟 인구통계: ${brief.targetDemographics}\n`
    report += `- 목표 CPM: ≤ ${brief.targetCPM || 'N/A'}\n`
    report += `- 목표 CTR: ≥ ${brief.targetCTR || 'N/A'}\n\n`
    
    if (count > 0) {
      report += `✅ **매칭된 유튜버: ${count}명**\n\n`
      report += '| 채널명 | 단가 (USD) | CPM | CTR (%) | 카테고리 |\n'
      report += '|--------|-----------|-----|---------|----------|\n'
      
      matching.forEach(y => {
        report += `| ${y.channel_name} | ${y.cost_per_video_usd} | ${y.avg_cpm} | ${y.avg_ctr_percent} | ${y.category} |\n`
      })
    } else {
      report += `❌ **매칭된 유튜버: 0명**\n\n`
    }
    
    report += '\n---\n\n'
  }
  
  report += `## 요약\n\n`
  report += `- 총 브리프 수: ${briefs.length}개\n`
  report += `- 매칭 성공: ${totalMatching}개\n`
  report += `- 매칭 실패: ${briefs.length - totalMatching}개\n`
  report += `- 매칭 성공률: ${((totalMatching / briefs.length) * 100).toFixed(1)}%\n`
  
  const reportPath = join(projectRoot, 'docs', 'MATCHING_REPORT.md')
  writeFileSync(reportPath, report, 'utf-8')
  
  console.log('✅ 매칭 리포트 생성 완료!')
  console.log(`📄 리포트 위치: ${reportPath}`)
  console.log(`\n📊 요약:`)
  console.log(`   총 브리프: ${briefs.length}개`)
  console.log(`   매칭 성공: ${totalMatching}개`)
  console.log(`   매칭 실패: ${briefs.length - totalMatching}개`)
}

main().catch(console.error)

