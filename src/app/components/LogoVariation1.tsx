export function LogoVariation1() {
  return (
    <svg viewBox="0 0 128 128" className="w-full h-full">
      {/* Two interlocked hexagons - simple and geometric */}
      
      {/* Left hexagon - Local */}
      <path
        d="M 48 44 L 60 37 L 72 44 L 72 58 L 60 65 L 48 58 Z"
        fill="#007ACC"
      />
      
      {/* Right hexagon - Cloud */}
      <path
        d="M 68 63 L 80 56 L 92 63 L 92 77 L 80 84 L 68 77 Z"
        fill="#00D4FF"
      />
      
      {/* Small center overlap accent */}
      <path
        d="M 68 58 L 72 56 L 72 63 L 68 65 Z"
        fill="#ffffff"
        opacity="0.3"
      />
    </svg>
  );
}
