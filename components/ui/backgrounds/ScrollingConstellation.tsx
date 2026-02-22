"use client";

import { useEffect, useRef } from "react";

/**
 * Floating constellation of connected nodes that drifts with scroll.
 * Renders on a transparent canvas — meant to be overlaid on dark sections.
 */
export default function ScrollingConstellation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        let w = 0;
        let h = 0;
        let animId: number;

        const resize = () => {
            const rect = canvas.parentElement?.getBoundingClientRect();
            w = rect?.width || window.innerWidth;
            h = rect?.height || window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.scale(dpr, dpr);
        };

        interface Node {
            baseX: number;
            baseY: number;
            x: number;
            y: number;
            r: number;
            speed: number;
            phase: number;
            amplitude: number;
            opacity: number;
        }

        // Create a set of geometric nodes
        const NODES: Node[] = [];
        const NODE_COUNT = 18;
        const CONNECTION_DIST = 220;

        const initNodes = () => {
            NODES.length = 0;
            for (let i = 0; i < NODE_COUNT; i++) {
                NODES.push({
                    baseX: Math.random() * w,
                    baseY: Math.random() * h,
                    x: 0,
                    y: 0,
                    r: 1.5 + Math.random() * 2.5,
                    speed: 0.15 + Math.random() * 0.35,
                    phase: Math.random() * Math.PI * 2,
                    amplitude: 15 + Math.random() * 40,
                    opacity: 0.3 + Math.random() * 0.5,
                });
            }
        };

        resize();
        initNodes();

        let time = 0;

        const draw = () => {
            ctx.clearRect(0, 0, w, h);
            time += 0.008;

            // Update positions with gentle floating motion
            NODES.forEach((n) => {
                n.x = n.baseX + Math.sin(time * n.speed + n.phase) * n.amplitude;
                n.y = n.baseY + Math.cos(time * n.speed * 0.7 + n.phase) * n.amplitude * 0.6;
            });

            // Draw connections
            for (let i = 0; i < NODES.length; i++) {
                for (let j = i + 1; j < NODES.length; j++) {
                    const dx = NODES[i].x - NODES[j].x;
                    const dy = NODES[i].y - NODES[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < CONNECTION_DIST) {
                        const alpha = (1 - dist / CONNECTION_DIST) * 0.15;
                        ctx.beginPath();
                        ctx.moveTo(NODES[i].x, NODES[i].y);
                        ctx.lineTo(NODES[j].x, NODES[j].y);
                        ctx.strokeStyle = `rgba(112, 150, 200, ${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            // Draw nodes
            NODES.forEach((n) => {
                // Outer glow
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r * 3, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(112, 150, 200, ${n.opacity * 0.08})`;
                ctx.fill();

                // Core dot
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(160, 190, 230, ${n.opacity})`;
                ctx.fill();
            });

            // Draw a few orbiting ring shapes for visual interest
            const ringCount = 3;
            for (let i = 0; i < ringCount; i++) {
                const cx = w * (0.3 + i * 0.2);
                const cy = h * (0.35 + i * 0.15);
                const rx = 60 + i * 30;
                const ry = 25 + i * 12;
                const angle = time * (0.2 + i * 0.1) + i;

                ctx.save();
                ctx.translate(cx + Math.sin(time * 0.3 + i) * 20, cy + Math.cos(time * 0.25 + i) * 15);
                ctx.rotate(angle);
                ctx.beginPath();
                ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(112, 150, 200, ${0.06 + i * 0.02})`;
                ctx.lineWidth = 0.6;
                ctx.stroke();
                ctx.restore();
            }

            animId = requestAnimationFrame(draw);
        };

        draw();

        const onResize = () => {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            resize();
            initNodes();
        };

        window.addEventListener("resize", onResize);
        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", onResize);
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
                pointerEvents: "none",
            }}
        />
    );
}
