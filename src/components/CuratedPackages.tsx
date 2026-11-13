import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Clock, Users, CheckCircle2, ArrowRight, BookOpen, Compass, Check } from 'lucide-react';
import { TOUR_PACKAGES, TourPackage } from '../data/travelData';
import { ItineraryDrawer } from './ItineraryDrawer';

interface CuratedPackagesProps {
  selectedPackageTitle?: string | null;
  onSelectPackage: (packageTitle: string) => void;
}

export const CuratedPackages: React.FC<CuratedPackagesProps> = ({
  selectedPackageTitle,
  onSelectPackage,
}) => {
  const [activeDrawerPackage, setActiveDrawerPackage] = useState<TourPackage | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleSelectPackage = (title: string) => {
    onSelectPackage(title);
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: string) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo('#booking');
    } else {
      document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="packages"
      className="py-24 sm:py-32 bg-sand-light scroll-mt-16 transition-colors duration-300"
      aria-label="Curated Tour Packages"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll-Reveal */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest/10 text-forest text-xs font-semibold tracking-wider uppercase mb-3">
            <Compass className="w-3.5 h-3.5 text-terracotta" />
            <span>Complete Journeys</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-forest tracking-tight">
            Curated Tour Packages
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal-light leading-relaxed">
            Multi-day all-inclusive boutique expeditions with transparent pricing, intimate group limits, and seamless chauffeured transitions from start to finish.
          </p>
        </motion.div>

        {/* 3-Column Responsive Package Cards Grid with 3D Card Lift & Warm Shadow */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {TOUR_PACKAGES.map((pkg, idx) => {
            const isCurrentlySelected = selectedPackageTitle === pkg.title;

            return (
              <motion.article
                key={pkg.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: shouldReduceMotion ? 0 : idx * 0.1,
                  ease: 'easeOut',
                }}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: -8,
                        scale: 1.01,
                      }
                }
                className={`group bg-white rounded-3xl overflow-hidden border transition-shadow duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-terracotta/15 ${
                  isCurrentlySelected
                    ? 'border-terracotta ring-2 ring-terracotta/40 shadow-xl'
                    : 'border-sand-dark/60 shadow-sm'
                }`}
              >
                <div>
                  {/* Image Container with Smooth 1.08x Zoom & Overlay */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-sand-dark">
                    {/* 1.08x smooth image zoom on hover */}
                    <img
                      src={pkg.imageUrl}
                      alt={pkg.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transform group-hover:scale-[1.08] transition-transform duration-700 ease-out"
                    />

                    {/* Featured Badge */}
                    {pkg.featuredBadge && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3.5 py-1 rounded-full bg-terracotta text-white text-[11px] font-semibold tracking-wider uppercase shadow-md">
                          {pkg.featuredBadge}
                        </span>
                      </div>
                    )}

                    {/* Selection Indicator Badge */}
                    {isCurrentlySelected && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-forest text-sand text-[11px] font-semibold tracking-wider uppercase shadow-md">
                          <Check className="w-3 h-3 text-terracotta" />
                          <span>Selected</span>
                        </span>
                      </div>
                    )}

                    {/* Dark gradient overlay reveal on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-transparent opacity-40 group-hover:opacity-75 transition-opacity duration-500" />

                    {/* Quick Meta Chips on Image Bottom */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-sand text-xs font-medium z-10">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/45 backdrop-blur-sm">
                        <Clock className="w-3.5 h-3.5 text-terracotta" />
                        <span>{pkg.duration}</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/45 backdrop-blur-sm">
                        <Users className="w-3.5 h-3.5 text-sand" />
                        <span>{pkg.groupSize}</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-7">
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-forest group-hover:text-terracotta transition-colors leading-tight">
                      {pkg.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-charcoal-muted leading-relaxed line-clamp-2">
                      {pkg.subtitle}
                    </p>

                    {/* 3 Key Inclusions */}
                    <div className="mt-6 pt-6 border-t border-sand-muted">
                      <h4 className="text-[11px] font-bold text-terracotta uppercase tracking-wider mb-3">
                        Key Inclusions
                      </h4>
                      <ul className="space-y-2.5">
                        {pkg.inclusions.map((inclusion, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-charcoal">
                            <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
                            <span className="leading-snug">{inclusion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card Pricing & CTA Buttons */}
                <div className="p-6 sm:p-7 pt-4 bg-sand/30 border-t border-sand-muted mt-auto">
                  {/* Price */}
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-[11px] text-charcoal-muted uppercase tracking-wider block font-medium">
                        All-Inclusive Price
                      </span>
                      <span className="text-2xl sm:text-3xl font-heading font-bold text-forest">
                        ${pkg.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-charcoal-muted ml-1.5">/ person</span>
                    </div>

                    <span className="text-xs text-forest font-medium bg-forest/10 px-2.5 py-1 rounded-full">
                      {pkg.itinerary.length} Days Itinerary
                    </span>
                  </div>

                  {/* Dual CTAs: View Itinerary & Select Package */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setActiveDrawerPackage(pkg)}
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full border border-forest/30 hover:border-forest text-forest bg-white hover:bg-forest hover:text-sand text-xs sm:text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-forest/40"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Itinerary</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelectPackage(pkg.title)}
                      className={`inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full text-xs sm:text-sm font-semibold shadow-sm transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-terracotta/40 ${
                        isCurrentlySelected
                          ? 'bg-forest text-sand hover:bg-forest-dark'
                          : 'bg-terracotta hover:bg-terracotta-light text-white'
                      }`}
                    >
                      <span>{isCurrentlySelected ? 'Selected' : 'Select'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Slide-over Itinerary Drawer with AnimatePresence */}
      <ItineraryDrawer
        packageData={activeDrawerPackage}
        onClose={() => setActiveDrawerPackage(null)}
        onSelectPackage={handleSelectPackage}
      />
    </section>
  );
};
