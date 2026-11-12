import statistics from "@/data/statistics.json";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export default function Statistics() {
  return (
    <section aria-labelledby="stats-heading" className="relative overflow-hidden bg-lime text-onlime">
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.07] [background-image:repeating-linear-gradient(-45deg,#000_0,#000_1px,transparent_1px,transparent_14px)]" />
      <div className="container-x relative py-20 md:py-28">
        <Reveal className="mb-14 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <Eyebrow className="text-onlime [&>span]:bg-onlime">{statistics.eyebrow}</Eyebrow>
            <h2 id="stats-heading" className="heading-xl mt-5 text-[clamp(2.5rem,6vw,5rem)]">
              {statistics.heading}
            </h2>
          </div>
          <p className="text-xs font-medium italic opacity-70">{statistics.note}</p>
        </Reveal>

        <Stagger as="dl" className="grid grid-cols-2 lg:grid-cols-4">
          {statistics.items.map((stat, i) => (
            <StaggerItem
              key={stat.label}
              className={`flex flex-col gap-2 border-onlime/20 py-6 lg:py-2 ${i % 2 === 1 ? "border-l pl-6" : "pr-6"} ${i > 1 ? "border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l lg:pl-6" : ""}`}
            >
              <dt className="order-2 text-xs font-bold uppercase tracking-[0.2em] md:text-sm">{stat.label}</dt>
              <dd className="order-1 font-display text-[clamp(3.5rem,9vw,7.5rem)] leading-none">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </dd>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
