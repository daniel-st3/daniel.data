"use client";

import { useEffect, useRef, useState } from "react";
import { loadGSAP } from "@/lib/gsap";
import { useCinematicReveal } from "@/lib/useCinematicReveal";
import { MagneticText } from "@/components/ui/effects/morphing-cursor";
import { GlowingEffect } from "@/components/ui/effects/glowing-effect";
import { Send, Linkedin, MapPin, Globe, Sparkles, ArrowUpRight, Copy, Check } from "lucide-react";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useCinematicReveal(sectionRef, { yOffset: 35, rotateX: 2, scale: 0.98 });

  const copyEmail = () => {
    navigator.clipboard.writeText("danielst.data@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    (async () => {
      const { gsap, ScrollTrigger } = await loadGSAP();

      gsap.fromTo(
        headRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" },
        }
      );

      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 24, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.9, delay: 0.25, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none none" },
        }
      );

      if (orbitRef.current) {
        gsap.to(orbitRef.current, { rotation: 360, duration: 20, repeat: -1, ease: "none" });
      }

      ScrollTrigger.refresh();
    })();
  }, []);

  const INFO_ITEMS = [
    { icon: MapPin, label: "Location", value: "Bogota, Colombia" },
    { icon: Globe, label: "Availability", value: "Remote / Hybrid" },
    { icon: Sparkles, label: "Citizenship", value: "US & Colombian" },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-pad section-dark"
      style={{ position: "relative", zIndex: 1, overflow: "hidden", background: "#0d0b08", paddingBottom: "2.5rem" }}
    >
      {/* Animated background */}
      <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div className="ct-bg-mesh" />
        <div className="ct-orb-1" />
        <div className="ct-orb-2" />
        <div className="ct-orb-3" />
      </div>
      <style>{`
        @keyframes ct-mesh {
          0%   { background-position: 0% 0%;    }
          33%  { background-position: 100% 50%; }
          66%  { background-position: 50% 100%; }
          100% { background-position: 0% 0%;    }
        }
        @keyframes ct-orb1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50%       { transform: translate(-5%, 8%) scale(1.2); }
        }
        @keyframes ct-orb2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50%       { transform: translate(7%, -9%) scale(1.15); }
        }
        @keyframes ct-orb3 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50%       { transform: translate(-8%, -4%) scale(1.08); }
        }
        .ct-bg-mesh {
          position: absolute; inset: 0;
          background: linear-gradient(125deg,
            #1a1008 0%,
            #241406 26%,
            #0f0c0a 54%,
            #1c1005 80%,
            #1a1008 100%);
          background-size: 400% 400%;
          animation: ct-mesh 24s ease infinite;
        }
        .ct-orb-1 {
          position: absolute;
          width: 65vw; height: 65vh;
          top: -22%; right: -12%;
          border-radius: 50%;
          background: radial-gradient(ellipse at center,
            rgba(195,111,61,0.62) 0%,
            rgba(160,82,30,0.3) 36%,
            rgba(114,68,26,0.15) 60%,
            transparent 76%);
          filter: blur(55px);
          animation: ct-orb1 12s ease-in-out infinite;
        }
        .ct-orb-2 {
          position: absolute;
          width: 55vw; height: 60vh;
          bottom: -12%; left: -6%;
          border-radius: 50%;
          background: radial-gradient(ellipse at center,
            rgba(139,90,43,0.56) 0%,
            rgba(100,60,20,0.22) 40%,
            rgba(70,42,16,0.1) 62%,
            transparent 74%);
          filter: blur(55px);
          animation: ct-orb2 16s ease-in-out infinite;
        }
        .ct-orb-3 {
          position: absolute;
          width: 45vw; height: 45vh;
          top: 35%; left: 28%;
          border-radius: 50%;
          background: radial-gradient(ellipse at center,
            rgba(195,111,61,0.5) 0%,
            rgba(139,90,43,0.22) 42%,
            rgba(88,52,20,0.1) 64%,
            transparent 74%);
          filter: blur(55px);
          animation: ct-orb3 20s ease-in-out infinite;
        }
      `}</style>
      <div className="container-site" style={{ position: "relative", zIndex: 1 }}>

        <div ref={headRef} style={{ marginBottom: "3rem" }}>
          <p className="section-label" style={{ marginBottom: "1rem", color: "rgba(255,255,255,0.45)" }}>Get in touch</p>
          <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap", alignItems: "center", marginBottom: "2rem" }}>
            <MagneticText text="CONNECT" hoverText="HIRE ME" className="text-white/[0.22]" />
            <MagneticText text="LETS BUILD" hoverText="TODAY" className="text-white/[0.22]" />
          </div>
        </div>

        {/* Main contact card */}
        <div ref={cardRef} style={{ position: "relative", borderRadius: "1.5rem", padding: "3px" }}>
          <GlowingEffect spread={80} glow={true} disabled={false} proximity={100} inactiveZone={0.01} borderWidth={2} />
          <div
            style={{
              position: "relative",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "1.25rem",
              padding: "clamp(2.5rem, 6vw, 5rem)",
              overflow: "hidden",
            }}
            className="contact-grid"
          >
            {/* Decorative orbit ring */}
            <div
              ref={orbitRef}
              style={{
                position: "absolute",
                top: "-60px",
                right: "-60px",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                border: "1px solid rgba(195,111,61,0.12)",
                pointerEvents: "none",
              }}
            >
              <div style={{
                position: "absolute",
                top: "0",
                left: "50%",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "var(--accent)",
                transform: "translate(-50%, -50%)",
                boxShadow: "0 0 12px rgba(195,111,61,0.4)",
              }} />
            </div>

            <div className="contact-main-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "3.5rem", alignItems: "center" }}>
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
                  Ready to build something<br />
                  <span style={{ color: "var(--accent)" }}>together?</span>
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
                  Whether it is a quick question or a full project, reach out.
                </p>

                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1rem" }}>
                  <div style={{ position: "relative", borderRadius: "6px", padding: "2px" }}>
                    <GlowingEffect spread={25} glow={true} disabled={false} proximity={40} inactiveZone={0.01} borderWidth={2} />
                    <a
                      href="mailto:danielst.data@gmail.com"
                      className="btn-primary"
                      style={{
                        position: "relative",
                        fontSize: "0.9rem",
                        padding: "0.75rem 1.75rem",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <Send size={14} />
                      Send an email
                    </a>
                  </div>

                  <a
                    href="https://www.linkedin.com/in/daniel-steven-rodriguez-sandoval/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost"
                    style={{
                      fontSize: "0.9rem",
                      padding: "0.75rem 1.75rem",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Linkedin size={14} />
                    View LinkedIn
                    <ArrowUpRight size={13} style={{ opacity: 0.6 }} />
                  </a>
                </div>

                {/* Click-to-copy email for engagement */}
                <button
                  onClick={copyEmail}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.5rem 1rem",
                    background: copied ? "rgba(111,123,100,0.1)" : "var(--bg-subtle)",
                    border: `1px solid ${copied ? "rgba(111,123,100,0.34)" : "var(--border)"}`,
                    borderRadius: "0.5rem",
                    fontSize: "0.8rem",
                    color: copied ? "var(--accent-sage)" : "var(--fg-muted)",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    marginBottom: "1rem",
                  }}
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  {copied ? "Email copied!" : "danielst.data@gmail.com"}
                </button>

              </div>

              {/* Right info column */}
              <div className="contact-info-col" style={{ display: "flex", flexDirection: "column", gap: "1.25rem", alignItems: "stretch" }}>
                {INFO_ITEMS.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    style={{
                      textAlign: "left",
                      padding: "0.85rem 1.1rem",
                      borderRadius: "0.75rem",
                      background: "var(--bg-subtle)",
                      border: "1px solid var(--border)",
                      minWidth: "160px",
                      transition: "border-color 0.2s ease, transform 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--accent)";
                      e.currentTarget.style.transform = "translateX(-4px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "0.35rem", marginBottom: "0.2rem" }}>
                      <Icon size={11} style={{ color: "var(--fg-subtle)" }} />
                      <p style={{ fontSize: "0.65rem", color: "var(--fg-subtle)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>
                        {label}
                      </p>
                    </div>
                    <p style={{ fontSize: "0.9rem", color: "var(--fg)", fontWeight: 500 }}>{value}</p>
                  </div>
                ))}

                <div
                  style={{
                    textAlign: "left",
                    padding: "0.95rem 1.1rem",
                    borderRadius: "0.75rem",
                    background: "linear-gradient(135deg, rgba(111,123,100,0.18), rgba(111,123,100,0.06))",
                    border: "1px solid rgba(111,123,100,0.32)",
                    minWidth: "160px",
                    boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.25)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "0.35rem", marginBottom: "0.3rem" }}>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent-sage)", animation: "pulse-dot 2.3s ease-in-out infinite" }} />
                    <p style={{ fontSize: "0.65rem", color: "var(--accent-sage)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700 }}>
                      No Visa Needed
                    </p>
                  </div>
                  <p style={{ fontSize: "0.84rem", color: "rgba(73,84,65,0.94)", fontWeight: 500, lineHeight: 1.45 }}>
                    US citizen. No visa sponsorship required.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Engagement element: availability status card */}
        <div style={{
          marginTop: "2rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          maxWidth: "700px",
          marginInline: "auto",
        }}>
          <div style={{
            padding: "1.25rem",
            borderRadius: "1rem",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            transition: "border-color 0.2s ease",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent-sage)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent-sage)", animation: "pulse-dot 2s ease-in-out infinite" }} />
              <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent-sage)" }}>
                Available Now
              </span>
            </div>
            <p style={{ fontSize: "0.82rem", color: "var(--fg-muted)", lineHeight: 1.5 }}>
              Available immediately for new opportunities. Full time or contract.
            </p>
          </div>

          <div style={{
            padding: "1.25rem",
            borderRadius: "1rem",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            transition: "border-color 0.2s ease",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem" }}>
              <Globe size={12} style={{ color: "var(--accent)" }} />
              <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent)" }}>
                Time Zones
              </span>
            </div>
            <p style={{ fontSize: "0.82rem", color: "var(--fg-muted)", lineHeight: 1.5 }}>
              Comfortable working across EST, CST, CET, and GMT+1. Fluent in EN, ES, FR.
            </p>
          </div>

          <div style={{
            padding: "1.25rem",
            borderRadius: "1rem",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            transition: "border-color 0.2s ease",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent-rose)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.5rem" }}>
              <Sparkles size={12} style={{ color: "var(--accent-rose)" }} />
              <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent-rose)" }}>
                Open To
              </span>
            </div>
            <p style={{ fontSize: "0.82rem", color: "var(--fg-muted)", lineHeight: 1.5 }}>
              Data analytics, AI/ML engineering, business intelligence, and B2B operations roles.
            </p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 768px) {
          .contact-main-grid { grid-template-columns: 1fr !important; }
          .contact-info-col {
            flex-direction: row !important;
            flex-wrap: wrap !important;
            align-items: stretch !important;
          }
        }
      `}} />
    </section>
  );
}
