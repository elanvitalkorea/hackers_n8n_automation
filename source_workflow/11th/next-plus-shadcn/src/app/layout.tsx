import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Next.js TS + shadcn/ui',
  description: '서버/클라이언트 컴포넌트 실습',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={cn(
        inter.variable,
        "font-sans antialiased bg-background text-foreground min-h-screen"
      )}>
        {children}
      </body>
    </html>
  );
}
