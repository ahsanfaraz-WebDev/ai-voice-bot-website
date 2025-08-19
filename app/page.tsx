import HeroSection from '@/components/hero-section';
import WhyChooseUsSection from '@/components/why-choose-us-section';
import CoreFeaturesSection from '@/components/core-features-section';
import ComparisonSection from '@/components/comparison-section';
import IntegrationsSection from '@/components/integrations-section';
import FinalCTASection from '@/components/final-cta-section';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <>
      <main className="overflow-x-hidden">
        <HeroSection />
        <WhyChooseUsSection />
        <CoreFeaturesSection />
        <ComparisonSection />
        <IntegrationsSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}