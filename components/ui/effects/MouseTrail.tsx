"use client";

import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 14;
const ACCENT = "40, 135, 96"; // r,g,b for var(--accent)

export default function MouseTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!canvas || !dot || !ring) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize canvas
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Trail points
    interface Point { x: number; y: number }
    const trail: Point[] = Array.from({ length: TRAIL_LENGTH }, () => ({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    }));

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let ringPos = { x: mouse.x, y: mouse.y };
    let rafId: number;
    let isVisible = false;

    const onMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY };
      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "0.5";
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const draw = () => {
      // Dot: instant
      dot.style.left = `${mouse.x}px`;
      dot.style.top = `${mouse.y}px`;

      // Ring: smooth follow
      ringPos.x = lerp(ringPos.x, mouse.x, 0.12);
      ringPos.y = lerp(ringPos.y, mouse.y, 0.12);
      ring.style.left = `${ringPos.x}px`;
      ring.style.top = `${ringPos.y}px`;

      // Update trail (each point follows the previous)
      trail[0].x = lerp(trail[0].x, mouse.x, 0.3);
      trail[0].y = lerp(trail[0].y, mouse.y, 0.3);
      for (let i = 1; i < TRAIL_LENGTH; i++) {
        trail[i].x = lerp(trail[i].x, trail[i - 1].x, 0.55);
        trail[i].y = lerp(trail[i].y, trail[i - 1].y, 0.55);
      }

      // Draw trail
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < TRAIL_LENGTH - 1; i++) {
        const progress = 1 - i / TRAIL_LENGTH;
        const radius = progress * 3;
        const alpha = progress * 0.45;
        ctx.beginPath();
        ctx.arc(trail[i].x, trail[i].y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT}, ${alpha})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(draw);

    // Hover effects on interactive elements
    const interactives = document.querySelectorAll("a, button, [data-cursor]");
    const onEnter = () => {
      dot.style.transform = "translate(-50%, -50%) scale(0.5)";
      ring.style.transform = "translate(-50%, -50%) scale(1.8)";
      ring.style.opacity = "0.3";
    };
    const onLeave = () => {
      dot.style.transform = "translate(-50%, -50%) scale(1)";
      ring.style.transform = "translate(-50%, -50%) scale(1)";
      ring.style.opacity = "0.5";
    };

    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} id="trail-canvas" aria-hidden="true" />
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: 0, transition: "transform 0.1s ease, opacity 0.3s ease" }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ opacity: 0, transition: "transform 0.2s ease, opacity 0.3s ease" }}
        aria-hidden="true"
      />
    </>
  );
}
