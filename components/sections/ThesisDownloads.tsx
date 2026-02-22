"use client";

import { useEffect, useRef } from "react";
import { FileDown, GraduationCap, BookOpen } from "lucide-react";
import { loadGSAP } from "@/lib/gsap";
import { useCinematicReveal } from "@/lib/useCinematicReveal";

const DOWNLOADS = [
  {
    title: "MSc Thesis",
    subtitle: "AI Driven Analysis of Political Bias in Financial Media",
    meta: "KEDGE Business School · 2025 · Data Analytics for Business",
    href: "/pdfs/thesis.pdf",
    label: "Download Thesis (PDF)",
    preview: "/images/thesis-cover.jpeg",
    previewAlt: "MSc thesis cover",
    previewPosition: "center center",
    icon: BookOpen,
    accent: "#7096C8",
  },
  {
    title: "Thesis Presentation",
    subtitle: "Research overview, methodology, and key findings",
    meta: "Defense slides · MSc Data Analytics · Feb 2026",
    href: "/pdfs/thesis-slides.pdf",
    label: "Download Slides (PDF)",
    preview: "/images/slides-preview.png",
    previewAlt: "KEDGE defense presentation slide",
    previewPosition: "center center",
    icon: GraduationCap,
    accent: "#a88beb",
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
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        }
      );

      gsap.fromTo(
        contentRef.current?.children ?? [],
        { opacity: 0, y: 36, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.18, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
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
        background: "var(--bg)",
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
            MSc Thesis Downloads
          </h2>
          <p style={{
            fontSize: "0.95rem",
            color: "var(--fg-muted)",
            marginTop: "0.65rem",
            maxWidth: "50ch",
            lineHeight: 1.65,
          }}>
            Defended February 2026 at KEDGE Business School, Bordeaux. Full paper and presentation slides available below.
          </p>
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
                key={d.href}
                href={d.href}
                download
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
                    PDF
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
                    <FileDown size={15} />
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
