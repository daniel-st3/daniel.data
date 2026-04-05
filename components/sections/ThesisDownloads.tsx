"use client";

import { useEffect, useRef } from "react";
import { Mail, GraduationCap, BookOpen, Play } from "lucide-react";
import { GlowingEffect } from "@/components/ui/effects/glowing-effect";
import { loadGSAP } from "@/lib/gsap";
import { useCinematicReveal } from "@/lib/useCinematicReveal";

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

const DOWNLOADS = [
  {
    title: "MSc Thesis",
    subtitle: "AI Driven Analysis of Political Bias in Financial Media",
    meta: "KEDGE Business School · 2025 · Data Analytics for Business",
    href: THESIS_REQUEST_MAILTO,
    label: "Request Thesis by Email",
    preview: "/images/thesis-cover.jpeg",
    previewAlt: "MSc thesis cover",
    previewPosition: "center center",
    icon: BookOpen,
    accent: "#d3a16d",
  },
  {
    title: "Thesis Presentation",
    subtitle: "Research overview, methodology, and key findings",
    meta: "Defense slides · MSc Data Analytics · Feb 2026",
    href: THESIS_REQUEST_MAILTO,
    label: "Request Slides by Email",
    preview: "/images/slides-preview.png",
    previewAlt: "KEDGE defense presentation slide",
    previewPosition: "center center",
    icon: GraduationCap,
    accent: "#b8896e",
  },
];

export default function ThesisDownloads() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  useCinematicReveal(sectionRef, { yOffset: 40, rotateX: 2, scale: 0.98 });

  useEffect(() => {
    (async () => {
      const { gsap, ScrollTrigger } = await loadGSAP();

      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 92%", toggleActions: "play none none none" },
        }
      );

      gsap.fromTo(
        contentRef.current?.children ?? [],
        { opacity: 0, y: 36, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.18, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 90%", toggleActions: "play none none none" },
        }
      );

      ScrollTrigger.refresh();
    })();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="thesis"
      className="section-pad"
      style={{
        position: "relative",
        zIndex: 1,
        background: "linear-gradient(160deg, #faf6f0 0%, #f3ede4 50%, #faf6f0 100%)",
      }}
    >
      <div className="container-site" style={{ position: "relative", zIndex: 2 }}>
        <div ref={headRef} style={{ marginBottom: "3rem" }}>
          <p className="section-label" style={{ marginBottom: "0.75rem" }}>
            Academic Research
          </p>
          <h2 style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            fontWeight: 500,
            letterSpacing: "-0.04em",
            color: "var(--fg)",
            lineHeight: 1.1,
          }}>
            MSc Thesis Access
          </h2>
          <p style={{
            fontSize: "0.95rem",
            color: "var(--fg-muted)",
            marginTop: "0.65rem",
            maxWidth: "50ch",
            lineHeight: 1.65,
          }}>
            Defended February 2026 at KEDGE Business School, Bordeaux. Selected as Best Thesis finalist. The full paper and presentation slides are shared on direct email request.
          </p>
        </div>

        {/* ── Best Thesis Video — large, immersive clickable card ── */}
        <div style={{ marginBottom: "3rem" }}>
          <a
            href="https://youtu.be/VvdvdvSqf1M"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "block",
              position: "relative",
              borderRadius: "1.5rem",
              border: "1px solid var(--border)",
              padding: "3px",
              textDecoration: "none",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 24px 60px rgba(195,111,61,0.22)";
              const thumb = e.currentTarget.querySelector(".thesis-thumb") as HTMLElement;
              const btn = e.currentTarget.querySelector(".thesis-play-btn") as HTMLElement;
              if (thumb) thumb.style.transform = "scale(1.05)";
              if (btn) { btn.style.transform = "scale(1.12)"; btn.style.boxShadow = "0 12px 40px rgba(200,164,110,0.8)"; }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
              const thumb = e.currentTarget.querySelector(".thesis-thumb") as HTMLElement;
              const btn = e.currentTarget.querySelector(".thesis-play-btn") as HTMLElement;
              if (thumb) thumb.style.transform = "scale(1)";
              if (btn) { btn.style.transform = "scale(1)"; btn.style.boxShadow = "0 8px 32px rgba(200,164,110,0.65)"; }
            }}
          >
            <GlowingEffect spread={80} glow={true} disabled={false} proximity={100} inactiveZone={0.01} borderWidth={2} />
            <div style={{ position: "relative", borderRadius: "1.25rem", overflow: "hidden", background: "#0a0604" }}>
              {/* Full-width cinematic thumbnail */}
              <div style={{ position: "relative", width: "100%", aspectRatio: "16/7", overflow: "hidden" }}>
                <img
                  src="https://img.youtube.com/vi/VvdvdvSqf1M/maxresdefault.jpg"
                  alt="Thesis defense video thumbnail"
                  className="thesis-thumb"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%", display: "block", transition: "transform 0.5s ease" }}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = "https://img.youtube.com/vi/VvdvdvSqf1M/mqdefault.jpg"; }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.55) 100%)" }} />

                {/* Award badge */}
                <div style={{ position: "absolute", top: "1.25rem", left: "1.25rem", display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", background: "linear-gradient(135deg, #c8a46e, #d4813c)", borderRadius: "999px", padding: "0.3rem 0.8rem", boxShadow: "0 4px 16px rgba(200,164,110,0.5)" }}>
                  <span>★</span>
                  Best Thesis Finalist · KEDGE 2026
                </div>

                {/* Centered giant play button */}
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div className="thesis-play-btn" style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg, #c8a46e, #d4813c)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 32px rgba(200,164,110,0.65)", transition: "transform 0.3s ease, box-shadow 0.3s ease" }}>
                    <Play size={28} color="#fff" fill="#fff" style={{ marginLeft: 4 }} />
                  </div>
                </div>

                {/* Bottom text overlay */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem 2rem", background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 100%)" }}>
                  <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.4rem)", fontWeight: 600, color: "#fff", letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: "0.3rem" }}>
                    3-Minute Thesis Defense
                  </p>
                  <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.78)" }}>
                    AI-Driven Analysis of Political Bias in Financial Media · Watch on YouTube ↗
                  </p>
                </div>
              </div>
            </div>
          </a>
        </div>

        <div
          ref={contentRef}
          className="thesis-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "1.5rem" }}
        >
          {DOWNLOADS.map((d) => {
            const Icon = d.icon;
            return (
              <a
                key={d.title}
                href={d.href}
                className="thesis-card"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "1.25rem",
                  textDecoration: "none",
                  color: "var(--fg)",
                  overflow: "hidden",
                  transition: "border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = d.accent;
                  el.style.transform = "translateY(-6px)";
                  el.style.boxShadow = `0 12px 40px ${d.accent}18`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "var(--border)";
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "none";
                }}
              >
                {/* Preview image */}
                <div style={{
                  position: "relative",
                  width: "100%",
                  height: "220px",
                  overflow: "hidden",
                  flexShrink: 0,
                  background: "var(--bg-subtle)",
                }}>
                  <img
                    src={d.preview}
                    alt={d.previewAlt}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: d.previewPosition,
                      display: "block",
                      transition: "transform 0.4s ease",
                    }}
                  />
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, transparent 60%, var(--bg-card) 100%)",
                    pointerEvents: "none",
                  }} />

                  {/* Badge */}
                  <div style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    fontSize: "0.55rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#fff",
                    background: d.accent,
                    borderRadius: "999px",
                    padding: "0.25rem 0.65rem",
                  }}>
                    <Icon size={10} />
                    EMAIL
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: "1.5rem 1.75rem", display: "flex", flexDirection: "column", gap: "0.5rem", flexGrow: 1 }}>
                  <div>
                    <p style={{
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      letterSpacing: "-0.025em",
                      marginBottom: "0.3rem",
                      lineHeight: 1.3,
                      color: "var(--fg)",
                    }}>{d.title}</p>
                    <p style={{ fontSize: "0.85rem", color: "var(--fg-muted)", lineHeight: 1.55 }}>{d.subtitle}</p>
                  </div>
                  <p style={{
                    fontSize: "0.68rem",
                    color: "var(--fg-subtle)",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}>{d.meta}</p>
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    color: d.accent,
                    marginTop: "auto",
                    paddingTop: "0.5rem",
                  }}>
                    <Mail size={15} />
                    {d.label}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <style>{`
        .thesis-card:hover img {
          transform: scale(1.06) !important;
        }
        @media (max-width: 640px) {
          .thesis-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
