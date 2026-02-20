"use client";

import { useEffect, useRef } from "react";
import { loadGSAP } from "@/lib/gsap";
import dynamic from "next/dynamic";
import CertGallery from "@/components/ui/cert-gallery";

const SkillBlobs = dynamic(() => import("@/components/ui/skill-blobs"), { ssr: false });

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<HTMLDivElement>(null);
  const certRef = useRef<HTMLDivElement>(null);

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

      gsap.fromTo(
        blobsRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: blobsRef.current, start: "top 85%" },
        }
      );

      gsap.fromTo(
        certRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: certRef.current, start: "top 85%" },
        }
      );

      ScrollTrigger.refresh();
    })();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-pad"
      style={{ position: "relative", zIndex: 1 }}
    >
      <div className="divider" style={{ marginBottom: "3rem" }} />

      <div className="container-site">
        <div ref={headRef} style={{ marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              color: "var(--fg)",
            }}
          >
            Skills
          </h2>
          <p style={{ fontSize: "0.875rem", color: "var(--fg-muted)", marginTop: "0.5rem" }}>
            Each sphere orbits its skills — hover to interact.
          </p>
        </div>
      </div>

      {/* 3D Orbiting Skill Blobs — full width horizontal scroll */}
      <div
        ref={blobsRef}
        style={{
          paddingLeft: "clamp(1rem, 4vw, 3rem)",
          paddingRight: "clamp(1rem, 4vw, 3rem)",
          overflow: "hidden",
        }}
      >
        <SkillBlobs />
      </div>

      {/* Certifications */}
      <div style={{ marginTop: "5rem" }}>
        <div className="container-site" style={{ marginBottom: "2rem" }}>
          <div ref={certRef}>
            <p className="section-label" style={{ marginBottom: "0.5rem" }}>Credentials</p>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 500,
                letterSpacing: "-0.05em",
                color: "var(--fg)",
                lineHeight: 1,
              }}
            >
              Certifications
            </h2>
            <p style={{ fontSize: "0.875rem", color: "var(--fg-muted)", marginTop: "0.75rem" }}>
              Click to zoom · Click again to view on LinkedIn
            </p>
          </div>
        </div>
        <div style={{ paddingLeft: "clamp(1rem, 3vw, 2rem)" }}>
          <CertGallery />
        </div>
      </div>
    </section>
  );
}
