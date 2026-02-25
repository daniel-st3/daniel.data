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
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
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

          {/* Desktop Nav links */}
          <nav className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: "1.75rem" }}>
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

          {/* Desktop CTA */}
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <a
              href="https://github.com/daniel-st3"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: "0.8rem", fontWeight: 500, color: "rgba(255,255,255,0.5)", transition: "color 0.2s ease" }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.95)")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
            >
              GitHub ↗
            </a>
            <a
              href="/cv/Daniel%20Rodriguez.pdf"
              download
              className="btn-ghost-dark"
              style={{ fontSize: "0.78rem", padding: "0.4rem 1rem" }}
            >
              Download Resume
            </a>
            <a
              href="mailto:danielst.data@gmail.com"
              className="btn-ghost-dark"
              style={{ fontSize: "0.78rem", padding: "0.4rem 1rem" }}
            >
              Email me
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="nav-mobile-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            style={{
              display: "none",
              flexDirection: "column",
              gap: "5px",
              background: "none",
              border: "none",
              padding: "8px",
              cursor: "pointer",
              zIndex: 110,
            }}
          >
            <span
              style={{
                display: "block",
                width: "22px",
                height: "2px",
                background: "#fff",
                borderRadius: "2px",
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "22px",
                height: "2px",
                background: "#fff",
                borderRadius: "2px",
                transition: "opacity 0.3s ease",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: "22px",
                height: "2px",
                background: "#fff",
                borderRadius: "2px",
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen menu overlay */}
      <div
        className="mobile-menu-overlay"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99,
          background: "rgba(3,7,18,0.97)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.35s ease",
        }}
      >
        {NAV_LINKS.map((link, i) => {
          const isActive = activeSection === link.href.replace("#", "");
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: "clamp(1.5rem, 5vw, 2.2rem)",
                fontWeight: isActive ? 700 : 500,
                color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                letterSpacing: "-0.03em",
                textDecoration: "none",
                transition: "color 0.2s ease, transform 0.3s ease",
                transitionDelay: menuOpen ? `${i * 0.06}s` : "0s",
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: menuOpen ? 1 : 0,
              }}
            >
              {link.label}
              {isActive && (
                <span style={{ display: "block", width: "24px", height: "2px", background: "var(--accent)", borderRadius: "2px", margin: "0.3rem auto 0" }} />
              )}
            </a>
          );
        })}

        <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          <a
            href="https://github.com/daniel-st3"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-dark"
            style={{ fontSize: "0.85rem", padding: "0.6rem 1.2rem" }}
            onClick={() => setMenuOpen(false)}
          >
            GitHub ↗
          </a>
          <a
            href="/cv/Daniel%20Rodriguez.pdf"
            download
            className="btn-ghost-dark"
            style={{ fontSize: "0.85rem", padding: "0.6rem 1.2rem" }}
            onClick={() => setMenuOpen(false)}
          >
            Resume
          </a>
          <a
            href="mailto:danielst.data@gmail.com"
            className="btn-primary"
            style={{ fontSize: "0.85rem", padding: "0.6rem 1.2rem" }}
            onClick={() => setMenuOpen(false)}
          >
            Email me
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-overlay { display: none !important; }
        }
      `}</style>
    </>
  );
}
