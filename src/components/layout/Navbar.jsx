"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import site from "@/data/site.json";
import contact from "@/data/contact.json";
import Logo from "@/components/layout/Logo";
import Button from "@/components/ui/Button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { getIcon } from "@/lib/icons";
import { cn, EASE, isExternal } from "@/lib/utils";

export default function Navbar() {
  const { navigation, cta, mobileMenu } = site;
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(navigation[0]?.href);

  // Solid background after scrolling.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    // Observe every section (not just nav targets) so the highlight clears on e.g. FAQ.
    const sections = [...document.querySelectorAll("main section[id]")];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [navigation]);

  // Lock scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close the menu if the viewport grows to desktop size.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-fg/[0.06] bg-ink/80 py-3 backdrop-blur-xl"
            : "border-b border-transparent py-5"
        )}
      >
        <nav className="container-x flex items-center justify-between gap-6" aria-label="Main">
          <Logo />

          <ul className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => {
              const isActive = active === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative block px-3 py-2 text-[0.72rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300 xl:px-4",
                      isActive ? "text-fg" : "text-fg/55 hover:text-fg"
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-accent xl:inset-x-4"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button href={cta.href} size="sm" className="hidden sm:inline-flex">
              {cta.label}
            </Button>
            <button
              onClick={() => setOpen(true)}
              aria-label={mobileMenu.openLabel}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-10 w-10 items-center justify-center border border-fg/15 text-fg transition-colors hover:border-accent hover:text-accent lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={close}
              aria-hidden="true"
            />
            <motion.aside
              key="panel"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col overflow-y-auto border-l border-fg/10 bg-coal lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="flex items-center justify-between px-6 py-5">
                <Logo onClick={close} />
                <div className="flex items-center gap-2">
                  <ThemeToggle />
                  <button
                    onClick={close}
                    aria-label={mobileMenu.closeLabel}
                    autoFocus
                    className="flex h-10 w-10 items-center justify-center border border-fg/15 text-fg transition-colors hover:border-accent hover:text-accent"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <motion.ul
                className="flex flex-1 flex-col justify-center gap-1 px-6 py-8"
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } } }}
              >
                {navigation.map((item, i) => (
                  <motion.li
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, x: 40 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={close}
                      className={cn(
                        "group flex items-baseline gap-4 py-2 font-display text-4xl uppercase transition-colors",
                        active === item.href ? "text-accent" : "text-fg hover:text-accent"
                      )}
                    >
                      <span className="font-sans text-xs text-mute">{String(i + 1).padStart(2, "0")}</span>
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="flex flex-col gap-6 border-t border-fg/10 px-6 py-8">
                <Button href={cta.href} onClick={close} className="w-full">
                  {cta.label}
                </Button>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-mute">{mobileMenu.footerNote}</p>
                  <div className="flex gap-2">
                    {contact.socials.map((s) => {
                      const Icon = getIcon(s.icon);
                      return (
                        <a
                          key={s.label}
                          href={s.href}
                          aria-label={s.label}
                          {...(isExternal(s.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="flex h-9 w-9 items-center justify-center border border-fg/10 text-fog transition-colors hover:border-accent hover:text-accent"
                        >
                          <Icon size={16} />
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
