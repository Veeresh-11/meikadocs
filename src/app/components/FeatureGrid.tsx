import { motion } from 'motion/react';
import { Shield, Zap, Lock, HardDrive } from 'lucide-react';
import { FeatureCard } from './FeatureCard';
import { ParallaxSection } from './ParallaxSection';

export function FeatureGrid() {
  const features = [
    {
      icon: Lock,
      title: 'Local Encryption',
      description: 'Your files are encrypted on your device before anything else. We never see your data.',
      color: 'yellow' as const
    },
    {
      icon: HardDrive,
      title: 'No Cloud Uploads',
      description: 'Documents stay on your machine. Sync is optional, encryption is mandatory.',
      color: 'amber' as const
    },
    {
      icon: Zap,
      title: 'Works Offline',
      description: 'Full functionality without internet. Encrypt, decrypt, and manage files anywhere.',
      color: 'orange' as const
    },
    {
      icon: Shield,
      title: 'Strong Authentication',
      description: 'Multi-factor authentication and biometric support keep your vault secure.',
      color: 'cyan' as const
    }
  ];

  return (
    <section className="container mx-auto px-4 lg:px-8 py-16 relative">
      <ParallaxSection speed={-0.3}>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl lg:text-4xl tracking-tight mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            Enterprise Security, <span className="text-yellow-400">Consumer Simplicity</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-[#9EA3B0]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Everything you need to protect sensitive documents
          </motion.p>
        </motion.div>
      </ParallaxSection>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, rotateX: -15 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: 0.7,
              delay: index * 0.15,
              ease: [0.21, 0.47, 0.32, 0.98]
            }}
          >
            <FeatureCard
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0}
              color={feature.color}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}