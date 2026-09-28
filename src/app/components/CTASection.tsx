import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { WaveBackground, ShimmerText } from './MeikaAnimations';

interface CTASectionProps {
  headline: string;
  description: string;
  ctaLabel: string;
  ctaAction: () => void;
}

export function CTASection({ headline, description, ctaLabel, ctaAction }: CTASectionProps) {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-24 relative">
      <motion.div
        className="max-w-4xl mx-auto bg-gradient-to-br from-yellow-600/20 to-amber-600/20 border border-yellow-500/30 rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-600/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl -z-10" />
        
        {/* Wave background animation */}
        <WaveBackground />
        
        {/* Floating sparkles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1]
            }}
            transition={{
              duration: 3,
              delay: i * 0.4,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <Sparkles className="w-4 h-4 text-yellow-400" />
          </motion.div>
        ))}
        
        {/* Pulsing border effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl border-2 border-yellow-400/0"
          animate={{
            borderColor: ['rgba(250, 204, 21, 0)', 'rgba(250, 204, 21, 0.5)', 'rgba(250, 204, 21, 0)']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        <motion.h2
          className="text-3xl lg:text-5xl tracking-tight mb-4 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ShimmerText>{headline}</ShimmerText>
        </motion.h2>

        <motion.p
          className="text-lg lg:text-xl text-[#9EA3B0] mb-8 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {description}
        </motion.p>

        <motion.button
          onClick={ctaAction}
          className="relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-[#0A0B0F] rounded-xl font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-transparent inline-flex items-center gap-2 shadow-lg shadow-yellow-500/30 z-10 overflow-hidden group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
          
          <span className="relative z-10">{ctaLabel}</span>
          <motion.div
            className="relative z-10"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
}