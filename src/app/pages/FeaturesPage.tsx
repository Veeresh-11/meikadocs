import { motion } from 'motion/react';
import { Shield, Lock, Zap, HardDrive, Users, Globe, FileCheck, Eye } from 'lucide-react';
import { FeatureCard } from '../components/FeatureCard';
import { StorytellingSection } from '../components/StorytellingSection';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';

interface FeaturesPageProps {
  setCurrentPage: (page: string) => void;
}

export function FeaturesPage({ setCurrentPage }: FeaturesPageProps) {
  const features = [
    {
      icon: Lock,
      title: 'Local Encryption',
      description: 'Military-grade AES-256 encryption happens directly on your device. No cloud uploads required.',
      color: 'indigo'
    },
    {
      icon: HardDrive,
      title: 'Works Offline',
      description: 'Full functionality without internet. Sync when you\'re ready, encrypt always.',
      color: 'blue'
    },
    {
      icon: Shield,
      title: 'Zero-Knowledge',
      description: 'We never see your files or encryption keys. True end-to-end privacy.',
      color: 'violet'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance with instant encryption and decryption of large files.',
      color: 'cyan'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Share encrypted documents securely with colleagues without compromising privacy.',
      color: 'indigo'
    },
    {
      icon: Globe,
      title: 'Global Compliance',
      description: 'GDPR, HIPAA, SOC 2 compliant. Meet regulations in every jurisdiction.',
      color: 'blue'
    },
    {
      icon: FileCheck,
      title: 'Audit Logs',
      description: 'Comprehensive tracking of all file access and modifications for compliance.',
      color: 'violet'
    },
    {
      icon: Eye,
      title: 'Granular Permissions',
      description: 'Role-based access control with custom permission levels for every team member.',
      color: 'cyan'
    }
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="container mx-auto px-4 lg:px-8 py-24 lg:py-32">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-400 text-sm mb-6">
            Platform Features
          </div>
          <h1 className="text-4xl lg:text-6xl tracking-tight mb-6">
            Everything You Need to
            <br />
            <span className="text-yellow-400">Protect Your Documents</span>
          </h1>
          <p className="text-xl text-[#9EA3B0] leading-relaxed">
            Enterprise-grade security meets intuitive design. Discover the features that make Meika the trusted choice for privacy-conscious teams.
          </p>
        </motion.div>
      </section>

      {/* Feature Grid */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
              color={feature.color as any}
            />
          ))}
        </div>
      </section>

      {/* Storytelling Sections */}
      <StorytellingSection
        eyebrow="Security First"
        headline="Encryption That Never Compromises"
        description="Meika employs bank-level encryption standards combined with zero-knowledge architecture. Your files are encrypted before they ever leave your device, and only you hold the keys."
        features={[
          'AES-256-GCM encryption standard',
          'RSA-4096 key exchange',
          'Secure key derivation (PBKDF2)',
          'Perfect forward secrecy'
        ]}
        imageSide="right"
      />

      <StorytellingSection
        eyebrow="Seamless Workflow"
        headline="Security Without the Friction"
        description="Protect your documents without disrupting your workflow. Drag, drop, and encrypt in seconds. Share with teammates without compromising security or speed."
        features={[
          'Instant file encryption',
          'Automatic background sync',
          'Native desktop integration',
          'Smart conflict resolution'
        ]}
        imageSide="left"
      />

      <CTASection
        headline="See Meika in Action"
        description="Schedule a personalized demo with our security experts."
        ctaLabel="Book a Demo"
        ctaAction={() => console.log('Book demo')}
      />

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}