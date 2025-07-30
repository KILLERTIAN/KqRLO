import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/layout/Hero';
import { Features } from '@/components/layout/Features';
import { PrivacySecurity } from '@/components/layout/PrivacySecurity';
import { HowItWorks } from '@/components/layout/HowItWorks';
import { About } from '@/components/layout/About';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main id="home">
        <Hero />
        <Features />
        <PrivacySecurity />
        <HowItWorks />
        <About />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
