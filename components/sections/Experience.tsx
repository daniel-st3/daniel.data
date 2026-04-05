"use client";

import { useEffect, useRef } from "react";
import { loadGSAP } from "@/lib/gsap";
import { Briefcase, GraduationCap, Users, MapPin, Calendar } from "lucide-react";

interface Entry {
  year: string;
  type: "work" | "education" | "consulting";
  org: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  badge?: string;
}

const TIMELINE: Entry[] = [
  {
    year: "2026",
    type: "work" as const,
    badge: "Present",
    org: "Freelance",
    role: "AI & Data Analyst, Independent",
    period: "Jan 2026 – Present",
    location: "Bogotá, Colombia · Remote",
    bullets: [
      "Building agentic AI pipelines and automation workflows using Claude API, LangGraph, and FastAPI for SME and startup clients.",
      "Delivering BI dashboards, pricing models, and data strategy across sectors; clients in Europe and the Americas.",
      "Developed full-stack AI CFO agent (open source): 24-feature financial intelligence tool, $0.003/run cost.",
      "Advising founders and operators on AI adoption, data infrastructure, and go-to-market analytics.",
    ],
  },
  {
    year: "2025",
    type: "work",
    badge: "Most Recent",
    org: "Back Market",
    role: "Strategic Partnerships, B2B",
    period: "Jul – Dec 2025",
    location: "Paris, France",
    bullets: [
      "Built SQL pricing models monitoring 200K+ weekly GMV; findings renegotiated tender offers.",
      "Automated Looker dashboards, cutting weekly reporting by 8h and expanding KPIs from 8 to 20+.",
      "Pan-European market mapping across 5 countries; qualified 50+ leads for a €240K pipeline.",
      "Coordinated partner integration across Product, Tech, and Business in multi-timezone workflows.",
    ],
  },
  {
    year: "2024",
    type: "education",
    badge: "Best Thesis Finalist",
    org: "KEDGE Business School",
    role: "MSc Data Analytics for Business",
    period: "2024 – 2026",
    location: "Bordeaux, France",
    bullets: [
      "Thesis: AI-Driven Analysis of Political Bias in Financial Media, defended Feb 2026, Best Thesis finalist.",
      "Colfuturo Scholar (merit-based) + €5,000 KEDGE Academic Scholarship.",
      "Full coursework completed; thesis committee awarded distinction.",
    ],
  },
  {
    year: "2024",
    type: "consulting",
    badge: "Consulting",
    org: "U. de La Sabana",
    role: "SME Consultant & AI Trainer",
    period: "Jan – Jun 2024",
    location: "Bogota, Colombia",
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
    location: "Bogota, Colombia",
    bullets: [
      "Added as a second undergraduate degree alongside Business Administration.",
      "Focus: global trade, international market strategy, and cross-cultural management.",
      "Graduated with distinction as part of the dual degree program.",
    ],
  },
  {
    year: "2020",
    type: "education",
    badge: "B.Sc.",
    org: "Universidad de La Sabana",
    role: "BSc Business Administration",
    period: "2020 – 2024",
    location: "Bogota, Colombia",
    bullets: [
      "Full Academic Excellence Scholarship. Top 1% of cohort; 3× Distinguished Student Award.",
      "Teaching Assistant: built 3 analytics modules, managed 60+ student cohort.",
      "Dual degree program with International Business (added in 2022).",
    ],
  },
];

const COLORS: Record<string, string> = {
  work:       "#c36f3d",
  education:  "#d3a16d",
  consulting: "#b8896e",
};

const ICONS: Record<string, typeof Briefcase> = {
  work:       Briefcase,
  education:  GraduationCap,
  consulting: Users,
};

const TYPE_LABEL: Record<string, string> = {
  work:       "Work",
  education:  "Education",
  consulting: "Consulting",
};

function EntryCard({ entry }: { entry: Entry }) {
  const color = COLORS[entry.type];
  const Icon  = ICONS[entry.type];

  return (
    <div
      className="exp-card"
      style={{
        flexShrink: 0,
        width: "clamp(290px, 36vw, 400px)",
        scrollSnapAlign: "start",
        borderRadius: "1.5rem",
        border: `1px solid ${color}35`,
        background: "var(--bg-card)",
        padding: "1.75rem",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "0.85rem",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.boxShadow = `0 12px 40px ${color}18`;
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${color}35`;
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Top accent line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: `linear-gradient(90deg, ${color}, transparent)` }} />

      {/* Year + tags */}
      <div>
        <div style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)", fontWeight: 800, letterSpacing: "-0.07em", color, lineHeight: 1, marginBottom: "0.65rem", userSelect: "none" }}>
          {entry.year}
        </div>
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          <span style={{
            fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
            color, background: `${color}16`, border: `1px solid ${color}35`,
            borderRadius: "999px", padding: "0.18rem 0.55rem",
            display: "inline-flex", alignItems: "center", gap: "0.3rem",
          }}>
            <Icon size={9} strokeWidth={2.5} />
            {TYPE_LABEL[entry.type]}
          </span>
          {entry.badge && (
            <span style={{
              fontSize: "0.58rem", fontWeight: 600,
              color: "var(--fg-muted)", background: "var(--bg-subtle)",
              border: "1px solid var(--border)", borderRadius: "999px",
              padding: "0.18rem 0.55rem",
            }}>
              {entry.badge}
            </span>
          )}
        </div>
      </div>

      {/* Org + role */}
      <div>
        <p style={{ fontSize: "1rem", fontWeight: 600, letterSpacing: "-0.025em", color: "var(--fg)", lineHeight: 1.25, marginBottom: "0.25rem" }}>
          {entry.org}
        </p>
        <p style={{ fontSize: "0.83rem", color: "var(--fg-muted)", fontWeight: 500 }}>
          {entry.role}
        </p>
      </div>

      {/* Meta */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.7rem", color: "var(--fg-subtle)" }}>
          <Calendar size={10} /> {entry.period}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", fontSize: "0.7rem", color: "var(--fg-subtle)" }}>
          <MapPin size={10} /> {entry.location}
        </span>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "var(--border)" }} />

      {/* Bullets — always expanded */}
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.55rem", flexGrow: 1 }}>
        {entry.bullets.map((b, i) => (
          <li key={i} style={{ display: "flex", gap: "0.55rem", fontSize: "0.82rem", color: "var(--fg-muted)", lineHeight: 1.62 }}>
            <span style={{ color, flexShrink: 0, marginTop: "0.45rem", fontSize: "0.35rem" }}>◆</span>
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const { gsap, ScrollTrigger } = await loadGSAP();

      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 95%", toggleActions: "play none none none" },
        }
      );

      const cards = trackRef.current?.querySelectorAll(".exp-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, x: 100 },
          {
            opacity: 1, x: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: trackRef.current, start: "top 95%", toggleActions: "play none none none" },
          }
        );
      }

      ScrollTrigger.refresh();
    })();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="section-pad section-dark" style={{ position: "relative", zIndex: 1, background: "linear-gradient(160deg, #1a1410 0%, #0f0c0a 50%, #111010 100%)", overflow: "hidden", paddingTop: "5rem", paddingBottom: "2rem" }}>
      <div className="container-site">
        <div ref={headRef} style={{ marginBottom: "2rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p className="section-label" style={{ marginBottom: "0.5rem", color: "rgba(255,255,255,0.45)" }}>Career Path</p>
            <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 600, letterSpacing: "-0.04em", color: "#fff", lineHeight: 1.0 }}>
              Experience & Education
            </h2>
          </div>
          <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.35)" }}>Scroll sideways to explore →</p>
        </div>
      </div>

      {/* Native horizontal snap-scroll track */}
      <div
        ref={trackRef}
        className="exp-track"
        data-lenis-prevent
        style={{
          display: "flex",
          gap: "1.25rem",
          overflowX: "auto",
          overflowY: "visible",
          scrollSnapType: "x mandatory",
          paddingBottom: "1.5rem",
          paddingLeft: "max(2rem, calc((100vw - 1100px) / 2 + 2rem))",
          paddingRight: "max(2rem, calc((100vw - 1100px) / 2 + 2rem))",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
          cursor: "grab",
        }}
        onMouseDown={(e) => {
          const el = e.currentTarget;
          el.style.cursor = "grabbing";
          const startX = e.pageX - el.offsetLeft;
          const scrollLeft = el.scrollLeft;
          const onMove = (ev: MouseEvent) => { el.scrollLeft = scrollLeft - (ev.pageX - el.offsetLeft - startX); };
          const onUp = () => { el.style.cursor = "grab"; window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
          window.addEventListener("mousemove", onMove);
          window.addEventListener("mouseup", onUp);
        }}
      >
        {TIMELINE.map((entry, i) => (
          <EntryCard key={`${entry.year}-${i}`} entry={entry} />
        ))}
      </div>

    </section>
  );
}
