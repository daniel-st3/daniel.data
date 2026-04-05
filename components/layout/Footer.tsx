"use client";
import { SocialLayoutGrid } from "@/components/ui/layout-grid";
import { FooterSection } from "@/components/ui/footer-section";

export default function Footer() {
  return (
    <footer style={{ position: "relative", zIndex: 1, background: "linear-gradient(160deg, #faf6f0 0%, #f3ede4 50%, #faf6f0 100%)" }}>
      {/* Social & Links header */}
      <div className="container-site" style={{ paddingTop: "3rem", paddingBottom: "1.5rem" }}>
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

      {/* Social grid — edge-to-edge with padding */}
      <div style={{ paddingInline: "clamp(1.5rem, 5vw, 3rem)", paddingBottom: "2rem" }}>
        <SocialLayoutGrid />
      </div>

      {/* Footer section with quick links + copyright */}
      <FooterSection />
    </footer>
  );
}
