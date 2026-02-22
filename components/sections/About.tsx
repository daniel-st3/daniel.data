"use client";

import { useEffect, useRef, useState } from "react";
import { loadGSAP } from "@/lib/gsap";
import { useCinematicReveal } from "@/lib/useCinematicReveal";
import { GlowingEffect } from "@/components/ui/effects/glowing-effect";
import { MagneticText } from "@/components/ui/effects/morphing-cursor";

interface StatDef {
  target: number;
  suffix: string;
  label: string;
  accent?: string;
}

const STATS: StatDef[] = [
  { target: 4, suffix: "", label: "Languages\nEN · ES · FR · PT" },
  { target: 13, suffix: "", label: "Certifications\nearned" },
  { target: 50, suffix: "+", label: "SMEs\nadvised" },
  { target: 2, suffix: "", label: "Bachelor Degrees\nBusiness & International Biz", accent: "#7096C8" },
  { target: 1, suffix: "", label: "Master Degree\nData Analytics for Business", accent: "#a88beb" },
];

const TAGS = ["US Citizen", "No visa sponsorship required", "Remote / Hybrid"];

// Animated counter with a quick, clear finish.
function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }

    const startTime = performance.now();
    let raf: number;

    const animate = (t: number) => {
      const progress = Math.min((t - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(eased * target);
      setCount(next >= target ? target : next);

      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return count;
}

function StatCard({ stat, active, index }: { stat: StatDef; active: boolean; index: number }) {
  const duration = stat.target > 10 ? 1350 : 1050;
  const count = useCountUp(stat.target, duration, active);
  const accentColor = stat.accent || "var(--accent)";

  return (
    <div
      style={{
        position: "relative",
        borderRadius: "1.15rem",
        border: "1px solid var(--border)",
        padding: "3px",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        opacity: active ? 1 : 0.5,
        transform: active ? "translateY(0)" : "translateY(12px)",
        transitionDelay: `${index * 0.1}s`,
        transitionProperty: "transform, opacity, box-shadow",
        transitionDuration: "0.6s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 8px 30px rgba(74,111,165,0.12)`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <GlowingEffect spread={40} glow={true} disabled={false} proximity={60} inactiveZone={0.01} borderWidth={2} />
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "0.4rem",
          borderRadius: "0.9rem",
          background: "var(--bg-subtle)",
          padding: "1.5rem 1.25rem",
          minHeight: "110px",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: "clamp(2.8rem, 5vw, 3.8rem)",
            fontWeight: 800,
            letterSpacing: "-0.06em",
            color: accentColor,
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {count}{stat.suffix}
        </span>
        <span style={{ fontSize: "0.72rem", color: "var(--fg-muted)", lineHeight: 1.45, whiteSpace: "pre-line", fontWeight: 500 }}>
          {stat.label}
        </span>
      </div>
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const photoWrapRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsActive, setStatsActive] = useState(false);

  // Cinematic 3D scroll reveal
  useCinematicReveal(sectionRef, { yOffset: 40, rotateX: 2.5, scale: 0.98 });

  // Cursor tilt on photo
  useEffect(() => {
    const el = photoWrapRef.current;
    if (!el) return;
    let cx = 0, cy = 0, rx = 0, ry = 0, raf = 0;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      rx = lerp(rx, cy, 0.08);
      ry = lerp(ry, cx, 0.08);
      el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      raf = requestAnimationFrame(tick);
    };
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      cx = ((e.clientX - rect.left - rect.width / 2) / rect.width) * 12;
      cy = ((e.clientY - rect.top - rect.height / 2) / rect.height) * -12;
    };
    const onLeave = () => { cx = 0; cy = 0; };
    raf = requestAnimationFrame(tick);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { cancelAnimationFrame(raf); el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);

  // IntersectionObserver for counter trigger
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsActive(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // GSAP scroll animations
  useEffect(() => {
    (async () => {
      const { gsap, ScrollTrigger } = await loadGSAP();

      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -32, rotateX: 4 },
        {
          opacity: 1, x: 0, rotateX: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%", toggleActions: "play none none reverse" },
        }
      );

      gsap.fromTo(
        photoWrapRef.current,
        { opacity: 0, x: 32, scale: 0.95, rotateY: -6 },
        {
          opacity: 1, x: 0, scale: 1, rotateY: 0, duration: 1, delay: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 82%", toggleActions: "play none none reverse" },
        }
      );

      // Scroll parallax on photo
      gsap.to(photoWrapRef.current, {
        y: -35,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });

      ScrollTrigger.refresh();
    })();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-pad"
      style={{ position: "relative", zIndex: 1, background: "var(--bg)" }}
    >
      <div className="container-site">
        {/* Interactive heading */}
        <div style={{ marginBottom: "2.5rem", display: "flex", gap: "2rem", flexWrap: "wrap", alignItems: "center" }}>
          <MagneticText text="ANALYST" hoverText="BUILDER" className="text-[var(--fg)]" />
          <MagneticText text="ENGINEER" hoverText="CREATOR" className="text-[var(--fg-muted)]" />
        </div>

        {/* Two-column layout */}
        <div className="about-layout" style={{ display: "grid", gridTemplateColumns: "1fr 260px", gap: "3.5rem", alignItems: "start" }}>

          {/* Left: text + tags + stats */}
          <div ref={leftRef}>
            {/* Main bio card */}
            <div style={{ position: "relative", borderRadius: "1.5rem", padding: "3px", marginBottom: "1.5rem" }}>
              <GlowingEffect spread={80} glow={true} disabled={false} proximity={100} inactiveZone={0.01} borderWidth={2} />
              <div
                style={{
                  position: "relative",
                  borderRadius: "1.25rem",
                  overflow: "hidden",
                  background: "var(--bg-card)",
                  padding: "clamp(1.75rem, 3.5vw, 2.75rem)",
                }}
              >
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 15% 50%, rgba(74,111,165,0.1) 0%, transparent 60%)", pointerEvents: "none" }} />
                <p
                  style={{
                    position: "relative",
                    fontSize: "clamp(1rem, 1.9vw, 1.2rem)",
                    lineHeight: 1.8,
                    color: "var(--fg)",
                    letterSpacing: "-0.02em",
                    fontWeight: 400,
                  }}
                >
                  Business and Data Analyst with international experience across France and Colombia,
                  specializing in B2B partnerships and operational analytics. I build AI integrated
                  workflows and translate complex data into pricing, margin, and growth decisions using
                  SQL, Python, and Tableau, spanning European and American time zones.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1.5rem", position: "relative" }}>
                  {TAGS.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </div>

            {/* Animated stat cards */}
            <div
              ref={statsRef}
              className="about-stats-grid"
              style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0.5rem" }}
            >
              {STATS.map((s, i) => <StatCard key={s.label} stat={s} active={statsActive} index={i} />)}
            </div>
          </div>

          {/* Right: photo in spinning gradient frame */}
          <div className="about-photo" style={{ position: "relative" }}>
            <div
              ref={photoWrapRef}
              style={{ width: "100%", transition: "transform 0.08s ease" }}
            >
              {/* Spinning gradient border */}
              <div style={{ position: "relative", width: "100%", paddingBottom: "130%" }}>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "1.35rem",
                    background: "conic-gradient(from 0deg, #4A6FA5, #7096C8, #a88beb, #ec4899, #f59e0b, #4A6FA5)",
                    animation: "spin-slow 7s linear infinite",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: "3px",
                    borderRadius: "1.15rem",
                    overflow: "hidden",
                    background: "#0f0f0f",
                  }}
                >
                  <img
                    src="/images/daniel-rodriguez.jpeg"
                    alt="Daniel Rodriguez"
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block" }}
                  />
                </div>
              </div>

              {/* Name card */}
              <div style={{ marginTop: "0.85rem", textAlign: "center", padding: "0.8rem 1rem", borderRadius: "0.75rem", background: "var(--bg-card)", border: "1px solid var(--border)" }}>
                <p style={{ fontSize: "0.9rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--fg)" }}>Daniel Rodriguez</p>
                <p style={{ fontSize: "0.7rem", color: "var(--fg-muted)", marginTop: "0.15rem" }}>Business & Data Analyst</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-layout {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .about-photo {
            max-width: 220px;
            margin: 0 auto;
          }
          .about-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .about-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
