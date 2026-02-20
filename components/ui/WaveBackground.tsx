"use client";

import { useEffect, useRef } from "react";
import { createNoise2D } from "simplex-noise";

interface WaveBackgroundProps {
  backgroundColor?: string;
  strokeColor?: string;
  pointerSize?: number;
  className?: string;
}

export default function WaveBackground({
  backgroundColor = "transparent",
  strokeColor = "rgba(255,255,255,0.18)",
  pointerSize = 0.4,
  className = "",
}: WaveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const noise2D = createNoise2D();
    let animId: number;
    let mouse = { x: -9999, y: -9999 };
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      if (backgroundColor !== "transparent") {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);
      }

      const NUM_WAVES = 14;
      const STEP = 3;

      for (let wi = 0; wi < NUM_WAVES; wi++) {
        const waveY = (height / (NUM_WAVES + 1)) * (wi + 1);
        const phase = wi * 0.6;

        ctx.beginPath();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 0.8;

        for (let x = 0; x <= width; x += STEP) {
          const nVal = noise2D(
            x * 0.0025 + t * 0.4 + phase,
            wi * 0.25 + t * 0.15
          );

          const dx = x - mouse.x;
          const dy = waveY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / (120 * (pointerSize / 0.4)));
          const mouseOffset = influence * 35 * Math.sin(dx * 0.015);

          const y = waveY + nVal * 28 + mouseOffset;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.stroke();
      }

      t += 0.004;
      animId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [backgroundColor, strokeColor, pointerSize]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
