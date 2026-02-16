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
  
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
  
    let animationFrameId: number;
    let stars: any[] = [];
    let scrollProgress = 0;
  
    const STAR_COUNT = 2500;
  
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };
  
    const initStars = () => {
      stars = [];
  
      for (let i = 0; i < STAR_COUNT; i++) {
        // 🌌 구형 분포 (중앙 몰림 제거)
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const radius = 600 + Math.random() * 600;
  
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
  
        stars.push({
          x,
          y,
          z,
          size: Math.random() * 1.2 + 0.4,
          vx: (Math.random() - 0.5) * 0.02,
          vy: (Math.random() - 0.5) * 0.02,
          vz: (Math.random() - 0.5) * 0.02,
          twinklePhase: Math.random() * Math.PI * 2,
          connections: 0,
        });
      }
    };
  
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // 배경
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#020205");
      gradient.addColorStop(1, "#001E40");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      const rotationY = scrollProgress * 0.5;
  
      const projected: any[] = [];
  
      // ⭐ 3D 투영
      stars.forEach((star) => {
        const cosY = Math.cos(rotationY);
        const sinY = Math.sin(rotationY);
  
        const x = star.x * cosY - star.z * sinY;
        const z = star.x * sinY + star.z * cosY;
  
        const perspective = 900 / (900 + z);
  
        const screenX = x * perspective + canvas.width / 2;
        const screenY = star.y * perspective + canvas.height / 2;

        // 🌌 subtle drift
        star.x += star.vx;
        star.y += star.vy;
        star.z += star.vz;

        // 공간 경계 유지
        const maxRadius = 1200;
        const dist = Math.sqrt(star.x**2 + star.y**2 + star.z**2);
        if (dist > maxRadius) {
          star.x *= 0.95;
          star.y *= 0.95;
          star.z *= 0.95;
        }
  
        projected.push({
          screenX,
          screenY,
          z,
          perspective,
          size: star.size * perspective,
          connections: 0,
        });
  
        const depth = 900 + z;
        if (depth <= 50) return;
        
        const radius = Math.max(0.1, star.size * perspective);
        if (!isFinite(radius)) return;
        
        ctx.fillStyle = `rgba(255,255,255,${Math.max(
          0.08,
          perspective * 0.9
        )})`;
        
        ctx.beginPath();
        ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
        ctx.fill();
      });
  
      // ⭐ 엄격한 연결선
      const MAX_DISTANCE = 100;
      const MAX_DEPTH_DIFF = 120;
  
      for (let i = 0; i < projected.length; i++) {
        if (projected[i].connections >= 2) continue;
  
        for (let j = i + 1; j < projected.length; j++) {
          if (projected[j].connections >= 2) continue;
  
          const dx = projected[i].screenX - projected[j].screenX;
          const dy = projected[i].screenY - projected[j].screenY;
  
          if (Math.abs(dx) > MAX_DISTANCE) continue;
          if (Math.abs(dy) > MAX_DISTANCE) continue;
  
          const dist = Math.sqrt(dx * dx + dy * dy);
          const depthDiff = Math.abs(projected[i].z - projected[j].z);
  
          if (dist < MAX_DISTANCE && depthDiff < MAX_DEPTH_DIFF) {
            const alpha = 0.18 * (1 - dist / MAX_DISTANCE);
  
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(projected[i].screenX, projected[i].screenY);
            ctx.lineTo(projected[j].screenX, projected[j].screenY);
            ctx.stroke();
  
            projected[i].connections++;
            projected[j].connections++;
  
            if (projected[i].connections >= 2) break;
          }
        }
      }
  
      animationFrameId = requestAnimationFrame(draw);
    };
  
    // 스크롤 제어
    let progress = 0;
    let locked = true;
  
    document.body.style.overflow = "hidden";
  
    const handleWheel = (e: WheelEvent) => {
      if (!locked) return;
      e.preventDefault();
  
      progress += e.deltaY * 0.0006;
      progress = Math.max(0, Math.min(1, progress));
  
      scrollProgress = progress;
  
      if (progress >= 1) {
        locked = false;
        document.body.style.overflow = "auto";
  
        setTimeout(() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }, 200);
      }
    };
  
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", resizeCanvas);
  
    resizeCanvas();
    draw();
  
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("wheel", handleWheel);
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
