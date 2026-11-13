import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, Variants } from 'framer-motion';
import { ArrowDown, Compass, ShieldCheck, Sparkles, Users } from 'lucide-react';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll-linked cinematic parallax:
  // Background scales 1 -> 1.15 and shifts downward on scroll
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 800], ['0%', '25%']);
  const backgroundScale = useTransform(scrollY, [0, 800], [1.0, 1.15]);

  // Hero text fades and drifts upward on scroll
  const textOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const textY = useTransform(scrollY, [0, 450], [0, -70]);

  const handleScrollToDestinations = (e: React.MouseEvent) => {
    e.preventDefault();
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: string) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo('#destinations');
    } else {
      document.querySelector('#destinations')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Staggered entrance animation variants (duration: 0.7, ease: "easeOut")
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.15,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemFadeUpVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal"
      aria-label="Welcome & Hero Introduction"
    >
      {/* Background Image with Scroll-Linked Parallax & Scale (1 -> 1.15) */}
      <motion.div
        className="absolute inset-0 z-0 origin-center"
        style={
          shouldReduceMotion
            ? {}
            : {
                y: backgroundY,
                scale: backgroundScale,
              }
        }
      >
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=85"
          alt="Golden dawn hot-air balloons rising over misty mountain valleys in Cappadocia"
          loading="eager"
          fetchPriority="high"
          className="w-full h-full object-cover object-center"
        />
        {/* Multi-layered dark gradient overlay for optimal WCAG AAA text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/65 to-charcoal/45" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/20 to-black/60" />
      </motion.div>

      {/* Content Container: Fades and drifts upward on scroll */}
      <motion.div
        style={
          shouldReduceMotion
            ? {}
            : {
                opacity: textOpacity,
                y: textY,
              }
        }
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 text-center text-white flex flex-col items-center"
      >
        {/* Continuous Floating Accent Badge (y: [0, -10, 0], duration: 6, repeat: Infinity) */}
        <motion.div
          variants={itemFadeUpVariants}
          animate={shouldReduceMotion ? {} : { y: [0, -10, 0] }}
          transition={{
            y: {
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest/80 backdrop-blur-md border border-white/20 text-sand text-xs sm:text-sm font-medium tracking-wider uppercase mb-6 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-terracotta" />
          <span>Curated Boutique Expeditions</span>
        </motion.div>

        {/* Crisp Headline */}
        <motion.h1
          variants={itemFadeUpVariants}
          className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.15] drop-shadow-md"
        >
          Leave the Desk Behind.{' '}
          <span className="block mt-1 sm:mt-2 italic font-serif text-sand font-normal">
            Awaken Your Destiny.
          </span>
        </motion.h1>

        {/* Short High-Contrast Subheadline */}
        <motion.p
          variants={itemFadeUpVariants}
          className="mt-6 text-base sm:text-lg md:text-xl text-sand-light/95 max-w-2xl font-light leading-relaxed drop-shadow-sm"
        >
          Handcrafted small-group journeys through Cappadocia’s celestial skies, the jagged Dolomites, and Kyoto’s sacred groves. Reconnect with wonder.
        </motion.p>

        {/* CTA Actions with Shimmer Sweep */}
        <motion.div
          variants={itemFadeUpVariants}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          {/* Primary CTA with Soft Shimmer Sweep on Hover */}
          <a
            href="#destinations"
            onClick={handleScrollToDestinations}
            className="relative group/btn overflow-hidden w-full sm:w-auto px-8 py-4 rounded-full bg-terracotta hover:bg-terracotta-light text-white font-semibold text-base tracking-wide transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 text-center focus:outline-none focus:ring-4 focus:ring-terracotta/40"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <span>Explore Tours</span>
            </span>
            {/* Shimmer sweep effect */}
            <span
              className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none"
              aria-hidden="true"
            />
          </a>

          <a
            href="#packages"
            onClick={(e) => {
              e.preventDefault();
              const lenis = (window as unknown as { lenis?: { scrollTo: (target: string) => void } }).lenis;
              if (lenis) {
                lenis.scrollTo('#packages');
              } else {
                document.querySelector('#packages')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-medium text-base tracking-wide border border-white/25 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-4 focus:ring-white/30 text-center"
          >
            View Curated Packages
          </a>
        </motion.div>

        {/* Trust Badges Bar */}
        <motion.div
          variants={itemFadeUpVariants}
          className="mt-14 pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl w-full text-sand/90 text-xs sm:text-sm"
        >
          <div className="flex items-center justify-center gap-2">
            <Users className="w-4 h-4 text-terracotta" />
            <span>Intimate Groups (Max 8–10)</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Compass className="w-4 h-4 text-terracotta" />
            <span>Certified Local Wilderness Guides</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-terracotta" />
            <span>100% Carbon-Neutral Travel</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Scroll Down Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: [0, -10, 0] }}
        transition={{
          opacity: { delay: 1.2, duration: 0.6 },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
        }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center"
      >
        <a
          href="#destinations"
          onClick={handleScrollToDestinations}
          className="group flex flex-col items-center text-sand/70 hover:text-white transition-colors duration-200"
          aria-label="Scroll down to destinations section"
        >
          <span className="text-[11px] font-medium uppercase tracking-widest mb-1.5 opacity-80 group-hover:opacity-100">
            Scroll to Discover
          </span>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/50 transition-colors animate-bounce">
            <ArrowDown className="w-4 h-4" />
          </div>
        </a>
      </motion.div>
    </section>
  );
};
