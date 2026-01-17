
interface TimelineItem {
    date: string;
    title: string;
    description: string;
  }
const timelineData: TimelineItem[] = [
  {
    date: '02.19 (목) ~ 02.25 (수)',
    title: '서류 접수',
    description: '구글 폼을 통해 지원서를 제출합니다. 시간을 엄수해주세요.'
  },
  {
    date: '03.02 (화)',
    title: '1차 합격자 발표',
    description: '서류 심사 합격자에 한해 개별 문자로 면접 일정을 안내드립니다.'
  },
  {
    date: '03.05 (목) ~ 03.06 (금)',
    title: '면접 진행',
    description: '연세대학교 신촌캠퍼스에서 대면 면접이 진행됩니다.'
  },
  {
    date: '03.09 (월)',
    title: '최종 합격자 발표',
    description: '14기 아기사자로 함께할 최종 합격자를 발표합니다.'
  },
  {
    date: '03.12 (목)',
    title: '14기 오리엔테이션',
    description: '모든 합격자는 필수로 참석해야 합니다.'
  }
];

export default function Timeline() {
  return (
    <section id="timeline" className="py-24 bg-black">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-likelion-orange font-bold tracking-widest uppercase mb-2">Schedule</h2>
          <h3 className="text-4xl font-bold text-white">모집 일정</h3>
        </div>

        <div className="relative">
          {/* Vertical Line - Blue (Yonsei Identity) */}
          <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yonsei-blue via-yonsei-blue/40 to-transparent"></div>

          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-start md:items-center`}>
                
                {/* Dot - Orange (Like Lion Milestones) */}
                <div className="absolute left-0 md:left-1/2 w-10 h-10 -ml-[20px] rounded-full border-4 border-black bg-likelion-orange z-10 shadow-[0_0_15px_rgba(255,119,16,0.6)]"></div>

                {/* Content */}
                <div className={`pl-12 md:pl-0 w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 text-left md:text-right' : 'md:pl-16 text-left'}`}>
                  <span className="inline-block px-3 py-1 mb-2 text-sm font-bold text-white bg-yonsei-blue/40 rounded border border-yonsei-light/20">
                    {item.date}
                  </span>
                  <h4 className="text-2xl font-bold text-white mb-2">{item.title}</h4>
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