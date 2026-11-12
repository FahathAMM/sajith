"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import hero from "@/data/hero.json";
import Button from "@/components/ui/Button";
import HeroGallery from "@/components/ui/HeroGallery";
import { EASE } from "@/lib/utils";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
});

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const galleryY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      aria-label="Introduction"
      className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink"
    >
      {/* Ambient background */}
      <div aria-hidden="true" className="grid-lines absolute inset-0 -z-30 opacity-60" />
      <div aria-hidden="true" className="absolute -left-48 top-1/4 -z-30 h-[34rem] w-[34rem] rounded-full bg-lime/10 blur-[150px]" />
      <div aria-hidden="true" className="absolute -right-24 -top-24 -z-30 hidden h-[40rem] w-[40rem] rounded-full bg-lime/[0.07] blur-[160px] lg:block" />

      {/* Decorative background typography */}
      <motion.p
        aria-hidden="true"
        style={{ y: textY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.6 }}
        className="heading-xl text-outline pointer-events-none absolute -bottom-[0.1em] left-0 -z-20 hidden select-none whitespace-nowrap text-[24vw] leading-none lg:block"
      >
        {hero.backgroundText}
      </motion.p>

      <div className="container-x flex flex-1 flex-col pb-10 pt-[46svh] md:pb-14 md:pt-[50svh] lg:grid lg:grid-cols-12 lg:items-center lg:gap-8 lg:pb-16 lg:pt-32 xl:gap-14">
        {/* Photography: full-bleed background on mobile, framed gallery on desktop */}
        <motion.div
          style={{ y: galleryY }}
          className="absolute inset-x-0 top-0 -z-10 h-[85svh] lg:h-auto lg:relative lg:inset-auto lg:z-0 lg:order-2 lg:col-span-5 lg:mt-4 lg:self-start"
        >
          <HeroGallery />
        </motion.div>

        {/* Copy */}
        <motion.div
          style={{ opacity: contentOpacity }}
          className="relative z-10 mt-auto lg:order-1 lg:col-span-7 lg:mt-0"
        >
          <motion.p
            {...fadeUp(0.3)}
            className="mb-6 inline-flex items-center gap-3 border border-accent/30 bg-lime/[0.06] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-accent backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
            </span>
            {hero.label}
          </motion.p>

          <h1 className="heading-xl text-[clamp(3.6rem,12vw,6rem)] text-fg lg:text-[clamp(4rem,min(8.6vw,15svh),8.75rem)]">
            {hero.headingLines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.04em]">
                <motion.span
                  className={i === hero.accentLineIndex ? "block text-accent" : "block"}
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.45 + i * 0.12, ease: EASE }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            {...fadeUp(0.9)}
            className="mt-7 max-w-lg text-base leading-relaxed text-fog/85 md:text-lg"
          >
            {hero.description}
          </motion.p>

          <motion.div {...fadeUp(1.05)} className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Button href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} size="lg" variant="outline">
              {hero.secondaryCta.label}
            </Button>
          </motion.div>

          <motion.div {...fadeUp(1.25)} className="mt-12 max-w-xl lg:mt-16">
            <dl className="grid grid-cols-3 border-t border-fg/10">
              {hero.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`flex flex-col ${i > 0 ? "border-l border-fg/10 pl-4 pt-5 sm:pl-6" : "pr-4 pt-5 sm:pr-6"}`}
                >
                  <dt className="order-2 mt-1 text-[0.62rem] uppercase tracking-[0.18em] text-mute sm:text-[0.68rem]">
                    {stat.label}
                  </dt>
                  <dd className="order-1 font-display text-4xl text-fg md:text-5xl">
                    {stat.value.replace(/[^0-9]/g, "")}
                    <span className="text-accent">{stat.value.replace(/[0-9]/g, "")}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-[0.62rem] uppercase tracking-[0.2em] text-mute/60">{hero.statsNote}</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label={hero.scrollLabel}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-mute transition-colors hover:text-accent md:flex lg:left-[58%]"
      >
        <span className="relative flex h-10 w-6 justify-center rounded-full border border-current pt-2">
          <span className="h-2 w-0.5 animate-scroll-dot rounded-full bg-lime" />
        </span>
      </motion.a>
    </section>
  );
}
