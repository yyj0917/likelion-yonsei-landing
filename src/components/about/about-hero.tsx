import { SITE_CONFIG } from "@/constants/site";

/**
 * About 페이지 히어로 섹션
 * - 배경에 ambient gradient blob 3개 + 미세한 그리드 패턴
 * - 기수 배지, 메인 헤딩, 서브텍스트, 스크롤 인디케이터
 * @data SITE_CONFIG (from @/constants/site) — 조직명, 기수 번호
 */
export default function AboutHero() {
  return (
    <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Ambient gradient blobs */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-likelion-orange/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] bg-yonsei-light/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[64px_64px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-likelion-orange animate-pulse" />
          <span className="text-sm text-gray-300 font-medium tracking-wide">
            {SITE_CONFIG.name} {SITE_CONFIG.generation}기
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white leading-[1.1] mb-8 tracking-tight">
          아이디어를
          <br />
          <span className="bg-linear-to-r from-likelion-orange via-likelion-light to-yonsei-light bg-clip-text text-transparent">
            현실로 만드는 곳
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12">
          열정적인 학생들이 모여 기획, 디자인, 개발을 배우고
          <br className="hidden md:block" />
          실제 서비스를 만들어내는{" "}
          <span className="text-white font-semibold">창업/IT 동아리</span>
          입니다.
        </p>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center gap-2 text-gray-600">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-linear-to-b from-gray-600 to-transparent" />
        </div>
      </div>
    </section>
  );
}
