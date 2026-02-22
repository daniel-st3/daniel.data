"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { loadGSAP } from "@/lib/gsap";

import GrainOverlay from "@/components/ui/backgrounds/GrainOverlay";
import MouseTrail from "@/components/ui/effects/MouseTrail";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import WorkingNow from "@/components/sections/WorkingNow";
import ThesisDownloads from "@/components/sections/ThesisDownloads";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

// Client-only Three.js canvas — no SSR
const StarfieldCanvas = dynamic(
  () => import("@/components/ui/backgrounds/StarfieldCanvas"),
  { ssr: false }
);

const FloatingCTA = dynamic(
  () => import("@/components/ui/effects/FloatingCTA"),
  { ssr: false }
);

function GSAPRefresher() {
  useEffect(() => {
    const timer = setTimeout(async () => {
      const { ScrollTrigger } = await loadGSAP();
      ScrollTrigger.refresh();
    }, 600);
    return () => clearTimeout(timer);
  }, []);
  return null;
}

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "transparent",
        color: "var(--fg)",
        position: "relative",
      }}
    >
      {/* Three.js full-page starfield background */}
      <StarfieldCanvas />

      {/* Global ambient effects */}
      <GrainOverlay />
      <MouseTrail />
      <FloatingCTA />

      {/* GSAP refresh */}
      <GSAPRefresher />

      {/* Layout */}
      <Header />

      <div style={{ position: "relative", zIndex: 1, overflow: "visible" }}>
        {/* Hero: transparent — starfield + wave visible */}
        <Hero />

        {/* Content sections: solid background over starfield */}
        <div style={{
          background: "var(--bg)",
          position: "relative",
        }}>
          <About />
          <Projects />
          <WorkingNow />
          <ThesisDownloads />
          <Experience />
          <Skills />
          <Contact />
          <Footer />
        </div>
      </div>
    </main>
  );
}
