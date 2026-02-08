import { Lightbulb, Flame, Code2, Trophy, LucideIcon } from "lucide-react";
import { ABOUT_EVENTS } from "@/data/activities";

/** iconName(문자열) → Lucide 아이콘 컴포넌트 매핑 */
const ICON_MAP: Record<string, LucideIcon> = {
  lightbulb: Lightbulb,
  flame: Flame,
  "code-2": Code2,
  trophy: Trophy,
};

/**
 * About 페이지 — 주요 활동 소개 섹션
 * - 아이디어톤, 해커톤, 신촌톤, 데모데이 4개의 이벤트 카드
 * - 2열 그리드 레이아웃, hover 시 gradient glow 효과
 * @data ABOUT_EVENTS (from @/data/activities) — 주요 이벤트 4개
 */
export default function Activities() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-likelion-orange/5 rounded-full blur-[150px] -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-yonsei-light font-semibold text-sm tracking-widest uppercase">
            Activities
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            우리가 하는 활동
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl">
            1년간 다양한 행사와 대회를 통해 성장하고, 네트워크를 넓혀갑니다.
          </p>
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ABOUT_EVENTS.map((event) => {
            const Icon = ICON_MAP[event.iconName];
            return (
              <div
                key={event.id}
                className={`group relative bg-white/2 border border-white/8 ${event.borderAccent} rounded-3xl p-8 md:p-10 transition-all duration-500 overflow-hidden`}
              >
                {/* Hover gradient glow */}
                <div
                  className={`absolute -top-20 -right-20 w-40 h-40 bg-linear-to-br ${event.accentColor} rounded-full blur-3xl opacity-0 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none`}
                />

                <div className="relative z-10">
                  {/* Icon + Badge */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`w-12 h-12 rounded-2xl ${event.iconBg} flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-500 font-medium">
                        {event.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 leading-relaxed text-base">
                    {event.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
