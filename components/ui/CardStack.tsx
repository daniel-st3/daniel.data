"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export interface CardStackItem {
  id: number;
  title: string;
  tag: string;
  description: string;
  imageSrc: string;
  href: string;
}

interface CardStackProps {
  items: CardStackItem[];
  autoAdvance?: boolean;
  pauseOnHover?: boolean;
  showDots?: boolean;
  cardWidth?: number;
  cardHeight?: number;
  offset?: number;
  scaleFactor?: number;
}

export default function CardStack({
  items,
  showDots = true,
  cardWidth = 480,
  cardHeight = 300,
  offset = 8,
  scaleFactor = 0.05,
}: CardStackProps) {
  const [active, setActive] = useState(0);

  const handleNext = () => setActive((prev) => (prev + 1) % items.length);
  const handlePrev = () =>
    setActive((prev) => (prev - 1 + items.length) % items.length);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}>
      {/* Stack */}
      <div
        style={{
          position: "relative",
          width: cardWidth,
          height: cardHeight,
          maxWidth: "100%",
        }}
      >
        {items.map((item, index) => {
          const stackIndex = (index - active + items.length) % items.length;
          const isTop = stackIndex === 0;
          const isVisible = stackIndex < 4;

          return (
            <motion.div
              key={item.id}
              animate={{
                top: isTop ? 0 : stackIndex * offset,
                scale: 1 - stackIndex * scaleFactor,
                zIndex: items.length - stackIndex,
                opacity: isTop ? 1 : isVisible ? Math.max(0, 0.7 - stackIndex * 0.15) : 0,
              }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              style={{
                position: "absolute",
                width: "100%",
                height: cardHeight,
                border: "1px solid var(--border)",
                borderRadius: "6px",
                overflow: "hidden",
                background: "var(--bg-card)",
                cursor: isTop ? "pointer" : "default",
                transformOrigin: "top center",
                boxShadow: isTop
                  ? "0 20px 60px rgba(0,0,0,0.12)"
                  : "0 4px 20px rgba(0,0,0,0.06)",
              }}
              onClick={isTop ? handleNext : undefined}
            >
              {/* Image banner */}
              <div style={{ position: "relative", height: "52%", overflow: "hidden" }}>
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)",
                  }}
                />
                {/* Tag overlay */}
                <span
                  style={{
                    position: "absolute",
                    top: "0.75rem",
                    right: "0.75rem",
                    fontSize: "0.65rem",
                    fontWeight: 500,
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.4)",
                    borderRadius: "2px",
                    padding: "0.18rem 0.5rem",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    background: "rgba(0,0,0,0.3)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {item.tag}
                </span>
              </div>

              {/* Content */}
              <div
                style={{
                  padding: "1rem 1.25rem",
                  height: "48%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "0.975rem",
                      fontWeight: 600,
                      letterSpacing: "-0.02em",
                      color: "var(--fg)",
                      lineHeight: 1.3,
                      marginBottom: "0.35rem",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--fg-muted)",
                      lineHeight: 1.55,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical" as const,
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--accent)",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    alignSelf: "flex-start",
                  }}
                >
                  View on GitHub ↗
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: cardWidth,
          maxWidth: "100%",
        }}
      >
        {/* Dots */}
        {showDots && (
          <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? 20 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === active ? "var(--accent)" : "var(--border)",
                  border: "none",
                  padding: 0,
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        )}

        {/* Arrow buttons */}
        <div style={{ display: "flex", gap: "0.5rem", marginLeft: "auto" }}>
          <button
            onClick={handlePrev}
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              border: "1px solid var(--border)",
              background: "transparent",
              color: "var(--fg)",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ←
          </button>
          <button
            onClick={handleNext}
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              border: "none",
              background: "var(--accent)",
              color: "#fff",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
