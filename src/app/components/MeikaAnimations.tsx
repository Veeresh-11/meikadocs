import { motion } from 'motion/react';
import { Shield, Lock, Key, FileCheck, Server, Eye } from 'lucide-react';

// Floating security icons with paths
export function FloatingSecurityIcons() {
  const icons = [
    { Icon: Shield, color: 'text-yellow-400', x: '10%', y: '20%', duration: 8, delay: 0 },
    { Icon: Lock, color: 'text-amber-400', x: '85%', y: '15%', duration: 10, delay: 1 },
    { Icon: Key, color: 'text-yellow-500', x: '15%', y: '70%', duration: 9, delay: 2 },
    { Icon: FileCheck, color: 'text-amber-500', x: '90%', y: '65%', duration: 11, delay: 1.5 },
    { Icon: Server, color: 'text-yellow-300', x: '50%', y: '10%', duration: 12, delay: 0.5 },
    { Icon: Eye, color: 'text-amber-300', x: '70%', y: '80%', duration: 10, delay: 2.5 }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((item, index) => {
        const IconComponent = item.Icon;
        return (
          <motion.div
            key={index}
            className={`absolute ${item.color} opacity-20`}
            style={{ left: item.x, top: item.y }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, -20, 0],
              rotate: [0, 15, -15, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <IconComponent className="w-12 h-12" />
          </motion.div>
        );
      })}
    </div>
  );
}

// Animated gradient border effect
export function AnimatedBorderGradient({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(250, 204, 21, 0.5), transparent)',
          backgroundSize: '200% 100%'
        }}
        animate={{
          backgroundPosition: ['0% 0%', '200% 0%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      <div className="relative bg-[#1a1a1a] rounded-2xl">
        {children}
      </div>
    </motion.div>
  );
}

// Ripple effect background
export function RippleEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-yellow-400/20 rounded-full"
          initial={{ width: 0, height: 0, opacity: 0.6 }}
          animate={{
            width: [0, 800, 1200],
            height: [0, 800, 1200],
            opacity: [0.6, 0.3, 0]
          }}
          transition={{
            duration: 4,
            delay: index * 1.3,
            repeat: Infinity,
            ease: 'easeOut'
          }}
        />
      ))}
    </div>
  );
}

// Glowing dots constellation
export function GlowingConstellation() {
  const dots = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 3
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="w-full h-full">
        {/* Connection lines */}
        {dots.slice(0, 20).map((dot, i) => {
          const nextDot = dots[(i + 3) % dots.length];
          return (
            <motion.line
              key={`line-${i}`}
              x1={`${dot.x}%`}
              y1={`${dot.y}%`}
              x2={`${nextDot.x}%`}
              y2={`${nextDot.y}%`}
              stroke="rgba(250, 204, 21, 0.1)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{
                duration: 2,
                delay: dot.delay,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            />
          );
        })}
        
        {/* Glowing dots */}
        {dots.map((dot) => (
          <motion.circle
            key={dot.id}
            cx={`${dot.x}%`}
            cy={`${dot.y}%`}
            r={dot.size}
            fill="#facc15"
            initial={{ opacity: 0.3, scale: 1 }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3,
              delay: dot.delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
      </svg>
    </div>
  );
}

// Wave animation background
export function WaveBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <svg className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(250, 204, 21, 0.3)" />
            <stop offset="50%" stopColor="rgba(251, 191, 36, 0.3)" />
            <stop offset="100%" stopColor="rgba(250, 204, 21, 0.3)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,50 Q250,20 500,50 T1000,50 L1000,100 L0,100 Z"
          fill="url(#wave-gradient)"
          animate={{
            d: [
              "M0,50 Q250,20 500,50 T1000,50 L1000,100 L0,100 Z",
              "M0,50 Q250,80 500,50 T1000,50 L1000,100 L0,100 Z",
              "M0,50 Q250,20 500,50 T1000,50 L1000,100 L0,100 Z"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        <motion.path
          d="M0,70 Q250,40 500,70 T1000,70 L1000,100 L0,100 Z"
          fill="url(#wave-gradient)"
          opacity={0.5}
          animate={{
            d: [
              "M0,70 Q250,40 500,70 T1000,70 L1000,100 L0,100 Z",
              "M0,70 Q250,100 500,70 T1000,70 L1000,100 L0,100 Z",
              "M0,70 Q250,40 500,70 T1000,70 L1000,100 L0,100 Z"
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
        />
      </svg>
    </div>
  );
}

// Text shimmer effect
export function ShimmerText({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"
        animate={{
          x: ['-200%', '200%']
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
          ease: 'easeInOut'
        }}
        style={{ clipPath: 'inset(0)' }}
      />
      <div className="relative">{children}</div>
    </motion.div>
  );
}

// Floating badges with bounce
export function FloatingBadges() {
  const badges = [
    { text: 'AES-256', x: '20%', y: '30%', delay: 0 },
    { text: 'Zero-Knowledge', x: '80%', y: '25%', delay: 0.5 },
    { text: 'GDPR', x: '15%', y: '65%', delay: 1 },
    { text: 'SOC 2', x: '85%', y: '70%', delay: 1.5 },
    { text: 'End-to-End', x: '50%', y: '15%', delay: 0.8 }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {badges.map((badge, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: badge.x, top: badge.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [0.8, 1.1, 0.8],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 4,
            delay: badge.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <div className="px-4 py-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-yellow-400 text-xs font-medium backdrop-blur-sm">
            {badge.text}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Spinning rings
export function SpinningRings() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-yellow-400/30"
          style={{
            width: `${300 + index * 150}px`,
            height: `${300 + index * 150}px`
          }}
          animate={{
            rotate: index % 2 === 0 ? 360 : -360
          }}
          transition={{
            duration: 20 + index * 5,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full" />
        </motion.div>
      ))}
    </div>
  );
}
