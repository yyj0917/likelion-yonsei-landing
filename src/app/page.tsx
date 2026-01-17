import Navbar from "@/components/home/navbar";
import Hero from "@/components/home/hero-section";
import Footer from "@/components/home/footer";
import About from "@/components/home/about";
import Tracks from "@/components/home/tracks";
import Timeline from "@/components/home/timeline";
import FAQ from "@/components/home/faq";

// Force static generation
export const dynamic = 'force-static';

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://likelion-yonsei.vercel.app/#organization",
        "name": "연세대학교 멋쟁이사자처럼",
        "alternateName": "LikeLion Yonsei",
        "url": "https://likelion-yonsei.vercel.app",
        "logo": "https://likelion-yonsei.vercel.app/favicon.ico",
        "description": "연세대학교 멋쟁이사자처럼은 기술을 통해 세상을 변화시키고자 하는 열정적인 학생들이 모여 서로 배우고, 나누며, 함께 성장하는 커뮤니티입니다.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "서울",
          "addressRegion": "서울특별시",
          "addressCountry": "KR"
        },
        "sameAs": [
          "https://www.instagram.com/likelion_yonsei"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://likelion-yonsei.vercel.app/#website",
        "url": "https://likelion-yonsei.vercel.app",
        "name": "연세대학교 멋쟁이사자처럼 14기 모집",
        "description": "연세대학교 멋쟁이사자처럼 14기 아기사자 모집 중",
        "publisher": {
          "@id": "https://likelion-yonsei.vercel.app/#organization"
        },
        "inLanguage": "ko-KR",
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://likelion-yonsei.vercel.app/?q={search_term_string}"
          },
          "query-input": "required name=search_term_string"
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="bg-black min-h-screen text-white selection:bg-likelion-orange selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <Tracks />
      <Timeline />
      <FAQ />
      <Footer />
      </main>
    </>
  );
}
