"use client";

import { useState, useEffect } from "react";

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
    file: "Model Context Protocol: Advanced Topics by Anthropic.pdf",
    label: "Model Context Protocol: Advanced Topics · Anthropic",
    description: "Advanced MCP patterns for server-client transport, production deployment, sampling, notifications, and file system access control.",
  },
  {
    file: "Claude Code in Action by Anthropic.pdf",
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
  rowIdx: number;
}

function CertCard({ cert, rowIdx }: CertCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [imageError, setImageError] = useState(false);
  const isPdf = cert.file.toLowerCase().endsWith(".pdf");
  const openText = isPdf ? "open certificate PDF" : "view on LinkedIn";
  const openBadgeText = isPdf ? "Open PDF ↗" : "LinkedIn ↗";

  // Auto-collapse after 2s if user doesn't click a second time
  useEffect(() => {
    if (!expanded) return;
    const t = setTimeout(() => {
      setExpanded(false);
      setClickCount(0);
    }, 2000);
    return () => clearTimeout(t);
  }, [expanded]);

  const handleClick = () => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next === 1) {
      setExpanded(true);
    } else {
      setExpanded(false);
      setClickCount(0);
      const targetUrl = isPdf ? certSrc(cert.file) : LINKEDIN_CERTS_URL;
      window.open(targetUrl, "_blank", "noopener");
    }
  };

  return (
    <div
      onClick={handleClick}
      title={expanded ? `Click again to ${openText}` : "Click to expand"}
      style={{
        flexShrink: 0,
        width: expanded ? 360 : 200,
        height: expanded ? 270 : 150,
        borderRadius: "0.75rem",
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
        transition: "width 0.4s cubic-bezier(0.22,1,0.36,1), height 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease",
        boxShadow: expanded ? "0 8px 40px rgba(74,111,165,0.35)" : "0 2px 12px rgba(0,0,0,0.2)",
        border: expanded ? "1px solid rgba(74,111,165,0.4)" : "1px solid var(--border)",
      }}
    >
      {!isPdf && !imageError ? (
        <img
          src={certSrc(cert.file)}
          alt={cert.label}
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
            background: "linear-gradient(135deg, #1a2740 0%, #102c4a 45%, #1b3a61 100%)",
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
            background: "rgba(74,111,165,0.8)",
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
  const doubled = [...certs, ...certs, ...certs];
  const speed = 25 + rowIdx * 5;
  const animName = `cert-scroll-${rowIdx}`;

  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <style>{`
        @keyframes ${animName} {
          from { transform: translateX(0); }
          to   { transform: translateX(-${100 / 3}%); }
        }
      `}</style>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          width: "max-content",
          animation: `${animName} ${speed}s linear infinite`,
          animationDirection: direction === "right" ? "reverse" : "normal",
          paddingRight: "1rem",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.animationPlayState = "paused")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.animationPlayState = "running")}
      >
        {doubled.map((cert, i) => (
          <CertCard key={`${cert.file}-${i}`} cert={cert} rowIdx={rowIdx} />
        ))}
      </div>
    </div>
  );
}

export default function CertGallery() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <CertRow certs={ROW1} direction="left" rowIdx={0} />
      <CertRow certs={ROW2} direction="right" rowIdx={1} />
      <CertRow certs={ROW3} direction="left" rowIdx={2} />
    </div>
  );
}
