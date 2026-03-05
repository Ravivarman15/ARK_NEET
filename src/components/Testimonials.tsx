import { motion } from 'framer-motion';
import { FaStar, FaCheckCircle } from 'react-icons/fa';

const testimonials = [
  {
    id: 1,
    name: 'Aarav M.',
    role: 'NEET Aspirant',
    review: 'I used to score around 420 in mocks. After following the ARK booklet system, my accuracy improved dramatically. The trap questions stopped fooling me, and Biology became predictable. I crossed 610 in my final tests.',
    highlight: 'Score jump / accuracy improvement',
    rating: 5,
  },
  {
    id: 2,
    name: 'Priya R.',
    role: 'Parent',
    review: 'We were worried about negative marking and consistency. ARK\'s structured material gave my daughter clarity on what to attempt and what to skip. Her confidence and marks both improved within months.',
    highlight: 'Confidence + parental trust',
    rating: 5,
  },
  {
    id: 3,
    name: 'Karthik S.',
    role: 'Repeater Student',
    review: 'I had knowledge but couldn\'t convert it into marks. The PYQ and NCERT line-by-line training helped me recognise patterns instantly. I finally started scoring what I deserved.',
    highlight: 'Pattern recognition → marks',
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-ark-blue relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-ark-yellow/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-ark-yellow/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Social Proof Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16"
        >
          {[
            { stat: '650+', label: 'Students Score 600+' },
            { stat: '95%', label: 'Success Rate' },
            { stat: '1000+', label: 'Score Improvements' },
            { stat: '10+ Yrs', label: 'Expert Guidance' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="bg-ark-white/10 backdrop-blur-sm border border-ark-white/20 rounded-xl p-6 text-center"
            >
              <p className="text-3xl md:text-4xl font-bold text-ark-yellow mb-2">
                {item.stat}
              </p>
              <p className="text-ark-white/80 text-sm">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-ark-yellow font-semibold text-sm uppercase tracking-wider">
            Real Student Results
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-ark-white mt-4 mb-4">
            See What Our Students Achieved
          </h2>
          <p className="text-ark-white/80 text-lg">
            Scroll through real testimonials from students who improved their NEET scores using our system.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-ark-white/5 backdrop-blur-sm border border-ark-white/10 rounded-2xl p-8 hover:bg-ark-white/8 transition-colors flex flex-col"
            >
              {/* Star Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-ark-yellow text-lg" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-ark-white/90 text-base leading-relaxed mb-6 flex-grow">
                "{testimonial.review}"
              </p>

              {/* Highlight Tag */}
              <div className="mb-6">
                <span className="inline-block bg-ark-yellow/20 text-ark-yellow text-xs font-semibold px-3 py-1 rounded-full">
                  {testimonial.highlight}
                </span>
              </div>

              {/* Author Info */}
              <div className="border-t border-ark-white/10 pt-6">
                <h3 className="text-lg font-bold text-ark-white">
                  {testimonial.name}
                </h3>
                <p className="text-ark-white/60 text-sm">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center"
        >
          <a
            href="#programme"
            className="bg-ark-yellow hover:bg-ark-yellow/90 text-ark-blue font-bold py-4 px-10 rounded-xl transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center gap-2"
          >
            <FaCheckCircle className="text-ark-blue" />
            <span>Join 650+ Top Scorers Now</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
