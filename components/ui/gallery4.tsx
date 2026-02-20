"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface Gallery4Props {
  items: Gallery4Item[];
}

const Gallery4 = ({ items = [] }: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true, margin: "0px 0px -80px 0px" });

  useEffect(() => {
    if (!carouselApi) return;
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => { carouselApi.off("select", updateSelection); };
  }, [carouselApi]);

  // Mac trackpad two-finger horizontal swipe support
  useEffect(() => {
    const el = wheelRef.current;
    if (!el || !carouselApi) return;
    let acc = 0;
    let timer: ReturnType<typeof setTimeout>;

    const onWheel = (e: WheelEvent) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);
      if (absX < 3 && absY > absX) return;
      e.preventDefault();
      acc += e.deltaX;
      clearTimeout(timer);
      timer = setTimeout(() => { acc = 0; }, 150);
      if (Math.abs(acc) > 40) {
        if (acc > 0) carouselApi.scrollNext();
        else carouselApi.scrollPrev();
        acc = 0;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      clearTimeout(timer);
    };
  }, [carouselApi]);

  return (
    <div style={{ paddingTop: "1rem", paddingBottom: "1.5rem" }}>
      {/* Nav arrows */}
      <div ref={headerRef} style={{ display: "flex", justifyContent: "flex-end", paddingRight: "2rem", marginBottom: "1.5rem" }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: "flex", gap: "0.5rem" }}
        >
          <Button size="icon" variant="ghost" onClick={() => carouselApi?.scrollPrev()} disabled={!canScrollPrev} style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid var(--border)" }}>
            <ArrowLeft style={{ width: 16, height: 16 }} />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => carouselApi?.scrollNext()} disabled={!canScrollNext} style={{ width: 34, height: 34, borderRadius: "50%", border: "1px solid var(--border)" }}>
            <ArrowRight style={{ width: 16, height: 16 }} />
          </Button>
        </motion.div>
      </div>

      <div ref={wheelRef} style={{ width: "100%", paddingLeft: "2rem" }}>
        <Carousel setApi={setCarouselApi} opts={{ dragFree: true, align: "start", loop: true }}>
          <CarouselContent style={{ marginLeft: 0 }}>
            {items.map((item, idx) => (
              <CarouselItem key={item.id} style={{ maxWidth: 340, paddingLeft: 20 }}>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + idx * 0.06, ease: "easeOut" }}
                  whileHover={{ y: -8, scale: 1.03, rotateX: 4, rotateY: -4 }}
                  style={{ perspective: 800, transformStyle: "preserve-3d" }}
                >
                  <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ display: "block", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.18)" }}>
                    <div style={{ position: "relative", width: "100%", minHeight: 360, overflow: "hidden", borderRadius: 12 }}>
                      <img src={item.image} alt={item.title} style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(3,7,18,0) 30%, rgba(3,7,18,0.45) 65%, rgba(3,7,18,0.88) 100%)" }} />
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem", color: "#fff" }}>
                        <div style={{ fontSize: "1rem", fontWeight: 600, letterSpacing: "-0.02em", marginBottom: "0.4rem", lineHeight: 1.3 }}>{item.title}</div>
                        <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden" }}>{item.description}</div>
                        <div style={{ display: "flex", alignItems: "center", marginTop: "0.75rem", fontSize: "0.75rem", color: "rgba(255,255,255,0.85)", fontWeight: 500 }}>
                          View more <ArrowRight style={{ marginLeft: 6, width: 14, height: 14 }} />
                        </div>
                      </div>
                    </div>
                  </a>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div style={{ marginTop: "1.25rem", display: "flex", justifyContent: "center", gap: "0.4rem", paddingRight: "2rem" }}>
          {items.map((_, index) => (
            <button
              key={index}
              style={{ width: index === currentSlide ? 20 : 8, height: 8, borderRadius: 4, border: "none", padding: 0, background: index === currentSlide ? "var(--accent)" : "var(--border)", transition: "all 0.3s ease", cursor: "pointer" }}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export { Gallery4 };
