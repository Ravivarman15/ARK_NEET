import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaVideo, FaPlayCircle, FaLaptop, FaComments, FaChartLine } from 'react-icons/fa';
import { HiCheckCircle } from 'react-icons/hi2';

const OnlineProgramme = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: 0,
      label: 'Live Learning',
      icon: FaVideo,
      content: {
        title: 'Interactive Live Classes',
        points: [
          'Scheduled live interactive classes',
          'Real-time doubt asking',
          'Attendance monitoring',
        ],
      },
    },
    {
      id: 1,
      label: 'Recorded',
      icon: FaPlayCircle,
      content: {
        title: 'Learn at Your Pace',
        points: [
          'Chapter-wise recorded videos',
          'Replay access for revision',
          'Concept + MCQ explanation videos',
        ],
      },
    },
    {
      id: 2,
      label: 'Practice & Tests',
      icon: FaLaptop,
      content: {
        title: 'Digital Practice & Testing',
        points: [
          'Online MCQ practice sets',
          'Weekly & monthly online tests',
          'Full-length NEET mock tests',
          'Instant scores & solutions',
        ],
      },
    },
    {
      id: 3,
      label: 'Doubt Support',
      icon: FaComments,
      content: {
        title: 'Always Available Help',
        points: [
          'Doubt submission via platform / WhatsApp',
          'Faculty responses within defined time',
          'Dedicated doubt-clearing sessions',
        ],
      },
    },
    {
      id: 4,
      label: 'Analytics',
      icon: FaChartLine,
      content: {
        title: 'Track Your Progress',
        points: [
          'Topic-wise accuracy reports',
          'Time-per-question analysis',
          'Rank & percentile tracking',
          'Shareable parent reports',
        ],
      },
    },
  ];

  return (
    <section id="online" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-ark-yellow font-semibold text-sm uppercase tracking-wider">
            Learn From Anywhere
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-4 mb-4">
            Online NEET Programme
          </h2>
          <p className="text-muted-foreground text-lg">
            Flexible • Interactive • Result-Oriented
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-ark-yellow text-ark-blue shadow-yellow'
                    : 'bg-secondary text-muted-foreground hover:bg-ark-blue/5'
                }`}
              >
                <tab.icon className="text-base" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-ark-white rounded-2xl p-8 md:p-12 shadow-card min-h-[280px]">
            <AnimatePresence mode="wait">
              {tabs.map((tab) =>
                activeTab === tab.id ? (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-xl bg-ark-blue flex items-center justify-center">
                        <tab.icon className="text-2xl text-ark-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">
                        {tab.content.title}
                      </h3>
                    </div>

                    <ul className="space-y-4">
                      {tab.content.points.map((point, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <HiCheckCircle className="text-ark-yellow text-xl flex-shrink-0" />
                          <span className="text-foreground text-lg">{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OnlineProgramme;
