import Image from "next/image";
import philosophy from "@/data/philosophy.json";
import Parallax from "@/components/ui/Parallax";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { getIcon } from "@/lib/icons";

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-heading"
      className="grain relative isolate overflow-hidden bg-ink"
    >
      <Parallax offset={90} className="absolute inset-0 -z-20">
        <Image
          src={philosophy.image.src}
          alt={philosophy.image.alt}
          fill
          sizes="100vw"
          className="object-cover opacity-45 grayscale"
        />
      </Parallax>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-ink via-ink/75 to-ink" />

      <div className="container-x section-y">
        <Reveal>
          <Eyebrow>{philosophy.eyebrow}</Eyebrow>
        </Reveal>

        <h2 id="philosophy-heading" className="heading-xl mt-8 text-[clamp(3rem,10.5vw,10rem)] text-fg">
          {philosophy.headingLines.map((line, i) => (
            <Reveal as="span" key={line} delay={i * 0.1} className="block">
              {i === philosophy.accentLineIndex ? (
                <span className="text-accent">{line}</span>
              ) : i === 1 ? (
                <span className="text-outline-lime">{line}</span>
              ) : (
                line
              )}
            </Reveal>
          ))}
        </h2>

        <Reveal delay={0.2} className="mt-10 max-w-2xl md:ml-[30%]">
          <p className="text-lg leading-relaxed text-fog/85 md:text-xl">{philosophy.description}</p>
        </Reveal>

        <Stagger as="ol" className="mt-20 grid gap-px bg-fg/10 md:mt-28 md:grid-cols-3" stagger={0.12}>
          {philosophy.principles.map((p) => {
            const Icon = getIcon(p.icon);
            return (
              <StaggerItem
                as="li"
                key={p.number}
                className="group relative flex flex-col gap-6 bg-ink/90 p-8 backdrop-blur-sm transition-colors duration-500 hover:bg-coal md:p-10"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-7xl leading-none text-accent/20 transition-colors duration-500 group-hover:text-accent">
                    {p.number}
                  </span>
                  <Icon size={28} strokeWidth={1.5} className="text-accent" aria-hidden="true" />
                </div>
                <h3 className="font-display text-4xl uppercase text-fg">{p.title}</h3>
                <p className="leading-relaxed text-mute">{p.description}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
