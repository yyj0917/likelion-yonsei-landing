import { Code2, Rocket, Users } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 hover:border-yonsei-light transition-all hover:border-white/50 group">
      <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}

const STATS = [
  { number: "14", label: "현재 기수", suffix: "기" },
  { number: "3", label: "트랙 운영", suffix: "개" },
  { number: "50", label: "누적 프로젝트", suffix: "+" },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-sm font-bold text-yonsei-light tracking-widest uppercase mb-3">
            About Us
          </h2>
          <div className="mb-20">
            {/* GRID WRAPPER */}
            <div className="grid lg:grid-cols-2 gap-16 items-start">

              {/* LEFT TEXT BLOCK */}
              <div>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                <span>
                    가능성을 <span className="text-yonsei-light">현실로</span>,
                  </span>
                  <span className="block mt-3">
                    우리는 함께 성장합니다.
                  </span>
                </h3>
              </div>

              {/* RIGHT STATS BLOCK */}
              <div className="flex gap-8 justify-end">
                {STATS.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-5xl font-black text-white tabular-nums">
                      {stat.number}
                      <span className="text-yonsei-light text-xl ml-1">
                        {stat.suffix}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-gray-400 max-w-5xl text-lg leading-relaxed">
                  국내 최대 규모의 IT 창업 네트워크, 멋쟁이사자처럼 연세대학교입니다. <br/>
                  우리는 단순한 코딩을 넘어, 아이디어를 현실로 구현하는 Maker들의 커뮤니티입니다. <br/>
                  치열하게 고민하고 끝까지 실행하며, 상상에 머물던 생각을 실제 서비스로 완성합니다.
                </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Code2 size={24} />}
            title="실전 웹 개발"
            description="기획부터 디자인, 개발, 배포까지. 아이디어를 실제 프로덕트로 완성하는 전 과정을 경험합니다."
          />
          <FeatureCard
            icon={<Users size={24} />}
            title="네트워킹"
            description="다양한 전공의 동료들과 협업하며, 전국 멋쟁이사자처럼 네트워크를 통해 더 넓은 연결을 경험합니다."
          />
          <FeatureCard
            icon={<Rocket size={24} />}
            title="창업과 성장"
            description="당신의 아이디어를 MVP로 구현하고, 실제 시장 가능성을 검증하는 과정. 창업가적 사고를 키워갑니다."
          />
        </div>
      </div>
    </section>
  );
}
