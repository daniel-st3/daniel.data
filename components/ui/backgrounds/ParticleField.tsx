"use client";

import { useEffect, useRef } from "react";

const PALETTE: [number, number, number][] = [
  [74, 111, 165],
  [112, 150, 200],
  [155, 190, 230],
  [180, 160, 220],
  [200, 220, 255],
];

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  col: [number, number, number];
  a: number;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const raf = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;

    const resize = () => {
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const N = 130;
    const LINK = 90;
    const ATTRACT = 155;
    const REPEL = 65;

    const pts: Particle[] = Array.from({ length: N }, () => ({
      x: Math.random() * (W || 800),
      y: Math.random() * (H || 600),
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.38,
      r: Math.random() * 1.8 + 0.7,
      col: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      a: Math.random() * 0.55 + 0.35,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (const p of pts) {
        const dx = mx - p.x;
        const dy = my - p.y;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;

        if (d < REPEL) {
          const f = ((REPEL - d) / REPEL) * 0.11;
          p.vx -= (dx / d) * f;
          p.vy -= (dy / d) * f;
        } else if (d < ATTRACT) {
          const f = (1 - d / ATTRACT) * 0.016;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }

        p.vx *= 0.97;
        p.vy *= 0.97;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -10) p.x += W + 20;
        else if (p.x > W + 10) p.x -= W + 20;
        if (p.y < -10) p.y += H + 20;
        else if (p.y > H + 10) p.y -= H + 20;

        // Draw glow dot
        const [r, g, b] = p.col;
        ctx.shadowBlur = 7;
        ctx.shadowColor = `rgba(${r},${g},${b},0.75)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.2832);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.a})`;
        ctx.fill();
      }

      // Connection lines — drawn after particles to avoid shadow bleed
      ctx.shadowBlur = 0;
      for (let i = 0; i < N - 1; i++) {
        for (let j = i + 1; j < N; j++) {
          const a = pts[i], b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(112,150,200,${(1 - d / LINK) * 0.26})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf.current = requestAnimationFrame(tick);
    };

    tick();

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
}
