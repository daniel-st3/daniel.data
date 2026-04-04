"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const tickerFnRef = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    // Destroy any leftover instance from a previous mount (HMR / Strict Mode)
    if (tickerFnRef.current) {
      gsap.ticker.remove(tickerFnRef.current);
      tickerFnRef.current = null;
    }
    if (lenisRef.current) {
      lenisRef.current.destroy();
      lenisRef.current = null;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 0.9,
      infinite: false,
    });
    lenisRef.current = lenis;

    // Store in ref so the exact same function reference is passed to both
    // gsap.ticker.add() and gsap.ticker.remove() — anonymous functions would
    // never match on removal, causing instances to stack and scroll to lock.
    tickerFnRef.current = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFnRef.current);
    gsap.ticker.lagSmoothing(0);

    return () => {
      if (tickerFnRef.current) {
        gsap.ticker.remove(tickerFnRef.current);
        tickerFnRef.current = null;
      }
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []); // Empty deps — runs exactly once per mount

  return <>{children}</>;
}
