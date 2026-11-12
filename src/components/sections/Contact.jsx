import { ArrowUpRight } from "lucide-react";
import contact from "@/data/contact.json";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/ui/ContactForm";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { getIcon } from "@/lib/icons";
import { isExternal, whatsappUrl } from "@/lib/utils";

const externalProps = (href) =>
  isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};

export default function Contact() {
  const WhatsAppIcon = getIcon("MessageCircle");
  const waHref = whatsappUrl(contact.whatsapp.number, contact.whatsapp.message);

  return (
    <section id="contact" className="section-y relative overflow-hidden bg-coal">
      <div aria-hidden="true" className="absolute -right-40 top-0 h-[36rem] w-[36rem] rounded-full bg-lime/[0.07] blur-[150px]" />

      <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="flex flex-col gap-10 lg:col-span-5">
          <SectionHeading size="md" eyebrow={contact.eyebrow} title={contact.heading} description={contact.description} />

          <Reveal>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 bg-lime p-5 text-onlime transition-all duration-300 hover:bg-fg hover:text-ink md:p-6"
            >
              <span className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center bg-onlime text-lime">
                  <WhatsAppIcon size={24} aria-hidden="true" />
                </span>
                <span className="flex flex-col">
                  <span className="font-display text-2xl uppercase leading-none">{contact.whatsapp.label}</span>
                  <span className="mt-1 text-xs font-medium opacity-70">+{contact.whatsapp.number}</span>
                </span>
              </span>
              <ArrowUpRight size={26} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </Reveal>

          <Stagger as="ul" className="grid gap-px bg-fg/[0.07] sm:grid-cols-2">
            {contact.details.map((d) => {
              const Icon = getIcon(d.icon);
              const body = (
                <>
                  <Icon size={20} className="text-accent" aria-hidden="true" />
                  <span className="mt-3 block text-[0.62rem] uppercase tracking-[0.22em] text-mute">{d.label}</span>
                  <span className="mt-1 block text-sm font-medium text-fg">{d.value}</span>
                </>
              );
              return (
                <StaggerItem as="li" key={d.label} className="bg-coal">
                  {d.href ? (
                    <a href={d.href} {...externalProps(d.href)} className="block h-full p-5 transition-colors hover:bg-ink">
                      {body}
                    </a>
                  ) : (
                    <div className="h-full p-5">{body}</div>
                  )}
                </StaggerItem>
              );
            })}
          </Stagger>

          <Reveal className="flex flex-wrap gap-3">
            {contact.socials.map((s) => {
              const Icon = getIcon(s.icon);
              return (
                <a
                  key={s.label}
                  href={s.href}
                  {...externalProps(s.href)}
                  className="group inline-flex items-center gap-3 border border-fg/10 px-4 py-3 text-sm text-fog transition-all duration-300 hover:border-accent hover:text-accent"
                >
                  <Icon size={18} aria-hidden="true" />
                  <span>
                    <span className="sr-only">{s.label}: </span>
                    {s.handle}
                  </span>
                </a>
              );
            })}
          </Reveal>

          <p className="text-xs italic text-mute">{contact.demoNote}</p>
        </div>

        <Reveal direction="left" className="lg:col-span-7">
          <ContactForm form={contact.form} />
        </Reveal>
      </div>
    </section>
  );
}
