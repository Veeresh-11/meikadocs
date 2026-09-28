import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export function IraWelcome() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show welcome message after 1.5 seconds on first visit
    const hasSeenWelcome = sessionStorage.getItem('ira-welcome-seen');
    
    if (!hasSeenWelcome) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem('ira-welcome-seen', 'true');
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-32 right-8 z-50 max-w-sm"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          <div className="relative bg-gradient-to-br from-amber-900/40 via-amber-950/30 to-transparent backdrop-blur-xl border border-amber-500/30 rounded-2xl p-6 shadow-2xl">
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 text-[#9EA3B0] hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Dog paw icon */}
            <motion.div
              className="inline-flex items-center justify-center w-12 h-12 bg-amber-500/20 border border-amber-500/30 rounded-full mb-4"
              animate={{ rotate: [0, 10, -10, 10, 0] }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="text-2xl">🐕</span>
            </motion.div>

            {/* Welcome message */}
            <h3 className="text-xl mb-2 text-amber-100">
              Woof! I'm Ira 👋
            </h3>
            <p className="text-[#B7BAC6] text-sm leading-relaxed mb-4">
              I'm your personal Meika assistant! Click on me anytime to ask questions about encryption, pricing, features, or anything else you'd like to know.
              <span className="block mt-2 text-amber-200/80">
                💡 I'm here to help you learn about Meika!
              </span>
            </p>

            {/* Interaction tips */}
            <div className="space-y-2 text-xs text-[#9EA3B0]">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                <span>Click me to open the help chat</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                <span>Ask me about features, pricing & security</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                <span>I'm always on the right side, ready to help!</span>
              </div>
            </div>

            {/* Got it button */}
            <motion.button
              onClick={handleClose}
              className="w-full mt-4 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2.5 rounded-lg transition-colors text-sm font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Got it, thanks Ira!
            </motion.button>

            {/* Decorative tail element */}
            <div className="absolute -bottom-3 right-8 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-amber-900/40" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}