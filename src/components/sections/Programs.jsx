import Image from "next/image";
import { Clock, Target, TrendingUp } from "lucide-react";
import programs from "@/data/programs.json";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export default function Programs() {
  const { labels } = programs;
  return (
    <section id="programs" className="section-y relative overflow-hidden bg-ink">
      <div aria-hidden="true" className="absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-lime/[0.05] blur-[140px]" />
      <div className="container-x">
        <div className="mb-16 flex flex-col justify-between gap-8 md:mb-20 lg:flex-row lg:items-end">
          <SectionHeading eyebrow={programs.eyebrow} title={programs.heading} description={programs.description} />
          <Reveal>
            <p className="text-xs italic text-mute">{programs.pricingNote}</p>
          </Reveal>
        </div>

        <Stagger className="grid gap-6 md:grid-cols-2" stagger={0.12}>
          {programs.items.map((program) => (
            <StaggerItem
              as="article"
              key={program.id}
              className={cn(
                "group relative flex flex-col overflow-hidden border bg-coal transition-colors duration-500",
                program.featured ? "border-accent/50" : "border-fg/[0.07] hover:border-fg/20"
              )}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-char">
                <Image
                  src={program.image.src}
                  alt={program.image.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-coal via-coal/30 to-transparent" />

                <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 bg-lime px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-onlime">
                    <Clock size={12} strokeWidth={3} aria-hidden="true" />
                    {program.duration}
                  </span>
                  {program.featured && program.featuredLabel && (
                    <span className="bg-fg px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-ink">
                      {program.featuredLabel}
                    </span>
                  )}
                </div>

                <h3 className="absolute bottom-5 left-5 right-5 font-display text-4xl uppercase leading-none text-fg md:text-5xl">
                  {program.title}
                </h3>
              </div>

              <div className="flex flex-1 flex-col gap-6 p-6 md:p-8">
                <p className="leading-relaxed text-fog/80">{program.description}</p>

                <dl className="grid grid-cols-1 gap-4 border-y border-fg/[0.07] py-5 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <TrendingUp size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                    <div>
                      <dt className="text-[0.62rem] uppercase tracking-[0.22em] text-mute">{labels.level}</dt>
                      <dd className="text-sm font-medium text-fg">{program.level}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                    <div>
                      <dt className="text-[0.62rem] uppercase tracking-[0.22em] text-mute">{labels.goal}</dt>
                      <dd className="text-sm font-medium text-fg">{program.goal}</dd>
                    </div>
                  </div>
                </dl>

                <div className="mt-auto flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-[0.62rem] uppercase tracking-[0.22em] text-mute">{labels.price}</p>
                    <p className="font-display text-3xl text-fg">{program.price}</p>
                  </div>
                  <Button
                    href={labels.ctaHref}
                    size="sm"
                    variant={program.featured ? "primary" : "outline"}
                    aria-label={`${labels.cta}: ${program.title}`}
                  >
                    {labels.cta}
                  </Button>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
