"use client";

import { useEffect, useRef } from "react";
import { FileDown } from "lucide-react";
import { loadGSAP } from "@/lib/gsap";
import WaveBackground from "@/components/ui/WaveBackground";

const DOWNLOADS = [
  {
    title: "MSc Thesis — Full Paper",
    subtitle: "AI-Driven Analysis of Political Bias in Financial Media",
    meta: "KEDGE Business School · 2025 · Data Analytics for Business",
    href: "/pdfs/thesis.pdf",
    label: "Download Thesis (PDF)",
    preview: "/images/thesis-preview.png",
    previewAlt: "Thesis title page",
    previewPosition: "top center",
    previewBg: "#ffffff",
  },
  {
    title: "Thesis Slides — Presentation",
    subtitle: "Research overview, methodology and key findings",
    meta: "Defense slides · MSc Data Analytics · Feb 2026",
    href: "/pdfs/thesis-slides.pdf",
    label: "Download Slides (PDF)",
    preview: "/images/slides-preview.png",
    previewAlt: "KEDGE defense presentation slide",
    previewPosition: "center center",
    previewBg: "#f8f8f8",
  },
];

export default function ThesisDownloads() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

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
      style={{ position: "relative", zIndex: 1, overflow: "hidden", background: "#030712", padding: "8rem 0" }}
    >
      {/* Top fade */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "160px", background: "linear-gradient(to bottom, #f7f6f3, transparent)", zIndex: 3, pointerEvents: "none" }} />

      {/* Wave background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.28 }}>
        <WaveBackground backgroundColor="transparent" strokeColor="rgba(255,255,255,0.18)" pointerSize={0.3} />
      </div>

      {/* Radial glow */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, rgba(74,111,165,0.16) 0%, transparent 70%)", zIndex: 1, pointerEvents: "none" }} />

      <div className="container-site" style={{ position: "relative", zIndex: 2 }}>
        <div ref={headRef} style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p className="section-label" style={{ color: "rgba(255,255,255,0.4)", marginBottom: "0.75rem" }}>
            Academic Research
          </p>
          <h2 style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)", fontWeight: 500, letterSpacing: "-0.05em", color: "#ffffff", lineHeight: 1.1 }}>
            MSc Thesis Downloads
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.5)", marginTop: "0.85rem", maxWidth: "50ch", marginInline: "auto", lineHeight: 1.65 }}>
            Defending February 2026 at KEDGE Business School, Bordeaux.
          </p>
        </div>

        <div ref={contentRef} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: "2rem" }}>
          {DOWNLOADS.map((d) => (
            <a
              key={d.href}
              href={d.href}
              download
              style={{
                display: "flex",
                flexDirection: "column",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "1.5rem",
                textDecoration: "none",
                color: "#fff",
                overflow: "hidden",
                transition: "background 0.3s ease, border-color 0.3s ease, transform 0.3s ease",
                backdropFilter: "blur(14px)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = "rgba(74,111,165,0.2)";
                el.style.borderColor = "rgba(74,111,165,0.55)";
                el.style.transform = "translateY(-6px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = "rgba(255,255,255,0.04)";
                el.style.borderColor = "rgba(255,255,255,0.1)";
                el.style.transform = "translateY(0)";
              }}
            >
              {/* Preview image */}
              <div style={{ position: "relative", width: "100%", height: "230px", overflow: "hidden", background: d.previewBg, flexShrink: 0 }}>
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
                  onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1)"; }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(3,7,18,0.75) 100%)" }} />
                <div style={{ position: "absolute", top: "0.75rem", left: "0.75rem", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.95)", background: "rgba(74,111,165,0.8)", borderRadius: "999px", padding: "0.2rem 0.65rem", backdropFilter: "blur(8px)" }}>
                  PDF Preview
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", gap: "0.75rem", flexGrow: 1 }}>
                <div>
                  <p style={{ fontSize: "1.05rem", fontWeight: 600, letterSpacing: "-0.025em", marginBottom: "0.25rem", lineHeight: 1.3 }}>{d.title}</p>
                  <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.55 }}>{d.subtitle}</p>
                </div>
                <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.28)", letterSpacing: "0.05em", textTransform: "uppercase" }}>{d.meta}</p>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", fontWeight: 500, color: "#7096C8", marginTop: "auto", paddingTop: "0.5rem" }}>
                  <FileDown size={15} />
                  {d.label}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "160px", background: "linear-gradient(to top, #f7f6f3, transparent)", zIndex: 3, pointerEvents: "none" }} />
    </section>
  );
}
