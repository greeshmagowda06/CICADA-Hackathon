import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedNavbar from '../components/landing/AnimatedNavbar';
import Hero from '../components/landing/Hero';
import ProblemSection from '../components/landing/ProblemSection';
import AISolution from '../components/landing/AISolution';
import InteractiveDemo from '../components/landing/InteractiveDemo';
import DashboardPreview from '../components/landing/DashboardPreview';
import AIInsight from '../components/landing/AIInsight';
import CTASection from '../components/landing/CTASection';
import FloatingParticles from '../components/landing/FloatingParticles';
import ScrollProgress from '../components/landing/ScrollProgress';

function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative bg-dark-bg text-white overflow-hidden">
      {/* Animated Cursor Glow */}
      <motion.div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0 opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(37, 99, 235, 0.4) 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          filter: 'blur(60px)'
        }}
        animate={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
      />

      <FloatingParticles />
      <ScrollProgress />
      <AnimatedNavbar />
      
      <main>
        <Hero />
        <ProblemSection />
        <AISolution />
        <InteractiveDemo />
        <DashboardPreview />
        <AIInsight />
        <CTASection />
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-gray-800/50 bg-dark-bg/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-gray-400 mb-4">
              Built for Atria University Hackathon 2025 • Mastersolis Infotech
            </p>
            <div className="flex justify-center gap-6 mb-4">
              {['GitHub', 'LinkedIn', 'Twitter'].map((social, idx) => (
                <motion.a
                  key={social}
                  href="#"
                  className="text-gray-500 hover:text-accent-cyan transition"
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social}
                </motion.a>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              © 2025 AI Timetable System. NEP 2020 Compliant.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
