import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, Users, DoorOpen, BookOpen, Sparkles } from 'lucide-react';

function InteractiveDemo() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [hoveredCell, setHoveredCell] = useState(null);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const timeSlots = ['9:00', '10:00', '11:00', '12:00', '2:00', '3:00'];
  
  const sampleClasses = [
    { day: 0, slot: 0, course: 'CS301', faculty: 'Dr. Kumar', room: '101', color: 'from-blue-500 to-cyan-500' },
    { day: 1, slot: 1, course: 'MATH201', faculty: 'Dr. Sharma', room: '102', color: 'from-purple-500 to-pink-500' },
    { day: 2, slot: 0, course: 'AI401', faculty: 'Dr. Patel', room: 'Lab 201', color: 'from-orange-500 to-red-500' },
    { day: 3, slot: 2, course: 'DS202', faculty: 'Dr. Singh', room: '103', color: 'from-green-500 to-emerald-500' },
    { day: 4, slot: 1, course: 'ML501', faculty: 'Dr. Kumar', room: 'Lab 202', color: 'from-indigo-500 to-purple-500' },
    { day: 0, slot: 3, course: 'WEB301', faculty: 'Dr. Verma', room: '104', color: 'from-pink-500 to-rose-500' },
  ];

  const getClassForCell = (day, slot) => {
    return sampleClasses.find(c => c.day === day && c.slot === slot);
  };

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-dark-card to-dark-bg overflow-hidden" id="demo">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(56, 189, 248, 0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 container mx-auto max-w-7xl" ref={ref}>
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-primary/10 to-accent-cyan/10 border border-accent-cyan/30 rounded-full text-accent-cyan text-sm font-semibold mb-6"
            animate={{
              boxShadow: [
                '0 0 20px rgba(56, 189, 248, 0.3)',
                '0 0 40px rgba(56, 189, 248, 0.5)',
                '0 0 20px rgba(56, 189, 248, 0.3)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Calendar size={16} />
            Live Demo
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              See It in
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-primary to-accent-cyan">
              Action
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Hover over any cell to see detailed class information.
            Each schedule is optimized for zero conflicts.
          </p>
        </motion.div>

        {/* Interactive Labels */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {[
            { icon: BookOpen, label: 'Course', color: 'text-blue-400' },
            { icon: Users, label: 'Faculty', color: 'text-purple-400' },
            { icon: DoorOpen, label: 'Room', color: 'text-green-400' },
            { icon: Sparkles, label: 'AI Optimized', color: 'text-cyan-400' }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-xl border border-white/10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + idx * 0.1 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.3)' }}
              >
                <Icon className={`${item.color} w-6 h-6`} />
                <span className="text-sm font-medium text-gray-300">{item.label}</span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Timetable Grid */}
        <motion.div
          className="relative rounded-2xl overflow-hidden backdrop-blur-xl bg-white/5 border border-white/10 p-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {/* Grid Container */}
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              {/* Header Row */}
              <div className="grid grid-cols-6 gap-3 mb-3">
                <div className="text-center text-sm font-semibold text-gray-500">Time</div>
                {days.map((day, idx) => (
                  <motion.div
                    key={day}
                    className="text-center text-sm font-semibold text-accent-cyan"
                    initial={{ opacity: 0, y: -20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 + idx * 0.1 }}
                  >
                    {day}
                  </motion.div>
                ))}
              </div>

              {/* Time Slots */}
              {timeSlots.map((slot, slotIdx) => (
                <motion.div
                  key={slot}
                  className="grid grid-cols-6 gap-3 mb-3"
                  initial={{ opacity: 0, x: -50 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1 + slotIdx * 0.1 }}
                >
                  {/* Time Label */}
                  <div className="flex items-center justify-center text-sm text-gray-500 font-medium">
                    {slot}
                  </div>

                  {/* Day Cells */}
                  {days.map((day, dayIdx) => {
                    const classData = getClassForCell(dayIdx, slotIdx);
                    const cellKey = `${dayIdx}-${slotIdx}`;
                    const isHovered = hoveredCell === cellKey;

                    return (
                      <motion.div
                        key={cellKey}
                        className="relative aspect-square"
                        onHoverStart={() => setHoveredCell(cellKey)}
                        onHoverEnd={() => setHoveredCell(null)}
                        whileHover={{ scale: 1.05, zIndex: 10 }}
                      >
                        {classData ? (
                          <motion.div
                            className={`relative h-full rounded-xl bg-gradient-to-br ${classData.color} p-3 cursor-pointer overflow-hidden group`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 1.2 + slotIdx * 0.1 + dayIdx * 0.05 }}
                          >
                            {/* Shimmer Effect */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                              animate={{
                                x: ['-100%', '100%']
                              }}
                              transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 2 }}
                            />

                            <div className="relative z-10">
                              <div className="text-xs font-bold text-white mb-1">
                                {classData.course}
                              </div>
                              <div className="text-[10px] text-white/80 truncate">
                                {classData.faculty}
                              </div>
                            </div>

                            {/* Hover Popup */}
                            {isHovered && (
                              <motion.div
                                className="absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-full w-48 p-4 bg-dark-card border border-accent-cyan/50 rounded-xl shadow-2xl z-20"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                              >
                                <div className="text-sm font-bold text-white mb-2">{classData.course}</div>
                                <div className="text-xs text-gray-400 space-y-1">
                                  <div className="flex items-center gap-2">
                                    <Users size={12} className="text-purple-400" />
                                    {classData.faculty}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <DoorOpen size={12} className="text-green-400" />
                                    {classData.room}
                                  </div>
                                </div>
                                {/* Arrow */}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
                                  <div className="w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-accent-cyan/50" />
                                </div>
                              </motion.div>
                            )}

                            {/* Glow Effect */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${classData.color} opacity-0 group-hover:opacity-50 blur-xl transition-opacity`} />
                          </motion.div>
                        ) : (
                          <motion.div
                            className="h-full rounded-xl bg-white/5 border border-dashed border-white/10 hover:border-accent-cyan/30 transition-colors"
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 1.2 + slotIdx * 0.1 + dayIdx * 0.05 }}
                          />
                        )}
                      </motion.div>
                    );
                  })}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Stats */}
          <motion.div
            className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.5 }}
          >
            {[
              { label: 'Classes Scheduled', value: '6' },
              { label: 'Conflicts Detected', value: '0' },
              { label: 'Optimization Score', value: '98%' }
            ].map((stat, idx) => (
              <div key={idx}>
                <motion.div
                  className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent-primary to-accent-cyan mb-1"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default InteractiveDemo;
