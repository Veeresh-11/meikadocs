import { Play, Pause } from 'lucide-react';

interface LogoControlsProps {
  animationSpeed: number;
  setAnimationSpeed: (speed: number) => void;
  isAnimating: boolean;
  setIsAnimating: (isAnimating: boolean) => void;
  colorScheme: string;
  setColorScheme: (scheme: string) => void;
}

export function LogoControls({
  animationSpeed,
  setAnimationSpeed,
  isAnimating,
  setIsAnimating,
  colorScheme,
  setColorScheme,
}: LogoControlsProps) {
  const colorSchemes = [
    { id: 'nordic', name: 'Nordic Blue', colors: ['#4A90E2', '#2E5C8A', '#7EC8E3'] },
    { id: 'fire', name: 'Viking Fire', colors: ['#FF6B35', '#C73E1D', '#FFB627'] },
    { id: 'frost', name: 'Frost Ice', colors: ['#00D4FF', '#0099CC', '#B3E5FC'] },
    { id: 'royal', name: 'Royal Purple', colors: ['#9B59B6', '#6C3483', '#D7A9E3'] },
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
      <h2 className="text-white mb-6">Animation Controls</h2>

      {/* Play/Pause */}
      <div className="mb-6">
        <label className="block text-slate-300 mb-3">Animation</label>
        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="flex items-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors w-full justify-center"
        >
          {isAnimating ? (
            <>
              <Pause className="w-5 h-5" />
              Pause Animation
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              Play Animation
            </>
          )}
        </button>
      </div>

      {/* Speed Control */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <label className="text-slate-300">Speed</label>
          <span className="text-blue-400">{animationSpeed.toFixed(1)}x</span>
        </div>
        <input
          type="range"
          min="0.5"
          max="3"
          step="0.1"
          value={animationSpeed}
          onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>Slow</span>
          <span>Fast</span>
        </div>
      </div>

      {/* Color Scheme */}
      <div>
        <label className="block text-slate-300 mb-3">Color Scheme</label>
        <div className="grid grid-cols-2 gap-3">
          {colorSchemes.map((scheme) => (
            <button
              key={scheme.id}
              onClick={() => setColorScheme(scheme.id)}
              className={`p-3 rounded-lg border-2 transition-all ${
                colorScheme === scheme.id
                  ? 'border-blue-500 bg-slate-700/50'
                  : 'border-slate-700/50 bg-slate-900/30 hover:border-slate-600'
              }`}
            >
              <div className="flex gap-1 mb-2">
                {scheme.colors.map((color, idx) => (
                  <div
                    key={idx}
                    className="h-6 flex-1 rounded"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="text-xs text-slate-400">{scheme.name}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
