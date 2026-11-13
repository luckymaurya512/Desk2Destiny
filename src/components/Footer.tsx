import React from 'react';
import { Compass, Mail, Phone, MapPin, ArrowUp, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    const lenis = (window as unknown as { lenis?: { scrollTo: (target: number) => void } }).lenis;
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
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

  return (
    <footer className="bg-charcoal text-sand pt-16 pb-12 border-t border-charcoal-light/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3-Column Structured Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          {/* Column 1: Agency Summary */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-terracotta flex items-center justify-center text-white">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-heading text-2xl font-bold tracking-tight text-white">
                Desk<span className="text-terracotta font-serif italic">2</span>Destiny
              </span>
            </div>

            <p className="text-sm text-sand/75 leading-relaxed mb-6 font-normal">
              Inspired by the Updraft ethos, Desk2Destiny crafts bespoke, small-group expeditions that guide travelers away from the fluorescent glow of desks into the earth&apos;s wildest sanctuaries.
            </p>

            <div className="space-y-2 text-xs text-sand/65">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-terracotta flex-shrink-0" />
                <span>100% Certified Carbon-Neutral Operations</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-terracotta flex-shrink-0" />
                <span>Leave No Trace & Local Community Support</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:pl-8">
            <h4 className="text-xs font-bold uppercase tracking-widest text-terracotta mb-5">
              Expedition Portals
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#destinations"
                  onClick={(e) => handleLinkClick(e, '#destinations')}
                  className="text-sand/80 hover:text-white transition-colors duration-200 inline-block py-0.5"
                >
                  Featured Destinations
                </a>
              </li>
              <li>
                <a
                  href="#packages"
                  onClick={(e) => handleLinkClick(e, '#packages')}
                  className="text-sand/80 hover:text-white transition-colors duration-200 inline-block py-0.5"
                >
                  Curated Tour Packages
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  onClick={(e) => handleLinkClick(e, '#testimonials')}
                  className="text-sand/80 hover:text-white transition-colors duration-200 inline-block py-0.5"
                >
                  Traveler Reviews & Trust
                </a>
              </li>
              <li>
                <a
                  href="#booking"
                  onClick={(e) => handleLinkClick(e, '#booking')}
                  className="text-sand/80 hover:text-white transition-colors duration-200 inline-block py-0.5"
                >
                  Reserve Your Journey
                </a>
              </li>
              <li>
                <span className="text-sand/50 text-xs block pt-2">
                  Small Groups Capped at 8–10 Explorers
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-terracotta mb-5">
              Concierge Studio
            </h4>
            <div className="space-y-4 text-sm text-sand/80">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-sand/50 block">Direct Inquiries</span>
                  <a
                    href="mailto:concierge@desk2destiny.com"
                    className="hover:text-white transition-colors"
                  >
                    concierge@desk2destiny.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-sand/50 block">Expedition Hotline</span>
                  <a
                    href="tel:+18004823378"
                    className="hover:text-white transition-colors"
                  >
                    +1 (800) 482-DEST (3378)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-terracotta flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-sand/50 block">Bespoke Studio</span>
                  <span className="leading-snug">
                    42 Wanderlust Way, Alpine Sanctuary, CO 80424
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-xs text-sand/60">
              <span>Studio Hours: Mon–Sat, 8:00 AM – 7:00 PM MST</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sand/60">
          <p>
            &copy; 2026 Desk2Destiny Expeditions Ltd. Inspired by the Updraft aesthetic. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-sand hover:text-white transition-colors"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

