"use client";

import { useEffect, useRef } from "react";
import { loadGSAP } from "@/lib/gsap";
import { Gallery4, Gallery4Item } from "@/components/ui/gallery4";

// github_images/ copied to public/github_images/
const IMG = (name: string) => `/github_images/${encodeURIComponent(name)}`;

const PROJECTS: Gallery4Item[] = [
  {
    id: "nlp-thesis",
    title: "Predictive NLP Financial Pipeline",
    description:
      "End-to-end ML pipeline quantifying political bias in financial news. Retail Reddit sentiment outperforms professional news by 50× as a short-term price predictor.",
    href: "https://github.com/daniel-st3/Daniel_Rodriguez_MSc_Thesis_Final",
    image: IMG("Perplexity Blog.jpeg"),
  },
  {
    id: "reconciliation",
    title: "B2B Reconciliation Automation",
    description:
      "Fuzzy-matching payments reconciliation across ERP and bank records using Jaro-Winkler. Classifies into 5 status categories with ±5% amount tolerance.",
    href: "https://github.com/daniel-st3/reconciliation-demo",
    image: IMG("If it only gets better.jpeg"),
  },
  {
    id: "nl2sql",
    title: "NL2SQL Analytics Agent",
    description:
      "Natural language to SQL for B2B fintech using Claude API. Users query in English or Spanish; the agent generates and executes SQL with full transparency.",
    href: "https://github.com/daniel-st3/python3-payments_nl_sql_agent",
    image: IMG("Perplexity Blog (1).jpeg"),
  },
  {
    id: "fraud",
    title: "Fraud Detection System",
    description:
      "Calibrated RandomForest fraud scorer with behavioral feature engineering and a real-time interactive Dash dashboard for transaction monitoring.",
    href: "https://github.com/daniel-st3/fraud-detection-system",
    image: IMG("Nowhere.jpeg"),
  },
  {
    id: "tiktok",
    title: "TikTok Content Moderation",
    description:
      "99%+ recall classifier distinguishing claims vs. opinions in TikTok video content, built for the Google Advanced Data Analytics capstone.",
    href: "https://github.com/daniel-st3/TikTok-Content-Moderation",
    image: IMG("Eddy Gonzales Yoga.jpeg"),
  },
  {
    id: "sql-chicago",
    title: "Chicago BI Dashboard",
    description:
      "Interactive BI dashboard analyzing crime, socioeconomic indicators, and school performance across 77 Chicago communities. SQLite + Streamlit + Plotly — live in the cloud.",
    href: "https://github.com/daniel-st3/sql-chicago-data-analysis",
    image: IMG("_ (2).jpeg"),
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

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
          scrollTrigger: { trigger: headRef.current, start: "top 85%" },
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
      style={{ position: "relative", zIndex: 1 }}
    >
      <div className="divider" style={{ marginBottom: "3rem" }} />

      <div className="container-site">
        <div
          ref={headRef}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "0.5rem",
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
              Real-world ML, AI, and analytics systems built for finance, operations, and B2B.
              Each project is open source and production-oriented.
            </p>
          </div>
          <a
            href="https://github.com/daniel-st3"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "0.825rem", color: "var(--fg-muted)", fontWeight: 500, transition: "color 0.2s ease" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "var(--accent)")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "var(--fg-muted)")}
          >
            View all on GitHub ↗
          </a>
        </div>
      </div>

      {/* Gallery4 carousel — full width, drag enabled */}
      <Gallery4 items={PROJECTS} />
    </section>
  );
}
