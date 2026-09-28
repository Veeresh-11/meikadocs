import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dog } from 'lucide-react';

interface Dog2DAnimatedProps {
  onDoubleClick?: () => void;
  isActive?: boolean;
}

export function Dog2DAnimated({ onDoubleClick, isActive = false }: Dog2DAnimatedProps) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <motion.div
      className="relative w-full h-full flex items-end justify-end pb-4 pr-4"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onDoubleClick={onDoubleClick}
      style={{ cursor: 'pointer' }}
    >
      {/* Ambient glow effect */}
      <motion.div
        className="absolute bottom-8 right-8 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl"
        animate={{
          scale: isActive ? [1, 1.2, 1] : isHovering ? [1, 1.1, 1] : 1,
          opacity: isActive ? 0.4 : isHovering ? 0.3 : 0.2,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Main dog image with animations */}
      <motion.div
        aria-label="Ira the dog"
        role="img"
        className="relative z-10 flex h-44 w-44 items-center justify-center rounded-full border border-amber-200/35 bg-amber-100/10 text-amber-200 shadow-2xl backdrop-blur-sm"
        initial={{ opacity: 0, y: 20, rotate: -5 }}
        animate={{
          opacity: 1,
          y: isActive 
            ? [0, -12, 0] 
            : isHovering 
              ? [0, -8, 0] 
              : [0, -4, 0],
          rotate: isActive 
            ? [0, -2, 2, -2, 0] 
            : isHovering 
              ? [0, -1, 1, 0] 
              : 0,
          scale: isActive 
            ? [1, 1.05, 1] 
            : isHovering 
              ? 1.02 
              : 1,
        }}
        transition={{
          opacity: { duration: 0.5 },
          y: {
            duration: isActive ? 0.6 : isHovering ? 1.5 : 3,
            repeat: Infinity,
            ease: "easeInOut"
          },
          rotate: {
            duration: isActive ? 0.5 : isHovering ? 2 : 4,
            repeat: Infinity,
            ease: "easeInOut"
          },
          scale: {
            duration: isActive ? 0.3 : 0.2,
            ease: "easeOut"
          }
        }}
        whileHover={{
          filter: "brightness(1.1) drop-shadow(0 0 20px rgba(251, 191, 36, 0.3))",
        }}
      >
        <Dog aria-hidden="true" className="h-24 w-24 stroke-[1.25]" />
      </motion.div>

      {/* Sparkle effects on hover/active */}
      {(isHovering || isActive) && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-amber-400 rounded-full"
              style={{
                bottom: `${120 + i * 30}px`,
                right: `${80 + i * 20}px`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                y: [-20, -40],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeOut"
              }}
            />
          ))}
        </>
      )}

      {/* Pulsing ring on active state */}
      {isActive && (
        <motion.div
          className="absolute bottom-12 right-16 w-40 h-40 border-2 border-amber-400/30 rounded-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.div>
  );
}
