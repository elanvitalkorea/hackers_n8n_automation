import { NextRequest, NextResponse } from "next/server";
import { getServerSupabaseClient } from "@/lib/supabase";
import { SurveyFormData } from "@/lib/types";
import { validateEmail, validatePhone } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const body: SurveyFormData = await request.json();

    // 유효성 검사
    if (!body.name?.trim()) {
      return NextResponse.json(
        { error: "필수 입력 항목이 누락되었습니다." },
        { status: 400 }
      );
    }

    if (!validatePhone(body.phone)) {
      return NextResponse.json(
        { error: "전화번호 형식이 올바르지 않습니다. (010-XXXX-XXXX)" },
        { status: 400 }
      );
    }

    if (!validateEmail(body.company_email)) {
      return NextResponse.json(
        { error: "이메일 형식이 올바르지 않습니다." },
        { status: 400 }
      );
    }

    if (!body.company_name?.trim()) {
      return NextResponse.json(
        { error: "필수 입력 항목이 누락되었습니다." },
        { status: 400 }
      );
    }

    if (!body.position || !body.company_size) {
      return NextResponse.json(
        { error: "필수 입력 항목이 누락되었습니다." },
        { status: 400 }
      );
    }

    if (body.satisfaction < 1 || body.satisfaction > 10) {
      return NextResponse.json(
        { error: "만족도는 1-10 사이의 값이어야 합니다." },
        { status: 400 }
      );
    }

    // Supabase 클라이언트 생성
    const supabase = getServerSupabaseClient();

    // 설문 데이터 저장
    const { data, error: insertError } = await supabase
      .from("surveys")
      .insert([
        {
          name: body.name.trim(),
          phone: body.phone,
          company_email: body.company_email.trim(),
          company_name: body.company_name.trim(),
          position: body.position,
          company_size: body.company_size,
          satisfaction: body.satisfaction,
          comment: body.comment?.trim() || null,
        },
      ])
      .select()
      .single();

    if (insertError) {
      console.error("❌ DB 저장 실패:", insertError);
      return NextResponse.json(
        { error: "설문 제출에 실패했습니다." },
        { status: 500 }
      );
    }

    // NPS 점수 계산
    const { data: npsData, error: npsError } = await supabase.rpc(
      "calculate_current_nps"
    );

    if (npsError) {
      console.error("❌ NPS 계산 실패:", npsError);
    }

    const currentNps = npsData || 0;

    // n8n 웹훅 트리거 (비동기, 실패해도 사용자 응답에 영향 없음)
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;

    if (n8nWebhookUrl) {
      console.log("🔔 n8n Webhook URL: 설정됨");
      console.log("📤 n8n 웹훅 호출 시작:", {
        name: body.name,
        phone: body.phone,
        nps_score: currentNps,
      });

      try {
        const webhookResponse = await fetch(n8nWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: body.name,
            phone: body.phone,
            nps_score: currentNps,
          }),
        });

        if (webhookResponse.ok) {
          console.log(
            "✅ n8n 웹훅 응답:",
            webhookResponse.status,
            await webhookResponse.text().catch(() => "")
          );
        } else {
          console.error(
            "❌ n8n webhook error:",
            webhookResponse.status,
            await webhookResponse.text().catch(() => "")
          );
        }
      } catch (webhookError) {
        console.error("❌ n8n webhook error:", webhookError);
      }
    } else {
      console.log("⚠️ N8N_WEBHOOK_URL이 설정되지 않았습니다");
    }

    // 성공 응답
    return NextResponse.json(
      {
        success: true,
        message: "설문이 성공적으로 제출되었습니다.",
        nps_score: currentNps,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ API 에러:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}


