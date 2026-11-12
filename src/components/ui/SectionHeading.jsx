import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

/** Eyebrow label with a lime rule. */
export function Eyebrow({ children, className }) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-accent",
        className
      )}
    >
      <span aria-hidden="true" className="h-px w-8 bg-accent" />
      {children}
    </p>
  );
}

/**
 * Section heading: eyebrow + oversized display title + optional description.
 * The final word of the heading is highlighted in lime.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
  size = "lg",
  className,
  children,
}) {
  const words = String(title).split(" ");
  const last = words.pop();
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        centered ? "items-center text-center" : "items-start",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <Tag
          className={cn(
            "heading-xl text-fg",
            size === "lg" ? "text-[clamp(2.75rem,7vw,6.25rem)]" : "text-[clamp(2.5rem,4.6vw,4.75rem)]"
          )}
        >
          {words.join(" ")} <span className="text-accent">{last}</span>
        </Tag>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "max-w-xl text-base leading-relaxed text-fog/80 md:text-lg",
              centered && "mx-auto"
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
      {children}
    </div>
  );
}
