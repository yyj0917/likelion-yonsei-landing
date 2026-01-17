import Navbar from "@/components/home/navbar";
import Footer from "@/components/home/footer";

export const dynamic = 'force-static';

export default function ActivitiesPage() {
  return (
    <main className="bg-black min-h-screen text-white selection:bg-likelion-orange selection:text-white">
      <Navbar />
      <div className="pt-24">
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              활동
            </h1>
            <p className="text-gray-400 text-lg">
              준비 중입니다.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}

