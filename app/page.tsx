'use client';

import { useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/layout/Hero';
import { Features } from '@/components/layout/Features';
import { PrivacySecurity } from '@/components/layout/PrivacySecurity';
import { HowItWorks } from '@/components/layout/HowItWorks';
import { About } from '@/components/layout/About';
import { Footer } from '@/components/layout/Footer';
import { CookieConsent } from '@/components/ui/CookieConsent';

export default function Home() {
  useEffect(() => {
    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main id="home">
        <Hero />
        <section id="features">
          <Features />
        </section>
        <section id="privacy-security">
          <PrivacySecurity />
        </section>
        <section id="how-it-works">
          <HowItWorks />
        </section>
        <section id="about">
          <About />
        </section>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
