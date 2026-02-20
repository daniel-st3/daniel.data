"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface TimelineProps {
  data: TimelineEntry[];
}

export function Timeline({ data }: TimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.08], [0, 1]);

  return (
    <div ref={containerRef} style={{ width: "100%", fontFamily: "inherit" }}>
      <div ref={ref} style={{ position: "relative", paddingBottom: "2rem" }}>
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              paddingTop: index === 0 ? "1rem" : "3rem",
              gap: "1.5rem",
            }}
          >
            {/* Left: sticky year label + dot */}
            <div
              style={{
                position: "sticky",
                top: "8rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                zIndex: 10,
                alignSelf: "flex-start",
                minWidth: "80px",
              }}
            >
              {/* Dot */}
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "var(--accent)",
                  border: "2px solid var(--bg)",
                  boxShadow: "0 0 0 3px var(--accent-bg)",
                  marginLeft: "-5px",
                  marginBottom: "0.6rem",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.04em",
                  color: "var(--fg)",
                  lineHeight: 1,
                }}
              >
                {item.title}
              </span>
            </div>

            {/* Right: content */}
            <div style={{ flex: 1, paddingLeft: "0.5rem" }}>
              {item.content}
            </div>
          </div>
        ))}

        {/* Vertical track */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 2,
            height: height,
            background: "var(--border)",
            overflow: "hidden",
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              background:
                "linear-gradient(to bottom, var(--accent), var(--accent-light), transparent)",
              height: heightTransform,
              opacity: opacityTransform,
            }}
          />
        </div>
      </div>
    </div>
  );
}
