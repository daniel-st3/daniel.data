"use client";

import { useEffect, useRef } from "react";
import { loadGSAP } from "@/lib/gsap";

interface TimelineEntry {
  year: string;
  type: "work" | "education" | "consulting";
  org: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  badge?: string;
}

const TIMELINE: TimelineEntry[] = [
  {
    year: "2025",
    type: "work",
    badge: "Most Recent",
    org: "Back Market",
    role: "Strategic Partnerships Management Intern — B2B",
    period: "Jul – Dec 2025",
    location: "Paris, France",
    bullets: [
      "Built SQL pricing models monitoring €200K+ weekly GMV; findings renegotiated tender offers.",
      "Automated Looker dashboards, cutting weekly reporting by 8h and expanding KPIs from 8 to 20+.",
      "Pan-European market mapping across 5 countries; qualified 50+ leads for a €240K pipeline.",
      "Coordinated partner integration across Product, Tech, and Business in multi-timezone workflows.",
    ],
  },
  {
    year: "2024",
    type: "education",
    badge: "MSc",
    org: "KEDGE Business School",
    role: "MSc Data Analytics for Business",
    period: "2024 – 2026",
    location: "Bordeaux, France",
    bullets: [
      "Thesis: AI-Driven Analysis of Political Bias in Financial Media — defending Feb 2026.",
      "Colfuturo Scholar (merit-based) + €5,000 KEDGE Academic Scholarship.",
      "All coursework completed; pending final thesis defense.",
    ],
  },
  {
    year: "2024",
    type: "consulting",
    badge: "Consulting",
    org: "Consultorio del Servicio — Universidad de La Sabana",
    role: "SME Consultant & AI Trainer",
    period: "Jan – Jun 2024",
    location: "Bogotá, Colombia",
    bullets: [
      "Advised 50+ SMEs on digitalization and AI-based operational strategy.",
      "Delivered in-person data and AI training sessions to small business owners.",
      "Led consulting, training and development, and performance tracking programs.",
    ],
  },
  {
    year: "2022",
    type: "education",
    badge: "B.Sc.",
    org: "Universidad de La Sabana",
    role: "BSc International Business",
    period: "2022 – 2024",
    location: "Bogotá, Colombia",
    bullets: [
      "Added as a second undergraduate degree alongside Business Administration.",
      "Focus areas: global trade, international market strategy, and cross-cultural management.",
      "Graduated with distinction as part of the dual-degree program.",
    ],
  },
  {
    year: "2020",
    type: "education",
    badge: "B.Sc.",
    org: "Universidad de La Sabana",
    role: "BSc Business Administration",
    period: "2020 – 2024",
    location: "Bogotá, Colombia",
    bullets: [
      "Full Academic Excellence Scholarship — Top 1% of cohort; 3× Distinguished Student Award.",
      "Teaching Assistant: built 3 analytics modules, managed 60+ student cohort.",
      "Dual degree program with International Business (added in 2022).",
    ],
  },
];

const TYPE_COLORS: Record<string, string> = {
  work: "var(--accent)",
  education: "#7096C8",
  consulting: "#a88beb",
};

const TYPE_LABELS: Record<string, string> = {
  work: "Work",
  education: "Education",
  consulting: "Consulting",
};

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const yearRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    (async () => {
      const { gsap, ScrollTrigger } = await loadGSAP();

      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: headRef.current, start: "top 85%", toggleActions: "play none none reverse" } }
      );

      // Vertical line grows as you scroll through the section
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top 65%", end: "bottom 85%", scrub: 1 } }
      );

      // Year numbers: appear and drift upward with scroll (parallax)
      yearRefs.current.forEach((el) => {
        if (!el) return;
        const entryEl = el.closest("[data-entry]") as HTMLElement;
        gsap.fromTo(
          el,
          { y: 20 },
          {
            y: -15,
            ease: "none",
            scrollTrigger: { trigger: entryEl, start: "top 88%", end: "bottom 20%", scrub: 0.9 },
          }
        );
      });

      // Cards alternate left / right entrance
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, x: i % 2 === 0 ? -60 : 60, y: 20 },
          { opacity: 1, x: 0, y: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 83%", toggleActions: "play none none reverse" } }
        );
      });

      ScrollTrigger.refresh();
    })();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="section-pad" style={{ position: "relative", zIndex: 1 }}>
      <div className="divider" style={{ marginBottom: "3rem" }} />
      <div className="container-site">

        <div ref={headRef} style={{ marginBottom: "4rem" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 500, letterSpacing: "-0.04em", color: "var(--fg)" }}>
            Experience &amp; Education
          </h2>
          <p style={{ fontSize: "0.9rem", color: "var(--fg-muted)", marginTop: "0.5rem" }}>
            Most recent first — scroll to travel back in time.
          </p>
        </div>

        <div style={{ position: "relative", paddingLeft: "2rem" }}>
          {/* Vertical line */}
          <div
            ref={lineRef}
            style={{
              position: "absolute",
              left: "calc(2rem - 1px)",
              top: 0,
              bottom: 0,
              width: 2,
              background: "linear-gradient(to bottom, var(--accent), rgba(74,111,165,0.15))",
              transformOrigin: "top center",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            {TIMELINE.map((entry, i) => (
              <div
                key={`${entry.year}-${i}`}
                data-entry="true"
                ref={(el) => { if (el) cardsRef.current[i] = el; }}
                style={{ position: "relative", paddingLeft: "2.5rem" }}
              >
                {/* Glowing timeline dot */}
                <div
                  style={{
                    position: "absolute",
                    left: -10,
                    top: 16,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: TYPE_COLORS[entry.type],
                    border: "3px solid var(--bg)",
                    boxShadow: `0 0 22px ${TYPE_COLORS[entry.type]}90`,
                    zIndex: 1,
                  }}
                />

                {/* Year number + type badges */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                  <span
                    ref={(el) => { if (el) yearRefs.current[i] = el; }}
                    style={{
                      fontSize: "clamp(3.2rem, 6.5vw, 5.5rem)",
                      fontWeight: 800,
                      letterSpacing: "-0.07em",
                      color: TYPE_COLORS[entry.type],
                      opacity: 0.85,
                      lineHeight: 1,
                      userSelect: "none",
                      display: "inline-block",
                    }}
                  >
                    {entry.year}
                  </span>
                  <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                    <span
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: TYPE_COLORS[entry.type],
                        background: `${TYPE_COLORS[entry.type]}18`,
                        border: `1px solid ${TYPE_COLORS[entry.type]}40`,
                        borderRadius: "999px",
                        padding: "0.2rem 0.65rem",
                      }}
                    >
                      {TYPE_LABELS[entry.type]}
                    </span>
                    {entry.badge && (
                      <span
                        style={{
                          fontSize: "0.65rem",
                          fontWeight: 600,
                          letterSpacing: "0.06em",
                          color: "var(--fg-muted)",
                          background: "var(--bg-subtle)",
                          border: "1px solid var(--border)",
                          borderRadius: "999px",
                          padding: "0.2rem 0.65rem",
                        }}
                      >
                        {entry.badge}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content card */}
                <div
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "1rem",
                    padding: "1.75rem 2rem",
                    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = TYPE_COLORS[entry.type];
                    e.currentTarget.style.boxShadow = `0 4px 32px ${TYPE_COLORS[entry.type]}20`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <p style={{ fontSize: "1.2rem", fontWeight: 600, letterSpacing: "-0.03em", color: "var(--fg)", marginBottom: "0.25rem" }}>
                    {entry.org}
                  </p>
                  <p style={{ fontSize: "0.9rem", color: "var(--fg-muted)", marginBottom: "0.25rem" }}>
                    {entry.role}
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "var(--fg-subtle)", marginBottom: "1.4rem" }}>
                    {entry.period} · {entry.location}
                  </p>
                  <ul style={{ display: "flex", flexDirection: "column", gap: "0.55rem", listStyle: "none", padding: 0, margin: 0 }}>
                    {entry.bullets.map((b, j) => (
                      <li key={j} style={{ display: "flex", gap: "0.6rem", fontSize: "0.9rem", color: "var(--fg-muted)", lineHeight: 1.65 }}>
                        <span style={{ color: TYPE_COLORS[entry.type], flexShrink: 0, marginTop: "0.2rem", fontSize: "0.55rem" }}>◆</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
