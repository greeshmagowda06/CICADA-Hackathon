import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BarChart3, TrendingUp, Users, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import CountUp from 'react-countup';

function DashboardPreview() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const stats = [
    { icon: Calendar, label: 'Schedules Generated', value: 127, color: 'from-blue-500 to-cyan-500', suffix: '+' },
    { icon: Users, label: 'Faculty Members', value: 45, color: 'from-purple-500 to-pink-500', suffix: '' },
    { icon: CheckCircle, label: 'Success Rate', value: 99.9, color: 'from-green-500 to-emerald-500', suffix: '%' },
    { icon: TrendingUp, label: 'Time Saved', value: 84, color: 'from-orange-500 to-red-500', suffix: 'hrs' }
  ];

  const facultyLoadData = [
    { name: 'Dr. Kumar', load: 85, max: 100, color: 'bg-blue-500' },
    { name: 'Dr. Sharma', load: 72, max: 100, color: 'bg-purple-500' },
    { name: 'Dr. Patel', load: 68, max: 100, color: 'bg-green-500' },
    { name: 'Dr. Singh', load: 78, max: 100, color: 'bg-orange-500' }
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-card to-dark-bg" />
        
        {/* Floating Gradient */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </motion.div>

      <div className="relative z-10 container mx-auto max-w-7xl" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-full text-purple-400 text-sm font-semibold mb-6"
            animate={{
              boxShadow: [
                '0 0 20px rgba(139, 92, 246, 0.3)',
                '0 0 40px rgba(139, 92, 246, 0.5)',
                '0 0 20px rgba(139, 92, 246, 0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <BarChart3 size={16} />
            Analytics Dashboard
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Real-Time
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              Intelligence
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Monitor schedules, track faculty workload, and gain instant insights
            with our intelligent analytics dashboard.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                className="relative group"
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + idx * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="relative p-6 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden">
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  
                  {/* Icon */}
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Value with CountUp */}
                  <div className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br ${stat.color} mb-2`}>
                    {inView && (
                      <CountUp
                        end={stat.value}
                        duration={2}
                        decimals={stat.suffix === '%' ? 1 : 0}
                        suffix={stat.suffix}
                      />
                    )}
                  </div>

                  <div className="text-sm text-gray-400">{stat.label}</div>

                  {/* Glow Effect */}
                  <motion.div
                    className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${stat.color} rounded-full blur-3xl opacity-0 group-hover:opacity-30 transition-opacity`}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Dashboard Mockup */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="relative rounded-3xl backdrop-blur-xl bg-white/5 border border-white/10 p-8 overflow-hidden">
            {/* Glassmorphic Header */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/10">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Faculty Workload Distribution</h3>
                <p className="text-sm text-gray-400">Real-time monitoring of teaching hours</p>
              </div>
              <motion.div
                className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 10px rgba(34, 197, 94, 0.3)',
                    '0 0 20px rgba(34, 197, 94, 0.5)',
                    '0 0 10px rgba(34, 197, 94, 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <CheckCircle size={16} className="text-green-400" />
                <span className="text-sm font-medium text-green-400">All Within Limits</span>
              </motion.div>
            </div>

            {/* Faculty Load Bars */}
            <div className="space-y-6">
              {facultyLoadData.map((faculty, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1 + idx * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-300">{faculty.name}</span>
                    <span className="text-sm text-accent-cyan font-semibold">
                      {faculty.load}/{faculty.max} hrs
                    </span>
                  </div>
                  
                  <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className={`absolute left-0 top-0 h-full ${faculty.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${(faculty.load / faculty.max) * 100}%` } : {}}
                      transition={{ duration: 1, delay: 1.2 + idx * 0.1, ease: 'easeOut' }}
                    >
                      {/* Shimmer Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        animate={{
                          x: ['-100%', '200%']
                        }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Insight */}
            <motion.div
              className="mt-8 pt-6 border-t border-white/10 flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.8 }}
            >
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white mb-1">AI Recommendation</h4>
                <p className="text-sm text-gray-400">
                  All faculty members are operating within optimal workload limits.
                  Consider adding 2 more courses without exceeding capacity.
                </p>
              </div>
            </motion.div>

            {/* Corner Glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl opacity-20" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default DashboardPreview;
