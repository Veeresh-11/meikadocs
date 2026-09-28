export function LogoVariation4Colored() {
  return (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      <defs>
        <linearGradient id="gradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
        <linearGradient id="gradRight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      
      {/* Subtle background glow */}
      <circle cx="64" cy="64" r="45" fill="#8B5CF6" opacity="0.1" />
      
      {/* Left diamond - Local */}
      <path
        d="M 44 64 L 64 44 L 64 64 L 64 84 Z"
        fill="url(#gradLeft)"
      />
      
      {/* Right diamond - Cloud */}
      <path
        d="M 64 44 L 84 64 L 64 84 L 64 64 Z"
        fill="url(#gradRight)"
      />
      
      {/* Outer frame for definition */}
      <path
        d="M 64 36 L 92 64 L 64 92 L 36 64 Z"
        fill="none"
        stroke="#8B5CF6"
        strokeWidth="2.5"
      />
      
      {/* Center fusion line with glow */}
      <line x1="64" y1="44" x2="64" y2="84" stroke="#ffffff" strokeWidth="3" opacity="0.6" />
      
      {/* Center highlight */}
      <circle cx="64" cy="64" r="3" fill="#ffffff" opacity="0.8" />
    </svg>
  );
}
