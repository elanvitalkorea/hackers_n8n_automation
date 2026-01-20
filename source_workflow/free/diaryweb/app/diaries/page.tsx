import { supabase } from '@/lib/supabase'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, PenLine, Search, Calendar, BookOpen } from 'lucide-react'

async function getDiaries() {
  const { data, error } = await supabase
    .from('diaries')
    .select('*')
    .order('timestamp', { ascending: false })

  if (error) {
    console.error('Error fetching diaries:', error)
    return []
  }

  return data || []
}

export default async function DiariesPage() {
  const diaries = await getDiaries()

  // Group diaries by month
  const groupedDiaries = diaries.reduce((acc, diary) => {
    const monthKey = format(new Date(diary.timestamp), 'yyyy년 M월', { locale: ko })
    if (!acc[monthKey]) {
      acc[monthKey] = []
    }
    acc[monthKey].push(diary)
    return acc
  }, {} as Record<string, typeof diaries>)

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#f5e6c8] rounded-full flex items-center justify-center">
                <span className="text-lg">📔</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-800">
                DIARY <span className="text-[#4a7c59]">STORY</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button 
                  variant="ghost" 
                  className="text-gray-600 hover:text-gray-900 rounded-xl"
                >
                  홈
                </Button>
              </Link>
              <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-sm">👤</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Page Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Link href="/" className="hover:text-[#4a7c59] transition-colors">홈</Link>
              <span>/</span>
              <span className="text-gray-800">일기 목록</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-[#4a7c59]" />
              내 일기 모음
            </h1>
            <p className="text-gray-500 mt-2">
              총 {diaries.length}개의 일기가 있습니다
            </p>
          </div>
          <Link href="/">
            <Button className="bg-[#4a7c59] hover:bg-[#3d6a4a] text-white rounded-full px-6 flex items-center gap-2">
              <PenLine className="w-4 h-4" />
              새 일기 작성
            </Button>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-4 card-shadow">
            <p className="text-sm text-gray-500 mb-1">전체 일기</p>
            <p className="text-2xl font-bold text-gray-800">{diaries.length}개</p>
          </div>
          <div className="bg-white rounded-2xl p-4 card-shadow">
            <p className="text-sm text-gray-500 mb-1">이번 달</p>
            <p className="text-2xl font-bold text-[#4a7c59]">
              {diaries.filter(d => {
                const diaryDate = new Date(d.timestamp)
                const now = new Date()
                return diaryDate.getMonth() === now.getMonth() && 
                       diaryDate.getFullYear() === now.getFullYear()
              }).length}개
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 card-shadow">
            <p className="text-sm text-gray-500 mb-1">이번 주</p>
            <p className="text-2xl font-bold text-[#d4a574]">
              {diaries.filter(d => {
                const diaryDate = new Date(d.timestamp)
                const now = new Date()
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
                return diaryDate >= weekAgo
              }).length}개
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 card-shadow">
            <p className="text-sm text-gray-500 mb-1">작성 기간</p>
            <p className="text-2xl font-bold text-gray-800">
              {diaries.length > 0 
                ? `${Math.ceil((new Date().getTime() - new Date(diaries[diaries.length - 1].timestamp).getTime()) / (1000 * 60 * 60 * 24))}일`
                : '0일'
              }
            </p>
          </div>
        </div>

        {diaries.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center card-shadow">
            <div className="w-24 h-24 bg-[#d4f5d4] rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">📝</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              아직 작성된 일기가 없어요
            </h2>
            <p className="text-gray-500 mb-6">
              첫 일기를 작성하고 당신의 이야기를 시작해보세요!
            </p>
            <Link href="/">
              <Button className="bg-[#4a7c59] hover:bg-[#3d6a4a] text-white rounded-full px-8 py-3 text-lg">
                첫 일기 작성하기
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedDiaries).map(([month, monthDiaries]) => {
              const diariesArray = monthDiaries as typeof diaries
              return (
              <div key={month}>
                {/* Month Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#d4f5d4] rounded-xl flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-[#4a7c59]" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">{month}</h2>
                  <span className="text-sm text-gray-400">({diariesArray.length}개)</span>
                </div>
                
                {/* Diary Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {diariesArray.map((diary, index) => {
                    const colors = [
                      'from-[#d4f5d4] to-[#e8f5e9]',
                      'from-[#faf5eb] to-[#f5e6c8]',
                      'from-[#e8f0e8] to-[#d4e5d8]',
                      'from-[#f5f0e6] to-[#e8e3d9]',
                      'from-[#e5f2e5] to-[#d0e8d0]',
                      'from-[#fff8e7] to-[#f5e6c8]',
                    ]
                    const colorClass = colors[index % colors.length]
                    
                    return (
                      <Card
                        key={diary.id}
                        className="bg-white border-0 rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                      >
                        <div className={`bg-gradient-to-br ${colorClass} p-5 border-b border-gray-100/50`}>
                          <div className="flex items-start justify-between mb-2">
                            <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-[#4a7c59] transition-colors">
                              {diary.title}
                            </CardTitle>
                          </div>
                          <CardDescription className="text-gray-600 text-sm flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {format(new Date(diary.timestamp), 'M월 d일 EEEE', { locale: ko })}
                          </CardDescription>
                        </div>
                        <CardContent className="p-5">
                          <p className="text-gray-700 line-clamp-4 text-sm leading-relaxed mb-4">
                            {diary.content}
                          </p>
                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <span className="text-xs text-gray-400">
                              {format(new Date(diary.timestamp), 'a h:mm', { locale: ko })}
                            </span>
                            <span className="text-xs text-[#4a7c59] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                              자세히 보기 →
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
