import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Zap, Shield, Sparkles } from 'lucide-react';

function AISolution() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const features = [
    {
      icon: Brain,
      title: 'Automated Scheduling',
      description: 'AI-powered constraint satisfaction algorithm generates optimal timetables in seconds.',
      gradient: 'from-blue-500 to-cyan-500',
      delay: 0.2
    },
    {
      icon: Shield,
      title: 'Conflict-Free Optimization',
      description: 'Zero faculty or room double-bookings. Guaranteed compliance with all constraints.',
      gradient: 'from-purple-500 to-pink-500',
      delay: 0.4
    },
    {
      icon: Zap,
      title: 'Real-Time Editing',
      description: 'Dynamic regeneration and drag-drop interface for instant schedule adjustments.',
      gradient: 'from-orange-500 to-red-500',
      delay: 0.6
    }
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden" id="features">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-dark-card via-dark-bg to-dark-card" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(37, 99, 235, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(37, 99, 235, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            x: [0, 100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-cyan/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -100, 0]
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </motion.div>

      <div className="relative z-10 container mx-auto max-w-7xl" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent-primary/10 border border-accent-primary/30 rounded-full text-accent-cyan text-sm font-semibold mb-6"
            animate={{
              boxShadow: [
                '0 0 20px rgba(37, 99, 235, 0.3)',
                '0 0 40px rgba(56, 189, 248, 0.5)',
                '0 0 20px rgba(37, 99, 235, 0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles size={16} />
            The AI Solution
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-primary via-accent-cyan to-accent-purple">
              Intelligence in Motion
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Powered by Google OR-Tools constraint programming and advanced AI algorithms,
            our system transforms chaos into perfect harmony.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: feature.delay }}
              >
                <motion.div
                  className="relative group h-full"
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Glassmorphic Card */}
                  <div className="relative p-8 rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden h-full">
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    {/* Animated Icon Container */}
                    <motion.div
                      className="relative mb-6"
                      animate={{
                        y: [0, -10, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity, delay: idx * 0.5 }}
                    >
                      <div className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${feature.gradient} relative`}>
                        <Icon className="w-10 h-10 text-white relative z-10" />
                        
                        {/* Glow Effect */}
                        <motion.div
                          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} blur-xl`}
                          animate={{
                            opacity: [0.5, 0.8, 0.5],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                    </motion.div>

                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-accent-cyan transition">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Corner Accent */}
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.gradient} opacity-20 blur-2xl rounded-full group-hover:scale-150 transition-transform duration-500`} />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Tech Stack Badge */}
        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {['Google OR-Tools', 'Python ML', 'React 18', 'PostgreSQL', 'NEP 2020'].map((tech, idx) => (
            <motion.span
              key={tech}
              className="px-6 py-3 bg-dark-card/50 backdrop-blur-xl border border-accent-primary/30 rounded-full text-sm font-medium text-accent-cyan"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.2 + idx * 0.1 }}
              whileHover={{
                scale: 1.1,
                boxShadow: '0 0 20px rgba(37, 99, 235, 0.5)'
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default AISolution;
