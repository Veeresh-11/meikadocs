import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  color: string;
}

interface ScrollProgressProps {
  theme?: 'yellow' | 'blue-green';
}

export function ScrollProgress({ theme = 'yellow' }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [lastProgress, setLastProgress] = useState(0);
  const sparkleIdRef = useRef(0);

  // Theme configurations
  const themes = {
    yellow: {
      colors: ['#FCD34D', '#FBBF24', '#F59E0B', '#FFFFFF', '#FEF3C7'],
      gradient: 'from-yellow-500 via-amber-500 to-yellow-500',
      shadow: 'shadow-yellow-500/50',
      glowColor: '#FCD34D',
    },
    'blue-green': {
      colors: ['#60A5FA', '#3B82F6', '#22D3EE', '#10B981', '#FFFFFF'],
      gradient: 'from-blue-500 via-cyan-500 to-green-500',
      shadow: 'shadow-blue-500/50',
      glowColor: '#60A5FA',
    },
  };

  const currentTheme = themes[theme];
  const sparkleColors = currentTheme.colors;

  // Generate sparkles when scrolling
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const delta = Math.abs(latest - lastProgress);
      
      // Only generate sparkles if there's significant movement
      if (delta > 0.002) {
        const progressPercent = latest * 100;
        
        // Generate 3-6 sparkles
        const newSparkles = Array.from({ length: Math.floor(Math.random() * 4) + 3 }, () => ({
          id: ++sparkleIdRef.current,
          x: progressPercent + (Math.random() * 5 - 2.5), // Slight x variance
          y: Math.random() * 100 - 50, // Random Y position
          size: Math.random() * 8 + 4, // 4-12px
          delay: Math.random() * 0.2,
          color: sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
        }));
        
        setSparkles(prev => [...prev, ...newSparkles].slice(-20)); // Keep only last 20
        setLastProgress(latest);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, lastProgress]);

  // Auto-remove sparkles after animation
  useEffect(() => {
    if (sparkles.length > 0) {
      const timer = setTimeout(() => {
        setSparkles([]);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [sparkles]);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[60] pointer-events-none overflow-hidden">
      {/* Main progress bar */}
      <motion.div
        className={`h-full bg-gradient-to-r ${currentTheme.gradient} origin-left relative shadow-lg ${currentTheme.shadow}`}
        style={{ scaleX }}
      >
        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
          animate={{
            x: ['-200%', '200%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </motion.div>

      {/* Sparkles */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute"
          initial={{
            left: `${sparkle.x}%`,
            top: '50%',
            opacity: 0,
            scale: 0,
            rotate: 0,
          }}
          animate={{
            top: `${sparkle.y}%`,
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 0.8, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 0.8,
            delay: sparkle.delay,
            ease: 'easeOut',
          }}
          style={{
            width: sparkle.size,
            height: sparkle.size,
          }}
        >
          {/* Star sparkle shape */}
          <svg
            width={sparkle.size}
            height={sparkle.size}
            viewBox="0 0 24 24"
            fill="none"
            style={{
              filter: `drop-shadow(0 0 ${sparkle.size / 2}px ${sparkle.color})`,
            }}
          >
            <path
              d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
              fill={sparkle.color}
            />
            <circle cx="12" cy="12" r="3" fill="white" opacity="0.8" />
          </svg>
        </motion.div>
      ))}

      {/* Additional twinkle stars along the bar */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 h-full"
        style={{
          left: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `-${i * 15}px`,
              top: '50%',
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              rotate: [0, 180],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          >
            <svg
              width="8"
              height="8"
              viewBox="0 0 24 24"
              fill="none"
              style={{
                filter: `drop-shadow(0 0 3px ${currentTheme.glowColor})`,
              }}
            >
              <path
                d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
                fill="white"
              />
            </svg>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}