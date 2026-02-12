import { Layout, Server, PenTool, LucideIcon, CheckCircle2 } from "lucide-react";
import { TRACK_DETAILS } from "@/data/tracks"; // 파일명 확인 필요

const ICON_MAP: Record<string, LucideIcon> = {
  layout: Layout,
  server: Server,
  "pen-tool": PenTool,
};

export default function Tracks() {
  return (
    <section id="tracks" className="py-24 bg-black relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-yonsei-blue/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-sm font-bold text-yonsei-light tracking-widest uppercase mb-3">
            Recruitment Tracks
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            14기 모집 트랙
          </h3>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed break-keep">
            연세대학교 멋쟁이사자처럼 14기에서는 세 가지 전문 트랙을 모집합니다. <br/>
            각 트랙별로 실무 중심의 커리큘럼을 통해 메이커로서의 성장을 지원합니다.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {TRACK_DETAILS.map((track) => {
            const Icon = ICON_MAP[track.iconName];
            return (
              <div
                key={track.id}
                className={`group relative bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/[0.08] transition-all duration-500 ${track.accentColor}`}
              >
                {/* 트랙 아이콘 및 타이틀 */}
                <div className="flex items-center gap-4 mb-8">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${track.accentGradient} flex items-center justify-center text-white shadow-lg`}>
                    <Icon size={28} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white">{track.title}</h4>
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">{track.subtitle}</p>
                  </div>
                </div>

                {/* 상세 설명 */}
                <p className="text-gray-400 mb-8 leading-relaxed break-keep text-sm">
                  {track.description}
                </p>

                {/* 학습 하이라이트 (Highlights) */}
                <div className="space-y-3 mb-10">
                  <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-4">
                    What you'll learn
                  </p>
                  {track.highlights.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      {/* 💡 text-yonsei-light 대신 track.iconColor 적용 */}
                      <CheckCircle2 
                        size={16} 
                        className={`${track.iconColor} mt-1 shrink-0 transition-colors duration-300`} 
                      />
                      <span className="text-gray-300 text-sm leading-snug break-keep">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* 기술 스택 (Tech Stack) */}
                <div className="pt-6 border-t border-white/10">
                  <div className="flex flex-wrap gap-2">
                    {track.techStack.map((tech) => (
                      <span
                        key={tech.name}
                        className={`px-3 py-1 rounded-full text-[11px] font-medium border ${tech.color}`}
                      >
                        {tech.name}
                      </span>
                    ))}
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