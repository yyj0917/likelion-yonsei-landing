import type { Metadata } from "next";
import Navbar from "@/components/home/navbar";
import Footer from "@/components/home/footer";
import AboutHero from "@/components/about/about-hero";
import AboutContent from "@/components/about/about-content";
import TechStack from "@/components/about/tech-stack";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "소개 | 연세대학교 멋쟁이사자처럼",
  description: "연세대학교 멋쟁이사자처럼에서 더불어 배우며 성장하는 열린 개발 커뮤니티를 형성하세요. 기획부터 웹개발까지 기초를 탄탄히 다지고, 실용적 개발 지식을 익힙니다.",
};

export default function AboutPage() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-likelion-orange selection:text-white">
      <Navbar />
      <div className="pt-24">
        <AboutHero />
        <AboutContent />
        <TechStack />
      </div>
      <Footer />
    </main>
  );
}

