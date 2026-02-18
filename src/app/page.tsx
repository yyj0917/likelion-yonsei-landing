import Navbar from "@/components/home/navbar";
import Hero from "@/components/home/hero-section";
import Footer from "@/components/home/footer";
import About from "@/components/home/about";
import Tracks from "@/components/home/tracks";
import Timeline from "@/components/home/timeline";
import FAQ from "@/components/home/faq";
import { SITE_CONFIG, SOCIAL_LINKS, ASSETS } from "@/constants/site";

/** 빌드 시 정적 생성 (ISR/SSR 비활성화) */
export const dynamic = "force-static";

/**
 * 메인(홈) 페이지
 *
 * 구성 순서:
 * 1. Navbar — 글로벌 네비게이션
 * 2. Hero — 캔버스 별 배경 + CTA
 * 3. About — 소개 섹션
 * 4. Tracks — 모집 분야
 * 5. Timeline — 모집 일정
 * 6. FAQ — 자주 묻는 질문
 * 7. Footer — 푸터
 *
 * Schema.org 구조화 데이터(JSON-LD)를 포함하여 SEO를 강화합니다.
 * 모든 데이터는 @/constants/site에서 가져와 하드코딩 없이 동적으로 생성합니다.
 */
export default function Home() {
  /** Schema.org JSON-LD — 검색 엔진이 조직/사이트 정보를 구조적으로 이해하도록 돕습니다 */
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_CONFIG.url}/#organization`,
        name: SITE_CONFIG.name,
        alternateName: SITE_CONFIG.nameEn,
        url: SITE_CONFIG.url,
        logo: `${SITE_CONFIG.url}${ASSETS.favicon}`,
        description: SITE_CONFIG.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: "서울",
          addressRegion: "서울특별시",
          addressCountry: "KR",
        },
        sameAs: [SOCIAL_LINKS.instagram],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_CONFIG.url}/#website`,
        url: SITE_CONFIG.url,
        name: `${SITE_CONFIG.name} ${SITE_CONFIG.generation}기 모집`,
        description: `${SITE_CONFIG.name} ${SITE_CONFIG.generation}기 아기사자 모집 중`,
        publisher: {
          "@id": `${SITE_CONFIG.url}/#organization`,
        },
        inLanguage: "ko-KR",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_CONFIG.url}/?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Hero />
      <About />
      <Tracks />
      <Timeline />
      <FAQ />
      <Footer />
    </>
  );
}
