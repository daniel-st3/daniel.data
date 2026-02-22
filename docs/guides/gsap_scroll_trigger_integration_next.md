Below are **drop-in updates** that add GSAP + ScrollTrigger to your existing Next.js + React + Tailwind layout **without redesigning**.

---

## 0) Install
```bash
npm i gsap
```

---

## 1) New helper files

### `lib/useIsomorphicLayoutEffect.ts`
```ts
import { useEffect, useLayoutEffect } from "react";

// Avoid SSR warnings/crashes: layout effect in browser, effect on server.
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
```

### `lib/usePrefersReducedMotion.ts`
```ts
import { useEffect, useState } from "react";

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const onChange = () => setReduced(mq.matches);
    onChange();

    // Safari support
    if (mq.addEventListener) mq.addEventListener("change", onChange);
    else mq.addListener(onChange);

    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", onChange);
      else mq.removeListener(onChange);
    };
  }, []);

  return reduced;
}
```

### `lib/gsap.ts`
```ts
// Next.js-safe: dynamically import GSAP + plugin ONLY on the client.

export async function loadGSAP() {
  const gsapModule: any = await import("gsap");
  const stModule: any = await import("gsap/ScrollTrigger");

  const gsap = gsapModule.gsap ?? gsapModule.default ?? gsapModule;
  const ScrollTrigger =
    stModule.ScrollTrigger ?? stModule.default ?? stModule;

  // Register once
  if (!gsap.core.globals().ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
  }

  return { gsap, ScrollTrigger };
}
```

---

## 2) Updated component files

### `components/Header.tsx`
```tsx
"use client";

import { useRef } from "react";
import { loadGSAP } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export default function Header() {
  // GSAP -> Animate header into view (y: -100% -> 0%)
  const headerRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useIsomorphicLayoutEffect(() => {
    if (reduceMotion) return;
    let ctx: any;
    let alive = true;

    (async () => {
      const { gsap } = await loadGSAP();
      if (!alive || !headerRef.current) return;

      ctx = gsap.context(() => {
        gsap.from(headerRef.current, {
          y: -24,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "transform,opacity",
        });
      }, headerRef.current);
    })();

    return () => {
      alive = false;
      ctx?.revert();
    };
  }, [reduceMotion]);

  const navLinks = [
    { name: "Process", href: "#process" },
    { name: "Work", href: "#work" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-neutral-200/60 bg-white/80 px-6 py-4 backdrop-blur-md md:px-12"
    >
      <div className="flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-neutral-900" />
        <span className="font-semibold tracking-tight text-neutral-900">
          Daniel Rodríguez
        </span>
      </div>

      <nav className="hidden md:block" aria-label="Primary">
        <ul className="flex items-center gap-8 text-sm font-medium text-neutral-500">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="transition-colors hover:text-neutral-900"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-4">
        <a
          href="https://github.com/daniel-st3"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/daniel-steven-rodriguez-sandoval"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-105 active:scale-95"
        >
          LinkedIn
        </a>
      </div>
    </header>
  );
}
```

---

### `components/Hero.tsx`
```tsx
"use client";

import { useRef } from "react";
import { loadGSAP } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export default function Hero() {
  // GSAP -> Stagger reveal text elements (y: 20, opacity: 0)
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useIsomorphicLayoutEffect(() => {
    let ctx: any;
    let alive = true;

    (async () => {
      const { gsap, ScrollTrigger } = await loadGSAP();
      if (!alive || !containerRef.current) return;

      const root = containerRef.current;
      const revealEls = root.querySelectorAll<HTMLElement>(
        "[data-hero-reveal]"
      );
      const headline = root.querySelector<HTMLElement>("[data-hero-headline]");

      ctx = gsap.context(() => {
        if (reduceMotion) {
          gsap.set(revealEls, { clearProps: "all" });
          return;
        }

        gsap.set(revealEls, { autoAlpha: 0, y: 18 });

        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .to(revealEls, {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.08,
            clearProps: "transform,opacity",
          });

        // Subtle parallax on scroll
        if (headline) {
          gsap.to(headline, {
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        // Ensure ScrollTrigger recalculates layout after intro reveal
        ScrollTrigger.refresh();
      }, root);
    })();

    return () => {
      alive = false;
      ctx?.revert();
    };
  }, [reduceMotion]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[90vh] flex-col justify-center px-6 pt-20 md:px-12"
    >
      <div className="mx-auto max-w-5xl">
        {/* Status Pill */}
        <div
          data-hero-reveal
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          Bogotá, Colombia • US & COL Citizen • Open to Remote
        </div>

        {/* Headline */}
        <h1
          data-hero-reveal
          data-hero-headline
          className="text-balance text-5xl font-semibold tracking-tighter text-neutral-900 md:text-7xl lg:text-8xl"
        >
          Business Data Analyst. <br />
          <span className="text-neutral-400">Turning signal into decision.</span>
        </h1>

        <p
          data-hero-reveal
          className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-600"
        >
          I build data products that translate messy signals into usable
          decisions—from NLP pipelines to automation and dashboards. <br className="hidden md:block" />
          No visa sponsorship needed.
        </p>

        {/* CTAs */}
        <div data-hero-reveal className="mt-10 flex flex-wrap gap-4">
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-neutral-900/10 transition-transform hover:-translate-y-0.5 hover:shadow-xl"
          >
            Book a call
          </a>
          <a
            href="#work"
            className="inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white px-8 py-3 text-sm font-medium text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50"
          >
            View projects
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            className="inline-flex items-center justify-center px-4 py-3 text-sm font-medium text-neutral-500 hover:text-neutral-900"
          >
            Download CV
          </a>
        </div>

        {/* Stats / Footer of Hero */}
        <div
          data-hero-reveal
          className="mt-20 grid grid-cols-2 gap-8 border-t border-neutral-200 pt-8 text-sm md:grid-cols-4"
        >
          <div>
            <div className="font-semibold text-neutral-900">Focus</div>
            <div className="text-neutral-500">Data, AI & Strategy</div>
          </div>
          <div>
            <div className="font-semibold text-neutral-900">Stack</div>
            <div className="text-neutral-500">Python, SQL, Tableau</div>
          </div>
          <div>
            <div className="font-semibold text-neutral-900">Languages</div>
            <div className="text-neutral-500">EN, ES, FR, PT</div>
          </div>
          <div>
            <div className="font-semibold text-neutral-900">Experience</div>
            <div className="text-neutral-500">Back Market, Startups</div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

### `components/SignalModelAction.tsx`
```tsx
"use client";

import { useRef } from "react";
import { loadGSAP } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const steps = [
  {
    step: "01",
    title: "Signal",
    subtitle: "Input & Context",
    desc: "I start from how information is perceived in the wild—retail attention, sentiment, and narrative framing. This includes capturing bias signals in financial media or raw user reports.",
    tags: ["Retail Sentiment", "News Bias", "Raw Data"],
  },
  {
    step: "02",
    title: "Model",
    subtitle: "Engine & Logic",
    desc: "I translate context into features: cleaning text, engineering signals, and testing what genuinely improves forecasting or classification. Rigorous evaluation ensures the signal is real.",
    tags: ["Feature Engineering", "NLP", "Validation"],
  },
  {
    step: "03",
    title: "Action",
    subtitle: "Output & Decision",
    desc: "Finally, I ship outputs people can use: forecasts, dashboards, automation, and decision-ready summaries. Data is useless if it doesn't drive a clear business action.",
    tags: ["Forecasts", "Dashboards", "Automation"],
  },
];

export default function SignalModelAction() {
  // GSAP -> ScrollTrigger pin. Pin this section while cards step-change as you scroll.
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useIsomorphicLayoutEffect(() => {
    let ctx: any;
    let alive = true;

    (async () => {
      const { gsap } = await loadGSAP();
      if (!alive || !sectionRef.current) return;

      const root = sectionRef.current;
      const cards = Array.from(
        root.querySelectorAll<HTMLElement>("[data-step-card]")
      );

      ctx = gsap.context(() => {
        if (reduceMotion || cards.length < 2) {
          gsap.set(cards, { clearProps: "all" });
          return;
        }

        const dim = {
          autoAlpha: 0.35,
          y: 28,
          scale: 0.985,
          duration: 0.35,
          ease: "power2.out",
        };
        const focus = {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.35,
          ease: "power2.out",
        };

        gsap.set(cards, dim);
        gsap.set(cards[0], focus);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=220%", // scroll distance while pinned
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Step 1 -> Step 2
        tl.to(cards[0], dim, 1);
        tl.to(cards[1], focus, 1);

        // Step 2 -> Step 3
        tl.to(cards[1], dim, 2);
        tl.to(cards[2], focus, 2);
      }, root);
    })();

    return () => {
      alive = false;
      ctx?.revert();
    };
  }, [reduceMotion]);

  return (
    <section id="process" ref={sectionRef} className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-16 md:mb-24">
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 md:text-5xl">
            Signal <span className="text-neutral-300">→</span> Model{" "}
            <span className="text-neutral-300">→</span> Action
          </h2>
          <p className="mt-4 max-w-xl text-lg text-neutral-500">
            A simple pipeline narrative: capture the signal, structure it into a
            model, and ship something stakeholders can act on.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.step}
              data-step-card
              className="group relative flex flex-col justify-between rounded-2xl border border-neutral-100 bg-neutral-50 p-8 transition-colors hover:border-neutral-200 hover:bg-white hover:shadow-lg hover:shadow-neutral-100/50"
            >
              <div>
                <div className="mb-6 font-mono text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  {s.step} — {s.subtitle}
                </div>
                <h3 className="mb-4 text-2xl font-semibold text-neutral-900">
                  {s.title}
                </h3>
                <p className="leading-relaxed text-neutral-600">{s.desc}</p>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-neutral-100 bg-white px-3 py-1 text-xs font-medium text-neutral-600 shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### `components/Metrics.tsx`
```tsx
"use client";

import { useRef } from "react";
import { loadGSAP } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const metrics = [
  {
    value: "200K+",
    label: "Weekly GMV Monitored",
    desc: "Managed via pricing models at Back Market.",
  },
  {
    value: "99%",
    label: "Recall Achieved",
    desc: "In classifying claims vs opinions for TikTok content.",
  },
  {
    value: "50×",
    label: "Signal Lift",
    desc: "Retail sentiment vs professional news in predicting volatility.",
  },
  {
    value: "8h",
    label: "Saved Per Week",
    desc: "By automating manual reporting workflows into dashboards.",
  },
];

function parseValue(raw: string): { to: number; suffix: string } {
  // Examples: "200K+", "99%", "50×", "8h"
  const match = raw.trim().match(/^([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!match) return { to: 0, suffix: raw };
  return { to: Number(match[1]), suffix: match[2] ?? "" };
}

export default function Metrics() {
  // GSAP -> Counter animation for numbers (0 -> value) on scroll enter.
  const containerRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useIsomorphicLayoutEffect(() => {
    let ctx: any;
    let alive = true;

    (async () => {
      const { gsap, ScrollTrigger } = await loadGSAP();
      if (!alive || !containerRef.current) return;

      const root = containerRef.current;
      const items = Array.from(root.querySelectorAll<HTMLElement>("[data-metric]"));

      ctx = gsap.context(() => {
        if (reduceMotion) {
          // Keep static values for accessibility.
          gsap.set(items, { clearProps: "all" });
          return;
        }

        gsap.set(items, { autoAlpha: 0, y: 16 });

        ScrollTrigger.create({
          trigger: root,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(items, {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.1,
              clearProps: "transform,opacity",
            });

            // Count-up each number
            items.forEach((item) => {
              const valueEl = item.querySelector<HTMLElement>("[data-metric-value]");
              const raw = valueEl?.getAttribute("data-raw") ?? "";
              if (!valueEl || !raw) return;

              const { to, suffix } = parseValue(raw);
              const obj = { val: 0 };

              // Optional: short delay so fade feels synced
              gsap.to(obj, {
                val: to,
                duration: 1.1,
                ease: "power2.out",
                delay: 0.05,
                onStart: () => {
                  // Start from 0 for the animation
                  valueEl.textContent = `0${suffix}`;
                },
                onUpdate: () => {
                  const rounded = Math.round(obj.val);
                  valueEl.textContent = `${rounded}${suffix}`;
                },
                onComplete: () => {
                  valueEl.textContent = `${to}${suffix}`;
                },
              });
            });
          },
        });
      }, root);
    })();

    return () => {
      alive = false;
      ctx?.revert();
    };
  }, [reduceMotion]);

  return (
    <section
      ref={containerRef}
      className="border-y border-neutral-100 bg-neutral-50/50 py-20"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} data-metric className="flex flex-col">
              <span
                data-metric-value
                data-raw={m.value}
                className="text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl"
              >
                {m.value}
              </span>
              <span className="mt-2 text-sm font-semibold uppercase tracking-wider text-neutral-500">
                {m.label}
              </span>
              <p className="mt-2 text-pretty text-sm text-neutral-600">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### `components/Projects.tsx`
```tsx
"use client";

import { useRef } from "react";
import { loadGSAP } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const projects = [
  {
    title: "Predictive NLP Financial Pipeline",
    desc: "End-to-end ML pipeline using NLP to quantify political bias in financial news and retail sentiment.",
    tech: ["Python", "NLP", "Random Forest", "API"],
    link: "https://github.com/daniel-st3",
  },
  {
    title: "TikTok Content Moderation",
    desc: "Classification model separating factual claims from opinions with high recall.",
    tech: ["XGBoost", "Scikit-learn", "EDA"],
    link: "https://github.com/daniel-st3",
  },
  {
    title: "B2B Reconciliation Bot",
    desc: "Automation utility for resolving messy entity names via fuzzy matching and rules, streamlining partner data ingestion.",
    tech: ["n8n", "Fuzzy Matching", "Python"],
    link: "https://github.com/daniel-st3",
  },
  {
    title: "NL2SQL Analytics Agent",
    desc: "Natural-language to SQL workflow allowing stakeholders to query databases in plain English (EN/ES).",
    tech: ["FastAPI", "LLMs", "SQL"],
    link: "https://github.com/daniel-st3",
  },
];

export default function Projects() {
  // GSAP -> Cards reveal with stagger as they enter
  const containerRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useIsomorphicLayoutEffect(() => {
    let ctx: any;
    let alive = true;

    (async () => {
      const { gsap, ScrollTrigger } = await loadGSAP();
      if (!alive || !containerRef.current) return;

      const root = containerRef.current;
      const cards = Array.from(
        root.querySelectorAll<HTMLElement>("[data-project-card]")
      );

      ctx = gsap.context(() => {
        if (reduceMotion) {
          gsap.set(cards, { clearProps: "all" });
          return;
        }

        // Batch reveal
        gsap.set(cards, { autoAlpha: 0, y: 24 });

        ScrollTrigger.batch(cards, {
          start: "top 85%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.12,
              clearProps: "transform,opacity",
              overwrite: true,
            });
          },
        });

        // Optional subtle parallax (desktop only)
        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
          cards.forEach((card) => {
            gsap.to(card, {
              y: -10,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });
          });

          return () => mm.revert();
        });
      }, root);
    })();

    return () => {
      alive = false;
      ctx?.revert();
    };
  }, [reduceMotion]);

  return (
    <section
      id="work"
      ref={containerRef}
      className="bg-neutral-900 py-24 text-white md:py-32"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="mb-16 flex items-end justify-between">
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Selected Work
          </h2>
          <a
            href="https://github.com/daniel-st3"
            target="_blank"
            rel="noreferrer"
            className="hidden text-sm text-neutral-400 hover:text-white md:block"
          >
            View all on GitHub →
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <div
              key={p.title}
              data-project-card
              className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-8 transition-all hover:bg-white/10"
            >
              <div>
                <h3 className="text-xl font-semibold text-white group-hover:text-blue-200">
                  {p.title}
                </h3>
                <p className="mt-4 leading-relaxed text-neutral-400">{p.desc}</p>
              </div>
              <div className="mt-8">
                <div className="mb-6 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-white/10 px-3 py-1 text-xs text-neutral-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center text-sm font-medium text-white decoration-neutral-500 underline-offset-4 hover:underline"
                >
                  View Code ↗
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <a
            href="https://github.com/daniel-st3"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-neutral-400 hover:text-white"
          >
            View all on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}
```

---

### (Optional but included) `components/Experience.tsx`
```tsx
"use client";

import { useRef } from "react";
import { loadGSAP } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export default function Experience() {
  // GSAP -> Fade in items sequentially from bottom.
  const containerRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useIsomorphicLayoutEffect(() => {
    let ctx: any;
    let alive = true;

    (async () => {
      const { gsap } = await loadGSAP();
      if (!alive || !containerRef.current) return;

      const root = containerRef.current;
      const items = Array.from(root.querySelectorAll<HTMLElement>("[data-exp-item]"));

      ctx = gsap.context(() => {
        if (reduceMotion) {
          gsap.set(items, { clearProps: "all" });
          return;
        }

        gsap.from(items, {
          autoAlpha: 0,
          y: 18,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: root,
            start: "top 80%",
            once: true,
          },
          clearProps: "transform,opacity",
        });
      }, root);
    })();

    return () => {
      alive = false;
      ctx?.revert();
    };
  }, [reduceMotion]);

  return (
    <section id="experience" ref={containerRef} className="py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        <div className="mb-16">
          <h2 className="text-3xl font-semibold text-neutral-900">
            Experience & Education
          </h2>
        </div>

        <div className="space-y-12">
          <div data-exp-item className="group relative border-l-2 border-neutral-200 pl-8 transition-colors hover:border-neutral-900">
            <span className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-white bg-neutral-200 transition-colors group-hover:bg-neutral-900" />
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-xl font-semibold text-neutral-900">
                Strategic Partnerships Intern (B2B)
              </h3>
              <span className="font-mono text-sm text-neutral-500">Back Market • Paris</span>
            </div>
            <p className="mt-1 text-sm text-neutral-500">Jul 2025 – Dec 2025</p>
            <ul className="mt-4 list-disc space-y-2 pl-4 text-neutral-600">
              <li>Built SQL-based pricing models managing €200K+ weekly GMV.</li>
              <li>Automated dashboards, saving ~8 hours/week of manual reporting.</li>
              <li>Coordinated technical integration of partners across time zones.</li>
            </ul>
          </div>

          <div data-exp-item className="group relative border-l-2 border-neutral-200 pl-8 transition-colors hover:border-neutral-900">
            <span className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-white bg-neutral-200 transition-colors group-hover:bg-neutral-900" />
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-xl font-semibold text-neutral-900">
                MSc Data Analytics for Business
              </h3>
              <span className="font-mono text-sm text-neutral-500">KEDGE BS • Bordeaux</span>
            </div>
            <p className="mt-1 text-sm text-neutral-500">2024 – 2026</p>
            <p className="mt-4 text-neutral-600">
              <span className="font-medium text-neutral-900">Thesis:</span> AI-Driven Analysis of Political Bias in Financial Media.
            </p>
          </div>

          <div data-exp-item className="group relative border-l-2 border-neutral-200 pl-8 transition-colors hover:border-neutral-900">
            <span className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-white bg-neutral-200 transition-colors group-hover:bg-neutral-900" />
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
              <h3 className="text-xl font-semibold text-neutral-900">
                Dual Bachelor’s in Business & Int. Business
              </h3>
              <span className="font-mono text-sm text-neutral-500">Univ. de La Sabana • Colombia</span>
            </div>
            <p className="mt-1 text-sm text-neutral-500">Graduating 2026</p>
            <p className="mt-4 text-neutral-600">
              Top 1% of cohort. Focus on business strategy, markets, and decision-making.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

### (Optional but included) `components/Capabilities.tsx`
```tsx
"use client";

import { useRef } from "react";
import { loadGSAP } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

const skills = [
  {
    category: "Data & Analytics",
    items: ["SQL", "Python (Pandas, NumPy)", "Tableau", "Power BI", "Excel"],
  },
  {
    category: "ML & NLP",
    items: ["Scikit-learn", "XGBoost", "TensorFlow", "BERT", "Sentiment Analysis"],
  },
  {
    category: "GenAI & Automation",
    items: ["OpenAI API", "Claude", "n8n", "Make", "Vertex AI"],
  },
  {
    category: "Cloud & Infra",
    items: ["GCP (BigQuery)", "ETL Pipelines", "Git / GitHub"],
  },
  {
    category: "Business",
    items: ["B2B Partnerships", "Pricing Strategy", "Stakeholder Management", "Jira"],
  },
];

export default function Capabilities() {
  // GSAP -> Stagger reveal of categories.
  const containerRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useIsomorphicLayoutEffect(() => {
    let ctx: any;
    let alive = true;

    (async () => {
      const { gsap } = await loadGSAP();
      if (!alive || !containerRef.current) return;

      const root = containerRef.current;
      const groups = Array.from(root.querySelectorAll<HTMLElement>("[data-skill-group]"));

      ctx = gsap.context(() => {
        if (reduceMotion) {
          gsap.set(groups, { clearProps: "all" });
          return;
        }

        gsap.from(groups, {
          autoAlpha: 0,
          y: 18,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: root,
            start: "top 80%",
            once: true,
          },
          clearProps: "transform,opacity",
        });
      }, root);
    })();

    return () => {
      alive = false;
      ctx?.revert();
    };
  }, [reduceMotion]);

  return (
    <section ref={containerRef} className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <h2 className="mb-16 text-3xl font-semibold text-neutral-900">Capabilities</h2>

        <div className="grid gap-12 sm:grid-cols-2 md:grid-cols-3">
          {skills.map((s) => (
            <div key={s.category} data-skill-group>
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-neutral-400">
                {s.category}
              </h3>
              <ul className="space-y-2">
                {s.items.map((item) => (
                  <li key={item} className="text-lg font-medium text-neutral-900">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### (Optional but included) `components/BusinessInquiries.tsx`
```tsx
"use client";

import { useRef } from "react";
import { loadGSAP } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

export default function BusinessInquiries() {
  // GSAP -> Scale up background container on scroll.
  const containerRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useIsomorphicLayoutEffect(() => {
    let ctx: any;
    let alive = true;

    (async () => {
      const { gsap } = await loadGSAP();
      if (!alive || !containerRef.current) return;

      const root = containerRef.current;
      const card = root.querySelector<HTMLElement>("[data-contact-card]");

      ctx = gsap.context(() => {
        if (reduceMotion || !card) {
          if (card) gsap.set(card, { clearProps: "all" });
          return;
        }

        gsap.from(card, {
          autoAlpha: 0,
          y: 18,
          scale: 0.985,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: root,
            start: "top 80%",
            once: true,
          },
          clearProps: "transform,opacity",
        });
      }, root);
    })();

    return () => {
      alive = false;
      ctx?.revert();
    };
  }, [reduceMotion]);

  return (
    <section id="contact" ref={containerRef} className="px-6 py-24 md:px-12 md:py-32">
      <div
        data-contact-card
        className="mx-auto max-w-6xl rounded-[3rem] bg-neutral-100 px-6 py-20 text-center md:px-20 md:py-24"
      >
        <h2 className="mx-auto max-w-2xl text-3xl font-semibold text-neutral-900 md:text-5xl">
          Ready to turn signal into action?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-600">
          Whether it’s BI dashboards, n8n automations, or AI-integrated workflows—I can help you build it.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="CALENDAR_20MIN_URL"
            className="w-full rounded-full bg-neutral-900 px-8 py-4 font-semibold text-white shadow-xl transition-transform hover:-translate-y-1 sm:w-auto"
          >
            Book 20-min Intro
          </a>
          <a
            href="CALENDAR_40MIN_URL"
            className="w-full rounded-full border border-neutral-300 bg-white px-8 py-4 font-semibold text-neutral-900 transition-colors hover:bg-neutral-50 sm:w-auto"
          >
            Deep Dive (40m)
          </a>
        </div>

        <p className="mt-8 text-sm text-neutral-400">Open to remote analytics & AI roles.</p>
      </div>
    </section>
  );
}
```

---

## 3) Notes: tweaking timing, easing, and scroll start/end

You’ll most often tweak these:

- **Durations**: `duration: 0.7–1.1` is your “premium” range for fades/reveals.
- **Easings**:
  - `power3.out` = cinematic reveal
  - `power2.out` = snappier UI feel
  - `none` = parallax/scrub (no easing)
- **ScrollTrigger positions**:
  - Reveal triggers usually feel right at `start: "top 80%"` or `"top 85%"`.
  - Pinned sections: adjust `end: "+=220%"` (more = slower/more dramatic).
  - Parallax: adjust `start/end` pairs (`"top bottom"` → `"bottom top"`) for full-range scrub.

Reduced motion behavior is centralized via `usePrefersReducedMotion()`: animations are skipped and content remains fully visible.

