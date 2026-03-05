import { motion } from 'framer-motion';
import { FaWhatsapp, FaClock, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

const phoneNumber = "917639399217";
const message = "Hi ARK Team, I reviewed my diagnostic report and would like to proceed with consulting.";
const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

const FinalCTA = () => {
  return (
    <>
      <section id="final-cta" className="py-20 md:py-28 gradient-hero relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-ark-yellow/10 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-ark-yellow/20 text-ark-yellow px-4 py-2 rounded-full mb-8"
            >
              <HiSparkles />
              <FaClock className="text-ark-yellow" />
              <span className="font-semibold text-sm">Limited spots available this month</span>
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ark-white mb-6">
              Ready To Boost Your NEET Score By{' '}
              <span className="text-ark-yellow">+100 to +200 Marks?</span>
            </h2>

            <p className="text-ark-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              <span className="font-semibold">Enroll now to get 6 FREE strategic study books + live classes + mentorship.</span> Most enrolled students see improvements within 30 days.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <a
                href="#programme"
                className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-3 text-lg px-8 py-4"
              >
                <span>See Programs & Enroll</span>
                <FaArrowRight />
              </a>
              <button
                onClick={() => window.open(whatsappURL, '_blank', 'noopener,noreferrer')}
                className="btn-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2 text-lg px-8 py-4 cursor-pointer"
              >
                <FaWhatsapp className="text-xl" />
                WhatsApp Your Questions
              </button>
            </div>

            <p className="text-ark-white/60 text-sm flex items-center justify-center gap-1">
              <FaCheckCircle className="text-ark-yellow text-sm" />
              <span>Free consultation • No commitment needed • Chat with our NEET experts</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky Mobile CTA - Only show if not in view */}
      <div className="sticky-cta-mobile">
        <button
          onClick={() => window.open(whatsappURL, '_blank', 'noopener,noreferrer')}
          className="btn-primary w-full inline-flex items-center justify-center gap-2 text-base py-3"
        >
          <FaWhatsapp />
          Chat on WhatsApp
        </button>
      </div>
    </>
  );
};

export default FinalCTA;
