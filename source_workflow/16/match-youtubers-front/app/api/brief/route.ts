import { NextRequest, NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { v4 as uuidv4 } from 'uuid'

interface BriefFormData {
  advertiserName: string
  companyEmail: string
  companyName: string
  productName: string
  budgetUsd: string
  targetCpm: string
  targetCtr: string
  targetDemographics: string
  details: string
}

// S3에 저장할 JSON 데이터 인터페이스 (타겟 형식)
interface TargetS3Json {
  companyName: string
  advertiserName: string
  email: string
  productName: string
  budgetUSD: number // 숫자로 변환 (필수)
  targetDemographics: string
  targetCPM: number | null // 숫자로 변환 (선택 필드)
  targetCTR: number | null // 숫자로 변환 (선택 필드)
  details: string // LLM이 요약할 원본 텍스트
  // summary 필드는 n8n에서 추가
}

export async function POST(request: NextRequest) {
  try {
    // 1. 클라이언트로부터 JSON 데이터 수신
    const formData: BriefFormData = await request.json()
    
    // 디버깅: 받은 원본 데이터 로그
    console.log('📥 받은 폼 데이터:', {
      budgetUsd: formData.budgetUsd,
      targetCpm: formData.targetCpm,
      targetCtr: formData.targetCtr,
      budgetUsdType: typeof formData.budgetUsd,
      targetCpmType: typeof formData.targetCpm,
      targetCtrType: typeof formData.targetCtr,
    })

    // 2. S3에 저장할 JSON 객체 생성 (Markdown 대신)
    //    타겟 JSON 형식에 맞게 변환 (문자열 -> 숫자 등)
    
    // 숫자 변환 헬퍼 함수 (빈 문자열은 null로 처리)
    const parseNumber = (value: string): number | null => {
      if (!value || value.trim() === '') return null
      const parsed = parseFloat(value)
      return isNaN(parsed) ? null : parsed
    }
    
    // budgetUSD는 필수 필드이므로 검증
    const budgetUSD = parseNumber(formData.budgetUsd)
    if (budgetUSD === null || budgetUSD <= 0) {
      console.log('❌ budgetUSD 검증 실패:', { budgetUSD, originalValue: formData.budgetUsd })
      return NextResponse.json(
        {
          success: false,
          message: '캠페인 총 예산은 필수이며 0보다 큰 값이어야 합니다.',
        },
        { status: 400 }
      )
    }
    
    const targetCPM = parseNumber(formData.targetCpm) ?? null
    const targetCTR = parseNumber(formData.targetCtr) ?? null
    
    const jsonDataToSave: TargetS3Json = {
      companyName: formData.companyName,
      advertiserName: formData.advertiserName,
      email: formData.companyEmail,
      productName: formData.productName,
      budgetUSD: budgetUSD,
      targetDemographics: formData.targetDemographics,
      // 선택 필드는 null로 저장 (0이 아닌)
      targetCPM: targetCPM,
      targetCTR: targetCTR,
      details: formData.details, // n8n의 LLM이 요약할 원본
    }
    
    // 디버깅: 변환된 데이터 로그
    console.log('💾 S3에 저장할 데이터:', JSON.stringify(jsonDataToSave, null, 2))

    // 3. 고유 파일명 생성 (확장자 .json으로 변경)
    const timestamp = Date.now()
    const uniqueId = uuidv4()
    const fileName = `brief-form-${timestamp}-${uniqueId}.json`

    // 4. AWS S3 클라이언트 초기화
    const s3Client = new S3Client({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
      },
    })

    // 5. S3에 업로드 (Body 및 ContentType 변경)
    const bucketName = process.env.AWS_S3_BUCKET_NAME || ''
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: `campaign-briefs/new/${fileName}`,
      // Body에 JSON 문자열 사용
      Body: JSON.stringify(jsonDataToSave, null, 2), // null, 2는 S3에서 볼 때 예쁘게 포맷팅
      // ContentType을 JSON으로 변경
      ContentType: 'application/json',
    })

    await s3Client.send(command)

    // 6. 성공 응답 반환
    return NextResponse.json(
      {
        success: true,
        message: '브리프가 성공적으로 제출되었습니다.',
        fileName,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('브리프 제출 오류:', error)
    return NextResponse.json(
      {
        success: false,
        message: '브리프 제출 중 오류가 발생했습니다.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
