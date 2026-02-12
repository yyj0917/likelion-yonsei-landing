import { CURRICULUM } from "@/data/about";

export default function Timeline() {
  return (
    <section id="curriculum" className="py-24 bg-black overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-yonsei-light tracking-widest uppercase mb-3">
            Roadmap
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white">
            1년의 여정
          </h3>
        </div>

        <div className="relative">
          {/* ✅ 중앙 수직선: 연세 블루 정체성 유지 */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yonsei-blue via-yonsei-blue/40 to-transparent"></div>

          <div className="space-y-24">
            {CURRICULUM.map((item, index) => (
              <div
                key={index}
                className="group relative flex flex-col md:flex-row gap-8 items-start md:items-center"
              >
                {/* ✅ Dot 디자인: 
                   - 배경색은 CURRICULUM 데이터의 dotColor 활용 
                   - Shadow를 dotColor와 동기화하여 은은하게 빛나는 효과 추가
                */}
                <div 
                  className={`absolute left-0 md:left-1/2 w-10 h-10 -ml-[20px] rounded-full border-4 border-black z-10 transition-all duration-300 group-hover:scale-125 bg-yonsei-blue shadow-[0_0_15px_rgba(59,123,217,0.4)]`}
                ></div>

                {/* 콘텐츠 블록 */}
                <div
                  className={`pl-12 md:pl-0 w-full md:w-1/2 ${
                    index % 2 === 0 ? "md:ml-auto md:pl-16 text-left" : "md:mr-auto md:pr-16 text-left md:text-right"
                  }`}
                >
                  <div className={`flex items-center gap-3 mb-2 ${index % 2 !== 0 ? "md:justify-end" : "justify-start"}`}>
                    <span className="text-sm font-black text-yonsei-light tracking-tighter uppercase">
                      {item.phase}
                    </span>
                    {item.tag && (
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-white/10 text-white/60 rounded border border-white/10">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  
                  <h4 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-yonsei-light transition-colors">
                    {item.title}
                  </h4>
                  
                  <p className="text-gray-500 leading-relaxed break-keep text-sm md:text-base">
                    {/* 데이터에 기반한 고정 설명 문구 */}
                    {item.title === "기초 교육 & 스터디" && "트랙별 기초 문법부터 협업 워크숍까지, 실무 역량을 다집니다."}
                    {item.title === "아이디어톤" && "전국 멋사 대학생들이 모여 기발한 서비스 기획을 경쟁하는 축제입니다."}
                    {item.title === "중앙 해커톤" && "무박 2일간 아이디어를 직접 개발하여 MVP를 완성하는 멋사의 꽃입니다."}
                    {item.title === "자유주제 프로젝트 개발" && "팀별로 자유로운 주제를 선정하여 실제 배포 가능한 서비스를 구축합니다."}
                    {item.title === "창업 경진 대회" && "1년의 성과를 전문가 앞에서 선보이며 실제 창업 가능성을 검증받습니다."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}