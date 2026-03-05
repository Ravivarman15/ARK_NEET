import { motion } from 'framer-motion';
import { FaUserGraduate, FaRedo, FaStethoscope } from 'react-icons/fa';
import { HiAcademicCap } from 'react-icons/hi2';

const WhoShouldJoin = () => {
  const aspirants = [
    { label: 'Class 11 NEET Aspirants', icon: HiAcademicCap },
    { label: 'Class 12 NEET Aspirants', icon: FaUserGraduate },
    { label: 'NEET Repeaters / Droppers', icon: FaRedo },
    { label: 'Students aiming for MBBS / BDS / AYUSH', icon: FaStethoscope },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

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
            Eligibility
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
            Who Should Join?
          </h2>
          <p className="text-muted-foreground text-lg">
            Our programme is designed for dedicated students at every stage of their NEET journey
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 md:gap-6"
        >
          {aspirants.map((aspirant, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="inline-flex items-center gap-3 bg-ark-white border-2 border-border hover:border-ark-yellow px-6 py-4 rounded-full shadow-card hover:shadow-yellow transition-all duration-300 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full bg-ark-blue/5 flex items-center justify-center group-hover:bg-ark-yellow group-hover:text-ark-blue transition-colors">
                <aspirant.icon className="text-ark-blue group-hover:text-ark-blue text-lg" />
              </div>
              <span className="font-semibold text-foreground">{aspirant.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhoShouldJoin;
