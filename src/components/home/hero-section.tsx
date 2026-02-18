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
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const radius = 600 + Math.random() * 600;
    
        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);
    
        // ⭐ 스펙트럼 분포
        const spectrumRand = Math.random();
        let type: "blue" | "white" | "yellow" = "white";
    
        if (spectrumRand < 0.05) type = "yellow";   // 15%
        else if (spectrumRand < 0.45) type = "blue"; // 30%
        else type = "white";                         // 55%
    
        stars.push({
          x,
          y,
          z,
          size: Math.random() * 1.2 + 0.4,
          vx: (Math.random() - 0.5) * 0.04,
          vy: (Math.random() - 0.5) * 0.04,
          vz: (Math.random() - 0.5) * 0.04,
          type,
          hasFlare: Math.random() < 0.2,     // 5% flare
          hasTwinkle: Math.random() < 0.3,   // 10% twinkle
          twinklePhase: Math.random() * Math.PI * 2,
          flareAngle: Math.random() * Math.PI,
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
        
        const radius = Math.max(
          0.2,
          star.size * Math.pow(perspective, 0.6)
        );
        if (!isFinite(radius)) return;
        
        const depthFactor = Math.min(1, Math.max(0, perspective));
        
        const isWarm = Math.random() < 0.05;

        let r = 255;
        let g = 255;
        let b = 255;
        
        if (isWarm) {
          g = 235 + Math.random() * 15;
          b = 200 + Math.random() * 25;
        }
        
        // 🌠 트윙클
        let twinkleBoost = 1;
        if (star.hasTwinkle) {
          const t = performance.now() * 0.002;
          twinkleBoost = 0.7 + Math.sin(t + star.twinklePhase) * 0.3;
        }
        
        const alpha = Math.max(0.08, perspective * 0.9) * twinkleBoost;
        
        // ⭐ 글로우 (가까운 별만)
        if (perspective > 0.5) {
          const glowRadius = radius * 3;
        
          const glow = ctx.createRadialGradient(
            screenX,
            screenY,
            0,
            screenX,
            screenY,
            glowRadius
          );
        
          glow.addColorStop(0, `rgba(${r},${g},${b},${alpha * 0.6})`);
          glow.addColorStop(0.4, `rgba(${r},${g},${b},${alpha * 0.25})`);
          glow.addColorStop(1, "rgba(255,255,255,0)");
        
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(screenX, screenY, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // ⭐ 중심 코어
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.beginPath();
        ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
        ctx.fill();
        
        // ✨ 십자형 flare (아주 일부만)
        if (star.hasFlare && perspective > 0.6) {
          const flareSize = radius * 8;
          const angle = star.flareAngle;
        
          const dx = Math.cos(angle) * flareSize;
          const dy = Math.sin(angle) * flareSize;
        
          const gradient = ctx.createLinearGradient(
            screenX - dx,
            screenY - dy,
            screenX + dx,
            screenY + dy
          );
        
          gradient.addColorStop(0, "rgba(255,255,255,0)");
          gradient.addColorStop(0.5, `rgba(${r},${g},${b},${alpha * 0.8})`);
          gradient.addColorStop(1, "rgba(255,255,255,0)");
        
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(screenX - dx, screenY - dy);
          ctx.lineTo(screenX + dx, screenY + dy);
          ctx.stroke();
        
          // 대각선 방향 하나 더 (45도 offset)
          const angle2 = angle + Math.PI / 2;
          const dx2 = Math.cos(angle2) * flareSize;
          const dy2 = Math.sin(angle2) * flareSize;
        
          const gradient2 = ctx.createLinearGradient(
            screenX - dx2,
            screenY - dy2,
            screenX + dx2,
            screenY + dy2
          );
        
          gradient2.addColorStop(0, "rgba(255,255,255,0)");
          gradient2.addColorStop(0.5, `rgba(${r},${g},${b},${alpha * 0.6})`);
          gradient2.addColorStop(1, "rgba(255,255,255,0)");
        
          ctx.strokeStyle = gradient2;
          ctx.beginPath();
          ctx.moveTo(screenX - dx2, screenY - dy2);
          ctx.lineTo(screenX + dx2, screenY + dy2);
          ctx.stroke();
        }
      });
  
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
