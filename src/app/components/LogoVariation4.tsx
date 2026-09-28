export function LogoVariation4() {
  return (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      {/* Two diamonds/rhombus shapes merging */}
      
      {/* Left diamond - Local */}
      <path
        d="M 44 64 L 64 44 L 64 64 L 64 84 Z"
        fill="#007ACC"
      />
      
      {/* Right diamond - Cloud */}
      <path
        d="M 64 44 L 84 64 L 64 84 L 64 64 Z"
        fill="#00D4FF"
      />
      
      {/* Outer frame for definition */}
      <path
        d="M 64 36 L 92 64 L 64 92 L 36 64 Z"
        fill="none"
        stroke="#007ACC"
        strokeWidth="2"
      />
      
      {/* Center fusion line */}
      <line x1="64" y1="44" x2="64" y2="84" stroke="#ffffff" strokeWidth="2" opacity="0.4" />
    </svg>
  );
}
