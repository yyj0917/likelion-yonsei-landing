import Navbar from "@/components/home/navbar";
import Footer from "@/components/home/footer";
import { ApplicationForm } from "@/components/apply/application-form";

export const metadata = {
  title: '지원하기 | 멋쟁이사자처럼 연세대학교',
  description: '멋쟁이사자처럼 연세대학교 14기 아기사자 모집',
};

export default function ApplyPage() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-likelion-orange selection:text-white">
      <Navbar />
      <div className="pt-24">
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6 text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              지원하기
            </h1>
            <p className="text-gray-400 text-lg">
              멋쟁이사자처럼 연세대학교 14기 아기사자 모집
            </p>
          </div>
          <ApplicationForm />
        </section>
      </div>
      <Footer />
    </main>
  );
}

