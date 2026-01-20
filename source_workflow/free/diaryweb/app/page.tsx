'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { CalendarIcon, PenLine, BookOpen, Clock, FileText, ArrowRight, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import { saveDiary } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CircularProgress } from '@/components/ui/circular-progress'
import { cn } from '@/lib/utils'

const diarySchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
  timestamp: z.date({ message: '날짜를 선택해주세요.' }),
})

type DiaryFormValues = z.infer<typeof diarySchema>

function getGreeting() {
  const hour = new Date().getHours()
  if (hour < 12) return '좋은 아침이에요'
  if (hour < 17) return '좋은 오후예요'
  if (hour < 21) return '좋은 저녁이에요'
  return '좋은 밤이에요'
}

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })
  const [showWritingRoom, setShowWritingRoom] = useState(false)

  const form = useForm<DiaryFormValues>({
    resolver: zodResolver(diarySchema),
    defaultValues: {
      timestamp: new Date(),
    },
  })

  const onSubmit = async (data: DiaryFormValues) => {
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const formData = new FormData()
      formData.append('title', data.title)
      formData.append('content', data.content)
      formData.append('timestamp', data.timestamp.toISOString())

      const result = await saveDiary(formData)

      if (result.error) {
        setSubmitStatus({ type: 'error', message: result.error })
      } else {
        let message = '일기가 성공적으로 저장되었습니다!'
        if (result.webhookSuccess !== undefined) {
          if (result.webhookSuccess) {
            message += ' (웹훅 전송 완료)'
          } else if (result.webhookError) {
            message += ` (웹훅 전송 실패: ${result.webhookError})`
          } else {
            message += ' (웹훅 URL 미설정)'
          }
        }
        setSubmitStatus({ type: 'success', message })
        form.reset({
          title: '',
          content: '',
          timestamp: new Date(),
        })
        setTimeout(() => {
          setShowWritingRoom(false)
        }, 1500)
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: '일기 저장 중 오류가 발생했습니다.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Sample stats - these would come from your database
  const stats = {
    totalDiaries: 12,
    weeklyGoal: 7,
    weeklyProgress: 5,
    wordsWritten: 3842,
    streakDays: 5,
    completionPercentage: 71,
  }

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
              <Button 
                variant="ghost" 
                onClick={() => window.location.href = '/diaries'}
                className="text-gray-600 hover:text-gray-900 rounded-xl"
              >
                내 일기
              </Button>
              <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-sm">👤</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Greeting Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {getGreeting()} 👋
          </h1>
          <p className="text-gray-500">
            당신의 이야기를 계속 써나가세요 – {format(new Date(), 'yyyy년 M월 d일 EEEE', { locale: ko })}
          </p>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Progress Card - Large */}
          <div className="lg:col-span-1 bg-[#d4f5d4] rounded-3xl p-6 flex flex-col items-center justify-center min-h-[320px]">
            <CircularProgress 
              percentage={stats.completionPercentage} 
              size={180}
              strokeWidth={16}
              label="달성률"
            />
            <p className="text-center mt-4 text-gray-700 text-sm">
              이번 주 {stats.weeklyProgress}개 작성! 목표까지 {stats.weeklyGoal - stats.weeklyProgress}개 남았어요
            </p>
          </div>

          {/* Stats Cards */}
          <div className="lg:col-span-1 grid grid-rows-3 gap-4">
            <div className="stat-card flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800">{stats.totalDiaries}</p>
                <p className="text-sm text-gray-500">작성한 일기</p>
              </div>
            </div>

            <div className="stat-card flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800">{stats.wordsWritten.toLocaleString()}</p>
                <p className="text-sm text-gray-500">작성한 글자</p>
              </div>
            </div>

            <div className="stat-card flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-800">{stats.streakDays}일</p>
                <p className="text-sm text-gray-500">연속 작성</p>
              </div>
            </div>
          </div>

          {/* Feature Card - AI Diary */}
          <div className="lg:col-span-1 bg-[#faf5eb] rounded-3xl p-6 flex flex-col">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">AI 일기 도우미</h3>
            <p className="text-gray-600 text-sm mb-4 flex-grow">
              AI와 대화하며 오늘 하루를 되돌아보세요. 
              당신의 이야기를 더 풍성하게 만들어 드릴게요.
            </p>
            <Button 
              className="bg-[#d4a574] hover:bg-[#c49564] text-white rounded-full px-6 py-3 self-start flex items-center gap-2 font-medium"
            >
              <Sparkles className="w-4 h-4" />
              AI와 대화하기
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Feature Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Writing Room Card */}
          <div 
            className="feature-card bg-[#f5f5f0] cursor-pointer group"
            onClick={() => setShowWritingRoom(true)}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-2">일기 쓰기</h3>
            <p className="text-gray-600 text-sm mb-6">
              매일의 생각과 감정을 기록하세요. <br />
              작은 기록이 큰 이야기가 됩니다.
            </p>
            <div className="flex items-end justify-between">
              <Button 
                className="bg-[#4a7c59] hover:bg-[#3d6a4a] text-white rounded-full px-6 py-3 flex items-center gap-2 font-medium group-hover:translate-x-1 transition-transform"
              >
                <PenLine className="w-4 h-4" />
                새 일기 작성
                <ArrowRight className="w-4 h-4" />
              </Button>
              <div className="text-6xl opacity-30 group-hover:opacity-50 transition-opacity">
                ✏️
              </div>
            </div>
          </div>

          {/* Reading Room Card */}
          <div 
            className="feature-card bg-[#e8f0e8] cursor-pointer group"
            onClick={() => window.location.href = '/diaries'}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-2">일기 모아보기</h3>
            <p className="text-gray-600 text-sm mb-6">
              지난 기록들을 돌아보며 <br />
              나의 성장을 확인하세요.
            </p>
            <div className="flex items-end justify-between">
              <Button 
                className="bg-[#4a7c59] hover:bg-[#3d6a4a] text-white rounded-full px-6 py-3 flex items-center gap-2 font-medium group-hover:translate-x-1 transition-transform"
              >
                <BookOpen className="w-4 h-4" />
                일기 목록 보기
                <ArrowRight className="w-4 h-4" />
              </Button>
              <div className="text-6xl opacity-30 group-hover:opacity-50 transition-opacity">
                📚
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Writing Room Modal */}
      {showWritingRoom && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-3xl">
              <div>
                <h2 className="text-xl font-bold text-gray-900">새 일기 작성</h2>
                <p className="text-sm text-gray-500">오늘 하루를 기록해보세요</p>
              </div>
              <button 
                onClick={() => setShowWritingRoom(false)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium text-gray-700">제목</Label>
                  <Input
                    id="title"
                    placeholder="예: 오늘의 작은 행복"
                    {...form.register('title')}
                    className={cn(
                      'rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-[#4a7c59] h-12',
                      form.formState.errors.title && 'border-red-400'
                    )}
                  />
                  {form.formState.errors.title && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content" className="text-sm font-medium text-gray-700">내용</Label>
                  <Textarea
                    id="content"
                    placeholder="오늘 하루는 어땠나요? 자유롭게 적어보세요..."
                    rows={10}
                    {...form.register('content')}
                    className={cn(
                      'rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-[#4a7c59] resize-none',
                      form.formState.errors.content && 'border-red-400'
                    )}
                  />
                  {form.formState.errors.content && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.content.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-700">날짜 및 시간</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full justify-start text-left font-normal rounded-xl border-gray-200 bg-gray-50 hover:bg-white h-12',
                          !form.watch('timestamp') && 'text-gray-400'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {form.watch('timestamp') ? (
                          format(form.watch('timestamp'), 'PPP HH:mm', { locale: ko })
                        ) : (
                          <span>날짜를 선택하세요</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 rounded-xl" align="start">
                      <Calendar
                        mode="single"
                        selected={form.watch('timestamp')}
                        onSelect={(date) => {
                          if (date) {
                            const currentDate = form.watch('timestamp') || new Date()
                            const newDate = new Date(date)
                            newDate.setHours(currentDate.getHours())
                            newDate.setMinutes(currentDate.getMinutes())
                            form.setValue('timestamp', newDate)
                          }
                        }}
                        initialFocus
                      />
                      <div className="p-3 border-t">
                        <Input
                          type="time"
                          value={format(form.watch('timestamp') || new Date(), 'HH:mm')}
                          onChange={(e) => {
                            const [hours, minutes] = e.target.value.split(':')
                            const currentDate = form.watch('timestamp') || new Date()
                            const newDate = new Date(currentDate)
                            newDate.setHours(parseInt(hours) || 0)
                            newDate.setMinutes(parseInt(minutes) || 0)
                            form.setValue('timestamp', newDate)
                          }}
                          className="w-full rounded-lg"
                        />
                      </div>
                    </PopoverContent>
                  </Popover>
                  {form.formState.errors.timestamp && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.timestamp.message}
                    </p>
                  )}
                </div>

                {submitStatus.type && (
                  <div
                    className={cn(
                      'p-4 rounded-xl',
                      submitStatus.type === 'success'
                        ? 'bg-green-50 text-green-800 border border-green-200'
                        : 'bg-red-50 text-red-800 border border-red-200'
                    )}
                  >
                    {submitStatus.message}
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowWritingRoom(false)}
                    className="flex-1 rounded-xl border-gray-200 hover:bg-gray-50 h-12"
                  >
                    취소
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-[#4a7c59] hover:bg-[#3d6a4a] text-white rounded-xl h-12 font-medium"
                  >
                    {isSubmitting ? '저장 중...' : '저장하기'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
