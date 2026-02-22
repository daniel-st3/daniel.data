"use client";

import { useEffect, useRef } from "react";
import { loadGSAP } from "@/lib/gsap";
import { useCinematicReveal } from "@/lib/useCinematicReveal";
import dynamic from "next/dynamic";
import CertGallery from "@/components/ui/content/cert-gallery";
import WaveBackground from "@/components/ui/backgrounds/WaveBackground";

const SkillBlobs = dynamic(() => import("@/components/ui/content/skill-blobs"), { ssr: false });

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<HTMLDivElement>(null);
  const certHeadRef = useRef<HTMLDivElement>(null);
  const certRef = useRef<HTMLDivElement>(null);

  useCinematicReveal(sectionRef, { yOffset: 40, rotateX: 2, scale: 0.98 });

  useEffect(() => {
    (async () => {
      const { gsap, ScrollTrigger } = await loadGSAP();

      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        }
      );

      gsap.fromTo(
        blobsRef.current,
        { opacity: 0, y: 60, scale: 0.92 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out",
          scrollTrigger: { trigger: blobsRef.current, start: "top 88%", toggleActions: "play none none reverse" },
        }
      );

      gsap.fromTo(
        certHeadRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: certHeadRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        }
      );

      gsap.fromTo(
        certRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: certRef.current, start: "top 88%", toggleActions: "play none none reverse" },
        }
      );

      ScrollTrigger.refresh();
    })();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      style={{
        position: "relative",
        zIndex: 1,
        overflow: "hidden",
        background: "radial-gradient(120% 90% at 50% 0%, #12233f 0%, #0a0e1a 48%, #060913 100%)",
        paddingTop: "5rem",
        paddingBottom: "0",
      }}
    >
      {/* Top transition */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "60px",
        background: "linear-gradient(to bottom, var(--bg) 0%, #0a0e1a 100%)",
        zIndex: 3,
        pointerEvents: "none",
      }} />

      {/* Interactive wave background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.62, mixBlendMode: "screen" }}>
        <WaveBackground backgroundColor="transparent" strokeColor="rgba(112,150,200,0.28)" pointerSize={0.62} />
      </div>
      <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.34, mixBlendMode: "screen", transform: "scale(1.03)" }}>
        <WaveBackground backgroundColor="transparent" strokeColor="rgba(168,139,235,0.22)" pointerSize={0.95} />
      </div>

      {/* Ambient radial glows */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: `
            radial-gradient(ellipse at 25% 35%, rgba(74,111,165,0.12) 0%, transparent 50%),
            radial-gradient(ellipse at 75% 60%, rgba(123,94,167,0.08) 0%, transparent 45%),
            radial-gradient(ellipse at 50% 85%, rgba(46,154,136,0.06) 0%, transparent 40%)
          `,
        }}
      />

      {/* Subtle grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.5,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      <div className="container-site" style={{ position: "relative", zIndex: 2 }}>
        <div ref={headRef} style={{ marginBottom: "3rem" }}>
          <h2
              style={{
              fontSize: "clamp(3rem, 6.5vw, 5.4rem)",
              fontWeight: 500,
              letterSpacing: "-0.05em",
              color: "#ffffff",
              lineHeight: 1.05,
            }}
          >
            Skills & Tools
          </h2>
          <p style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.5)", marginTop: "0.75rem", maxWidth: "50ch", lineHeight: 1.7 }}>
            Each sphere orbits its skills. Hover to interact with the ecosystem of tools I work with daily.
          </p>
        </div>
      </div>

      {/* 3D Orbiting Skill Blobs */}
      <div
        ref={blobsRef}
        style={{
          paddingLeft: "clamp(1rem, 4vw, 3rem)",
          paddingRight: "clamp(1rem, 4vw, 3rem)",
          overflow: "hidden",
          position: "relative",
          zIndex: 2,
        }}
      >
        <SkillBlobs />
      </div>

      {/* Certifications section — white background */}
      <div
        style={{
          marginTop: "4rem",
          position: "relative",
          zIndex: 2,
          background: "var(--bg)",
          paddingTop: "3.5rem",
          paddingBottom: "3rem",
        }}
      >
        {/* Transition from dark to white */}
        <div style={{
          position: "absolute",
          top: "-40px",
          left: 0,
          right: 0,
          height: "40px",
          background: "linear-gradient(to bottom, #0a0e1a 0%, var(--bg) 100%)",
          pointerEvents: "none",
        }} />

        <div className="container-site" style={{ marginBottom: "1.5rem" }}>
          <div ref={certHeadRef}>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 500,
                letterSpacing: "-0.04em",
                color: "var(--fg)",
                lineHeight: 1.1,
              }}
            >
              Certifications
            </h2>
            <p style={{ fontSize: "0.875rem", color: "var(--fg-muted)", marginTop: "0.65rem" }}>
              Click to zoom. Click again to view on LinkedIn.
            </p>
          </div>
        </div>
        <div ref={certRef} style={{ paddingLeft: "clamp(1rem, 3vw, 2rem)" }}>
          <CertGallery />
        </div>
      </div>
    </section>
  );
}
