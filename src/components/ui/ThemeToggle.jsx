"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import site from "@/data/site.json";
import { cn, THEME_KEY } from "@/lib/utils";

/**
 * Dark (default) / light theme switch. The initial theme is applied before paint
 * by the inline script in app/layout.js, so this only reads and toggles it.
 */
export default function ThemeToggle({ className }) {
  const { theme: labels } = site;
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "light") document.documentElement.dataset.theme = "light";
    else delete document.documentElement.dataset.theme;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
  };

  const isDark = theme === "dark";
  const label = isDark ? labels.toLight : labels.toDark;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center overflow-hidden border border-fg/15 text-fg transition-colors hover:border-accent hover:text-accent",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 16, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -16, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.25 }}
          className="flex"
        >
          {isDark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
