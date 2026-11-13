import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Compass, ArrowRight, ShieldCheck } from 'lucide-react';
import { Destination } from '../data/travelData';

interface DestinationModalProps {
  destination: Destination | null;
  onClose: () => void;
  onSelectForBooking?: (destinationName: string) => void;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  onClose,
  onSelectForBooking,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (destination) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [destination, onClose]);

  const handleInquire = () => {
    if (destination && onSelectForBooking) {
      onSelectForBooking(destination.name);
    }
    onClose();
    const bookingSection = document.querySelector('#booking') || document.querySelector('#packages');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {destination && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop with Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-charcoal/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Dialog Content with Fade & Scale Up */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col"
          >
            {/* Header Image Banner */}
            <div className="relative h-64 sm:h-72 w-full flex-shrink-0 overflow-hidden">
              <img
                src={destination.imageUrl}
                alt={`Scenic landscape of ${destination.name} in ${destination.country}`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-black/40" />

              {/* Close Button */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Close destination details modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Banner Meta Content */}
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-3 py-1 rounded-full bg-terracotta text-white text-xs font-semibold uppercase tracking-wider">
                    {destination.category}
                  </span>
                  {destination.difficulty && (
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-sand text-xs font-medium">
                      {destination.difficulty} Difficulty
                    </span>
                  )}
                </div>
                <h3 id="modal-title" className="font-heading text-2xl sm:text-3xl font-bold text-white drop-shadow">
                  {destination.name}
                </h3>
                <p className="flex items-center gap-1.5 text-sand/90 text-sm mt-1">
                  <MapPin className="w-4 h-4 text-terracotta" />
                  <span>{destination.country}</span>
                </p>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-sand/60 border border-sand-muted text-charcoal">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-charcoal-muted block font-medium">
                    Starting From
                  </span>
                  <span className="text-xl font-bold font-heading text-forest">
                    ${destination.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-charcoal-muted ml-1">/ person</span>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-wider text-charcoal-muted block font-medium">
                    Best Season
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-charcoal flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-terracotta flex-shrink-0" />
                    <span className="truncate">{destination.bestSeason.split('&')[0]}</span>
                  </span>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[11px] uppercase tracking-wider text-charcoal-muted block font-medium">
                    Duration
                  </span>
                  <span className="text-sm font-semibold text-charcoal flex items-center gap-1 mt-0.5">
                    <Compass className="w-3.5 h-3.5 text-forest flex-shrink-0" />
                    <span>{destination.durationDays || 5}+ Days Expedition</span>
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-terracotta mb-2">
                  The Experience
                </h4>
                <p className="text-charcoal-light leading-relaxed text-sm sm:text-base font-normal">
                  {destination.shortDesc} Specially crafted for discerning travelers seeking deep immersion, local gastronomy, and uncrowded viewpoints away from standard tourist corridors.
                </p>
              </div>

              {/* Key Highlights */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-terracotta mb-3">
                  Curated Journey Highlights
                </h4>
                <ul className="space-y-2.5">
                  {destination.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-charcoal">
                      <span className="w-5 h-5 rounded-full bg-forest/10 text-forest flex items-center justify-center flex-shrink-0 mt-0.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </span>
                      <span className="leading-snug">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Best Season Full Note */}
              <div className="p-4 rounded-xl bg-sand-light border-l-4 border-terracotta text-xs sm:text-sm text-charcoal">
                <strong className="font-semibold text-charcoal">Ideal Window: </strong>
                <span>{destination.bestSeason}. Small groups are capped to preserve serenity and minimize ecological impact.</span>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 sm:p-6 bg-sand-light/80 border-t border-sand-muted flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-center sm:text-left">
                <span className="text-xs text-charcoal-muted block">Guaranteed departure slots</span>
                <span className="text-sm font-semibold text-forest">Max 8-10 guests per group</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-full border border-charcoal-muted/30 hover:border-charcoal text-charcoal text-sm font-medium transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleInquire}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-terracotta hover:bg-terracotta-light text-white text-sm font-semibold shadow-md hover:shadow-lg active:scale-95 transition-all"
                >
                  <span>Inquire For This Trip</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
