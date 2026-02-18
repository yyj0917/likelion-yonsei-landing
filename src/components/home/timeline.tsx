"use client";
import Image from "next/image";
import { CURRICULUM } from "@/data/about";

export default function Timeline() {
  return (
    <section id="curriculum" className="py-24 bg-black overflow-hidden">
      <div className="max-w-6xl mx-auto px-6"> {/* 가로폭을 조금 더 넓혔습니다 */}
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-yonsei-light tracking-widest uppercase mb-3">
            Roadmap
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white">
            1년의 여정
          </h3>
        </div>

        <div className="relative">
          {/* 중앙 수직선 */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yonsei-light via-yonsei-light/40 to-transparent"></div>

          <div className="space-y-10"> {/* 사진이 들어가므로 간격을 더 넓혔습니다 */}
            {CURRICULUM.map((item, index) => (
              <div
                key={index}
                className="group relative flex flex-col md:flex-row items-start md:items-center"
              >
                {/* 중앙 Dot */}
              <div
                className="absolute left-6 md:left-1/2 top-6 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 w-10 h-10 rounded-full border-4 border-black z-10 transition-all duration-300 group-hover:scale-125 bg-yonsei-light shadow-[0_0_15px_rgba(59,123,217,0.4)]"
              ></div>

                {/* 텍스트 영역 (index에 따라 왼쪽/오른쪽 교차) */}
                  <div
                    className={`pl-16 md:pl-0 w-full md:w-1/2 ${
                      index % 2 === 0
                        ? "md:order-2 md:pl-16 text-left"
                        : "md:order-1 md:pr-16 text-left md:text-right"
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
                  
                  <p className="text-gray-500 leading-relaxed break-keep text-sm md:text-base whitespace-pre-wrap">
                    {item.title === "기초 교육 & 스터디" && "트랙별 기초 개념을 탄탄히 다지고,\n팀 프로젝트를 통해 실제 서비스 개발 역량을 체계적으로 쌓아갑니다."}
                    {item.title === "아이디어톤" && "전국 멋쟁이사자처럼 대학생들과 함께\n서비스 아이디어를 기획하고 발전시키는 아이디어 집중 프로그램입니다. "}
                    {item.title === "중앙 해커톤" && (
                      <>
                        전국 81개 대학, 2,500명 이상이 참여하는
                        {"\n"}
                        멋쟁이사자처럼의 대표 연합 해커톤입니다.
                        {"\n"}
                        <a
                          href="https://youtu.be/NOQfZti_HlQ"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 mt-3 text-sm font-medium text-white"
                        >
                          🎬 중앙 해커톤 현장 영상 보기
                          <span className="group-hover:translate-x-1 transition-transform">
                           →
                          </span>
                        </a>
                      </>
                    )}
                    {item.title === "신촌톤" && "연세대·서강대·이화여대·홍익대가 연합하여\n아이디어를 실제 MVP로 구현하는 캠퍼스 연합 해커톤입니다. "}
                    {item.title === "신촌 대학 연합 SW 창업 경진 대회" && "1년간 개발한 서비스를 전문가 앞에서 발표하며, 창업 가능성과 시장 경쟁력을 검증받는 자리입니다. 연세대학교 SW중심대학사업단의 지원 아래 진행됩니다."}
                  </p>
                </div>

                {/* ✅ 사진 영역 (텍스트의 맞은편에 배치) */}
                <div
                  className={`hidden md:block w-1/2 ${
                    index % 2 === 0 ? "md:order-1 md:pr-16" : "md:order-2 md:pl-16"
                  }`}
                >
                  <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group-hover:border-yonsei-light/30 transition-colors">
                    <Image
                      src={`/images/roadmap/step-${index + 1}.jpg`} // public/images/roadmap/ 폴더에 이미지를 준비하세요
                      alt={item.title}
                      fill
                      className="object-cover opacity-100 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    {/* 이미지 위 은은한 그라데이션 오버레이 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}