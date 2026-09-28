import { motion } from 'motion/react';
import { Footer } from '../components/Footer';
import { FileText, Shield, Zap } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description: string;
  setCurrentPage: (page: string) => void;
}

export function PlaceholderPage({ title, description, setCurrentPage }: PlaceholderPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Icon */}
            <motion.div
              className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-2xl flex items-center justify-center"
              animate={{
                boxShadow: [
                  '0 0 0px rgba(79, 70, 229, 0)',
                  '0 0 30px rgba(79, 70, 229, 0.4)',
                  '0 0 0px rgba(79, 70, 229, 0)'
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Shield className="w-10 h-10 text-white" />
            </motion.div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl mb-6 tracking-tight">
              {title}
            </h1>

            {/* Description */}
            <p className="text-xl text-[#9EA3B0] max-w-2xl mx-auto mb-12 leading-relaxed">
              {description}
            </p>

            {/* Coming Soon Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Zap className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-[#9EA3B0]">Coming Soon</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: FileText,
                title: 'In Development',
                description: 'This page is currently being developed with enterprise-grade features.'
              },
              {
                icon: Shield,
                title: 'Secure Design',
                description: 'Built with privacy and security as the top priority from day one.'
              },
              {
                icon: Zap,
                title: 'Performance First',
                description: 'Optimized for speed and reliability with modern web technologies.'
              }
            ].map((card, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <card.icon className="w-8 h-8 text-indigo-400 mb-4" />
                <h3 className="text-xl mb-2">{card.title}</h3>
                <p className="text-[#9EA3B0] text-sm leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            className="p-12 bg-gradient-to-br from-indigo-600/20 to-blue-600/20 border border-indigo-500/30 rounded-3xl text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-3xl md:text-4xl mb-4">
              Want to be notified?
            </h2>
            <p className="text-[#9EA3B0] mb-8 max-w-xl mx-auto">
              Join our waitlist to get early access when this feature launches.
            </p>
            <button className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-lg transition-all shadow-lg shadow-indigo-600/30">
              Join Waitlist
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
