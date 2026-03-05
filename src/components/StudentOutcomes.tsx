import { motion } from 'framer-motion';
import { HiCheckCircle } from 'react-icons/hi2';

const StudentOutcomes = () => {
  const outcomes = [
    'Strong conceptual foundation',
    'High MCQ-solving efficiency',
    'Improved speed & accuracy',
    'Exam confidence & discipline',
    'Clear admission roadmap',
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="text-ark-yellow font-semibold text-sm uppercase tracking-wider">
              What You'll Achieve
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4">
              Student Outcomes
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-ark-white rounded-2xl p-8 md:p-12 shadow-card"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {outcomes.map((outcome, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-secondary hover:bg-ark-yellow/10 transition-colors group"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring",
                      stiffness: 300,
                      delay: index * 0.1 + 0.2 
                    }}
                  >
                    <HiCheckCircle className="text-3xl text-ark-yellow group-hover:scale-110 transition-transform" />
                  </motion.div>
                  <span className="text-foreground font-medium text-lg">{outcome}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StudentOutcomes;
