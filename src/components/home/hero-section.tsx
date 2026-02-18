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
  
    const STAR_COUNT = 1500;
  
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
  
    let currentRotationX = 0;
    let currentRotationY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
  
    const MAX_ROTATION = 0.35; // 과도한 회전 방지
  
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
    
        let radius;
        let isCenter = Math.random() < 0.6;
    
        if (isCenter) {
          radius = 400 + Math.random() * 400; // 중앙 영역
        } else {
          radius = 800 + Math.random() * 400; // 외곽 영역
        }
    
        let x = radius * Math.sin(phi) * Math.cos(theta);
        let y = radius * Math.sin(phi) * Math.sin(theta);
        let z = radius * Math.cos(phi);
    
        // 💎 핵심: 중앙 영역만 타원형 왜곡
        if (isCenter) {
          y *= 0.55;   // 세로 압축 (0.4~0.7 사이 추천)
          z *= 1.1;    // 깊이 살짝 증가
        }
    
        stars.push({
          x,
          y,
          z,
          size: Math.random() * 1.2 + 0.4,
          vx: (Math.random() - 0.5) * 0.02,
          vy: (Math.random() - 0.5) * 0.02,
          vz: (Math.random() - 0.5) * 0.02,
        });
      }
    };
  
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#020205");
      gradient.addColorStop(1, "#001E40");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      // 🔥 마우스 → 회전값 계산
      const normalizedX = (mouseX / canvas.width - 0.5) * 2;
      const normalizedY = (mouseY / canvas.height - 0.5) * 2;
  
      targetRotationY = normalizedX * MAX_ROTATION;
      targetRotationX = normalizedY * MAX_ROTATION;
  
      // 🔥 부드러운 보간
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;
  
      const cosY = Math.cos(currentRotationY);
      const sinY = Math.sin(currentRotationY);
      const cosX = Math.cos(currentRotationX);
      const sinX = Math.sin(currentRotationX);
  
      stars.forEach((star) => {
        // ----- Y축 회전 -----
        let x = star.x * cosY - star.z * sinY;
        let z = star.x * sinY + star.z * cosY;
        let y = star.y;
  
        // ----- X축 회전 -----
        let y2 = y * cosX - z * sinX;
        z = y * sinX + z * cosX;
  
        // 카메라 앞에 있는 별만 그림
        if (z <= -800) return;
  
        let perspective = 900 / (900 + z);
  
        // 과도한 확대 방지
        perspective = Math.min(perspective, 3);
  
        const screenX = x * perspective + canvas.width / 2;
        const screenY = y2 * perspective + canvas.height / 2 + 60;
  
        // drift
        star.x += star.vx;
        star.y += star.vy;
        star.z += star.vz;
  
        const maxRadius = 1200;
        const dist = Math.sqrt(star.x ** 2 + star.y ** 2 + star.z ** 2);
        if (dist > maxRadius) {
          star.x *= 0.95;
          star.y *= 0.95;
          star.z *= 0.95;
        }
  
        const radius = star.size * perspective;
        if (!isFinite(radius) || radius <= 0) return;
  
        ctx.fillStyle = `rgba(255,255,255,${Math.max(
          0.08,
          perspective * 0.9
        )})`;
  
        ctx.beginPath();
        ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
        ctx.fill();
      });
  
      animationFrameId = requestAnimationFrame(draw);
    };
  
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
  
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", resizeCanvas);
  
    resizeCanvas();
    draw();
  
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
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
