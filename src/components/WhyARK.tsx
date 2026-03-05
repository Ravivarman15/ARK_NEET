import { motion } from 'framer-motion';
import { FaCalendarCheck, FaClipboardList, FaBookReader, FaChartLine, FaUserTie } from 'react-icons/fa';

const WhyARK = () => {
  const reasons = [
    {
      icon: FaCalendarCheck,
      title: 'Structured Daily Learning',
      description: 'Systematic schedule designed for consistent progress',
    },
    {
      icon: FaClipboardList,
      title: 'Continuous Testing Culture',
      description: 'Regular assessments to build exam temperament',
    },
    {
      icon: FaBookReader,
      title: 'Strong NCERT Alignment',
      description: 'Every concept tied back to NCERT for clarity',
    },
    {
      icon: FaChartLine,
      title: 'Individual Performance Tracking',
      description: 'Personalized insights to improve consistently',
    },
    {
      icon: FaUserTie,
      title: 'Result-Focused Mentoring',
      description: 'Expert guidance from experienced NEET faculty',
    },
  ];

  return (
    <section id="why-ark" className="py-20 bg-ark-blue relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-ark-yellow/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-ark-yellow/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-ark-yellow font-semibold text-sm uppercase tracking-wider">
            The ARK Advantage
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-ark-white mt-4 mb-6">
            Why Choose This Programme?
          </h2>
          <p className="text-ark-white/80 text-lg">
            A system built on discipline, clarity, and results
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-ark-white/5 backdrop-blur-sm border border-ark-white/10 rounded-2xl p-6 hover:bg-ark-white/10 transition-colors ${
                index === 4 ? 'md:col-span-2 lg:col-span-1 lg:col-start-2' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-ark-yellow flex items-center justify-center mb-4">
                <reason.icon className="text-xl text-ark-blue" />
              </div>
              <h3 className="text-lg font-bold text-ark-white mb-2">
                {reason.title}
              </h3>
              <p className="text-ark-white/70 text-sm">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyARK;
