"use client";

import { useState, useEffect } from "react";

const LINKEDIN_CERTS_URL = "https://www.linkedin.com/in/daniel-steven-rodriguez-sandoval/details/certifications/";

// Files copied to public/certifications/
function certSrc(name: string) {
  return `/certifications/${encodeURIComponent(name)}`;
}

const CERTS = [
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

// Split into 3 rows
const ROW1 = CERTS.slice(0, 5);
const ROW2 = CERTS.slice(5, 9);
const ROW3 = CERTS.slice(9);

interface CertCardProps {
  cert: { file: string; label: string };
  rowIdx: number;
}

function CertCard({ cert, rowIdx }: CertCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [clickCount, setClickCount] = useState(0);

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
      window.open(LINKEDIN_CERTS_URL, "_blank", "noopener");
    }
  };

  return (
    <div
      onClick={handleClick}
      title={expanded ? "Click again to view on LinkedIn" : "Click to expand"}
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
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
      {/* Label overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(3,7,18,0.85) 0%, transparent 50%)",
          display: "flex",
          alignItems: "flex-end",
          padding: "0.6rem",
        }}
      >
        <p
          style={{
            fontSize: "0.58rem",
            fontWeight: 600,
            color: "rgba(255,255,255,0.9)",
            letterSpacing: "0.03em",
            lineHeight: 1.3,
          }}
        >
          {cert.label}
        </p>
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
          Click for LinkedIn ↗
        </div>
      )}
    </div>
  );
}

interface CertRowProps {
  certs: { file: string; label: string }[];
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
