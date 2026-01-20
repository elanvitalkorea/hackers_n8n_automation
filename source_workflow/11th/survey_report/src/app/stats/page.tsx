import Link from 'next/link';
import StatsClient from './StatsClient';
import { DashboardStats } from '@/lib/types';

async function getStats(): Promise<DashboardStats> {
  try {
    // Next.js API 라우트를 직접 호출
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 3001}`;
    
    const response = await fetch(
      `${baseUrl}/api/stats`,
      {
        next: { revalidate: 60 }, // ISR: 60초마다 재검증
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch stats:', response.status);
      throw new Error('Failed to fetch stats');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      total_respondents: 0,
      nps_score: 0,
      position_distribution: [],
      company_size_distribution: [],
    };
  }
}

export default async function StatsPage() {
  const stats = await getStats();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          실시간 통계 대시보드
        </h1>
        <p className="text-white/70 text-lg">
          강의 만족도 설문 결과를 실시간으로 확인하세요
        </p>
      </div>

      {/* KPI 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="glass-card p-8 text-center">
          <div className="text-white/70 text-sm font-medium uppercase tracking-wider mb-2">
            총 응답자 수
          </div>
          <div className="text-5xl font-bold text-white mb-2">
            {stats.total_respondents}
          </div>
          <div className="text-white/50 text-sm">명</div>
        </div>

        <div className="glass-card p-8 text-center">
          <div className="text-white/70 text-sm font-medium uppercase tracking-wider mb-2">
            NPS 점수
          </div>
          <div className="text-5xl font-bold text-white mb-2">
            {typeof stats.nps_score === 'number' 
              ? stats.nps_score.toFixed(1)
              : '0.0'}
          </div>
          <div className="text-white/50 text-sm">
            {stats.nps_score >= 50 && '🎉 Excellent'}
            {stats.nps_score >= 0 && stats.nps_score < 50 && '👍 Good'}
            {stats.nps_score < 0 && '⚠️ Needs Improvement'}
          </div>
        </div>
      </div>

      {/* 차트 */}
      <StatsClient stats={stats} />

      {/* 설문으로 돌아가기 버튼 */}
      <div className="mt-12 text-center">
        <Link href="/" className="glass-button inline-block">
          ← 설문으로 돌아가기
        </Link>
      </div>
    </div>
  );
}

