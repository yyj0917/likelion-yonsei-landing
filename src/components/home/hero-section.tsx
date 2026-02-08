'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/constants/site';

/**
 * 메인 히어로 섹션
 * - Canvas API로 별(star) 파티클 애니메이션 배경 렌더링
 * - 기수 배지, 메인 타이틀, CTA 버튼, 스크롤 인디케이터
 * - 리사이즈 시 캔버스 자동 재조정
 * @data SITE_CONFIG (from @/constants/site) — 기수 번호, 조직명
 */
export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    // Particle system variables
    let stars: { x: number; y: number; radius: number; vx: number; vy: number; alpha: number; targetAlpha: number }[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      // Adjust density of stars
      const numStars = Math.floor((canvas.width * canvas.height) / 3000);
      
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          alpha: Math.random(),
          targetAlpha: Math.random()
        });
      }
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 1. Draw Background Gradient (Deep Space to Yonsei Blue glow at bottom)
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#020205');     // Almost black
      gradient.addColorStop(0.6, '#050A14');   // Deep dark blue
      gradient.addColorStop(1, '#001E40');     // Yonsei Dark Blue at bottom
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Draw Stars
      stars.forEach((star) => {
        // Update twinkling
        if (Math.abs(star.alpha - star.targetAlpha) < 0.01) {
          star.targetAlpha = Math.random();
        } else {
          star.alpha += (star.targetAlpha - star.alpha) * 0.02;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Update position
        star.x += star.vx;
        star.y += star.vy;

        // Wrap around screen
        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black">
      {/* Canvas Background */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
      />
      
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none"></div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-10">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-yonsei-light/30 bg-yonsei-blue/20 backdrop-blur-md text-yonsei-light font-semibold text-sm tracking-widest uppercase animate-fade-in-up">
          Yonsei University LikeLion {SITE_CONFIG.generation}th
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter leading-tight animate-fade-in-up delay-100">
          BUILD YOUR <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-yonsei-light to-[#5C94E5]">
            UNIVERSE
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-light leading-relaxed animate-fade-in-up delay-200">
          {SITE_CONFIG.name} {SITE_CONFIG.generation}기 아기사자를 모집합니다.<br className="hidden md:block"/>
          당신의 아이디어를 현실로 만드는 여정을 지금 시작하세요.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-300">
          <Link 
            href="/apply" 
            className="group relative px-8 py-4 bg-likelion-orange text-white rounded-full font-bold text-lg hover:bg-orange-600 transition-all flex items-center gap-2 overflow-hidden shadow-lg shadow-likelion-orange/20"
          >
            <span className="relative z-10">{SITE_CONFIG.generation}기 지원하기</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50 z-10">
        <ChevronDown size={32} />
      </div>
    </section>
  );
}
