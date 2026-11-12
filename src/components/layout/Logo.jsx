import site from "@/data/site.json";
import { cn } from "@/lib/utils";

export default function Logo({ className, onClick }) {
  const { brand } = site;
  return (
    <a
      href="#home"
      onClick={onClick}
      aria-label={`${brand.name} – home`}
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span
        aria-hidden="true"
        className="flex h-9 w-9 items-center justify-center bg-lime font-display text-xl text-onlime transition-transform duration-300 group-hover:-rotate-6"
      >
        {brand.logoText.charAt(0)}
      </span>
      <span className="font-display text-2xl uppercase tracking-wide text-fg">
        {brand.logoText}
        <span className="text-accent">{brand.logoAccent}</span>
      </span>
    </a>
  );
}
