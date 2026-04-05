"use client";

// Lenis removed — was intercepting wheel events and locking scroll.
// Native scroll is used. All GSAP ScrollTrigger animations work independently.
export default function LenisProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
