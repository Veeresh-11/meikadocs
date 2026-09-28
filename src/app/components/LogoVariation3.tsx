export function LogoVariation3() {
  return (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      {/* Infinity loop - continuous flow between local and cloud */}
      <defs>
        <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#007ACC" />
          <stop offset="50%" stopColor="#00D4FF" />
          <stop offset="100%" stopColor="#007ACC" />
        </linearGradient>
      </defs>
      
      {/* Infinity symbol */}
      <path
        d="M 38 64 Q 38 50 48 50 Q 58 50 64 64 Q 70 78 80 78 Q 90 78 90 64 Q 90 50 80 50 Q 70 50 64 64 Q 58 78 48 78 Q 38 78 38 64 Z"
        fill="none"
        stroke="url(#grad3)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Left node - Local */}
      <circle cx="48" cy="64" r="6" fill="#007ACC" />
      
      {/* Right node - Cloud */}
      <circle cx="80" cy="64" r="6" fill="#00D4FF" />
      
      {/* Center connection point */}
      <circle cx="64" cy="64" r="4" fill="#ffffff" />
    </svg>
  );
}
