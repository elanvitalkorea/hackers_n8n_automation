#!/usr/bin/env node

/**
 * 학습노트 JSON 형식과 실제 S3 저장 파일 형식을 비교하는 스크립트
 */

import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3'
import { config } from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')

config({ path: join(projectRoot, '.env.local') })

const bucketName = process.env.AWS_S3_BUCKET_NAME
const region = process.env.AWS_REGION

const s3Client = new S3Client({
  region: region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

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

async function listFiles(prefix) {
  try {
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: prefix,
    })
    const response = await s3Client.send(command)
    return response.Contents || []
  } catch (error) {
    return []
  }
}

// 학습노트에서 요구하는 JSON 형식
const expectedJsonFormat = {
  companyName: "string",
  advertiserName: "string",
  email: "string",
  productName: "string",
  budgetUSD: "number",
  targetDemographics: "string (ENUM)",
  targetCPM: "number",
  targetCTR: "number",
  details: "string"
}

async function main() {
  console.log('📋 학습노트 JSON 형식 vs 실제 S3 저장 파일 형식 비교')
  console.log('='.repeat(80))
  console.log('')
  
  // 학습노트 JSON 형식 표시
  console.log('📚 [학습노트 요구 JSON 형식]')
  console.log('─'.repeat(80))
  console.log('```json')
  console.log(JSON.stringify(expectedJsonFormat, null, 2))
  console.log('```')
  console.log('')
  
  // S3에서 파일 하나 가져오기
  const files = await listFiles('campaign-briefs/new/')
  if (files.length === 0) {
    console.log('❌ S3에 파일이 없습니다.')
    return
  }
  
  const file = files[0]
  const content = await getFileContent(file.Key)
  
  if (!content) {
    console.log('❌ 파일을 읽을 수 없습니다.')
    return
  }
  
  let parsed
  try {
    parsed = JSON.parse(content)
  } catch (error) {
    console.log('❌ JSON 파싱 실패:', error.message)
    return
  }
  
  console.log('📄 [실제 S3 저장 JSON 파일]')
  console.log('─'.repeat(80))
  console.log(`파일명: ${file.Key.split('/').pop()}`)
  console.log('```json')
  console.log(JSON.stringify(parsed, null, 2))
  console.log('```')
  console.log('')
  
  // 형식 비교
  console.log('🔍 [형식 비교 분석]')
  console.log('─'.repeat(80))
  console.log('')
  
  const comparisons = [
    {
      name: '필수 필드 9개 모두 포함',
      expected: 'companyName, advertiserName, email, productName, budgetUSD, targetDemographics, targetCPM, targetCTR, details',
      actual: Object.keys(parsed).join(', '),
      match: ['companyName', 'advertiserName', 'email', 'productName', 'budgetUSD', 'targetDemographics', 'targetCPM', 'targetCTR', 'details'].every(key => parsed.hasOwnProperty(key))
    },
    {
      name: 'budgetUSD 숫자 타입',
      expected: 'number',
      actual: typeof parsed.budgetUSD,
      match: typeof parsed.budgetUSD === 'number'
    },
    {
      name: 'targetCPM 숫자 타입',
      expected: 'number',
      actual: typeof parsed.targetCPM,
      match: typeof parsed.targetCPM === 'number'
    },
    {
      name: 'targetCTR 숫자 타입',
      expected: 'number',
      actual: typeof parsed.targetCTR,
      match: typeof parsed.targetCTR === 'number'
    },
    {
      name: 'targetDemographics ENUM 형식',
      expected: 'ENUM 값 (예: MALE_20-30, FEMALE_20-30)',
      actual: parsed.targetDemographics || '없음',
      match: parsed.targetDemographics && /^[A-Z_]+[0-9-]+$/.test(parsed.targetDemographics)
    },
    {
      name: 'JSON 형식 유효성',
      expected: '유효한 JSON',
      actual: 'JSON 파싱 성공',
      match: true
    }
  ]
  
  comparisons.forEach(comp => {
    const icon = comp.match ? '✅' : '❌'
    console.log(`${icon} ${comp.name}`)
    if (!comp.match) {
      console.log(`   예상: ${comp.expected}`)
      console.log(`   실제: ${comp.actual}`)
    }
    console.log('')
  })
  
  console.log('')
  console.log('='.repeat(80))
  console.log('')
  
  const allMatch = comparisons.every(c => c.match)
  if (allMatch) {
    console.log('✅ **결론: 학습노트 요구사항을 정확히 준수합니다!**')
    console.log('')
    console.log('**중요**: JSON 형식이 정확하고 필수 필드가 모두 포함되어 있으면 Agent 1이 정상적으로 분석할 수 있습니다.')
  } else {
    console.log('⚠️ **결론: 일부 형식 차이가 있지만 내용이 정확하면 문제 없습니다.**')
    console.log('')
    console.log('**참고**: JSON 형식의 정확성과 필수 필드 포함 여부가 중요합니다.')
  }
  console.log('')
}

main().catch(error => {
  console.error('❌ 실행 중 오류 발생:', error)
  process.exit(1)
})

