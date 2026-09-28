import { motion } from 'motion/react';
import { Github, Twitter, Linkedin, Shield, Lock, FolderOpen, ExternalLink } from 'lucide-react';

interface MeikaDocsFooterProps {
  onBackToMain: () => void;
  onContactClick: () => void;
}

export function MeikaDocsFooter({ onBackToMain, onContactClick }: MeikaDocsFooterProps) {
  const year = new Date().getFullYear();

  const productLinks = [
    { label: 'Features',      href: '#features'      },
    { label: 'Live Demo',     href: '#demo'          },
    { label: 'Security',      href: '#security'      },
    { label: 'Integrations',  href: '#integrations'  },
    { label: 'Pricing',       onClick: onBackToMain  },
  ];

  const integrationLinks = [
    { label: 'Google Drive', href: '#' },
    { label: 'OneDrive',     href: '#' },
    { label: 'Dropbox',      href: '#' },
    { label: 'Box',          href: '#' },
    { label: 'iCloud Drive', href: '#' },
  ];

  const companyLinks = [
    { label: 'Main Website',   onClick: onBackToMain   },
    { label: 'About Meika',    onClick: onBackToMain   },
    { label: 'Contact Sales',  onClick: onContactClick },
    { label: 'Support',        href: '#'               },
  ];

  const legalLinks = [
    { label: 'Privacy Policy',   href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Security Policy',  href: '#' },
    { label: 'Cookie Policy',    href: '#' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-transparent to-[#030408] border-t border-white/8 pt-20 pb-8">
      {/* Background glow — mirrors AuthenticatorFooter */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Main grid — identical structure to AuthenticatorFooter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">

          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">
                  <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Meika</span>
                  <span className="text-white"> Docs</span>
                </h3>
                <p className="text-xs text-[#6B7280]">Secure Document Vault</p>
              </div>
            </div>
            <p className="text-[#9EA3B0] leading-relaxed mb-6 max-w-md text-sm">
              One secure vault that connects Google Drive, OneDrive, Dropbox, Box and local files —
              with identity-verified access controls and OrangeDox-style sharing on every document.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                <Shield className="w-4 h-4 text-indigo-400" />
                <span className="text-xs text-[#9EA3B0]">AES-256 Encrypted</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10">
                <Lock className="w-4 h-4 text-violet-400" />
                <span className="text-xs text-[#9EA3B0]">SOC 2 Type II</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <motion.a key={i} href="#"
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-[#9EA3B0] hover:text-white transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {productLinks.map((link, i) => (
                <li key={i}>
                  {'onClick' in link && link.onClick ? (
                    <button onClick={link.onClick} className="text-[#9EA3B0] hover:text-white transition-colors flex items-center gap-1 group text-sm">
                      {link.label}
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ) : (
                    <a href={(link as any).href} className="text-[#9EA3B0] hover:text-white transition-colors text-sm">{link.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Integrations */}
          <div>
            <h4 className="text-white font-semibold mb-4">Integrations</h4>
            <ul className="space-y-3">
              {integrationLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-[#9EA3B0] hover:text-white transition-colors text-sm">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {companyLinks.map((link, i) => (
                <li key={i}>
                  {'onClick' in link && link.onClick ? (
                    <button onClick={link.onClick} className="text-[#9EA3B0] hover:text-white transition-colors flex items-center gap-1 group text-sm">
                      {link.label}
                      {link.label.includes('Website') && <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
                    </button>
                  ) : (
                    <a href={(link as any).href} className="text-[#9EA3B0] hover:text-white transition-colors text-sm">{link.label}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter — mirrors AuthenticatorFooter */}
        <div className="border-t border-white/8 pt-8 mb-8">
          <div className="max-w-md">
            <h4 className="text-white font-semibold mb-2">Stay Updated</h4>
            <p className="text-[#9EA3B0] text-sm mb-4">Product updates and security news from the Meika team.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-[#6B7280] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <motion.button
                className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white rounded-lg text-sm transition-all shadow-lg shadow-indigo-500/20"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#6B7280] text-sm">© {year} Meika Security Platform. All rights reserved.</p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {legalLinks.map((link, i) => (
                <a key={i} href={link.href} className="text-[#6B7280] hover:text-[#9EA3B0] transition-colors text-sm">{link.label}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Security notice — mirrors AuthenticatorFooter */}
        <div className="mt-8 p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-lg">
          <p className="text-xs text-[#9EA3B0] text-center">
            🔒 MeikaDocs uses AES-256 encryption at rest and TLS 1.3 in transit. Every access event is logged immutably. SOC 2 Type II, ISO 27001, and GDPR compliant.
          </p>
        </div>
      </div>
    </footer>
  );
}
