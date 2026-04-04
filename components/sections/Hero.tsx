"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { loadGSAP } from "@/lib/gsap";

const THESIS_REQUEST_SUBJECT = "Request to read your thesis";
const THESIS_REQUEST_BODY = [
  "Hi Daniel,",
  "",
  "I found your portfolio and I would love to read your MSc thesis on AI-driven analysis of political bias in financial media.",
  "Could you please share the thesis and defense slides with me?",
  "",
  "Thank you,",
  "[Your Name]",
].join("\n");

const THESIS_REQUEST_MAILTO = `mailto:danielst.data@gmail.com?subject=${encodeURIComponent(THESIS_REQUEST_SUBJECT)}&body=${encodeURIComponent(THESIS_REQUEST_BODY)}`;

// Mountain layer
const IMG_MAIN = "/images/hero-mountain.jpg";

export default function Hero() {
  const sectionRef   = useRef<HTMLElement>(null);
  const skyRef       = useRef<HTMLDivElement>(null);
  const mainRef      = useRef<HTMLDivElement>(null);
  const contentRef   = useRef<HTMLDivElement>(null);
  const tiltRef      = useRef<HTMLDivElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);
  const depthRefs    = useRef<(HTMLElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // ── Scroll parallax + ambient animation ──────────────────────────────────
  useEffect(() => {
    (async () => {
      const { gsap, ScrollTrigger } = await loadGSAP();

      // ── Scroll parallax: reduced yPercent values to avoid layer jumping ──
      // Sky (slowest — stays visible longest)
      gsap.to(skyRef.current, {
        yPercent: 6,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });

      // Main mountain (medium)
      gsap.to(mainRef.current, {
        yPercent: 16,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });

      // ── Content fade-out: USE fromTo so scrub reverses cleanly (fixes text-disappear bug) ──
      gsap.fromTo(
        contentRef.current,
        { y: 0, opacity: 1 },
        {
          y: -80,
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "14% top", end: "58% top", scrub: 1 },
        }
      );

      // Scroll indicator fades
      if (scrollIndRef.current) {
        gsap.fromTo(
          scrollIndRef.current,
          { opacity: 1, y: 0 },
          {
            opacity: 0,
            y: -10,
            ease: "none",
            scrollTrigger: { trigger: sectionRef.current, start: "5% top", end: "20% top", scrub: true },
          }
        );
      }

      // ── Ambient: sky gradient panel drifts subtly ──
      gsap.to(skyRef.current, {
        xPercent: -1.5,
        duration: 22,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Ambient: main mountain layer breathes
      gsap.to(mainRef.current, {
        scale: 1.02,
        duration: 16,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      ScrollTrigger.refresh();
    })();
  }, []);

  // ── Cursor 3D tilt with per-layer depth + background cursor parallax ──────
  useEffect(() => {
    const card = tiltRef.current;
    if (!card || typeof window === "undefined" || !window.matchMedia("(hover: hover)").matches) return;

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const depths = [5, 11, 17, 10, 7];

    const tick = () => {
      cx = lerp(cx, tx, 0.07);
      cy = lerp(cy, ty, 0.07);
      card.style.transform = `perspective(1800px) rotateX(${cy * 5}deg) rotateY(${cx * 8}deg)`;
      depthRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = depths[i] ?? depths[depths.length - 1];
        el.style.transform = `translate3d(${cx * d}px, ${cy * d}px, 0)`;
      });
      // Background layers move in the opposite direction — creates depth parallax
      if (skyRef.current) {
        skyRef.current.style.transform = `translate3d(${-cx * 3}px, ${-cy * 2}px, 0)`;
      }
      if (mainRef.current) {
        mainRef.current.style.transform = `translate3d(${-cx * 6}px, ${-cy * 4}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width - 0.5) * 1.6;
      ty = -((e.clientY - rect.top) / rect.height - 0.5) * 1.6;
    };
    const onLeave = () => { tx = 0; ty = 0; };

    raf = requestAnimationFrame(tick);
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{ minHeight: "100dvh", position: "relative", overflow: "hidden", zIndex: 1 }}
    >
      {/* ── Layer 1: Deep dark sky — warm black so mountains read clearly ── */}
      <div
        ref={skyRef}
        style={{
          position: "absolute",
          inset: "-20% -6%",
          background: "#0a0603",
          zIndex: 0,
          willChange: "transform",
        }}
      />

      {/* Warm amber unifier — makes both images feel like the same scene */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 1,
        background: "linear-gradient(180deg, rgba(180,110,50,0.22) 0%, rgba(120,70,30,0.12) 50%, transparent 100%)",
        mixBlendMode: "multiply",
        pointerEvents: "none",
      }} />

      {/* ── Layer 2: Main mountain — gentler mask so sky blends more gradually ── */}
      <div
        ref={mainRef}
        style={{
          position: "absolute",
          inset: "-18% -4%",
          backgroundImage: `url(${IMG_MAIN})`,
          backgroundSize: "cover",
          backgroundPosition: "center 28%",
          zIndex: 2,
          willChange: "transform",
          maskImage: "linear-gradient(to top, black 38%, rgba(0,0,0,0.88) 58%, rgba(0,0,0,0.3) 78%, transparent 92%)",
          WebkitMaskImage: "linear-gradient(to top, black 38%, rgba(0,0,0,0.88) 58%, rgba(0,0,0,0.3) 78%, transparent 92%)",
        }}
      />

      {/* ── Vignette: edges + top dark, slight warm centre glow ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 4,
          background: `
            linear-gradient(180deg,
              rgba(6,4,2,0.52) 0%,
              rgba(6,4,2,0.08) 28%,
              rgba(6,4,2,0.04) 52%,
              rgba(6,4,2,0.55) 100%
            ),
            radial-gradient(ellipse 80% 60% at 50% 50%, transparent 20%, rgba(3,2,1,0.28) 100%)
          `,
          pointerEvents: "none",
        }}
      />

      {/* ── Ambient floating light orbs ── */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 5, pointerEvents: "none", overflow: "visible" }}
        aria-hidden
      >
        {/* Warm sun-glow orb upper-right */}
        <circle cx="72%" cy="22%" r="90" fill="rgba(255,190,80,0.07)" filter="url(#glow-a)" className="hero-orb-a" />
        {/* Soft amber haze left */}
        <circle cx="18%" cy="62%" r="120" fill="rgba(220,140,60,0.05)" filter="url(#glow-a)" className="hero-orb-b" />
        {/* Tiny crisp highlight */}
        <circle cx="68%" cy="19%" r="6" fill="rgba(255,230,160,0.55)" filter="url(#glow-b)" className="hero-orb-c" />
        <defs>
          <filter id="glow-a" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="40" />
          </filter>
          <filter id="glow-b" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
      </svg>

      {/* ── Page transition at bottom ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "140px",
          background: "linear-gradient(to bottom, transparent 0%, var(--bg) 100%)",
          zIndex: 9,
          pointerEvents: "none",
        }}
      />

      {/* ── Hero content ── */}
      <div
        ref={contentRef}
        style={{
          position: "relative",
          zIndex: 7,
          width: "100%",
          // Push down from header, leave room at bottom for scroll indicator
          paddingTop: "calc(var(--header-h) + 14vh)",
          paddingBottom: "14rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div
          ref={tiltRef}
          style={{
            width: "100%",
            maxWidth: 720,
            paddingInline: "clamp(1.5rem, 5vw, 2rem)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Depth layer 0 — availability pill */}
          <motion.div
            suppressHydrationWarning
            initial={!mounted || reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            <div ref={(el) => { depthRefs.current[0] = el; }} style={{ willChange: "transform" }}>
              <span className="pill">
                <span className="pill-dot" style={{ background: "var(--accent-light)" }} />
                Open to remote and in person roles · Bogota · US Citizen
              </span>
            </div>
          </motion.div>

          {/* Depth layer 1 — headline */}
          <motion.div
            suppressHydrationWarning
            initial={!mounted || reducedMotion ? false : { opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <div ref={(el) => { depthRefs.current[1] = el; }} style={{ marginTop: "1.5rem", willChange: "transform" }}>
              {["Business &", "Data Analyst."].map((line) => (
                <div key={line} style={{ lineHeight: 1.0, overflow: "hidden" }}>
                  <span style={{
                    display: "block",
                    fontSize: "clamp(3rem, 9vw, 7.4rem)",
                    fontWeight: 600,
                    letterSpacing: "-0.066em",
                    color: "#fff8f0",
                    lineHeight: 1.0,
                    textShadow: "0 2px 48px rgba(0,0,0,0.6), 0 0 80px rgba(0,0,0,0.35)",
                  }}>
                    {line}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Depth layer 2 — tagline */}
          <motion.div
            suppressHydrationWarning
            initial={!mounted || reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <div ref={(el) => { depthRefs.current[2] = el; }} style={{ marginTop: "1.4rem", willChange: "transform" }}>
              <p style={{
                fontSize: "clamp(0.95rem, 2vw, 1.13rem)",
                color: "rgba(255,245,232,0.82)",
                lineHeight: 1.72,
                maxWidth: "44ch",
                letterSpacing: "-0.008em",
                textShadow: "0 2px 20px rgba(0,0,0,0.55)",
                margin: 0,
              }}>
                Turning signal into decision. AI-powered analytics and data workflows
                that move businesses forward.
              </p>
            </div>
          </motion.div>

          {/* Depth layer 3 — primary CTAs */}
          <motion.div
            suppressHydrationWarning
            initial={!mounted || reducedMotion ? false : { opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
          >
            <div
              ref={(el) => { depthRefs.current[3] = el; }}
              style={{ display: "flex", gap: "0.75rem", marginTop: "2.5rem", flexWrap: "wrap", justifyContent: "center", willChange: "transform" }}
            >
              <a href="https://www.linkedin.com/in/daniel-steven-rodriguez-sandoval/" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "0.8rem 1.7rem", fontSize: "0.9rem" }}>
                LinkedIn
              </a>
              <a href="https://github.com/daniel-st3" target="_blank" rel="noopener noreferrer" className="btn-ghost-dark" style={{ padding: "0.8rem 1.7rem", fontSize: "0.9rem" }}>
                GitHub
              </a>
            </div>
          </motion.div>

          {/* Depth layer 4 — secondary links */}
          <motion.div
            suppressHydrationWarning
            initial={!mounted || reducedMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
          >
          <div
            ref={(el) => { depthRefs.current[4] = el; }}
            style={{ display: "flex", gap: "1.8rem", rowGap: "0.6rem", flexWrap: "wrap", justifyContent: "center", marginTop: "1.1rem", willChange: "transform" }}
          >
            {[
              { label: "Email me",        href: "mailto:danielst.data@gmail.com" },
              { label: "Download Resume", href: "/cv/Daniel_Rodriguez.pdf", download: true },
              { label: "Request Thesis",  href: THESIS_REQUEST_MAILTO },
            ].map(({ label, href, download }) => (
              <a
                key={label}
                href={href}
                {...(download ? { download: true } : {})}
                style={{ fontSize: "0.84rem", color: "rgba(255,244,232,0.78)", fontWeight: 500, textDecoration: "none", transition: "color 0.18s ease", textShadow: "0 1px 10px rgba(0,0,0,0.4)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#ffffff")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,244,232,0.78)")}
              >
                {label}
              </a>
            ))}
          </div>
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator — clear of content thanks to paddingBottom: 14rem ── */}
      <div
        ref={scrollIndRef}
        style={{
          position: "absolute",
          bottom: "2.8rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 7,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.45rem",
        }}
      >
        <span style={{
          fontSize: "0.68rem",
          color: "rgba(255,240,220,0.7)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          fontWeight: 500,
          textShadow: "0 1px 8px rgba(0,0,0,0.5)",
        }}>
          Scroll
        </span>
        <div style={{
          width: "1px",
          height: "52px",
          background: "linear-gradient(to bottom, rgba(255,236,208,0.85), transparent)",
          animation: "hero-scroll-line 2s ease-in-out infinite",
        }} />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes hero-scroll-line {
          0%, 100% { opacity: 0.3; transform: scaleY(0.7); transform-origin: top; }
          50%       { opacity: 1;   transform: scaleY(1);   transform-origin: top; }
        }
        @keyframes hero-orb-float-a {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(18px, -22px) scale(1.08); }
        }
        @keyframes hero-orb-float-b {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(-14px, 16px) scale(1.05); }
        }
        @keyframes hero-orb-float-c {
          0%, 100% { opacity: 0.55; transform: scale(1); }
          50%       { opacity: 0.9;  transform: scale(1.4); }
        }
        .hero-orb-a { animation: hero-orb-float-a 12s ease-in-out infinite; }
        .hero-orb-b { animation: hero-orb-float-b 16s ease-in-out infinite; }
        .hero-orb-c { animation: hero-orb-float-c 8s ease-in-out infinite; }
        @media (max-width: 640px) {
          .hero-orb-a, .hero-orb-b, .hero-orb-c { display: none; }
        }
      ` }} />
    </section>
  );
}
