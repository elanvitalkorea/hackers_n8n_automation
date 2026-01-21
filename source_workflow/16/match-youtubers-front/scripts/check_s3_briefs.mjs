#!/usr/bin/env node

/**
 * S3 campaign-briefs 폴더의 JSON 파일들을 확인하는 테스트 스크립트
 * 사용법: node scripts/check_s3_briefs.mjs
 */

import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3'
import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { readFileSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')

// .env.local 파일 로드
config({ path: join(projectRoot, '.env.local') })

// 환경 변수 확인
const requiredEnvVars = ['AWS_ACCESS_KEY_ID', 'AWS_SECRET_ACCESS_KEY', 'AWS_REGION', 'AWS_S3_BUCKET_NAME']
const missingVars = requiredEnvVars.filter(varName => !process.env[varName])

if (missingVars.length > 0) {
  console.error('❌ Error: 다음 환경 변수가 설정되지 않았습니다:')
  missingVars.forEach(varName => console.error(`   - ${varName}`))
  console.error('\n.env.local 파일을 확인해주세요.')
  process.exit(1)
}

const bucketName = process.env.AWS_S3_BUCKET_NAME
const region = process.env.AWS_REGION

// S3 클라이언트 초기화
const s3Client = new S3Client({
  region: region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

/**
 * S3 폴더의 파일 목록 조회
 */
async function listFiles(prefix) {
  try {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: prefix,
    })
    
    const response = await s3Client.send(command)
    return response.Contents || []
  } catch (error) {
    console.error(`❌ Error listing files in ${prefix}:`, error.message)
    return []
  }
}

/**
 * S3 파일 내용 읽기
 */
async function getFileContent(key) {
  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    })
    
    const response = await s3Client.send(command)
    const chunks = []
    
    for await (const chunk of response.Body) {
      chunks.push(chunk)
    }
    
    return Buffer.concat(chunks).toString('utf-8')
  } catch (error) {
    console.error(`❌ Error reading file ${key}:`, error.message)
    return null
  }
}

/**
 * 파일명에서 정보 추출
 */
function parseFileName(key) {
  const fileName = key.split('/').pop()
  const match = fileName.match(/brief-form-(\d+)-(.+)\.json/)
  
  if (match) {
    const timestamp = parseInt(match[1])
    const uuid = match[2]
    const date = new Date(timestamp)
    
    return {
      fileName,
      timestamp,
      uuid,
      date: date.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }),
    }
  }
  
  return {
    fileName,
    timestamp: null,
    uuid: null,
    date: null,
  }
}

/**
 * JSON 파일 내용 파싱
 */
function parseJson(content) {
  try {
    const data = JSON.parse(content)
    return {
      companyName: data.companyName || '',
      advertiserName: data.advertiserName || '',
      productName: data.productName || '',
      budgetUsd: data.budgetUSD || data.budgetUsd || '',
      targetDemographics: data.targetDemographics || '',
      targetCpm: data.targetCPM || data.targetCpm || '',
      targetCtr: data.targetCTR || data.targetCtr || '',
    }
  } catch (error) {
    console.error('❌ JSON 파싱 오류:', error.message)
    return {}
  }
}

/**
 * 메인 실행 함수
 */
async function main() {
  console.log('🔍 S3 Campaign Briefs 확인 중...')
  console.log(`📦 Bucket: ${bucketName}`)
  console.log(`🌍 Region: ${region}`)
  console.log('')
  
  // 1. new/ 폴더 확인
  console.log('📁 [1] campaign-briefs/new/ 폴더 확인')
  console.log('─'.repeat(60))
  const newFiles = await listFiles('campaign-briefs/new/')
  
  if (newFiles.length === 0) {
    console.log('   ⚠️  파일이 없습니다.')
  } else {
    console.log(`   ✅ 총 ${newFiles.length}개의 파일 발견\n`)
    
    for (let i = 0; i < newFiles.length; i++) {
      const file = newFiles[i]
      const fileInfo = parseFileName(file.Key)
      
      console.log(`   [${i + 1}] ${fileInfo.fileName}`)
      console.log(`       📅 생성일: ${fileInfo.date || 'N/A'}`)
      console.log(`       📏 크기: ${(file.Size / 1024).toFixed(2)} KB`)
      console.log(`       🔑 Key: ${file.Key}`)
      
      // 파일 내용 확인 (최대 3개만 상세 표시)
      if (i < 3) {
        const content = await getFileContent(file.Key)
        if (content) {
          const parsed = parseJson(content)
          console.log(`       📋 회사명: ${parsed.companyName || 'N/A'}`)
          console.log(`       📋 제품명: ${parsed.productName || 'N/A'}`)
          console.log(`       💰 예산: ${parsed.budgetUsd || 'N/A'}`)
          console.log(`       👥 타겟: ${parsed.targetDemographics || 'N/A'}`)
        }
      }
      
      console.log('')
    }
  }
  
  console.log('')
  
  // 2. processed/ 폴더 확인
  console.log('📁 [2] campaign-briefs/processed/ 폴더 확인')
  console.log('─'.repeat(60))
  const processedFiles = await listFiles('campaign-briefs/processed/')
  
  if (processedFiles.length === 0) {
    console.log('   ⚠️  파일이 없습니다.')
  } else {
    console.log(`   ✅ 총 ${processedFiles.length}개의 파일 발견\n`)
    
    for (let i = 0; i < processedFiles.length; i++) {
      const file = processedFiles[i]
      const fileInfo = parseFileName(file.Key)
      
      console.log(`   [${i + 1}] ${fileInfo.fileName}`)
      console.log(`       📅 생성일: ${fileInfo.date || 'N/A'}`)
      console.log(`       📏 크기: ${(file.Size / 1024).toFixed(2)} KB`)
      console.log(`       🔑 Key: ${file.Key}`)
      console.log('')
    }
  }
  
  console.log('')
  
  // 3. 통계 요약
  console.log('📊 [3] 통계 요약')
  console.log('─'.repeat(60))
  console.log(`   📝 새 파일 (new/): ${newFiles.length}개`)
  console.log(`   ✅ 처리 완료 (processed/): ${processedFiles.length}개`)
  console.log(`   📦 총 파일: ${newFiles.length + processedFiles.length}개`)
  
  // 파일 크기 합계
  const totalSizeNew = newFiles.reduce((sum, file) => sum + (file.Size || 0), 0)
  const totalSizeProcessed = processedFiles.reduce((sum, file) => sum + (file.Size || 0), 0)
  const totalSize = totalSizeNew + totalSizeProcessed
  
  console.log(`   💾 총 용량: ${(totalSize / 1024).toFixed(2)} KB (${(totalSize / 1024 / 1024).toFixed(2)} MB)`)
  
  console.log('')
  console.log('✨ 확인 완료!')
}

// 실행
main().catch(error => {
  console.error('❌ 실행 중 오류 발생:', error)
  process.exit(1)
})

