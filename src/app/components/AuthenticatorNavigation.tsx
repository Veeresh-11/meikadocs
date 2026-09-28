import { motion } from 'motion/react';
import { ArrowLeft, Shield } from 'lucide-react';
import { MeikaLogo } from './MeikaLogo';

interface AuthenticatorNavigationProps {
  onBackToMain: () => void;
  scrolled: boolean;
}

export function AuthenticatorNavigation({ onBackToMain, scrolled }: AuthenticatorNavigationProps) {
  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0A0B0F]/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo - Meika Authenticator */}
          <div className="flex items-center gap-4">
            <MeikaLogo size={40} animated />
            <div>
              <div className="text-lg font-semibold text-white flex items-center gap-2">
                <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                  Meika
                </span>
                <span className="text-white">Authenticator</span>
              </div>
              <p className="text-xs text-[#6B7280]">Zero-Trust Identity Platform</p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-[#9EA3B0] hover:text-white transition-colors">
              Features
            </a>
            <a href="#demo" className="text-[#9EA3B0] hover:text-white transition-colors">
              Demo
            </a>
            <a href="#compliance" className="text-[#9EA3B0] hover:text-white transition-colors">
              Compliance
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={onBackToMain}
              className="flex items-center gap-2 px-4 py-2 text-[#9EA3B0] hover:text-white transition-colors rounded-lg hover:bg-white/5"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Main Site</span>
            </motion.button>
            <motion.button
              className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-lg transition-all shadow-lg shadow-blue-500/20"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Free Trial
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}