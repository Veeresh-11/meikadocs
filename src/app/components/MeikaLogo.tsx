import { motion } from 'motion/react';

interface MeikaLogoProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

export function MeikaLogo({ size = 40, className = '', animated = true }: MeikaLogoProps) {
  const logoVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  const shieldVariants = {
    initial: { pathLength: 1, opacity: 1 },
    animate: {
      pathLength: [1, 0.8, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const Container = animated ? motion.div : 'div';
  const animationProps = animated ? {
    variants: logoVariants,
    initial: "initial",
    whileHover: "hover",
    whileTap: "tap"
  } : {};

  return (
    <Container className={className} {...animationProps}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shield Background */}
        <motion.path
          d="M50 10L20 25V45C20 65 50 85 50 85C50 85 80 65 80 45V25L50 10Z"
          fill="url(#shieldGradient)"
          variants={animated ? shieldVariants : undefined}
          initial={animated ? "initial" : undefined}
          animate={animated ? "animate" : undefined}
        />
        
        {/* Key Symbol */}
        <g>
          {/* Key Head (Circle) */}
          <circle cx="42" cy="42" r="8" fill="white" opacity="0.95" />
          <circle cx="42" cy="42" r="4" fill="#0EA5E9" />
          
          {/* Key Shaft */}
          <rect x="48" y="40" width="18" height="4" rx="2" fill="white" opacity="0.95" />
          
          {/* Key Teeth */}
          <rect x="58" y="38" width="2" height="4" fill="white" opacity="0.95" />
          <rect x="62" y="36" width="2" height="6" fill="white" opacity="0.95" />
          <rect x="66" y="38" width="2" height="4" fill="white" opacity="0.95" />
        </g>

        {/* Secure Lock Indicator */}
        <circle cx="70" cy="30" r="3" fill="#10B981" />

        {/* Gradient Definitions */}
        <defs>
          <linearGradient id="shieldGradient" x1="20" y1="10" x2="80" y2="85">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
      </svg>
    </Container>
  );
}
