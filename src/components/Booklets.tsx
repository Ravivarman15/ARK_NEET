import { motion } from 'framer-motion';
import { FaBook, FaWhatsapp, FaArrowRight, FaCheckCircle, FaClock, FaBullseye, FaTrophy, FaShoppingCart } from 'react-icons/fa';
import { GiDna1 } from 'react-icons/gi';
import { HiCheckCircle } from 'react-icons/hi2';
import EmailSignupForm from './EmailSignupForm';

const phoneNumber = "917639399217";

const booklets = [
  {
    id: 'core-100',
    title: 'CORE 100',
    subtitle: '400+ Safety Net',
    price: 1499,
    speciality: ['High-frequency questions', 'Fast answering', 'Low risk', 'Builds minimum score'],
    use: ['Revise before every mock', 'Attempt first in exam', 'Revisit every 10–15 days'],
    outcome: '380–420 becomes stable',
    whatsappMessage: 'Hi ARK Team, I am interested in the CORE 100 booklet. Please share details.',
  },
  {
    id: 'bio-360',
    title: 'BIOLOGY 360 LOCK™',
    subtitle: 'Complete Mastery',
    price: 1999,
    speciality: ['NCERT statement mastery', 'Diagram dominance', 'Confusion pair elimination'],
    use: ['Revise every 7–10 days', 'Practice elimination', 'Final months main source'],
    outcome: '350–360 achievable',
    whatsappMessage: 'Hi ARK Team, I am interested in the BIOLOGY 360 LOCK booklet. Please share details.',
  },
  {
    id: 'ncert-line',
    title: 'NCERT LINE-BY-LINE',
    subtitle: 'Predictor',
    price: 1299,
    speciality: ['Every table covered', 'Footnotes highlighted', 'Hidden lines revealed'],
    use: ['Along with reading', 'Chapter completion', 'Before tests'],
    outcome: 'No surprises in exam',
    whatsappMessage: 'Hi ARK Team, I am interested in the NCERT LINE-BY-LINE booklet. Please share details.',
  },
  {
    id: 'pyq-forecaster',
    title: 'PYQ PATTERN',
    subtitle: 'Trend Forecaster',
    price: 999,
    speciality: ['15+ years analysis', 'Pattern recognition', 'Difficulty mapping'],
    use: ['After chapters', 'Monthly revisions'],
    outcome: 'Faster mark conversion',
    whatsappMessage: 'Hi ARK Team, I am interested in the PYQ PATTERN & TREND FORECASTER. Please share details.',
  },
  {
    id: 'trap-bank',
    title: 'TRAP & CONFUSION',
    subtitle: 'Bank',
    price: 699,
    speciality: ['Negative prevention', 'Elimination training', 'High ROI'],
    use: ['Before mocks', 'Final weeks'],
    outcome: 'Saves 40–70 marks',
    whatsappMessage: 'Hi ARK Team, I am interested in the TRAP & CONFUSION BANK. Please share details.',
  },
  {
    id: 'high-weight',
    title: 'HIGH WEIGHT',
    subtitle: 'Low Effort Areas',
    price: 899,
    speciality: ['Max marks per hour', 'Good for repeaters'],
    use: ['Last 6–8 months', 'Before tests'],
    outcome: '+80–110 improvement',
    whatsappMessage: 'Hi ARK Team, I am interested in the HIGH WEIGHT LOW EFFORT booklet. Please share details.',
  },
];

const bundles = [
  {
    name: 'BIOLOGY MASTER',
    subtitle: 'For Biology Excellence',
    price: 3499,
    includes: ['Biology 360', 'NCERT Line-by-Line', 'Trap Bank'],
    forWho: 'Weak in Biology • Parents seeking focused help',
    whatsappMessage: 'Hi ARK Team, I want the BIOLOGY MASTER BUNDLE. Please share details.',
    popular: false,
  },
  {
    name: '400+ FOUNDATION',
    subtitle: 'For Score Security',
    price: 2999,
    includes: ['CORE 100', 'Biology 360'],
    forWho: 'Repeaters • Minimum score anxiety',
    whatsappMessage: 'Hi ARK Team, I want the 400+ FOUNDATION BUNDLE. Please share details.',
    popular: false,
  },
  {
    name: 'FULL RANK BOOSTER',
    subtitle: 'Complete Coverage',
    price: 4999,
    includes: ['All 6 booklets'],
    forWho: 'Serious aspirants • 600+ target',
    whatsappMessage: 'Hi ARK Team, I want the FULL RANK BOOSTER. Please share details.',
    popular: true,
  },
];

interface BookletsProps {
  onBuyClick?: (productId: string) => void;
}

const Booklets = ({ onBuyClick }: BookletsProps) => {
  return (
    <section id="booklets" className="py-20 bg-secondary relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-ark-yellow/5 rounded-full blur-3xl -translate-x-1/3 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-ark-yellow/5 rounded-full blur-3xl translate-x-1/4 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Compelling Header with Clear Value Prop */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-ark-yellow font-semibold text-sm uppercase tracking-wider">
            Boost Your Score Fast
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">
            6 Proven NEET Study Kits To Improve Scores in Just 60 Days
          </h2>
          <p className="text-muted-foreground text-lg">
            Strategic topic mastery booklets + revision guides that target high-weightage chapters. Get FREE with enrollment or buy individually.
          </p>

          {/* Urgency & Guarantee Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mt-6 p-3 bg-ark-yellow/10 border border-ark-yellow/30 rounded-lg text-sm text-foreground flex items-center justify-center gap-2"
          >
            <FaClock className="text-ark-yellow" />
            <span className="font-semibold">Limited Time Offer</span> — Claim your FREE study kit with enrollment before spots fill up
          </motion.div>
        </motion.div>

        {/* Email Signup Form - Lead Magnet */}
        <EmailSignupForm />

        {/* Booklet Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 mb-20">
          {booklets.map((booklet, index) => (
            <motion.div
              key={booklet.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="relative rounded-2xl p-6 transition-all duration-300 group booklet-card overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 213, 0, 0.08) 0%, rgba(255, 255, 255, 0.95) 100%)',
                boxShadow: 'inset 0 1px 0 rgba(255, 213, 0, 0.4), inset 0 -1px 0 rgba(0, 0, 0, 0.05), 0 10px 25px rgba(0, 0, 0, 0.1), 0 0 30px rgba(255, 213, 0, 0.15)',
                border: '2px solid rgba(255, 213, 0, 0.3)',
              }}
            >
              {/* Yellow Emboss Highlight - Top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-ark-yellow to-transparent opacity-60" />

              {/* Subtle Yellow Glow on Hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  boxShadow: 'inset 0 0 20px rgba(255, 213, 0, 0.2)',
                }}
              />

              <div className="relative z-10">
                {/* Header with Icon & Price */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ark-blue to-ark-blue/80 flex items-center justify-center group-hover:from-ark-yellow group-hover:to-ark-yellow/80 transition-all duration-300 shadow-lg"
                    style={{
                      boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 4px 12px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    <FaBook className="text-xl text-ark-white group-hover:text-ark-blue transition-colors" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold bg-gradient-to-r from-ark-blue to-ark-yellow bg-clip-text text-transparent">₹{booklet.price}</div>
                  </div>
                </div>

                {/* Title */}
                <div className="mb-5">
                  <h3 className="text-lg font-bold text-foreground">{booklet.title}</h3>
                  <p className="text-sm text-ark-yellow font-semibold drop-shadow-sm">{booklet.subtitle}</p>
                </div>

                {/* Speciality */}
                <div className="mb-5 pb-5 border-b border-ark-yellow/30">
                  <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                    Speciality
                  </h4>
                  <ul className="space-y-2">
                    {booklet.speciality.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-gradient-to-br from-ark-yellow to-ark-yellow/70 rounded-full flex-shrink-0 shadow-sm"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* How to Use */}
                <div className="mb-5 pb-5 border-b border-ark-yellow/30">
                  <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                    How to Use
                  </h4>
                  <ul className="space-y-2">
                    {booklet.use.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 bg-ark-blue rounded-full flex-shrink-0 mt-1"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Outcome */}
                <div className="mb-6 p-4 rounded-xl transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 213, 0, 0.15) 0%, rgba(255, 213, 0, 0.08) 100%)',
                    boxShadow: 'inset 0 1px 0 rgba(255, 213, 0, 0.3), 0 4px 12px rgba(255, 213, 0, 0.1)',
                    border: '1.5px solid rgba(255, 213, 0, 0.25)',
                  }}
                >
                  <div className="flex items-center gap-2 text-sm font-semibold text-ark-blue">
                    <HiCheckCircle className="text-ark-yellow drop-shadow-sm" />
                    {booklet.outcome}
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => onBuyClick ? onBuyClick(booklet.id) : window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(booklet.whatsappMessage)}`, '_blank', 'noopener,noreferrer')}
                  className="btn-primary w-full inline-flex items-center justify-center gap-2 relative overflow-hidden group/btn"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-ark-yellow/0 via-ark-white/20 to-ark-yellow/0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  <FaShoppingCart />
                  Buy Now — ₹{booklet.price}
                  <FaArrowRight className="text-xs" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total Impact Section - Benefits Focused */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-ark-white rounded-2xl p-8 shadow-card mb-16"
        >
          <h3 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-3">
            <span className="w-10 h-10 rounded-lg bg-ark-yellow flex items-center justify-center">
              <HiCheckCircle className="text-lg text-ark-blue" />
            </span>
            Realistic Score Impact (When Used Strategically)
          </h3>
          <p className="text-muted-foreground mb-6">
            See exactly how each booklet contributes to your final NEET score:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'NCERT Line-by-Line', marks: '220–260', benefit: 'Complete syllabus mastery' },
              { label: 'PYQ Trend', marks: '120–150', benefit: 'Pattern recognition' },
              { label: 'Trap Bank', marks: '40–70', benefit: 'Eliminate careless mistakes' },
              { label: 'High Weight Areas', marks: '80–110', benefit: 'Fast mark boost' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-secondary hover:bg-ark-yellow/10 transition-colors border border-border">
                <p className="text-sm font-semibold text-foreground mb-2">{item.label}</p>
                <p className="text-2xl font-bold text-ark-yellow mb-2">{item.marks}</p>
                <p className="text-xs text-muted-foreground italic">{item.benefit}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-xl bg-ark-blue">
            <p className="text-ark-white text-center">
              <span className="text-sm text-ark-white/80">POTENTIAL SCORE IMPROVEMENT</span>
              <br />
              <span className="text-2xl font-bold text-ark-yellow">+110 to +230 marks</span>
              <br />
              <span className="text-xs text-ark-white/70 mt-1">Depending on baseline & consistency</span>
            </p>
          </div>
        </motion.div>

        {/* Bundles Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-ark-yellow font-semibold text-sm uppercase tracking-wider">
              Two Proven Paths To Success
            </span>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mt-4">
              Your Choice: FREE With Program or Buy Separately
            </h3>
            <p className="text-muted-foreground text-lg mt-3">
              Pick the option that fits your timeline. Most students choose the program for complete guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* FREE Option - Featured First */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl p-8 shadow-yellow border-2 border-ark-yellow bg-ark-blue text-ark-white group order-first md:order-last"
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-ark-yellow text-ark-blue text-xs font-bold px-6 py-2 rounded-full flex items-center gap-1.5">
                <FaTrophy className="text-sm" />
                <span>BEST VALUE - RECOMMENDED</span>
              </div>

              <h4 className="text-2xl font-bold text-ark-white mb-2">
                Get All 6 Booklets FREE
              </h4>
              <p className="text-ark-white/80 text-sm mb-6">
                Enroll in Online or Offline NEET Program → Get all 6 booklets FREE + personalized guidance
              </p>

              {/* Price */}
              <div className="mb-6 p-4 rounded-xl bg-ark-white/10">
                <p className="text-xs font-semibold uppercase tracking-wider text-ark-white/80 mb-1">
                  Value
                </p>
                <p className="text-3xl font-bold text-ark-yellow">
                  FREE
                </p>
                <p className="text-xs text-ark-white/70 mt-1">Worth ₹4,999</p>
              </div>

              {/* Benefits */}
              <div className="mb-6 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-ark-white/80 mb-3">
                  Plus You Get
                </p>
                {['Daily live classes & doubt sessions', 'Weekly performance tracking', 'Monthly rank simulations', 'Expert faculty mentorship', 'Peer learning community'].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-ark-white/90">
                    <span className="text-ark-yellow text-lg">✓</span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => window.location.href = '#programme'}
                className="w-full bg-ark-yellow text-ark-blue font-bold py-3 px-6 rounded-lg hover:bg-ark-white transition-all duration-300 flex items-center justify-center gap-2 text-lg group-hover:shadow-lg"
              >
                Start Your Program Now
                <FaArrowRight className="text-sm" />
              </button>

              <p className="text-xs text-ark-white/60 text-center mt-4">
                Most popular choice among serious NEET aspirants
              </p>
            </motion.div>

            {/* Buy Only Option */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="rounded-2xl p-8 bg-ark-white shadow-card border border-border"
            >
              <h4 className="text-2xl font-bold text-foreground mb-2">
                Buy Booklets Only
              </h4>
              <p className="text-muted-foreground text-sm mb-6">
                Self-paced learning with our 6 strategic booklets. Perfect for independent learners.
              </p>

              {/* Price */}
              <div className="mb-6 p-4 rounded-xl bg-secondary">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Price
                </p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-ark-blue">₹4,999</p>
                  <p className="text-muted-foreground line-through">₹7,194</p>
                </div>
                <p className="text-xs text-muted-foreground mt-1">30% savings on bundled books</p>
              </div>

              {/* What's Included */}
              <div className="mb-6 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  What You Get
                </p>
                {['All 6 strategic booklets', 'Lifetime access', 'Study at your own pace', 'Topic-wise breakdown', 'Success stories inside'].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="text-ark-yellow text-lg">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onBuyClick ? onBuyClick('bundle-full-rank-booster') : window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent('Hi ARK Team, I want to buy the booklet bundle. Please share details.')}`, '_blank', 'noopener,noreferrer')}
                className="w-full bg-ark-blue text-ark-white font-bold py-3 px-6 rounded-lg hover:bg-ark-blue/90 transition-colors flex items-center justify-center gap-2 text-lg"
              >
                <FaShoppingCart />
                Buy Now — ₹4,999
              </button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Quick access to study materials
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Who Should Get These Booklets - Benefits Focused */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-ark-white rounded-2xl p-8 shadow-card mb-12"
        >
          <h3 className="text-2xl font-bold text-foreground mb-2 text-center">Perfect For These Students</h3>
          <p className="text-center text-muted-foreground mb-8">These booklets give you the exact edge you need:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Biology Struggles?',
                benefits: ['NCERT mastery guides → +70 marks', 'Diagram dominance materials', 'Confusion pair elimination'],
              },
              {
                title: 'Running Out Of Time?',
                benefits: ['High-weight chapter focus → +85 marks', 'Quick revision shortcuts', 'Last-minute prep guides'],
              },
              {
                title: 'Aiming For Excellence?',
                benefits: ['Complete syllabus coverage → +150 marks', 'PYQ pattern mastery', 'Competitive edge strategies'],
              },
            ].map((segment, idx) => (
              <div key={idx} className="p-6 rounded-xl bg-secondary hover:shadow-elevated hover:bg-ark-yellow/5 transition-all border border-border">
                <h4 className="font-bold text-foreground mb-4 text-lg flex items-center gap-2">
                  {idx === 0 && <GiDna1 className="text-ark-yellow" />}
                  {idx === 1 && <FaClock className="text-ark-yellow" />}
                  {idx === 2 && <FaBullseye className="text-ark-yellow" />}
                  <span>{segment.title}</span>
                </h4>
                <ul className="space-y-3">
                  {segment.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="w-1.5 h-1.5 bg-ark-yellow rounded-full flex-shrink-0 mt-1.5"></span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-foreground mb-4">Ready To Boost Your NEET Score?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Choose your path below. The FREE option with enrollment includes live guidance + all booklets. The buy option gives you instant access to study materials.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#programme"
              className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4 cursor-pointer"
            >
              <FaCheckCircle /> Get FREE With Program
            </a>
            <button
              onClick={() => onBuyClick ? onBuyClick('bundle-full-rank-booster') : window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent('Hi ARK Team, I want to buy the booklets. Please share details.')}`, '_blank', 'noopener,noreferrer')}
              className="btn-secondary inline-flex items-center gap-2 text-lg px-8 py-4"
            >
              <FaShoppingCart /> Buy Booklets — ₹4,999
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Booklets;
