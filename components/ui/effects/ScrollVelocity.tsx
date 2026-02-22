"use client";

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";

interface ScrollVelocityContextValue {
    velocity: number;       // pixels per frame (smoothed)
    normalizedSpeed: number; // 0–1 clamped for easy shader/animation use
}

const ScrollVelocityContext = createContext<ScrollVelocityContextValue>({
    velocity: 0,
    normalizedSpeed: 0,
});

export const useScrollVelocity = () => useContext(ScrollVelocityContext);

/**
 * Tracks scroll velocity with exponential smoothing.
 * Provides a normalized 0–1 speed value for animations.
 *
 * Performance: passive scroll listener + single RAF loop.
 */
export function ScrollVelocityProvider({ children }: { children: ReactNode }) {
    const [value, setValue] = useState<ScrollVelocityContextValue>({
        velocity: 0,
        normalizedSpeed: 0,
    });

    const lastY = useRef(0);
    const rawVelocity = useRef(0);
    const smoothVelocity = useRef(0);
    const rafId = useRef(0);

    useEffect(() => {
        lastY.current = window.scrollY;

        const onScroll = () => {
            const delta = Math.abs(window.scrollY - lastY.current);
            rawVelocity.current = delta;
            lastY.current = window.scrollY;
        };

        window.addEventListener("scroll", onScroll, { passive: true });

        const tick = () => {
            // Exponential smoothing: rise fast, decay slow
            const target = rawVelocity.current;
            const factor = target > smoothVelocity.current ? 0.3 : 0.08;
            smoothVelocity.current += (target - smoothVelocity.current) * factor;

            // Decay raw velocity each frame (no scroll = velocity drops)
            rawVelocity.current *= 0.85;

            // Normalize: 0 at rest, 1 at ~50px/frame (fast scroll)
            const normalized = Math.min(smoothVelocity.current / 50, 1);

            setValue({
                velocity: smoothVelocity.current,
                normalizedSpeed: normalized,
            });

            rafId.current = requestAnimationFrame(tick);
        };

        rafId.current = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener("scroll", onScroll);
            cancelAnimationFrame(rafId.current);
        };
    }, []);

    return (
        <ScrollVelocityContext.Provider value={value}>
            {children}
        </ScrollVelocityContext.Provider>
    );
}
