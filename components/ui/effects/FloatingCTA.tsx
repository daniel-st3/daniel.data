"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

const CANVAS_SIZE = 180;
const BURST_CENTER = CANVAS_SIZE / 2;

export default function FloatingCTA() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animIdRef = useRef<number>(0);

  // Big sparkle burst on hover
  const spawnParticles = useCallback(() => {
    const colors = ["#7096C8", "#a88beb", "#4A6FA5", "#ffffff", "#22c55e", "#f59e0b"];
    const total = 42;
    for (let i = 0; i < total; i++) {
      const angle = (Math.PI * 2 * i) / total + (Math.random() - 0.5) * 0.55;
      const speed = 2.2 + Math.random() * 6.6;
      particlesRef.current.push({
        x: BURST_CENTER,
        y: BURST_CENTER,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 1.2 + Math.random() * 1.4,
        size: 3 + Math.random() * 4.8,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  }, []);

  // Canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = CANVAS_SIZE * dpr;
    canvas.height = CANVAS_SIZE * dpr;
    ctx.scale(dpr, dpr);

    const draw = () => {
      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.035;
        p.life -= 0.0085;
        const alpha = Math.max(0, p.life / p.maxLife);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      animIdRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animIdRef.current);
  }, []);

  const handleMouseEnter = () => {
    spawnParticles();
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float-orbit {
          0%   { transform: translateY(0px) rotate(0deg); }
          25%  { transform: translateY(-12px) rotate(2deg); }
          50%  { transform: translateY(-6px) rotate(-1deg); }
          75%  { transform: translateY(-16px) rotate(1.5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        @keyframes cta-slide-in {
          from { opacity: 0; transform: translateX(100px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(74,111,165,0.5); }
          70%  { box-shadow: 0 0 0 18px rgba(74,111,165,0); }
          100% { box-shadow: 0 0 0 0 rgba(74,111,165,0); }
        }
        .floating-cta {
          position: fixed;
          right: 1.5rem;
          bottom: 28vh;
          z-index: 980;
          animation:
            cta-slide-in 0.8s 1.5s ease-out both,
            float-orbit 5s 2.5s ease-in-out infinite;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 1.1rem 1.2rem;
          width: 110px;
          background: linear-gradient(135deg, var(--accent), #3a5a8a);
          color: #fff;
          border-radius: 20px;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          text-decoration: none;
          text-align: center;
          line-height: 1.3;
          box-shadow:
            0 10px 35px rgba(74,111,165,0.6),
            0 4px 12px rgba(74,111,165,0.3);
          transition: box-shadow 0.25s ease, background 0.25s ease, transform 0.15s ease;
          will-change: transform;
          cursor: none;
        }
        .floating-cta::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 24px;
          animation: pulse-ring 2.5s ease-out infinite;
          pointer-events: none;
        }
        .floating-cta:hover {
          background: linear-gradient(135deg, #3a5a8a, #2a4b78);
          box-shadow:
            0 15px 50px rgba(74,111,165,0.8),
            0 6px 20px rgba(74,111,165,0.5),
            0 0 40px rgba(112,150,200,0.35);
          animation-play-state: paused !important;
        }
        .floating-cta .cta-icon {
          font-size: 1.8rem;
          line-height: 1;
          filter: drop-shadow(0 0 8px rgba(255,255,255,0.7));
          transition: transform 0.28s ease;
        }
        .floating-cta:hover .cta-icon {
          transform: scale(1.18) translateX(3px);
        }
        @media (max-width: 640px) {
          .floating-cta {
            right: 0.75rem;
            bottom: 18vh;
            width: 90px;
            font-size: 0.58rem;
            padding: 0.85rem 0.9rem;
          }
        }
      `}} />

      <div style={{ position: "fixed", right: "1.5rem", bottom: "calc(28vh - 35px)", zIndex: 979, pointerEvents: "none" }}>
        <canvas
          ref={canvasRef}
          style={{ width: `${CANVAS_SIZE}px`, height: `${CANVAS_SIZE}px` }}
        />
      </div>

      <a
        href="https://github.com/daniel-st3/ai-analytics-prompt-playbook"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-cta"
        aria-label="Check my assets on GitHub"
        onMouseEnter={handleMouseEnter}
      >
        <span className="cta-icon">{">"}</span>
        Check my assets
      </a>
    </>
  );
}
