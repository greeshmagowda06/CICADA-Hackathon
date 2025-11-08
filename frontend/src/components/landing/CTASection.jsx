import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Rocket } from 'lucide-react';

function CTASection() {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const navigate = useNavigate();

  return (
    <section className="relative py-32 px-6 overflow-hidden" id="contact">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-card to-dark-bg" />
      
      {/* Radial Gradient Orbs */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-primary/30 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-cyan/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="relative z-10 container mx-auto max-w-5xl text-center" ref={ref}>
        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {[Sparkles, Rocket].map((Icon, idx) => (
            <motion.div
              key={idx}
              className="absolute"
              style={{
                left: `${20 + idx * 60}%`,
                top: `${10 + idx * 20}%`
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 360],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{
                duration: 8 + idx * 2,
                repeat: Infinity,
                delay: idx * 0.5
              }}
            >
              <Icon className="text-accent-cyan w-16 h-16 blur-sm" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent-primary/20 to-accent-cyan/20 border border-accent-cyan/40 rounded-full text-accent-cyan font-semibold mb-8"
            animate={{
              boxShadow: [
                '0 0 30px rgba(56, 189, 248, 0.4)',
                '0 0 60px rgba(56, 189, 248, 0.6)',
                '0 0 30px rgba(56, 189, 248, 0.4)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles size={20} />
            Join the Future of Academic Scheduling
          </motion.div>

          {/* Main Heading */}
          <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-accent-cyan to-white mb-4">
              Ready to Transform
            </span>
            <span className="block">
              <motion.span
                className="bg-clip-text text-transparent bg-gradient-to-r from-accent-primary via-accent-cyan to-accent-purple"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: '200% 200%' }}
              >
                Your Institution?
              </motion.span>
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Experience the power of AI-driven timetable generation.
            Save time, eliminate conflicts, and optimize your academic operations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <motion.button
              onClick={() => navigate('/dashboard')}
              className="group relative px-10 py-5 bg-gradient-to-r from-accent-primary to-accent-cyan rounded-full text-lg font-bold overflow-hidden shadow-2xl"
              whileHover={{
                scale: 1.05,
                boxShadow: '0 0 50px rgba(37, 99, 235, 0.8)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-3">
                <Rocket size={24} />
                Launch Dashboard
                <ArrowRight size={24} />
              </span>
              
              {/* Animated Gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-primary"
                initial={{ x: '100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />

              {/* Pulse Effect */}
              <motion.div
                className="absolute inset-0 bg-white/20"
                animate={{
                  scale: [1, 1.5],
                  opacity: [0.5, 0]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
              />
            </motion.button>

            <motion.button
              className="px-10 py-5 border-2 border-accent-cyan/50 rounded-full text-lg font-bold hover:bg-accent-cyan/10 transition backdrop-blur-sm"
              whileHover={{
                scale: 1.05,
                borderColor: 'rgba(56, 189, 248, 1)',
                boxShadow: '0 0 30px rgba(56, 189, 248, 0.3)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo Video
            </motion.button>
          </div>

          {/* Trust Indicators */}
          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              NEP 2020 Compliant
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              Google OR-Tools Powered
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              Built for Atria University
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default CTASection;
