import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, FolderOpen, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: any) => void;
  scrolled: boolean;
  onSignInClick?: () => void;
}

export function Navigation({ currentPage, setCurrentPage, scrolled, onSignInClick }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const navItems = [
    { id: 'home',     label: 'Home'     },
    { id: 'features', label: 'Features' },
    { id: 'pricing',  label: 'Pricing'  },
    { id: 'about',    label: 'About'    },
    { id: 'contact',  label: 'Contact'  },
  ];

  const products = [
    { id: 'meika-docs',          icon: FolderOpen,  label: 'MeikaDocs',          desc: 'Secure document vault'      },
    { id: 'meika-authenticator', icon: ShieldCheck, label: 'MeikaAuthenticator', desc: 'Passwordless identity'      },
  ];

  const handleNavClick = (page: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setProductsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
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
            {/* Logo */}
            <motion.button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-lg px-2 py-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center"
                animate={{
                  boxShadow: [
                    '0 0 0px rgba(234, 179, 8, 0)',
                    '0 0 20px rgba(234, 179, 8, 0.4)',
                    '0 0 0px rgba(234, 179, 8, 0)'
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L18 5V11C18 15 12 19 12 19C12 19 6 15 6 11V5L12 2Z" fill="white" opacity="0.9"/>
                  <rect x="10" y="8" width="4" height="6" rx="0.5" fill="#EAB308"/>
                </svg>
              </motion.div>
              <span className="text-xl tracking-tight">Meika</span>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-4 py-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                    currentPage === item.id
                      ? 'text-white'
                      : 'text-[#9EA3B0] hover:text-white hover:bg-white/5'
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  {item.label}
                  {currentPage === item.id && (
                    <motion.div
                      className="absolute inset-0 bg-white/10 rounded-lg -z-10"
                      layoutId="activeNav"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}

              {/* Products dropdown */}
              <div className="relative" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)}>
                <button
                  className={`relative flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                    ['meika-docs','meika-authenticator'].includes(currentPage)
                      ? 'text-white bg-white/10'
                      : 'text-[#9EA3B0] hover:text-white hover:bg-white/5'
                  }`}
                >
                  Products
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {productsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1.5 w-56 bg-[#10121A] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50"
                    >
                      <div className="p-2">
                        {products.map(({ id, icon: Icon, label, desc }) => (
                          <button
                            key={id}
                            onClick={() => handleNavClick(id)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all group ${
                              currentPage === id ? 'bg-white/10' : 'hover:bg-white/5'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              id === 'meika-docs'
                                ? 'bg-indigo-500/15 border border-indigo-500/25'
                                : 'bg-blue-500/15 border border-blue-500/25'
                            }`}>
                              <Icon className={`w-4 h-4 ${id === 'meika-docs' ? 'text-indigo-400' : 'text-blue-400'}`} />
                            </div>
                            <div>
                              <p className="text-white text-xs font-medium">{label}</p>
                              <p className="text-[#9EA3B0] text-[10px]">{desc}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              <motion.button 
                onClick={onSignInClick}
                className="px-5 py-2.5 text-[#9EA3B0] hover:text-white transition-colors rounded-lg hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign In
              </motion.button>
              <motion.button
                className="px-5 py-2.5 bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-[#0A0B0F] shadow-lg shadow-yellow-600/30"
                whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(234, 179, 8, 0.4)' }}
                whileTap={{ scale: 0.95 }}
              >
                Download
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          className="fixed inset-0 z-40 md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-[#0A0B0F]/95 backdrop-blur-xl" onClick={() => setMobileMenuOpen(false)} />
          <motion.div
            className="absolute top-20 left-0 right-0 bg-[#10121A] border-b border-white/10 p-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-3 rounded-lg text-left transition-all focus:outline-none focus:ring-2 focus:ring-yellow-500 ${
                    currentPage === item.id
                      ? 'text-white bg-white/10'
                      : 'text-[#9EA3B0] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              {/* Products — mobile */}
              <div className="pt-2 border-t border-white/10">
                <p className="px-4 pb-1.5 text-[10px] text-[#9EA3B0] uppercase tracking-wider">Products</p>
                {products.map(({ id, icon: Icon, label, desc }) => (
                  <button
                    key={id}
                    onClick={() => handleNavClick(id)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-all ${
                      currentPage === id ? 'bg-white/10 text-white' : 'text-[#9EA3B0] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      id === 'meika-docs' ? 'bg-indigo-500/15 border border-indigo-500/25' : 'bg-blue-500/15 border border-blue-500/25'
                    }`}>
                      <Icon className={`w-3.5 h-3.5 ${id === 'meika-docs' ? 'text-indigo-400' : 'text-blue-400'}`} />
                    </div>
                    <div>
                      <p className="text-xs font-medium">{label}</p>
                      <p className="text-[10px] text-[#9EA3B0]">{desc}</p>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/10">
                <button className="px-4 py-3 text-[#9EA3B0] hover:text-white transition-colors rounded-lg hover:bg-white/5 text-left focus:outline-none focus:ring-2 focus:ring-yellow-500" onClick={onSignInClick}>
                  Sign In
                </button>
                <button className="px-4 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500">
                  Download
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}