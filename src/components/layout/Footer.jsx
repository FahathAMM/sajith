import site from "@/data/site.json";
import contact from "@/data/contact.json";
import Logo from "@/components/layout/Logo";
import BackToTop from "@/components/ui/BackToTop";
import { getIcon } from "@/lib/icons";
import { isExternal } from "@/lib/utils";

const externalProps = (href) =>
  isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};

export default function Footer() {
  const { footer, navigation } = site;
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-fg/[0.06] bg-coal">
      <div className="container-x pt-20 md:pt-28">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-mute">{footer.description}</p>
            <div>
              <p className="mb-4 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-fg">{footer.socialTitle}</p>
              <ul className="flex gap-2">
                {contact.socials.map((s) => {
                  const Icon = getIcon(s.icon);
                  return (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        aria-label={s.label}
                        {...externalProps(s.href)}
                        className="flex h-11 w-11 items-center justify-center border border-fg/10 text-fog transition-all duration-300 hover:border-accent hover:bg-lime hover:text-onlime"
                      >
                        <Icon size={18} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <p className="mb-6 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-fg">{footer.quickLinksTitle}</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 lg:grid-cols-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm text-mute transition-colors hover:text-accent">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="mb-6 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-fg">{footer.contactTitle}</p>
            <ul className="flex flex-col gap-4">
              {contact.details.map((d) => {
                const Icon = getIcon(d.icon);
                const inner = (
                  <>
                    <Icon size={16} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                    <span>{d.value}</span>
                  </>
                );
                return (
                  <li key={d.label}>
                    {d.href ? (
                      <a href={d.href} {...externalProps(d.href)} className="flex items-start gap-3 text-sm text-mute transition-colors hover:text-fg">
                        {inner}
                      </a>
                    ) : (
                      <span className="flex items-start gap-3 text-sm text-mute">{inner}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="heading-xl text-outline pointer-events-none mt-20 select-none whitespace-nowrap text-center text-[13vw] leading-none"
        >
          {footer.bigText}
        </p>

        <div className="flex flex-col items-start justify-between gap-6 border-t border-fg/[0.06] py-8 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-1.5">
            <p className="text-xs text-mute">
              © {year} {footer.copyright}
            </p>
            <p className="text-[0.7rem] text-mute/70">{footer.disclaimer}</p>
          </div>
          <BackToTop label={footer.backToTopLabel} />
        </div>
      </div>
    </footer>
  );
}
