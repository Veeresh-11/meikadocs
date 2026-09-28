import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  wordDelay?: number;
}

export function AnimatedText({ text, className = '', delay = 0, wordDelay = 0.03 }: AnimatedTextProps) {
  const words = text.split(' ');

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '100%', opacity: 0 },
              visible: { y: 0, opacity: 1 }
            }}
            transition={{
              duration: 0.5,
              delay: delay + wordIndex * wordDelay,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}

interface AnimatedCharactersProps {
  text: string;
  className?: string;
  delay?: number;
}

export function AnimatedCharacters({ text, className = '', delay = 0 }: AnimatedCharactersProps) {
  const chars = text.split('');

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {chars.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.03,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
}

interface FadeInViewProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  className?: string;
}

export function FadeInView({ 
  children, 
  delay = 0, 
  direction = 'up',
  distance = 30,
  className = ''
}: FadeInViewProps) {
  const directions = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance }
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
}
