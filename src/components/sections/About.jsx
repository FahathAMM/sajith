import Image from "next/image";
import { Award } from "lucide-react";
import about from "@/data/about.json";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { ImageReveal, Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export default function About() {
  return (
    <section id="about" className="section-y relative overflow-hidden bg-ink">
      <div aria-hidden="true" className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-lime/[0.06] blur-[120px]" />

      <div className="container-x grid items-start gap-16 lg:grid-cols-12 lg:gap-20">
        {/* Image composition */}
        <div className="relative lg:sticky lg:top-28 lg:col-span-5">
          <ImageReveal className="relative aspect-[4/5] w-full overflow-hidden bg-char sm:w-[85%] lg:w-full">
            <Image
              src={about.image.src}
              alt={about.image.alt}
              fill
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 75vw, 100vw"
              className="object-cover transition-transform duration-[1.2s] ease-out hover:scale-105"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          </ImageReveal>

          <ImageReveal
            delay={0.3}
            className="absolute -bottom-10 right-0 hidden aspect-square w-[42%] overflow-hidden border-[6px] border-ink bg-char sm:block lg:-right-10"
          >
            <Image
              src={about.secondaryImage.src}
              alt={about.secondaryImage.alt}
              fill
              sizes="(min-width: 1024px) 18vw, 35vw"
              className="object-cover grayscale"
            />
          </ImageReveal>

          <Reveal
            delay={0.5}
            className="absolute -left-2 top-8 flex items-center gap-3 bg-lime px-5 py-4 text-onlime shadow-[0_20px_50px_-15px_rgba(198,255,0,0.5)] sm:-left-6"
          >
            <span className="font-display text-5xl leading-none">{about.experienceBadge.value}</span>
            <span className="max-w-[5.5rem] text-[0.65rem] font-bold uppercase leading-tight tracking-[0.15em]">
              {about.experienceBadge.label}
            </span>
          </Reveal>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-12 lg:col-span-7 lg:pt-6">
          <SectionHeading eyebrow={about.eyebrow} title={about.heading} />

          <Reveal>
            <p className="text-xl leading-relaxed text-fg/90 md:text-2xl md:leading-relaxed">
              {about.description}
            </p>
          </Reveal>

          <Reveal>
            <dl className="grid grid-cols-1 border-t border-fg/10 sm:grid-cols-2">
              {about.profile.map((item) => (
                <div key={item.label} className="flex flex-col gap-1 border-b border-fg/10 py-4 sm:pr-6">
                  <dt className="text-[0.65rem] uppercase tracking-[0.25em] text-mute">{item.label}</dt>
                  <dd className="font-medium text-fg">{item.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal>
            <h3 className="mb-4 text-[0.65rem] uppercase tracking-[0.25em] text-mute">{about.specializationsTitle}</h3>
            <ul className="flex flex-wrap gap-2">
              {about.specializations.map((s) => (
                <li
                  key={s}
                  className="border border-fg/15 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-fg transition-colors hover:border-accent hover:text-accent"
                >
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="relative border-l-2 border-accent bg-fg/[0.02] py-6 pl-6 pr-4 md:pl-8">
            <h3 className="mb-3 font-display text-2xl uppercase text-accent">{about.philosophyTitle}</h3>
            <p className="leading-relaxed text-fog/85">{about.philosophy}</p>
          </Reveal>

          <Stagger className="grid grid-cols-3 gap-4 border-y border-fg/10 py-8">
            {about.stats.map((stat) => (
              <StaggerItem key={stat.label} className="flex flex-col gap-1">
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  className="font-display text-4xl text-fg md:text-6xl"
                />
                <span className="text-[0.62rem] uppercase tracking-[0.18em] text-mute md:text-xs">{stat.label}</span>
              </StaggerItem>
            ))}
          </Stagger>

          <div>
            <Reveal className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-3xl uppercase text-fg">{about.certificationsTitle}</h3>
              <p className="text-xs italic text-mute">{about.certificationsNote}</p>
            </Reveal>
            <Stagger as="ul" className="grid gap-3 sm:grid-cols-2">
              {about.certifications.map((c) => (
                <StaggerItem
                  as="li"
                  key={c.name}
                  className="group flex items-start gap-4 border border-fg/[0.07] bg-coal p-5 transition-colors duration-300 hover:border-accent/40"
                >
                  <Award size={22} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                  <div>
                    <p className="font-semibold leading-snug text-fg">{c.name}</p>
                    <p className="mt-1 text-xs text-mute">
                      {c.issuer} · {c.year}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <Reveal>
            <Button href={about.cta.href} size="lg">
              {about.cta.label}
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
