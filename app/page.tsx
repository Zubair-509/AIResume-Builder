import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { FeaturesSection } from '@/components/features-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { NewsSection } from '@/components/news-section';
import { CTASection } from '@/components/cta-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <NewsSection />
      <CTASection />
      <Footer />
    </main>
  );
}