import { motion } from 'motion/react';
import { Shield, Lock, Key, FileCheck, Database, Fingerprint } from 'lucide-react';

export function FloatingElements() {
  const icons = [
    { Icon: Shield, delay: 0, x: '10%', y: '20%' },
    { Icon: Lock, delay: 0.2, x: '85%', y: '15%' },
    { Icon: Key, delay: 0.4, x: '15%', y: '70%' },
    { Icon: FileCheck, delay: 0.6, x: '80%', y: '65%' },
    { Icon: Database, delay: 0.8, x: '50%', y: '10%' },
    { Icon: Fingerprint, delay: 1, x: '90%', y: '85%' }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {icons.map(({ Icon, delay, x, y }, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.05, 0.1, 0.05],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20 + index * 2,
            delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Icon className="w-12 h-12 text-amber-400/40" />
        </motion.div>
      ))}
    </div>
  );
}

export function ParticleField() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 10 + 10
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-amber-400/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

export function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(251, 191, 36, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(251, 191, 36, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)'
        }}
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({ children, className = '', onClick }: MagneticButtonProps) {
  return (
    <motion.button
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      onClick={onClick}
    >
      <motion.div
        whileHover={{
          x: [0, -5, 5, -5, 5, 0],
          y: [0, 5, -5, 5, -5, 0]
        }}
        transition={{
          duration: 0.5
        }}
      >
        {children}
      </motion.div>
    </motion.button>
  );
}