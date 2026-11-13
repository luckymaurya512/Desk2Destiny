import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onBookNowClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookNowClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Transition after scrolling 50px
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial position on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'Destinations', href: '#destinations' },
    { label: 'Packages', href: '#packages' },
    { label: 'Testimonials', href: '#testimonials' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: string) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(href);
    } else {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBookNow = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (onBookNowClick) {
      onBookNowClick();
    } else {
      const lenis = (window as unknown as { lenis?: { scrollTo: (target: string) => void } }).lenis;
      if (lenis) {
        lenis.scrollTo('#booking');
      } else {
        const target = document.querySelector('#booking');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <motion.header
      initial={false}
      animate={{
        backgroundColor: isScrolled ? 'rgba(27, 67, 50, 0.90)' : 'rgba(0, 0, 0, 0)',
        boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none',
        paddingTop: isScrolled ? '0.75rem' : '1.25rem',
        paddingBottom: isScrolled ? '0.75rem' : '1.25rem',
      }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        isScrolled
          ? 'backdrop-blur-md shadow-md text-sand border-b border-forest-light/20'
          : 'bg-gradient-to-b from-black/60 to-transparent text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-terracotta rounded-lg px-1 py-0.5"
            aria-label="Desk2Destiny Home"
          >
            <motion.div
              whileHover={{ rotate: 45 }}
              transition={{ duration: 0.3 }}
              className="w-9 h-9 rounded-full bg-terracotta/90 flex items-center justify-center text-white shadow-sm"
            >
              <Compass className="w-5 h-5" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-white">
                Desk<span className="text-terracotta font-serif italic">2</span>Destiny
              </span>
              <span className="text-[10px] tracking-widest uppercase font-medium text-sand/80 -mt-1 hidden sm:block">
                Bespoke Expeditions
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm font-medium tracking-wide text-sand/90 hover:text-white transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-terracotta after:transition-all after:duration-200 hover:after:w-full focus:outline-none focus:ring-2 focus:ring-terracotta/50 rounded"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Book Now CTA */}
          <div className="hidden md:flex items-center">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="#booking"
              onClick={handleBookNow}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-terracotta hover:bg-terracotta-light text-white text-sm font-semibold tracking-wide transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white/80"
            >
              <span>Book Now</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-sand hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta"
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? 'Close main menu' : 'Open main menu'}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer with AnimatePresence */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Slide-in Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="md:hidden fixed top-0 right-0 bottom-0 z-50 w-full max-w-xs bg-forest-dark text-sand shadow-2xl p-6 flex flex-col justify-between"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation Menu"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-terracotta flex items-center justify-center text-white">
                      <Compass className="w-4 h-4" />
                    </div>
                    <span className="font-heading text-lg font-bold text-white">
                      Desk<span className="text-terracotta font-serif italic">2</span>Destiny
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg text-sand/80 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-terracotta"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Drawer Links */}
                <nav className="flex flex-col gap-4 mt-8" aria-label="Mobile Navigation">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-lg font-medium py-2 px-3 rounded-lg text-sand hover:text-white hover:bg-white/5 transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Drawer Bottom CTA */}
              <div className="pt-6 border-t border-white/10">
                <a
                  href="#booking"
                  onClick={handleBookNow}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-terracotta hover:bg-terracotta-light text-white font-semibold text-center shadow-md active:scale-95 transition-all"
                >
                  <span>Book Your Journey</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <p className="text-center text-xs text-sand/60 mt-3">
                  Handcrafted travel itineraries worldwide
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
