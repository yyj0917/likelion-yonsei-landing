import Navbar from "@/components/home/navbar";
import Footer from "@/components/home/footer";
import { ApplicationForm } from "@/components/apply/application-form";

export const metadata = {
  title: "지원하기 | 멋쟁이사자처럼 연세대학교",
  description: "멋쟁이사자처럼 연세대학교 14기 아기사자 모집",
};

export default function ApplyPage() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-likelion-orange selection:text-white">
      <Navbar />
      <div className="pt-24">
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6 text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              14기 <span className="text-likelion-orange">아기사자</span> 모집
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              멋쟁이사자처럼{" "}
              <span className="text-yonsei-light">연세대학교</span> 와 함께
              성장할 14기<span className="text-likelion-orange"> 아기사자</span>
              를 모집합니다.
              <br />
              아래 내용을 확인하시고 기간 내에 지원해주세요.
            </p>
          </div>
          <ApplicationForm />
        </section>
      </div>
      <Footer />
    </main>
  );
}
