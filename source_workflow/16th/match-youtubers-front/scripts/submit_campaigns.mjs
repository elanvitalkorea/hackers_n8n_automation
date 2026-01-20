#!/usr/bin/env node

/**
 * campaign_briefs_15 폴더의 모든 브리프를 파싱하여 API로 제출하는 스크립트
 * Markdown 파일을 읽어서 JSON으로 변환하여 API에 제출 (API가 JSON 파일로 S3에 저장)
 * 사용법: 
 *   node scripts/submit_campaigns.mjs                    # 모든 미제출 파일 제출 (기본 포트 3000)
 *   node scripts/submit_campaigns.mjs --port=3001        # 포트 3001로 제출
 *   node scripts/submit_campaigns.mjs -p 3001            # 포트 3001로 제출 (짧은 형식)
 *   node scripts/submit_campaigns.mjs --one               # 1개만 제출 (pop 방식)
 *   node scripts/submit_campaigns.mjs --one --port=3001  # 포트 3001로 1개만 제출
 *   node scripts/submit_campaigns.mjs --reset             # 제출 이력 초기화
 * 
 * 환경 변수:
 *   API_URL: 전체 API URL 지정 (예: API_URL=http://localhost:3001/api/brief)
 *   PORT: 포트 번호 지정 (예: PORT=3001)
 */

import { readFileSync, readdirSync, writeFileSync, unlinkSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')

const BRIEFS_DIR = join(projectRoot, 'docs', 'campaign_briefs_15')
const STATE_FILE = join(projectRoot, '.submitted_briefs.json')

// 명령줄 인자 파싱
const args = process.argv.slice(2)
const ONE_MODE = args.includes('--one') || args.includes('-1')
const RESET_MODE = args.includes('--reset') || args.includes('-r')

// 포트 번호 파싱 (--port=3001 또는 -p 3001)
let port = 3000
const portArg = args.find(arg => arg.startsWith('--port='))
if (portArg) {
  port = parseInt(portArg.split('=')[1], 10)
} else {
  const portIndex = args.indexOf('-p')
  if (portIndex !== -1 && args[portIndex + 1]) {
    port = parseInt(args[portIndex + 1], 10)
  }
}

// 환경 변수에서 포트를 가져올 수도 있음
if (process.env.PORT) {
  port = parseInt(process.env.PORT, 10)
}

// API_URL 구성 (환경 변수 또는 포트 기반)
const API_URL = process.env.API_URL || `http://localhost:${port}/api/brief`

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
  
  // 각 줄을 순회하며 파싱
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim()
    
    // 마크다운 리스트 형식 제거 (- 또는 * 제거)
    line = line.replace(/^[-*]\s+/, '')
    
    if (line.includes('**회사명:**')) {
      companyName = line.split('**회사명:**')[1].trim()
    } else if (line.includes('**담당자명:**')) {
      advertiserName = line.split('**담당자명:**')[1].trim()
    } else if (line.includes('**이메일:**')) {
      email = line.split('**이메일:**')[1].trim()
    } else if (line.includes('**제품/서비스:**')) {
      productName = line.split('**제품/서비스:**')[1].trim()
    } else if (line.includes('**캠페인 총 예산 (USD):**')) {
      const budgetStr = line.split('**캠페인 총 예산 (USD):**')[1].trim()
      budgetUsd = parseInt(budgetStr, 10) || 0
    } else if (line.includes('**핵심 타겟 인구통계:**')) {
      targetDemographics = line.split('**핵심 타겟 인구통계:**')[1].trim()
    } else if (line.includes('**목표 CPM (이하):**')) {
      const cpmStr = line.split('**목표 CPM (이하):**')[1].trim()
      targetCpm = parseInt(cpmStr, 10) || 0
    } else if (line.includes('**목표 CTR (이상):**')) {
      const ctrStr = line.split('**목표 CTR (이상):**')[1].trim()
      targetCtr = parseFloat(ctrStr) || 0
    } else if (line.includes('**상세 내용:**')) {
      details = line.split('**상세 내용:**')[1].trim()
    }
  }
  
  // 필수 필드 검증
  if (!companyName || !advertiserName || !email || !productName || !budgetUsd || budgetUsd <= 0 || !targetDemographics || !details) {
    throw new Error(`Failed to parse required fields in: ${filePath}\n  Parsed: companyName=${companyName}, advertiserName=${advertiserName}, email=${email}, productName=${productName}, budgetUsd=${budgetUsd}, targetDemographics=${targetDemographics}, details=${details ? 'present' : 'missing'}`)
  }
  
  // API가 기대하는 형식으로 변환 (camelCase, 문자열)
  return {
    advertiserName,
    companyEmail: email, // API는 companyEmail을 기대
    companyName,
    productName,
    budgetUsd: String(budgetUsd), // API는 문자열을 기대
    targetCpm: targetCpm > 0 ? String(targetCpm) : '', // 선택 필드, 빈 문자열로 전송
    targetCtr: targetCtr > 0 ? String(targetCtr) : '', // 선택 필드, 빈 문자열로 전송
    targetDemographics,
    details,
  }
}

/**
 * curl을 사용하여 API에 POST 요청
 */
function submitBrief(jsonData, filename) {
  try {
    const jsonString = JSON.stringify(jsonData)
    
    // 임시 파일을 사용하여 JSON 전달 (특수문자 문제 해결)
    const tmpFile = join(projectRoot, '.tmp_brief.json')
    writeFileSync(tmpFile, jsonString, 'utf-8')
    
    try {
      // 타임아웃 10초 설정
      const curlCommand = `curl -s -w "\\n%{http_code}" --max-time 10 --connect-timeout 5 -X POST "${API_URL}" \\
        -H "Content-Type: application/json" \\
        -d @${tmpFile}`
      
      const result = execSync(curlCommand, { 
        encoding: 'utf-8', 
        maxBuffer: 10 * 1024 * 1024
      })
      
      const lines = result.trim().split('\n')
      const httpCode = lines[lines.length - 1]
      const body = lines.slice(0, -1).join('\n')
      
      if (httpCode === '201') {
        console.log(`✅ Success: ${filename} (HTTP ${httpCode})`)
        try {
          const response = JSON.parse(body)
          console.log(`   File: ${response.fileName || 'N/A'}`)
        } catch (e) {
          // JSON 파싱 실패 시 그냥 출력
        }
        return true
      } else {
        console.log(`❌ Failed: ${filename} (HTTP ${httpCode})`)
        console.log(`   Response: ${body}`)
        return false
      }
    } finally {
      // 임시 파일 삭제
      try {
        unlinkSync(tmpFile)
      } catch (e) {
        // 파일 삭제 실패는 무시
      }
    }
  } catch (error) {
    if (error.message.includes('timeout') || error.message.includes('ETIMEDOUT') || error.message.includes('timed out')) {
      console.log(`⏱️  Timeout: ${filename} - API 서버가 응답하지 않습니다 (10초 타임아웃)`)
      console.log(`   💡 API 서버가 실행 중인지 확인하세요: ${API_URL}`)
    } else if (error.message.includes('ECONNREFUSED') || error.message.includes('Connection refused')) {
      console.log(`🔌 Connection refused: ${filename} - API 서버에 연결할 수 없습니다`)
      console.log(`   💡 개발 서버를 실행하세요: npm run dev`)
    } else {
      console.log(`❌ Error submitting ${filename}:`, error.message)
    }
    return false
  }
}

/**
 * 제출 상태 파일 읽기
 */
function loadSubmittedState() {
  if (!existsSync(STATE_FILE)) {
    return {
      submitted: [],
      lastUpdated: null
    }
  }
  
  try {
    const content = readFileSync(STATE_FILE, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    console.log('⚠️  Warning: Failed to read state file, starting fresh')
    return {
      submitted: [],
      lastUpdated: null
    }
  }
}

/**
 * 제출 상태 파일 저장
 */
function saveSubmittedState(state) {
  state.lastUpdated = new Date().toISOString()
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf-8')
}

/**
 * 제출 완료된 파일 추가
 */
function markAsSubmitted(state, filename) {
  if (!state.submitted.includes(filename)) {
    state.submitted.push(filename)
    saveSubmittedState(state)
  }
}

/**
 * 제출 상태 초기화
 */
function resetState() {
  if (existsSync(STATE_FILE)) {
    unlinkSync(STATE_FILE)
    console.log('✅ 제출 이력이 초기화되었습니다.')
  } else {
    console.log('ℹ️  제출 이력이 없습니다.')
  }
}

/**
 * API 서버 연결 확인
 */
function checkApiServer() {
  try {
    const checkCommand = `curl -s -o /dev/null -w "%{http_code}" --max-time 3 --connect-timeout 2 "${API_URL.replace('/api/brief', '')}"`
    const result = execSync(checkCommand, { 
      encoding: 'utf-8',
      maxBuffer: 1024 * 1024
    })
    return result.trim() !== '000' && result.trim() !== ''
  } catch (error) {
    return false
  }
}

/**
 * 메인 실행 함수
 */
async function main() {
  // 리셋 모드
  if (RESET_MODE) {
    resetState()
    return
  }
  
  console.log('🚀 Starting campaign brief submissions...')
  console.log(`API URL: ${API_URL}`)
  console.log(`Port: ${port}`)
  console.log(`Briefs directory: ${BRIEFS_DIR}`)
  if (ONE_MODE) {
    console.log('📌 Mode: ONE (1개만 제출)')
  }
  console.log('')
  
  // API 서버 연결 확인
  console.log('🔍 API 서버 연결 확인 중...')
  if (!checkApiServer()) {
    console.error('❌ Error: API 서버에 연결할 수 없습니다!')
    console.error(`   URL: ${API_URL}`)
    console.error(`   Port: ${port}`)
    console.error('')
    console.error('💡 해결 방법:')
    console.error('   1. 개발 서버가 실행 중인지 확인하세요: npm run dev')
    console.error(`   2. 포트 ${port}가 다른 프로세스에 의해 사용 중인지 확인하세요`)
    console.error('   3. API_URL 환경 변수가 올바른지 확인하세요')
    console.error(`   4. 다른 포트를 사용하려면: node scripts/submit_campaigns.mjs --port=<포트번호>`)
    process.exit(1)
  }
  console.log('✅ API 서버 연결 확인 완료')
  console.log('')
  
  // 제출 상태 로드
  const state = loadSubmittedState()
  const submittedSet = new Set(state.submitted)
  
  if (state.submitted.length > 0) {
    console.log(`📋 이미 제출된 파일: ${state.submitted.length}개`)
    console.log(`   ${state.submitted.join(', ')}`)
    console.log('')
  }
  
  // 파일 목록 가져오기 (정렬)
  const allFiles = readdirSync(BRIEFS_DIR)
    .filter(file => file.endsWith('.md'))
    .sort()
  
  // 아직 제출하지 않은 파일만 필터링
  const pendingFiles = allFiles.filter(file => !submittedSet.has(file))
  
  if (pendingFiles.length === 0) {
    console.log('✅ 모든 파일이 이미 제출되었습니다!')
    console.log(`   총 파일: ${allFiles.length}개`)
    console.log(`   제출 완료: ${state.submitted.length}개`)
    console.log('')
    console.log('💡 제출 이력을 초기화하려면: node scripts/submit_campaigns.mjs --reset')
    return
  }
  
  console.log(`📝 제출 대기 중인 파일: ${pendingFiles.length}개`)
  console.log('')
  
  // 1개 모드인 경우 첫 번째 파일만 처리
  const filesToProcess = ONE_MODE ? [pendingFiles[0]] : pendingFiles
  
  if (ONE_MODE) {
    console.log(`🎯 처리할 파일: ${filesToProcess[0]}`)
    console.log('')
  }
  
  let successCount = 0
  let failCount = 0
  
  // 각 파일 처리
  for (const file of filesToProcess) {
    const filePath = join(BRIEFS_DIR, file)
    try {
      const jsonData = parseBriefFile(filePath)
      console.log(`📄 파싱된 데이터 (${file}):`)
      console.log(`   budgetUsd: ${jsonData.budgetUsd} (type: ${typeof jsonData.budgetUsd})`)
      console.log(`   targetCpm: ${jsonData.targetCpm} (type: ${typeof jsonData.targetCpm})`)
      console.log(`   targetCtr: ${jsonData.targetCtr} (type: ${typeof jsonData.targetCtr})`)
      console.log('')
      const success = submitBrief(jsonData, file)
      
      if (success) {
        successCount++
        // 제출 성공 시 상태 업데이트
        markAsSubmitted(state, file)
      } else {
        failCount++
      }
      
      // API 부하 방지를 위한 딜레이 (마지막 파일이 아닐 때만)
      if (filesToProcess.indexOf(file) < filesToProcess.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    } catch (error) {
      console.log(`❌ Error processing ${file}:`, error.message)
      failCount++
    }
  }
  
  console.log('')
  if (ONE_MODE) {
    console.log('✨ 1개 제출 완료!')
    console.log(`   남은 파일: ${pendingFiles.length - successCount}개`)
  } else {
    console.log('✨ All submissions completed!')
    console.log(`   Success: ${successCount}`)
    console.log(`   Failed: ${failCount}`)
    console.log(`   Processed: ${filesToProcess.length}`)
  }
  
  // 상태 요약
  const updatedState = loadSubmittedState()
  console.log('')
  console.log('📊 제출 상태 요약:')
  console.log(`   총 파일: ${allFiles.length}개`)
  console.log(`   제출 완료: ${updatedState.submitted.length}개`)
  console.log(`   남은 파일: ${allFiles.length - updatedState.submitted.length}개`)
  
  if (ONE_MODE && pendingFiles.length > 1) {
    console.log('')
    console.log('💡 다음 파일을 제출하려면 다시 실행하세요:')
    console.log(`   node scripts/submit_campaigns.mjs --one`)
  }
}

// 실행
main()

