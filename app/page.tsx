import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/layout/Hero";
import { Features } from "@/components/layout/Features";
import { HowItWorks } from "@/components/layout/HowItWorks";
import { About } from "@/components/layout/About";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen animated-bg">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <About />
      </main>
      <Footer />
    </div>
  );
}
