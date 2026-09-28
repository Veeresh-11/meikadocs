import { motion } from 'motion/react';
import { Shield, Fingerprint, Key, Lock, Scan, Smartphone, Cpu, Network } from 'lucide-react';

// Floating identity icons with tech feel
export function FloatingIdentityIcons() {
  const icons = [
    { Icon: Fingerprint, color: 'text-blue-400', x: '15%', y: '25%', duration: 9, delay: 0 },
    { Icon: Shield, color: 'text-green-400', x: '85%', y: '20%', duration: 11, delay: 1 },
    { Icon: Key, color: 'text-cyan-400', x: '20%', y: '75%', duration: 10, delay: 2 },
    { Icon: Lock, color: 'text-teal-400', x: '90%', y: '70%', duration: 12, delay: 1.5 },
    { Icon: Scan, color: 'text-blue-300', x: '50%', y: '15%', duration: 13, delay: 0.5 },
    { Icon: Smartphone, color: 'text-green-300', x: '75%', y: '85%', duration: 10, delay: 2.5 },
    { Icon: Cpu, color: 'text-cyan-300', x: '10%', y: '50%', duration: 11, delay: 1.2 },
    { Icon: Network, color: 'text-teal-300', x: '95%', y: '45%', duration: 14, delay: 0.8 }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map((item, index) => {
        const IconComponent = item.Icon;
        return (
          <motion.div
            key={index}
            className={`absolute ${item.color} opacity-15`}
            style={{ left: item.x, top: item.y }}
            animate={{
              y: [0, -50, 0],
              x: [0, 25, -25, 0],
              rotate: [0, 20, -20, 0],
              opacity: [0.1, 0.25, 0.1]
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <IconComponent className="w-14 h-14" />
          </motion.div>
        );
      })}
    </div>
  );
}

// Hexagon grid pattern
export function HexagonGrid() {
  const hexagons = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: (i % 6) * 120 + ((Math.floor(i / 6) % 2) * 60),
    y: Math.floor(i / 6) * 100,
    delay: Math.random() * 3
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg className="w-full h-full">
        {hexagons.map((hex) => (
          <motion.g
            key={hex.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 4,
              delay: hex.delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            <polygon
              points="30,0 60,15 60,45 30,60 0,45 0,15"
              transform={`translate(${hex.x}, ${hex.y})`}
              fill="none"
              stroke="url(#hex-gradient)"
              strokeWidth="2"
            />
          </motion.g>
        ))}
        <defs>
          <linearGradient id="hex-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Binary code rain
export function BinaryRain() {
  const columns = 15;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      {Array.from({ length: columns }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 text-xs font-mono text-blue-400"
          style={{
            left: `${(i / columns) * 100}%`,
          }}
          initial={{ y: -100 }}
          animate={{ y: '100vh' }}
          transition={{
            duration: 8 + Math.random() * 4,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: 'linear'
          }}
        >
          {Array.from({ length: 20 }).map((_, j) => (
            <div key={j} className="leading-tight">
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}

// Pulse rings from center
export function IdentityPulse() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[0, 1, 2, 3].map((index) => (
        <motion.div
          key={index}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            border: '2px solid',
            borderImage: 'linear-gradient(90deg, #3b82f6, #10b981) 1',
          }}
          initial={{ width: 0, height: 0, opacity: 0.8 }}
          animate={{
            width: [0, 1000, 1400],
            height: [0, 1000, 1400],
            opacity: [0.8, 0.4, 0]
          }}
          transition={{
            duration: 5,
            delay: index * 1.2,
            repeat: Infinity,
            ease: 'easeOut'
          }}
        />
      ))}
    </div>
  );
}

// Network nodes with connections
export function NetworkNodes() {
  const nodes = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 3
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      <svg className="w-full h-full">
        {/* Connection lines */}
        {nodes.slice(0, 15).map((node, i) => {
          const nextNode = nodes[(i + 4) % nodes.length];
          return (
            <motion.line
              key={`line-${i}`}
              x1={`${node.x}%`}
              y1={`${node.y}%`}
              x2={`${nextNode.x}%`}
              y2={`${nextNode.y}%`}
              stroke="url(#network-gradient)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 0], 
                opacity: [0, 0.6, 0] 
              }}
              transition={{
                duration: 3,
                delay: node.delay,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          );
        })}
        
        {/* Nodes */}
        {nodes.map((node) => (
          <motion.circle
            key={node.id}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size}
            fill="url(#node-gradient)"
            initial={{ opacity: 0.4, scale: 1 }}
            animate={{
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.8, 1]
            }}
            transition={{
              duration: 3.5,
              delay: node.delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}
        
        <defs>
          <linearGradient id="network-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
          </linearGradient>
          <radialGradient id="node-gradient">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#10b981" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

// Glowing authentication boxes
export function AuthBoxes() {
  const boxes = [
    { x: '10%', y: '20%', rotation: 15, delay: 0 },
    { x: '80%', y: '15%', rotation: -20, delay: 0.8 },
    { x: '15%', y: '70%', rotation: 25, delay: 1.5 },
    { x: '85%', y: '75%', rotation: -15, delay: 0.5 },
    { x: '50%', y: '10%', rotation: 10, delay: 1.2 }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {boxes.map((box, index) => (
        <motion.div
          key={index}
          className="absolute w-32 h-32 border-2 border-blue-400/30 rounded-2xl backdrop-blur-sm"
          style={{ 
            left: box.x, 
            top: box.y,
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(16, 185, 129, 0.1))'
          }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [0.8, 1.2, 0.8],
            rotate: [box.rotation, box.rotation + 180, box.rotation],
            y: [0, -30, 0]
          }}
          transition={{
            duration: 8,
            delay: box.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  );
}

// Orbiting particles around points
export function OrbitingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      {[
        { cx: '25%', cy: '30%', count: 8 },
        { cx: '75%', cy: '70%', count: 10 },
        { cx: '50%', cy: '50%', count: 12 }
      ].map((orbit, orbitIndex) => (
        <div key={orbitIndex} className="absolute" style={{ left: orbit.cx, top: orbit.cy }}>
          {Array.from({ length: orbit.count }).map((_, i) => {
            const angle = (i / orbit.count) * 360;
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-br from-blue-400 to-green-400 rounded-full"
                style={{
                  left: '0',
                  top: '0'
                }}
                animate={{
                  x: [
                    Math.cos((angle * Math.PI) / 180) * 60,
                    Math.cos(((angle + 360) * Math.PI) / 180) * 60
                  ],
                  y: [
                    Math.sin((angle * Math.PI) / 180) * 60,
                    Math.sin(((angle + 360) * Math.PI) / 180) * 60
                  ]
                }}
                transition={{
                  duration: 10,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

// DNA helix style rotating lines
export function DNAHelix() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg className="w-full h-full">
        {Array.from({ length: 20 }).map((_, i) => {
          const y = (i / 20) * 100;
          return (
            <g key={i}>
              <motion.line
                x1="30%"
                y1={`${y}%`}
                x2="70%"
                y2={`${y}%`}
                stroke="url(#dna-gradient)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{
                  pathLength: [0, 1, 0],
                  opacity: [0, 0.6, 0]
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.15,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
              <motion.circle
                cx="30%"
                cy={`${y}%`}
                r="4"
                fill="#3b82f6"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.15,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
              <motion.circle
                cx="70%"
                cy={`${y}%`}
                r="4"
                fill="#10b981"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.15 + 0.1,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </g>
          );
        })}
        <defs>
          <linearGradient id="dna-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// Radar sweep effect
export function RadarSweep() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center opacity-20">
      <div className="relative w-[600px] h-[600px]">
        {/* Radar circles */}
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/30"
            style={{
              width: `${150 + index * 150}px`,
              height: `${150 + index * 150}px`
            }}
          />
        ))}
        
        {/* Sweeping line */}
        <motion.div
          className="absolute top-1/2 left-1/2 origin-left h-[2px] bg-gradient-to-r from-green-400 via-blue-400 to-transparent"
          style={{ width: '300px' }}
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </div>
    </div>
  );
}

// Encryption code rings - similar to SpinningRings but with encryption characters
export function EncryptionCodeRings() {
  const encryptionChars = ['A', 'E', 'S', '2', '5', '6', 'R', 'S', 'A', 'S', 'H', 'A', '5', '1', '2', 'M', 'D', '5', 'B', 'C', 'R', 'Y', 'P', 'T'];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-25">
      {[0, 1, 2].map((ringIndex) => {
        const numChars = 12 + ringIndex * 4;
        const radius = 300 + ringIndex * 180;
        
        return (
          <motion.div
            key={ringIndex}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: `${radius * 2}px`,
              height: `${radius * 2}px`
            }}
            animate={{
              rotate: ringIndex % 2 === 0 ? 360 : -360
            }}
            transition={{
              duration: 25 + ringIndex * 8,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            {/* Ring circle */}
            <div 
              className="absolute inset-0 rounded-full border-2"
              style={{
                borderColor: `rgba(${ringIndex === 0 ? '59, 130, 246' : ringIndex === 1 ? '16, 185, 129' : '6, 182, 212'}, 0.2)`
              }}
            />
            
            {/* Encryption characters around the ring */}
            {Array.from({ length: numChars }).map((_, charIndex) => {
              const angle = (charIndex / numChars) * 360;
              const char = encryptionChars[(ringIndex * numChars + charIndex) % encryptionChars.length];
              
              return (
                <motion.div
                  key={charIndex}
                  className="absolute top-1/2 left-1/2 font-mono font-bold text-lg"
                  style={{
                    transform: `rotate(${angle}deg) translateY(-${radius}px)`,
                    color: ringIndex === 0 ? '#3b82f6' : ringIndex === 1 ? '#10b981' : '#06b6d4'
                  }}
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.9, 1.2, 0.9]
                  }}
                  transition={{
                    duration: 3,
                    delay: charIndex * 0.1,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                >
                  {char}
                </motion.div>
              );
            })}
          </motion.div>
        );
      })}
    </div>
  );
}