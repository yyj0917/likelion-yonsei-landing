import { RECRUITMENT_TIMELINE } from "@/data/recruitment";

/**
 * 모집 일정 타임라인 (홈 페이지)
 * - 모바일: 왼쪽 수직 라인 + 오른쪽 콘텐츠
 * - 데스크탑: 중앙 수직 라인 + 좌우 교대 배치
 * @data RECRUITMENT_TIMELINE (from @/data/recruitment) — 일정 목록
 */
export default function Timeline() {
  return (
    <section id="timeline" className="py-24 bg-black">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-yonsei-light font-bold tracking-widest uppercase mb-2">
            Schedule
          </h2>
          <h3 className="text-4xl font-bold text-white">모집 일정</h3>
        </div>

        <div className="relative">
          {/* Vertical Line - Blue (Yonsei Identity) */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yonsei-blue via-yonsei-blue/40 to-transparent"></div>

          <div className="space-y-12">
            {RECRUITMENT_TIMELINE.map((item, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""} items-start md:items-center`}
              >
                {/* Dot - Orange (Like Lion Milestones) */}
                <div className="absolute left-0 md:left-1/2 w-10 h-10 -ml-[20px] rounded-full border-4 border-black bg-yonsei-light z-10 shadow-[0_0_15px_rgba(59,123,217,0.6)]"></div>

                {/* Content */}
                <div
                  className={`pl-12 md:pl-0 w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-16 text-left md:text-right" : "md:pl-16 text-left"}`}
                >
                  <span className="inline-block px-3 py-1 mb-2 text-sm font-bold text-white bg-yonsei-blue/40 rounded border border-yonsei-light/20">
                    {item.date}
                  </span>
                  <h4 className="text-2xl font-bold text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
