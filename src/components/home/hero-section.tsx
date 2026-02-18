'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { SITE_CONFIG } from '@/constants/site';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let stars: any[] = [];

    // ⭐ 마우스 기반 회전 변수
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

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

        let type: "white" | "blue";
        if (Math.random() < 0.85) {
          type = "white";
        } else {
          type = "blue";
        }

        stars.push({
          x,
          y,
          z,
          size: Math.random() * 1.2 + 0.4,
          vx: (Math.random() - 0.5) * 0.04,
          vy: (Math.random() - 0.5) * 0.04,
          vz: (Math.random() - 0.5) * 0.04,
          type,
          hasDiffraction: Math.random() < 0.1,
          twinklePhase: Math.random() * Math.PI * 2,
          flareAngle: Math.random() * Math.PI * 2,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 배경
      const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bg.addColorStop(0, "#020205");
      bg.addColorStop(1, "#001E40");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 🔥 마우스 정규화 (-1 ~ 1)
      const normX = (mouseX / canvas.width - 0.5) * 2;
      const normY = (mouseY / canvas.height - 0.5) * 2;

      // 목표 회전
      targetRotY = normX * 0.8;
      targetRotX = normY * 0.4;

      // 부드러운 보간
      currentRotY += (targetRotY - currentRotY) * 0.05;
      currentRotX += (targetRotX - currentRotX) * 0.05;

      stars.forEach((star) => {
        // Y축 회전
        const cosY = Math.cos(currentRotY);
        const sinY = Math.sin(currentRotY);

        let x1 = star.x * cosY - star.z * sinY;
        let z1 = star.x * sinY + star.z * cosY;

        // X축 회전
        const cosX = Math.cos(currentRotX);
        const sinX = Math.sin(currentRotX);

        let y1 = star.y * cosX - z1 * sinX;
        let z2 = star.y * sinX + z1 * cosX;

        const perspective = 900 / (900 + z2);

        const screenX = x1 * perspective + canvas.width / 2;
        const screenY = y1 * perspective + canvas.height / 2;

        // drift
        star.x += star.vx;
        star.y += star.vy;
        star.z += star.vz;

        const maxRadius = 1200;
        const dist = Math.sqrt(star.x**2 + star.y**2 + star.z**2);
        if (dist > maxRadius) {
          star.x *= 0.95;
          star.y *= 0.95;
          star.z *= 0.95;
        }

        const radius = Math.max(
          0.2,
          star.size * Math.pow(perspective, 0.6)
        );

        if (!isFinite(radius)) return;

        // ✨ Twinkle
        const t = performance.now() * 0.002;

        // 멀리 있을수록 트윙클 강해짐
        const depthFactor = perspective;
        const twinkleBoost = 0.85 + Math.sin(t + star.twinklePhase) * 0.15 * depthFactor;

        const alpha = Math.max(0.08, perspective * 0.9) * twinkleBoost;

        // ⭐ Glow
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

          glow.addColorStop(0, `rgba(255,255,255,${alpha * 0.6})`);
          glow.addColorStop(0.4, `rgba(255,255,255,${alpha * 0.25})`);
          glow.addColorStop(1, "rgba(255,255,255,0)");

          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(screenX, screenY, glowRadius, 0, Math.PI * 2);
          ctx.fill();
        }

        let r = 255;
        let g = 255;
        let b = 255;

        if (star.type === "blue") {
          r = 200;
          g = 220;
          b = 255;
        }

        // Core
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.beginPath();
        ctx.arc(screenX, screenY, radius, 0, Math.PI * 2);
        ctx.fill();

        if (star.hasDiffraction && perspective > 0.7) {
          const baseAlpha = alpha * 0.6;
        
          // 1️⃣ 방사형 빛살 (6~8개)
          const rays = 6;
          for (let i = 0; i < rays; i++) {
            const angle =
              star.flareAngle + (i * Math.PI * 2) / rays;
        
            const length = radius * (6 + Math.random() * 2);
        
            const dx = Math.cos(angle) * length;
            const dy = Math.sin(angle) * length;
        
            const grad = ctx.createLinearGradient(
              screenX,
              screenY,
              screenX + dx,
              screenY + dy
            );
        
            grad.addColorStop(0, `rgba(${r},${g},${b},${baseAlpha})`);
            grad.addColorStop(1, "rgba(255,255,255,0)");
        
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.5;
        
            ctx.beginPath();
            ctx.moveTo(screenX, screenY);
            ctx.lineTo(screenX + dx, screenY + dy);
            ctx.stroke();
          }
        
          // 2️⃣ 미세한 회절 링
          ctx.strokeStyle = `rgba(${r},${g},${b},${baseAlpha * 0.2})`;
          ctx.lineWidth = 0.4;
          ctx.beginPath();
          ctx.arc(screenX, screenY, radius * 4, 0, Math.PI * 2);
          ctx.stroke();
        
          // 3️⃣ 아주 약한 RGB 분산
          const offset = 0.6;
        
          ctx.fillStyle = `rgba(255,200,200,${baseAlpha * 0.4})`;
          ctx.beginPath();
          ctx.arc(screenX - offset, screenY, radius * 0.9, 0, Math.PI * 2);
          ctx.fill();
        
          ctx.fillStyle = `rgba(200,220,255,${baseAlpha * 0.4})`;
          ctx.beginPath();
          ctx.arc(screenX + offset, screenY, radius * 0.9, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
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
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none"></div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-10">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-yonsei-light/30 bg-yonsei-blue/20 backdrop-blur-md text-yonsei-light font-semibold text-sm tracking-widest uppercase">
          Yonsei University LikeLion {SITE_CONFIG.generation}th
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tighter leading-tight">
          BUILD YOUR <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-yonsei-light to-[#5C94E5]">
            UNIVERSE
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          {SITE_CONFIG.name} {SITE_CONFIG.generation}기 아기사자를 모집합니다.
          <br className="hidden md:block" />
          당신의 아이디어를 현실로 만드는 여정을 지금 시작하세요.
        </p>

        <div className="flex justify-center">
          <Link
            href="/apply"
            className="px-8 py-4 bg-likelion-orange text-white rounded-full font-bold text-lg hover:bg-orange-600 transition-all flex items-center gap-2 shadow-lg shadow-likelion-orange/20"
          >
            {SITE_CONFIG.generation}기 지원하기
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50 z-10">
        <ChevronDown size={32} />
      </div>
    </section>
  );
}
