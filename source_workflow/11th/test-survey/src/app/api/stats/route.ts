import { NextResponse } from "next/server";
import { getServerSupabaseClient } from "@/lib/supabase";
import { DashboardStats } from "@/lib/types";

export async function GET() {
  try {
    const supabase = getServerSupabaseClient();

    // RPC 함수 호출로 모든 통계 데이터 조회
    const { data, error } = await supabase.rpc("get_dashboard_stats");

    if (error) {
      console.error("❌ RPC 호출 실패:", error);
      return NextResponse.json(
        { error: "통계 데이터를 가져오는데 실패했습니다." },
        { status: 500 }
      );
    }

    // 타입 안전성을 위해 명시적 변환
    const stats: DashboardStats = {
      total_respondents: data?.total_respondents || 0,
      nps_score: data?.nps_score || 0,
      position_distribution: data?.position_distribution || [],
      company_size_distribution: data?.company_size_distribution || [],
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("❌ API 에러:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}


