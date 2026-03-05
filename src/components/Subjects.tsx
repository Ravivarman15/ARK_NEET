import { motion } from 'framer-motion';
import { FaAtom, FaFlask, FaDna } from 'react-icons/fa';
import { GiChemicalDrop, GiMolecule, GiFlowerPot, GiFrog, GiGears, GiThermometerScale, GiLightningArc, GiPrism, GiAtom } from 'react-icons/gi';

const Subjects = () => {
  const subjects = [
    {
      name: 'Physics',
      icon: FaAtom,
      color: 'from-blue-500 to-blue-600',
      subtopics: [
        { name: 'Mechanics', icon: GiGears },
        { name: 'Thermodynamics', icon: GiThermometerScale },
        { name: 'Electromagnetism', icon: GiLightningArc },
        { name: 'Optics', icon: GiPrism },
        { name: 'Modern Physics', icon: GiAtom },
      ],
    },
    {
      name: 'Chemistry',
      icon: FaFlask,
      color: 'from-purple-500 to-purple-600',
      subtopics: [
        { name: 'Physical Chemistry', icon: GiMolecule },
        { name: 'Organic Chemistry', icon: GiChemicalDrop },
        { name: 'Inorganic Chemistry', icon: FaFlask },
      ],
    },
    {
      name: 'Biology',
      icon: FaDna,
      color: 'from-green-500 to-green-600',
      subtopics: [
        { name: 'Botany', icon: GiFlowerPot },
        { name: 'Zoology', icon: GiFrog },
      ],
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
            Complete Coverage
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-6">
            Subjects Covered
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive preparation across all three core NEET subjects
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {subjects.map((subject, index) => (
            <motion.div
              key={subject.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="card-subject group cursor-pointer"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-ark-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <subject.icon className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{subject.name}</h3>
              </div>

              {subject.subtopics && (
                <div className="space-y-3">
                  {subject.subtopics.map((sub, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-ark-yellow/10 transition-colors">
                      <sub.icon className="text-ark-blue text-lg" />
                      <span className="text-foreground font-medium">{sub.name}</span>
                    </div>
                  ))}
                </div>
              )}

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Subjects;
