import {
  Flame,
  Rocket,
  Users,
  Code2,
  Lightbulb,
  GraduationCap,
  LucideIcon,
} from "lucide-react";
import { STATS, VALUES, CURRICULUM } from "@/data/about";

/** Value 카드의 iconName → Lucide 아이콘 매핑 */
const VALUE_ICON_MAP: Record<string, LucideIcon> = {
  rocket: Rocket,
  users: Users,
  "code-2": Code2,
  lightbulb: Lightbulb,
};

/**
 * About 페이지 메인 콘텐츠 (Bento Grid 레이아웃)
 *
 * 구성:
 * 1. 미션 카드 (2col × 2row) — 조직 소개 + 숫자 통계
 * 2. 커리큘럼 카드 (2col × 2row) — 1년 타임라인
 * 3. 가치 카드 (1col × 1row) × 4 — 핵심 가치 소개
 *
 * @data STATS (from @/data/about) — 숫자 통계 (기수, 트랙 수, 누적 프로젝트)
 * @data VALUES (from @/data/about) — 핵심 가치 4개
 * @data CURRICULUM (from @/data/about) — 1년 커리큘럼 타임라인
 */
export default function AboutContent() {
  return (
    <section className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-yonsei-light font-semibold text-sm tracking-widest uppercase">
            About Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
            LIKELION <span className="text-yonsei-light">YONSEI</span> ?
          </h2>
          <p className="text-gray-500 text-lg max-w-xl">
            기술과 열정으로 아이디어를 현실로 만드는 사람들
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Large Mission Card - spans 2 cols & 2 rows */}
          <div className="md:col-span-2 lg:row-span-2 relative bg-linear-to-br from-likelion-orange/10 via-likelion-orange/5 to-transparent border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col justify-between overflow-hidden group">
            {/* Decorative corner glow */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-likelion-orange/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-likelion-orange/20 flex items-center justify-center mb-6">
                <Flame className="w-6 h-6 text-likelion-orange" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-5 leading-tight">
                기술로 세상을 바꾸는
                <br />
                열정적인 커뮤니티
              </h3>
              <p className="text-gray-400 leading-relaxed text-base md:text-lg">
                멋쟁이사자처럼 연세대학교는 기술을 통해 자신의 아이디어를
                실현하고자 하는 열정적인 학생들의 모임입니다. 기획/디자인,
                프론트엔드, 백엔드 세 트랙으로 구성되어 1년간 함께 배우고
                성장하며, 실제 서비스를 만들어냅니다.
              </p>
            </div>

            {/* Stats */}
            <div className="relative z-10 flex gap-8 mt-8 pt-8 border-t border-white/10">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl md:text-4xl font-black text-white">
                    {stat.number}
                    <span className="text-likelion-orange text-2xl">
                      {stat.suffix}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum Overview Card - same height as mission card */}
          <div className="md:col-span-2 lg:col-span-2 lg:row-span-2 bg-linear-to-br from-yonsei-blue/10 to-transparent border border-white/10 rounded-3xl p-8 md:p-10 flex flex-col group overflow-hidden relative">
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-yonsei-light/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full">
              <div className="w-10 h-10 rounded-xl bg-yonsei-light/20 flex items-center justify-center mb-4">
                <GraduationCap className="w-5 h-5 text-yonsei-light" />
              </div>
              <h4 className="text-white font-bold text-xl mb-2">
                1년 커리큘럼
              </h4>
              <p className="text-gray-500 text-sm mb-6">
                1년간의 여정을 한눈에 확인하세요
              </p>

              {/* Vertical Timeline */}
              <div className="flex-1 flex flex-col justify-between">
                {CURRICULUM.map((item, i, arr) => (
                  <div key={item.phase} className="flex items-start gap-4">
                    {/* Dot + Line */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-3 h-3 rounded-full ${item.dotColor} shrink-0 mt-1 ring-4 ring-black/50`}
                      />
                      {i < arr.length - 1 && (
                        <div
                          className={`w-px flex-1 min-h-6 bg-linear-to-b ${item.lineColor} opacity-30`}
                        />
                      )}
                    </div>
                    {/* Content */}
                    <div className="pb-4">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {item.phase}
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-white font-semibold text-sm">
                          {item.title}
                        </p>
                        {item.tag && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-gray-400 font-medium">
                            {item.tag}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Value Cards */}
          {VALUES.map((value) => {
            const Icon = VALUE_ICON_MAP[value.iconName];
            return (
              <div
                key={value.title}
                className="bg-white/2 border border-white/8 rounded-3xl p-6 hover:bg-white/5 transition-all duration-300 group/card"
              >
                <div
                  className={`w-10 h-10 rounded-xl ${value.iconBg} flex items-center justify-center mb-4 group-hover/card:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-5 h-5 ${value.iconColor}`} />
                </div>
                <h4 className="text-white font-bold text-lg mb-2">
                  {value.title}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
