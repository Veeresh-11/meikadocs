import { motion } from 'motion/react';
import { useEffect } from 'react';
import { ArrowRight, AlertTriangle, Shield, Key, Fingerprint, FolderOpen, Upload, Share2, Lock } from 'lucide-react';
import { HeroSection } from '../components/HeroSection';
import { FeatureGrid } from '../components/FeatureGrid';
import { StorytellingSection } from '../components/StorytellingSection';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';
import { MeikaLogo } from '../components/MeikaLogo';
import { 
  FloatingSecurityIcons, 
  RippleEffect, 
  GlowingConstellation, 
  WaveBackground,
  SpinningRings
} from '../components/MeikaAnimations';

interface LandingPageProps {
  onShowExposure?: () => void;
  onShowAuth?: () => void;
  setCurrentPage: (page: string) => void;
}

export function LandingPage({ onShowExposure, onShowAuth, setCurrentPage }: LandingPageProps) {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="pt-20 relative">
      {/* Additional Meika-specific background animations */}
      <FloatingSecurityIcons />
      <GlowingConstellation />
      
      {/* Security Awareness Banner */}
      {onShowExposure && (
        <motion.div
          className="container mx-auto px-6 py-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            onClick={onShowExposure}
            className="group relative w-full bg-gradient-to-r from-red-600/10 via-orange-600/10 to-red-600/10 border border-red-500/30 hover:border-red-500/50 rounded-2xl px-6 py-4 transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {/* Animated background pulse */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-600/5 via-orange-600/5 to-red-600/5"
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            <div className="relative z-10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <motion.div
                  className="p-3 bg-red-600/20 rounded-full"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </motion.div>
                <div className="text-left">
                  <div className="text-white mb-1">
                    Not sure if you need encryption?
                  </div>
                  <div className="text-sm text-[#9EA3B0]">
                    Click here to see why security is important — discover what data you're exposing right now
                  </div>
                </div>
              </div>
              <motion.div
                className="flex items-center gap-2 text-red-400"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="text-sm whitespace-nowrap">See Your Exposure</span>
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </div>
          </motion.button>
        </motion.div>
      )}

      <HeroSection
        eyebrow="Privacy-First Document Security"
        headline="Secure Your Files. Stay in Control."
        subtext="Offline-first encryption designed for privacy, trust, and global compliance."
        primaryCTA={{ label: 'Download Software', action: () => console.log('Download') }}
        secondaryCTA={{ label: 'Explore Features', action: () => console.log('Features') }}
      />

      <FeatureGrid />

      <StorytellingSection
        eyebrow="Complete Control"
        headline="Your Files Never Leave Your Device"
        description="Meika uses military-grade encryption to protect your documents locally. No cloud uploads, no third-party access, no compromises. Your data stays exactly where it belongs—with you."
        features={[
          'End-to-end AES-256 encryption',
          'Zero-knowledge architecture',
          'Offline-first design',
          'Cross-platform compatibility'
        ]}
        imageSide="right"
      />

      <StorytellingSection
        eyebrow="Enterprise Ready"
        headline="Built for Teams, Scaled for Compliance"
        description="Meet GDPR, HIPAA, and SOC 2 requirements out of the box. Centralized policy management, audit logs, and advanced access controls—without sacrificing the user experience."
        features={[
          'Role-based access control',
          'Comprehensive audit trails',
          'SSO & 2FA support',
          'Custom retention policies'
        ]}
        imageSide="left"
      />

      {/* Meika Authenticator Product Showcase */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500 rounded-full blur-[120px]" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            className="relative p-12 rounded-3xl bg-gradient-to-br from-blue-500/10 via-transparent to-green-500/10 border border-white/10 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Glassmorphism Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-green-500/5 backdrop-blur-xl" />
            
            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-12">
                <motion.div
                  className="flex items-center justify-center gap-3 mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <MeikaLogo size={60} />
                  <div className="text-left">
                    <h3 className="text-3xl font-bold">
                      <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                        Meika Authenticator
                      </span>
                    </h3>
                    <p className="text-sm text-blue-400">Meika Security Platform</p>
                  </div>
                </motion.div>
                
                <motion.p
                  className="text-xl text-[#9EA3B0] max-w-3xl mx-auto"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Zero-Trust Passwordless Identity Platform for Secure Applications and Documents
                </motion.p>
              </div>

              {/* Features */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {[
                  { icon: Fingerprint, title: 'Passwordless Auth', desc: 'Biometric & passkey security' },
                  { icon: Shield, title: 'Zero-Trust', desc: 'Adaptive risk-based protection' },
                  { icon: Key, title: 'FIDO2 & Hardware', desc: 'YubiKey support' }
                ].map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      whileHover={{ y: -5 }}
                    >
                      <Icon className="w-10 h-10 text-blue-400 mb-3" />
                      <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
                      <p className="text-sm text-[#9EA3B0]">{feature.desc}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA */}
              <div className="text-center">
                <motion.button
                  onClick={() => setCurrentPage('meika-authenticator')}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white rounded-xl font-medium transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 inline-flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Meika Authenticator
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MeikaDocs Product Showcase */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-violet-500 rounded-full blur-[120px]" />
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            className="relative p-12 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-transparent to-violet-500/10 border border-white/10 overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 backdrop-blur-xl" />
            <div className="relative z-10">
              <div className="text-center mb-12">
                <motion.div className="flex items-center justify-center gap-3 mb-6"
                  initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }}>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <FolderOpen className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-3xl font-bold">
                      <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">Meika</span>
                      <span className="text-white"> Docs</span>
                    </h3>
                    <p className="text-sm text-indigo-400">Secure Document Vault</p>
                  </div>
                </motion.div>
                <motion.p className="text-xl text-[#9EA3B0] max-w-3xl mx-auto"
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.6 }}>
                  Import from Google Drive, OneDrive, Dropbox and more. Add identity-verified security layers. Share like OrangeDox.
                </motion.p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {[
                  { icon: Upload, title: 'Universal Cloud Import', desc: 'Connect 6+ cloud sources in seconds' },
                  { icon: Lock,   title: 'Identity-Verified Access', desc: '"Was this you?" alert on every open' },
                  { icon: Share2, title: 'Tracked Sharing',         desc: 'See who opened your files, when and where' },
                ].map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <motion.div key={i} className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-indigo-500/50 transition-all"
                      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 + i * 0.1 }} whileHover={{ y: -5 }}>
                      <Icon className="w-10 h-10 text-indigo-400 mb-3" />
                      <h4 className="text-white font-semibold mb-2">{f.title}</h4>
                      <p className="text-sm text-[#9EA3B0]">{f.desc}</p>
                    </motion.div>
                  );
                })}
              </div>
              <div className="text-center">
                <motion.button
                  onClick={() => setCurrentPage('meika-docs')}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white rounded-xl font-medium transition-all shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 inline-flex items-center gap-2"
                  initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.8 }}
                  whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  Explore MeikaDocs
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <CTASection
        headline="Ready to Secure Your Documents?"
        description="Start encrypting files in minutes. No credit card required."
        ctaLabel="Start Free Trial"
        ctaAction={() => console.log('Start trial')}
      />

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}