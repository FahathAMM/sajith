import { ArrowUpRight } from "lucide-react";
import { cn, isExternal } from "@/lib/utils";

const VARIANTS = {
  primary:
    "bg-lime text-onlime hover:bg-fg hover:text-ink hover:shadow-[0_10px_40px_-10px_rgba(198,255,0,0.6)]",
  outline:
    "border border-fg/20 text-fg hover:border-accent hover:text-accent bg-fg/[0.02] backdrop-blur-sm",
  ghost: "text-fg hover:text-accent px-0",
};

const SIZES = {
  sm: "h-10 px-5 text-[0.7rem]",
  md: "h-12 px-6 text-xs",
  lg: "h-14 px-8 text-xs sm:text-[0.8rem]",
};

/**
 * Polymorphic button: renders <a> when `href` is set, otherwise <button>.
 */
export default function Button({
  href,
  variant = "primary",
  size = "md",
  icon = true,
  iconComponent: Icon = ArrowUpRight,
  className,
  children,
  ...props
}) {
  const classes = cn(
    "group relative inline-flex items-center justify-center gap-2.5 font-semibold uppercase tracking-[0.14em] whitespace-nowrap transition-all duration-300 ease-out active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none",
    VARIANTS[variant],
    variant !== "ghost" && SIZES[size],
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <Icon
          size={16}
          strokeWidth={2.25}
          aria-hidden="true"
          className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );

  if (href) {
    const external = isExternal(href);
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  );
}
