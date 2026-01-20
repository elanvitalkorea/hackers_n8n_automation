import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Diary Story - 당신의 이야기",
  description: "매일의 소중한 순간을 기록하고 되돌아보세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${notoSansKr.variable} antialiased`}
        style={{ fontFamily: "'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
