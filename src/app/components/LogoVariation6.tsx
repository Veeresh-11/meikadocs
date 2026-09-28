export function LogoVariation6() {
  return (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      {/* Abstract wing/chevron - speed and intelligence */}
      
      {/* Left wing */}
      <path
        d="M 32 64 L 52 44 L 64 52 L 44 72 Z"
        fill="#007ACC"
      />
      
      <path
        d="M 32 64 L 52 84 L 64 76 L 44 56 Z"
        fill="#007ACC"
      />
      
      {/* Right wing */}
      <path
        d="M 96 64 L 76 44 L 64 52 L 84 72 Z"
        fill="#00D4FF"
      />
      
      <path
        d="M 96 64 L 76 84 L 64 76 L 84 56 Z"
        fill="#00D4FF"
      />
      
      {/* Center connector */}
      <circle cx="64" cy="64" r="6" fill="#ffffff" />
      <circle cx="64" cy="64" r="3" fill="#007ACC" />
    </svg>
  );
}
