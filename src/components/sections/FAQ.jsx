import faq from "@/data/faq.json";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Accordion from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";

export default function FAQ() {
  return (
    <section id="faq" className="section-y relative bg-ink">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <SectionHeading size="md" eyebrow={faq.eyebrow} title={faq.heading} description={faq.description} />
          <Reveal delay={0.15} className="mt-10">
            <Button href={faq.cta.href} variant="outline">
              {faq.cta.label}
            </Button>
          </Reveal>
        </div>
        <Reveal className="lg:col-span-7">
          <Accordion items={faq.items} />
        </Reveal>
      </div>
    </section>
  );
}
