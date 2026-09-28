import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useGhostMode } from '../hooks/useGhostMode';

interface BackToTopProps {
  theme?: 'yellow' | 'blue-green';
}

export function BackToTop({ theme = 'yellow' }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { isGhostMode, isInFooter, isInactive } = useGhostMode();

  // Theme configurations
  const themes = {
    yellow: {
      gradient: 'from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500',
      shadow: 'shadow-yellow-600/30',
      indicator: 'border-amber-500/20',
      dot: 'bg-amber-400/50',
    },
    'blue-green': {
      gradient: 'from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600',
      shadow: 'shadow-blue-500/30',
      indicator: 'border-blue-500/20',
      dot: 'bg-blue-400/50',
    },
  };

  const currentTheme = themes[theme];

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Determine ghost mode reason for display
  const ghostModeReason = isInFooter ? 'Footer' : isInactive ? 'Idle' : '';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-24 left-8 z-50"
          initial={{ opacity: 0, scale: 0.5, y: -20 }}
          animate={{ 
            opacity: isGhostMode ? 0.4 : 1, 
            scale: isGhostMode ? 0.85 : 1,
            y: 0,
          }}
          exit={{ opacity: 0, scale: 0.5, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Frosted glass backdrop when in ghost mode */}
          {isGhostMode && (
            <motion.div 
              className="absolute -inset-2 backdrop-blur-sm bg-[#0A0B0F]/20 rounded-full z-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}

          <motion.button
            whileHover={{ scale: isGhostMode ? 0.95 : 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className={`relative p-4 bg-gradient-to-r ${currentTheme.gradient} ${currentTheme.shadow} rounded-full transition-all duration-300 group`}
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 text-white relative z-10" />
            <motion.div
              className="absolute inset-0 rounded-full bg-white/20"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>

          {/* Ghost mode indicator */}
          {isGhostMode && (
            <motion.div
              className="absolute -bottom-8 left-0 text-[#9EA3B0] text-[9px] pointer-events-none whitespace-nowrap"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 0.6, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`flex items-center gap-1 bg-[#0A0B0F]/60 backdrop-blur-sm border ${currentTheme.indicator} rounded-full px-1.5 py-0.5`}>
                <div className={`w-1 h-1 ${currentTheme.dot} rounded-full animate-pulse`} />
                <span>{ghostModeReason}</span>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}