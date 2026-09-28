import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle } from 'lucide-react';

interface IraFloatingButtonProps {
  onClick: () => void;
  isDialogOpen: boolean;
}

export function IraFloatingButton({ onClick, isDialogOpen }: IraFloatingButtonProps) {
  return (
    <AnimatePresence>
      {!isDialogOpen && (
        <motion.button
          onClick={onClick}
          className="fixed bottom-8 right-8 z-40 w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full shadow-lg shadow-amber-900/40 flex items-center justify-center text-white hover:shadow-xl hover:shadow-amber-900/60 transition-shadow"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Pulsing ring effect */}
          <motion.div
            className="absolute inset-0 rounded-full bg-amber-400"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Icon */}
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <span className="text-2xl">🐕</span>
          </motion.div>

          {/* Notification badge */}
          <motion.div
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ?
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
