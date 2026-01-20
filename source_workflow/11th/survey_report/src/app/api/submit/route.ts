import { NextRequest, NextResponse } from 'next/server';
import { getServerSupabaseClient } from '@/lib/supabase';
import { SurveyFormData } from '@/lib/types';
import { validateEmail, validatePhone } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const body: SurveyFormData = await request.json();

    // 1. Request Body 데이터 유효성 검사
    if (!body.name || !body.phone || !body.company_email || !body.company_name || 
        !body.position || !body.company_size || !body.satisfaction) {
      return NextResponse.json(
        { error: '필수 입력 항목이 누락되었습니다.' },
        { status: 400 }
      );
    }

    if (!validateEmail(body.company_email)) {
      return NextResponse.json(
        { error: '올바른 이메일 형식이 아닙니다.' },
        { status: 400 }
      );
    }

    if (!validatePhone(body.phone)) {
      return NextResponse.json(
        { error: '전화번호는 010-XXXX-XXXX 형식이어야 합니다.' },
        { status: 400 }
      );
    }

    if (body.satisfaction < 1 || body.satisfaction > 10) {
      return NextResponse.json(
        { error: '만족도는 1-10점 사이여야 합니다.' },
        { status: 400 }
      );
    }

    const supabase = getServerSupabaseClient();

    // 2. Supabase surveys 테이블에 데이터 INSERT
    const { error: insertError } = await supabase
      .from('surveys')
      .insert([
        {
          name: body.name,
          phone: body.phone,
          company_email: body.company_email,
          company_name: body.company_name,
          position: body.position,
          company_size: body.company_size,
          satisfaction: body.satisfaction,
          comment: body.comment || null,
        },
      ]);

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      return NextResponse.json(
        { error: '설문 데이터 저장에 실패했습니다.' },
        { status: 500 }
      );
    }

    // 3. Supabase RPC로 현재 NPS 점수 조회
    const { data: npsData, error: npsError } = await supabase
      .rpc('calculate_current_nps');

    if (npsError) {
      console.error('NPS calculation error:', npsError);
    }

    const currentNps = npsData || 0;

    // 4. n8n 웹훅 트리거
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    console.log('🔔 n8n Webhook URL:', webhookUrl ? '설정됨' : '설정 안됨');
    
    if (webhookUrl) {
      try {
        console.log('📤 n8n 웹훅 호출 시작:', {
          name: body.name,
          phone: body.phone,
          nps_score: currentNps,
        });
        
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: body.name,
            phone: body.phone,
            nps_score: currentNps,
          }),
        });
        
        console.log('✅ n8n 웹훅 응답:', {
          status: webhookResponse.status,
          statusText: webhookResponse.statusText,
        });
      } catch (webhookError) {
        console.error('❌ n8n webhook error:', webhookError);
        // 웹훅 실패는 무시하고 계속 진행
      }
    } else {
      console.log('⚠️  N8N_WEBHOOK_URL이 설정되지 않았습니다.');
    }

    // 5. 성공 응답
    return NextResponse.json(
      { 
        success: true, 
        message: '설문이 성공적으로 제출되었습니다.',
        nps_score: currentNps 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Submit API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

