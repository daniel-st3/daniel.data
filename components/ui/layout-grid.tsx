"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { cn } from "@/lib/utils";

type Card = {
  id: number;
  colSpan: string;
  href: string;
  image: string;
  icon: React.ReactNode;
  handle: string;
  subtitle: string;
  label: string;
};

const cards: Card[] = [
  {
    id: 1,
    colSpan: "md:col-span-2",
    href: "https://www.linkedin.com/in/daniel-steven-rodriguez-sandoval",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop",
    icon: <Linkedin size={40} strokeWidth={1.5} color="#fff" />,
    handle: "daniel-steven-rodriguez-sandoval",
    subtitle: "Connect professionally",
    label: "LinkedIn",
  },
  {
    id: 2,
    colSpan: "md:col-span-1",
    href: "https://github.com/daniel-st3",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format&fit=crop",
    icon: <Github size={40} strokeWidth={1.5} color="#fff" />,
    handle: "@daniel-st3",
    subtitle: "Explore my projects",
    label: "GitHub",
  },
  {
    id: 3,
    colSpan: "md:col-span-1",
    href: "mailto:danielst.data@gmail.com",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop",
    icon: <Mail size={40} strokeWidth={1.5} color="#fff" />,
    handle: "danielst.data@gmail.com",
    subtitle: "Get in touch",
    label: "Email",
  },
  {
    id: 4,
    colSpan: "md:col-span-2",
    href: "https://wa.me/573144508230",
    image:
      "https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=900&auto=format&fit=crop",
    icon: <SiWhatsapp size={40} color="#fff" />,
    handle: "+57 314 450 8230",
    subtitle: "Message me directly",
    label: "WhatsApp",
  },
];

function SocialCard({ card }: { card: Card }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={card.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "col-span-1",
        card.colSpan,
        "h-52 md:h-64",
        "rounded-2xl overflow-hidden relative cursor-pointer block"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background image */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          backgroundImage: `url(${card.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Warm amber tint — always visible */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(195, 111, 61, 0.15)",
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Dark overlay — deepens on hover */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        style={{ background: "rgba(0, 0, 0, 0.55)" }}
      />

      {/* Label badge — top left, always visible */}
      <div
        className="absolute top-4 left-4"
        style={{
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          borderRadius: "999px",
          padding: "0.2rem 0.65rem",
          border: "1px solid rgba(255,255,255,0.18)",
        }}
      >
        <span
          style={{
            fontSize: "0.65rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.85)",
          }}
        >
          {card.label}
        </span>
      </div>

      {/* Content — revealed on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 14 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.28, delay: 0.04 }}
              style={{
                filter: "drop-shadow(0 2px 12px rgba(0,0,0,0.4))",
              }}
            >
              {card.icon}
            </motion.div>

            <div className="text-center">
              <p
                style={{
                  fontSize: "clamp(0.78rem, 1.5vw, 0.9rem)",
                  fontWeight: 600,
                  color: "#fff",
                  letterSpacing: "-0.01em",
                  textShadow: "0 1px 6px rgba(0,0,0,0.5)",
                  lineHeight: 1.3,
                }}
              >
                {card.handle}
              </p>
              <p
                style={{
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.72)",
                  marginTop: "0.2rem",
                  letterSpacing: "0.02em",
                }}
              >
                {card.subtitle}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Arrow indicator bottom-right */}
      <motion.div
        className="absolute bottom-4 right-4"
        animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 4 }}
        transition={{ duration: 0.25 }}
        style={{
          color: "rgba(255,255,255,0.75)",
          fontSize: "1rem",
          lineHeight: 1,
        }}
      >
        ↗
      </motion.div>
    </a>
  );
}

export function SocialLayoutGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {cards.map((card) => (
        <SocialCard key={card.id} card={card} />
      ))}
    </div>
  );
}

export default SocialLayoutGrid;
