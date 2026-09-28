import { motion } from 'motion/react';

interface TooltipProps {
  content: string;
}

export function Tooltip({ content }: TooltipProps) {
  return (
    <motion.div
      className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-[#1A1C24] border border-white/20 rounded-lg shadow-2xl z-50"
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      transition={{ duration: 0.08, ease: 'easeOut' }}
    >
      <p className="text-sm text-[#9EA3B0] leading-relaxed">{content}</p>
      {/* Tooltip tail */}
      <div className="absolute top-full right-4 -mt-1">
        <div className="w-3 h-3 bg-[#1A1C24] border-r border-b border-white/20 transform rotate-45" />
      </div>
    </motion.div>
  );
}
