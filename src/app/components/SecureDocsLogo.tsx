import { motion } from 'motion/react';

interface SecureDocsLogoProps {
  variation: number;
  showWordmark: boolean;
  animationEnabled: boolean;
  size?: number;
}

const colors = {
  deepBlue: '#1E3A8A',
  teal: '#0D9488',
  gray: '#374151',
};

export function SecureDocsLogo({
  variation,
  showWordmark,
  animationEnabled,
  size = 300,
}: SecureDocsLogoProps) {
  const iconSize = showWordmark ? size * 0.35 : size;
  const wordmarkWidth = size * 0.6;

  const renderIcon = () => {
    switch (variation) {
      case 1:
        return <ShieldDocument animationEnabled={animationEnabled} size={iconSize} />;
      case 2:
        return <LockFile animationEnabled={animationEnabled} size={iconSize} />;
      case 3:
        return <SecureFolder animationEnabled={animationEnabled} size={iconSize} />;
      case 4:
        return <DataVault animationEnabled={animationEnabled} size={iconSize} />;
      default:
        return <ShieldDocument animationEnabled={animationEnabled} size={iconSize} />;
    }
  };

  if (showWordmark) {
    return (
      <div className="flex items-center gap-4">
        {renderIcon()}
        <Wordmark width={wordmarkWidth} />
      </div>
    );
  }

  return renderIcon();
}

// Variation 1: Shield Document
function ShieldDocument({ animationEnabled, size }: { animationEnabled: boolean; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={colors.deepBlue} />
          <stop offset="100%" stopColor={colors.teal} />
        </linearGradient>
      </defs>

      {/* Shield Background */}
      <motion.path
        d="M50 10 L75 20 L75 45 Q75 65 50 85 Q25 65 25 45 L25 20 Z"
        fill="url(#shieldGrad)"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={animationEnabled ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Document Icon */}
      <motion.rect
        x="40"
        y="30"
        width="20"
        height="28"
        rx="2"
        fill="white"
        initial={{ y: 25, opacity: 0 }}
        animate={animationEnabled ? { y: 30, opacity: 1 } : { y: 30, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />

      {/* Document Lines */}
      <motion.line x1="43" y1="38" x2="57" y2="38" stroke={colors.deepBlue} strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={animationEnabled ? { pathLength: 1 } : { pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      />
      <motion.line x1="43" y1="43" x2="57" y2="43" stroke={colors.deepBlue} strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={animationEnabled ? { pathLength: 1 } : { pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      />
      <motion.line x1="43" y1="48" x2="52" y2="48" stroke={colors.deepBlue} strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={animationEnabled ? { pathLength: 1 } : { pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      />

      {/* Shield Border */}
      <motion.path
        d="M50 10 L75 20 L75 45 Q75 65 50 85 Q25 65 25 45 L25 20 Z"
        fill="none"
        stroke="white"
        strokeWidth="2"
        opacity="0.3"
      />
    </svg>
  );
}

// Variation 2: Lock File
function LockFile({ animationEnabled, size }: { animationEnabled: boolean; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fileGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.deepBlue} />
          <stop offset="100%" stopColor={colors.teal} />
        </linearGradient>
      </defs>

      {/* Document Shape */}
      <motion.path
        d="M30 15 L60 15 L75 30 L75 85 L30 85 Z"
        fill="url(#fileGrad)"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={animationEnabled ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Folded Corner */}
      <motion.path
        d="M60 15 L60 30 L75 30"
        fill={colors.teal}
        opacity="0.5"
        initial={{ scale: 0 }}
        animate={animationEnabled ? { scale: 1 } : { scale: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      />

      {/* Lock Body */}
      <motion.rect
        x="42"
        y="48"
        width="16"
        height="14"
        rx="2"
        fill="white"
        initial={{ y: 43 }}
        animate={animationEnabled ? { y: 48 } : { y: 48 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      />

      {/* Lock Shackle */}
      <motion.path
        d="M45 48 L45 42 Q45 38 50 38 Q55 38 55 42 L55 48"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={animationEnabled ? { pathLength: 1 } : { pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      />

      {/* Keyhole */}
      <motion.circle
        cx="50"
        cy="53"
        r="2"
        fill={colors.deepBlue}
        initial={{ scale: 0 }}
        animate={animationEnabled ? { scale: 1 } : { scale: 1 }}
        transition={{ duration: 0.3, delay: 0.7 }}
      />
      <motion.path
        d="M49.5 55 L50.5 55 L50.5 58 L49.5 58 Z"
        fill={colors.deepBlue}
        initial={{ scaleY: 0 }}
        animate={animationEnabled ? { scaleY: 1 } : { scaleY: 1 }}
        transition={{ duration: 0.3, delay: 0.8 }}
      />

      {/* Border */}
      <motion.path
        d="M30 15 L60 15 L75 30 L75 85 L30 85 Z"
        fill="none"
        stroke="white"
        strokeWidth="2"
        opacity="0.2"
      />
    </svg>
  );
}

// Variation 3: Secure Folder
function SecureFolder({ animationEnabled, size }: { animationEnabled: boolean; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="folderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={colors.teal} />
          <stop offset="100%" stopColor={colors.deepBlue} />
        </linearGradient>
      </defs>

      {/* Folder Back */}
      <motion.path
        d="M20 35 L45 35 L50 28 L80 28 L80 75 L20 75 Z"
        fill="url(#folderGrad)"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={animationEnabled ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Folder Tab */}
      <motion.path
        d="M45 35 L50 28 L80 28 L80 35 Z"
        fill={colors.teal}
        opacity="0.6"
        initial={{ scaleX: 0 }}
        animate={animationEnabled ? { scaleX: 1 } : { scaleX: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      />

      {/* Keyhole Circle */}
      <motion.circle
        cx="50"
        cy="52"
        r="10"
        fill="white"
        initial={{ scale: 0 }}
        animate={animationEnabled ? { scale: 1 } : { scale: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      />

      {/* Keyhole Top */}
      <motion.circle
        cx="50"
        cy="50"
        r="3.5"
        fill={colors.deepBlue}
        initial={{ scale: 0 }}
        animate={animationEnabled ? { scale: 1 } : { scale: 1 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      />

      {/* Keyhole Bottom */}
      <motion.path
        d="M48 53 L52 53 L51 58 L49 58 Z"
        fill={colors.deepBlue}
        initial={{ scaleY: 0 }}
        animate={animationEnabled ? { scaleY: 1 } : { scaleY: 1 }}
        transition={{ duration: 0.3, delay: 0.7 }}
      />

      {/* Border Highlight */}
      <motion.path
        d="M20 35 L45 35 L50 28 L80 28 L80 75 L20 75 Z"
        fill="none"
        stroke="white"
        strokeWidth="2"
        opacity="0.3"
      />
    </svg>
  );
}

// Variation 4: Data Vault
function DataVault({ animationEnabled, size }: { animationEnabled: boolean; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="vaultGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.deepBlue} />
          <stop offset="100%" stopColor={colors.teal} />
        </linearGradient>
      </defs>

      {/* Vault Box */}
      <motion.rect
        x="25"
        y="25"
        width="50"
        height="50"
        rx="4"
        fill="url(#vaultGrad)"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={animationEnabled ? { scale: 1, opacity: 1 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Layered Documents Inside */}
      <motion.rect
        x="35"
        y="35"
        width="22"
        height="28"
        rx="1.5"
        fill="white"
        opacity="0.3"
        initial={{ x: 33, y: 33 }}
        animate={animationEnabled ? { x: 35, y: 35 } : { x: 35, y: 35 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      />
      <motion.rect
        x="37"
        y="37"
        width="22"
        height="28"
        rx="1.5"
        fill="white"
        opacity="0.5"
        initial={{ x: 35, y: 35 }}
        animate={animationEnabled ? { x: 37, y: 37 } : { x: 37, y: 37 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      />
      <motion.rect
        x="39"
        y="39"
        width="22"
        height="28"
        rx="1.5"
        fill="white"
        initial={{ x: 37, y: 37 }}
        animate={animationEnabled ? { x: 39, y: 39 } : { x: 39, y: 39 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      />

      {/* Lock Circle */}
      <motion.circle
        cx="62"
        cy="62"
        r="8"
        fill={colors.gray}
        initial={{ scale: 0 }}
        animate={animationEnabled ? { scale: 1 } : { scale: 1 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      />

      {/* Lock Center */}
      <motion.circle
        cx="62"
        cy="62"
        r="3"
        fill="white"
        initial={{ scale: 0 }}
        animate={animationEnabled ? { scale: 1 } : { scale: 1 }}
        transition={{ duration: 0.3, delay: 0.8 }}
      />

      {/* Lock Indicator */}
      <motion.line
        x1="62"
        y1="59"
        x2="62"
        y2="54"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={animationEnabled ? { pathLength: 1 } : { pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.9 }}
      />

      {/* Vault Border */}
      <motion.rect
        x="25"
        y="25"
        width="50"
        height="50"
        rx="4"
        fill="none"
        stroke="white"
        strokeWidth="2"
        opacity="0.3"
      />
    </svg>
  );
}

// Wordmark Component
function Wordmark({ width }: { width: number }) {
  return (
    <svg width={width} height={width * 0.4} viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="0" y="38" fill={colors.deepBlue} fontSize="32" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700">
        Secure
      </text>
      <text x="0" y="68" fill={colors.teal} fontSize="32" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700">
        Docs
      </text>
    </svg>
  );
}
