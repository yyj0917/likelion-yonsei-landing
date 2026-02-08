import { Layout, Server, PenTool, ArrowRight, LucideIcon } from "lucide-react";
import { TRACK_DETAILS } from "@/data/tracks";

/** iconName(문자열) → Lucide 아이콘 컴포넌트 매핑 */
const ICON_MAP: Record<string, LucideIcon> = {
  layout: Layout,
  server: Server,
  "pen-tool": PenTool,
};

/**
 * About 페이지 — 트랙 상세 소개 섹션
 * - 각 트랙을 전체 폭 카드로 표시 (좌: 정보 + 태그, 우: What you'll learn)
 * - hover 시 왼쪽 gradient 바 표시
 * @data TRACK_DETAILS (from @/data/tracks) — 상세 트랙 정보 (커리큘럼, 기술 스택 포함)
 */
export default function TechStack() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-yonsei-blue/8 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-yonsei-light font-semibold text-sm tracking-widest uppercase">
            Our Tracks
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            세 가지 트랙
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl">
            각 트랙별 전문 커리큘럼으로 깊이 있는 학습과 실전 경험을 제공합니다.
          </p>
        </div>

        {/* Track Cards */}
        <div className="space-y-6">
          {TRACK_DETAILS.map((track) => {
            const Icon = ICON_MAP[track.iconName];
            return (
              <div
                key={track.id}
                className={`group relative bg-white/2 border border-white/8 ${track.accentColor} rounded-3xl p-8 md:p-10 transition-all duration-500 overflow-hidden`}
              >
                {/* Hover gradient overlay */}
                <div
                  className={`absolute top-0 left-0 w-1 h-full bg-linear-to-b ${track.accentGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-l-3xl`}
                />

                <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12">
                  {/* Left: Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className={`w-12 h-12 rounded-2xl bg-linear-to-br ${track.accentGradient} p-px`}
                      >
                        <div className="w-full h-full rounded-2xl bg-black/80 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {track.title}
                        </h3>
                        <p className="text-sm text-gray-500 font-medium">
                          {track.subtitle}
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-400 leading-relaxed mb-6 text-base md:text-lg">
                      {track.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2">
                      {track.techStack.map((tech) => (
                        <span
                          key={tech.name}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border ${tech.color}`}
                        >
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right: Highlights */}
                  <div className="lg:w-[360px] shrink-0">
                    <div className="bg-white/3 rounded-2xl p-6 border border-white/6">
                      <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-5">
                        What you&apos;ll learn
                      </h4>
                      <ul className="space-y-4">
                        {track.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <ArrowRight className="w-4 h-4 text-likelion-orange mt-0.5 shrink-0" />
                            <span className="text-gray-300 text-sm leading-relaxed">
                              {highlight}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
