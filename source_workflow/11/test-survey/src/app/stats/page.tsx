import Link from "next/link";
import StatsClient from "./StatsClient";
import { DashboardStats } from "@/lib/types";

// ISR 설정: 60초마다 재검증
export const revalidate = 60;

async function getStats(): Promise<DashboardStats> {
  // 동적 포트 처리
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:${process.env.PORT || 3001}`;

  const res = await fetch(`${baseUrl}/api/stats`, {
    cache: "no-store", // ISR이므로 캐시는 사용하지 않음
  });

  if (!res.ok) {
    throw new Error("Failed to fetch stats");
  }

  return res.json();
}

export default async function StatsPage() {
  let stats: DashboardStats;

  try {
    stats = await getStats();
  } catch (error) {
    // 에러 발생 시 기본값 반환
    stats = {
      total_respondents: 0,
      nps_score: 0,
      position_distribution: [],
      company_size_distribution: [],
    };
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            통계 대시보드
          </h1>
          <Link
            href="/"
            className="glass-button text-sm px-4 py-2"
          >
            설문으로 돌아가기
          </Link>
        </div>

        <StatsClient stats={stats} />
      </div>
    </main>
  );
}


