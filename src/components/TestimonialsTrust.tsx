import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote, MapPin, Compass, ShieldCheck } from 'lucide-react';
import { TRUST_STATS, TESTIMONIALS } from '../data/travelData';

export const TestimonialsTrust: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = TESTIMONIALS.length;
  const shouldReduceMotion = useReducedMotion();

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Touch Swipe Handlers for mobile & touchscreens
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }
  };

  // Keyboard navigation when focused on carousel
  const carouselRef = useRef<HTMLDivElement>(null);
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  // Optional gentle autoplay that pauses on hover or touch
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  const activeTestimonial = TESTIMONIALS[currentIndex];

  const slideVariants = {
    enter: (dir: number) => ({
      x: shouldReduceMotion ? 0 : (dir > 0 ? 50 : -50),
      opacity: 0,
      filter: shouldReduceMotion ? 'none' : 'blur(4px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        x: { type: 'spring' as const, stiffness: 320, damping: 32 },
        opacity: { duration: 0.4 },
        filter: { duration: 0.35 },
      },
    },
    exit: (dir: number) => ({
      x: shouldReduceMotion ? 0 : (dir > 0 ? -50 : 50),
      opacity: 0,
      filter: shouldReduceMotion ? 'none' : 'blur(4px)',
      transition: {
        x: { duration: 0.25 },
        opacity: { duration: 0.25 },
        filter: { duration: 0.25 },
      },
    }),
  };

  return (
    <section
      id="testimonials"
      className="py-24 sm:py-32 bg-sand scroll-mt-16 transition-colors duration-300"
      aria-label="Client Testimonials and Agency Trust Signals"
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
            <Quote className="w-3.5 h-3.5 text-terracotta" />
            <span>Unscripted Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-forest tracking-tight">
            Trusted by Mindful Travelers
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal-light leading-relaxed">
            From alpine sunrises to sacred tea sanctuaries, hear how fellow travelers traded their desks for unforgettable journeys of the spirit.
          </p>
        </motion.div>

        {/* 3-Stat Trust Bar (Scroll-Reveal & Stagger) */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="mb-20 rounded-3xl bg-forest text-sand p-8 sm:p-10 shadow-xl border border-forest-light/30"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-forest-light/30">
            {TRUST_STATS.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: shouldReduceMotion ? 0 : idx * 0.1,
                  ease: 'easeOut',
                }}
                className={`flex flex-col items-center text-center ${
                  idx > 0 ? 'pt-6 sm:pt-0 sm:px-6' : 'sm:pr-6'
                }`}
              >
                <div className="flex items-center gap-1.5 text-terracotta mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs uppercase tracking-wider font-semibold text-sand-light/80">
                    {stat.label}
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white tracking-tight my-1">
                  {stat.value}
                </div>
                <p className="text-xs sm:text-sm text-sand/75 max-w-[220px]">
                  {stat.subtext}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Carousel with Directional Slide + Blur Crossfade */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          ref={carouselRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative max-w-4xl mx-auto focus:outline-none focus:ring-2 focus:ring-forest/30 rounded-3xl"
          role="region"
          aria-roledescription="carousel"
          aria-label="Traveler reviews carousel"
        >
          {/* Active Testimonial Card with AnimatePresence Directional Slide + Blur Fade */}
          <div className="overflow-hidden rounded-3xl min-h-[380px] sm:min-h-[340px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
                role="group"
                aria-roledescription="slide"
                aria-label={`${currentIndex + 1} of ${totalSlides}`}
              >
                <div className="bg-white rounded-3xl p-6 sm:p-12 shadow-sm border border-sand-dark/60 flex flex-col justify-between min-h-[360px] sm:min-h-[340px] relative">
                  {/* Decorative Watermark Quote Icon */}
                  <div className="absolute top-6 right-8 text-sand-muted/50 pointer-events-none">
                    <Quote className="w-16 h-16 sm:w-20 sm:h-20" />
                  </div>

                  <div>
                    {/* 5-Star Rating Icons */}
                    <div className="flex items-center gap-1 mb-6" aria-label="5 out of 5 stars">
                      {[...Array(activeTestimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-terracotta text-terracotta"
                          aria-hidden="true"
                        />
                      ))}
                      <span className="ml-2 text-xs font-semibold text-charcoal-muted">
                        5.0 Verified Review
                      </span>
                    </div>

                    {/* Traveler Quote */}
                    <blockquote className="font-heading text-lg sm:text-2xl text-forest font-medium leading-relaxed italic relative z-10">
                      &ldquo;{activeTestimonial.quote}&rdquo;
                    </blockquote>
                  </div>

                  {/* Reviewer Bio & Trip Details */}
                  <div className="mt-8 pt-6 border-t border-sand-muted flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img
                        src={activeTestimonial.avatarUrl}
                        alt={`Portrait photo of verified traveler ${activeTestimonial.name}`}
                        loading="lazy"
                        className="w-14 h-14 rounded-full object-cover border-2 border-terracotta/40 shadow-sm flex-shrink-0"
                        style={{ width: '3.5rem', height: '3.5rem' }}
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-base text-forest leading-snug">
                          {activeTestimonial.name}
                        </h4>
                        <p className="text-xs text-charcoal-muted flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-terracotta flex-shrink-0" />
                          <span className="truncate">{activeTestimonial.location}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-sand-muted/40">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sand text-forest text-xs font-semibold border border-sand-dark/60 w-fit">
                        <Compass className="w-3.5 h-3.5 text-terracotta flex-shrink-0" />
                        <span>{activeTestimonial.tripTaken}</span>
                      </span>
                      <span className="text-[11px] text-charcoal-muted mt-1">
                        Traveled in {activeTestimonial.year}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls: Prev / Next Buttons & Dots */}
          <div className="flex items-center justify-between mt-8 px-2 sm:px-4">
            {/* Prev Button */}
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              type="button"
              onClick={handlePrev}
              className="p-3 rounded-full bg-white hover:bg-forest text-forest hover:text-sand border border-sand-dark/70 shadow-sm hover:shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-terracotta"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {/* Pagination Indicator Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => handleDotClick(dotIdx)}
                  className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-terracotta ${
                    currentIndex === dotIdx
                      ? 'w-8 h-2.5 bg-terracotta'
                      : 'w-2.5 h-2.5 bg-sand-dark hover:bg-charcoal-muted'
                  }`}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  aria-current={currentIndex === dotIdx ? 'true' : 'false'}
                />
              ))}
            </div>

            {/* Next Button */}
            <motion.button
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              type="button"
              onClick={handleNext}
              className="p-3 rounded-full bg-white hover:bg-forest text-forest hover:text-sand border border-sand-dark/70 shadow-sm hover:shadow transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-terracotta"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
