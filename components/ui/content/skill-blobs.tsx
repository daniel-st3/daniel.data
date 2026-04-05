"use client";

import { useEffect, useRef } from "react";

const CATEGORIES = [
  {
    id: "data",
    label: "Data & Analytics",
    symbol: "◈",
    color: "#c36f3d",
    tools: ["SQL", "Python", "Tableau", "Power BI", "Looker", "Excel", "PostgreSQL", "BigQuery", "SQLite", "dbt", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Plotly", "Streamlit", "Google Sheets", "Metabase", "Dashboard Design", "KPI Tracking", "Web Scraping", "Financial Modeling", "EDA", "A/B Testing", "Time Series", "Statistics", "Data Cleaning", "Forecasting"],
  },
  {
    id: "ml",
    label: "Machine Learning",
    symbol: "⬡",
    color: "#b88868",
    tools: ["Scikit-learn", "XGBoost", "TensorFlow", "BERT", "RandomForest", "Monte Carlo", "NLP Pipeline", "Regression", "Classification"],
  },
  {
    id: "ai",
    label: "AI & Agents",
    symbol: "◎",
    color: "#8a6a8a",
    tools: ["Claude API", "Anthropic SDK", "LangGraph", "LangChain", "n8n", "Make", "Vertex AI", "OpenAI", "FastAPI", "Prompt Engineering"],
  },
  {
    id: "cloud",
    label: "Cloud & Engineering",
    symbol: "⬢",
    color: "#5e7a6a",
    tools: ["GCP", "Next.js 15", "FastAPI", "WebSocket", "Alembic", "Git", "ETL Pipelines", "REST APIs", "Docker", "Vercel", "GitHub Actions", "Linux", "Bash", "CI/CD", "Redis", "Nginx"],
  },
  {
    id: "biz",
    label: "Business & Strategy",
    symbol: "◆",
    color: "#7a8a5e",
    tools: ["B2B Partnerships", "Pricing Models", "KPI Design", "Market Mapping", "Go-to-Market", "P&L Analysis", "Commercial Strategy", "SME Consulting", "International Trade", "Market Entry", "Financial Analysis", "Project Management", "Stakeholder Management", "Lead Qualification", "Tender Negotiation", "Partner Integrations", "Pipeline Development", "Revenue Operations", "Cross-Functional Delivery", "Competitive Analysis"],
  },
  {
    id: "lang",
    label: "Languages",
    symbol: "◇",
    color: "#8e9e98",
    tools: ["English (Native)", "Spanish (Native)", "French (B2)", "Portuguese (B2)"],
    bigChips: true,
    badgeLabel: "languages",
  },
];

// Row 1: Data (span-2) + ML (span-1)
// Row 2: AI (span-1) + Cloud (span-2)
// Row 3: Business (span-2) + Languages (span-1)
const COL_SPAN = [2, 1, 1, 2, 2, 1];

type Category = typeof CATEGORIES[0] & { bigChips?: boolean; badgeLabel?: string };

function SkillCard({ cat, colSpan }: { cat: Category; colSpan: number }) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  // Cursor parallax on pills
  useEffect(() => {
    const card  = cardRef.current;
    const pills = pillsRef.current;
    if (!card || !pills || typeof window === "undefined" || !window.matchMedia("(hover: hover)").matches) return;

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      cx = lerp(cx, tx, 0.06);
      cy = lerp(cy, ty, 0.06);
      pills.style.transform = `translate(${cx * 5}px, ${cy * 3}px)`;
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width  - 0.5) * 2;
      ty = ((e.clientY - r.top)  / r.height - 0.5) * 2;
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
    <div
      ref={cardRef}
      className={`skill-card skill-card-span-${colSpan}`}
      style={{
        gridColumn: `span ${colSpan}`,
        borderRadius: "1.25rem",
        border: `1.5px solid ${cat.color}4d`,
        background: `linear-gradient(135deg, ${cat.color}1f 0%, ${cat.color}0a 100%)`,
        padding: "1.75rem 1.75rem 1.75rem 2.25rem",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transition: "border-color 0.28s ease, transform 0.28s ease, box-shadow 0.28s ease",
        // Colored left border accent
        borderLeft: `4px solid ${cat.color}`,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${cat.color}80`;
        el.style.borderLeftColor = cat.color;
        el.style.transform = "translateY(-4px)";
        el.style.boxShadow = `0 16px 48px ${cat.color}22, 0 4px 16px ${cat.color}14`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${cat.color}4d`;
        el.style.borderLeftColor = cat.color;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Large watermark symbol — visual texture */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          bottom: "-0.5rem",
          right: "0.75rem",
          fontSize: "8rem",
          lineHeight: 1,
          color: cat.color,
          opacity: 0.08,
          userSelect: "none",
          pointerEvents: "none",
          fontWeight: 700,
        }}
      >
        {cat.symbol}
      </span>

      {/* Header: symbol + gradient label + count badge */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.55rem", marginBottom: "1.2rem" }}>
        <span style={{ fontSize: "1.05rem", color: cat.color, lineHeight: 1, flexShrink: 0 }}>
          {cat.symbol}
        </span>
        <span
          style={{
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            background: `linear-gradient(90deg, ${cat.color} 0%, ${cat.color}bb 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {cat.label}
        </span>
        {/* Count badge */}
        <span
          style={{
            fontSize: "0.6rem",
            fontWeight: 700,
            color: cat.color,
            background: `${cat.color}18`,
            border: `1px solid ${cat.color}40`,
            borderRadius: "999px",
            padding: "0.1rem 0.45rem",
            letterSpacing: "0.04em",
            flexShrink: 0,
          }}
        >
          {cat.tools.length} {cat.badgeLabel || "tools"}
        </span>
      </div>

      {/* Skill pills */}
      <div ref={pillsRef} style={{ display: "flex", flexWrap: "wrap", gap: "0.55rem", willChange: "transform" }}>
        {cat.tools.map((tool) => (
          <span
            key={tool}
            className={`skill-pill skill-pill-${cat.id}`}
            data-color={cat.color}
            style={{
              display: "inline-block",
              fontSize: cat.bigChips ? "1rem" : "0.82rem",
              fontWeight: 600,
              letterSpacing: "0.01em",
              color: "var(--fg)",
              background: `${cat.color}18`,
              border: `1px solid ${cat.color}40`,
              borderRadius: "8px",
              padding: cat.bigChips ? "0.9rem 1.1rem" : "0.42rem 0.88rem",
              transition: "background 0.18s ease, border-color 0.18s ease, color 0.18s ease, transform 0.18s ease, box-shadow 0.18s ease",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = cat.color;
              el.style.borderColor = cat.color;
              el.style.color = "#ffffff";
              el.style.transform = "translateY(-2px) scale(1.04)";
              el.style.boxShadow = `0 4px 14px ${cat.color}44`;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = `${cat.color}18`;
              el.style.borderColor = `${cat.color}40`;
              el.style.color = "var(--fg)";
              el.style.transform = "translateY(0) scale(1)";
              el.style.boxShadow = "none";
            }}
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function SkillBlobs() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const { gsap, ScrollTrigger } = await import("gsap/all");
      gsap.registerPlugin(ScrollTrigger);
      const cards = gridRef.current?.querySelectorAll(".skill-card");
      if (!cards) return;
      gsap.fromTo(
        cards,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
    })();
  }, []);

  return (
    <>
      <div
        ref={gridRef}
        className="skills-bento-grid"
        style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.85rem" }}
      >
        {CATEGORIES.map((cat, i) => (
          <SkillCard key={cat.id} cat={cat as Category} colSpan={COL_SPAN[i]} />
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 900px) {
          .skills-bento-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .skill-card-span-2 { grid-column: span 2 !important; }
          .skill-card-span-1 { grid-column: span 1 !important; }
        }
        @media (max-width: 560px) {
          .skills-bento-grid { grid-template-columns: 1fr !important; }
          .skill-card-span-2, .skill-card-span-1 { grid-column: span 1 !important; }
        }
      `}} />
    </>
  );
}
