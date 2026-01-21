import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '광고 캠페인 브리프 제출',
  description: '유튜버 매칭 캠페인 브리프를 제출하세요',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
