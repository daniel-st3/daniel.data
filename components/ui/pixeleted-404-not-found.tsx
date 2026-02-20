"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Error404Props {
  postcardImage?: string;
  postcardAlt?: string;
  curvedTextTop?: string;
  curvedTextBottom?: string;
  heading?: string;
  subtext?: string;
  backButtonLabel?: string;
  backButtonHref?: string;
}

export function Error404({
  postcardImage = "/placeholder.jpg",
  postcardAlt = "Postcard",
  curvedTextTop = "Daniel Rodriguez",
  curvedTextBottom = "Data · AI · Analytics",
  heading = "(404) Looks like the page you're looking for got lost somewhere.",
  subtext = "But hey — even unexpected detours lead somewhere interesting.",
  backButtonLabel = "Back to Home",
  backButtonHref = "/",
}: Error404Props) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      <div className="flex flex-col items-center">
        {/* Postcard with spinning text ring */}
        <div className="relative mb-16">
          <svg
            className="absolute -top-16 -left-12 w-[140px] h-[140px] pointer-events-none z-20"
            viewBox="0 0 140 140"
            style={{ animation: "spin-slow 20s linear infinite" }}
          >
            <defs>
              <path
                id="circlePath"
                d="M 70,70 m -50,0 a 50,50 0 1,1 100,0 a 50,50 0 1,1 -100,0"
                fill="transparent"
              />
            </defs>
            <text
              className="text-[11px] font-serif uppercase"
              style={{ fontWeight: 400, letterSpacing: "0.15em", fill: "var(--fg)" }}
            >
              <textPath href="#circlePath" startOffset="0%">
                {curvedTextTop} • {curvedTextBottom} •
              </textPath>
            </text>
          </svg>

          <div className="relative z-10">
            <div
              className="relative p-3 shadow-2xl hover:rotate-0 transition-transform duration-300 bg-white"
              style={{ transform: "rotate(4deg)" }}
            >
              <div className="relative overflow-hidden bg-white">
                <img
                  src={postcardImage}
                  alt={postcardAlt}
                  className="w-[360px] h-[220px] object-cover"
                  onError={(e) => {
                    // Fallback: show a gradient placeholder
                    const el = e.currentTarget as HTMLImageElement;
                    el.style.display = "none";
                    const parent = el.parentElement!;
                    parent.style.width = "360px";
                    parent.style.height = "220px";
                    parent.style.background =
                      "linear-gradient(135deg, #1a2a4a 0%, #4A6FA5 50%, #7096C8 100%)";
                  }}
                />
              </div>
            </div>

            {/* Postal cancellation marks */}
            <svg
              className="absolute -right-16 top-1/2 -translate-y-1/2 w-28 h-20"
              viewBox="0 0 100 60"
            >
              {[15, 25, 35].map((y, i) => (
                <path
                  key={i}
                  d={`M 10 ${y} Q 20 ${y - 5} 30 ${y} Q 40 ${y + 5} 50 ${y} Q 60 ${y - 5} 70 ${y} Q 80 ${y + 5} 90 ${y}`}
                  stroke="#888"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.6"
                />
              ))}
            </svg>
          </div>
        </div>

        {/* Text content */}
        <div className="text-center max-w-2xl">
          <h1
            style={{
              fontFamily: "'Doto', monospace",
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              fontWeight: 700,
              marginBottom: "1.5rem",
              lineHeight: 1.2,
              color: "var(--fg)",
              letterSpacing: "-0.02em",
            }}
          >
            {heading}
          </h1>
          <p
            style={{
              color: "var(--fg-muted)",
              fontSize: "1rem",
              marginBottom: "2.5rem",
              lineHeight: 1.7,
            }}
          >
            {subtext}
          </p>
          <Button asChild style={{ background: "var(--accent)", borderRadius: "6px" }}>
            <Link href={backButtonHref} className="flex items-center gap-2 px-6 py-3">
              {backButtonLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
