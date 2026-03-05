import { motion } from 'framer-motion';
import { FaBook, FaArrowRight, FaWhatsapp } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

const phoneNumber = "917639399217";
const message = "Hi ARK Team, I reviewed my diagnostic report and would like to proceed with consulting.";

const fitData = [
  { booklet: 'Booklet 5 (Core 100)', role: 'Locks 380–420' },
  { booklet: 'Booklet 1 (NCERT Line-by-line)', role: 'Pushes to 500+' },
  { booklet: 'Booklet 2 (PYQ Trend)', role: 'Pushes to 580+' },
  { booklet: 'Booklet 3 (Trap)', role: 'Prevents fall' },
  { booklet: 'Booklet 4 (Scoring Areas)', role: 'Final boost' },
];

const impactData = [
  { booklet: 'NCERT Line-by-Line', marks: '220–260' },
  { booklet: 'PYQ Trend Forecaster', marks: '120–150' },
  { booklet: 'Trap Bank', marks: '40–70' },
  { booklet: 'High-Weight Scoring', marks: '80–110' },
];

const BookletInformation = () => {
  return (
    <section id="booklet-info" className="py-20 bg-secondary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-ark-yellow/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-ark-yellow font-semibold text-sm uppercase tracking-wider">
            Score Strategy
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
            How Our Booklets Improve Your{' '}
            <span className="text-ark-yellow">NEET Score</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A systematic approach to maximizing your marks with targeted preparation materials
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Table 1 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-2xl shadow-card overflow-hidden border border-border"
          >
            <div className="bg-ark-blue px-6 py-4 flex items-center gap-3">
              <FaBook className="text-ark-yellow text-lg" />
              <h3 className="text-lg font-bold text-ark-white">
                How This Fits With Other Booklets
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-6 py-3 text-sm font-semibold text-foreground">Booklet</th>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-foreground">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {fitData.map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">{row.booklet}</td>
                      <td className="px-6 py-4 text-sm text-ark-yellow font-semibold">{row.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Table 2 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-2xl shadow-card overflow-hidden border border-border"
          >
            <div className="bg-ark-blue px-6 py-4 flex items-center gap-3">
              <HiSparkles className="text-ark-yellow text-lg" />
              <h3 className="text-lg font-bold text-ark-white">
                Total Realistic Impact
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-6 py-3 text-sm font-semibold text-foreground">Booklet</th>
                    <th className="text-left px-6 py-3 text-sm font-semibold text-foreground">Marks</th>
                  </tr>
                </thead>
                <tbody>
                  {impactData.map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-foreground">{row.booklet}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{row.marks}</td>
                    </tr>
                  ))}
                  {/* Highlighted Total Row */}
                  <tr className="bg-ark-yellow/10">
                    <td className="px-6 py-4 text-sm font-bold text-ark-blue">TOTAL</td>
                    <td className="px-6 py-4 text-sm font-bold text-ark-yellow">460–590 marks</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')}
            className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4 cursor-pointer"
          >
            <FaWhatsapp className="text-xl" />
            Get Your Booklets Now
            <FaArrowRight className="text-sm" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BookletInformation;
