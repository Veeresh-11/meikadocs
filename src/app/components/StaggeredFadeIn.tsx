import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface StaggeredFadeInProps {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
}

export function StaggeredFadeIn({ children, className = '', staggerDelay = 0.1 }: StaggeredFadeInProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{
            duration: 0.6,
            delay: index * staggerDelay,
            ease: 'easeOut'
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  theme?: 'yellow' | 'blue-green';
}

export function AnimatedCard({ children, className = '', delay = 0, theme = 'yellow' }: AnimatedCardProps) {
  const glowColors = {
    yellow: 'group-hover:shadow-yellow-600/20',
    'blue-green': 'group-hover:shadow-blue-500/20'
  };

  return (
    <motion.div
      className={`group ${className}`}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <motion.div
        className={`h-full transition-shadow duration-300 ${glowColors[theme]}`}
        whileHover={{
          boxShadow: theme === 'yellow' 
            ? '0 20px 40px rgba(250, 204, 21, 0.2)'
            : '0 20px 40px rgba(59, 130, 246, 0.2)'
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
