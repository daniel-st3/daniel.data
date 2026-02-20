"use client";

import { useEffect, useRef } from "react";
import { loadGSAP } from "@/lib/gsap";
import { MagneticText } from "@/components/ui/morphing-cursor";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { WavePath } from "@/components/ui/wave-path";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const { gsap, ScrollTrigger } = await loadGSAP();

      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        }
      );

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 24, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          delay: 0.25,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );

      ScrollTrigger.refresh();
    })();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-pad"
      style={{ position: "relative", zIndex: 1 }}
    >
      <div className="divider" style={{ marginBottom: "3rem" }} />
      <div className="container-site">

        {/* Interactive heading with magnetic text */}
        <div ref={headRef} style={{ marginBottom: "3rem" }}>
          <p className="section-label" style={{ marginBottom: "1rem" }}>Get in touch</p>
          <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap", alignItems: "center", marginBottom: "2rem" }}>
            <MagneticText text="CONNECT" hoverText="HIRE ME" className="text-[var(--fg)]" />
            <MagneticText text="LET'S BUILD" hoverText="TODAY" className="text-[var(--fg-muted)]" />
          </div>

          {/* Interactive wave divider */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              color: "var(--accent)",
            }}
          >
            <WavePath />
          </div>
        </div>

        {/* Contact card with GlowingEffect border */}
        <div ref={cardRef} style={{ position: "relative", borderRadius: "1.5rem", padding: "3px" }}>
          <GlowingEffect
            spread={80}
            glow={true}
            disabled={false}
            proximity={100}
            inactiveZone={0.01}
            borderWidth={2}
          />
          <div
            style={{
              position: "relative",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "1.25rem",
              padding: "clamp(2.5rem, 6vw, 5rem)",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "3rem",
              alignItems: "center",
            }}
            className="contact-grid"
          >
            <div>
              <h2
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.055em",
                  color: "var(--fg)",
                  lineHeight: 1.1,
                  marginBottom: "1rem",
                }}
              >
                Let&apos;s build something<br />
                <span style={{ color: "var(--accent)" }}>together.</span>
              </h2>

              <p
                style={{
                  fontSize: "1rem",
                  color: "var(--fg-muted)",
                  lineHeight: 1.7,
                  maxWidth: "46ch",
                  letterSpacing: "-0.01em",
                  marginBottom: "2rem",
                }}
              >
                Open to remote analytics, AI workflow, and B2B data roles.
                Whether it&apos;s a quick question or a full project — reach out.
              </p>

              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {/* Email button with inner glow */}
                <div style={{ position: "relative", borderRadius: "6px", padding: "2px" }}>
                  <GlowingEffect spread={25} glow={true} disabled={false} proximity={40} inactiveZone={0.01} borderWidth={2} />
                  <a
                    href="mailto:danielst.data@gmail.com"
                    className="btn-primary"
                    style={{ position: "relative", fontSize: "0.9rem", padding: "0.75rem 1.75rem", display: "inline-block" }}
                  >
                    Send an email →
                  </a>
                </div>

                <a
                  href="https://www.linkedin.com/in/daniel-steven-rodriguez-sandoval/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                  style={{ fontSize: "0.9rem", padding: "0.75rem 1.75rem" }}
                >
                  View LinkedIn ↗
                </a>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "flex-end" }}>
              {[
                ["Location", "Bogotá, Colombia"],
                ["Availability", "Remote / Hybrid"],
                ["Citizenship", "US & Colombian"],
                ["Sponsorship", "Not required"],
              ].map(([key, val]) => (
                <div key={key} style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "0.65rem", color: "var(--fg-subtle)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
                    {key}
                  </p>
                  <p style={{ fontSize: "0.875rem", color: "var(--fg)", fontWeight: 500 }}>{val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
