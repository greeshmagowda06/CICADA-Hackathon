import React from 'react';
import { motion, useScroll } from 'framer-motion';

function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-primary via-accent-cyan to-accent-purple z-50 origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

export default ScrollProgress;
