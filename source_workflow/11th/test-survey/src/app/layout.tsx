import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 자동화 강의 만족도 조사",
  description: "AI x n8n 업무 자동화 실전 프로젝트 강의 만족도 조사",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}


