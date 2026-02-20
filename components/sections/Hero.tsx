"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { loadGSAP } from "@/lib/gsap";
import WaveBackground from "@/components/ui/WaveBackground";

const ParticleField = dynamic(() => import("@/components/ui/ParticleField"), { ssr: false });

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const particleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // GSAP: scroll-driven fade effects only
  useEffect(() => {
    (async () => {
      const { gsap, ScrollTrigger } = await loadGSAP();

      gsap.to(particleRef.current, {
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "65% top", scrub: 1 },
      });

      gsap.to(textRef.current, {
        y: -60,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "15% top", end: "65% top", scrub: 1.2 },
      });

      ScrollTrigger.refresh();
    })();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1, background: "transparent", overflow: "hidden" }}
    >
      {/* Dark overlay */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(2,6,18,0.62)", zIndex: 0 }} />

      {/* Wave lines */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }}>
        <WaveBackground backgroundColor="transparent" strokeColor="rgba(255,255,255,0.06)" pointerSize={0.3} />
      </div>

      {/* Interactive Particle Field */}
      <div
        ref={particleRef}
        style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}
      >
        <ParticleField />
      </div>

      {/* Text — CSS animated in immediately */}
      <div
        ref={textRef}
        style={{
          position: "relative",
          zIndex: 3,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          paddingTop: "calc(var(--header-h) + 2rem)",
          paddingBottom: "4rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          maxWidth: 760,
        }}
      >
        {/* Status pill */}
        <span className="pill" style={{ animation: "hero-pill-in 0.6s 0.3s ease-out both" }}>
          <span className="pill-dot" style={{ background: "#22c55e" }} />
          Open to remote &amp; in-person roles · Bogotá · US Citizen
        </span>

        {/* Headline */}
        <div>
          {["Business &", "Data Analyst."].map((line, i) => (
            <div key={i} style={{ overflow: "hidden", lineHeight: 1.05 }}>
              <span
                style={{
                  display: "block",
                  fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.055em",
                  color: "#ffffff",
                  lineHeight: 1.05,
                  textShadow: "0 0 80px rgba(74,111,165,0.5), 0 2px 32px rgba(0,0,0,0.8)",
                  animation: `hero-text-in 0.8s ${0.5 + i * 0.1}s ease-out both`,
                }}
              >
                {line}
              </span>
            </div>
          ))}

          <p
            style={{
              marginTop: "1.25rem",
              fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
              color: "rgba(255,255,255,0.68)",
              lineHeight: 1.65,
              maxWidth: "52ch",
              margin: "1.25rem auto 0",
              letterSpacing: "-0.01em",
              textShadow: "0 2px 16px rgba(0,0,0,0.7)",
              animation: "hero-sub-in 0.8s 0.85s ease-out both",
            }}
          >
            Turning signal into decision. AI-powered analytics and data workflows that move businesses forward.
          </p>

          {/* Primary CTAs */}
          <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", marginTop: "2rem", flexWrap: "wrap", animation: "hero-sub-in 0.6s 1s ease-out both" }}>
            <a href="https://www.linkedin.com/in/daniel-steven-rodriguez-sandoval/" target="_blank" rel="noopener noreferrer" className="btn-primary">
              LinkedIn ↗
            </a>
            <a href="https://github.com/daniel-st3" target="_blank" rel="noopener noreferrer" className="btn-ghost-dark">
              GitHub ↗
            </a>
          </div>

          {/* Secondary links */}
          <div style={{ display: "flex", justifyContent: "center", gap: "1.75rem", marginTop: "1.25rem", animation: "hero-sub-in 0.6s 1.1s ease-out both" }}>
            <a
              href="mailto:danielst.data@gmail.com"
              style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", fontWeight: 500, transition: "color 0.2s ease" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.9)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.45)")}
            >
              Email me
            </a>
            <a
              href="/pdfs/thesis.pdf"
              download
              style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", fontWeight: 500, transition: "color 0.2s ease" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.9)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.45)")}
            >
              Download Thesis
            </a>
          </div>
        </div>
      </div>

      {/* Bottom transition gradient: dark hero → light about */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "220px",
          background: "linear-gradient(to bottom, transparent, #f7f6f3)",
          zIndex: 5,
          pointerEvents: "none",
        }}
      />

      <style>{`
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
      `}</style>
    </section>
  );
}
