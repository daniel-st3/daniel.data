"use client";

import { useEffect, useRef } from "react";
import { loadGSAP } from "@/lib/gsap";
import { useCinematicReveal } from "@/lib/useCinematicReveal";
import { ArrowRight } from "lucide-react";

const IMG = (name: string) => `/github_images/${encodeURIComponent(name)}`;

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

const ROW_1: ProjectItem[] = [
  {
    id: "ai-cfo-agent",
    title: "AI CFO Agent",
    description: "Self-hosted financial intelligence for startups. Upload a CSV → board-ready finance cockpit in 30 sec. Health scores, KPI tracking, Monte Carlo survival, runway modeling, fraud detection, autonomous agent loop. 24 features · $0.003/run.",
    href: "https://github.com/daniel-st3/ai-cfo-agent",
    image: "/images/gradient-desktop-bg.jpeg",
  },
  {
    id: "nlp-thesis",
    title: "Predictive NLP Financial Pipeline",
    description: "End to end ML pipeline quantifying political bias in financial news. Retail Reddit sentiment outperforms professional news by 50x as a short term price predictor.",
    href: "https://github.com/daniel-st3/Daniel_Rodriguez_MSc_Thesis_Final",
    image: IMG("Perplexity Blog.jpeg"),
  },
  {
    id: "nl2sql",
    title: "NL2SQL Analytics Agent",
    description: "Natural language to SQL for B2B fintech using Claude API. Users query in English or Spanish and the agent generates and executes SQL with full transparency.",
    href: "https://github.com/daniel-st3/python3-payments_nl_sql_agent",
    image: IMG("Perplexity Blog (1).jpeg"),
  },
  {
    id: "fraud",
    title: "Fraud Detection System",
    description: "Calibrated RandomForest fraud scorer with behavioral feature engineering and a real time interactive Dash dashboard for transaction monitoring.",
    href: "https://github.com/daniel-st3/fraud-detection-system",
    image: IMG("Nowhere.jpeg"),
  },
  {
    id: "growth-center",
    title: "Personal Growth Command Center",
    description: "A comprehensive personal growth tracking system with goal setting, habit tracking, and AI powered insights for continuous self improvement.",
    href: "https://github.com/daniel-st3/personal-growth-command-center",
    image: IMG("Dreamscape.jpeg"),
  },
];

const ROW_2: ProjectItem[] = [
  {
    id: "reconciliation",
    title: "B2B Reconciliation Automation",
    description: "Fuzzy matching payments reconciliation across ERP and bank records using Jaro Winkler. Classifies into 5 status categories with 5% amount tolerance.",
    href: "https://github.com/daniel-st3/reconciliation-demo",
    image: IMG("If it only gets better.jpeg"),
  },
  {
    id: "tiktok",
    title: "TikTok Content Moderation",
    description: "99%+ recall classifier distinguishing claims vs opinions in TikTok video content, built for the Google Advanced Data Analytics capstone.",
    href: "https://github.com/daniel-st3/TikTok-Content-Moderation",
    image: IMG("Eddy Gonzales Yoga.jpeg"),
  },
  {
    id: "sql-chicago",
    title: "Chicago BI Dashboard",
    description: "Interactive BI dashboard analyzing crime, socioeconomic indicators, and school performance across 77 Chicago communities. SQLite + Streamlit + Plotly.",
    href: "https://github.com/daniel-st3/sql-chicago-data-analysis",
    image: IMG("_ (2).jpeg"),
  },
  {
    id: "ai-analytics",
    title: "AI Analytics Prompt Playbook",
    description: "Curated prompt engineering playbook for data analytics workflows with ready to use templates for SQL generation, data cleaning, and insight synthesis.",
    href: "https://github.com/daniel-st3/ai-analytics-prompt-playbook",
    image: IMG("Perplexity Blog.jpeg"),
  },
];

function InfiniteRow({ items, direction = "left", speed = 35 }: { items: ProjectItem[]; direction?: "left" | "right"; speed?: number }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let animId: number;
    let pos = 0;
    const cardWidth = 360 + 20; // card + gap
    const totalWidth = cardWidth * items.length;
    const dir = direction === "left" ? -1 : 1;
    let paused = false;

    const animate = () => {
      if (!paused) {
        pos += (speed / 60) * dir;
        if (direction === "left" && pos <= -totalWidth) pos += totalWidth;
        if (direction === "right" && pos >= 0) pos -= totalWidth;
      }
      track.style.transform = `translateX(${pos}px)`;
      animId = requestAnimationFrame(animate);
    };

    // Start with offset for right direction
    if (direction === "right") pos = -totalWidth;

    const onEnter = () => { paused = true; };
    const onLeave = () => { paused = false; };

    track.addEventListener("mouseenter", onEnter);
    track.addEventListener("mouseleave", onLeave);
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      track.removeEventListener("mouseenter", onEnter);
      track.removeEventListener("mouseleave", onLeave);
    };
  }, [items, direction, speed]);

  // Double the items for seamless loop
  const doubled = [...items, ...items];

  return (
    <div style={{ overflow: "hidden", width: "100%", padding: "0.5rem 0" }}>
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: "20px",
          width: "fit-content",
          willChange: "transform",
        }}
      >
        {doubled.map((item, idx) => (
          <a
            key={`${item.id}-${idx}`}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
            style={{
              display: "block",
              width: 360,
              flexShrink: 0,
              borderRadius: 14,
              overflow: "hidden",
              textDecoration: "none",
              position: "relative",
              transition: "transform 0.35s ease, box-shadow 0.35s ease",
            }}
          >
            <div style={{ position: "relative", width: "100%", height: 380, overflow: "hidden" }}>
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  transition: "transform 0.5s ease",
                }}
              />
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, rgba(3,7,18,0) 25%, rgba(3,7,18,0.5) 60%, rgba(3,7,18,0.92) 100%)",
              }} />
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem", color: "#fff" }}>
                <div style={{ fontSize: "1.05rem", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "0.4rem", lineHeight: 1.3 }}>{item.title}</div>
                <div style={{
                  fontSize: "0.78rem",
                  color: "rgba(255,255,255,0.72)",
                  lineHeight: 1.5,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical" as const,
                  overflow: "hidden",
                }}>{item.description}</div>
                <div style={{ display: "flex", alignItems: "center", marginTop: "0.75rem", fontSize: "0.75rem", color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>
                  View more <ArrowRight style={{ marginLeft: 6, width: 14, height: 14 }} />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useCinematicReveal(sectionRef, { yOffset: 45, rotateX: 2, scale: 0.97 });

  useEffect(() => {
    (async () => {
      const { gsap, ScrollTrigger } = await loadGSAP();
      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        }
      );
      ScrollTrigger.refresh();
    })();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-pad"
      style={{
        position: "relative",
        zIndex: 1,
        overflow: "hidden",
        background: "linear-gradient(to bottom, rgba(255,246,233,0.58) 0%, rgba(245,236,221,0) 16%, transparent 100%)",
      }}
    >
      <div className="container-site">
        <div
          ref={headRef}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 500,
                letterSpacing: "-0.04em",
                color: "var(--fg)",
              }}
            >
              Projects
            </h2>
            <p style={{ fontSize: "0.9rem", color: "var(--fg-muted)", marginTop: "0.5rem", maxWidth: "48ch", lineHeight: 1.6 }}>
              Real world ML, AI, and analytics systems built for finance, operations, and B2B.
              Each project is open source and production oriented.
            </p>
          </div>
          <a
            href="https://github.com/daniel-st3"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "0.825rem", color: "var(--fg-muted)", fontWeight: 500, transition: "color 0.2s ease", textDecoration: "none" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--accent)")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--fg-muted)")}
          >
            View all on GitHub
          </a>
        </div>
      </div>

      {/* Row 1: scroll left */}
      <InfiniteRow items={ROW_1} direction="left" speed={30} />

      {/* Row 2: scroll right */}
      <div style={{ marginTop: "0.75rem" }}>
        <InfiniteRow items={ROW_2} direction="right" speed={25} />
      </div>

      <style>{`
        .project-card:hover {
          transform: translateY(-8px) scale(1.02) !important;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3) !important;
        }
        .project-card:hover img {
          transform: scale(1.08) !important;
        }
        @media (max-width: 640px) {
          .project-card {
            width: 300px !important;
          }
        }
      `}</style>
    </section>
  );
}
