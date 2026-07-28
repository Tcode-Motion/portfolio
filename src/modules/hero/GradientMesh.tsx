import React from 'react';
import { motion } from 'framer-motion';
import { useMotion } from '@/core/motion/MotionProvider';

export const GradientMesh: React.FC = () => {
  const { allowComplexAnimations } = useMotion();

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Warm bloom top-left */}
      <motion.div
        className="absolute"
        style={{
          width: '60vw',
          height: '60vw',
          left: '-15vw',
          top: '-10vw',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(232,228,223,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
        animate={allowComplexAnimations ? {
          x: [0, 20, -10, 0],
          y: [0, -15, 20, 0],
        } : {}}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Cool bloom bottom-right */}
      <motion.div
        className="absolute"
        style={{
          width: '50vw',
          height: '50vw',
          right: '-10vw',
          bottom: '-5vw',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(85,85,85,0.08) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        animate={allowComplexAnimations ? {
          x: [0, -20, 15, 0],
          y: [0, 20, -10, 0],
        } : {}}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />
    </div>
  );
};
