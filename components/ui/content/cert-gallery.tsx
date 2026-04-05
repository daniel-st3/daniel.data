"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent, MutableRefObject, TouchEvent as ReactTouchEvent, WheelEvent as ReactWheelEvent } from "react";

const LINKEDIN_CERTS_URL = "https://www.linkedin.com/in/daniel-steven-rodriguez-sandoval/details/certifications/";

// Files copied to public/certifications/
function certSrc(name: string) {
  // Use encodeURI for whole filename so "&" remains literal (Next public serving for this file path is strict on it).
  return `/certifications/${encodeURI(name)}`;
}

interface CertItem {
  file: string;
  label: string;
  description?: string;
}

const CERTS: CertItem[] = [
  {
    file: "Model Context Protocol Advanced Topics by Anthropic.png",
    label: "Model Context Protocol: Advanced Topics · Anthropic",
    description: "Advanced MCP patterns for server-client transport, production deployment, sampling, notifications, and file system access control.",
  },
  {
    file: "Claude Code in Action by Anthropic.png",
    label: "Claude Code in Action · Anthropic",
    description: "Hands-on Claude Code architecture, implementation techniques, context management, MCP server extensions, and GitHub integration.",
  },
  { file: "Google Advanced Data Analytics Specialization  Google.jpeg", label: "Google Advanced Data Analytics" },
  { file: "Google Business Intelligence Specialization  Google.jpeg", label: "Google Business Intelligence" },
  { file: "Natural Language Processing on Google Cloud  Google Cloud Skills Boost.jpeg", label: "NLP on Google Cloud" },
  { file: "Machine Learning for Trading Specialization  New York Institute of Finance.jpeg", label: "ML for Trading · NYIF" },
  { file: "Microsoft Certified- Azure AI Fundamentals AI 900  Microsoft.jpeg", label: "Azure AI Fundamentals · AI-900" },
  { file: "Machine Learning Algorithms- Supervised Learning Tip to Tail  Amii (Alberta Machine Intelligence Institute).jpeg", label: "ML Algorithms · Amii" },
  { file: "Machine Learning with Python  IBM.jpeg", label: "Machine Learning with Python · IBM" },
  { file: "Python for Data Science, AI & Development  IBM.jpeg", label: "Python for Data Science · IBM" },
  { file: "Databases and SQL for Data Science with Python (with Honors).jpeg", label: "Databases & SQL for Data Science · IBM" },
  { file: "Advanced Data Visualization with Tableau  Tableau.jpeg", label: "Advanced Data Viz · Tableau" },
  { file: "Digital Marketing.jpeg", label: "Digital Marketing" },
  { file: "Advanced Excel and Data Modeling.png", label: "Advanced Excel & Data Modeling" },
  { file: "Total Python Advanced Programming.jpeg", label: "Total Python Advanced" },
];

const ROW_SIZE = Math.ceil(CERTS.length / 3);
const ROW1 = CERTS.slice(0, ROW_SIZE);
const ROW2 = CERTS.slice(ROW_SIZE, ROW_SIZE * 2);
const ROW3 = CERTS.slice(ROW_SIZE * 2);

interface CertCardProps {
  cert: CertItem;
  expanded: boolean;
  onActivate: () => void;
  suppressClickRef: MutableRefObject<boolean>;
}

function CertCard({ cert, expanded, onActivate, suppressClickRef }: CertCardProps) {
  const [imageError, setImageError] = useState(false);
  const isPdf = cert.file.toLowerCase().endsWith(".pdf");
  const openText = isPdf ? "open certificate PDF" : "view on LinkedIn";
  const openBadgeText = isPdf ? "Open PDF ↗" : "LinkedIn ↗";

  return (
    <div
      draggable={false}
      onDragStart={(event) => {
        event.preventDefault();
      }}
      onClickCapture={(event) => {
        if (suppressClickRef.current) {
          event.preventDefault();
          event.stopPropagation();
        }
      }}
      onClick={onActivate}
      title={expanded ? `Click again to ${openText}` : "Click to expand"}
      className={!expanded ? "cert-card-collapsed" : undefined}
      style={{
        flexShrink: 0,
        width: expanded ? 360 : 200,
        height: expanded ? 270 : 150,
        borderRadius: "0.75rem",
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        transition: "width 0.4s cubic-bezier(0.22,1,0.36,1), height 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease",
        boxShadow: expanded ? "0 8px 40px rgba(195,111,61,0.24)" : "0 2px 12px rgba(0,0,0,0.15)",
        border: expanded ? "1px solid rgba(195,111,61,0.34)" : "1px solid var(--border)",
        userSelect: "none",
      }}
    >
      {!isPdf && !imageError ? (
        <img
          src={certSrc(cert.file)}
          alt={cert.label}
          draggable={false}
          onDragStart={(event) => {
            event.preventDefault();
          }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            transition: "transform 0.4s ease",
            transform: expanded ? "scale(1.05)" : "scale(1)",
            display: "block",
          }}
          onError={() => setImageError(true)}
        />
      ) : (
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(135deg, #493224 0%, #6b4731 45%, #8e6442 100%)",
          }}
        />
      )}
      {/* Label overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(3,7,18,0.92) 0%, rgba(3,7,18,0.3) 40%, transparent 55%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          padding: "0.65rem",
        }}
      >
        <p
          style={{
            fontSize: "0.65rem",
            fontWeight: 600,
            color: "#ffffff",
            letterSpacing: "0.03em",
            lineHeight: 1.35,
            textShadow: "0 1px 4px rgba(0,0,0,0.7)",
          }}
        >
          {cert.label}
        </p>
        {expanded && cert.description && (
          <p
            style={{
              marginTop: "0.35rem",
              fontSize: "0.55rem",
              color: "rgba(255,255,255,0.85)",
              lineHeight: 1.35,
              maxHeight: "3.8em",
              overflow: "hidden",
            }}
          >
            {cert.description}
          </p>
        )}
      </div>
      {expanded && (
        <div
          style={{
            position: "absolute",
            top: "0.4rem",
            right: "0.4rem",
            fontSize: "0.55rem",
            background: "rgba(195,111,61,0.84)",
            color: "#fff",
            borderRadius: "999px",
            padding: "0.15rem 0.45rem",
            fontWeight: 600,
          }}
        >
          {openBadgeText}
        </div>
      )}
    </div>
  );
}

interface CertRowProps {
  certs: CertItem[];
  direction: "left" | "right";
  rowIdx: number;
}

function CertRow({ certs, direction, rowIdx }: CertRowProps) {
  const tripled = [...certs, ...certs, ...certs];
  const speed = 25 + rowIdx * 5;
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const totalWidthRef = useRef(0);
  const posRef = useRef(0);
  const velRef = useRef(0);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const suppressClickRef = useRef(false);
  const pausedRef = useRef(false);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const detachDragRef = useRef<() => void>(() => {});
  const resumeAutoTimeoutRef = useRef<number | null>(null);
  const [armedFile, setArmedFile] = useState<string | null>(null);

  const wrapPosition = (nextPos: number, width = totalWidthRef.current) => {
    if (width <= 0) return nextPos;
    if (nextPos >= width * 2) return nextPos - width;
    if (nextPos <= 0) return nextPos + width;
    return nextPos;
  };

  const scheduleAutoResume = () => {
    if (resumeAutoTimeoutRef.current !== null) {
      window.clearTimeout(resumeAutoTimeoutRef.current);
    }
    resumeAutoTimeoutRef.current = window.setTimeout(() => {
      if (!draggingRef.current) {
        pausedRef.current = false;
      }
    }, 900);
  };

  useEffect(() => {
    if (!armedFile) return;
    const timeout = window.setTimeout(() => {
      setArmedFile(null);
    }, 2000);
    return () => window.clearTimeout(timeout);
  }, [armedFile]);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const measure = () => {
      const firstCard = track.children[0] as HTMLElement | undefined;
      const secondCopyFirstCard = track.children[certs.length] as HTMLElement | undefined;
      if (!firstCard || !secondCopyFirstCard) return;

      const totalWidth = secondCopyFirstCard.offsetLeft - firstCard.offsetLeft;
      if (totalWidth <= 0) return;

      const previousWidth = totalWidthRef.current;
      const currentPos = posRef.current || container.scrollLeft || totalWidth;
      totalWidthRef.current = totalWidth;

      if (previousWidth > 0) {
        const relativeOffset = currentPos - previousWidth;
        const nextPos = wrapPosition(totalWidth + relativeOffset, totalWidth);
        posRef.current = nextPos;
        container.scrollLeft = nextPos;
      } else {
        container.scrollLeft = totalWidth;
        posRef.current = totalWidth;
      }
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    window.addEventListener("resize", measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", measure);
      if (resumeAutoTimeoutRef.current !== null) {
        window.clearTimeout(resumeAutoTimeoutRef.current);
      }
    };
  }, [certs, armedFile]);

  useEffect(() => {
    const autoStep = (direction === "left" ? 1 : -1) * (speed / 60);

    const tick = () => {
      const container = containerRef.current;
      const totalWidth = totalWidthRef.current;

      if (container && totalWidth > 0) {
        if (!draggingRef.current && !pausedRef.current) {
          if (Math.abs(velRef.current) > 0.1) {
            velRef.current *= 0.93;
            posRef.current = wrapPosition(posRef.current + velRef.current);
          } else {
            velRef.current = 0;
            posRef.current = wrapPosition(posRef.current + autoStep);
          }
          container.scrollLeft = posRef.current;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [direction, speed]);

  useEffect(() => {
    return () => {
      detachDragRef.current();
    };
  }, []);

  const onMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container || totalWidthRef.current <= 0) return;

    event.preventDefault();
    detachDragRef.current();
    draggingRef.current = true;
    movedRef.current = false;
    pausedRef.current = true;
    lastXRef.current = event.clientX;
    lastTimeRef.current = performance.now();
    velRef.current = 0;
    container.style.cursor = "grabbing";

    const onMove = (moveEvent: MouseEvent) => {
      const now = performance.now();
      const dt = Math.max(now - lastTimeRef.current, 1);
      const dx = lastXRef.current - moveEvent.clientX;
      velRef.current = (dx / dt) * 16;
      lastTimeRef.current = now;
      lastXRef.current = moveEvent.clientX;
      if (Math.abs(dx) > 0.5) {
        movedRef.current = true;
      }
      posRef.current = wrapPosition(posRef.current + dx);
      container.scrollLeft = posRef.current;
    };

    const onUp = () => {
      draggingRef.current = false;
      suppressClickRef.current = movedRef.current;
      container.style.cursor = "grab";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      detachDragRef.current = () => {};
      scheduleAutoResume();
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    };

    detachDragRef.current = () => {
      draggingRef.current = false;
      container.style.cursor = "grab";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      detachDragRef.current = () => {};
      scheduleAutoResume();
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const onTouchStart = (event: ReactTouchEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container || totalWidthRef.current <= 0) return;

    detachDragRef.current();
    draggingRef.current = true;
    movedRef.current = false;
    pausedRef.current = true;
    lastXRef.current = event.touches[0].clientX;
    lastTimeRef.current = performance.now();
    velRef.current = 0;

    const onMove = (moveEvent: TouchEvent) => {
      const touch = moveEvent.touches[0];
      if (!touch) return;

      const now = performance.now();
      const dt = Math.max(now - lastTimeRef.current, 1);
      const dx = lastXRef.current - touch.clientX;
      velRef.current = (dx / dt) * 16;
      lastTimeRef.current = now;
      lastXRef.current = touch.clientX;
      if (Math.abs(dx) > 0.5) {
        movedRef.current = true;
      }
      moveEvent.preventDefault();
      posRef.current = wrapPosition(posRef.current + dx);
      container.scrollLeft = posRef.current;
    };

    const onEnd = () => {
      draggingRef.current = false;
      suppressClickRef.current = movedRef.current;
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
      detachDragRef.current = () => {};
      scheduleAutoResume();
      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    };

    detachDragRef.current = () => {
      draggingRef.current = false;
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
      detachDragRef.current = () => {};
      scheduleAutoResume();
    };

    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onEnd);
  };

  const onWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container || totalWidthRef.current <= 0) return;

    const delta = Math.abs(event.deltaX) > 0 ? event.deltaX : event.shiftKey ? event.deltaY : 0;
    if (delta === 0) return;

    event.preventDefault();
    pausedRef.current = true;
    velRef.current = 0;
    posRef.current = wrapPosition(posRef.current + delta);
    container.scrollLeft = posRef.current;
    scheduleAutoResume();
  };

  const onScroll = () => {
    const container = containerRef.current;
    if (!container || totalWidthRef.current <= 0 || draggingRef.current) return;

    const nextPos = wrapPosition(container.scrollLeft);
    if (nextPos !== container.scrollLeft) {
      container.scrollLeft = nextPos;
    }
    posRef.current = nextPos;
  };

  const handleActivate = (cert: CertItem) => {
    if (armedFile === cert.file) {
      setArmedFile(null);
      const targetUrl = cert.file.toLowerCase().endsWith(".pdf") ? certSrc(cert.file) : LINKEDIN_CERTS_URL;
      window.open(targetUrl, "_blank", "noopener");
      return;
    }

    setArmedFile(cert.file);
  };

  return (
    <div
      ref={containerRef}
      className="cert-row"
      style={{
        overflowX: "auto",
        overflowY: "hidden",
        width: "100%",
        cursor: "grab",
        userSelect: "none",
        scrollbarWidth: "none",
        WebkitOverflowScrolling: "touch",
        overscrollBehaviorX: "contain",
        touchAction: "pan-y",
      }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onWheel={onWheel}
      onScroll={onScroll}
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        if (!draggingRef.current) {
          pausedRef.current = false;
        }
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: "1rem",
          width: "max-content",
          paddingRight: "1rem",
        }}
      >
        {tripled.map((cert, i) => (
          <CertCard
            key={`${cert.file}-${i}`}
            cert={cert}
            expanded={armedFile === cert.file}
            onActivate={() => handleActivate(cert)}
            suppressClickRef={suppressClickRef}
          />
        ))}
      </div>
    </div>
  );
}

export default function CertGallery() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <style>{`
        .cert-row::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <CertRow certs={ROW1} direction="left" rowIdx={0} />
      <CertRow certs={ROW2} direction="right" rowIdx={1} />
      <CertRow certs={ROW3} direction="left" rowIdx={2} />
    </div>
  );
}
