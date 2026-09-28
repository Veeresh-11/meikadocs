import { motion, AnimatePresence } from 'motion/react';
import { useEffect } from 'react';

interface PricingTooltipProps {
  content: string;
  onClose?: () => void;
}

export function PricingTooltip({ content, onClose }: PricingTooltipProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="absolute bottom-full right-0 mb-2 w-72 z-50"
        initial={{ opacity: 0, scale: 0.95, y: 4 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 4 }}
        transition={{ duration: 0.08, ease: 'easeOut' }}
      >
        <div className="bg-[#1A1C24] border border-white/20 rounded-xl p-4 shadow-2xl shadow-black/40">
          <p className="text-sm text-[#B7BAC6] leading-relaxed">{content}</p>
          
          {/* Tooltip tail */}
          <div className="absolute top-full right-4 -mt-[1px]">
            <svg width="16" height="8" viewBox="0 0 16 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 8L0 0H16L8 8Z" fill="#1A1C24" />
            </svg>
            <div className="absolute top-0 right-0 w-4 h-[1px] bg-white/20" style={{ transform: 'rotate(-45deg)', transformOrigin: 'top right' }} />
            <div className="absolute top-0 left-0 w-4 h-[1px] bg-white/20" style={{ transform: 'rotate(45deg)', transformOrigin: 'top left' }} />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
