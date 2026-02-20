"use client";

import { useEffect, useRef, useState } from "react";
import { loadGSAP } from "@/lib/gsap";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    (async () => {
      const { gsap } = await loadGSAP();
      gsap.fromTo(
        headerRef.current,
        { y: -32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.15 }
      );
    })();

    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // Active section tracking
      const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "var(--header-h)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        backgroundColor: scrolled ? "rgba(3,7,18,0.92)" : "rgba(3,7,18,0.6)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(255,255,255,0.04)",
        transition: "background-color 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div
        className="container-site"
        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}
      >
        {/* Logo — name + animated dot */}
        <a
          href="#"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            textDecoration: "none",
          }}
        >
          {/* Animated accent ring */}
          <div style={{ position: "relative", width: 20, height: 20, flexShrink: 0 }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                border: "1.5px solid var(--accent)",
                animation: "spin 8s linear infinite",
                opacity: 0.6,
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 4,
                borderRadius: "50%",
                background: "var(--accent)",
              }}
            />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
          <div>
            <span
              style={{
                display: "block",
                fontWeight: 700,
                fontSize: "0.9rem",
                letterSpacing: "-0.03em",
                color: "#ffffff",
                lineHeight: 1,
              }}
            >
              Daniel Rodriguez
            </span>
            <span
              style={{
                display: "block",
                fontSize: "0.62rem",
                color: "rgba(255,255,255,0.4)",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                lineHeight: 1,
                marginTop: "0.1rem",
              }}
            >
              Data · AI · Analytics
            </span>
          </div>
        </a>

        {/* Nav links */}
        <nav className="hidden md:flex" style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontSize: "0.82rem",
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "#ffffff" : "rgba(255,255,255,0.5)",
                  letterSpacing: "-0.01em",
                  transition: "color 0.2s ease",
                  position: "relative",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.95)")}
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = isActive ? "#ffffff" : "rgba(255,255,255,0.5)")
                }
              >
                {link.label}
                {isActive && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: -4,
                      left: 0,
                      right: 0,
                      height: 1.5,
                      background: "var(--accent)",
                      borderRadius: 2,
                    }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <a
            href="https://github.com/daniel-st3"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block"
            style={{ fontSize: "0.8rem", fontWeight: 500, color: "rgba(255,255,255,0.5)", transition: "color 0.2s ease" }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.95)")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
          >
            GitHub ↗
          </a>
          <a
            href="mailto:danielst.data@gmail.com"
            className="btn-ghost-dark"
            style={{ fontSize: "0.78rem", padding: "0.4rem 1rem" }}
          >
            Email me
          </a>
        </div>
      </div>
    </header>
  );
}
