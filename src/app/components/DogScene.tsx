import { useState, useEffect } from 'react';
import { Dog2DAnimated } from './Dog2DAnimated';
import { motion } from 'motion/react';
import { useGhostMode } from '../hooks/useGhostMode';
import { X } from 'lucide-react';

interface DogSceneProps {
  interactive?: boolean;
  onDogClick?: () => void;
  isActive?: boolean;
  theme?: 'yellow' | 'blue-green';
  onClose?: () => void;
}

export function DogScene({ interactive = true, onDogClick, isActive = false, theme = 'yellow', onClose }: DogSceneProps) {
  const [isHovering, setIsHovering] = useState(false);
  const { isGhostMode, isInFooter, isInactive } = useGhostMode();

  // Theme configurations
  const themes = {
    yellow: {
      gradient: 'from-amber-950/10',
      hoverBg: 'bg-amber-900/40',
      hoverBorder: 'border-amber-500/40',
      hoverDot: 'bg-amber-400',
      ghostBorder: 'border-amber-500/20',
      ghostDot: 'bg-amber-400/50',
    },
    'blue-green': {
      gradient: 'from-blue-950/10',
      hoverBg: 'bg-blue-900/40',
      hoverBorder: 'border-blue-500/40',
      hoverDot: 'bg-blue-400',
      ghostBorder: 'border-blue-500/20',
      ghostDot: 'bg-blue-400/50',
    },
  };

  const currentTheme = themes[theme];

  const handleDogDoubleClick = () => {
    if (interactive) {
      onDogClick?.();
    }
  };

  // Determine ghost mode reason for display
  const ghostModeReason = isInFooter ? 'Footer area' : isInactive ? 'Inactive' : '';

  return (
    <motion.div 
      className="fixed bottom-0 right-0 w-[320px] h-[280px] pointer-events-none z-20 transition-all duration-500"
      animate={{
        opacity: isGhostMode ? 0.3 : 1,
        x: isGhostMode ? -20 : 0,
        scale: isGhostMode ? 0.85 : 1,
      }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {/* Frosted glass backdrop when in ghost mode */}
      {isGhostMode && (
        <motion.div 
          className="absolute inset-0 backdrop-blur-sm bg-[#0A0B0F]/20 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Warmer background gradient to complement the dog */}
      <div className={`absolute inset-0 ${currentTheme.gradient} blur-2xl`} />
      
      {/* 2D Animated Dog Container */}
      <div 
        className="w-full h-full pointer-events-auto relative z-10"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Dog2DAnimated 
          onDoubleClick={handleDogDoubleClick}
          isActive={isActive}
        />
      </div>

      {/* Hover instruction - shows on hover */}
      {interactive && isHovering && !isGhostMode && (
        <motion.div
          className="absolute bottom-4 right-4 text-[#9EA3B0] text-xs pointer-events-none z-20"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.2 }}
        >
          <div className={`flex items-center gap-1.5 ${currentTheme.hoverBg} backdrop-blur-sm ${currentTheme.hoverBorder} rounded-full px-3 py-1.5`}>
            <div className={`w-1.5 h-1.5 ${currentTheme.hoverDot} rounded-full animate-pulse`} />
            <span className="text-[11px] font-medium">Double click to interact</span>
          </div>
        </motion.div>
      )}

      {/* Ghost mode indicator */}
      {isGhostMode && (
        <motion.div
          className="absolute top-2 right-2 text-[#9EA3B0] text-[9px] pointer-events-none z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className={`flex items-center gap-1 bg-[#0A0B0F]/60 backdrop-blur-sm ${currentTheme.ghostBorder} rounded-full px-1.5 py-0.5`}>
            <div className={`w-1 h-1 ${currentTheme.ghostDot} rounded-full animate-pulse`} />
            <span>{ghostModeReason}</span>
          </div>
        </motion.div>
      )}

      {/* Close button */}
      {onClose && (
        <motion.button
          className={`absolute top-2 left-2 w-8 h-8 rounded-full ${currentTheme.hoverBg} backdrop-blur-sm ${currentTheme.hoverBorder} border flex items-center justify-center pointer-events-auto z-30 hover:scale-110 transition-all duration-200 group`}
          onClick={onClose}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <X className="w-4 h-4 text-[#9EA3B0] group-hover:text-white transition-colors" />
        </motion.button>
      )}
    </motion.div>
  );
}