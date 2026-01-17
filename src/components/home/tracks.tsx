import { Layout, Server, PenTool, LucideIcon } from 'lucide-react';

interface Track {
    id: string;
    title: string;
    description: string;
    icon: LucideIcon;
    skills: string[];
    color: string;
  }
const tracks: Track[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    description: '사용자가 마주하는 인터페이스를 구현하며 최고의 사용자 경험(UX)을 설계합니다. React를 중심으로 모던 웹 기술을 깊이 있게 학습합니다.',
    icon: Layout,
    skills: ['HTML/CSS', 'JavaScript/TypeScript', 'React', 'Tailwind CSS'],
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'backend',
    title: 'Backend',
    description: '서비스의 핵심 로직과 데이터를 관리합니다. 서버 아키텍처를 설계하고, 안정적이고 효율적인 API를 구축하는 능력을 기릅니다.',
    icon: Server,
    skills: ['Python/Django', 'Java/Spring', 'Database', 'AWS/Deploy'],
    color: 'from-emerald-400 to-cyan-500'
  },
  {
    id: 'design-pm',
    title: 'Design / PM',
    description: '사용자의 니즈를 파악하여 서비스를 기획하고, 매력적인 UI/UX 디자인을 통해 시각적 가치를 전달합니다.',
    icon: PenTool,
    skills: ['Figma', 'UI/UX Design', 'Service Planning', 'Agile Methodology'],
    color: 'from-purple-500 to-indigo-500'
  }
];

export default function Tracks() {
  return (
    <section id="tracks" className="py-24 bg-neutral-900 relative overflow-hidden">
        {/* Background Decorative Blobs - Keep Blue for Atmosphere (20%) */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-yonsei-blue/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yonsei-blue/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-likelion-orange font-bold tracking-widest uppercase mb-2">Recruitment Tracks</h2>
          <h3 className="text-4xl font-bold text-white">모집 분야</h3>
          <p className="text-gray-400 mt-4">자신의 열정을 펼칠 분야를 선택하세요.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {tracks.map((track) => (
            <div 
              key={track.id} 
              className="group relative bg-black border border-white/10 rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300"
            >
              {/* Gradient Border Effect on Hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${track.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${track.color} flex items-center justify-center mb-6 text-white shadow-lg`}>
                <track.icon size={28} />
              </div>

              <h4 className="text-2xl font-bold text-white mb-4">{track.title}</h4>
              <p className="text-gray-400 mb-6 leading-relaxed min-h-[80px]">
                {track.description}
              </p>

              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Keywords</p>
                <div className="flex flex-wrap gap-2">
                  {track.skills.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}