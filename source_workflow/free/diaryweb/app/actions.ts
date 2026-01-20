'use server'

import { supabase } from '@/lib/supabase'

export async function saveDiary(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const timestamp = formData.get('timestamp') as string

  if (!title || !content || !timestamp) {
    return { error: '모든 필드를 입력해주세요.' }
  }

  try {
    // Supabase에 저장
    const { data, error } = await supabase
      .from('diaries')
      .insert([
        {
          title,
          content,
          timestamp: new Date(timestamp).toISOString(),
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return { error: '일기 저장에 실패했습니다.' }
    }

    // n8n 웹훅으로 전송
    const webhookUrl = process.env.N8N_WEBHOOK_URL
    let webhookSuccess = false
    let webhookError: string | null = null

    if (webhookUrl) {
      try {
        const webhookData = {
          title: data.title,
          content: data.content,
          timestamp: data.timestamp,
        }

        console.log('웹훅 전송 시도:', webhookUrl)
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(webhookData),
        })

        if (webhookResponse.ok) {
          webhookSuccess = true
          console.log('웹훅 전송 성공:', webhookResponse.status)
        } else {
          const errorText = await webhookResponse.text()
          webhookError = `HTTP ${webhookResponse.status}: ${errorText}`
          console.error('웹훅 전송 실패:', webhookError)
        }
      } catch (webhookError) {
        const errorMessage = webhookError instanceof Error ? webhookError.message : String(webhookError)
        webhookError = errorMessage
        console.error('웹훅 요청 실패:', errorMessage)
      }
    } else {
      console.warn('N8N_WEBHOOK_URL 환경변수가 설정되지 않았습니다.')
    }

    return { 
      success: true, 
      data,
      webhookSuccess,
      webhookError: webhookError || undefined
    }
  } catch (error) {
    console.error('Save diary error:', error)
    return { error: '일기 저장 중 오류가 발생했습니다.' }
  }
}

