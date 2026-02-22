"use client";

import { useEffect, useRef, useState } from "react";
import { loadGSAP } from "@/lib/gsap";
import { useCinematicReveal } from "@/lib/useCinematicReveal";
import { Briefcase, GraduationCap, Users, MapPin, Calendar, ChevronDown, ChevronUp } from "lucide-react";

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
    role: "Strategic Partnerships Management Intern, B2B",
    period: "Jul to Dec 2025",
    location: "Paris, France",
    bullets: [
      "Built SQL pricing models monitoring 200K+ weekly GMV; findings renegotiated tender offers.",
      "Automated Looker dashboards, cutting weekly reporting by 8h and expanding KPIs from 8 to 20+.",
      "Pan European market mapping across 5 countries; qualified 50+ leads for a 240K pipeline.",
      "Coordinated partner integration across Product, Tech, and Business in multi timezone workflows.",
    ],
  },
  {
    year: "2024",
    type: "education",
    badge: "MSc",
    org: "KEDGE Business School",
    role: "MSc Data Analytics for Business",
    period: "2024 to 2026",
    location: "Bordeaux, France",
    bullets: [
      "Thesis: AI Driven Analysis of Political Bias in Financial Media, defending Feb 2026.",
      "Colfuturo Scholar (merit based) + 5,000 KEDGE Academic Scholarship.",
      "All coursework completed; pending final thesis defense.",
    ],
  },
  {
    year: "2024",
    type: "consulting",
    badge: "Consulting",
    org: "Consultorio del Servicio, Universidad de La Sabana",
    role: "SME Consultant & AI Trainer",
    period: "Jan to Jun 2024",
    location: "Bogota, Colombia",
    bullets: [
      "Advised 50+ SMEs on digitalization and AI based operational strategy.",
      "Delivered in person data and AI training sessions to small business owners.",
      "Led consulting, training and development, and performance tracking programs.",
    ],
  },
  {
    year: "2022",
    type: "education",
    badge: "B.Sc.",
    org: "Universidad de La Sabana",
    role: "BSc International Business",
    period: "2022 to 2024",
    location: "Bogota, Colombia",
    bullets: [
      "Added as a second undergraduate degree alongside Business Administration.",
      "Focus areas: global trade, international market strategy, and cross cultural management.",
      "Graduated with distinction as part of the dual degree program.",
    ],
  },
  {
    year: "2020",
    type: "education",
    badge: "B.Sc.",
    org: "Universidad de La Sabana",
    role: "BSc Business Administration",
    period: "2020 to 2024",
    location: "Bogota, Colombia",
    bullets: [
      "Full Academic Excellence Scholarship. Top 1% of cohort; 3x Distinguished Student Award.",
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

const TYPE_ICONS: Record<string, typeof Briefcase> = {
  work: Briefcase,
  education: GraduationCap,
  consulting: Users,
};

const TYPE_LABELS: Record<string, string> = {
  work: "Work",
  education: "Education",
  consulting: "Consulting",
};

function TimelineCard({ entry, index }: { entry: TimelineEntry; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);
  const Icon = TYPE_ICONS[entry.type];
  const color = TYPE_COLORS[entry.type];

  return (
    <div
      data-entry="true"
      className="timeline-entry"
      style={{
        position: "relative",
        paddingLeft: "3.5rem",
        opacity: 1,
      }}
    >
      {/* Timeline dot */}
      <div
        className="timeline-dot"
        style={{
          position: "absolute",
          left: "calc(var(--timeline-line-left, 31px) - 16px)",
          top: 8,
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: color,
          border: "3px solid var(--bg)",
          boxShadow: `0 0 20px ${color}60`,
          zIndex: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "box-shadow 0.3s ease, transform 0.3s ease",
        }}
      >
        <Icon size={14} color="#fff" strokeWidth={2.5} />
      </div>

      {/* Year + meta row */}
      <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
        <span
          className="timeline-year"
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4rem)",
            fontWeight: 800,
            letterSpacing: "-0.06em",
            color: color,
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          {entry.year}
        </span>
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{
            fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em",
            textTransform: "uppercase", color: color,
            background: `${color}15`, border: `1px solid ${color}35`,
            borderRadius: "999px", padding: "0.2rem 0.6rem",
          }}>
            {TYPE_LABELS[entry.type]}
          </span>
          {entry.badge && (
            <span style={{
              fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.06em",
              color: "var(--fg-muted)", background: "var(--bg-subtle)",
              border: "1px solid var(--border)", borderRadius: "999px",
              padding: "0.2rem 0.6rem",
            }}>
              {entry.badge}
            </span>
          )}
        </div>
      </div>

      {/* Interactive content card */}
      <div
        className="timeline-card"
        onClick={() => setExpanded(!expanded)}
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "1rem",
          overflow: "hidden",
          cursor: "pointer",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = color;
          e.currentTarget.style.boxShadow = `0 6px 30px ${color}15`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Header always visible */}
        <div style={{ padding: "1.5rem 1.75rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "1.1rem", fontWeight: 600, letterSpacing: "-0.02em", color: "var(--fg)", lineHeight: 1.3 }}>
              {entry.org}
            </p>
            <p style={{ fontSize: "0.88rem", color: "var(--fg-muted)", marginTop: "0.2rem", fontWeight: 500 }}>
              {entry.role}
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", color: "var(--fg-subtle)" }}>
                <Calendar size={11} /> {entry.period}
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", color: "var(--fg-subtle)" }}>
                <MapPin size={11} /> {entry.location}
              </span>
            </div>
          </div>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: "var(--bg-subtle)", border: "1px solid var(--border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0, transition: "background 0.2s ease",
          }}>
            {expanded ? <ChevronUp size={14} color="var(--fg-muted)" /> : <ChevronDown size={14} color="var(--fg-muted)" />}
          </div>
        </div>

        {/* Expandable bullets */}
        <div style={{
          maxHeight: expanded ? "500px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
          opacity: expanded ? 1 : 0,
        }}>
          <div style={{ padding: "0 1.75rem 1.5rem", borderTop: expanded ? "1px solid var(--border)" : "none", paddingTop: expanded ? "1.25rem" : 0 }}>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.55rem", listStyle: "none", padding: 0, margin: 0 }}>
              {entry.bullets.map((b, j) => (
                <li key={j} style={{ display: "flex", gap: "0.6rem", fontSize: "0.88rem", color: "var(--fg-muted)", lineHeight: 1.7 }}>
                  <span style={{ color, flexShrink: 0, marginTop: "0.35rem", fontSize: "0.4rem" }}>&#9670;</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useCinematicReveal(sectionRef, { yOffset: 40, rotateX: 2, scale: 0.98 });

  useEffect(() => {
    (async () => {
      const { gsap, ScrollTrigger } = await loadGSAP();

      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: headRef.current, start: "top 85%", toggleActions: "play none none reverse" } }
      );

      // Animated timeline line grows as you scroll
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: sectionRef.current, start: "top 65%", end: "bottom 85%", scrub: 1 } }
      );

      // Stagger card entrances
      const cards = sectionRef.current?.querySelectorAll(".timeline-entry");
      if (cards) {
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, x: -40, y: 16 },
            {
              opacity: 1, x: 0, y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none reverse" },
            }
          );
        });
      }

      ScrollTrigger.refresh();
    })();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="section-pad" style={{ position: "relative", zIndex: 1 }}>
      <div className="container-site">
        <div ref={headRef} style={{ marginBottom: "3.5rem" }}>
          <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 500, letterSpacing: "-0.04em", color: "var(--fg)" }}>
            Experience & Education
          </h2>
          <p style={{ fontSize: "0.9rem", color: "var(--fg-muted)", marginTop: "0.5rem", maxWidth: "55ch", lineHeight: 1.7 }}>
            Most recent first. Scroll to travel back in time. Click each entry to expand details.
          </p>
        </div>

        <div
          className="experience-timeline-wrap"
          style={{
            position: "relative",
            paddingLeft: "2rem",
            ["--timeline-line-left" as string]: "calc(2rem - 1px)",
          }}
        >
          {/* Animated vertical line */}
          <div
            ref={lineRef}
            style={{
              position: "absolute",
              left: "var(--timeline-line-left)",
              top: 0,
              bottom: 0,
              width: 2,
              background: "linear-gradient(to bottom, var(--accent), rgba(74,111,165,0.1))",
              transformOrigin: "top center",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {TIMELINE.map((entry, i) => (
              <TimelineCard key={`${entry.year}-${i}`} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .timeline-entry:hover .timeline-dot {
          transform: scale(1.15) !important;
          box-shadow: 0 0 28px currentColor !important;
        }
        .timeline-card:active {
          transform: scale(0.99) !important;
        }
        @media (max-width: 768px) {
          #experience .experience-timeline-wrap {
            --timeline-line-left: calc(1rem - 1px);
            padding-left: 1rem !important;
          }
        }
      `}} />
    </section>
  );
}
