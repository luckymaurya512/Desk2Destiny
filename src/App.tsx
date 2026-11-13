import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeaturedDestinations } from './components/FeaturedDestinations';
import { CuratedPackages } from './components/CuratedPackages';
import { TestimonialsTrust } from './components/TestimonialsTrust';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  // Initialize Buttery Smooth Scroll via Lenis
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // Provide globally accessible scrollTo for custom anchor buttons if needed
    (window as unknown as { lenis: Lenis }).lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const handleSelectPackage = (packageTitle: string) => {
    setSelectedPackage(packageTitle);
  };

  return (
    <div className="min-h-screen bg-sand text-charcoal font-body antialiased selection:bg-terracotta selection:text-white flex flex-col">
      {/* Sticky Navbar with Frosted Transition */}
      <Navbar />

      <main className="flex-1">
        {/* Cinematic Hero with Scroll Parallax, Drift & Shimmer */}
        <Hero />

        {/* Featured Destinations with Curtain Reveal & Sliding layoutId Tabs */}
        <FeaturedDestinations onSelectForBooking={(destName) => setSelectedPackage(destName)} />

        {/* Curated Tour Packages with Curtain Reveal & 3D Card Lift */}
        <CuratedPackages
          selectedPackageTitle={selectedPackage}
          onSelectPackage={handleSelectPackage}
        />

        {/* Testimonials with Directional Slide & Blur Crossfade */}
        <TestimonialsTrust />

        {/* Intuitive Booking Flow */}
        <BookingSection
          selectedPackage={selectedPackage}
          onClearPackage={() => setSelectedPackage(null)}
        />
      </main>

      {/* Structured 3-Column Footer */}
      <Footer />
    </div>
  );
};

export default App;
