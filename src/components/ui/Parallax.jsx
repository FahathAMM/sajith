"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/** Moves its children vertically at a different rate than the page scroll. */
export default function Parallax({ offset = 80, className, children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="absolute -inset-y-[120px] inset-x-0">
        {children}
      </motion.div>
    </div>
  );
}
