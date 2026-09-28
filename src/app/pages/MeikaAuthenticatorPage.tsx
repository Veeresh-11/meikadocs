import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, 
  Key, 
  Fingerprint, 
  Smartphone, 
  Globe, 
  Lock,
  CheckCircle2,
  Users,
  BarChart3,
  Settings,
  Activity,
  Zap,
  Eye,
  AlertTriangle,
  ChevronRight,
  Play
} from 'lucide-react';
import { MeikaLogo } from '../components/MeikaLogo';
import { AuthenticatorNavigation } from '../components/AuthenticatorNavigation';
import { AuthenticatorFooter } from '../components/AuthenticatorFooter';
import { MeikaSignInScreen } from '../components/MeikaSignInScreen';
import { MeikaMFAScreen } from '../components/MeikaMFAScreen';
import { MeikaPasskeyScreen } from '../components/MeikaPasskeyScreen';
import { MeikaSessionsScreen } from '../components/MeikaSessionsScreen';
import { MeikaAdminConsole } from '../components/MeikaAdminConsole';
import { TechGrid, DataStream, FloatingCode, CircuitLines } from '../components/TechAnimations';
import { FloatingParticles } from '../components/ParallaxSection';
import {
  FloatingIdentityIcons,
  HexagonGrid,
  BinaryRain,
  NetworkNodes,
  OrbitingParticles,
  DNAHelix,
  RadarSweep,
  EncryptionCodeRings
} from '../components/AuthenticatorAnimations';

interface MeikaAuthenticatorPageProps {
  setCurrentPage: (page: any) => void;
}

type DemoScreen = 'overview' | 'signin' | 'mfa' | 'passkey' | 'sessions' | 'admin';

export function MeikaAuthenticatorPage({ setCurrentPage }: MeikaAuthenticatorPageProps) {
  const [activeDemo, setActiveDemo] = useState<DemoScreen>('overview');
  const [scrolled, setScrolled] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBackToMain = () => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactClick = () => {
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const features = [
    {
      icon: Fingerprint,
      title: "Passwordless Authentication",
      description: "Biometric sign-in with passkeys, Windows Hello, Touch ID, and Face ID"
    },
    {
      icon: Shield,
      title: "Zero-Trust Security",
      description: "Continuous verification with adaptive risk-based authentication"
    },
    {
      icon: Key,
      title: "FIDO2 & Hardware Keys",
      description: "YubiKey and security key support for maximum protection"
    },
    {
      icon: Smartphone,
      title: "Push Authentication",
      description: "Secure mobile app with number matching and location verification"
    },
    {
      icon: Globe,
      title: "Enterprise SSO",
      description: "OAuth, SAML, OIDC integration with Microsoft, Google, GitHub"
    },
    {
      icon: Activity,
      title: "Threat Detection",
      description: "Real-time risk scoring and anomaly detection with AI"
    }
  ];

  const compliance = [
    { name: "ISO 27001", status: "Certified" },
    { name: "SOC 2 Type II", status: "Certified" },
    { name: "GDPR", status: "Compliant" },
    { name: "FIPS 140-2", status: "Validated" },
    { name: "HIPAA", status: "Compliant" },
    { name: "FedRAMP", status: "In Progress" }
  ];

  const demoScreens = [
    { id: 'signin' as const, label: 'Sign-In', icon: Lock },
    { id: 'mfa' as const, label: 'MFA Challenge', icon: Smartphone },
    { id: 'passkey' as const, label: 'Passkey Manager', icon: Fingerprint },
    { id: 'sessions' as const, label: 'Sessions', icon: Activity },
    { id: 'admin' as const, label: 'Admin Console', icon: Settings }
  ];

  const renderDemoContent = () => {
    switch (activeDemo) {
      case 'signin':
        return <MeikaSignInScreen />;
      case 'mfa':
        return <MeikaMFAScreen />;
      case 'passkey':
        return <MeikaPasskeyScreen />;
      case 'sessions':
        return <MeikaSessionsScreen />;
      case 'admin':
        return <MeikaAdminConsole />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0B0F] via-[#10121A] to-[#0A0B0F]">
      {/* Dedicated Authenticator Navigation */}
      <AuthenticatorNavigation onBackToMain={handleBackToMain} scrolled={scrolled} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500 rounded-full blur-[120px]" />
        </div>

        {/* New Authenticator-specific Animations */}
        <FloatingIdentityIcons />
        <HexagonGrid />
        <BinaryRain />
        <NetworkNodes />
        <OrbitingParticles />
        <EncryptionCodeRings />
        
        {/* Tech Grid Background */}
        <TechGrid />
        
        {/* Circuit Lines */}
        <CircuitLines />
        
        {/* Data Streams */}
        <DataStream />
        
        {/* Floating Code Snippets */}
        <FloatingCode count={15} />
        
        {/* Blue Particles */}
        <FloatingParticles count={25} color="blue" />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo and Brand */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <MeikaLogo size={80} animated />
              <div className="text-left">
                <h1 className="text-5xl lg:text-6xl mb-2">
                  <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-green-400 bg-clip-text text-transparent">
                    Meika
                  </span>
                  <br />
                  <span className="text-white">Authenticator</span>
                </h1>
                <p className="text-sm text-blue-400 uppercase tracking-wider">Meika Security Platform</p>
              </div>
            </div>

            <motion.p 
              className="text-2xl lg:text-3xl text-[#9EA3B0] max-w-4xl mx-auto mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Zero-Trust Passwordless Identity Platform for Secure Applications and Documents
            </motion.p>

            <motion.p 
              className="text-lg text-[#6B7280] max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Enterprise-grade authentication with passkeys, biometric security, and adaptive zero-trust protection. 
              Trusted by global enterprises.
            </motion.p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className="w-5 h-5" />
                Watch Demo
              </motion.button>
              <motion.button
                className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-medium transition-all border border-white/10 flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveDemo('signin')}
              >
                Try Interactive Demo
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-[#6B7280]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>FIDO2 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>SOC 2 Type II</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>ISO 27001</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>GDPR Compliant</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      {activeDemo !== 'overview' && (
        <section id="demo" className="py-20 px-4 relative">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white">Interactive Demo</h2>
              <button
                onClick={() => setActiveDemo('overview')}
                className="px-4 py-2 text-[#9EA3B0] hover:text-white transition-colors"
              >
                ← Back to Overview
              </button>
            </div>

            {/* Demo Screen Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {demoScreens.map((screen) => {
                const Icon = screen.icon;
                return (
                  <button
                    key={screen.id}
                    onClick={() => setActiveDemo(screen.id)}
                    className={`px-6 py-3 rounded-xl transition-all flex items-center gap-2 ${
                      activeDemo === screen.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/5 text-[#9EA3B0] hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {screen.label}
                  </button>
                );
              })}
            </div>

            {/* Demo Content */}
            <motion.div
              key={activeDemo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {renderDemoContent()}
            </motion.div>
          </div>
        </section>
      )}

      {/* Features Grid */}
      {activeDemo === 'overview' && (
        <>
          <section id="features" className="py-20 px-4 relative overflow-hidden">
            {/* Add more background animations */}
            <DNAHelix />
            
            <div className="container mx-auto max-w-7xl relative z-10">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl lg:text-5xl mb-6">
                  <span className="bg-gradient-to-r from-white to-[#9EA3B0] bg-clip-text text-transparent">
                    Enterprise-Grade Security
                  </span>
                </h2>
                <p className="text-xl text-[#9EA3B0] max-w-3xl mx-auto">
                  Built for modern enterprises requiring the highest level of identity protection
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      className="group relative p-8 rounded-2xl bg-gradient-to-b from-white/5 to-white/[0.02] border border-white/10 hover:border-blue-500/50 transition-all duration-300"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      whileHover={{ y: -5 }}
                    >
                      {/* Glassmorphism Effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="relative z-10">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-xl mb-3 text-white">{feature.title}</h3>
                        <p className="text-[#9EA3B0] leading-relaxed">{feature.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Compliance Section */}
          <section id="compliance" className="py-20 px-4 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
            <div className="container mx-auto max-w-7xl">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl lg:text-5xl mb-6">
                  <span className="bg-gradient-to-r from-white to-[#9EA3B0] bg-clip-text text-transparent">
                    Compliance & Certifications
                  </span>
                </h2>
                <p className="text-xl text-[#9EA3B0] max-w-3xl mx-auto">
                  Meeting the highest industry standards for security and privacy
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
                {compliance.map((item, index) => (
                  <motion.div
                    key={index}
                    className="p-6 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                  >
                    <span className="text-white font-medium">{item.name}</span>
                    <span className="text-green-500 text-sm flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      {item.status}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Benchmarks Section */}
          <section className="py-20 px-4 relative overflow-hidden">
            {/* Radar sweep animation */}
            <RadarSweep />
            
            <div className="container mx-auto max-w-7xl relative z-10">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl lg:text-5xl mb-6">
                  <span className="bg-gradient-to-r from-white to-[#9EA3B0] bg-clip-text text-transparent">
                    Competing with the Best
                  </span>
                </h2>
                <p className="text-xl text-[#9EA3B0] max-w-3xl mx-auto mb-8">
                  Meika Authenticator delivers enterprise features on par with industry leaders
                </p>

                <div className="flex flex-wrap items-center justify-center gap-8 text-[#6B7280]">
                  <div className="text-lg">Microsoft Entra ID</div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="text-lg">Okta Workforce Identity</div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="text-lg">Google Identity</div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="text-lg">Apple Passkeys</div>
                </div>
              </motion.div>

              {/* Comparison Table */}
              <motion.div
                className="mt-16 overflow-x-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                    <table className="min-w-full divide-y divide-white/10">
                      <thead>
                        <tr className="bg-white/5">
                          <th className="px-6 py-4 text-left text-sm font-semibold text-white">Feature</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-white">
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-white" />
                              </div>
                              Meika
                            </div>
                          </th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-[#9EA3B0]">Microsoft Entra</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-[#9EA3B0]">Okta</th>
                          <th className="px-6 py-4 text-center text-sm font-semibold text-[#9EA3B0]">Google</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        {[
                          { feature: 'Passkey Support (FIDO2)', meika: true, entra: true, okta: true, google: true },
                          { feature: 'Biometric Authentication', meika: true, entra: true, okta: true, google: true },
                          { feature: 'Hardware Security Keys', meika: true, entra: true, okta: true, google: true },
                          { feature: 'Push Notifications', meika: true, entra: true, okta: true, google: true },
                          { feature: 'Adaptive MFA', meika: true, entra: true, okta: true, google: true },
                          { feature: 'Risk-Based Auth', meika: true, entra: true, okta: true, google: true },
                          { feature: 'Document-Level Security', meika: true, entra: false, okta: false, google: false },
                          { feature: 'Zero-Knowledge Architecture', meika: true, entra: false, okta: false, google: false },
                          { feature: 'Session Management', meika: true, entra: true, okta: true, google: true },
                          { feature: 'Anomaly Detection', meika: true, entra: true, okta: true, google: true },
                          { feature: 'SSO (SAML/OIDC)', meika: true, entra: true, okta: true, google: true },
                          { feature: 'Admin Console', meika: true, entra: true, okta: true, google: true },
                          { feature: 'API Access', meika: true, entra: true, okta: true, google: true },
                          { feature: 'Custom Branding', meika: true, entra: true, okta: true, google: true },
                          { feature: 'Mobile SDK', meika: true, entra: true, okta: true, google: true },
                        ].map((row, index) => (
                          <motion.tr
                            key={index}
                            className="hover:bg-white/5 transition-colors"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                          >
                            <td className="px-6 py-4 text-sm text-[#9EA3B0] whitespace-nowrap">{row.feature}</td>
                            <td className="px-6 py-4 text-center">
                              {row.meika ? (
                                <CheckCircle2 className="w-5 h-5 text-green-400 mx-auto" />
                              ) : (
                                <div className="w-5 h-5 mx-auto rounded-full border-2 border-white/20" />
                              )}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {row.entra ? (
                                <CheckCircle2 className="w-5 h-5 text-blue-400/60 mx-auto" />
                              ) : (
                                <div className="w-5 h-5 mx-auto rounded-full border-2 border-white/10" />
                              )}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {row.okta ? (
                                <CheckCircle2 className="w-5 h-5 text-blue-400/60 mx-auto" />
                              ) : (
                                <div className="w-5 h-5 mx-auto rounded-full border-2 border-white/10" />
                              )}
                            </td>
                            <td className="px-6 py-4 text-center">
                              {row.google ? (
                                <CheckCircle2 className="w-5 h-5 text-blue-400/60 mx-auto" />
                              ) : (
                                <div className="w-5 h-5 mx-auto rounded-full border-2 border-white/10" />
                              )}
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>

              {/* Key Differentiators */}
              <motion.div
                className="mt-16 grid md:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
                  <Zap className="w-10 h-10 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Document-Level Security</h3>
                  <p className="text-[#9EA3B0]">
                    Unique integration with SecureDocs platform for granular document access control
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
                  <Shield className="w-10 h-10 text-green-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Zero-Knowledge Architecture</h3>
                  <p className="text-[#9EA3B0]">
                    End-to-end encryption ensuring even we can't access your authentication data
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 border border-cyan-500/20">
                  <BarChart3 className="w-10 h-10 text-cyan-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Transparent Pricing</h3>
                  <p className="text-[#9EA3B0]">
                    Simple, predictable pricing without hidden enterprise fees or surprise charges
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4">
            <div className="container mx-auto max-w-4xl">
              <motion.div
                className="relative p-12 rounded-3xl bg-gradient-to-br from-blue-500/20 to-green-500/20 border border-white/10 overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-green-500/10 backdrop-blur-xl" />
                
                <div className="relative z-10 text-center">
                  <h2 className="text-4xl lg:text-5xl mb-6 text-white">
                    Ready to Secure Your Enterprise?
                  </h2>
                  <p className="text-xl text-[#9EA3B0] mb-8 max-w-2xl mx-auto">
                    Join thousands of organizations protecting their users with Meika Authenticator
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <motion.button
                      className="px-8 py-4 bg-white text-blue-600 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Start Free Trial
                    </motion.button>
                    <motion.button
                      className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all border border-white/20"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleContactClick}
                    >
                      Contact Sales
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      )}

      <AuthenticatorFooter onBackToMain={handleBackToMain} onContactClick={handleContactClick} />
    </div>
  );
}