import { motion } from 'motion/react';
import { HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { PricingTooltip } from './PricingTooltip';

interface PricingCardProps {
  eyebrow: string;
  name: string;
  price: string;
  priceContext: string[];
  description: string;
  sectionTitle: string;
  features: Array<{ text: string; tooltip?: string }>;
  ctaLabel: string;
  ctaVariant: 'white' | 'indigo';
  highlighted?: boolean;
  delay?: number;
}

export function PricingCard({
  eyebrow,
  name,
  price,
  priceContext,
  description,
  sectionTitle,
  features,
  ctaLabel,
  ctaVariant,
  highlighted = false,
  delay = 0
}: PricingCardProps) {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  const handleTooltipToggle = (index: number) => {
    setActiveTooltip(activeTooltip === index ? null : index);
  };

  const handleTooltipClose = () => {
    setActiveTooltip(null);
  };

  return (
    <motion.div
      className={`relative rounded-2xl p-8 lg:p-9 transition-all duration-300 ${
        highlighted
          ? 'bg-gradient-to-br from-indigo-600/15 via-indigo-600/10 to-transparent border-2 border-indigo-500/40 shadow-2xl shadow-indigo-500/10'
          : 'bg-white/[0.03] border border-white/10 hover:bg-white/[0.05]'
      }`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ 
        y: -4,
        scale: 1.02,
        boxShadow: highlighted 
          ? '0 20px 60px rgba(79, 70, 229, 0.2)' 
          : '0 20px 40px rgba(0, 0, 0, 0.3)',
        transition: { duration: 0.2 }
      }}
    >
      {/* Eyebrow */}
      <div className={`text-xs uppercase tracking-[0.04em] mb-4 ${
        highlighted ? 'text-indigo-300' : 'text-[#9EA3B0]'
      }`}>
        {eyebrow}
      </div>

      {/* Plan Name */}
      <h3 className="text-2xl lg:text-[26px] mb-6">{name}</h3>

      {/* Price Block */}
      <div className="mb-6">
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-[32px] lg:text-[36px] tracking-tight">{price}</span>
        </div>
        <div className="space-y-0.5">
          {priceContext.map((context, index) => (
            <div key={index} className="text-xs lg:text-[13px] text-[#9EA3B0]">
              {context}
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm lg:text-[15px] text-[#B7BAC6] leading-relaxed mb-8">
        {description}
      </p>

      {/* Section Title */}
      <div className="text-xs uppercase tracking-[0.04em] text-[#9EA3B0] mb-4">
        {sectionTitle}
      </div>

      {/* Features List */}
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2.5 text-sm lg:text-[15px] text-[#B7BAC6]">
            <svg 
              className="w-5 h-5 flex-shrink-0 mt-0.5 text-indigo-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
            <span className="flex-1">{feature.text}</span>
            {feature.tooltip && (
              <div className="relative">
                <button
                  className="text-[#9EA3B0] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-full p-0.5"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTooltipToggle(index);
                  }}
                  onBlur={() => {
                    // Delay to allow clicking inside tooltip
                    setTimeout(handleTooltipClose, 150);
                  }}
                  aria-label="More information"
                >
                  <HelpCircle className="w-4 h-4" />
                </button>
                {activeTooltip === index && (
                  <PricingTooltip 
                    content={feature.tooltip} 
                    onClose={handleTooltipClose}
                  />
                )}
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <motion.button
        className={`w-full px-6 py-3.5 rounded-xl text-sm lg:text-[15px] transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent ${
          ctaVariant === 'white'
            ? 'bg-white text-[#0A0B0F] hover:bg-gray-100 focus:ring-white shadow-lg shadow-white/20'
            : 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500 shadow-lg shadow-indigo-600/20'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
      >
        {ctaLabel}
      </motion.button>
    </motion.div>
  );
}
