"use client";

import { DashboardStats } from "@/lib/types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

interface StatsClientProps {
  stats: DashboardStats;
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7c7c", "#8dd1e1", "#d084d0"];

export default function StatsClient({ stats }: StatsClientProps) {
  const getNpsStatus = (score: number) => {
    if (score >= 50) return { emoji: "🎉", text: "Excellent", color: "text-green-400" };
    if (score >= 0) return { emoji: "👍", text: "Good", color: "text-yellow-400" };
    return { emoji: "⚠️", text: "Needs Improvement", color: "text-red-400" };
  };

  const npsStatus = getNpsStatus(stats.nps_score);

  return (
    <div className="space-y-8">
      {/* KPI 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-white/60 text-sm mb-2">총 응답자 수</h3>
          <p className="text-4xl font-bold text-white">{stats.total_respondents.toLocaleString()}</p>
        </div>
        <div className="glass-card p-6">
          <h3 className="text-white/60 text-sm mb-2">현재 NPS 점수</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-bold text-white">{stats.nps_score.toFixed(1)}</p>
            <span className={`text-lg font-semibold ${npsStatus.color}`}>
              {npsStatus.emoji} {npsStatus.text}
            </span>
          </div>
        </div>
      </div>

      {/* 차트 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 직책별 분포 - 막대그래프 */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold mb-4 text-white">직책별 분포</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.position_distribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="position" 
                stroke="rgba(255,255,255,0.6)"
                tick={{ fill: "rgba(255,255,255,0.8)" }}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.6)"
                tick={{ fill: "rgba(255,255,255,0.8)" }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "rgba(26, 26, 46, 0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "0.5rem",
                  color: "#fff"
                }}
              />
              <Bar dataKey="count" fill="#8884d8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 회사 규모 분포 - 파이그래프 */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold mb-4 text-white">회사 규모 분포</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.company_size_distribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ company_size, percent }) => 
                  `${company_size}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
              >
                {stats.company_size_distribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "rgba(26, 26, 46, 0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "0.5rem",
                  color: "#fff"
                }}
              />
              <Legend 
                wrapperStyle={{ color: "rgba(255,255,255,0.8)" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}


