import { NextResponse } from 'next/server';
import { getServerSupabaseClient } from '@/lib/supabase';

export async function GET() {
  try {
    const supabase = getServerSupabaseClient();

    // Supabase RPC 함수 호출하여 대시보드 통계 데이터 조회
    const { data, error } = await supabase.rpc('get_dashboard_stats');

    if (error) {
      console.error('Supabase RPC error:', error);
      return NextResponse.json(
        { error: '통계 데이터를 불러오는데 실패했습니다.' },
        { status: 500 }
      );
    }

    // RPC 함수가 반환한 JSON 데이터를 그대로 클라이언트에 전달
    return NextResponse.json(data || {
      total_respondents: 0,
      nps_score: 0,
      position_distribution: [],
      company_size_distribution: [],
    });

  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

