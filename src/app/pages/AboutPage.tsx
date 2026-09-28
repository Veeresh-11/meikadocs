import { motion } from 'motion/react';
import { Shield, Award, Lock, Globe } from 'lucide-react';
import { CTASection } from '../components/CTASection';
import { Footer } from '../components/Footer';

interface AboutPageProps {
  setCurrentPage: (page: string) => void;
}

export function AboutPage({ setCurrentPage }: AboutPageProps) {
  const team = [
    { name: 'Veeresh Babu', role: 'CEO & Co-Founder', initials: 'VB' },
  ];

  const badges = [
    { icon: Shield, label: 'SOC 2 Type II Certified' },
    { icon: Lock, label: 'GDPR Compliant' },
    { icon: Award, label: 'ISO 27001 Certified' },
    { icon: Globe, label: 'HIPAA Compliant' }
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="container mx-auto px-4 lg:px-8 py-24 lg:py-32">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-400 text-sm mb-6">
            Our Mission
          </div>
          <h1 className="text-4xl lg:text-6xl tracking-tight mb-6">
            Privacy First,
            <br />
            <span className="text-yellow-400">Always</span>
          </h1>
          <p className="text-xl text-[#9EA3B0] leading-relaxed">
            We believe privacy is a fundamental right, not a feature. Meika was founded to give individuals and organizations complete control over their sensitive documents—without compromising on usability or performance.
          </p>
        </motion.div>
      </section>

      {/* Mission Statement */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <motion.div
          className="max-w-5xl mx-auto bg-gradient-to-br from-yellow-600/10 to-amber-600/10 border border-yellow-500/20 rounded-3xl p-8 lg:p-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl lg:text-4xl tracking-tight mb-6">
                Why We Built Meika
              </h2>
              <p className="text-[#9EA3B0] leading-relaxed mb-4">
                In 2021, we witnessed countless data breaches affecting millions of users who trusted cloud providers with their most sensitive information. We knew there had to be a better way.
              </p>
              <p className="text-[#9EA3B0] leading-relaxed">
                Meika was born from a simple idea: encryption should happen on your device, not in someone else's cloud. Your files should never leave your control, and no one—including us—should have access to your data.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg mb-2">Zero-Knowledge Architecture</h3>
                  <p className="text-[#9EA3B0] text-sm">We can't access your files even if we wanted to</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg mb-2">Military-Grade Encryption</h3>
                  <p className="text-[#9EA3B0] text-sm">AES-256 encryption trusted by governments worldwide</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg mb-2">Open Source & Audited</h3>
                  <p className="text-[#9EA3B0] text-sm">Independently verified by security researchers</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Compliance Badges */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="text-2xl lg:text-3xl tracking-tight mb-4">
            Trusted & Certified
          </h2>
          <p className="text-[#9EA3B0] mb-12">
            Meeting the highest standards for security and compliance
          </p>
          <div className="grid md:grid-cols-4 gap-6">
            {badges.map((badge, index) => (
              <motion.div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                <badge.icon className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                <p className="text-sm text-center">{badge.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 lg:px-8 py-24">
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl tracking-tight mb-4">
              Meet the Team
            </h2>
            <p className="text-[#9EA3B0]">
              Security experts, engineers, and privacy advocates
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
              >
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-yellow-600 to-amber-500 rounded-2xl flex items-center justify-center text-3xl transition-transform group-hover:scale-105">
                  {member.initials}
                </div>
                <h3 className="text-lg mb-1">{member.name}</h3>
                <p className="text-[#9EA3B0] text-sm">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Values */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <h2 className="text-3xl lg:text-4xl tracking-tight mb-12 text-center">
            Our Values
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Privacy by Design', desc: 'Security isn\'t an afterthought—it\'s built into every decision we make.' },
              { title: 'Transparency', desc: 'Open source code, regular audits, and clear communication about how we protect your data.' },
              { title: 'User First', desc: 'Powerful security that doesn\'t compromise on usability or performance.' }
            ].map((value, index) => (
              <motion.div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
              >
                <h3 className="text-xl mb-3">{value.title}</h3>
                <p className="text-[#9EA3B0]">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <CTASection
        headline="Join Us in Building a More Private Future"
        description="We're hiring talented engineers and security researchers."
        ctaLabel="View Careers"
        ctaAction={() => console.log('Careers')}
      />

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}