"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn, EASE } from "@/lib/utils";

/** Accessible single-open accordion (shadcn/ui-style API: items = [{ question, answer }]). */
export default function Accordion({ items, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen);
  const baseId = useId();

  return (
    <div className="border-t border-fg/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={item.question} className="border-b border-fg/10">
            <h3>
              <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-7"
              >
                <span className="flex items-baseline gap-4 md:gap-6">
                  <span className={cn("font-display text-sm transition-colors", isOpen ? "text-accent" : "text-mute")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "text-lg font-semibold transition-colors md:text-xl",
                      isOpen ? "text-fg" : "text-fg/80 group-hover:text-fg"
                    )}
                  >
                    {item.question}
                  </span>
                </span>
                <span
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center border transition-all duration-300",
                    isOpen ? "rotate-45 border-accent bg-lime text-onlime" : "border-fg/15 text-fg group-hover:border-accent group-hover:text-accent"
                  )}
                  aria-hidden="true"
                >
                  <Plus size={18} strokeWidth={2.5} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 pl-9 pr-14 leading-relaxed text-mute md:pl-12">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
