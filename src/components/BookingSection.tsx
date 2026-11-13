import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Calendar,
  Users,
  Mail,
  Phone,
  User,
  CheckCircle2,
  Send,
  Sparkles,
  RotateCcw,
  ShieldCheck,
  Compass,
} from 'lucide-react';
import { TOUR_PACKAGES } from '../data/travelData';

interface BookingSectionProps {
  selectedPackage: string | null;
  onClearPackage?: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  selectedPackage: string;
  travelDate: string;
  travelerCount: string;
  specialRequests: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  selectedPackage?: string;
  travelDate?: string;
  travelerCount?: string;
  specialRequests?: string;
}

interface ConfirmationData {
  referenceNumber: string;
  fullName: string;
  email: string;
  phone: string;
  packageName: string;
  travelDate: string;
  travelerCount: string;
  specialRequests?: string;
  submittedAt: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  selectedPackage,
}) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    selectedPackage: selectedPackage || '',
    travelDate: '',
    travelerCount: '2',
    specialRequests: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<ConfirmationData | null>(null);

  // Sync with selectedPackage from Step 4 or Step 3 handoff
  useEffect(() => {
    if (selectedPackage) {
      setFormData((prev) => ({
        ...prev,
        selectedPackage: selectedPackage,
      }));
      // Clear error for selectedPackage if any
      setErrors((prev) => ({ ...prev, selectedPackage: undefined }));
    }
  }, [selectedPackage]);

  // Validation function
  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return undefined;
      case 'email':
        if (!value.trim()) return 'Email address is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return 'Please enter a valid email address (e.g. name@example.com)';
        }
        return undefined;
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        if (!/^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,15}$/.test(value.trim())) {
          return 'Please enter a valid phone number';
        }
        return undefined;
      case 'selectedPackage':
        if (!value.trim()) return 'Please choose a package or custom itinerary';
        return undefined;
      case 'travelDate':
        if (!value) return 'Preferred travel date is required';
        return undefined;
      case 'travelerCount':
        if (!value) return 'Please specify number of travelers';
        if (parseInt(value, 10) < 1) return 'Must have at least 1 traveler';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const errorMsg = validateField(name as keyof FormData, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name as keyof FormData, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all as touched
    const allTouched: Record<string, boolean> = {
      fullName: true,
      email: true,
      phone: true,
      selectedPackage: true,
      travelDate: true,
      travelerCount: true,
    };
    setTouched(allTouched);

    // Validate all fields
    const newErrors: FormErrors = {};
    (Object.keys(formData) as Array<keyof FormData>).forEach((field) => {
      const errorMsg = validateField(field, formData[field]);
      if (errorMsg) {
        newErrors[field] = errorMsg;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);

      // Simulate quick network inquiry submission
      setTimeout(() => {
        const randomRef = 'D2D-' + Math.floor(100000 + Math.random() * 900000);
        setConfirmation({
          referenceNumber: randomRef,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          packageName: formData.selectedPackage,
          travelDate: formData.travelDate,
          travelerCount: formData.travelerCount,
          specialRequests: formData.specialRequests,
          submittedAt: new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }),
        });
        setIsSubmitting(false);
      }, 500);
    }
  };

  const handleResetForm = () => {
    setConfirmation(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      selectedPackage: '',
      travelDate: '',
      travelerCount: '2',
      specialRequests: '',
    });
    setErrors({});
    setTouched({});
  };

  const shouldReduceMotion = useReducedMotion();

  // Get tomorrow's date for date picker min attribute
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateString = tomorrow.toISOString().split('T')[0];

  return (
    <section
      id="booking"
      className="py-24 sm:py-32 bg-sand-light scroll-mt-16 transition-colors duration-300"
      aria-label="Booking Inquiry Section"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll-Reveal */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest/10 text-forest text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-terracotta" />
            <span>Begin Your Journey</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-forest tracking-tight">
            Reserve Your Expedition
          </h2>
          <p className="mt-3 text-base sm:text-lg text-charcoal-light leading-relaxed">
            Fill in your preferred travel details below. A dedicated concierge guide will tailor your itinerary and confirm availability within 24 hours.
          </p>
        </motion.div>

        {/* Confirmation State */}
        {confirmation ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-3xl p-8 sm:p-12 border border-sand-dark shadow-xl text-center"
          >
            <div className="w-16 h-16 rounded-full bg-forest text-sand flex items-center justify-center mx-auto mb-6 shadow-md">
              <CheckCircle2 className="w-9 h-9 text-sand" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-terracotta block">
              Inquiry Confirmed
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-forest mt-1">
              Thank You, {confirmation.fullName}!
            </h3>
            <p className="text-charcoal-light mt-2 max-w-md mx-auto text-sm sm:text-base">
              Your inquiry has been successfully registered with our expedition concierge team.
            </p>

            {/* Reference Badge */}
            <div className="my-8 p-4 rounded-2xl bg-sand/80 border border-sand-dark inline-block">
              <span className="text-xs uppercase tracking-wider text-charcoal-muted block font-medium">
                Booking Inquiry Reference Number
              </span>
              <span className="text-2xl sm:text-3xl font-mono font-bold text-terracotta tracking-wider">
                {confirmation.referenceNumber}
              </span>
            </div>

            {/* Summary Details */}
            <div className="max-w-lg mx-auto text-left bg-sand-light/60 p-6 rounded-2xl border border-sand-muted text-xs sm:text-sm space-y-3">
              <div className="flex justify-between border-b border-sand-muted pb-2">
                <span className="text-charcoal-muted">Selected Journey:</span>
                <strong className="text-forest text-right">{confirmation.packageName}</strong>
              </div>
              <div className="flex justify-between border-b border-sand-muted pb-2">
                <span className="text-charcoal-muted">Departure Date:</span>
                <span className="text-charcoal font-medium">{confirmation.travelDate}</span>
              </div>
              <div className="flex justify-between border-b border-sand-muted pb-2">
                <span className="text-charcoal-muted">Guests:</span>
                <span className="text-charcoal font-medium">{confirmation.travelerCount} Travelers</span>
              </div>
              <div className="flex justify-between border-b border-sand-muted pb-2">
                <span className="text-charcoal-muted">Contact:</span>
                <span className="text-charcoal font-medium">{confirmation.email} • {confirmation.phone}</span>
              </div>
              {confirmation.specialRequests && (
                <div className="pt-1">
                  <span className="text-charcoal-muted block mb-1">Special Notes:</span>
                  <p className="text-charcoal italic bg-white p-2.5 rounded-lg border border-sand-muted">
                    &ldquo;{confirmation.specialRequests}&rdquo;
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleResetForm}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-forest/30 hover:border-forest text-forest bg-white hover:bg-forest hover:text-sand text-sm font-semibold transition-all shadow-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Submit Another Inquiry</span>
              </button>
            </div>
          </motion.div>
        ) : (
          /* Booking Inquiry Form */
          <motion.form
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            onSubmit={handleSubmit}
            noValidate
            className="bg-white rounded-3xl p-8 sm:p-12 border border-sand-dark/70 shadow-xl"
            aria-label="Tour booking inquiry form"
          >
            {/* Auto-filled notification badge if coming from Step 4 selection */}
            {selectedPackage && (
              <div className="mb-8 p-4 rounded-2xl bg-sand border border-forest/20 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-forest text-sand flex items-center justify-center flex-shrink-0">
                    <Compass className="w-4 h-4 text-terracotta" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-terracotta uppercase tracking-wider block">
                      Pre-filled From Selection
                    </span>
                    <span className="text-sm font-bold text-forest">
                      {selectedPackage}
                    </span>
                  </div>
                </div>
                <span className="text-xs text-charcoal-muted hidden sm:inline">
                  You can change this anytime below
                </span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="sm:col-span-1">
                <label
                  htmlFor="fullName"
                  className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-2"
                >
                  Full Name <span className="text-terracotta">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-muted">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="e.g. Jane Doe"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-sand-light/40 text-sm font-medium text-charcoal placeholder-charcoal-muted/50 focus:outline-none focus:ring-2 transition-colors ${
                      touched.fullName && errors.fullName
                        ? 'border-red-500 focus:ring-red-400 bg-red-50/20'
                        : 'border-sand-dark focus:border-forest focus:ring-forest/30'
                    }`}
                    aria-invalid={!!(touched.fullName && errors.fullName)}
                    aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                    required
                  />
                </div>
                {touched.fullName && errors.fullName && (
                  <p id="fullName-error" className="mt-1.5 text-xs text-red-600 font-medium">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email Address */}
              <div className="sm:col-span-1">
                <label
                  htmlFor="email"
                  className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-2"
                >
                  Email Address <span className="text-terracotta">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-muted">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="jane@example.com"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-sand-light/40 text-sm font-medium text-charcoal placeholder-charcoal-muted/50 focus:outline-none focus:ring-2 transition-colors ${
                      touched.email && errors.email
                        ? 'border-red-500 focus:ring-red-400 bg-red-50/20'
                        : 'border-sand-dark focus:border-forest focus:ring-forest/30'
                    }`}
                    aria-invalid={!!(touched.email && errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    required
                  />
                </div>
                {touched.email && errors.email && (
                  <p id="email-error" className="mt-1.5 text-xs text-red-600 font-medium">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div className="sm:col-span-1">
                <label
                  htmlFor="phone"
                  className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-2"
                >
                  Phone Number <span className="text-terracotta">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-muted">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="+1 (555) 000-0000"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-sand-light/40 text-sm font-medium text-charcoal placeholder-charcoal-muted/50 focus:outline-none focus:ring-2 transition-colors ${
                      touched.phone && errors.phone
                        ? 'border-red-500 focus:ring-red-400 bg-red-50/20'
                        : 'border-sand-dark focus:border-forest focus:ring-forest/30'
                    }`}
                    aria-invalid={!!(touched.phone && errors.phone)}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                    required
                  />
                </div>
                {touched.phone && errors.phone && (
                  <p id="phone-error" className="mt-1.5 text-xs text-red-600 font-medium">
                    {errors.phone}
                  </p>
                )}
              </div>

              {/* Selected Package Dropdown (Auto-populated from Step 4) */}
              <div className="sm:col-span-1">
                <label
                  htmlFor="selectedPackage"
                  className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-2"
                >
                  Selected Package <span className="text-terracotta">*</span>
                </label>
                <div className="relative">
                  <select
                    id="selectedPackage"
                    name="selectedPackage"
                    value={formData.selectedPackage}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-4 py-3 rounded-xl border bg-sand-light/40 text-sm font-medium text-charcoal focus:outline-none focus:ring-2 transition-colors appearance-none cursor-pointer ${
                      touched.selectedPackage && errors.selectedPackage
                        ? 'border-red-500 focus:ring-red-400 bg-red-50/20'
                        : 'border-sand-dark focus:border-forest focus:ring-forest/30'
                    }`}
                    aria-invalid={!!(touched.selectedPackage && errors.selectedPackage)}
                    aria-describedby={errors.selectedPackage ? 'selectedPackage-error' : undefined}
                    required
                  >
                    <option value="">-- Choose a tour or package --</option>
                    {TOUR_PACKAGES.map((pkg) => (
                      <option key={pkg.id} value={pkg.title}>
                        {pkg.title} (${pkg.price.toLocaleString()} • {pkg.duration})
                      </option>
                    ))}
                    <option value="Custom Bespoke Itinerary">
                      Custom Bespoke Itinerary (Tailored with Concierge)
                    </option>
                  </select>
                </div>
                {touched.selectedPackage && errors.selectedPackage && (
                  <p id="selectedPackage-error" className="mt-1.5 text-xs text-red-600 font-medium">
                    {errors.selectedPackage}
                  </p>
                )}
              </div>

              {/* Preferred Travel Dates */}
              <div className="sm:col-span-1">
                <label
                  htmlFor="travelDate"
                  className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-2"
                >
                  Preferred Departure Date <span className="text-terracotta">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-muted">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <input
                    type="date"
                    id="travelDate"
                    name="travelDate"
                    min={minDateString}
                    value={formData.travelDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-sand-light/40 text-sm font-medium text-charcoal focus:outline-none focus:ring-2 transition-colors ${
                      touched.travelDate && errors.travelDate
                        ? 'border-red-500 focus:ring-red-400 bg-red-50/20'
                        : 'border-sand-dark focus:border-forest focus:ring-forest/30'
                    }`}
                    aria-invalid={!!(touched.travelDate && errors.travelDate)}
                    aria-describedby={errors.travelDate ? 'travelDate-error' : undefined}
                    required
                  />
                </div>
                {touched.travelDate && errors.travelDate && (
                  <p id="travelDate-error" className="mt-1.5 text-xs text-red-600 font-medium">
                    {errors.travelDate}
                  </p>
                )}
              </div>

              {/* Traveler Count */}
              <div className="sm:col-span-1">
                <label
                  htmlFor="travelerCount"
                  className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-2"
                >
                  Number of Guests <span className="text-terracotta">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-charcoal-muted">
                    <Users className="w-4 h-4" />
                  </div>
                  <select
                    id="travelerCount"
                    name="travelerCount"
                    value={formData.travelerCount}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-sand-light/40 text-sm font-medium text-charcoal focus:outline-none focus:ring-2 transition-colors appearance-none cursor-pointer ${
                      touched.travelerCount && errors.travelerCount
                        ? 'border-red-500 focus:ring-red-400 bg-red-50/20'
                        : 'border-sand-dark focus:border-forest focus:ring-forest/30'
                    }`}
                    aria-invalid={!!(touched.travelerCount && errors.travelerCount)}
                    aria-describedby={errors.travelerCount ? 'travelerCount-error' : undefined}
                    required
                  >
                    <option value="1">1 Solo Traveler</option>
                    <option value="2">2 Travelers (Duo / Couple)</option>
                    <option value="3">3 Travelers</option>
                    <option value="4">4 Travelers (Small Group)</option>
                    <option value="5">5 Travelers</option>
                    <option value="6">6 Travelers</option>
                    <option value="7">7 Travelers</option>
                    <option value="8">8 Travelers (Max Group)</option>
                  </select>
                </div>
                {touched.travelerCount && errors.travelerCount && (
                  <p id="travelerCount-error" className="mt-1.5 text-xs text-red-600 font-medium">
                    {errors.travelerCount}
                  </p>
                )}
              </div>

              {/* Special Requests (Textarea) */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="specialRequests"
                  className="block text-xs font-bold uppercase tracking-wider text-charcoal mb-2"
                >
                  Special Requests or Dietary Preferences <span className="text-xs text-charcoal-muted normal-case font-normal">(Optional)</span>
                </label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  rows={3}
                  value={formData.specialRequests}
                  onChange={handleChange}
                  placeholder="Tell us about special occasions, dietary restrictions, preferred flight connection hubs, or pace preferences..."
                  className="w-full px-4 py-3 rounded-xl border border-sand-dark bg-sand-light/40 text-sm font-medium text-charcoal placeholder-charcoal-muted/50 focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/30 transition-colors"
                />
              </div>
            </div>

            {/* Privacy & Guarantees note */}
            <div className="mt-6 flex items-center gap-2 text-xs text-charcoal-muted">
              <ShieldCheck className="w-4 h-4 text-forest flex-shrink-0" />
              <span>
                Zero spam promise. We only use your contact details to plan this bespoke itinerary.
              </span>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-full bg-terracotta hover:bg-terracotta-light text-white font-semibold text-base shadow-lg hover:shadow-xl active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60 focus:outline-none focus:ring-4 focus:ring-terracotta/40"
              >
                {isSubmitting ? (
                  <span>Transmitting Inquiry...</span>
                ) : (
                  <>
                    <span>Submit Booking Inquiry</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
};
