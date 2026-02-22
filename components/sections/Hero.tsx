"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { loadGSAP } from "@/lib/gsap";

const ParticleField = dynamic(() => import("@/components/ui/backgrounds/ParticleField"), { ssr: false });
const ScrollingConstellation = dynamic(() => import("@/components/ui/backgrounds/ScrollingConstellation"), { ssr: false });

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const particleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const constellationRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const { gsap, ScrollTrigger } = await loadGSAP();

      gsap.to(particleRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "65% top", scrub: 1 },
      });

      gsap.to(textRef.current, {
        y: -80,
        opacity: 0,
        rotateX: 12,
        scale: 0.92,
        z: -100,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "10% top", end: "60% top", scrub: 1 },
      });

      // Constellation fades out on scroll
      if (constellationRef.current) {
        gsap.to(constellationRef.current, {
          opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "20% top", end: "70% top", scrub: 1 },
        });
      }

      // Scroll indicator bobs and fades on scroll
      if (scrollIndicatorRef.current) {
        gsap.to(scrollIndicatorRef.current, {
          opacity: 0,
          y: -20,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "5% top", end: "25% top", scrub: 1 },
        });
      }

      ScrollTrigger.refresh();
    })();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        minHeight: "120dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        zIndex: 1,
        background: "transparent",
        overflow: "hidden",
      }}
    >
      {/* Dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(2,6,18,0.55)", zIndex: 0 }} />

      {/* Interactive Particle Field */}
      <div
        ref={particleRef}
        style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}
      >
        <ParticleField />
      </div>

      {/* Constellation overlay */}
      <div
        ref={constellationRef}
        style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none", opacity: 0.7 }}
      >
        <ScrollingConstellation />
      </div>

      {/* Text content */}
      <div
        ref={textRef}
        className="hero-content-wrap"
        style={{
          position: "relative",
          zIndex: 3,
          textAlign: "left",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "1.5rem",
          paddingTop: "calc(var(--header-h) + 4rem)",
          paddingBottom: "6rem",
          paddingLeft: "clamp(1.5rem, 6vw, 6rem)",
          paddingRight: "1.5rem",
          maxWidth: 900,
          width: "100%",
          perspective: "800px",
          transformStyle: "preserve-3d" as const,
        }}
      >
        {/* Status pill */}
        <span className="pill" style={{ animation: "hero-pill-in 0.6s 0.3s ease-out both" }}>
          <span className="pill-dot" style={{ background: "#22c55e" }} />
          Open to remote and in person roles · Bogota · US Citizen
        </span>

        {/* Headline */}
        <div>
          {["Business &", "Data Analyst."].map((line, i) => (
            <div key={i} style={{ overflow: "hidden", lineHeight: 1.05 }}>
              <span
                style={{
                  display: "block",
                  fontSize: "clamp(3rem, 8.5vw, 7rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.055em",
                  color: "#ffffff",
                  lineHeight: 1.05,
                  textShadow: "0 0 80px rgba(74,111,165,0.5), 0 2px 32px rgba(0,0,0,0.8)",
                  animation: `hero-text-in 0.8s ${0.5 + i * 0.12}s ease-out both`,
                }}
              >
                {line}
              </span>
            </div>
          ))}

          <p
            style={{
              marginTop: "1.5rem",
              fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.65,
              maxWidth: "48ch",
              letterSpacing: "-0.01em",
              textShadow: "0 2px 16px rgba(0,0,0,0.7)",
              animation: "hero-sub-in 0.8s 0.85s ease-out both",
            }}
          >
            Turning signal into decision. AI powered analytics and data workflows
            that move businesses forward.
          </p>

          {/* Primary CTAs */}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "2.5rem", flexWrap: "wrap", animation: "hero-sub-in 0.6s 1s ease-out both" }}>
            <a href="https://www.linkedin.com/in/daniel-steven-rodriguez-sandoval/" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: "0.75rem 1.6rem", fontSize: "0.9rem" }}>
              LinkedIn
            </a>
            <a href="https://github.com/daniel-st3" target="_blank" rel="noopener noreferrer" className="btn-ghost-dark" style={{ padding: "0.75rem 1.6rem", fontSize: "0.9rem" }}>
              GitHub
            </a>
          </div>

          {/* Secondary links */}
          <div style={{ display: "flex", gap: "1.75rem", marginTop: "1.25rem", animation: "hero-sub-in 0.6s 1.1s ease-out both" }}>
            <a
              href="mailto:danielst.data@gmail.com"
              style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.82)", fontWeight: 500, transition: "color 0.2s ease", textDecoration: "none" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,1)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.82)")}
            >
              Email me
            </a>
            <a
              href="/pdfs/thesis.pdf"
              download
              style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.82)", fontWeight: 500, transition: "color 0.2s ease", textDecoration: "none" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,1)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.82)")}
            >
              Download Thesis
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        style={{
          position: "absolute",
          bottom: "5.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          animation: "hero-sub-in 0.8s 1.3s ease-out both",
        }}
      >
        <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.78)", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500 }}>
          Scroll
        </span>
        <div style={{
          width: "1px",
          height: "48px",
          background: "linear-gradient(to bottom, rgba(255,255,255,0.7), transparent)",
          animation: "scroll-line 2s ease-in-out infinite",
        }} />
      </div>

      {/* Bottom seamless transition to About */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "90px",
          background: "linear-gradient(to bottom, transparent 0%, var(--bg) 100%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes hero-pill-in {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-text-in {
          from { opacity: 0; transform: translateY(48px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hero-sub-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scroll-line {
          0% { opacity: 0; transform: scaleY(0); transform-origin: top; }
          30% { opacity: 1; transform: scaleY(1); }
          70% { opacity: 1; transform: scaleY(1); }
          100% { opacity: 0; transform: scaleY(0); transform-origin: bottom; }
        }
        @media (max-width: 768px) {
          #hero .hero-content-wrap {
            text-align: center !important;
            align-items: center !important;
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
          }
        }
      `}} />
    </section>
  );
}
