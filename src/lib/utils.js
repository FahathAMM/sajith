import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind class names safely (shadcn/ui convention). */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/** Replace {placeholders} in a JSON string with values. */
export function format(template, values = {}) {
  return String(template).replace(/\{(\w+)\}/g, (_, key) =>
    values[key] !== undefined ? values[key] : `{${key}}`
  );
}

/** Build a WhatsApp click-to-chat URL. */
export function whatsappUrl(number, message = "") {
  const text = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${number}${text}`;
}

/** True for links that should open in a new tab. */
export function isExternal(href = "") {
  return /^https?:\/\//.test(href);
}

/** Shared easing curve for all motion. */
export const EASE = [0.22, 1, 0.36, 1];

/** localStorage key for the visitor's chosen colour theme. */
export const THEME_KEY = "sajith-theme";
