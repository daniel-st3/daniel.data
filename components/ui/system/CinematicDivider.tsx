"use client";

import { useEffect, useRef } from "react";
import { loadGSAP } from "@/lib/gsap";

/**
 * Animated section divider that expands from center with a subtle glow pulse.
 * Replaces the flat <div className="divider" /> throughout the site.
 */
export default function CinematicDivider({
    color = "var(--accent)",
    glowColor = "rgba(195,111,61,0.28)",
    style = {},
}: {
    color?: string;
    glowColor?: string;
    style?: React.CSSProperties;
}) {
    const lineRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        (async () => {
            const { gsap } = await loadGSAP();

            if (lineRef.current) {
                gsap.fromTo(
                    lineRef.current,
                    { scaleX: 0, opacity: 0 },
                    {
                        scaleX: 1,
                        opacity: 1,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: lineRef.current,
                            start: "top 90%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            if (glowRef.current) {
                gsap.fromTo(
                    glowRef.current,
                    { opacity: 0, scaleX: 0.3 },
                    {
                        opacity: 1,
                        scaleX: 1,
                        duration: 1.5,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: glowRef.current,
                            start: "top 90%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }
        })();
    }, []);

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                height: "1px",
                ...style,
            }}
        >
            {/* Main line */}
            <div
                ref={lineRef}
                style={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                    transformOrigin: "center center",
                }}
            />
            {/* Glow underneath */}
            <div
                ref={glowRef}
                style={{
                    position: "absolute",
                    top: "-6px",
                    left: "10%",
                    right: "10%",
                    height: "13px",
                    background: `radial-gradient(ellipse at center, ${glowColor}, transparent 70%)`,
                    transformOrigin: "center center",
                    pointerEvents: "none",
                }}
            />
        </div>
    );
}
