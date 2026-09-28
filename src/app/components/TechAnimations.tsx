import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function TechGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      {/* Animated grid lines */}
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="tech-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <motion.path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
            />
          </pattern>
          <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.5)" />
            <stop offset="50%" stopColor="rgba(16, 185, 129, 0.5)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.5)" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#tech-grid)" />
      </svg>
    </div>
  );
}

export function ScanLine() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent"
        animate={{
          top: ['0%', '100%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 2
        }}
        style={{
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.4)'
        }}
      />
    </motion.div>
  );
}

export function DataStream() {
  const streams = Array.from({ length: 5 }, (_, i) => i);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {streams.map((stream) => (
        <motion.div
          key={stream}
          className="absolute w-[1px] h-20 bg-gradient-to-b from-transparent via-blue-400 to-transparent"
          style={{
            left: `${20 + stream * 20}%`,
          }}
          animate={{
            y: ['-100px', 'calc(100vh + 100px)'],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 3 + stream * 0.5,
            repeat: Infinity,
            delay: stream * 0.7,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );
}

interface FloatingCodeProps {
  count?: number;
}

export function FloatingCode({ count = 10 }: FloatingCodeProps) {
  const codeSnippets = [
    '{ auth: true }',
    'FIDO2',
    '<Passkey />',
    'biometric',
    'SSO',
    'MFA',
    '256-bit',
    'OAuth2.0',
    'Zero Trust',
    'WebAuthn'
  ];

  const codes = Array.from({ length: count }, (_, i) => ({
    id: i,
    text: codeSnippets[i % codeSnippets.length],
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: 15 + Math.random() * 10,
    delay: Math.random() * 5
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {codes.map((code) => (
        <motion.div
          key={code.id}
          className="absolute font-mono text-xs text-blue-400/30"
          style={{
            left: `${code.x}%`,
            top: `${code.y}%`,
          }}
          animate={{
            y: [0, -50, 0],
            x: [0, 20, 0],
            opacity: [0.1, 0.4, 0.1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: code.duration,
            delay: code.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {code.text}
        </motion.div>
      ))}
    </div>
  );
}

export function CircuitLines() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Horizontal circuit lines */}
        <motion.line
          x1="0" y1="20%" x2="100%" y2="20%"
          stroke="url(#circuit-gradient)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
        <motion.line
          x1="0" y1="50%" x2="100%" y2="50%"
          stroke="url(#circuit-gradient)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
        />
        <motion.line
          x1="0" y1="80%" x2="100%" y2="80%"
          stroke="url(#circuit-gradient)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1, ease: 'easeInOut' }}
        />
        
        {/* Vertical circuit lines */}
        <motion.line
          x1="30%" y1="0" x2="30%" y2="100%"
          stroke="url(#circuit-gradient)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.3, ease: 'easeInOut' }}
        />
        <motion.line
          x1="70%" y1="0" x2="70%" y2="100%"
          stroke="url(#circuit-gradient)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 0.8, ease: 'easeInOut' }}
        />
        
        {/* Circuit nodes */}
        <motion.circle
          cx="30%" cy="20%"
          r="3"
          fill="#3b82f6"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        />
        <motion.circle
          cx="70%" cy="50%"
          r="3"
          fill="#10b981"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
        />
        <motion.circle
          cx="30%" cy="80%"
          r="3"
          fill="#3b82f6"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.5 }}
        />
        
        <defs>
          <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.5)" />
            <stop offset="50%" stopColor="rgba(16, 185, 129, 0.5)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.5)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
