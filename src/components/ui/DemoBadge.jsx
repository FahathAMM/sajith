import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

/** Visible marker for placeholder / unverified content. */
export default function DemoBadge({ label, note, className }) {
  return (
    <div className={cn("inline-flex max-w-full items-start gap-3 border border-dashed border-accent/40 bg-lime/[0.04] px-4 py-3", className)} role="note">
      <Info size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
      <p className="text-xs leading-relaxed text-fog/80">
        {label && <strong className="mr-1.5 font-semibold uppercase tracking-[0.15em] text-accent">{label}</strong>}
        {note}
      </p>
    </div>
  );
}
