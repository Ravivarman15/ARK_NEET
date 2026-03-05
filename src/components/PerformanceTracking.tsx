import { motion } from 'framer-motion';
import { FaChartBar, FaSearch, FaFileAlt, FaBell } from 'react-icons/fa';

const PerformanceTracking = () => {
  const metrics = [
    {
      icon: FaChartBar,
      title: 'Accuracy & Speed Analysis',
      value: '95%',
      description: 'Track your solving speed and accuracy trends',
    },
    {
      icon: FaSearch,
      title: 'Weak-Area Identification',
      value: '15+',
      description: 'Topic-wise performance breakdown',
    },
    {
      icon: FaFileAlt,
      title: 'Individual Progress Reports',
      value: 'Weekly',
      description: 'Detailed reports with improvement suggestions',
    },
    {
      icon: FaBell,
      title: 'Parent Updates',
      value: 'Regular',
      description: 'Keep parents informed at regular intervals',
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-ark-yellow font-semibold text-sm uppercase tracking-wider">
            Data-Driven Progress
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
            Performance Tracking
          </h2>
          <p className="text-muted-foreground text-lg">
            Stay on top of your preparation with detailed analytics
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-ark-white border border-border rounded-2xl p-6 text-center group hover:border-ark-yellow hover:shadow-yellow transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-ark-blue text-ark-white mb-4 group-hover:bg-ark-yellow group-hover:text-ark-blue transition-colors duration-300">
                <metric.icon className="text-2xl" />
              </div>
              <p className="text-3xl font-bold text-ark-blue mb-2">{metric.value}</p>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {metric.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PerformanceTracking;
