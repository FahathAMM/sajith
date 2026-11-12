import { Anton, Inter } from "next/font/google";
import "./globals.css";
import site from "@/data/site.json";
import contact from "@/data/contact.json";
import about from "@/data/about.json";
import Providers from "@/components/Providers";
import { THEME_KEY } from "@/lib/utils";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const { seo, brand } = site;

export const metadata = {
  metadataBase: new URL(seo.url),
  title: { default: seo.title, template: seo.titleTemplate },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: brand.name }],
  creator: brand.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: seo.locale,
    url: seo.url,
    siteName: `${brand.logoText}${brand.logoAccent}`,
    title: seo.title,
    description: seo.description,
    images: [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.ogImageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f4ef" },
    { media: "(prefers-color-scheme: dark)", color: "#080808" },
  ],
};

// Applies the saved theme before first paint (no flash). Dark is the default.
const themeScript = `(function(){try{var t=localStorage.getItem(${JSON.stringify(THEME_KEY)})||${JSON.stringify(site.theme.default)};if(t==="light")document.documentElement.dataset.theme="light";}catch(e){}})();`;

const phone = contact.details.find((d) => d.icon === "Phone");
const email = contact.details.find((d) => d.icon === "Mail");

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: `${brand.name} – ${about.profile.find((p) => p.label === "Profession")?.value ?? ""}`,
  description: seo.description,
  url: seo.url,
  image: new URL(seo.ogImage, seo.url).href,
  telephone: phone?.value,
  email: email?.value,
  address: { "@type": "PostalAddress", addressLocality: "Colombo", addressCountry: "LK" },
  sameAs: contact.socials.map((s) => s.href),
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${inter.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
