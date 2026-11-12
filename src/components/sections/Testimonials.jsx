import testimonials from "@/data/testimonials.json";
import SectionHeading from "@/components/ui/SectionHeading";
import TestimonialCard from "@/components/ui/TestimonialCard";
import DemoBadge from "@/components/ui/DemoBadge";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-y relative bg-coal">
      <div className="container-x">
        <div className="mb-14 flex flex-col items-center gap-8 lg:mb-20">
          <SectionHeading
            align="center"
            eyebrow={testimonials.eyebrow}
            title={testimonials.heading}
            description={testimonials.description}
          />
          <Reveal>
            <DemoBadge label={testimonials.demoLabel} note={testimonials.demoNote} />
          </Reveal>
        </div>

        <Stagger className="grid gap-5 md:grid-cols-2 md:pb-10" stagger={0.1}>
          {testimonials.items.map((t, i) => (
            <StaggerItem key={t.id} className={i % 2 === 1 ? "md:translate-y-10" : ""}>
              <TestimonialCard testimonial={t} ratingLabel={testimonials.ratingLabel} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
