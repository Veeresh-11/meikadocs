export function LogoVariation5() {
  return (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      {/* Dual orbital ring system */}
      
      {/* Outer ring */}
      <circle cx="64" cy="64" r="38" fill="none" stroke="#007ACC" strokeWidth="3" />
      
      {/* Inner ring - rotated */}
      <ellipse 
        cx="64" 
        cy="64" 
        rx="38" 
        ry="16" 
        fill="none" 
        stroke="#00D4FF" 
        strokeWidth="3"
        transform="rotate(60 64 64)"
      />
      
      {/* Second inner ring */}
      <ellipse 
        cx="64" 
        cy="64" 
        rx="38" 
        ry="16" 
        fill="none" 
        stroke="#00D4FF" 
        strokeWidth="3"
        transform="rotate(-60 64 64)"
        opacity="0.7"
      />
      
      {/* Central core */}
      <circle cx="64" cy="64" r="8" fill="#007ACC" />
      <circle cx="64" cy="64" r="4" fill="#ffffff" />
    </svg>
  );
}
