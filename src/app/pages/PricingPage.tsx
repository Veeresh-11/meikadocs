import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { PricingCard } from '../components/PricingCard';
import { Footer } from '../components/Footer';

interface PricingPageProps {
  setCurrentPage: (page: string) => void;
}

export function PricingPage({ setCurrentPage }: PricingPageProps) {
  const plans = [
    {
      eyebrow: 'For basic use',
      name: 'Free',
      price: '$0',
      priceContext: ['forever', 'no credit card'],
      description: 'Perfect for individuals exploring secure document encryption.',
      sectionTitle: 'Free Plan includes',
      features: [
        { text: 'Up to 5 encrypted files', tooltip: 'Store and encrypt up to 5 documents at once with military-grade AES-256 encryption' },
        { text: 'Local encryption only' },
        { text: 'Basic file sharing' },
        { text: 'Desktop app access' },
        { text: 'Community support' }
      ],
      ctaLabel: 'Start Free Trial',
      ctaVariant: 'indigo' as const,
      highlighted: false
    },
    {
      eyebrow: 'For professionals',
      name: 'Pro',
      price: '$15',
      priceContext: ['per member', 'per month + tax'],
      description: 'Advanced features for freelancers and power users who need more.',
      sectionTitle: 'Everything in Free, plus',
      features: [
        { text: 'Unlimited encrypted files', tooltip: 'No limits on the number of files you can encrypt and store securely' },
        { text: 'Priority email support', tooltip: '24-hour response time from our security experts' },
        { text: 'Advanced sharing controls', tooltip: 'Set expiration dates, download limits, and password protection for shared files' },
        { text: 'Mobile apps included' },
        { text: 'Version history (30 days)', tooltip: 'Access previous versions of your encrypted files for up to 30 days' },
        { text: 'Custom encryption keys' }
      ],
      ctaLabel: 'Start Free Trial',
      ctaVariant: 'indigo' as const,
      highlighted: false
    },
    {
      eyebrow: 'Most popular',
      name: 'Team',
      price: '$29',
      priceContext: ['per member', 'per month + tax'],
      description: 'Complete security suite for teams and small organizations.',
      sectionTitle: 'Everything in Pro, plus',
      features: [
        { text: 'Team collaboration (up to 10)', tooltip: 'Share and collaborate with up to 10 team members with granular permissions' },
        { text: 'Audit logs & compliance', tooltip: 'Full audit trails for SOC 2, GDPR, and HIPAA compliance requirements' },
        { text: 'SSO & 2FA authentication', tooltip: 'Single sign-on integration with enterprise identity providers and two-factor authentication' },
        { text: 'Priority 24/7 support', tooltip: 'Round-the-clock assistance via chat, email, and phone' },
        { text: 'Custom retention policies', tooltip: 'Define how long files are stored and when they should be automatically deleted' },
        { text: 'Advanced admin controls' },
        { text: 'Version history (90 days)' }
      ],
      ctaLabel: 'Start Free Trial',
      ctaVariant: 'white' as const,
      highlighted: true
    },
    {
      eyebrow: 'For multiple teams',
      name: 'Enterprise',
      price: 'Custom',
      priceContext: ['contact sales', 'volume pricing'],
      description: 'Tailored solutions for large organizations with advanced needs.',
      sectionTitle: 'Everything in Team, plus',
      features: [
        { text: 'Unlimited team members' },
        { text: 'Advanced admin controls', tooltip: 'Centralized policy management, user provisioning, and detailed reporting dashboards' },
        { text: 'Custom integrations', tooltip: 'API access and custom integrations with your existing security infrastructure' },
        { text: 'Dedicated account manager' },
        { text: 'SLA guarantees', tooltip: '99.9% uptime guarantee with dedicated infrastructure and priority incident response' },
        { text: 'On-premise deployment' },
        { text: 'Custom compliance packages' },
        { text: 'Unlimited version history' }
      ],
      ctaLabel: 'Book a Meeting',
      ctaVariant: 'indigo' as const,
      highlighted: false
    }
  ];

  return (
    <div className="pt-20 relative">
      {/* Subtle gradient bands */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-yellow-600/5 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-amber-600/5 to-transparent" />
      </div>

      {/* Soft vignette edges */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#0A0B0F]" />
      </div>

      {/* Header Lockup */}
      <section className="container mx-auto px-4 lg:px-8 py-24 lg:py-32 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex-1">
              <div className="inline-block px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-400 text-xs uppercase tracking-widest mb-6">
                Plans & Pricing
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl tracking-tight max-w-2xl">
                Plans that fit how you work.
              </h1>
            </div>

            {/* Ghost link with animated arrow */}
            <motion.a
              href="#pricing-details"
              className="group flex items-center gap-2 text-[#B7BAC6] hover:text-white transition-colors"
              whileHover="hover"
            >
              <span className="text-sm tracking-wide">Explore Pricing</span>
              <motion.div
                className="relative w-6 h-6"
                variants={{
                  hover: { x: 4 }
                }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="w-5 h-5" />
                <motion.div
                  className="absolute right-full top-1/2 -translate-y-1/2 mr-1 h-[2px] bg-current"
                  initial={{ width: 0 }}
                  variants={{
                    hover: { width: 12 }
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.div>
            </motion.a>
          </motion.div>

          <motion.p
            className="text-lg lg:text-xl text-[#9EA3B0] max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Start free, upgrade when you need more. All plans include core encryption features with no hidden fees.
          </motion.p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section id="pricing-details" className="container mx-auto px-4 lg:px-8 pb-24 lg:pb-32 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-[1400px] mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} delay={index * 0.12} />
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          className="max-w-4xl mx-auto mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2 className="text-2xl lg:text-3xl tracking-tight mb-4">
            All plans include 14-day free trial
          </h2>
          <p className="text-[#9EA3B0] mb-8">
            No credit card required. Cancel anytime. Upgrade or downgrade as your needs change.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#B7BAC6]">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Instant activation</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 lg:px-8 py-24 lg:py-32 relative border-t border-white/5">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-[#9EA3B0]">
              Everything you need to know about our pricing
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                q: 'Can I switch plans at any time?',
                a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any credits or charges.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and bank transfers for Enterprise customers.'
              },
              {
                q: 'Is there really a free trial?',
                a: 'Yes! Pro and Team plans come with a 14-day free trial. No credit card required to start—just sign up and begin encrypting files.'
              },
              {
                q: 'What happens to my files if I downgrade?',
                a: 'Your files remain encrypted and accessible. You\'ll only lose access to premium features like team collaboration and extended version history.'
              },
              {
                q: 'Do you offer educational or non-profit pricing?',
                a: 'Yes! We offer special pricing for educational institutions and registered non-profit organizations. Contact our sales team for details.'
              },
              {
                q: 'What kind of support do I get?',
                a: 'Free plans include community support. Paid plans get priority email support, and Team/Enterprise plans receive 24/7 assistance via chat, email, and phone.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.05] transition-colors"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <h3 className="text-lg mb-3">{faq.q}</h3>
                <p className="text-[#9EA3B0] text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-[#9EA3B0] mb-4">Still have questions?</p>
            <motion.a
              href="#contact"
              className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
              whileHover={{ x: 4 }}
            >
              <span>Contact our sales team</span>
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}