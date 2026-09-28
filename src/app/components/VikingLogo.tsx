import { motion } from 'motion/react';

interface VikingLogoProps {
  variation: number;
  animationSpeed: number;
  isAnimating: boolean;
  colorScheme: string;
  size?: number;
}

const colorSchemes = {
  nordic: {
    primary: '#4A90E2',
    secondary: '#2E5C8A',
    accent: '#7EC8E3',
    glow: '#4A90E2',
  },
  fire: {
    primary: '#FF6B35',
    secondary: '#C73E1D',
    accent: '#FFB627',
    glow: '#FF6B35',
  },
  frost: {
    primary: '#00D4FF',
    secondary: '#0099CC',
    accent: '#B3E5FC',
    glow: '#00D4FF',
  },
  royal: {
    primary: '#9B59B6',
    secondary: '#6C3483',
    accent: '#D7A9E3',
    glow: '#9B59B6',
  },
};

export function VikingLogo({
  variation,
  animationSpeed,
  isAnimating,
  colorScheme,
  size = 200,
}: VikingLogoProps) {
  const colors = colorSchemes[colorScheme as keyof typeof colorSchemes] || colorSchemes.nordic;

  const renderVariation = () => {
    switch (variation) {
      case 1:
        return <RuneShield colors={colors} animationSpeed={animationSpeed} isAnimating={isAnimating} size={size} />;
      case 2:
        return <AxeBlades colors={colors} animationSpeed={animationSpeed} isAnimating={isAnimating} size={size} />;
      case 3:
        return <HelmHorn colors={colors} animationSpeed={animationSpeed} isAnimating={isAnimating} size={size} />;
      case 4:
        return <DragonWings colors={colors} animationSpeed={animationSpeed} isAnimating={isAnimating} size={size} />;
      default:
        return <RuneShield colors={colors} animationSpeed={animationSpeed} isAnimating={isAnimating} size={size} />;
    }
  };

  return <div style={{ width: size, height: size }}>{renderVariation()}</div>;
}

// Variation 1: Rune Shield
function RuneShield({ colors, animationSpeed, isAnimating, size }: any) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Glow filter for the illuminated effect */}
        <filter id="stoneGlow">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        {/* Inner glow for carved effect */}
        <filter id="innerGlow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="blur" in2="SourceAlpha" operator="in" result="innerBlur" />
          <feMerge>
            <feMergeNode in="innerBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Radial gradient for stone texture */}
        <radialGradient id="stoneTexture">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="60%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </radialGradient>

        {/* Orange/golden glow gradient */}
        <linearGradient id="runeGlow" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFB347" />
          <stop offset="50%" stopColor="#FF8C00" />
          <stop offset="100%" stopColor="#FF6B00" />
        </linearGradient>

        {/* Intense inner glow */}
        <linearGradient id="innerLight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFF4E6" />
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FF8C00" />
        </linearGradient>
      </defs>

      {/* Dark stone circle background */}
      <circle
        cx="100"
        cy="100"
        r="85"
        fill="url(#stoneTexture)"
        opacity="0.95"
      />

      {/* Subtle stone texture overlay */}
      <circle
        cx="100"
        cy="100"
        r="85"
        fill="none"
        stroke="#333"
        strokeWidth="0.5"
        opacity="0.3"
      />

      {/* Carved V shape - Dark shadow (depth effect) */}
      <motion.path
        d="M70 50 L100 130 L130 50 L140 50 L100 150 L60 50 Z"
        fill="#0a0a0a"
        stroke="#050505"
        strokeWidth="1"
      />

      {/* Inner carved depth - darker inner shadow */}
      <motion.path
        d="M70 50 L100 130 L130 50 L140 50 L100 150 L60 50 Z"
        fill="none"
        stroke="#000000"
        strokeWidth="6"
        strokeLinejoin="round"
        opacity="0.4"
      />

      {/* Glowing illuminated V - Base glow layer */}
      <motion.path
        d="M70 50 L100 130 L130 50 L140 50 L100 150 L60 50 Z"
        fill="none"
        stroke="url(#runeGlow)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#stoneGlow)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isAnimating ? {
          pathLength: [0, 1, 1, 1],
          opacity: [0, 0.8, 1, 0.9],
          strokeWidth: [3, 4, 3.5, 3.5],
        } : { pathLength: 1, opacity: 0.9, strokeWidth: 3.5 }}
        transition={{
          duration: 6 / animationSpeed,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.4, 0.6, 1],
        }}
      />

      {/* Bright inner core light */}
      <motion.path
        d="M70 50 L100 130 L130 50 L140 50 L100 150 L60 50 Z"
        fill="none"
        stroke="url(#innerLight)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isAnimating ? {
          pathLength: [0, 1, 1, 1],
          opacity: [0, 0.6, 0.8, 0.7],
        } : { pathLength: 1, opacity: 0.7 }}
        transition={{
          duration: 6 / animationSpeed,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.4, 0.6, 1],
        }}
      />

      {/* Intense white hot core (center line) */}
      <motion.path
        d="M70 50 L100 130 L130 50 L140 50 L100 150 L60 50 Z"
        fill="none"
        stroke="#FFF"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isAnimating ? {
          pathLength: [0, 1, 1, 1],
          opacity: [0, 0.9, 1, 0.8],
        } : { pathLength: 1, opacity: 0.8 }}
        transition={{
          duration: 6 / animationSpeed,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.4, 0.6, 1],
        }}
      />

      {/* Pulsing glow aura around the V */}
      <motion.path
        d="M70 50 L100 130 L130 50 L140 50 L100 150 L60 50 Z"
        fill="none"
        stroke="#FF8C00"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#stoneGlow)"
        animate={isAnimating ? {
          opacity: [0, 0, 0.3, 0.5, 0.4],
          strokeWidth: [8, 8, 10, 8, 8],
        } : {}}
        transition={{
          duration: 6 / animationSpeed,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.3, 0.5, 0.8, 1],
        }}
      />

      {/* Glowing particles that follow the carving path */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
        const progress = i / 10;
        let x, y;
        
        if (progress < 0.25) {
          const t = progress / 0.25;
          x = 70 + 30 * t;
          y = 50 + 80 * t;
        } else if (progress < 0.5) {
          const t = (progress - 0.25) / 0.25;
          x = 130 - 30 * t;
          y = 50 + 80 * t;
        } else if (progress < 0.65) {
          const t = (progress - 0.5) / 0.15;
          x = 130 + 10 * t;
          y = 50;
        } else {
          const t = (progress - 0.65) / 0.35;
          x = 140 - 40 * t;
          y = 50 + 100 * t;
        }
        
        return (
          <motion.circle
            key={`trace-${i}`}
            cx={x}
            cy={y}
            r="3"
            fill="#FFD700"
            filter="url(#stoneGlow)"
            initial={{ opacity: 0 }}
            animate={isAnimating ? {
              opacity: [0, 0, 1, 0.8, 0],
              scale: [0, 0, 2, 1.5, 0],
            } : { opacity: 0 }}
            transition={{
              duration: 6 / animationSpeed,
              repeat: Infinity,
              delay: progress * 2.5,
              ease: "easeOut",
              times: [0, 0.25, 0.3, 0.35, 0.5],
            }}
          />
        );
      })}

      {/* Ember particles rising from the illuminated rune */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((i) => {
        const baseX = 60 + (i / 14) * 80;
        const baseY = 50 + Math.sin(i * 0.5) * 50 + 50;
        
        return (
          <motion.circle
            key={`ember-${i}`}
            cx={baseX}
            cy={baseY}
            r="1.5"
            fill="#FF8C00"
            filter="url(#stoneGlow)"
            initial={{ opacity: 0 }}
            animate={isAnimating ? {
              opacity: [0, 0, 0, 0.8, 1, 0.6, 0],
              y: [0, 0, 0, -15, -30, -45, -60],
              scale: [0, 0, 0, 1.2, 1, 0.8, 0],
              x: [0, 0, 0, Math.sin(i) * 5, Math.sin(i * 2) * 8, Math.sin(i * 3) * 5, 0],
            } : { opacity: 0 }}
            transition={{
              duration: 6 / animationSpeed,
              repeat: Infinity,
              delay: 2.5 + (i * 0.15),
              ease: "easeOut",
              times: [0, 0.35, 0.4, 0.5, 0.65, 0.8, 1],
            }}
          />
        );
      })}

      {/* Bright flash particles when rune fully ignites */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const angle = (i * 45) * (Math.PI / 180);
        const startDist = 50;
        const endDist = 80;
        
        return (
          <motion.circle
            key={`flash-${i}`}
            cx={100 + Math.cos(angle) * startDist}
            cy={100 + Math.sin(angle) * startDist}
            r="2"
            fill="#FFF"
            filter="url(#stoneGlow)"
            initial={{ opacity: 0 }}
            animate={isAnimating ? {
              opacity: [0, 0, 0, 1, 0.5, 0],
              scale: [0, 0, 0, 2, 1.5, 0],
              x: [0, 0, 0, Math.cos(angle) * (endDist - startDist)],
              y: [0, 0, 0, Math.sin(angle) * (endDist - startDist)],
            } : { opacity: 0 }}
            transition={{
              duration: 6 / animationSpeed,
              repeat: Infinity,
              delay: 2.4 + (i * 0.05),
              ease: "easeOut",
              times: [0, 0.35, 0.4, 0.45, 0.55, 0.7],
            }}
          />
        );
      })}

      {/* Floating ambient embers around the stone */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
        const angle = (i * 36) * (Math.PI / 180);
        const radius = 70 + (i % 3) * 8;
        const baseX = 100 + Math.cos(angle) * radius;
        const baseY = 100 + Math.sin(angle) * radius;
        
        return (
          <motion.circle
            key={`ambient-${i}`}
            cx={baseX}
            cy={baseY}
            r="1.2"
            fill="#FF8C00"
            filter="url(#stoneGlow)"
            initial={{ opacity: 0 }}
            animate={isAnimating ? {
              opacity: [0, 0, 0, 0, 0.4, 0.9, 0.6, 0.9, 0.3],
              scale: [0, 0, 0, 0, 1, 1.8, 1.2, 1.5, 0.8],
              x: [0, 0, 0, 0, Math.sin(i * 2) * 6, -Math.sin(i * 2) * 6, Math.sin(i * 2) * 4, 0, 0],
              y: [0, 0, 0, 0, -3, -6, -4, -2, 0],
            } : { opacity: 0 }}
            transition={{
              duration: 6 / animationSpeed,
              repeat: Infinity,
              delay: 3.5 + (i * 0.15),
              ease: "easeInOut",
              times: [0, 0.4, 0.5, 0.55, 0.65, 0.75, 0.85, 0.95, 1],
            }}
          />
        );
      })}

      {/* Additional white hot sparks for intensity */}
      {[0, 1, 2, 3, 4].map((i) => {
        const positions = [
          { x: 70, y: 50 },
          { x: 100, y: 90 },
          { x: 130, y: 50 },
          { x: 100, y: 130 },
          { x: 100, y: 150 },
        ];
        const pos = positions[i];
        
        return (
          <motion.g key={`spark-${i}`}>
            <motion.circle
              cx={pos.x}
              cy={pos.y}
              r="2"
              fill="#FFF"
              filter="url(#stoneGlow)"
              initial={{ opacity: 0 }}
              animate={isAnimating ? {
                opacity: [0, 0, 1, 0],
                scale: [0, 0, 2.5, 0],
              } : { opacity: 0 }}
              transition={{
                duration: 6 / animationSpeed,
                repeat: Infinity,
                delay: 0.3 + (i * 0.8),
                ease: "easeOut",
                times: [0, 0.25, 0.28, 0.35],
              }}
            />
          </motion.g>
        );
      })}
    </svg>
  );
}

// Variation 2: Axe Blades
function AxeBlades({ colors, animationSpeed, isAnimating, size }: any) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="axeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.accent} />
          <stop offset="50%" stopColor={colors.primary} />
          <stop offset="100%" stopColor={colors.secondary} />
        </linearGradient>
      </defs>

      {/* Left Axe Blade */}
      <motion.path
        d="M60 50 L90 50 L100 140 L70 50 Z"
        fill="url(#axeGrad)"
        stroke={colors.accent}
        strokeWidth="2"
        initial={{ rotate: -15, x: -10 }}
        animate={isAnimating ? {
          rotate: [0, -5, 0],
          x: 0,
        } : { rotate: 0, x: 0 }}
        transition={{
          duration: 3 / animationSpeed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ originX: '0.5', originY: '0.5' }}
      />

      {/* Right Axe Blade */}
      <motion.path
        d="M140 50 L110 50 L100 140 L130 50 Z"
        fill="url(#axeGrad)"
        stroke={colors.accent}
        strokeWidth="2"
        initial={{ rotate: 15, x: 10 }}
        animate={isAnimating ? {
          rotate: [0, 5, 0],
          x: 0,
        } : { rotate: 0, x: 0 }}
        transition={{
          duration: 3 / animationSpeed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ originX: '0.5', originY: '0.5' }}
      />

      {/* Handle */}
      <motion.rect
        x="96"
        y="130"
        width="8"
        height="40"
        rx="2"
        fill={colors.secondary}
        stroke={colors.accent}
        strokeWidth="1"
        animate={isAnimating ? {
          scaleY: [1, 1.05, 1],
        } : {}}
        transition={{
          duration: 3 / animationSpeed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Energy Sparks */}
      {[0, 1, 2, 3].map((i) => (
        <motion.circle
          key={i}
          cx={100}
          cy={60 + i * 25}
          r="3"
          fill={colors.accent}
          initial={{ opacity: 0, scale: 0 }}
          animate={isAnimating ? {
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -10],
          } : { opacity: 0 }}
          transition={{
            duration: 2 / animationSpeed,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </svg>
  );
}

// Variation 3: Helm Horn
function HelmHorn({ colors, animationSpeed, isAnimating, size }: any) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hornGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={colors.accent} />
          <stop offset="100%" stopColor={colors.primary} />
        </linearGradient>
        <radialGradient id="glowGrad">
          <stop offset="0%" stopColor={colors.glow} stopOpacity="0.8" />
          <stop offset="100%" stopColor={colors.glow} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Pulsing Glow */}
      <motion.circle
        cx="100"
        cy="100"
        r="60"
        fill="url(#glowGrad)"
        animate={isAnimating ? {
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        } : {}}
        transition={{
          duration: 2 / animationSpeed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Left Horn */}
      <motion.path
        d="M70 140 Q65 100 60 60 C60 50 65 45 75 50 Q80 90 85 130 Z"
        fill="url(#hornGrad)"
        stroke={colors.secondary}
        strokeWidth="2"
        initial={{ rotate: 10 }}
        animate={isAnimating ? {
          rotate: [0, 3, 0],
        } : { rotate: 0 }}
        transition={{
          duration: 2.5 / animationSpeed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ originX: '0.5', originY: '0.8' }}
      />

      {/* Right Horn */}
      <motion.path
        d="M130 140 Q135 100 140 60 C140 50 135 45 125 50 Q120 90 115 130 Z"
        fill="url(#hornGrad)"
        stroke={colors.secondary}
        strokeWidth="2"
        initial={{ rotate: -10 }}
        animate={isAnimating ? {
          rotate: [0, -3, 0],
        } : { rotate: 0 }}
        transition={{
          duration: 2.5 / animationSpeed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ originX: '0.5', originY: '0.8' }}
      />

      {/* Helmet Base */}
      <motion.path
        d="M60 130 Q100 150 140 130 L140 145 Q100 160 60 145 Z"
        fill={colors.secondary}
        stroke={colors.accent}
        strokeWidth="2"
        animate={isAnimating ? {
          y: [0, -3, 0],
        } : {}}
        transition={{
          duration: 2.5 / animationSpeed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Decorative Lines */}
      {[0, 1, 2].map((i) => (
        <motion.line
          key={i}
          x1={75 + i * 15}
          y1={135}
          x2={75 + i * 15}
          y2={145}
          stroke={colors.accent}
          strokeWidth="2"
          animate={isAnimating ? {
            opacity: [0.5, 1, 0.5],
          } : {}}
          transition={{
            duration: 1.5 / animationSpeed,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </svg>
  );
}

// Variation 4: Dragon Wings
function DragonWings({ colors, animationSpeed, isAnimating, size }: any) {
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.primary} />
          <stop offset="50%" stopColor={colors.accent} />
          <stop offset="100%" stopColor={colors.secondary} />
        </linearGradient>
      </defs>

      {/* Left Wing */}
      <motion.path
        d="M100 140 Q70 100 50 70 Q45 60 50 55 Q55 50 60 55 Q70 65 80 80 Q90 95 100 120 Z"
        fill="url(#wingGrad)"
        stroke={colors.accent}
        strokeWidth="2"
        opacity={0.9}
        initial={{ scaleX: 0.8 }}
        animate={isAnimating ? {
          scaleX: [1, 0.95, 1],
          x: [0, -5, 0],
        } : { scaleX: 1 }}
        transition={{
          duration: 3 / animationSpeed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ originX: '0.7', originY: '0.5' }}
      />

      {/* Left Wing Details */}
      <motion.path
        d="M65 65 L75 75 M70 75 L80 85 M75 85 L85 95"
        stroke={colors.secondary}
        strokeWidth="2"
        strokeLinecap="round"
        opacity={0.7}
        animate={isAnimating ? {
          pathLength: [0.8, 1, 0.8],
        } : {}}
        transition={{
          duration: 2 / animationSpeed,
          repeat: Infinity,
        }}
      />

      {/* Right Wing */}
      <motion.path
        d="M100 140 Q130 100 150 70 Q155 60 150 55 Q145 50 140 55 Q130 65 120 80 Q110 95 100 120 Z"
        fill="url(#wingGrad)"
        stroke={colors.accent}
        strokeWidth="2"
        opacity={0.9}
        initial={{ scaleX: 0.8 }}
        animate={isAnimating ? {
          scaleX: [1, 0.95, 1],
          x: [0, 5, 0],
        } : { scaleX: 1 }}
        transition={{
          duration: 3 / animationSpeed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ originX: '0.3', originY: '0.5' }}
      />

      {/* Right Wing Details */}
      <motion.path
        d="M135 65 L125 75 M130 75 L120 85 M125 85 L115 95"
        stroke={colors.secondary}
        strokeWidth="2"
        strokeLinecap="round"
        opacity={0.7}
        animate={isAnimating ? {
          pathLength: [0.8, 1, 0.8],
        } : {}}
        transition={{
          duration: 2 / animationSpeed,
          repeat: Infinity,
        }}
      />

      {/* Dragon Head (V Center) */}
      <motion.circle
        cx="100"
        cy="50"
        r="8"
        fill={colors.primary}
        stroke={colors.accent}
        strokeWidth="2"
        animate={isAnimating ? {
          scale: [1, 1.1, 1],
        } : {}}
        transition={{
          duration: 2 / animationSpeed,
          repeat: Infinity,
        }}
      />

      {/* Energy Particles */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.circle
          key={i}
          cx={70 + i * 15}
          cy={100}
          r="2"
          fill={colors.accent}
          animate={isAnimating ? {
            opacity: [0, 1, 0],
            y: [0, -20, -40],
            scale: [0, 1, 0],
          } : { opacity: 0 }}
          transition={{
            duration: 2 / animationSpeed,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </svg>
  );
}