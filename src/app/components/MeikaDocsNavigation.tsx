import { motion } from 'motion/react';
import { ArrowLeft, FolderOpen } from 'lucide-react';

interface MeikaDocsNavigationProps {
  onBackToMain: () => void;
  scrolled: boolean;
}

export function MeikaDocsNavigation({ onBackToMain, scrolled }: MeikaDocsNavigationProps) {
  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#06070F]/85 backdrop-blur-xl border-b border-white/8' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo — mirrors AuthenticatorNavigation layout */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <FolderOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-lg font-semibold text-white flex items-center gap-1.5">
                <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  Meika
                </span>
                <span className="text-white">Docs</span>
              </div>
              <p className="text-xs text-[#6B7280]">Secure Document Vault</p>
            </div>
          </div>

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-6">
            {[
              { label: 'Features',     href: '#features'     },
              { label: 'Live Demo',    href: '#demo'         },
              { label: 'Security',     href: '#security'     },
              { label: 'Integrations', href: '#integrations' },
            ].map(({ label, href }) => (
              <a key={label} href={href} className="text-[#9EA3B0] hover:text-white transition-colors text-sm">
                {label}
              </a>
            ))}
          </div>

          {/* CTA buttons — mirrors AuthenticatorNavigation exactly */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={onBackToMain}
              className="flex items-center gap-2 px-4 py-2 text-[#9EA3B0] hover:text-white transition-colors rounded-lg hover:bg-white/5 text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Main Site</span>
            </motion.button>

            <motion.button
              className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white rounded-lg text-sm transition-all shadow-lg shadow-indigo-500/20"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Free Vault
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
