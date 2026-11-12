"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/utils";

const OFFSETS = {
  up: { y: 40 },
  down: { y: -40 },
  left: { x: 40 },
  right: { x: -40 },
  none: {},
};

/** Scroll-triggered fade/slide reveal. */
export function Reveal({
  as = "div",
  direction = "up",
  delay = 0,
  duration = 0.8,
  amount = 0.2,
  className,
  children,
  ...props
}) {
  const Component = motion[as] || motion.div;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, ...OFFSETS[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: EASE }}
      {...props}
    >
      {children}
    </Component>
  );
}

/** Parent that staggers its <StaggerItem> children when scrolled into view. */
export function Stagger({ as = "div", stagger = 0.1, delay = 0, amount = 0.15, className, children, ...props }) {
  const Component = motion[as] || motion.div;
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...props}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({ as = "div", className, children, ...props }) {
  const Component = motion[as] || motion.div;
  return (
    <Component
      className={className}
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * Image reveal: a curtain wipes away to uncover the content.
 * The clip-path lives on an inner layer because a fully clipped element never
 * registers as intersecting, so the outer box is what gets observed.
 */
export function ImageReveal({ className, children, delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.div
        className="absolute inset-0"
        variants={{
          hidden: { clipPath: "inset(100% 0% 0% 0%)" },
          show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.1, delay, ease: EASE } },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
