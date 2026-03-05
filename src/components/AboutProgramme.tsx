import { motion } from 'framer-motion';
import { FaGraduationCap, FaChartLine, FaClipboardCheck, FaUsers } from 'react-icons/fa';

const AboutProgramme = () => {
  const highlights = [
    {
      icon: FaGraduationCap,
      title: 'Strong Conceptual Clarity',
      description: 'Build rock-solid foundations in Physics, Chemistry & Biology',
    },
    {
      icon: FaClipboardCheck,
      title: 'Test-Driven Learning',
      description: 'Continuous testing culture for exam readiness',
    },
    {
      icon: FaChartLine,
      title: 'Performance Tracking',
      description: 'Individual progress reports with weak-area identification',
    },
    {
      icon: FaUsers,
      title: 'Expert Mentoring',
      description: 'Result-focused guidance from experienced faculty',
    },
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-ark-yellow font-semibold text-sm uppercase tracking-wider">
            About The Programme
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
            Your Complete NEET Preparation Partner
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Our NEET UG Preparation Programme is designed to build strong conceptual clarity, 
            exam temperament, and high MCQ accuracy through a structured, test-driven learning 
            system aligned strictly with the NMC NEET UG syllabus.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-elevated text-center group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-ark-blue/5 text-ark-blue mb-4 group-hover:bg-ark-yellow group-hover:text-ark-blue transition-colors duration-300">
                <item.icon className="text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Discipline Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-ark-blue rounded-2xl p-8 md:p-12 text-center"
        >
          <p className="text-ark-white/90 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            The programme integrates{' '}
            <span className="text-ark-yellow font-semibold">teaching, practice, testing, revision, 
            and performance tracking</span>{' '}
            to ensure students are consistently exam-ready.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutProgramme;
