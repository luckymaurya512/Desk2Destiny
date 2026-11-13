import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Users, CheckCircle2, BedDouble, Utensils, ArrowRight } from 'lucide-react';
import { TourPackage } from '../data/travelData';

interface ItineraryDrawerProps {
  packageData: TourPackage | null;
  onClose: () => void;
  onSelectPackage: (packageName: string) => void;
}

export const ItineraryDrawer: React.FC<ItineraryDrawerProps> = ({
  packageData,
  onClose,
  onSelectPackage,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (packageData) {
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
  }, [packageData, onClose]);

  const handleSelectAndBook = () => {
    if (packageData) {
      onSelectPackage(packageData.title);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {packageData && (
        <div
          className="fixed inset-0 z-50 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-title"
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

          {/* Slide-over Drawer Container with Spring Slide */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-full sm:w-screen max-w-xl bg-white shadow-2xl flex flex-col"
            >
              {/* Drawer Top Header Banner */}
              <div className="relative p-6 sm:p-8 bg-forest text-sand flex-shrink-0">
                {/* Close Button */}
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  className="absolute top-5 right-5 p-2 rounded-full bg-forest-dark hover:bg-forest text-sand hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta"
                  aria-label="Close itinerary drawer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-2 pr-10">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-terracotta text-white text-xs font-semibold uppercase tracking-wider">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{packageData.duration}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-forest-dark text-sand-light text-xs font-medium">
                    <Users className="w-3.5 h-3.5" />
                    <span>{packageData.groupSize}</span>
                  </span>
                </div>

                <h3 id="drawer-title" className="font-heading text-2xl sm:text-3xl font-bold text-white mt-2">
                  {packageData.title}
                </h3>
                <p className="text-sand/80 text-sm mt-1 leading-snug">
                  {packageData.subtitle}
                </p>

                <div className="mt-4 pt-4 border-t border-forest-light/40 flex items-baseline gap-2">
                  <span className="text-2xl font-heading font-bold text-sand">
                    ${packageData.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-sand/70">per person • All internal transfers & stays included</span>
                </div>
              </div>

              {/* Drawer Inclusions Bar */}
              <div className="px-6 sm:px-8 py-3.5 bg-sand-light border-b border-sand-dark/60 flex-shrink-0">
                <h4 className="text-[11px] font-semibold text-terracotta uppercase tracking-wider mb-2">
                  Guaranteed Inclusions
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {packageData.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-charcoal">
                      <CheckCircle2 className="w-3.5 h-3.5 text-forest flex-shrink-0" />
                      <span className="truncate">{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scrollable Day-by-Day Timeline */}
              <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-forest border-b border-sand-muted pb-2">
                  Day-by-Day Journey Breakdown
                </h4>

                <div className="relative border-l-2 border-forest/20 ml-3 sm:ml-4 pl-5 sm:pl-6 space-y-8">
                  {packageData.itinerary.map((day) => (
                    <div key={day.day} className="relative group">
                      {/* Timeline Node Icon */}
                      <div className="absolute -left-[31px] sm:-left-[35px] top-0 w-6 h-6 rounded-full bg-forest text-sand text-[11px] font-bold flex items-center justify-center border-2 border-white shadow-sm">
                        {day.day}
                      </div>

                      {/* Day Content */}
                      <div>
                        <span className="text-xs font-semibold text-terracotta uppercase tracking-wider block">
                          Day {day.day}
                        </span>
                        <h5 className="font-heading text-lg font-bold text-forest mt-0.5">
                          {day.title}
                        </h5>
                        <p className="text-sm text-charcoal-light mt-1.5 leading-relaxed font-normal">
                          {day.description}
                        </p>

                        {/* Metadata tags: Stay & Meals */}
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                          {day.stay && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-sand text-charcoal text-xs font-medium border border-sand-dark/40">
                              <BedDouble className="w-3 h-3 text-terracotta flex-shrink-0" />
                              <span>{day.stay}</span>
                            </span>
                          )}
                          {day.meals && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-sand text-charcoal text-xs font-medium border border-sand-dark/40">
                              <Utensils className="w-3 h-3 text-forest flex-shrink-0" />
                              <span>{day.meals}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Drawer Bottom Action Bar */}
              <div className="p-4 sm:p-6 bg-sand border-t border-sand-dark/60 flex items-center justify-between gap-3 flex-shrink-0">
                <div className="min-w-0 flex-1">
                  <span className="text-[11px] text-charcoal-muted block uppercase tracking-wider">Selected Journey</span>
                  <span className="text-sm font-semibold text-forest truncate block">
                    {packageData.title}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleSelectAndBook}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-terracotta hover:bg-terracotta-light text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-terracotta/50 flex-shrink-0"
                >
                  <span>Select & Book</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
