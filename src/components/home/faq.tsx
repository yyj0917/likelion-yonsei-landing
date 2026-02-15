"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { FAQ_DATA } from "@/data/faq";

/**
 * 자주 묻는 질문(FAQ) 아코디언 섹션 (홈 페이지)
 * - 질문 클릭 시 답변 토글 (한 번에 하나만 열림)
 * @data FAQ_DATA (from @/data/faq) — 질문/답변 목록
 */
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-neutral-900">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-yonsei-light font-bold tracking-widest uppercase mb-2">
            Q&A
          </h2>
          <h3 className="text-4xl font-bold text-white">자주 묻는 질문</h3>
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((item, index) => (
            <div
              key={index}
              className={`rounded-xl overflow-hidden transition-all duration-300 border
                ${
                  openIndex === index
                    ? "bg-black/80 border-yonsei-light shadow-[0_0_25px_rgba(59,130,246,0.15)]"
                    : "bg-black/50 border-white/10 hover:border-yonsei-light/30"
                }`}
            >
              <button
                className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium text-white">
                  {item.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="text-yonsei-light flex-shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="text-gray-400 flex-shrink-0 ml-4" />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-48 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/5 pt-4">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
