import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


export const metadata: Metadata = {
  title: "연세대학교 멋쟁이사자처럼 14기 모집",
  description: "연세대학교 멋쟁이사자처럼 14기 아기사자 모집 중. Frontend, Backend, Design/PM 트랙 지원 가능. 당신의 아이디어를 현실로 만드는 여정을 시작하세요.",
  keywords: ["멋쟁이사자처럼", "연세대학교", "14기", "모집", "아기사자", "프로그래밍", "개발", "창업"],
  authors: [{ name: "연세대학교 멋쟁이사자처럼" }],
  creator: "연세대학교 멋쟁이사자처럼",
  publisher: "연세대학교 멋쟁이사자처럼",
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "연세대학교 멋쟁이사자처럼 14기 모집",
    description: "연세대학교 멋쟁이사자처럼 14기 아기사자를 모집합니다. 당신의 아이디어를 현실로 만드는 여정을 지금 시작하세요.",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "연세대학교 멋쟁이사자처럼 14기 모집",
    description: "연세대학교 멋쟁이사자처럼 14기 아기사자 모집 중",
  },
  alternates: {
    canonical: "https://likelion-yonsei.vercel.app",
    languages: {
      ko: "https://likelion-yonsei.vercel.app",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className="antialiased"
      > 
        {children}
      </body>
    </html>
  );
}
