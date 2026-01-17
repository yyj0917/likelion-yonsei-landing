import { Instagram, Globe, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 mb-16">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-2">
              LIKELION <span className="text-yonsei-light">YONSEI</span>
            </h2>
            <p className="text-gray-400 mb-6">
              내 아이디어를 내 손으로 실현하다.<br />
              연세대학교 멋쟁이사자처럼 14기
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="https://www.instagram.com/likelion_yonsei" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-likelion-orange hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-likelion-orange hover:text-white transition-colors">
                <Globe size={20} />
              </a>
              <a href="mailto:ehho0916@yonsei.ac.kr" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-likelion-orange hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-6">
             <div className="text-center md:text-right">
                <p className="text-gray-500 text-sm mb-2">모집 기간이 얼마 남지 않았습니다</p>
                <a 
                  href="https://forms.google.com" 
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-8 py-4 bg-likelion-orange text-white font-bold rounded-xl hover:bg-orange-600 transition-all transform hover:scale-105 shadow-xl shadow-likelion-orange/20"
                >
                  지금 바로 지원하기
                </a>
             </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-600 text-sm">
          <p>&copy; 2026 LIKELION YONSEI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}