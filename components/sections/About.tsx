"use client";

import { useEffect, useRef, useState } from "react";
import { Award, GraduationCap, Medal, Trophy, type LucideIcon } from "lucide-react";
import { loadGSAP } from "@/lib/gsap";
import { useCinematicReveal } from "@/lib/useCinematicReveal";
import { GlowingEffect } from "@/components/ui/effects/glowing-effect";
import { MagneticText } from "@/components/ui/effects/morphing-cursor";

interface StatDef {
  target: number;
  suffix: string;
  label: string;
  accent?: string;
  icon?: LucideIcon;
}

const STATS: StatDef[] = [
  { target: 4,  suffix: "",  label: "Languages\nEN · ES · FR · PT",           accent: "#a4b1aa" },
  { target: 17, suffix: "",  label: "Certifications\nearned",                  accent: "#c36f3d" },
  { target: 50, suffix: "+", label: "SMEs\nadvised",                           accent: "#78856d" },
  { target: 2,  suffix: "",  label: "Bachelor Degrees\nBusiness & Intl Biz",   accent: "#d3a16d" },
  { target: 1,  suffix: "",  label: "Master's Degree\nData Analytics",         accent: "#b8896e", icon: GraduationCap },
  { target: 2,  suffix: "",  label: "Specializations\n(ML Finance & Adv. Data Analytics)", accent: "#a09a84" },
  { target: 1,  suffix: "★", label: "Best Thesis\nKEDGE 2026",                accent: "#d3a16d", icon: Trophy },
  { target: 1,  suffix: "★", label: "Colfuturo\nScholarship",                  accent: "#c36f3d", icon: Medal },
  { target: 3,  suffix: "×", label: "Distinguished\nStudent Award",            accent: "#78856d" },
  { target: 1,  suffix: "★", label: "KEDGE Academic\nExcellence Grant",        accent: "#b8896e", icon: Award },
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
  const labelLines = stat.label.split("\n");
  const Icon = stat.icon;

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
        e.currentTarget.style.boxShadow = `0 8px 30px rgba(195,111,61,0.12)`;
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
          height: "100%",
          justifyContent: "center",
        }}
      >
        {stat.target === 1 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
            <span
              style={{
                width: "1.9rem",
                height: "1.9rem",
                borderRadius: "999px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                background: `${accentColor}1a`,
                border: `1px solid ${accentColor}45`,
                color: accentColor,
                lineHeight: 1,
                boxShadow: `0 8px 18px ${accentColor}18`,
              }}
            >
              {Icon ? <Icon size={15} strokeWidth={2.2} /> : null}
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
              {labelLines.map((line) => (
                <span
                  key={line}
                  style={{
                    fontSize: "clamp(0.96rem, 1.45vw, 1.04rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.035em",
                    lineHeight: 1.18,
                    color: "var(--fg)",
                    maxWidth: "14ch",
                    fontFamily: "inherit",
                  }}
                >
                  {line}
                </span>
              ))}
            </div>
          </div>
        ) : (
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
        )}
        {stat.target !== 1 ? (
          <span
                style={{
                  fontSize: "0.72rem",
                  color: "var(--fg-muted)",
                  lineHeight: 1.45,
                  whiteSpace: "pre-line",
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </span>
        ) : null}
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
          <MagneticText text="ANALYST" hoverText="STRATEGIST" className="text-[var(--fg)]" />
          <MagneticText text="ENGINEER" hoverText="AUTOMATOR" className="text-[var(--fg-muted)]" />
        </div>

        {/* Two-column layout */}
        <div className="about-layout" style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "3.5rem", alignItems: "stretch" }}>

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
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 15% 50%, rgba(195,111,61,0.1) 0%, transparent 60%)", pointerEvents: "none" }} />
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
                  Business and Data Analyst with international experience across France and Colombia. I specialize in B2B partnerships, operational analytics, and AI-integrated automation. I build agentic AI systems using Claude API, LangGraph, and FastAPI, translating complex data into pricing, margin, and growth decisions. Currently freelancing across data, AI strategy, and automation for startups and SMEs across European and American time zones.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1.5rem", position: "relative" }}>
                  {TAGS.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
            </div>

            {/* Primary stat cards */}
            <div
              ref={statsRef}
              className="about-stats-grid"
              style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0.5rem" }}
            >
              {STATS.slice(0, 5).map((s, i) => <StatCard key={s.label} stat={s} active={statsActive} index={i} />)}
            </div>
          </div>

          {/* Right: photo + name card only */}
          <div className="about-photo" style={{ position: "relative", display: "flex", flexDirection: "column" }}>
            <div
              ref={photoWrapRef}
              style={{ width: "100%", transition: "transform 0.08s ease", display: "flex", flexDirection: "column", flex: 1 }}
            >
              {/* Spinning gradient border — fills available height */}
              <div style={{ position: "relative", width: "100%", flex: 1, minHeight: "280px" }}>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "1.35rem",
                    background: "conic-gradient(from 0deg, #c36f3d, #d3a16d, #b8896e, #78856d, #f0bf7f, #c36f3d)",
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
              <a
                href="https://www.linkedin.com/in/daniel-steven-rodriguez-sandoval/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: "0.85rem",
                  textAlign: "center",
                  padding: "0.8rem 1rem",
                  borderRadius: "0.75rem",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  display: "block",
                  textDecoration: "none",
                  transition: "border-color 0.2s ease, transform 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <p style={{ fontSize: "0.9rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--fg)" }}>Daniel Rodriguez</p>
                <p style={{ fontSize: "0.7rem", color: "var(--fg-muted)", marginTop: "0.15rem" }}>Business & Data Analyst</p>
              </a>
            </div>
          </div>
        </div>

        {/* Awards & distinctions — full-width strip below */}
        <div
          className="about-awards-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "0.5rem", marginTop: "1.25rem" }}
        >
          {STATS.slice(5).map((s, i) => <StatCard key={s.label} stat={s} active={statsActive} index={i + 5} />)}
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
          .about-awards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .about-stats-grid, .about-awards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
