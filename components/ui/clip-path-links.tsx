"use client";

import React from "react";
import { Github, Linkedin, Instagram, Mail } from "lucide-react";
import { SiX, SiWhatsapp } from "react-icons/si";
import { useAnimate } from "framer-motion";

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES: Record<string, string[]> = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES: Record<string, string[]> = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

export const ClipPathLinks = () => {
  return (
    <div className="divide-y divide-border border border-border">
      {/* Row 1: 2 cols */}
      <div className="grid grid-cols-2 divide-x divide-border">
        <LinkBox
          Icon={Mail}
          href="mailto:danielst.data@gmail.com"
          label="danielst.data@gmail.com"
        />
        <LinkBox
          Icon={Github}
          href="https://github.com/daniel-st3"
          label="@daniel-st3"
        />
      </div>
      {/* Row 2: 4 cols */}
      <div className="grid grid-cols-4 divide-x divide-border">
        <LinkBox
          Icon={SiX}
          href="https://x.com/danielst_31"
          label="@danielst_31"
        />
        <LinkBox
          Icon={Linkedin}
          href="https://www.linkedin.com/in/daniel-steven-rodriguez-sandoval/"
          label="LinkedIn"
        />
        <LinkBox
          Icon={Instagram}
          href="https://www.instagram.com/daniel.st____/"
          label="@daniel.st____"
        />
        <LinkBox
          Icon={SiWhatsapp}
          href="https://wa.me/573144508230"
          label="+57 314 450 8230"
        />
      </div>
    </div>
  );
};

interface LinkBoxProps {
  Icon: React.ComponentType<{ className?: string }>;
  href: string;
  label?: string;
}

const LinkBox = ({ Icon, href, label }: LinkBoxProps) => {
  const [scope, animate] = useAnimate();

  const getNearestSide = (e: React.MouseEvent) => {
    const box = (e.target as HTMLElement).getBoundingClientRect();
    const sides = [
      { proximity: Math.abs(box.left - e.clientX), side: "left" },
      { proximity: Math.abs(box.right - e.clientX), side: "right" },
      { proximity: Math.abs(box.top - e.clientY), side: "top" },
      { proximity: Math.abs(box.bottom - e.clientY), side: "bottom" },
    ].sort((a, b) => a.proximity - b.proximity);
    return sides[0].side;
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    const side = getNearestSide(e);
    animate(scope.current, { clipPath: ENTRANCE_KEYFRAMES[side] });
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    const side = getNearestSide(e);
    animate(scope.current, { clipPath: EXIT_KEYFRAMES[side] });
  };

  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative grid h-20 w-full place-content-center sm:h-28 md:h-36 text-foreground bg-background"
    >
      <div className="flex flex-col items-center gap-1.5">
        <Icon className="text-xl sm:text-3xl md:text-4xl" />
        {label && (
          <span className="text-[0.6rem] text-muted-foreground hidden md:block tracking-wide">{label}</span>
        )}
      </div>
      <div
        ref={scope}
        style={{ clipPath: BOTTOM_RIGHT_CLIP }}
        className="absolute inset-0 grid place-content-center bg-primary text-primary-foreground"
      >
        <div className="flex flex-col items-center gap-1.5">
          <Icon className="text-xl sm:text-3xl md:text-4xl" />
          {label && (
            <span className="text-[0.6rem] hidden md:block tracking-wide">{label}</span>
          )}
        </div>
      </div>
    </a>
  );
};
