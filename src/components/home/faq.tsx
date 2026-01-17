'use client';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
interface FAQItem {
    question: string;
    answer: string;
  }
const faqData: FAQItem[] = [
  {
    question: '코딩 경험이 전혀 없어도 지원할 수 있나요?',
    answer: '네, 가능합니다. 멋쟁이사자처럼은 전공/비전공 무관하게 열정을 가진 분들을 환영합니다. 선발 후 기초부터 함께 학습해 나갈 수 있는 커리큘럼이 준비되어 있습니다.'
  },
  {
    question: '매주 세션은 언제 진행되나요?',
    answer: '정기 세션은 매주 목요일 저녁 7시부터 진행됩니다. 시험 기간에는 휴식기를 가지며, 해커톤 등 특별 행사는 주말에 진행될 수 있습니다.'
  },
  {
    question: '휴학생이나 졸업 유예자도 지원 가능한가요?',
    answer: '네, 연세대학교 재학생 및 휴학생, 졸업 유예자 모두 지원 가능합니다. 다만 1년 동안 성실하게 활동할 수 있어야 합니다.'
  },
  {
    question: '트랙 간 중복 지원이 가능한가요?',
    answer: '원칙적으로 중복 지원은 불가능합니다. 본인이 가장 관심 있고 열정을 쏟을 수 있는 하나의 트랙을 선택하여 지원해 주세요.'
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-neutral-900">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-likelion-orange font-bold tracking-widest uppercase mb-2">Q&A</h2>
          <h3 className="text-4xl font-bold text-white">자주 묻는 질문</h3>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className="bg-black/50 border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-likelion-orange/30"
            >
              <button
                className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium text-white">{item.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-likelion-orange flex-shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="text-gray-400 flex-shrink-0 ml-4" />
                )}
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
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