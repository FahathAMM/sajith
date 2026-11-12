"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import hero from "@/data/hero.json";
import { cn, EASE } from "@/lib/utils";

const GRADE = "saturate-[0.82] contrast-[1.12] brightness-[0.88]";

/** Corner bracket accent used around the photo frame. */
function Corner({ className }) {
  return <span aria-hidden="true" className={cn("absolute h-7 w-7 border-accent", className)} />;
}

/**
 * Hero photography: an auto-rotating, colour-graded gallery.
 * Mobile: fills the hero as a background. Desktop (lg+): a framed portrait panel
 * with floating badges and thumbnail controls.
 */
export default function HeroGallery() {
  const { images, slideInterval, nameplate, experienceBadge, badge, showPhotoLabel } = hero;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce || images.length < 2) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % images.length), slideInterval);
    return () => clearTimeout(t);
  }, [index, paused, reduce, images.length, slideInterval]);

  const active = images[index];

  return (
    <motion.div
      className="relative h-full w-full lg:ml-auto lg:h-auto lg:w-[min(100%,calc((100svh-13rem)*0.8))]"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.2, delay: 0.3, ease: EASE }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Desktop-only frame decoration */}
      <div aria-hidden="true" className="absolute -inset-12 -z-10 hidden rounded-full bg-lime/[0.12] blur-[90px] lg:block" />
      <div aria-hidden="true" className="absolute -right-4 -top-4 hidden h-full w-full border border-accent/30 lg:block xl:-right-5 xl:-top-5" />
      <div
        aria-hidden="true"
        className="absolute -bottom-4 -left-4 hidden h-1/2 w-1/2 [background-image:radial-gradient(rgba(198,255,0,0.35)_1px,transparent_1px)] [background-size:12px_12px] lg:block"
      />

      {/* Photo frame */}
      <div className="relative h-full w-full overflow-hidden bg-char lg:aspect-[4/5] lg:h-auto">
        {images.map((img, i) => (
          <motion.div
            key={img.src}
            className="absolute inset-0"
            initial={false}
            animate={{ opacity: i === index ? 1 : 0, scale: i === index ? 1 : 1.08 }}
            transition={{ opacity: { duration: 1.1, ease: "easeInOut" }, scale: { duration: slideInterval / 1000 + 1.5, ease: "linear" } }}
            aria-hidden={i !== index}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              preload={i === 0}
              fetchPriority={i === 0 ? "high" : "auto"}
              sizes="(min-width: 1280px) 520px, (min-width: 1024px) 40vw, 100vw"
              className={cn("object-cover", GRADE)}
              style={{ objectPosition: img.position }}
            />
          </motion.div>
        ))}

        {/* Colour grade: cool shadows, lime tint, vignette */}
        <div aria-hidden="true" className="absolute inset-0 bg-ink/25 mix-blend-multiply" />
        <div aria-hidden="true" className="absolute inset-0 bg-lime/[0.07] mix-blend-overlay" />
        <div aria-hidden="true" className="absolute inset-0 [background:radial-gradient(ellipse_at_50%_35%,transparent_35%,rgba(8,8,8,0.75)_100%)]" />

        {/* Mobile: top fade keeps the navbar legible over the photo */}
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink/85 to-transparent lg:hidden" />
        {/* Mobile: heavy gradient so copy stays readable */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink from-10% via-ink/70 via-45% to-ink/10 lg:hidden" />
        {/* Desktop: soft bottom fade for caption */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 hidden h-2/5 bg-gradient-to-t from-ink/95 to-transparent lg:block" />

        {/* Caption + progress (desktop) */}
        <div className="absolute inset-x-0 bottom-0 hidden items-end justify-between gap-4 p-6 lg:flex">
          <div className="min-w-0">
            <p className="font-display text-sm text-accent">
              {String(index + 1).padStart(2, "0")}
              <span className="text-fg/40"> / {String(images.length).padStart(2, "0")}</span>
            </p>
            <motion.p
              key={active.caption}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="font-display text-4xl uppercase leading-none text-fg"
            >
              {active.caption}
            </motion.p>
          </div>

          <div className="flex gap-2" role="group" aria-label={showPhotoLabel}>
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${showPhotoLabel} ${i + 1}`}
                aria-pressed={i === index}
                className={cn(
                  "relative h-14 w-12 overflow-hidden border-2 transition-all duration-300",
                  i === index ? "border-accent" : "border-fg/15 opacity-60 hover:opacity-100"
                )}
              >
                <Image src={img.src} alt="" fill sizes="48px" className={cn("object-cover", GRADE)} style={{ objectPosition: img.position }} />
              </button>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 hidden h-[3px] bg-fg/10 lg:block">
          <motion.div
            key={`${index}-${paused}`}
            className="h-full origin-left bg-lime"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: paused || reduce ? 0 : 1 }}
            transition={{ duration: slideInterval / 1000, ease: "linear" }}
          />
        </div>
      </div>

      {/* Corners */}
      <Corner className="-left-3 -top-3 hidden border-l-2 border-t-2 lg:block" />
      <Corner className="-bottom-3 -right-3 hidden border-b-2 border-r-2 lg:block" />

      {/* Vertical nameplate */}
      <p
        aria-hidden="true"
        className="absolute -right-10 top-0 hidden text-[0.62rem] font-semibold uppercase tracking-[0.4em] text-mute [writing-mode:vertical-rl] xl:block"
      >
        <span className="text-fg">{nameplate.name}</span>
        <span className="mx-3 text-accent">—</span>
        {nameplate.title}
      </p>

      {/* Floating experience badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: EASE }}
        className="absolute -left-8 top-10 hidden items-center gap-3 bg-lime px-5 py-4 text-onlime shadow-[0_20px_60px_-15px_rgba(198,255,0,0.55)] lg:flex xl:-left-12"
      >
        <span className="font-display text-5xl leading-none">{experienceBadge.value}</span>
        <span className="max-w-[5rem] text-[0.62rem] font-bold uppercase leading-tight tracking-[0.15em]">
          {experienceBadge.label}
        </span>
      </motion.div>

      {/* Floating availability card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4, ease: EASE }}
        className="absolute -left-10 bottom-28 hidden items-center gap-3 border border-fg/10 bg-ink/70 p-3 pr-5 shadow-2xl backdrop-blur-xl lg:flex xl:-left-16"
      >
        <span className="relative flex h-10 w-10 items-center justify-center border border-accent/40 bg-lime/10">
          <span className="absolute h-2.5 w-2.5 animate-ping rounded-full bg-lime/70" />
          <span className="relative h-2.5 w-2.5 rounded-full bg-lime" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-fg">{badge.title}</p>
          <p className="text-[0.7rem] text-mute">{badge.subtitle}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
