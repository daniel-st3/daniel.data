"use client";
import { Mail, MapPin, Github, Linkedin } from "lucide-react";
import { SiX, SiWhatsapp } from "react-icons/si";
import { useState } from "react";

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Thesis", href: "#thesis" },
  { label: "Contact", href: "#contact" },
];

function QuickLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: "0.85rem",
        color: hovered ? "var(--accent)" : "var(--fg-muted)",
        textDecoration: hovered ? "underline" : "none",
        textUnderlineOffset: "3px",
        transition: "color 0.2s ease",
        letterSpacing: "-0.01em",
      }}
    >
      {label}
    </a>
  );
}

function ContactButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.45rem 0.9rem",
        borderRadius: "8px",
        border: `1px solid ${hovered ? "var(--accent)" : "var(--border)"}`,
        background: hovered ? "rgba(195, 111, 61, 0.08)" : "transparent",
        color: hovered ? "var(--accent)" : "var(--fg-muted)",
        fontSize: "0.82rem",
        fontWeight: 500,
        letterSpacing: "-0.01em",
        textDecoration: "none",
        transition: "all 0.2s ease",
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      {icon}
      {label}
    </a>
  );
}

export function FooterSection() {
  return (
    <footer
      style={{
        background: "var(--bg)",
        borderTop: "1px solid var(--border)",
        padding: "0",
      }}
    >
      {/* Main grid */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "3rem clamp(1.5rem, 5vw, 3rem) 2.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2.5rem",
          alignItems: "start",
        }}
      >
        {/* Column 1 — Identity */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div>
            <h4
              style={{
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "var(--fg)",
                letterSpacing: "-0.03em",
                margin: 0,
              }}
            >
              Daniel Rodriguez
            </h4>
            <p
              style={{
                fontSize: "0.8rem",
                color: "var(--fg-muted)",
                marginTop: "0.25rem",
                letterSpacing: "-0.01em",
                lineHeight: 1.4,
              }}
            >
              Business &amp; Data Analyst · AI &amp; Automation
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              color: "var(--fg-muted)",
            }}
          >
            <MapPin size={13} strokeWidth={1.8} />
            <span style={{ fontSize: "0.78rem", letterSpacing: "-0.01em" }}>
              Bogotá, Colombia · Remote friendly
            </span>
          </div>

          {/* Status badge */}
          <div style={{ display: "inline-flex", alignSelf: "flex-start" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "#2d7a3a",
                background: "rgba(45,122,58,0.1)",
                border: "1px solid rgba(45,122,58,0.25)",
                borderRadius: "999px",
                padding: "0.22rem 0.6rem",
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#2d7a3a",
                  flexShrink: 0,
                  boxShadow: "0 0 0 2px rgba(45,122,58,0.2)",
                }}
              />
              Open to opportunities
            </span>
          </div>

          {/* Social icon row */}
          <div style={{ display: "flex", gap: "0.6rem", marginTop: "0.25rem" }}>
            {[
              {
                href: "https://x.com/danielst_31",
                icon: <SiX size={14} />,
                label: "X",
              },
              {
                href: "https://instagram.com/daniel.st____",
                icon: (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-label="Instagram"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                ),
                label: "Instagram",
              },
              {
                href: "https://wa.me/573144508230",
                icon: <SiWhatsapp size={14} />,
                label: "WhatsApp",
              },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "28px",
                  height: "28px",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                  color: "var(--fg-muted)",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--accent)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "var(--accent)";
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "rgba(195,111,61,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color =
                    "var(--fg-muted)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "var(--border)";
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    "transparent";
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2 — Quick Links */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <p
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--fg-muted)",
              marginBottom: "0.35rem",
            }}
          >
            Quick Links
          </p>
          {quickLinks.map(({ label, href }) => (
            <QuickLink key={href} label={label} href={href} />
          ))}
        </div>

        {/* Column 3 — Direct Contact */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <p
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--fg-muted)",
              marginBottom: "0.1rem",
            }}
          >
            Contact
          </p>

          <ContactButton
            href="mailto:danielst.data@gmail.com"
            icon={<Mail size={14} strokeWidth={1.8} />}
            label="danielst.data@gmail.com"
          />
          <ContactButton
            href="https://www.linkedin.com/in/daniel-steven-rodriguez-sandoval"
            icon={<Linkedin size={14} strokeWidth={1.8} />}
            label="LinkedIn"
          />
          <ContactButton
            href="https://github.com/daniel-st3"
            icon={<Github size={14} strokeWidth={1.8} />}
            label="GitHub"
          />
          <ContactButton
            href="https://wa.me/573144508230"
            icon={<SiWhatsapp size={14} />}
            label="WhatsApp"
          />
        </div>
      </div>

      {/* Divider + copyright bar */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "1.25rem clamp(1.5rem, 5vw, 3rem)",
          borderTop: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <p
          style={{
            fontSize: "0.78rem",
            color: "var(--fg-muted)",
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          Daniel Rodriguez © 2026 · Bogotá, Colombia
        </p>
        <p
          style={{
            fontSize: "0.73rem",
            color: "var(--fg-muted)",
            opacity: 0.7,
            margin: 0,
            letterSpacing: "-0.01em",
          }}
        >
          Built with Next.js · GSAP · Three.js · framer-motion
        </p>
      </div>
    </footer>
  );
}

export default FooterSection;
