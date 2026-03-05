import { motion } from 'framer-motion';
import { FaUsers, FaClock, FaQuestionCircle, FaHandshake, FaChalkboard, FaClipboardCheck } from 'react-icons/fa';
import { HiCheckCircle } from 'react-icons/hi2';

const OfflineProgramme = () => {
  const features = [
    { icon: FaUsers, text: 'Limited batch strength' },
    { icon: FaClock, text: 'Fixed timetable & monitored attendance' },
    { icon: FaChalkboard, text: 'Board + smart teaching aids' },
    { icon: HiCheckCircle, text: 'Daily academic discipline' },
  ];

  const doubtResolution = [
    'In-class doubt clearing',
    'Dedicated doubt hours',
    'One-to-one academic support (need-based)',
  ];

  const testing = [
    'Paper-based NEET pattern tests',
    'OMR practice',
    'Exam hall simulation',
  ];

  const parentEngagement = [
    'Periodic Parent–Teacher Meetings',
    'Academic & behavioural feedback',
    'Performance review discussions',
  ];

  return (
    <section id="offline" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-ark-yellow font-semibold text-sm uppercase tracking-wider">
            Classroom Learning
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">
            Offline NEET Programme
          </h2>
          <p className="text-muted-foreground text-lg">
            Structured • Disciplined • Result-Oriented
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Key Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-ark-white rounded-2xl p-8 shadow-card h-full">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-ark-yellow flex items-center justify-center">
                  <FaChalkboard className="text-ark-blue" />
                </span>
                Key Features
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-xl bg-secondary hover:bg-ark-yellow/10 transition-colors"
                  >
                    <feature.icon className="text-ark-blue text-xl mt-0.5 flex-shrink-0" />
                    <span className="text-foreground font-medium text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Doubt Resolution */}
              <div className="mt-8">
                <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <FaQuestionCircle className="text-ark-yellow" />
                  Doubt Resolution
                </h4>
                <ul className="space-y-2">
                  {doubtResolution.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-ark-yellow rounded-full"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Testing & Parent Engagement */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Testing */}
            <div className="bg-ark-white rounded-2xl p-8 shadow-card">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-ark-blue flex items-center justify-center">
                  <FaClipboardCheck className="text-ark-white" />
                </span>
                Testing (Offline)
              </h3>
              <ul className="space-y-3">
                {testing.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
                    <HiCheckCircle className="text-ark-yellow text-xl flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Parent Engagement */}
            <div className="bg-ark-blue rounded-2xl p-8">
              <h3 className="text-xl font-bold text-ark-white mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-lg bg-ark-yellow flex items-center justify-center">
                  <FaHandshake className="text-ark-blue" />
                </span>
                Parent Engagement
              </h3>
              <ul className="space-y-3">
                {parentEngagement.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <HiCheckCircle className="text-ark-yellow text-xl flex-shrink-0" />
                    <span className="text-ark-white/90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OfflineProgramme;
