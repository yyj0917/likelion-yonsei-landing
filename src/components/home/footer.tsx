import { Instagram, Globe, Mail } from "lucide-react";
import Image from "next/image";
import { SITE_CONFIG, SOCIAL_LINKS, ASSETS } from "@/constants/site";

/**
 * 사이트 푸터
 * - 로고, 태그라인, 기수 정보 표시
 * - 소셜 링크 (인스타그램, 웹사이트, 이메일)
 * - 구글 폼 지원 CTA 버튼
 * - 동적 연도 copyright
 * @data SITE_CONFIG, SOCIAL_LINKS, ASSETS (from @/constants/site)
 */
export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 mb-16">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-1 mb-2">
              <Image
                src={ASSETS.logo}
                alt="Logo"
                width={36}
                height={36}
              />
              <h2 className="text-3xl font-bold text-white">
                LIKELION <span className="text-yonsei-light">YONSEI</span>
              </h2>
            </div>
            <p className="text-gray-400 mb-6">
              {SITE_CONFIG.tagline}
              <br />
              {SITE_CONFIG.name} {SITE_CONFIG.generation}기
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-likelion-orange hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-likelion-orange hover:text-white transition-colors"
              >
                <Globe size={20} />
              </a>
              <a
                href={`mailto:${SOCIAL_LINKS.email}`}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-likelion-orange hover:text-white transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.nameShort}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
