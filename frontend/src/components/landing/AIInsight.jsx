import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, CheckCircle, TrendingUp, Zap } from 'lucide-react';

function AIInsight() {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [typedText, setTypedText] = useState('');
  const fullText = "AI Insight: No faculty overload detected. Schedule optimized by 94%. All room allocations efficient. Zero conflicts found across 127 time slots.";

  useEffect(() => {
    if (inView) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setTypedText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 30);

      return () => clearInterval(interval);
    }
  }, [inView, fullText]);

  const insights = [
    { icon: CheckCircle, text: 'Zero scheduling conflicts', color: 'text-green-400' },
    { icon: TrendingUp, text: '94% optimization achieved', color: 'text-blue-400' },
    { icon: Zap, text: 'Generated in 0.8 seconds', color: 'text-purple-400' }
  ];

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-dark-bg via-white/5 to-dark-bg">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(56, 189, 248, 0.2) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(56, 189, 248, 0.2) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
          animate={{
            backgroundPosition: ['0px 0px', '40px 40px']
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="relative z-10 container mx-auto max-w-6xl" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm font-semibold mb-6"
            animate={{
              boxShadow: [
                '0 0 20px rgba(56, 189, 248, 0.3)',
                '0 0 40px rgba(56, 189, 248, 0.6)',
                '0 0 20px rgba(56, 189, 248, 0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles size={16} />
            AI Analysis
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Intelligent
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
              Insights
            </span>
          </h2>
        </motion.div>

        {/* AI Chat Bubble */}
        <motion.div
          className="relative mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative p-8 md:p-12 rounded-3xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 overflow-hidden">
            {/* Pulsing Corner */}
            <motion.div
              className="absolute top-0 right-0 w-32 h-32 bg-accent-cyan/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* AI Avatar */}
            <motion.div
              className="inline-flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="relative w-12 h-12 rounded-full bg-gradient-to-br from-accent-primary to-accent-cyan flex items-center justify-center"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(37, 99, 235, 0.5)',
                    '0 0 40px rgba(56, 189, 248, 0.7)',
                    '0 0 20px rgba(37, 99, 235, 0.5)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-6 h-6 text-white" />
                
                {/* Orbiting Dots */}
                {[0, 120, 240].map((angle, idx) => (
                  <motion.div
                    key={idx}
                    className="absolute w-2 h-2 bg-accent-cyan rounded-full"
                    style={{
                      top: '50%',
                      left: '50%'
                    }}
                    animate={{
                      rotate: angle,
                      x: [0, 25, 0],
                      y: [0, 0, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: idx * 0.2
                    }}
                  />
                ))}
              </motion.div>
              
              <div>
                <div className="text-sm font-semibold text-white">TimetableAI Assistant</div>
                <div className="text-xs text-gray-400">Analysis Complete</div>
              </div>
            </motion.div>

            {/* Typing Effect Text */}
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}
            >
              <p className="text-xl md:text-2xl text-white leading-relaxed font-light">
                {typedText}
                <motion.span
                  className="inline-block w-0.5 h-6 bg-accent-cyan ml-1"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              </p>
            </motion.div>

            {/* Glassmorphic Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
              animate={{
                x: ['-100%', '200%']
              }}
              transition={{ duration: 3, repeat: Infinity, delay: 2 }}
            />
          </div>
        </motion.div>

        {/* Key Insights Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {insights.map((insight, idx) => {
            const Icon = insight.icon;
            return (
              <motion.div
                key={idx}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2 + idx * 0.2 }}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300">
                  <Icon className={`${insight.color} w-8 h-8 mb-4`} />
                  <p className="text-gray-300 font-medium">{insight.text}</p>
                  
                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-cyan/0 to-accent-primary/0 group-hover:from-accent-cyan/10 group-hover:to-accent-primary/10 transition-all duration-300" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default AIInsight;
