export function LogoVariation2() {
  return (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      {/* Circle with clean diagonal split - lightning bolt concept */}
      
      {/* Circle outline */}
      <circle cx="64" cy="64" r="40" fill="none" stroke="#007ACC" strokeWidth="3" />
      
      {/* Left half fill */}
      <path
        d="M 64 24 A 40 40 0 0 0 64 104 L 64 64 Z"
        fill="#007ACC"
      />
      
      {/* Right half fill */}
      <path
        d="M 64 24 A 40 40 0 0 1 64 104 L 64 64 Z"
        fill="#00D4FF"
      />
      
      {/* Central lightning bolt divider */}
      <path
        d="M 64 30 L 58 64 L 66 64 L 60 98"
        stroke="#ffffff"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
