import { Fragment } from "react";
import site from "@/data/site.json";

/** Infinite scrolling ribbon of brand keywords (pure CSS animation). */
export default function Marquee() {
  const items = [...site.marquee, ...site.marquee];
  return (
    <div className="relative z-10 -rotate-1 overflow-hidden border-y border-onlime bg-lime py-4 md:py-5" aria-hidden="true">
      <div className="flex w-max animate-marquee items-center gap-8 md:gap-12">
        {items.map((word, i) => (
          <Fragment key={i}>
            <span className="heading-xl text-3xl text-onlime md:text-5xl">{word}</span>
            <svg width="22" height="22" viewBox="0 0 24 24" className="shrink-0 text-onlime" fill="currentColor">
              <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" />
            </svg>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
