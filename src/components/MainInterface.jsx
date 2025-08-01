// src/components/MainInterface.jsx
import React from 'react';
import { motion } from 'framer-motion';
import About from './About';

const MainInterface = () => {
  const pageTransition = {
    initial: { x: '-100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '100%', opacity: 0 },
    transition: { duration: 0.6, ease: 'easeInOut' }
  };

  return (
    <motion.div
      className="min-h-screen"
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
    >
      <About />
    </motion.div>
  );
};

export default MainInterface;