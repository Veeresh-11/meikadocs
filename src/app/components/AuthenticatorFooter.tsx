import { motion } from 'motion/react';
import { Github, Twitter, Linkedin, Mail, Shield, Lock, FileText, ExternalLink } from 'lucide-react';
import { MeikaLogo } from './MeikaLogo';

interface AuthenticatorFooterProps {
  onBackToMain: () => void;
  onContactClick: () => void;
}

export function AuthenticatorFooter({ onBackToMain, onContactClick }: AuthenticatorFooterProps) {
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Interactive Demo', href: '#demo' },
    { label: 'Compliance', href: '#compliance' },
    { label: 'Pricing', onClick: onBackToMain },
  ];

  const resourceLinks = [
    { label: 'Documentation', href: '#' },
    { label: 'API Reference', href: '#' },
    { label: 'Integration Guides', href: '#' },
    { label: 'Security', href: '#' },
  ];

  const companyLinks = [
    { label: 'Main Website', onClick: onBackToMain },
    { label: 'About Us', onClick: onBackToMain },
    { label: 'Contact Sales', onClick: onContactClick },
    { label: 'Support', href: '#' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Security Policy', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-transparent to-[#0A0B0F] border-t border-white/5 pt-20 pb-8">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-500 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <MeikaLogo size={48} animated />
              <div>
                <h3 className="text-xl font-semibold">
                  <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                    Meika
                  </span>
                  <span className="text-white"> Authenticator</span>
                </h3>
                <p className="text-xs text-[#6B7280]">Zero-Trust Identity Platform</p>
              </div>
            </div>
            <p className="text-[#9EA3B0] leading-relaxed mb-6 max-w-md">
              Enterprise-grade passwordless authentication with passkeys, biometric security, and adaptive zero-trust protection.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="text-xs text-[#9EA3B0]">FIDO2 Certified</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                <Lock className="w-4 h-4 text-blue-500" />
                <span className="text-xs text-[#9EA3B0]">SOC 2 Type II</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              <motion.a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-[#9EA3B0] hover:text-white transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-[#9EA3B0] hover:text-white transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-[#9EA3B0] hover:text-white transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {productLinks.map((link, index) => (
                <li key={index}>
                  {link.onClick ? (
                    <button
                      onClick={link.onClick}
                      className="text-[#9EA3B0] hover:text-white transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      className="text-[#9EA3B0] hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-[#9EA3B0] hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  {link.onClick ? (
                    <button
                      onClick={link.onClick}
                      className="text-[#9EA3B0] hover:text-white transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      {link.label.includes('Website') && (
                        <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      className="text-[#9EA3B0] hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-white/5 pt-8 mb-8">
          <div className="max-w-md">
            <h4 className="text-white font-semibold mb-2">Stay Updated</h4>
            <p className="text-[#9EA3B0] text-sm mb-4">
              Get the latest security updates and product news.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <motion.button
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-lg transition-all shadow-lg shadow-blue-500/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-[#6B7280] text-sm">
              © {currentYear} Meika Security Platform. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-[#6B7280] hover:text-[#9EA3B0] transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
          <p className="text-xs text-[#9EA3B0] text-center">
            🔒 Meika Authenticator is designed for enterprise security. ISO 27001, SOC 2 Type II, and FIPS 140-2 validated.
          </p>
        </div>
      </div>
    </footer>
  );
}
