"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { PlayCircle } from "lucide-react";

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
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY < window.innerHeight * 1.0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Big sparkle burst on hover
  const spawnParticles = useCallback(() => {
    const colors = ["#d9a56b", "#c36f3d", "#b8896e", "#fef3e4", "#78856d", "#9ba9a2"];
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
          0%   { box-shadow: 0 0 0 0 rgba(195,111,61,0.42); }
          70%  { box-shadow: 0 0 0 18px rgba(195,111,61,0); }
          100% { box-shadow: 0 0 0 0 rgba(195,111,61,0); }
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
          background: linear-gradient(135deg, var(--accent), var(--accent-deep));
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
            0 10px 35px rgba(138,74,45,0.4),
            0 4px 12px rgba(138,74,45,0.22);
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
          background: linear-gradient(135deg, var(--accent-deep), #5e311d);
          box-shadow:
            0 15px 50px rgba(138,74,45,0.52),
            0 6px 20px rgba(138,74,45,0.3),
            0 0 40px rgba(217,165,107,0.24);
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
        @media (max-width: 960px) {
          .floating-cta {
            display: none;
          }
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

        @keyframes bookmark-slide-in {
          from { transform: translateX(110%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes thesis-pulse {
          0%, 100% { box-shadow: -6px 4px 24px rgba(184,136,110,0.45); }
          50%       { box-shadow: -12px 4px 36px rgba(211,161,109,0.8), 0 0 24px rgba(211,161,109,0.4); }
        }
        @keyframes thesis-nudge {
          0%, 85%, 100% { transform: translateX(0); }
          88%            { transform: translateX(-7px); }
          92%            { transform: translateX(-3px); }
          96%            { transform: translateX(-6px); }
        }
        .floating-thesis {
          position: fixed;
          right: 0;
          top: 38%;
          z-index: 980;
          animation:
            bookmark-slide-in 0.7s 2.2s cubic-bezier(0.22,1,0.36,1) both,
            thesis-pulse 2.8s 3.2s ease-in-out infinite,
            thesis-nudge 7s 4s ease-in-out infinite;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 0.65rem;
          padding: 0.9rem 1.3rem 0.9rem 1rem;
          background: linear-gradient(135deg, #d3a16d, #b8896e);
          color: #fff;
          border-radius: 12px 0 0 12px;
          text-decoration: none;
          white-space: nowrap;
          box-shadow: -6px 4px 24px rgba(184,136,110,0.45);
          transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
          will-change: transform;
          cursor: none;
        }
        .floating-thesis:hover {
          transform: translateX(-10px) !important;
          background: linear-gradient(135deg, #e0b07a, #c8925a);
          box-shadow: -16px 4px 44px rgba(211,161,109,0.75), 0 0 32px rgba(211,161,109,0.45);
          animation-play-state: paused !important;
        }
        .floating-thesis .thesis-icon {
          flex-shrink: 0;
          transition: transform 0.22s ease, filter 0.22s ease;
          filter: drop-shadow(0 0 6px rgba(255,255,255,0.6));
        }
        .floating-thesis:hover .thesis-icon {
          transform: scale(1.25);
          filter: drop-shadow(0 0 12px rgba(255,255,255,1));
        }
        .thesis-label {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }
        .thesis-label-top {
          font-size: 0.56rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          opacity: 0.8;
        }
        .thesis-label-main {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        @media (max-width: 960px) {
          .floating-thesis { display: none; }
        }
      `}} />

      <div style={{ position: "fixed", right: "1.5rem", bottom: "calc(28vh - 35px)", zIndex: 979, pointerEvents: "none", opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}>
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
        style={{ opacity: visible ? 1 : 0, visibility: visible ? "visible" : "hidden", pointerEvents: visible ? "auto" : "none", transition: "opacity 0.3s ease, visibility 0.3s ease" }}
      >
        <span className="cta-icon">{">"}</span>
        Check my assets
      </a>

      <a
        href="https://youtu.be/VvdvdvSqf1M"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-thesis"
        aria-label="Watch Master's thesis defense on YouTube"
        style={{ opacity: visible ? 1 : 0, visibility: visible ? "visible" : "hidden", pointerEvents: visible ? "auto" : "none", transition: "opacity 0.3s ease, visibility 0.3s ease" }}
      >
        <PlayCircle size={24} strokeWidth={1.6} className="thesis-icon" />
        <span className="thesis-label">
          <span className="thesis-label-top">Watch</span>
          <span className="thesis-label-main">MSc Thesis</span>
        </span>
      </a>
    </>
  );
}
