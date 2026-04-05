"use client";

import { useEffect, MutableRefObject } from "react";
import { loadGSAP } from "@/lib/gsap";

/**
 * Cinematic scroll reveal hook.
 * Adds subtle 3D perspective transforms as sections enter/exit the viewport.
 * Works in BOTH scroll directions — entering from top or bottom.
 */
export function useCinematicReveal(
    sectionRef: MutableRefObject<HTMLElement | null>,
    options: {
        yOffset?: number;
        rotateX?: number;
        scale?: number;
        disabled?: boolean;
        start?: string;
    } = {}
) {
    const {
        yOffset = 50,
        rotateX = 3,
        scale = 0.98,
        disabled = false,
        start = "top 92%",
    } = options;

    useEffect(() => {
        if (disabled) return;

        let cleanup: (() => void) | undefined;

        (async () => {
            const { gsap } = await loadGSAP();
            const section = sectionRef.current;
            if (!section) return;

            // Entry animation — plays forward on enter, reverses on leave
            const tween = gsap.fromTo(
                section,
                {
                    y: yOffset,
                    rotateX: rotateX,
                    scale: scale,
                    opacity: 0,
                    transformPerspective: 1200,
                    transformOrigin: "center bottom",
                },
                {
                    y: 0,
                    rotateX: 0,
                    scale: 1,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start,
                        end: "top 55%",
                        scrub: 0.8,
                        // This makes it work when scrolling back up too
                        toggleActions: "play reverse play reverse",
                    },
                }
            );

            cleanup = () => {
                tween.scrollTrigger?.kill();
                gsap.set(section, { clearProps: "all" });
            };
        })();

        return () => cleanup?.();
    }, [disabled, sectionRef, yOffset, rotateX, scale]);
}
