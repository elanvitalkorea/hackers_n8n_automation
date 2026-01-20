'use client';

import { DashboardStats } from '@/lib/types';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface StatsClientProps {
  stats: DashboardStats;
}

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4'];

export default function StatsClient({ stats }: StatsClientProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* 직책별 분포 - 막대그래프 */}
      <div className="glass-card p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          직책별 분포
        </h2>
        {stats.position_distribution.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.position_distribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="position" 
                stroke="rgba(255,255,255,0.7)"
                style={{ fontSize: '14px' }}
              />
              <YAxis 
                stroke="rgba(255,255,255,0.7)"
                style={{ fontSize: '14px' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
              <Legend 
                wrapperStyle={{ color: '#fff' }}
              />
              <Bar 
                dataKey="count" 
                fill="#3b82f6" 
                name="응답자 수"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-white/50">
            아직 데이터가 없습니다
          </div>
        )}
      </div>

      {/* 회사 규모 분포 - 파이그래프 */}
      <div className="glass-card p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          회사 규모 분포
        </h2>
        {stats.company_size_distribution.length > 0 ? (
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
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[300px] flex items-center justify-center text-white/50">
            아직 데이터가 없습니다
          </div>
        )}
      </div>
    </div>
  );
}

