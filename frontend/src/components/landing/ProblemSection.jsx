import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { AlertCircle, Clock, Users, Calendar } from 'lucide-react';

function ProblemSection() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const problems = [
    {
      icon: AlertCircle,
      title: 'NEP 2020 Complexity',
      description: 'Managing multidisciplinary courses, majors, minors, and electives creates scheduling chaos.',
      color: 'from-red-500 to-orange-500'
    },
    {
      icon: Clock,
      title: 'Time-Consuming Process',
      description: 'Manual timetable creation takes weeks of trial and error with constant conflicts.',
      color: 'from-orange-500 to-yellow-500'
    },
    {
      icon: Users,
      title: 'Faculty Overload',
      description: 'Unbalanced workload distribution leads to faculty burnout and dissatisfaction.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Calendar,
      title: 'Room & Resource Conflicts',
      description: 'Double bookings and resource allocation errors disrupt academic operations.',
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  };

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-dark-bg to-dark-card" id="about">
      <div className="container mx-auto max-w-7xl" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-sm font-semibold mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            The Challenge
          </motion.span>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Traditional Scheduling
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
              Is Broken
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Academic institutions face overwhelming complexity when creating timetables
            that satisfy NEP 2020 requirements and stakeholder needs.
          </p>
        </motion.div>

        {/* Problem Cards */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {problems.map((problem, idx) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={idx}
                className="group relative"
                variants={itemVariants}
              >
                {/* Glassmorphic Card */}
                <motion.div
                  className="relative p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden"
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  {/* Gradient Glow Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${problem.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Icon with Gradient */}
                  <motion.div
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${problem.color} mb-6`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-accent-cyan transition">
                    {problem.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed">
                    {problem.description}
                  </p>

                  {/* Animated Border */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-accent-cyan to-transparent"
                    initial={{ width: '0%' }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1, delay: idx * 0.2 }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Quote */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="text-2xl md:text-3xl font-light text-gray-400 italic max-w-4xl mx-auto">
            "What if there was a way to solve this in{' '}
            <span className="text-accent-cyan font-semibold not-italic">minutes</span>,
            not weeks?"
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default ProblemSection;
