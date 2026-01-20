import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI 자동화 강의 만족도 조사',
  description: 'AI x n8n 업무 자동화 실전 프로젝트 강의 만족도 조사',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <main className="min-h-screen py-12 px-4">
          {children}
        </main>
      </body>
    </html>
  );
}

