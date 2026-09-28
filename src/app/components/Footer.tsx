import { motion } from 'motion/react';
import { Mail, Github, Twitter, Linkedin, Youtube, Send } from 'lucide-react';
import { useState } from 'react';

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export function Footer({ setCurrentPage }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNavClick = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with actual email service
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  const links = {
    product: [
      { label: 'Features', page: 'features' },
      { label: 'Pricing', page: 'pricing' },
      { label: 'Security', page: 'security' },
      { label: 'Roadmap', page: 'roadmap' }
    ],
    company: [
      { label: 'About', page: 'about' },
      { label: 'Blog', page: 'blog' },
      { label: 'Careers', page: 'careers' },
      { label: 'Contact', page: 'contact' }
    ],
    resources: [
      { label: 'Documentation', page: 'documentation' },
      { label: 'API Reference', page: 'api-reference' },
      { label: 'Support', page: 'support' },
      { label: 'Status', page: 'status' }
    ],
    legal: [
      { label: 'Privacy Policy', page: 'privacy' },
      { label: 'Terms of Service', page: 'terms' },
      { label: 'Cookie Policy', page: 'cookies' },
      { label: 'GDPR', page: 'gdpr' }
    ]
  };

  return (
    <footer className="border-t border-white/10 bg-[#0A0B0F]">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L18 5V11C18 15 12 19 12 19C12 19 6 15 6 11V5L12 2Z" fill="white" opacity="0.9"/>
                </svg>
              </div>
              <span className="text-xl tracking-tight">Meika</span>
            </div>
            <p className="text-[#9EA3B0] text-sm leading-relaxed mb-6">
              Enterprise-grade secure document platform with military-grade encryption. 
              Your privacy is our priority.
            </p>
            
            {/* Newsletter Signup */}
            <div>
              <h3 className="text-sm mb-3 text-white">Stay Updated</h3>
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-[#9EA3B0] focus:outline-none focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20 transition-all"
                  />
                  {subscribed && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 bg-green-600/20 border border-green-500/50 rounded-lg flex items-center justify-center backdrop-blur-sm"
                    >
                      <span className="text-green-400 text-sm">✓ Subscribed!</span>
                    </motion.div>
                  )}
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-2 bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-500/30 rounded-lg text-sm text-yellow-200 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Subscribe
                </motion.button>
              </form>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm mb-4 text-white">Product</h3>
            <ul className="space-y-3">
              {links.product.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => handleNavClick(link.page)}
                    className="text-[#9EA3B0] text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm mb-4 text-white">Company</h3>
            <ul className="space-y-3">
              {links.company.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => handleNavClick(link.page)}
                    className="text-[#9EA3B0] text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm mb-4 text-white">Resources</h3>
            <ul className="space-y-3">
              {links.resources.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => handleNavClick(link.page)}
                    className="text-[#9EA3B0] text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm mb-4 text-white">Legal</h3>
            <ul className="space-y-3">
              {links.legal.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => handleNavClick(link.page)}
                    className="text-[#9EA3B0] text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[#9EA3B0] text-sm">
            © 2026 Meika. All rights reserved.
          </p>
          
          {/* Social Media Links */}
          <div className="flex items-center gap-4">
            <a 
              href="https://twitter.com/meika" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#9EA3B0] hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a 
              href="https://github.com/meika" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#9EA3B0] hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a 
              href="https://linkedin.com/company/meika" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#9EA3B0] hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href="https://youtube.com/@meika" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#9EA3B0] hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
            <a 
              href="mailto:support@meika.io" 
              className="text-[#9EA3B0] hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}