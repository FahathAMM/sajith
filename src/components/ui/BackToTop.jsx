"use client";

import { ArrowUp } from "lucide-react";

export default function BackToTop({ label }) {
  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };
  return (
    <button
      onClick={toTop}
      aria-label={label}
      className="group flex h-14 w-14 shrink-0 items-center justify-center bg-lime text-onlime transition-all duration-300 hover:bg-fg hover:text-ink"
    >
      <ArrowUp size={22} strokeWidth={2.5} className="transition-transform duration-300 group-hover:-translate-y-1" aria-hidden="true" />
    </button>
  );
}
