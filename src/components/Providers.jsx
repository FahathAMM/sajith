"use client";

import { MotionConfig } from "framer-motion";

/** Global motion settings: honours the user's prefers-reduced-motion setting. */
export default function Providers({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
