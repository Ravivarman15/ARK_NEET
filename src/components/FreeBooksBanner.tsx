import { motion } from 'framer-motion';
import { FaBook, FaCheckCircle, FaShoppingCart, FaGraduationCap } from 'react-icons/fa';
import { HiAcademicCap, HiCurrencyRupee } from 'react-icons/hi2';

const FreeBooksBanner = () => {
  const books = [
    { title: 'CORE 100', subject: 'Safety Net' },
    { title: 'BIOLOGY 360', subject: 'Mastery' },
    { title: 'NCERT Line-by-Line', subject: 'Predictor' },
    { title: 'PYQ Pattern', subject: 'Forecaster' },
    { title: 'Trap & Confusion', subject: 'Bank' },
    { title: 'High Weight Areas', subject: 'Booster' },
  ];

  const bookFeatures = [
    'Targeted mark improvement',
    'NCERT-aligned questions',
    'Pattern & trend analysis',
    'Quick revision tools',
  ];

  return (
    <section id="free-books" className="py-20 bg-secondary relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-ark-yellow/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-ark-blue/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <span className="text-ark-yellow font-semibold text-sm uppercase tracking-wider">
            Study Materials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">
            6 Essential NEET Preparation Booklets
          </h2>
          <p className="text-muted-foreground text-lg">
            High-impact study materials designed to maximize your marks with targeted preparation
          </p>
        </motion.div>

        {/* 6 Book Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {books.map((book, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative rounded-xl p-4 transition-all duration-300 text-center group overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 213, 0, 0.08) 0%, rgba(255, 255, 255, 0.95) 100%)',
                boxShadow: 'inset 0 1px 0 rgba(255, 213, 0, 0.4), inset 0 -1px 0 rgba(0, 0, 0, 0.05), 0 8px 20px rgba(0, 0, 0, 0.08), 0 0 20px rgba(255, 213, 0, 0.12)',
                border: '1.5px solid rgba(255, 213, 0, 0.3)',
              }}
            >
              {/* Yellow Emboss Highlight - Top */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-ark-yellow to-transparent opacity-60" />
              
              {/* Subtle Yellow Glow on Hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: 'inset 0 0 15px rgba(255, 213, 0, 0.2)',
                }}
              />

              <div className="relative z-10">
                <div className="w-12 h-12 mx-auto bg-gradient-to-br from-ark-blue to-ark-blue/80 rounded-lg flex items-center justify-center mb-3 group-hover:from-ark-yellow group-hover:to-ark-yellow/80 transition-all duration-300 shadow-lg"
                  style={{
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 3px 10px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  <FaBook className="text-ark-white text-xl group-hover:text-ark-blue transition-colors" />
                </div>
                <span className="text-xs font-semibold text-ark-yellow bg-gradient-to-r from-ark-yellow/20 to-ark-yellow/10 px-2 py-0.5 rounded border border-ark-yellow/30 inline-block drop-shadow-sm">
                  {book.subject}
                </span>
                <h4 className="text-sm font-semibold text-foreground mt-2 leading-tight">
                  {book.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Book Features */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {bookFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center gap-2 bg-ark-white px-4 py-2 rounded-full shadow-sm"
            >
              <FaCheckCircle className="text-ark-yellow text-sm" />
              <span className="text-sm font-medium text-foreground">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* Two Options */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Option 1: Buy Books */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-ark-white rounded-2xl p-6 md:p-8 border-2 border-transparent hover:border-ark-blue/20 transition-all shadow-card"
            >
              <div className="inline-flex items-center gap-2 bg-muted text-foreground px-4 py-2 rounded-full mb-4">
                <HiCurrencyRupee className="text-lg" />
                <span className="font-semibold text-sm">Purchase Separately</span>
              </div>

              <h3 className="text-xl font-bold text-foreground mb-2">
                Buy Booklets Only
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Get all 6 strategic booklets designed to improve your NEET score
              </p>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl font-bold text-ark-blue">₹4,999</span>
                <span className="text-muted-foreground line-through text-sm">₹7,194</span>
              </div>

              <a
                href="#booklets"
                className="w-full inline-flex items-center justify-center gap-2 bg-ark-blue text-ark-white font-semibold py-3 px-6 rounded-xl hover:bg-ark-blue/90 transition-colors"
              >
                <FaShoppingCart />
                Buy Booklets
              </a>
            </motion.div>

            {/* Option 2: Get Free with Enrollment */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-ark-blue rounded-2xl p-6 md:p-8 border-2 border-ark-yellow shadow-yellow relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-ark-yellow text-ark-blue text-xs font-bold px-4 py-1 rounded-bl-xl">
                BEST VALUE
              </div>

              <div className="inline-flex items-center gap-2 bg-ark-yellow/20 text-ark-yellow px-4 py-2 rounded-full mb-4">
                <HiAcademicCap className="text-lg" />
                <span className="font-semibold text-sm">With Enrollment</span>
              </div>

              <h3 className="text-xl font-bold text-ark-white mb-2">
                Get All Booklets FREE
              </h3>
              <p className="text-ark-white/80 text-sm mb-4">
                Enroll in our Online or Offline NEET Programme and receive all 6 strategic booklets absolutely free!
              </p>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl font-bold text-ark-yellow">FREE</span>
                <span className="text-ark-white/60 line-through text-sm">₹4,999</span>
                <span className="text-ark-white/80 text-sm">with enrollment</span>
              </div>

              <a
                href="#programme"
                className="w-full inline-flex items-center justify-center gap-2 bg-ark-yellow text-ark-blue font-semibold py-3 px-6 rounded-xl hover:bg-ark-yellow/90 transition-colors"
              >
                <FaGraduationCap />
                View Programmes
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeBooksBanner;
