import { motion } from 'motion/react';
import { React } from 'react';

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
  color?: 'yellow' | 'amber' | 'orange' | 'cyan';
}

export function FeatureCard({ icon: Icon, title, description, delay = 0, color = 'yellow' }: FeatureCardProps) {
  const colorClasses = {
    yellow: 'from-yellow-600/20 to-yellow-600/5 border-yellow-500/30 text-yellow-400',
    amber: 'from-amber-600/20 to-amber-600/5 border-amber-500/30 text-amber-400',
    orange: 'from-orange-600/20 to-orange-600/5 border-orange-500/30 text-orange-400',
    cyan: 'from-cyan-600/20 to-cyan-600/5 border-cyan-500/30 text-cyan-400',
  };

  return (
    <motion.div
      className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] hover:border-white/20 transition-all group overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8, scale: 1.02 }}
    >
      {/* Animated background gradient on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-yellow-600/0 via-yellow-600/0 to-yellow-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
        whileHover={{
          background: [
            'linear-gradient(135deg, rgba(234, 179, 8, 0) 0%, rgba(234, 179, 8, 0) 100%)',
            'linear-gradient(135deg, rgba(234, 179, 8, 0.1) 0%, rgba(234, 179, 8, 0) 100%)'
          ]
        }}
        transition={{ duration: 0.6 }}
      />

      {/* Floating particles in background */}
      <motion.div
        className="absolute top-4 right-4 w-2 h-2 bg-yellow-400/30 rounded-full blur-sm"
        animate={{
          y: [0, -10, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: delay * 0.5,
        }}
      />
      <motion.div
        className="absolute bottom-8 left-8 w-3 h-3 bg-amber-400/20 rounded-full blur-sm"
        animate={{
          y: [0, 10, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: delay * 0.7,
        }}
      />

      {/* Pulsing border glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 animate-pulse-glow-border"
      />

      <div className="relative z-10">
        <motion.div 
          className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} border rounded-xl flex items-center justify-center mb-4 animate-pulse-glow-icon`}
          whileHover={{ 
            scale: 1.1,
            rotate: 360
          }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: delay,
            }}
          >
            <Icon className="w-6 h-6" />
          </motion.div>
        </motion.div>

        <motion.h3 
          className="text-xl mb-2 group-hover:text-white transition-colors"
          initial={{ opacity: 0.9 }}
          whileHover={{ opacity: 1 }}
        >
          {title}
        </motion.h3>

        <motion.p 
          className="text-[#9EA3B0] leading-relaxed"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          {description}
        </motion.p>
      </div>

      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        initial={{ x: '-100%', y: '-100%' }}
        whileHover={{ x: '100%', y: '100%' }}
        transition={{ duration: 0.6 }}
        style={{
          background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)'
        }}
      />
    </motion.div>
  );
}