import { motion } from 'framer-motion';
import { FaBookOpen, FaChalkboardTeacher, FaPenFancy, FaClipboardList } from 'react-icons/fa';

const ProgrammeStructure = () => {
  const structures = [
    {
      icon: FaBookOpen,
      title: 'Complete Syllabus Coverage',
      points: [
        'Full Class 11 & Class 12 syllabus',
        'Chapter sequencing based on NEET weightage',
        'NCERT-focused teaching approach',
      ],
    },
    {
      icon: FaChalkboardTeacher,
      title: 'Teaching Methodology',
      points: [
        'Concept-first explanation',
        'Numerical problem-solving (Physics & Chemistry)',
        'NCERT line-by-line clarity (Biology)',
        'Application-oriented MCQ discussions',
      ],
    },
    {
      icon: FaPenFancy,
      title: 'Practice Framework',
      points: [
        'Topic-wise MCQs',
        'Previous Year Questions (Last 15 years)',
        'NEET pattern assertion–reason & match-type questions',
        'Difficulty progression: Easy → Moderate → NEET Level',
      ],
    },
    {
      icon: FaClipboardList,
      title: 'Testing System',
      points: [
        'Weekly chapter tests',
        'Monthly cumulative tests',
        'Full-length NEET mock tests',
        'Real exam simulation',
      ],
    },
  ];

  return (
    <section id="programme" className="py-20 bg-ark-blue">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-ark-yellow font-semibold text-sm uppercase tracking-wider">
            How We Prepare You
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-ark-white mt-4 mb-6">
            Core Programme Structure
          </h2>
          <p className="text-ark-white/80 text-lg">
            A comprehensive framework designed for NEET success
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {structures.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-ark-white/5 backdrop-blur-sm border border-ark-white/10 rounded-2xl p-6 lg:p-8 hover:bg-ark-white/10 transition-colors duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-ark-yellow flex items-center justify-center flex-shrink-0">
                  <item.icon className="text-xl text-ark-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ark-white mb-4">
                    {item.title}
                  </h3>
                  <ul className="space-y-2">
                    {item.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-ark-white/80">
                        <span className="w-1.5 h-1.5 bg-ark-yellow rounded-full mt-2 flex-shrink-0"></span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgrammeStructure;
