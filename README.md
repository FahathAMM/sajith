# Sajith – Personal Fitness Trainer Website

A premium, dark-first, single-page portfolio for a personal fitness trainer.
Built with **Next.js 16 (App Router)**, **JavaScript**, **Tailwind CSS v4**, **Framer Motion** and **Lucide** icons.
There is no backend, database or authentication.

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

Requires Node.js 20.9 or newer.

## Editing content (no code changes needed)

All text, numbers, links and image paths live in `src/data/*.json`:

| File | Controls |
| --- | --- |
| `site.json` | Brand/logo, SEO + Open Graph, navigation, header CTA, marquee words, footer, demo notice banner |
| `hero.json` | Hero label, heading lines, text, CTAs, image, quick stats |
| `about.json` | Profile, bio, approach, stats, certifications |
| `services.json` | Service cards (icon, title, description, benefits) |
| `programs.json` | Program cards (duration, level, goal, price, image) |
| `transformations.json` | Before/after profiles |
| `philosophy.json` | "Discipline builds…" section + 3 principles |
| `testimonials.json` | Client testimonials |
| `statistics.json` | Animated statistics band |
| `faq.json` | FAQ accordion |
| `contact.json` | WhatsApp, phone, email, location, socials, inquiry form labels and validation messages |

- **Icons**: JSON uses icon names such as `"Dumbbell"` or `"Instagram"`. Available names are listed in `src/lib/icons.js`; add one there to use a new icon.
- **Images**: put files in `public/images/` and reference them as `/images/filename.jpg`. Remote images from `images.unsplash.com` and `images.pexels.com` are also allowed (see `next.config.mjs`).
- **Heading highlights**: section headings highlight their last word in lime automatically. The hero and philosophy headings use `accentLineIndex` to choose the highlighted line.
- **Demo notice**: set `site.json → demoNotice.enabled` to `false` once all content is real.

## Before going live

All of the following is **placeholder demo content** and is labelled as such on the site:

- Testimonials, transformation profiles and results
- Certifications, statistics and pricing
- Phone number, email, WhatsApp number, social links, address
- `site.json → seo.url` (used for canonical and Open Graph URLs)

Replace the transformation photos with real, consented client photos. Then remove the demo labels (`demoLabel`, `demoNote`, `pricingNote`, `note`, `certificationsNote`) and disable the demo banner.

The inquiry form only validates on the client and shows a demo success message. To receive inquiries, connect `src/components/ui/ContactForm.jsx` to a form service such as Formspree or Web3Forms, or to an email API.

## Structure

```
src/
  app/           layout.js (fonts, SEO metadata, JSON-LD), page.js, globals.css, icon.svg
  components/
    layout/      Navbar, Footer, Logo
    sections/    Hero, About, Services, Programs, Statistics, Transformations,
                 Philosophy, Testimonials, FAQ, Contact
    ui/          Button, SectionHeading, Reveal (scroll animations), AnimatedCounter,
                 BeforeAfterSlider, TestimonialCard, Accordion, ContactForm,
                 Parallax, Marquee, DemoBadge, DemoNotice, BackToTop
  data/          all editable content (JSON)
  lib/           utils.js (cn, format, whatsappUrl), icons.js
public/images/   self-hosted photography
```

Animations respect the user's `prefers-reduced-motion` setting through `MotionConfig` and CSS.

## Image credits

Photography is from [Unsplash](https://unsplash.com) and is used under the Unsplash License.
