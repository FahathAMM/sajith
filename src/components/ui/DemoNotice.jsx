"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Info, X } from "lucide-react";
import site from "@/data/site.json";

const KEY = "sajith-demo-notice-dismissed";

/** Small dismissible banner flagging the site as demo content. */
export default function DemoNotice() {
  const { demoNotice } = site;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(KEY) === "1";
    } catch {}
    if (dismissed) return;
    const t = setTimeout(() => setVisible(true), 2500);
    return () => clearTimeout(t);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
  };

  if (!demoNotice.enabled) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-4 left-4 right-4 z-40 flex items-start gap-3 border border-fg/10 bg-char/95 p-4 shadow-2xl backdrop-blur-md sm:left-auto sm:max-w-sm"
        >
          <Info size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
          <p className="text-xs leading-relaxed text-fog">{demoNotice.text}</p>
          <button
            onClick={dismiss}
            aria-label={demoNotice.dismissLabel}
            className="-m-1 shrink-0 p-1 text-mute transition-colors hover:text-fg"
          >
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
