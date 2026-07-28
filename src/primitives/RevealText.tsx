import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface RevealTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  stagger?: number;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export const RevealText: React.FC<RevealTextProps> = ({
  text,
  className = '',
  as: Component = 'span',
  delay = 0,
  stagger = 0.02,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const words = text.split(' ');

  return (
    <Component className={className} ref={ref as any}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={inView ? { y: '0%', opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: delay + wi * stagger,
              ease: EASE,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
};
