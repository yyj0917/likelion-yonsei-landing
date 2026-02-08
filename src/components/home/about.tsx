import { Code2, Rocket, Users } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all hover:border-white/50 group">
      <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-sm font-bold text-yonsei-light tracking-widest uppercase mb-3">
            About Us
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
            가능성을 <span className="text-yonsei-light">현실로</span>,<br />
            우리는 함께 성장합니다.
          </h3>
          <p className="text-gray-400 max-w-2xl text-lg">
            멋쟁이사자처럼은 국내 최대 규모의 IT 창업 동아리입니다. 연세대학교
            멋쟁이사자처럼은 기술을 통해 세상을 변화시키고자 하는 열정적인
            학생들이 모여 서로 배우고, 나누며, 함께 성장하는 커뮤니티입니다.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Code2 size={24} />}
            title="실전 웹 개발"
            description="기획부터 디자인, 개발, 배포까지. 단순한 이론 공부가 아닌 실제 서비스를 만들어보는 프로젝트 중심의 커리큘럼을 경험하세요."
          />
          <FeatureCard
            icon={<Users size={24} />}
            title="네트워킹"
            description="다양한 전공의 열정적인 동료들과 함께하며, 전국 연합 해커톤 등 타 대학 멋쟁이사자처럼과의 교류 기회를 제공합니다."
          />
          <FeatureCard
            icon={<Rocket size={24} />}
            title="창업과 성장"
            description="당신의 아이디어가 MVP(Minimum Viable Product)가 되는 과정. 수많은 스타트업 창업가를 배출한 멋사에서 창업의 꿈을 키워보세요."
          />
        </div>
      </div>
    </section>
  );
}
