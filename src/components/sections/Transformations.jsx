import transformations from "@/data/transformations.json";
import SectionHeading from "@/components/ui/SectionHeading";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";
import DemoBadge from "@/components/ui/DemoBadge";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export default function Transformations() {
  const { labels } = transformations;
  return (
    <section id="transformations" className="section-y relative bg-ink">
      <div className="container-x">
        <div className="mb-14 grid gap-8 lg:mb-20 lg:grid-cols-2 lg:items-end">
          <SectionHeading
            eyebrow={transformations.eyebrow}
            title={transformations.heading}
            description={transformations.description}
          />
          <Reveal className="lg:justify-self-end">
            <DemoBadge label={transformations.demoLabel} note={transformations.demoNote} className="lg:max-w-md" />
          </Reveal>
        </div>

        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.12}>
          {transformations.items.map((t) => (
            <StaggerItem
              as="article"
              key={t.id}
              className="group flex flex-col border border-fg/[0.07] bg-coal transition-colors duration-500 hover:border-accent/30"
            >
              <div className="relative">
                <BeforeAfterSlider
                  before={t.before}
                  after={t.after}
                  beforeLabel={labels.before}
                  afterLabel={labels.after}
                  ariaLabel={`${labels.sliderAria} – ${t.name}`}
                />
                <span className="pointer-events-none absolute bottom-3 left-3 bg-ink/85 px-2 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-accent backdrop-blur-sm">
                  {transformations.demoLabel}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-5 p-6 md:p-7">
                <div>
                  <h3 className="font-display text-3xl uppercase text-fg">{t.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-accent">{t.program}</p>
                </div>

                <dl className="grid grid-cols-2 border-y border-fg/[0.07]">
                  <div className="flex flex-col gap-1 py-4 pr-4">
                    <dt className="text-[0.6rem] uppercase tracking-[0.22em] text-mute">{labels.duration}</dt>
                    <dd className="font-display text-2xl text-fg">{t.duration}</dd>
                  </div>
                  <div className="flex flex-col gap-1 border-l border-fg/[0.07] py-4 pl-4">
                    <dt className="text-[0.6rem] uppercase tracking-[0.22em] text-mute">{labels.change}</dt>
                    <dd className="font-display text-2xl text-accent">{t.weightChange}</dd>
                  </div>
                </dl>

                <p className="text-sm leading-relaxed text-fog/80">{t.story}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
