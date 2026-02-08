import { Layout, Server, PenTool, LucideIcon } from "lucide-react";
import { TRACKS } from "@/data/tracks";

/**
 * iconName(문자열) → Lucide 아이콘 컴포넌트 매핑
 * 데이터 파일에서는 문자열만 저장하고, 렌더링 시 여기서 실제 아이콘으로 변환합니다.
 */
const ICON_MAP: Record<string, LucideIcon> = {
  layout: Layout,
  server: Server,
  "pen-tool": PenTool,
};

/**
 * 모집 분야(트랙) 카드 섹션 (홈 페이지)
 * - 3개 트랙을 3열 그리드로 표시
 * - hover 시 gradient 오버레이 + 위로 살짝 이동
 * @data TRACKS (from @/data/tracks) — 트랙 목록 (id, title, description, skills, color)
 */
export default function Tracks() {
  return (
    <section
      id="tracks"
      className="py-24 bg-neutral-900 relative overflow-hidden"
    >
      {/* Background Decorative Blobs - Keep Blue for Atmosphere (20%) */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-yonsei-blue/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yonsei-blue/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-yonsei-light font-bold tracking-widest uppercase mb-2">
            Recruitment Tracks
          </h2>
          <h3 className="text-4xl font-bold text-white">모집 분야</h3>
          <p className="text-gray-400 mt-4">
            자신의 열정을 펼칠 분야를 선택하세요.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {TRACKS.map((track) => {
            const Icon = ICON_MAP[track.iconName];
            return (
              <div
                key={track.id}
                className="group relative bg-black border border-white/10 rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300"
              >
                {/* Gradient Border Effect on Hover */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${track.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>

                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${track.color} flex items-center justify-center mb-6 text-white shadow-lg`}
                >
                  <Icon size={28} />
                </div>

                <h4 className="text-2xl font-bold text-white mb-4">
                  {track.title}
                </h4>
                <p className="text-gray-400 mb-6 leading-relaxed min-h-[80px]">
                  {track.description}
                </p>

                <div className="space-y-3">
                  <p className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                    Keywords
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {track.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300"
                      >
                        {skill}
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
