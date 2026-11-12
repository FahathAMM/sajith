"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import { ChevronsLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Accessible before/after comparison slider.
 * Drag with mouse/touch, or focus the handle and use arrow keys.
 */
export default function BeforeAfterSlider({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
  ariaLabel = "Compare before and after",
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  className,
}) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e) => {
    if (dragging.current) updateFromClientX(e.clientX);
  };
  const onPointerUp = (e) => {
    dragging.current = false;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };

  const onKeyDown = (e) => {
    const step = e.shiftKey ? 10 : 2;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") setPos((p) => Math.max(0, p - step));
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") setPos((p) => Math.min(100, p + step));
    else if (e.key === "Home") setPos(0);
    else if (e.key === "End") setPos(100);
    else return;
    e.preventDefault();
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-[4/5] w-full touch-pan-y select-none overflow-hidden bg-char",
        className
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{ cursor: "ew-resize" }}
    >
      {/* After (base layer) */}
      <Image src={after.src} alt={after.alt} fill sizes={sizes} className="pointer-events-none object-cover" draggable={false} />

      {/* Before (clipped layer) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        aria-hidden="false"
      >
        <Image
          src={before.src}
          alt={before.alt}
          fill
          sizes={sizes}
          className="pointer-events-none object-cover grayscale contrast-[0.9] brightness-[0.85]"
          draggable={false}
        />
      </div>

      {/* Labels */}
      <span className="pointer-events-none absolute left-3 top-3 bg-ink/80 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-fg backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 bg-lime px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-onlime">
        {afterLabel}
      </span>

      {/* Divider + handle */}
      <div
        className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-lime"
        style={{ left: `${pos}%` }}
      />
      <div
        role="slider"
        tabIndex={0}
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)}% ${beforeLabel}`}
        onKeyDown={onKeyDown}
        className="absolute top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-lime text-onlime shadow-[0_0_0_6px_rgba(198,255,0,0.2)] transition-transform hover:scale-110"
        style={{ left: `${pos}%` }}
      >
        <ChevronsLeftRight size={20} strokeWidth={2.5} aria-hidden="true" />
      </div>
    </div>
  );
}
