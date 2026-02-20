"use client";

import { useEffect, useRef, useState } from "react";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const btnRef = useRef<HTMLAnchorElement>(null);

  // Appear after a short delay once page loads
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @keyframes float-bob {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          25% { transform: translateY(-8px) rotate(1deg); }
          50% { transform: translateY(-4px) rotate(-1deg); }
          75% { transform: translateY(-10px) rotate(2deg); }
        }
        @keyframes cta-appear {
          from { opacity: 0; transform: translateX(60px) rotate(-2deg); }
          to   { opacity: 1; transform: translateX(0) rotate(-2deg); }
        }
        .floating-cta {
          position: fixed;
          right: 1.25rem;
          bottom: 32vh;
          z-index: 980;
          animation:
            cta-appear 0.7s 1.8s ease-out both,
            float-bob 4s 2.5s ease-in-out infinite;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3rem;
          padding: 0.7rem 0.85rem;
          width: 78px;
          background: var(--accent);
          color: #fff;
          border-radius: 14px;
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          text-align: center;
          line-height: 1.35;
          box-shadow: 0 8px 28px rgba(74,111,165,0.55), 0 2px 8px rgba(74,111,165,0.35);
          transition: box-shadow 0.25s ease, background 0.25s ease;
          will-change: transform;
          cursor: none;
        }
        .floating-cta:hover {
          background: #3a5a8a;
          box-shadow: 0 12px 40px rgba(74,111,165,0.75), 0 4px 14px rgba(74,111,165,0.5);
          animation-play-state: paused !important;
        }
        .floating-cta .cta-icon {
          font-size: 1.25rem;
          line-height: 1;
          filter: drop-shadow(0 0 4px rgba(255,255,255,0.5));
        }
        @media (max-width: 640px) {
          .floating-cta {
            right: 0.75rem;
            bottom: 20vh;
            width: 66px;
            font-size: 0.52rem;
            padding: 0.6rem 0.7rem;
          }
        }
      `}</style>

      <a
        ref={btnRef}
        href="https://github.com/daniel-st3"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-cta"
        aria-label="Check my assets on GitHub"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span className="cta-icon">{hovered ? "✦" : "⬡"}</span>
        Check my assets
      </a>
    </>
  );
}
