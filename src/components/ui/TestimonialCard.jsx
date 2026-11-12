import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { cn, format } from "@/lib/utils";

/** Single client testimonial. */
export default function TestimonialCard({ testimonial, ratingLabel, className }) {
  const { name, program, rating, image, feedback } = testimonial;
  return (
    <figure
      className={cn(
        "group relative flex h-full flex-col justify-between gap-10 border border-fg/[0.07] bg-coal p-7 transition-colors duration-500 hover:border-accent/40 md:p-9",
        className
      )}
    >
      <Quote
        size={56}
        aria-hidden="true"
        className="absolute right-6 top-6 text-fg/[0.04] transition-colors duration-500 group-hover:text-accent/15"
      />
      <div className="flex flex-col gap-6">
        <div className="flex gap-1" role="img" aria-label={format(ratingLabel, { rating })}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              aria-hidden="true"
              className={i < rating ? "fill-accent text-accent" : "text-fg/20"}
            />
          ))}
        </div>
        <blockquote className="text-lg leading-relaxed text-fg/90 md:text-xl">
          &ldquo;{feedback}&rdquo;
        </blockquote>
      </div>
      <figcaption className="flex items-center gap-4 border-t border-fg/[0.07] pt-6">
        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-accent/30">
          <Image src={image.src} alt={image.alt} fill sizes="48px" className="object-cover" />
        </div>
        <div>
          <p className="font-semibold text-fg">{name}</p>
          <p className="text-xs uppercase tracking-[0.15em] text-accent">{program}</p>
        </div>
      </figcaption>
    </figure>
  );
}
