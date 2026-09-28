import { motion } from 'motion/react';
import { AlertTriangle, Shield, Eye, MapPin, Monitor, CheckCircle2, X } from 'lucide-react';

interface DisclaimerPageProps {
  onAgree: () => void;
  onSkip: () => void;
}

export function DisclaimerModal({ onAgree, onSkip }: DisclaimerPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0B0F] via-[#10121A] to-[#0A0B0F] text-white">
      {/* Close button */}
      <button
        onClick={onSkip}
        className="fixed top-6 right-6 z-50 p-2 hover:bg-white/10 rounded-lg transition-colors group"
        aria-label="Close"
      >
        <X className="w-5 h-5 text-[#9EA3B0] group-hover:text-white transition-colors" />
      </button>

      <div className="container mx-auto max-w-2xl px-6 py-20">
        {/* Animated top bar */}
        <motion.div
          className="h-1 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-full mb-16"
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ backgroundSize: '200% 100%' }}
        />

        {/* Icon */}
        <motion.div
          className="mx-auto w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-2xl flex items-center justify-center mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <Shield className="w-8 h-8 text-cyan-400" />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl md:text-5xl text-center mb-4 bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          Privacy Notice
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-center text-[#9EA3B0] mb-10 text-base md:text-lg leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          To show you how exposed your data is online, we'll collect some of your device and location information.
        </motion.p>

        {/* What we collect */}
        <motion.div
          className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <h3 className="text-sm mb-4 text-white flex items-center gap-2">
            <Eye className="w-4 h-4 text-cyan-400" />
            Information We'll Collect:
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 text-sm text-[#9EA3B0]">
              <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white mb-1">IP Address & Location</p>
                <p className="text-xs">City, region, country, and timezone</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm text-[#9EA3B0]">
              <Monitor className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white mb-1">Device Information</p>
                <p className="text-xs">Browser type, operating system, screen resolution</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm text-[#9EA3B0]">
              <Eye className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-white mb-1">Browsing Data</p>
                <p className="text-xs">Language preference, platform, and user agent</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Important note */}
        <motion.div
          className="bg-cyan-600/10 border border-cyan-500/30 rounded-xl p-5 mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="text-white mb-2">We're committed to your privacy:</p>
              <ul className="space-y-1.5 text-[#9EA3B0] text-xs">
                <li>• This data is used only for demonstration purposes</li>
                <li>• We do not store or share your personal information</li>
                <li>• All data is processed locally in your browser</li>
                <li>• No tracking cookies or persistent storage</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <button
            onClick={onAgree}
            className="flex-1 px-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="block mb-1">I Understand, Continue</span>
            <span className="block text-xs opacity-80">Show me my exposure</span>
          </button>
          <button
            onClick={onSkip}
            className="flex-1 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="block mb-1">Skip for Now</span>
            <span className="block text-xs text-[#9EA3B0]">Go to homepage</span>
          </button>
        </motion.div>

        {/* Footer note */}
        <motion.p
          className="mt-8 text-center text-xs text-[#9EA3B0]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
        >
          By continuing, you consent to the temporary collection of this information
        </motion.p>
      </div>
    </div>
  );
}
