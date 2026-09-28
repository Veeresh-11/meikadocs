import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { FadeInView } from './AnimatedText';
import { RippleEffect, SpinningRings } from './MeikaAnimations';

interface StorytellingSection {
  eyebrow: string;
  headline: string;
  description: string;
  features: string[];
  imageSide: 'left' | 'right';
}

export function StorytellingSection({ eyebrow, headline, description, features, imageSide }: StorytellingSection) {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-24 relative overflow-hidden">
      {/* Animated background blob */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-600/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Add spinning rings effect */}
      <div className="absolute inset-0">
        <SpinningRings />
      </div>
      
      {/* Ripple effect on alternate sections */}
      {imageSide === 'left' && <RippleEffect />}

      <div className={`grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto ${imageSide === 'left' ? 'lg:flex-row-reverse' : ''}`}>
        {/* Text Content */}
        <motion.div
          className={imageSide === 'right' ? 'lg:order-1' : 'lg:order-2'}
          initial={{ opacity: 0, x: imageSide === 'right' ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div 
            className="inline-block px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-400 text-sm mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {eyebrow}
          </motion.div>

          <motion.h2 
            className="text-3xl lg:text-5xl tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {headline}
          </motion.h2>

          <motion.p 
            className="text-lg text-[#9EA3B0] leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {description}
          </motion.p>

          <ul className="space-y-3">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-3 group"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                whileHover={{ x: 5 }}
              >
                <motion.div 
                  className="w-6 h-6 bg-yellow-600/20 border border-yellow-500/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  whileHover={{ scale: 1.2, rotate: 180 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Check className="w-4 h-4 text-yellow-400" />
                </motion.div>
                <span className="text-[#9EA3B0] group-hover:text-white transition-colors">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Image/Visual */}
        <motion.div
          className={imageSide === 'right' ? 'lg:order-2' : 'lg:order-1'}
          initial={{ opacity: 0, x: imageSide === 'right' ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative">
            {/* Placeholder for product screenshot */}
            <motion.div 
              className="aspect-[4/3] bg-gradient-to-br from-yellow-600/20 to-amber-600/20 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-full h-full bg-[#10121A] rounded-xl border border-white/10 flex items-center justify-center overflow-hidden relative">
                {/* Animated scan line effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-400/10 to-transparent"
                  animate={{ y: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />

                <div className="text-center relative z-10">
                  <motion.div 
                    className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-600 to-amber-500 rounded-2xl flex items-center justify-center"
                    animate={{ 
                      boxShadow: [
                        '0 0 20px rgba(234, 179, 8, 0.3)',
                        '0 0 40px rgba(234, 179, 8, 0.6)',
                        '0 0 20px rgba(234, 179, 8, 0.3)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L18 5V11C18 15 12 19 12 19C12 19 6 15 6 11V5L12 2Z" fill="white" opacity="0.9"/>
                    </svg>
                  </motion.div>
                  <p className="text-[#9EA3B0] text-sm">Product Screenshot</p>
                </div>
              </div>
            </motion.div>
            
            {/* Decorative blur */}
            <motion.div 
              className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-600/20 rounded-full blur-3xl -z-10"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}