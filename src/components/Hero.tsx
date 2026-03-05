import { motion } from 'framer-motion';
import { FaArrowRight, FaGraduationCap, FaBook } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import { FaChartLine } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden pt-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-ark-yellow/10 rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-ark-yellow/5 rounded-full"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-ark-white/10 backdrop-blur-sm border border-ark-white/20 rounded-full px-4 py-2 mb-8"
          >
            <HiSparkles className="text-ark-yellow" />
            <span className="text-ark-white/90 text-sm font-medium">
              NEET UG 2025-26 Admissions Open
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-ark-white leading-tight mb-6"
          >
            NEET Success Kit:{' '}
            <span className="text-ark-yellow">Structured Class system + 6 Free Booklets</span>{' '}
            <br className="hidden md:block" />
            to Improve Your Score Predictably
          </motion.h1>

          {/* Subline - Benefits Focused */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-ark-white/80 mb-10"
          >
            <span className="font-semibold text-ark-yellow">Get all 6 strategic booklets FREE</span> when you enroll + daily live classes, performance tracking & mentorship. <br className="hidden md:block" />
            Or buy booklets separately for self-paced learning. Choose your path now.
          </motion.p>

          {/* CTA Buttons - Outcome Focused */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
          >
            <a
              href="#online"
              className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base px-8 py-4"
            >
              <FaGraduationCap />
              Get FREE Booklets + Online Class
              <FaArrowRight className="text-sm" />
            </a>
            <a
              href="#offline"
              className="btn-secondary w-full sm:w-auto inline-flex items-center justify-center gap-2 text-base px-8 py-4"
            >
              <FaBook />
              Join Offline Program
              <FaArrowRight className="text-sm" />
            </a>
          </motion.div>

          {/* NEET Rank Predictor CTA - Highlighted */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 px-6 py-6 bg-gradient-to-r from-ark-yellow/20 to-ark-yellow/10 border-2 border-ark-yellow/50 rounded-lg backdrop-blur-sm"
          >
            <p className="text-sm md:text-base text-ark-white/90 mb-4 font-medium">
              Want to know your expected NEET rank?
            </p>
            <a
              href="/neet-predictor"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-ark-yellow text-ark-blue font-bold text-base px-8 py-3 rounded-lg hover:bg-ark-yellow/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <FaChartLine />
              Get Your NEET Rank Prediction
              <FaArrowRight className="text-sm" />
            </a>
          </motion.div>

          {/* Trust indicators - Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-12 flex flex-wrap justify-center gap-4 md:gap-6"
          >
            <div className="flex items-center gap-2 bg-ark-yellow/15 border border-ark-yellow/30 rounded-lg px-4 py-2">
              <span className="w-2 h-2 bg-ark-yellow rounded-full"></span>
              <span className="text-sm"><strong className="text-ark-yellow">650+ Students</strong> <span className="text-ark-white/80">crossed 600+ marks</span></span>
            </div>
            <div className="flex items-center gap-2 bg-ark-yellow/15 border border-ark-yellow/30 rounded-lg px-4 py-2">
              <span className="w-2 h-2 bg-ark-yellow rounded-full"></span>
              <span className="text-sm"><strong className="text-ark-yellow">Expert Faculty</strong> <span className="text-ark-white/80">with 10+ years experience</span></span>
            </div>
            <div className="flex items-center gap-2 bg-ark-yellow/10 border border-ark-yellow/20 rounded-lg px-4 py-2">
              <span className="w-2 h-2 bg-ark-yellow/80 rounded-full"></span>
              <span className="text-sm"><strong className="text-ark-white">Proven System</strong> <span className="text-ark-white/80">— NCERT+PYQ focused</span></span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient removed to keep background uniform */}
    </section>
  );
};

export default Hero;
