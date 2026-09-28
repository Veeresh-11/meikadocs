import { useEffect, useRef, memo } from 'react';
import { motion } from 'motion/react';
import { FileText, Image, Film, Archive, FileCode, Lock, Shield, Share2, Cloud } from 'lucide-react';

// ─── Floating document icons ───────────────────────────────────────────────
const DOC_ICONS = [
  { Icon: FileText, color: '#EF4444', label: 'PDF'  },
  { Icon: FileText, color: '#3B82F6', label: 'DOC'  },
  { Icon: Image,    color: '#10B981', label: 'IMG'  },
  { Icon: Archive,  color: '#F59E0B', label: 'ZIP'  },
  { Icon: FileCode, color: '#06B6D4', label: 'CODE' },
  { Icon: Film,     color: '#8B5CF6', label: 'VID'  },
  { Icon: Lock,     color: '#6366F1', label: 'SEC'  },
  { Icon: Shield,   color: '#A78BFA', label: 'ENC'  },
  { Icon: Share2,   color: '#60A5FA', label: 'SHR'  },
  { Icon: Cloud,    color: '#34D399', label: 'SYN'  },
];

export const FloatingDocuments = memo(function FloatingDocuments() {
  const positions = [
    { x: '8%',  y: '15%', delay: 0    },
    { x: '85%', y: '10%', delay: 0.8  },
    { x: '5%',  y: '60%', delay: 1.6  },
    { x: '90%', y: '55%', delay: 0.4  },
    { x: '15%', y: '80%', delay: 2.0  },
    { x: '78%', y: '75%', delay: 1.2  },
    { x: '45%', y: '8%',  delay: 0.6  },
    { x: '55%', y: '85%', delay: 1.8  },
    { x: '25%', y: '35%', delay: 1.0  },
    { x: '70%', y: '30%', delay: 2.4  },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {DOC_ICONS.map(({ Icon, color, label }, i) => {
        const pos = positions[i];
        return (
          <motion.div
            key={label}
            className="absolute"
            style={{ left: pos.x, top: pos.y }}
            initial={{ opacity: 0, scale: 0, rotate: -15 }}
            animate={{
              opacity: [0, 0.7, 0.5, 0.7, 0],
              scale: [0, 1, 0.95, 1, 0],
              y: [0, -30, -20, -40, -60],
              rotate: [-15, 0, 5, -5, 10],
            }}
            transition={{
              duration: 8,
              delay: pos.delay,
              repeat: Infinity,
              repeatDelay: 4,
              ease: 'easeInOut',
            }}
          >
            <div
              className="w-10 h-10 rounded-xl backdrop-blur-sm flex items-center justify-center border"
              style={{
                backgroundColor: `${color}15`,
                borderColor: `${color}30`,
                boxShadow: `0 0 12px ${color}20`,
              }}
            >
              <Icon className="w-5 h-5" style={{ color }} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
});

// ─── Vault hex grid ────────────────────────────────────────────────────────
export const VaultHexGrid = memo(function VaultHexGrid() {
  const hexes = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: (i % 6) * 17 + (Math.floor(i / 6) % 2) * 8.5,
    y: Math.floor(i / 6) * 15,
    delay: i * 0.15,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.06]">
      <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        {hexes.map(h => (
          <motion.polygon
            key={h.id}
            points={`${h.x + 8},${h.y} ${h.x + 16},${h.y + 4.6} ${h.x + 16},${h.y + 13.8} ${h.x + 8},${h.y + 18.4} ${h.x},${h.y + 13.8} ${h.x},${h.y + 4.6}`}
            fill="none"
            stroke="#6366F1"
            strokeWidth="0.3"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.4, 1, 0] }}
            transition={{ duration: 4, delay: h.delay % 3, repeat: Infinity, repeatDelay: 2 }}
          />
        ))}
      </svg>
    </div>
  );
});

// ─── Cloud sync lines ──────────────────────────────────────────────────────
export const CloudSyncLines = memo(function CloudSyncLines() {
  const lines = [
    { x1: '10%', y1: '20%', x2: '40%', y2: '50%', delay: 0 },
    { x1: '90%', y1: '15%', x2: '60%', y2: '45%', delay: 0.8 },
    { x1: '15%', y1: '70%', x2: '45%', y2: '55%', delay: 1.6 },
    { x1: '85%', y1: '75%', x2: '55%', y2: '55%', delay: 2.4 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="absolute w-full h-full">
        {lines.map((line, i) => (
          <g key={i}>
            <motion.line
              x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
              stroke="url(#syncGrad)" strokeWidth="0.5" strokeDasharray="4 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.4, 0.4, 0] }}
              transition={{ duration: 3, delay: line.delay, repeat: Infinity, repeatDelay: 2 }}
            />
            <motion.circle
              cx={line.x1} cy={line.y1} r="3"
              fill="#6366F1" fillOpacity="0.4"
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2, delay: line.delay, repeat: Infinity }}
            />
          </g>
        ))}
        <defs>
          <linearGradient id="syncGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366F1" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
});

// ─── Security rings ────────────────────────────────────────────────────────
export const DocSecurityRings = memo(function DocSecurityRings() {
  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
      {[280, 360, 440, 520].map((size, i) => (
        <motion.div
          key={size}
          className="absolute rounded-full border border-indigo-500/10"
          style={{ width: size, height: size }}
          animate={{ scale: [1, 1.04, 1], opacity: [0.3, 0.08, 0.3] }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
});

// ─── Binary / data stream ──────────────────────────────────────────────────
export const DataRain = memo(function DataRain() {
  const columns = Array.from({ length: 20 }, (_, i) => i);
  const chars = ['0', '1', '▶', '◆', '●', '■'];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.04]">
      {columns.map(col => (
        <motion.div
          key={col}
          className="absolute top-0 flex flex-col gap-2 text-indigo-400 text-[10px] font-mono"
          style={{ left: `${(col / 20) * 100}%` }}
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: '120%', opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 6 + (col % 4),
            delay: col * 0.4,
            repeat: Infinity,
            repeatDelay: Math.random() * 3,
            ease: 'linear',
          }}
        >
          {Array.from({ length: 8 }, (_, j) => (
            <span key={j}>{chars[(col + j) % chars.length]}</span>
          ))}
        </motion.div>
      ))}
    </div>
  );
});

// ─── Floating particles ────────────────────────────────────────────────────
export const DocParticles = memo(function DocParticles({ count = 30 }: { count?: number }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 4 + 3,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-indigo-400"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: 0.15 }}
          animate={{ y: [-10, 10, -10], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
});
