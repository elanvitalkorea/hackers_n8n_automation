#!/usr/bin/env node

/**
 * S3에 저장된 캠페인 브리프 JSON 파일 하나를 RAW 형태로 출력하는 스크립트
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

async function main() {
  const files = await listFiles('campaign-briefs/new/')
  
  if (files.length === 0) {
    console.log('❌ S3에 파일이 없습니다.')
    return
  }
  
  // 첫 번째 파일 가져오기
  const file = files[0]
  const content = await getFileContent(file.Key)
  
  if (!content) {
    console.log('❌ 파일을 읽을 수 없습니다.')
    return
  }
  
  const fileName = file.Key.split('/').pop()
  console.log(`파일명: ${fileName}`)
  console.log(`S3 Key: ${file.Key}`)
  console.log('─'.repeat(80))
  console.log('')
  console.log('RAW JSON 내용:')
  console.log('─'.repeat(80))
  console.log('')
  
  // JSON 포맷팅하여 출력
  try {
    const parsed = JSON.parse(content)
    console.log(JSON.stringify(parsed, null, 2))
  } catch (error) {
    // JSON 파싱 실패 시 원본 그대로 출력
    console.log(content)
  }
  
  console.log('')
  console.log('─'.repeat(80))
}

main().catch(error => {
  console.error('❌ 실행 중 오류 발생:', error)
  process.exit(1)
})

