import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '../styles/common.css'; // 새로 추가: 일반 CSS import

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Next.js TS 실습',
  description: '서버/클라이언트 컴포넌트 실습',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      {/* (1) body에 Tailwind 클래스를 추가해 배경색과 글꼴을 지정합니다. */}
      <body className={inter.className + " custom-body"} suppressHydrationWarning>
        <div className="main-layout">
          {children}
        </div>
      </body>
    </html>
  );
}
