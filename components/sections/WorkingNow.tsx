"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { loadGSAP } from "@/lib/gsap";
import { useCinematicReveal } from "@/lib/useCinematicReveal";
import { RetroGrid } from "@/components/ui/backgrounds/retro-grid";

const BUILDS = [
  {
    title: "AI CFO Agent",
    subtitle:
      "Open-source financial intelligence for startups. Upload a transaction CSV and get a board-ready finance cockpit in 30 seconds — KPI scoring, runway modeling, Monte Carlo survival analysis, fraud detection, and an autonomous agent loop. 24 features at $0.003/run.",
    meta: "Open Source · FastAPI + LangGraph + Claude Haiku · GitHub",
    href: "https://github.com/daniel-st3/ai-cfo-agent",
    label: "View Repository",
    preview: "/images/hero-landscape.png",
    previewAlt: "AI CFO Agent — financial intelligence platform",
    accent: "#c36f3d",
    badge: "Open Source",
  },
  {
    title: "VeedurIA",
    subtitle:
      "AI-powered civic oversight platform for Colombia. Analyzes public contracting data with large language models to detect anomalies, surface transparency insights, and empower citizens and watchdog organizations.",
    meta: "Open Source · Claude API + Python · GitHub",
    href: "https://github.com/daniel-st3/veedurIA",
    label: "View Repository",
    preview: "/github_images/Colombian Flah.jpeg",
    previewAlt: "VeedurIA — civic AI oversight platform",
    accent: "#6f7b64",
    badge: "Civic AI",
  },
];

export default function WorkingNow() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useCinematicReveal(sectionRef, { yOffset: 40, rotateX: 2, scale: 0.98, start: "top bottom" });

  useEffect(() => {
    (async () => {
      const { gsap, ScrollTrigger } = await loadGSAP();

      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 92%", toggleActions: "play none none none" },
        }
      );

      gsap.fromTo(
        cardsRef.current?.children ?? [],
        { opacity: 0, y: 36, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 88%", toggleActions: "play none none none" },
        }
      );

      ScrollTrigger.refresh();
    })();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="working-now"
      className="section-pad section-dark"
      style={{
        position: "relative",
        zIndex: 1,
        background: "linear-gradient(160deg, #1a1410 0%, #0f0c0a 50%, #111010 100%)",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <RetroGrid className="opacity-10" angle={68} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 50% 10%, rgba(195,111,61,0.12) 0%, transparent 55%)",
          }}
        />
      </div>

      <div className="container-site" style={{ position: "relative", zIndex: 2 }}>
        <div ref={headRef} style={{ marginBottom: "2rem", textAlign: "center" }}>
          <p className="section-label" style={{ marginBottom: "0.75rem", color: "rgba(255,255,255,0.45)" }}>
            Current Focus
          </p>
          <h2
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              fontWeight: 600,
              letterSpacing: "-0.04em",
              color: "#fff",
              lineHeight: 1.0,
            }}
          >
            Flagship Builds
          </h2>
          <p
            style={{
              fontSize: "0.95rem",
              color: "rgba(255,255,255,0.55)",
              marginTop: "0.65rem",
              maxWidth: "62ch",
              marginInline: "auto",
              lineHeight: 1.65,
            }}
          >
            Open-source AI systems built for real-world impact — from financial intelligence to civic transparency.
          </p>
        </div>

        <div
          ref={cardsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
            gap: "1.5rem",
            justifyItems: "center",
          }}
        >
          {BUILDS.map((build) => (
            <a
              key={build.title}
              href={build.href}
              target="_blank"
              rel="noopener noreferrer"
              className="working-now-card"
              style={{
                display: "flex",
                flexDirection: "column",
                background: "var(--bg-card)",
                border: "1px solid var(--border)",
                borderRadius: "1.25rem",
                textDecoration: "none",
                color: "var(--fg)",
                overflow: "hidden",
                width: "100%",
                maxWidth: "560px",
                transition: "border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = build.accent;
                el.style.transform = "translateY(-6px)";
                el.style.boxShadow = `0 12px 40px ${build.accent}18`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "var(--border)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "220px",
                  overflow: "hidden",
                  flexShrink: 0,
                  background: "var(--bg-subtle)",
                }}
              >
                <img
                  src={build.preview}
                  alt={build.previewAlt}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center center",
                    display: "block",
                    transition: "transform 0.4s ease",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, transparent 58%, var(--bg-card) 100%)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    fontSize: "0.55rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#fff",
                    background: build.accent,
                    borderRadius: "999px",
                    padding: "0.25rem 0.65rem",
                  }}
                >
                  <Sparkles size={10} />
                  {build.badge}
                </div>
              </div>

              <div style={{ padding: "1.5rem 1.75rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <p
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    letterSpacing: "-0.025em",
                    lineHeight: 1.3,
                    color: "var(--fg)",
                  }}
                >
                  {build.title}
                </p>
                <p style={{ fontSize: "0.85rem", color: "var(--fg-muted)", lineHeight: 1.55 }}>{build.subtitle}</p>
                <p
                  style={{
                    fontSize: "0.68rem",
                    color: "var(--fg-subtle)",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {build.meta}
                </p>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    color: build.accent,
                    marginTop: "0.5rem",
                  }}
                >
                  <ArrowUpRight size={15} />
                  {build.label}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .working-now-card:hover img {
          transform: scale(1.06) !important;
        }
        @media (max-width: 768px) {
          .working-now-card {
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
