import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Sparkles, Zap, Brain } from 'lucide-react';

function Hero() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{ opacity, scale }}
      id="hero"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-card to-dark-bg" />
        
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-20 left-1/4 w-96 h-96 bg-accent-primary/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-accent-cyan/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <motion.div
        className="relative z-10 text-center px-6 max-w-6xl mx-auto"
        style={{ y }}
      >
        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          {[Sparkles, Zap, Brain].map((Icon, idx) => (
            <motion.div
              key={idx}
              className="absolute"
              style={{
                left: `${20 + idx * 30}%`,
                top: `${10 + idx * 20}%`
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.6, 0.3],
                rotate: [0, 10, 0]
              }}
              transition={{
                duration: 4 + idx,
                repeat: Infinity,
                delay: idx * 0.5
              }}
            >
              <Icon className="text-accent-cyan w-12 h-12 blur-sm" />
            </motion.div>
          ))}
        </div>

        {/* Main Heading with Stagger Animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-accent-cyan to-white">
              Smarter Schedules
            </span>
            <motion.span
              className="block bg-clip-text text-transparent bg-gradient-to-r from-accent-primary via-accent-cyan to-accent-purple"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              for Smarter Education
            </motion.span>
          </motion.h1>
        </motion.div>

        <motion.p
          className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          AI-powered timetable generation system aligned with{' '}
          <span className="text-accent-cyan font-semibold">NEP 2020</span>.
          <br />
          Eliminate conflicts. Optimize workload. Save hours.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <motion.button
            className="group relative px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-cyan rounded-full text-lg font-semibold overflow-hidden"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(37, 99, 235, 0.6)' }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles size={20} />
              Generate Timetable
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent-cyan to-accent-purple"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            className="px-8 py-4 border-2 border-accent-cyan/50 rounded-full text-lg font-semibold hover:bg-accent-cyan/10 transition backdrop-blur-sm"
            whileHover={{ scale: 1.05, borderColor: 'rgba(56, 189, 248, 1)' }}
            whileTap={{ scale: 0.95 }}
          >
            Watch Demo
          </motion.button>
        </motion.div>

        {/* Stats Counter */}
        <motion.div
          className="mt-20 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {[
            { value: '120+', label: 'Schedules Generated' },
            { value: '99.9%', label: 'Conflict-Free' },
            { value: '5min', label: 'Average Time Saved' }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + idx * 0.2 }}
            >
              <motion.div
                className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent-primary to-accent-cyan mb-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="text-accent-cyan w-8 h-8 opacity-50" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default Hero;
