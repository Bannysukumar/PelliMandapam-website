import { HeroSection } from "@/components/home/hero-section";
import { CategoryShortcuts } from "@/components/home/category-shortcuts";
import { FeaturedMandapams } from "@/components/home/featured-mandapams";
import { HowItWorks } from "@/components/home/how-it-works";
import { Testimonials } from "@/components/home/testimonials";
import { VendorCTA } from "@/components/home/vendor-cta";
import { FAQSection } from "@/components/home/faq-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryShortcuts />
      <FeaturedMandapams />
      <HowItWorks />
      <Testimonials />
      <VendorCTA />
      <FAQSection />
    </>
  );
}
