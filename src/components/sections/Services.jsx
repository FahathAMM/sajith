import { ArrowUpRight, Check } from "lucide-react";
import services from "@/data/services.json";
import SectionHeading from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { getIcon } from "@/lib/icons";

export default function Services() {
  return (
    <section id="services" className="section-y relative bg-coal">
      <div className="container-x">
        <SectionHeading
          eyebrow={services.eyebrow}
          title={services.heading}
          description={services.description}
          className="mb-16 md:mb-20"
        />

        <Stagger className="grid border-l border-t border-fg/[0.07] sm:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {services.items.map((service, i) => {
            const Icon = getIcon(service.icon);
            return (
              <StaggerItem
                as="article"
                key={service.id}
                className="group relative flex flex-col gap-8 overflow-hidden border-b border-r border-fg/[0.07] p-8 transition-colors duration-500 hover:bg-ink md:p-10"
              >
                {/* lime sweep on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-lime transition-transform duration-500 group-hover:scale-x-100"
                />
                <div className="flex items-start justify-between">
                  <span className="flex h-14 w-14 items-center justify-center border border-fg/10 text-accent transition-all duration-500 group-hover:border-accent group-hover:bg-lime group-hover:text-onlime">
                    <Icon size={26} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="font-display text-5xl text-fg/[0.06] transition-colors duration-500 group-hover:text-accent/20" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="font-display text-3xl uppercase leading-none text-fg">{service.title}</h3>
                  <p className="leading-relaxed text-mute">{service.description}</p>
                </div>

                <ul className="flex flex-col gap-2.5">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-sm text-fog/90">
                      <Check size={15} strokeWidth={3} className="shrink-0 text-accent" aria-hidden="true" />
                      {b}
                    </li>
                  ))}
                </ul>

                <a
                  href={services.ctaHref}
                  className="mt-auto inline-flex items-center gap-2 self-start text-xs font-semibold uppercase tracking-[0.18em] text-fg transition-colors hover:text-accent"
                  aria-label={`${services.ctaLabel}: ${service.title}`}
                >
                  {services.ctaLabel}
                  <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                </a>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
