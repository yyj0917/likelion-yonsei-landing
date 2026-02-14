import type { Metadata } from "next";
import "./globals.css";
import { SITE_CONFIG } from "@/constants/site";

/**
 * 사이트 메타데이터 — SITE_CONFIG에서 동적으로 생성
 * 기수 변경 시 @/constants/site.ts만 수정하면 title, description, OG, Twitter 등
 * 모든 메타데이터가 자동으로 업데이트됩니다.
 */
export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} ${SITE_CONFIG.generation}기 모집`,
  description: `${SITE_CONFIG.name} ${SITE_CONFIG.generation}기 아기사자 모집 중. Frontend, Backend, Design/PM 트랙 지원 가능. 당신의 아이디어를 현실로 만드는 여정을 시작하세요.`,
  keywords: ["멋쟁이사자처럼", "연세대학교", `${SITE_CONFIG.generation}기`, "모집", "아기사자", "프로그래밍", "개발", "창업"],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  publisher: SITE_CONFIG.name,
  robots: "index, follow",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: `${SITE_CONFIG.name} ${SITE_CONFIG.generation}기 모집`,
    description: `${SITE_CONFIG.name} ${SITE_CONFIG.generation}기 아기사자를 모집합니다. 당신의 아이디어를 현실로 만드는 여정을 지금 시작하세요.`,
    type: "website",
    locale: "ko_KR",
    // 링크 썸네일 추가
    images: [
      {
        url: "/og-image.jpg", // public 폴더에 있는 이미지 파일명
        width: 1200,
        height: 630,
        alt: `${SITE_CONFIG.name} ${SITE_CONFIG.generation}기 모집`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.name} ${SITE_CONFIG.generation}기 모집`,
    description: `${SITE_CONFIG.name} ${SITE_CONFIG.generation}기 아기사자 모집 중`,
  },
  alternates: {
    canonical: SITE_CONFIG.url,
    languages: {
      ko: SITE_CONFIG.url,
    },
  },
};

/** 루트 레이아웃 — 전체 앱을 감싸는 최상위 레이아웃 */
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
