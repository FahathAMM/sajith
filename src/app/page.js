import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import DemoNotice from "@/components/ui/DemoNotice";
import Marquee from "@/components/ui/Marquee";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Programs from "@/components/sections/Programs";
import Statistics from "@/components/sections/Statistics";
import Transformations from "@/components/sections/Transformations";
import Philosophy from "@/components/sections/Philosophy";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Programs />
        <Statistics />
        <Transformations />
        <Philosophy />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <DemoNotice />
    </>
  );
}
