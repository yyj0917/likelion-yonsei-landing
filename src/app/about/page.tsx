import type { Metadata } from "next";
import Navbar from "@/components/home/navbar";
import Footer from "@/components/home/footer";
import AboutContent from "@/components/about/about-content";
import TechStack from "@/components/about/tech-stack";
import Activities from "@/components/about/activities";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "소개 | 연세대학교 멋쟁이사자처럼",
  description:
    "연세대학교 멋쟁이사자처럼은 기획/디자인, 프론트엔드, 백엔드 세 트랙으로 구성된 창업/IT 동아리입니다. 아이디어를 현실로 만드는 여정을 함께하세요.",
};

export default function AboutPage() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-likelion-orange selection:text-white">
      <Navbar />
      <div className="pt-12">
        <AboutContent />
        <TechStack />
        <Activities />
      </div>
      <Footer />
    </main>
  );
}
