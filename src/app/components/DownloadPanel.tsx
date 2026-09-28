import { Download, Package } from 'lucide-react';
import { useState } from 'react';

interface DownloadPanelProps {
  variation: number;
  showWordmark: boolean;
}

export function DownloadPanel({ variation, showWordmark }: DownloadPanelProps) {
  const [downloading, setDownloading] = useState(false);

  const variationNames = ['Shield Document', 'Lock File', 'Secure Folder', 'Data Vault'];

  const generateIconSVG = (variation: number) => {
    const svgs = {
      1: `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E3A8A"/>
      <stop offset="100%" stop-color="#0D9488"/>
    </linearGradient>
  </defs>
  <path d="M50 10 L75 20 L75 45 Q75 65 50 85 Q25 65 25 45 L25 20 Z" fill="url(#shieldGrad)"/>
  <rect x="40" y="30" width="20" height="28" rx="2" fill="white"/>
  <line x1="43" y1="38" x2="57" y2="38" stroke="#1E3A8A" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="43" y1="43" x2="57" y2="43" stroke="#1E3A8A" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="43" y1="48" x2="52" y2="48" stroke="#1E3A8A" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M50 10 L75 20 L75 45 Q75 65 50 85 Q25 65 25 45 L25 20 Z" fill="none" stroke="white" stroke-width="2" opacity="0.3"/>
</svg>`,
      2: `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fileGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E3A8A"/>
      <stop offset="100%" stop-color="#0D9488"/>
    </linearGradient>
  </defs>
  <path d="M30 15 L60 15 L75 30 L75 85 L30 85 Z" fill="url(#fileGrad)"/>
  <path d="M60 15 L60 30 L75 30" fill="#0D9488" opacity="0.5"/>
  <rect x="42" y="48" width="16" height="14" rx="2" fill="white"/>
  <path d="M45 48 L45 42 Q45 38 50 38 Q55 38 55 42 L55 48" fill="none" stroke="white" stroke-width="3" stroke-linecap="round"/>
  <circle cx="50" cy="53" r="2" fill="#1E3A8A"/>
  <path d="M49.5 55 L50.5 55 L50.5 58 L49.5 58 Z" fill="#1E3A8A"/>
  <path d="M30 15 L60 15 L75 30 L75 85 L30 85 Z" fill="none" stroke="white" stroke-width="2" opacity="0.2"/>
</svg>`,
      3: `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="folderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0D9488"/>
      <stop offset="100%" stop-color="#1E3A8A"/>
    </linearGradient>
  </defs>
  <path d="M20 35 L45 35 L50 28 L80 28 L80 75 L20 75 Z" fill="url(#folderGrad)"/>
  <path d="M45 35 L50 28 L80 28 L80 35 Z" fill="#0D9488" opacity="0.6"/>
  <circle cx="50" cy="52" r="10" fill="white"/>
  <circle cx="50" cy="50" r="3.5" fill="#1E3A8A"/>
  <path d="M48 53 L52 53 L51 58 L49 58 Z" fill="#1E3A8A"/>
  <path d="M20 35 L45 35 L50 28 L80 28 L80 75 L20 75 Z" fill="none" stroke="white" stroke-width="2" opacity="0.3"/>
</svg>`,
      4: `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="vaultGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E3A8A"/>
      <stop offset="100%" stop-color="#0D9488"/>
    </linearGradient>
  </defs>
  <rect x="25" y="25" width="50" height="50" rx="4" fill="url(#vaultGrad)"/>
  <rect x="35" y="35" width="22" height="28" rx="1.5" fill="white" opacity="0.3"/>
  <rect x="37" y="37" width="22" height="28" rx="1.5" fill="white" opacity="0.5"/>
  <rect x="39" y="39" width="22" height="28" rx="1.5" fill="white"/>
  <circle cx="62" cy="62" r="8" fill="#374151"/>
  <circle cx="62" cy="62" r="3" fill="white"/>
  <line x1="62" y1="59" x2="62" y2="54" stroke="white" stroke-width="2" stroke-linecap="round"/>
  <rect x="25" y="25" width="50" height="50" rx="4" fill="none" stroke="white" stroke-width="2" opacity="0.3"/>
</svg>`,
    };
    return svgs[variation as keyof typeof svgs] || svgs[1];
  };

  const generateWordmarkSVG = (variation: number) => {
    const iconSVG = generateIconSVG(variation);
    // Extract just the icon part (without XML declaration)
    const iconContent = iconSVG.split('\n').slice(1).join('\n').replace('</svg>', '');
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="800" height="300" viewBox="0 0 800 300" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(50, 50) scale(2)">
    ${iconContent}
  </g>
  <text x="280" y="130" fill="#1E3A8A" font-size="72" font-family="system-ui, -apple-system, sans-serif" font-weight="700">Secure</text>
  <text x="280" y="210" fill="#0D9488" font-size="72" font-family="system-ui, -apple-system, sans-serif" font-weight="700">Docs</text>
</svg>`;
  };

  const handleDownloadSVG = () => {
    const svgContent = showWordmark ? generateWordmarkSVG(variation) : generateIconSVG(variation);
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `securedocs-logo-${showWordmark ? 'wordmark' : 'icon'}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPNG = async (size: number) => {
    const svgContent = showWordmark ? generateWordmarkSVG(variation) : generateIconSVG(variation);
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      
      if (showWordmark) {
        canvas.width = size * 2.67;
        canvas.height = size;
      } else {
        canvas.width = size;
        canvas.height = size;
      }
      
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            const pngUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = pngUrl;
            link.download = `securedocs-logo-${showWordmark ? 'wordmark' : 'icon'}-${size}px.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(pngUrl);
          }
        }, 'image/png');
      }
      
      URL.revokeObjectURL(url);
    };
    
    img.src = url;
  };

  const handleDownloadFavicon = async () => {
    // Generate a 32x32 favicon
    const svgContent = generateIconSVG(variation);
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(img, 0, 0, 32, 32);
        canvas.toBlob((blob) => {
          if (blob) {
            const icoUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = icoUrl;
            link.download = 'favicon.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(icoUrl);
          }
        }, 'image/png');
      }
      
      URL.revokeObjectURL(url);
    };
    
    img.src = url;
  };

  const handleDownloadAll = async () => {
    setDownloading(true);
    
    // Download SVG
    handleDownloadSVG();
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Download PNGs
    const sizes = [128, 256, 512, 1024];
    for (const size of sizes) {
      await handleDownloadPNG(size);
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    // Download favicon if icon-only
    if (!showWordmark) {
      await handleDownloadFavicon();
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    
    setDownloading(false);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
      <h2 className="text-slate-900 mb-4">Download Logo</h2>

      <div className="mb-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <div className="text-slate-600 text-sm mb-1">Current Selection</div>
        <div className="text-slate-900">{variationNames[variation - 1]}</div>
        <div className="text-slate-500 text-xs mt-1">
          {showWordmark ? 'Icon + Wordmark' : 'Icon Only'}
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="text-slate-700 text-sm mb-3">Individual Files</div>
        
        <button
          onClick={handleDownloadSVG}
          className="flex items-center justify-between w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors text-slate-700"
        >
          <span className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            SVG (Vector)
          </span>
          <span className="text-xs text-slate-500">Scalable</span>
        </button>

        {[128, 256, 512].map((size) => (
          <button
            key={size}
            onClick={() => handleDownloadPNG(size)}
            className="flex items-center justify-between w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors text-slate-700"
          >
            <span className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              PNG {size}px
            </span>
            <span className="text-xs text-slate-500">Raster</span>
          </button>
        ))}

        {!showWordmark && (
          <button
            onClick={handleDownloadFavicon}
            className="flex items-center justify-between w-full px-4 py-3 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors text-blue-700"
          >
            <span className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Favicon (32px)
            </span>
            <span className="text-xs text-blue-600">Web Icon</span>
          </button>
        )}
      </div>

      <button
        onClick={handleDownloadAll}
        disabled={downloading}
        className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 disabled:from-slate-400 disabled:to-slate-500 text-white rounded-lg transition-all shadow-lg disabled:cursor-not-allowed"
      >
        <Package className="w-5 h-5" />
        {downloading ? 'Preparing Files...' : 'Download All Sizes'}
      </button>

      <div className="mt-4 text-xs text-slate-500 text-center">
        {showWordmark 
          ? 'Includes SVG + PNG (128px, 256px, 512px, 1024px)'
          : 'Includes SVG + PNG (128px, 256px, 512px, 1024px) + Favicon'}
      </div>
    </div>
  );
}
