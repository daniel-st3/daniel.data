"use client";

import { useEffect, useRef } from "react";
import { loadGSAP } from "@/lib/gsap";
import { useCinematicReveal } from "@/lib/useCinematicReveal";
import dynamic from "next/dynamic";
import CertGallery from "@/components/ui/content/cert-gallery";

const SkillBlobs = dynamic(() => import("@/components/ui/content/skill-blobs"), { ssr: false });

export default function Skills() {
  const sectionRef   = useRef<HTMLElement>(null);
  const headRef      = useRef<HTMLDivElement>(null);
  const gridRef      = useRef<HTMLDivElement>(null);
  const certHeadRef  = useRef<HTMLDivElement>(null);
  const certRef      = useRef<HTMLDivElement>(null);

  useCinematicReveal(sectionRef, { yOffset: 40, rotateX: 2, scale: 0.98, start: "top bottom" });

  useEffect(() => {
    (async () => {
      const { gsap, ScrollTrigger } = await loadGSAP();

      gsap.fromTo(headRef.current, { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 85%", toggleActions: "play none none reverse" } });

      gsap.fromTo(gridRef.current, { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 88%", toggleActions: "play none none reverse" } });

      gsap.fromTo(certHeadRef.current, { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: certHeadRef.current, start: "top 85%", toggleActions: "play none none reverse" } });

      gsap.fromTo(certRef.current, { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: certRef.current, start: "top 88%", toggleActions: "play none none reverse" } });

      ScrollTrigger.refresh();
    })();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-fade-to-dark"
      style={{
        position: "relative",
        zIndex: 1,
        background: "linear-gradient(160deg, #faf6f0 0%, #f3ede4 50%, #faf6f0 100%)",
        backgroundColor: "#f5ede0",
      }}
    >
      {/* Subtle warm radial glow in background — doesn't overpower */}
      <div style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        background: `
          radial-gradient(ellipse 70% 40% at 15% 20%, rgba(195,111,61,0.07) 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at 85% 70%, rgba(184,136,104,0.06) 0%, transparent 60%)
        `,
      }} />

      <div className="container-site" style={{ position: "relative", zIndex: 3, paddingTop: "5rem", paddingBottom: "2rem" }}>

        {/* ── Header ── */}
        <div ref={headRef} style={{ marginBottom: "3.5rem" }}>
          <p className="section-label" style={{ marginBottom: "0.65rem" }}>Toolkit</p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
            <h2 style={{
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              fontWeight: 600,
              letterSpacing: "-0.05em",
              color: "var(--fg)",
              lineHeight: 1.0,
            }}>
              Skills & Tools
            </h2>
            <p style={{ fontSize: "0.88rem", color: "var(--fg-muted)", maxWidth: "38ch", lineHeight: 1.6, textAlign: "right" }}>
              Hover cards to explore. Each chip lights up on interaction.
            </p>
          </div>

        </div>

        {/* ── Bento skill grid ── */}
        <div ref={gridRef}>
          <SkillBlobs />
        </div>

        {/* ── Certifications header ── */}
        <div style={{ marginTop: "5rem" }}>
          <div ref={certHeadRef} style={{ marginBottom: "1.75rem", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
            <div>
              <p className="section-label" style={{ marginBottom: "0.5rem" }}>Credentials</p>
              <h2 style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 600,
                letterSpacing: "-0.04em",
                color: "var(--fg)",
                lineHeight: 1.0,
              }}>
                Certifications
              </h2>
            </div>
            <p style={{ fontSize: "0.78rem", color: "var(--fg-subtle)", lineHeight: 1.55 }}>
              Click to zoom · Click again to open source
            </p>
          </div>
        </div>
      </div>

      {/* ── Cert gallery — full viewport width so the infinite scroll looks edge-to-edge ── */}
      <div ref={certRef} style={{ position: "relative", zIndex: 3, paddingBottom: "2rem" }}>
        <CertGallery />
      </div>
    </section>
  );
}
