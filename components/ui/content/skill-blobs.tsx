"use client";

import { useEffect, useRef, useState } from "react";

interface BlobGroup {
  id: string;
  label: string;
  color: string;
  skills: string[];
}

// Cohesive palette — all from the same blue-indigo-teal family
const BLOB_GROUPS: BlobGroup[] = [
  { id: "data", label: "Data &\nAnalytics", color: "#5B8FD4", skills: ["SQL", "Python", "Tableau", "Power BI", "Looker", "Excel"] },
  { id: "ml", label: "Machine\nLearning", color: "#4BA3E3", skills: ["Scikit-learn", "XGBoost", "TensorFlow", "BERT", "RandomForest"] },
  { id: "ai", label: "AI &\nAutomation", color: "#9B7BD4", skills: ["Claude API", "OpenAI", "n8n", "Make", "Vertex AI", "GenAI"] },
  { id: "cloud", label: "Cloud &\nEngineering", color: "#3DBAA3", skills: ["GCP", "BigQuery", "FastAPI", "Git", "ETL Pipelines"] },
  { id: "lang", label: "Languages", color: "#D49B5B", skills: ["English", "Spanish", "French", "Portuguese"] },
];

const RADIUS_X = 138;
const RADIUS_Y = 48;  // elliptical y-radius (planet ring look)
const ORBIT_SPEED = 0.5; // degrees per frame

function PlanetBlob({ group, globalMouse }: { group: BlobGroup; globalMouse: { x: number; y: number } }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const anglesRef = useRef<number[]>(
    group.skills.map((_, i) => (360 / group.skills.length) * i)
  );
  const [nearCursor, setNearCursor] = useState(false);

  // 3D tilt on local hover
  useEffect(() => {
    const el = containerRef.current;
    const blob = blobRef.current;
    if (!el || !blob) return;
    let rafId: number;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      cx = lerp(cx, tx, 0.07);
      cy = lerp(cy, ty, 0.07);
      blob.style.transform = `rotateX(${cy}deg) rotateY(${cx}deg)`;
      rafId = requestAnimationFrame(tick);
    };
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left - r.width / 2) / r.width) * 22;
      ty = ((e.clientY - r.top - r.height / 2) / r.height) * -22;
    };
    const onLeave = () => { tx = 0; ty = 0; };
    rafId = requestAnimationFrame(tick);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { cancelAnimationFrame(rafId); el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);

  // Elliptical planet orbit animation (JS-driven for true 3D look)
  useEffect(() => {
    let raf: number;
    const tick = () => {
      anglesRef.current = anglesRef.current.map((a) => a + ORBIT_SPEED);
      pillRefs.current.forEach((el, i) => {
        if (!el) return;
        const deg = anglesRef.current[i] * (Math.PI / 180);
        const x = Math.cos(deg) * RADIUS_X;
        const y = Math.sin(deg) * RADIUS_Y;
        const z = Math.sin(deg); // -1 (back) to 1 (front)
        const scale = 0.7 + ((z + 1) / 2) * 0.35; // 0.7 → 1.05
        const alpha = 0.45 + ((z + 1) / 2) * 0.55; // 0.45 → 1.0
        const zIdx = Math.round((z + 1) * 50);
        el.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
        el.style.opacity = String(Math.round(alpha * 100) / 100);
        el.style.zIndex = String(zIdx);
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  // Global cursor proximity
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const d = Math.sqrt((globalMouse.x - cx) ** 2 + (globalMouse.y - cy) ** 2);
    setNearCursor(d < 220);
  }, [globalMouse]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: 310,
        height: 310,
        perspective: 800,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform 0.35s ease",
        transform: nearCursor ? "scale(1.07)" : "scale(1)",
      }}
    >
      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: nearCursor ? 0 : 25,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${group.color}${nearCursor ? "22" : "10"} 0%, transparent 70%)`,
          filter: `blur(${nearCursor ? 24 : 18}px)`,
          transition: "all 0.5s ease",
          pointerEvents: "none",
        }}
      />

      {/* Orbit ring trace — visible ellipse */}
      <div
        style={{
          position: "absolute",
          width: RADIUS_X * 2,
          height: RADIUS_Y * 2,
          top: "50%",
          left: "50%",
          marginLeft: -RADIUS_X,
          marginTop: -RADIUS_Y,
          borderRadius: "50%",
          border: `1px solid ${group.color}28`,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Orbiting skill pills — JS-positioned */}
      {group.skills.map((skill, i) => (
        <div
          key={skill}
          ref={(el) => { pillRefs.current[i] = el; }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginTop: -13,
            marginLeft: -40,
            width: 80,
            textAlign: "center",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              display: "inline-block",
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              color: group.color,
              background: `${group.color}20`,
              border: `1.5px solid ${group.color}50`,
              borderRadius: "999px",
              padding: "0.2rem 0.48rem",
              whiteSpace: "nowrap",
              backdropFilter: "blur(6px)",
              boxShadow: `0 2px 8px ${group.color}25`,
            }}
          >
            {skill}
          </span>
        </div>
      ))}

      {/* Central blob (planet) */}
      <div
        ref={blobRef}
        style={{
          width: 172,
          height: 172,
          borderRadius: "50%",
          background: `radial-gradient(circle at 35% 32%, ${group.color}88, ${group.color}30 55%, transparent 100%)`,
          border: `2px solid ${group.color}65`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          zIndex: 60,
          boxShadow: nearCursor
            ? `0 0 100px ${group.color}75, 0 0 50px ${group.color}50, inset 0 0 50px ${group.color}25`
            : `0 0 55px ${group.color}45, 0 0 25px ${group.color}30, inset 0 0 35px ${group.color}18`,
          transition: "box-shadow 0.5s ease",
          cursor: "default",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 120px ${group.color}85, 0 0 60px ${group.color}55, inset 0 0 60px ${group.color}28`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 55px ${group.color}45, 0 0 25px ${group.color}30, inset 0 0 35px ${group.color}18`;
        }}
      >
        {/* Inner highlight */}
        <div style={{ position: "absolute", top: "14%", left: "16%", width: "42%", height: "36%", borderRadius: "50%", background: "rgba(255,255,255,0.25)", filter: "blur(8px)", pointerEvents: "none" }} />
        <p
          style={{
            fontSize: "0.66rem",
            fontWeight: 800,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
            color: "#ffffff",
            textShadow: `0 1px 8px ${group.color}80`,
            textAlign: "center",
            lineHeight: 1.5,
            whiteSpace: "pre-line",
            userSelect: "none",
            position: "relative",
            zIndex: 1,
          }}
        >
          {group.label}
        </p>
      </div>
    </div>
  );
}

export default function SkillBlobs() {
  const [globalMouse, setGlobalMouse] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => setGlobalMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
        justifyContent: "center",
        paddingTop: "1rem",
        paddingBottom: "2rem",
        paddingLeft: "clamp(0.5rem, 3vw, 2rem)",
        paddingRight: "clamp(0.5rem, 3vw, 2rem)",
      }}
    >
      {BLOB_GROUPS.map((g) => (
        <PlanetBlob key={g.id} group={g} globalMouse={globalMouse} />
      ))}
    </div>
  );
}
