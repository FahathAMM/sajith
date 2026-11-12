"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/**
 * Counts from 0 to `value` when scrolled into view.
 * Server-renders the final value so there is no layout shift or empty state without JS.
 */
export default function AnimatedCounter({ value, suffix = "", prefix = "", duration = 2, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  // After hydration, reset to 0 if the counter is still off-screen so it can count up.
  useEffect(() => {
    if (reduce || started.current) return;
    const el = ref.current;
    if (el && el.getBoundingClientRect().top > window.innerHeight) setDisplay(0);
  }, [reduce]);

  useEffect(() => {
    if (!inView || started.current || reduce) return;
    started.current = true;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
