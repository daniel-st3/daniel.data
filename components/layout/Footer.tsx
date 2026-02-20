"use client";

import { ClipPathLinks } from "@/components/ui/clip-path-links";

export default function Footer() {
  return (
    <footer style={{ position: "relative", zIndex: 1, background: "var(--bg)" }}>
      <div className="container-site" style={{ paddingTop: "3rem", paddingBottom: "2rem" }}>
        <div style={{ marginBottom: "1.5rem" }}>
          <p className="section-label" style={{ marginBottom: "0.4rem" }}>Find me</p>
          <h3
            style={{
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              color: "var(--fg)",
            }}
          >
            Social &amp; Links
          </h3>
        </div>
      </div>

      <div className="container-site" style={{ paddingBottom: "0" }}>
        <ClipPathLinks />
      </div>

      <div
        className="container-site"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: "1.5rem",
          paddingBottom: "1.5rem",
          flexWrap: "wrap",
          gap: "0.75rem",
          borderTop: "1px solid var(--border)",
          marginTop: "0",
        }}
      >
        <p style={{ fontSize: "0.8rem", color: "var(--fg-subtle)", letterSpacing: "-0.01em" }}>
          Daniel Rodriguez © 2026 · Bogotá, Colombia
        </p>
        <p style={{ fontSize: "0.75rem", color: "var(--fg-subtle)" }}>
          Built with Next.js · Three.js · framer-motion
        </p>
      </div>
    </footer>
  );
}
