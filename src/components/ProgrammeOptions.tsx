import { motion } from 'framer-motion';
import { FaCalendarAlt, FaClock, FaRedo, FaBolt, FaArrowRight, FaWhatsapp } from 'react-icons/fa';

const phoneNumber = "917639399217";

const ProgrammeOptions = () => {
  const options = [
    {
      title: '2-Year Integrated Programme',
      icon: FaCalendarAlt,
      bestFor: 'Class 11 Students',
      description: 'Complete preparation starting from Class 11 with systematic coverage',
      features: ['Full syllabus coverage', 'Board + NEET preparation', 'Extended practice time'],
      popular: true,
      whatsappMessage: "Hi ARK Team, I am interested in the 2-Year Integrated Programme for Class 11 students. Please share more details.",
    },
    {
      title: '1-Year Programme',
      icon: FaClock,
      bestFor: 'Class 12 Students',
      description: 'Intensive preparation focused on Class 12 and revision',
      features: ['Complete NEET syllabus', 'Intensive testing', 'Focused mentoring'],
      popular: false,
      whatsappMessage: "Hi ARK Team, I am interested in the 1-Year Programme for Class 12 students. Please share more details.",
    },
    {
      title: 'Repeater / Dropper Programme',
      icon: FaRedo,
      bestFor: 'NEET Repeaters',
      description: 'Specialized program for students attempting NEET again',
      features: ['Gap analysis', 'Targeted improvement', 'Mental conditioning'],
      popular: false,
      whatsappMessage: "Hi ARK Team, I am interested in the Repeater/Dropper Programme. Please share more details.",
    },
    {
      title: 'NEET Crash Course',
      icon: FaBolt,
      bestFor: 'Quick Revision',
      description: 'Fast-paced revision course for last-minute preparation',
      features: ['Rapid revision', 'Mock test series', 'Key concepts focus'],
      popular: false,
      whatsappMessage: "Hi ARK Team, I am interested in the NEET Crash Course. Please share more details.",
    },
  ];

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-ark-yellow font-semibold text-sm uppercase tracking-wider">
            Choose Your Path
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
            Programme Options
          </h2>
          <p className="text-muted-foreground text-lg">
            Select the programme that fits your preparation timeline
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {options.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-ark-white rounded-2xl p-6 border-2 transition-all duration-300 group cursor-pointer ${
                option.popular
                  ? 'border-ark-yellow shadow-yellow'
                  : 'border-transparent hover:border-ark-yellow hover:shadow-yellow'
              }`}
            >
              {option.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-ark-yellow text-ark-blue text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}

              <div className="w-12 h-12 rounded-xl bg-ark-blue flex items-center justify-center mb-4 group-hover:bg-ark-yellow group-hover:scale-110 transition-all duration-300">
                <option.icon className="text-xl text-ark-white group-hover:text-ark-blue" />
              </div>

              <span className="inline-block text-xs font-semibold text-ark-yellow bg-ark-yellow/10 px-2 py-1 rounded mb-3">
                Best for: {option.bestFor}
              </span>

              <h3 className="text-lg font-bold text-foreground mb-2">
                {option.title}
              </h3>

              <p className="text-muted-foreground text-sm mb-4">
                {option.description}
              </p>

              <ul className="space-y-2 mb-6">
                {option.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 bg-ark-yellow rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(option.whatsappMessage)}`, '_blank', 'noopener,noreferrer')}
                className="inline-flex items-center gap-2 text-ark-blue font-semibold text-sm group-hover:text-ark-yellow transition-colors cursor-pointer"
              >
                <FaWhatsapp className="text-base" />
                Learn More
                <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgrammeOptions;
