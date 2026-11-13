import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MapPin, ArrowRight, Sparkles, Filter } from 'lucide-react';
import { DESTINATIONS, Destination } from '../data/travelData';
import { DestinationModal } from './DestinationModal';

type CategoryFilter = 'All' | 'Mountains' | 'Cultural' | 'Coastal' | 'Adventure';

interface FeaturedDestinationsProps {
  onSelectForBooking?: (destinationName: string) => void;
}

export const FeaturedDestinations: React.FC<FeaturedDestinationsProps> = ({ onSelectForBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [activeModalDestination, setActiveModalDestination] = useState<Destination | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const categories: CategoryFilter[] = ['All', 'Mountains', 'Cultural', 'Coastal', 'Adventure'];

  const filteredDestinations = selectedCategory === 'All'
    ? DESTINATIONS
    : DESTINATIONS.filter((dest) => dest.category === selectedCategory);

  return (
    <section
      id="destinations"
      className="py-24 sm:py-32 bg-sand scroll-mt-16 transition-colors duration-300"
      aria-label="Featured Destinations"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll-Reveal */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest/10 text-forest text-xs font-semibold tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-terracotta" />
              <span>Curated Landscapes</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-forest tracking-tight">
              Featured Destinations
            </h2>
            <p className="mt-3 text-base sm:text-lg text-charcoal-light leading-relaxed">
              From the celestial chimneys of Cappadocia to the rugged spires of the Dolomites, each sanctuary is hand-chosen for its raw beauty and cultural soul.
            </p>
          </div>

          <div className="text-sm text-charcoal-muted flex items-center gap-1.5 self-start md:self-end">
            <Filter className="w-4 h-4 text-terracotta" />
            <span>Showing <strong className="text-forest font-semibold">{filteredDestinations.length}</strong> {filteredDestinations.length === 1 ? 'destination' : 'destinations'}</span>
          </div>
        </motion.div>

        {/* Sliding layoutId Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-10 no-scrollbar"
          role="tablist"
          aria-label="Filter destinations by landscape category"
        >
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(category)}
                className="relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-terracotta/40"
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-forest rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors duration-200 ${
                    isSelected ? 'text-sand font-bold' : 'text-charcoal hover:text-forest'
                  }`}
                >
                  {category}
                </span>
                {!isSelected && (
                  <span className="absolute inset-0 rounded-full border border-sand-dark/60 bg-white/70 -z-0 pointer-events-none" />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* 3-Column Responsive Grid with AnimatePresence mode="popLayout" & 3D Card Lift */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredDestinations.map((destination) => (
              <motion.article
                layout
                key={destination.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{
                  layout: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 0.35 },
                  scale: { duration: 0.35 },
                }}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: -8,
                        scale: 1.01,
                      }
                }
                className="group bg-white rounded-3xl overflow-hidden border border-sand-dark/50 shadow-sm hover:shadow-2xl hover:shadow-terracotta/10 transition-shadow duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image Container with Smooth 1.08x Zoom & Overlay */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-sand-dark">
                    <img
                      src={destination.imageUrl}
                      alt={`${destination.name}, ${destination.country}`}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transform group-hover:scale-[1.08] transition-transform duration-700 ease-out"
                    />

                    {/* Category Pill on Image */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 rounded-full bg-forest/85 backdrop-blur-md text-white text-[11px] font-semibold tracking-wider uppercase shadow-sm">
                        {destination.category}
                      </span>
                    </div>

                    {/* Dark gradient overlay reveal on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/30 to-transparent opacity-40 group-hover:opacity-75 transition-opacity duration-500" />
                  </div>

                  {/* Card Content Details */}
                  <div className="p-6">
                    {/* Country & Location */}
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-terracotta uppercase tracking-wider mb-2">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{destination.country}</span>
                    </div>

                    {/* Destination Name */}
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-forest group-hover:text-terracotta transition-colors line-clamp-1">
                      {destination.name}
                    </h3>

                    {/* Short Description */}
                    <p className="mt-2 text-sm text-charcoal-muted line-clamp-2 leading-relaxed">
                      {destination.shortDesc}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Starting Price & View Details Trigger */}
                <div className="px-6 pb-6 pt-2 border-t border-sand-muted flex items-center justify-between mt-auto">
                  <div>
                    <span className="text-[11px] text-charcoal-muted uppercase tracking-wider block font-medium">
                      Starting from
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-bold font-heading text-forest">
                        ${destination.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-charcoal-muted">/ person</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveModalDestination(destination)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-sand hover:bg-forest hover:text-sand text-forest text-xs sm:text-sm font-semibold transition-all duration-200 group/btn focus:outline-none focus:ring-2 focus:ring-terracotta"
                    aria-label={`View details for ${destination.name}`}
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Accessible Detail Modal with AnimatePresence */}
      <DestinationModal
        destination={activeModalDestination}
        onClose={() => setActiveModalDestination(null)}
        onSelectForBooking={onSelectForBooking}
      />
    </section>
  );
};
