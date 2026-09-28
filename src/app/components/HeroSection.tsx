import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { AnimatedText } from './AnimatedText';
import { MagneticButton } from './FloatingElements';
import { FloatingParticles } from './ParallaxSection';

interface HeroSectionProps {
  eyebrow?: string;
  headline: string;
  subtext: string;
  primaryCTA: { label: string; action: () => void };
  secondaryCTA?: { label: string; action: () => void };
}

export function HeroSection({ eyebrow, headline, subtext, primaryCTA, secondaryCTA }: HeroSectionProps) {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-24 lg:py-32 relative">
      {/* Floating particles */}
      <FloatingParticles count={30} color="yellow" />

      {/* Animated background glow with morphing effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-600/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Secondary pulsing glow */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      <motion.div
        className="max-w-4xl mx-auto text-center relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {eyebrow && (
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-400 text-sm mb-6"
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              duration: 0.5, 
              delay: 0.2,
              type: "spring",
              stiffness: 200
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
            {eyebrow}
          </motion.div>
        )}

        <AnimatedText
          text={headline}
          className="text-5xl lg:text-7xl tracking-tight mb-6"
          delay={0.3}
        />

        <motion.p
          className="text-xl lg:text-2xl text-[#9EA3B0] mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {subtext}
        </motion.p>

        <motion.div
          className="flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <MagneticButton
            onClick={primaryCTA.action}
            className="px-8 py-4 bg-gradient-to-r from-yellow-600 to-amber-600 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-[#0A0B0F] flex items-center justify-center gap-2 shadow-lg shadow-yellow-600/30"
          >
            <span className="whitespace-nowrap">{primaryCTA.label}</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </MagneticButton>

          {secondaryCTA && (
            <motion.button
              onClick={secondaryCTA.action}
              className="px-8 py-4 border-2 border-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0A0B0F] backdrop-blur-sm whitespace-nowrap"
              whileTap={{ scale: 0.95 }}
            >
              {secondaryCTA.label}
            </motion.button>
          )}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="mx-auto w-6 h-10 border-2 border-white/20 rounded-full p-1"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-1.5 bg-white rounded-full mx-auto"
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}