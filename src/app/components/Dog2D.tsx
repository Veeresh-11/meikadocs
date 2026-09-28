import { motion } from 'motion/react';

interface Dog2DProps {
  onClick?: () => void;
  mouseX?: number;
}

export function Dog2D({ onClick, mouseX = 0 }: Dog2DProps) {
  // Calculate rotation based on mouse position
  const rotation = mouseX * 5;

  return (
    <motion.div
      onClick={onClick}
      className="w-full h-full flex items-end justify-center cursor-pointer"
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      <motion.svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          rotate: rotation,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 20
        }}
      >
        {/* Dog body */}
        <ellipse cx="100" cy="130" rx="40" ry="35" fill="#D4A574" />
        
        {/* Dog head */}
        <motion.circle
          cx="100"
          cy="90"
          r="30"
          fill="#D4A574"
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Ears */}
        <ellipse cx="75" cy="75" rx="12" ry="25" fill="#C49564" transform="rotate(-20 75 75)" />
        <ellipse cx="125" cy="75" rx="12" ry="25" fill="#C49564" transform="rotate(20 125 75)" />
        
        {/* Snout */}
        <ellipse cx="100" cy="100" rx="18" ry="15" fill="#C49564" />
        
        {/* Nose */}
        <ellipse cx="100" cy="100" rx="8" ry="6" fill="#4A3428" />
        
        {/* Eyes */}
        <motion.circle
          cx="88"
          cy="85"
          r="4"
          fill="#2D1B12"
          animate={{
            scaleY: [1, 0.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2
          }}
        />
        <motion.circle
          cx="112"
          cy="85"
          r="4"
          fill="#2D1B12"
          animate={{
            scaleY: [1, 0.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2
          }}
        />
        
        {/* Legs */}
        <rect x="75" y="155" width="12" height="30" rx="6" fill="#C49564" />
        <rect x="113" y="155" width="12" height="30" rx="6" fill="#C49564" />
        
        {/* Tail */}
        <motion.path
          d="M 60 120 Q 40 110 35 95"
          stroke="#C49564"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          animate={{
            d: [
              "M 60 120 Q 40 110 35 95",
              "M 60 120 Q 40 115 38 100",
              "M 60 120 Q 40 110 35 95"
            ],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Shadow */}
        <ellipse cx="100" cy="185" rx="45" ry="8" fill="rgba(0,0,0,0.2)" />
      </motion.svg>
    </motion.div>
  );
}
