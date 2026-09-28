import { Download, Package } from 'lucide-react';
import { useState } from 'react';

interface DownloadSectionProps {
  variation: number;
  colorScheme: string;
}

export function DownloadSection({ variation, colorScheme }: DownloadSectionProps) {
  const [downloading, setDownloading] = useState(false);
  const [recordingGif, setRecordingGif] = useState(false);

  const variationNames = [
    'Rune Shield',
    'Axe Blades',
    'Helm Horn',
    'Dragon Wings',
  ];

  // Ge// Generaeratee tanimate SVG coed SVG with CSS animations
  contst gent for dnerateAnimatedSVG = () => {
    const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="stoneGlow">
      <feGaussianBlur stdDeviation="6" result="coloredBlur" />
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    
    <rad
  const generateialGradient id="stoneTexture">
      <stop offset="0%" stop-color="#2a2a2a" />
      <stop offset="60%" stop-color="#1a1a1a" />
      <stop offset="100%" stop-color="#0a0a0a" />
    </radialGradient>

    <linearGradient id="runeGlow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFB347" />
      <stop offset="50%" stop-color="#FF8C00" />
      <stop offset="100%" stop-color="#FF6B00" />
    </linearGradient>

    <linearGradient id="innerLight" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFF4E6" />
      <stop offset="50%" stop-color="#FFD700" />
      <stop offset="100%" stop-color="#FF8C00" />
    </linearGradient>

    <style>
      @keyframes tracePath {
        0% { stroke-dashoffset: 1000; opacity: 0; }
        40% { stroke-dashoffset: 0; opacity: 1; }
        60% { stroke-dashoffset: 0; opacity: 1; }
        100% { stroke-dashoffset: 0; opacity: 0.9; }
      }
      
      @keyframes glowPulse {
        0%, 30% { opacity: 0; stroke-width: 8; }
        50% { opacity: 0.3; stroke-width: 10; }
        80% { opacity: 0.5; stroke-width: 8; }
        100% { opacity: 0.4; stroke-width: 8; }
      }

      @keyframes emberRise {
        0%, 35%, 40% { opacity: 0; transform: translateY(0); }
        50% { opacity: 0.8; transform: translateY(-30px); }
        65% { opacity: 1; transform: translateY(-45px); }
        80% { opacity: 0.6; transform: translateY(-60px); }
        100% { opacity: 0; transform: translateY(-75px); }
      }

      .trace-path {
        stroke-dasharray: 1000;
        animation: tracePath 6s ease-in-out infinite;
      }

      .glow-pulse {
        animation: glowPulse 6s ease-in-out infinite;
      }

      .ember {
        animation: emberRise 6s ease-out infinite;
      }
    </style>
  </defs>

  <!-- Dark stone circle background -->
  <circle cx="100" cy="100" r="85" fill="url(#stoneTexture)" opacity="0.95" />
  
  <!-- Subtle stone texture overlay -->
  <circle cx="100" cy="100" r="85" fill="none" stroke="#333" stroke-width="0.5" opacity="0.3" />

  <!-- Carved V shape - Dark shadow -->
  <path d="M70 50 L100 130 L130 50 L140 50 L100 150 L60 50 Z" fill="#0a0a0a" stroke="#050505" stroke-width="1" />

  <!-- Inner carved depth -->
  <path d="M70 50 L100 130 L130 50 L140 50 L100 150 L60 50 Z" fill="none" stroke="#000000" stroke-width="6" stroke-linejoin="round" opacity="0.4" />

  <!-- Pulsing glow aura -->
  <path class="glow-pulse" d="M70 50 L100 130 L130 50 L140 50 L100 150 L60 50 Z" fill="none" stroke="#FF8C00" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" filter="url(#stoneGlow)" />

  <!-- Glowing illuminated V - Base glow layer -->
  <path class="trace-path" d="M70 50 L100 130 L130 50 L140 50 L100 150 L60 50 Z" fill="none" stroke="url(#runeGlow)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" filter="url(#stoneGlow)" opacity="0.9" />

  <!-- Bright inner core light -->
  <path class="trace-path" d="M70 50 L100 130 L130 50 L140 50 L100 150 L60 50 Z" fill="none" stroke="url(#innerLight)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.7" />

  <!-- Intense white hot core -->
  <path class="trace-path" d="M70 50 L100 130 L130 50 L140 50 L100 150 L60 50 Z" fill="none" stroke="#FFF" stroke-width="0.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.8" />

  <!-- Ember particles -->
  <circle class="ember" cx="70" cy="100" r="1.5" fill="#FF8C00" filter="url(#stoneGlow)" style="animation-delay: 2.5s" />
  <circle class="ember" cx="85" cy="90" r="1.5" fill="#FF8C00" filter="url(#stoneGlow)" style="animation-delay: 2.7s" />
  <circle class="ember" cx="100" cy="95" r="1.5" fill="#FF8C00" filter="url(#stoneGlow)" style="animation-delay: 2.9s" />
  <circle class="ember" cx="115" cy="90" r="1.5" fill="#FF8C00" filter="url(#stoneGlow)" style="animation-delay: 3.1s" />
  <circle class="ember" cx="130" cy="100" r="1.5" fill="#FF8C00" filter="url(#stoneGlow)" style="animation-delay: 3.3s" />
</svg>`;
    return svgContent;
  };

  // Generate standalone HTML file with full animation
  const is the illuminated stone rune V logo
    const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg generateAnimatedHTML = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Veeresh Viking Logo - Animated</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    }
    #logo-container {
      width: 400px;
      height: 400px;
    }
  </style>
</head>
<body>
  <div id="logo-container">
    ${generateAnimatedSVG()}
  </div>
</body>
</html>`;
    return htmlContent;
  };

  // Generate the static SVG content for download
  const generateSVG = () => {
    const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" viewBidth="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="stoneGlow">
      <feGax="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="stoneGlow">
      <feGaussianBssianBlur stur stdDeviation="6"Deviation="6" resulresult="colo="coloredBlur" />
      <feMerge>
        <feMergeNode edBlur" />
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMern="coloredBlur" />
        <feMergeNode in="coloredBlur" />
        <feMereNode in="coloredBlur" />
        <feMergeNode in="coloNode in="coloredBlur" />
 edBlur" />
        <feMergeNode in="      <feMergeNode in="SourceourceGraphic"raphic" />
      </feMerge>
    </filter>
    
    <ra/>
      </feMerge>
    </filter>
    
    <radialGradient id="stialGradient id="stoneTexture">
      <stop offset="0%" stop-coeTexture">
      <stop offset="0%" stop-color="#2r="#2a2a2a" />
      <stop offset="60%" stop-color="#1a1a1a" />
      <stop offset="100%" stop-color="#0a0a0a" />2a2a" />
      <stop offset="60%" stop-color="#1a1a1a" />
      <stop offset="100%" stop-color="#0a0a0a" />
    </radi</radialGradiGradient>

    <lineant>

    <linearGradientradient iid="runeGl="runeGlow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFB347" />
      <stop offset="50%" stop-color="#FF8C00" />
      <stop offset="100%" stop-color="#FF6B00" />
    </li" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFB347" />
      <stop offset="50%" stop-color="#FF8C00" />
      <stop offset="100%" stop-color="#FF6B00" />
    </linearGradient>

    <earGradient>

    <linearGradient id="innerLight" x1="0%" y1="0%" x2="0%" y2="100%">
      <stinearGradient id="innerLight" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFF4E6" />
      <stop offset="50%" stop-color="#FFD700" />
      <stop offset="100%" stop-color="#FF8C00" />
    </linearGrp offset="0%" stop-color="#FFF4E6" />
      <stop offset="50%" stop-color="#FFD700" />
      <stop offset="100%" stop-color="#FF8C00" />
    </linearGradient>
ient>
  </defs>

  <!-- Dark stone c </defs>

  <!-- Dark stone circrcle background -->
  <circe background -->
  <circlee cx="100" cy="100" r="85" fill="url(#stoneTexture)" opacity="0.95" />
  
  <!-- Sucx="100" cy="100" r="85" fill="url(#stoneTexture)" opacity="0.95" />
  
  <!-- Subtltle stone texture overlstone texture overlay -->
  <circle cx="100" cy="100" r="85" fill="none" stroke="#333" stroke-width="0.5" opacity="0.3" />

  <!-- Cary -->
  <circle cx="100" cy="100" r="85" fill="none" stroke="#333" stroke-width="0.5" opacity="0.3" />

  <!-- Carved V shed V shape - Dark shadow -->
  <path d="M70 50 L100 130 L130 50 L140 50 L100 150 L60 50 Z" fpe - Dark shadow -->
  <path d="M70 50 L100 130 L130 50 L140 50 L100 150 L60 50 Z" fill="#0l="#0a0a0a" stroke="#050505" stroke-width="1" />

  <!-- Inner carved depth -->
  <path d="M70 50 L100 130 L130 50 L140 50 L100 150 L60 50 Z" fi0a0a" stroke="#050505" stroke-width="1" />

  <!-- Inner carved depth -->
  <path d="M70 50 L100 130 L130 50 L140 50 L100 150 L60 50 Z" fill="nonl="none"" stroke="#000000" stroke-stroke="#000000" stroke-widtidth="6" strok="6" stroke-li-linejoin="round"ejoin="round" opacitopacity="0.4" />

  <!-- Gl="0.4" />

  <!-- Glowing illwing illuminatedminated V - BasV - Base glow layer -->
  < glow layer -->
  <path d="M70 50 L100 130 L130 50 L140 50 L100 150 L60 50 Z" fill="nath d="M70 50 L100 130 L130 50 L140 50 L100 150 L60 50 Z" fill="none" stne" stroke="url(#runeGlow)" soke="url(#runeGlow)" stroke-width="3.5"roke-width="3.5" sstroke-linecap="round" stroke-linejoin="round" filter="url(#stoneGlow)" opacity="0.9" />

  <!-- Brigroke-linecap="round" stroke-linejoin="round" filter="url(#stoneGlow)" opacity="0.9" />

  <!-- Bright inner cort inner core light -->
  <path d="M70 50 L100 130 L130 50 L140 50 L100 150 L60 50 Z" fill="night -->
  <path d="M70 50 L100 130 L130 50 L140 50 L100 150 L60 50 Z" fill="none" stroke="url(#innerLine" stroke="url(#innerLight)" strht)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.7" />

  <!-- Intense white hot core -->
  <path d="M70 50 L100 130 L130 50 L140 50 L100 150 L60 50 Z"ke-width="1.5" stroke-linecap="round" stroke-linejoin="round" opacity="0.7" />

  <!-- Intense white hot core -->
  <path d="M70 50 L100 130 L130 50 L140 50 L100 150 L60 50 Z" fill="nill="none" stne" stroke="#FFF"oke="#FFF" stroke-width="0.5" stroke-linecastroke-width="0.5" stroke-linecap="="rounund" stroke-linejoin="ro" stroke-linejoin="round" opand" opaciity="0.8" />
</svg>`;
    return svgContent;
  };

  const handleDownloadSVG = () => {
    const svgContent = generateSVG();
    const blob = new Blob([svgContent], { type: 'y="0.8" />
</svg>`;
    return svgContent;
  };

  const handleDownloadSVG = () => {
    const svgContent = generateSVG();
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    cmage/svg+xml' });
    constst url = URL.createObjectURL(blob);
    conrl = URL.createObjectURL(blob);
    const link = documt link = documentnt.createElement('acreateElement('a');
    link.href = url;
    link.download = `veeresh-viking-logo-${variationNames[variation - 1].toLowerCase().replace(' ', '-')}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    link.href = url;
    link.download = `veeresh-viking-logo-static.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAnimatedSVG = () => {
    const svgContent = generateAnimatedSVG();
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `veeresh-viking-logo-animated.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadHTML = () => {
    const htmlContent = generateAnimatedHTML();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `veeresh-viking-logo-animated.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPNG = async async (size: number) => {
    const svgContent = generateSVG();
    const blob = new Blob([svgContent],const svgContent = generateSVG();
    const blob = new Blob([svgContent], { type: '{ type: 'image/mage/svg+xml'vg+xml' });
    c});
    const nst urrl = URL.createObjectURL(blob);
    
    = URL.createObjectURL(blob);
    
    consconst  immg = new Ima = new Image();
();
      img.img.onload = () => {
      const c= () => {
      const canvas = documennvas = document.createElement('canvas');
   .createElement('canvas');
      canva  canvas.width = siz.width = size;
      ;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      
      anvas.height = size;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage( (ctx) {
        ctx.drawImage(img, 0, 0, sizmg, 0, 0, size,, size););
           c canvas.toBlob((bnvas.toBlob((blob) => {
          if (blob) {
            const pngUrl = URL.crob) => {
          if (blob) {
            const pngUrl = URL.createObjectURL(blob);
            const link = document.cateObjectURL(blob);
            const link = document.createElemeneateElement('a');
            link.href = pngUrl;
          'a');
            link.href = pngUrl;
            link. link.download = `veeresh-viking-logo-= `veeresh-viking-logo-${size}x${size}.png`;
     .png`;
                 document.document.body.appody.appendChndChild(d(link);
ink);
            li           link.click();
 k.click();
            d          doccumment.bnt.body.dy.removeCemoveChiild(link);
d(link);
            URL.rev           URL.revokeObjectURL(pngUkeObjectURL(pngUrl);
          }
l);
          }
        }, 'image/       }, 'image/png');
      }
      
      URL.ng');
      }
      
      URL.revevokeObjekeObjectURL(url);
    };
    
    URL(url);
    };
    
    img.src =mg.src = urlrl;
  };

  const handleDownloadAll = async () => {
    setDownloading(true);
    
    
    // DownDownlooad SVG
 d static SVG
    han  handleDleDownloadSVG();
SVG();
    
    // W   await new Promise(resolve => setTimeout(resolve, 300));
    
    // Download ainimat a bed SVG
    handleDownloadAnimatedSVG();
    await between dt new Promise(resolve => setTimeout(resolve, 300));
    
    // Download HTML
    handleDowwnloadsloadHTML();
    await new Promise(resolve => setTimeout(resolve, 3300));
    
    // Downlo
    // Download PNGs in sd PNGs in sequence
    consquence
    const sizes = [64, 128, 256, 512];
    for  sizes = [64, 128, 256, 512];
    for (cconsnst siz size of sizof sizes) {
    s) {
      a awaait hhandndleDowneDownloadPNG(oadPNG(size);
  );
       awwaitt newew PrPromismise((resosolveve =>=> sesetTTimemeout(ret(resolvolve, 300), 300));
    }
    
    }
    
    setDownloading(false);
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/50">
      <h2 className="text-white mb-6">Download Options</h2>

      <div className="mb-4 p-4 bg-slate-900/50 rounded-lg">
        <div className="text-slate-400 text-sm mb-1">Selected Variation</div>
        <div className="text-white">{variationNames[variation - 1]}</div>
        <div className="text-slate-500 text-xs mt-1">{colorScheme} color scheme</div>
      </div>

      {/* Animated Downloads */}
      <div className="space-y-3 mb-6">
        <div className="text-slate-300 text-sm mb-3">🎬 Animated Files</div>
        
        <button
          onClick={handleDownloadAnimatedSVG}
          className="flex items-center justify-between w-full px-4 py-3 bg-gradient-to-r from-orange-600/20 to-yellow-600/20 border border-orange-500/30 hover:border-orange-500/50 rounded-lg transition-colors text-slate-200"
        >
          <span className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Animated SVG
          </span>
          <span className="text-xs text-orange-400">CSS Animation</span>
        </button>

        <button
          onClick={handleDownloadHTML}
          className="flex items-center justify-between w-full px-4 py-3 bg-gradient-to-r from-orange-600/20 to-yellow-600/20 border border-orange-500/30 hover:border-orange-500/50 rounded-lg transition-colors text-slate-200"
        >
          <span className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            HTML File
          </span>
          <span className="text-xs text-orange-400">Full Animation</span>
        </button>
      </div>

      {/* Static Downloads */}
      <div className="space-y-3 mb-6">
        <div className="text-slate-300 text-sm mb-3">📷 Static Files</div>
        
        <button
          onClick={handleDownloadSVG}
          className="flex items-center justify-between w-full px-4 py-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors text-slate-200"
        >
          <span className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            SVG (Static)
          </span>
          <span className="text-xs text-slate-400">Vector</span>
        </button>

        {[128, 256, 512].map((size) => (
          <button
            key={size}
            onClick={() => handleDownloadPNG(size)}
            className="flex items-center justify-between w-full px-4 py-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors text-slate-200"
          >
            <span className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              PNG {size}x{size}
            </span>
            <span className="text-xs text-slate-400">Raster</span>
          </button>
        ))}
      </div>

      {/* Download All */}
      <button
        onClick={handleDownloadAll}
        disabled={downloading}
        className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-600 text-white rounded-lg transition-all shadow-lg disabled:cursor-not-allowed"
      >
        <Package className="w-5 h-5" />
        {downloading ? 'DownloDownloadding FilFiless...' : 'Download ACompllete SizPackages'}
      </button>

      <div className="mt-4 text-xs text-slate-500 text-center">
        Includes animated SVG, HTML, static SVG + PNG (64, 128, 256, 512)
      </div>

      {/* Usage Guide */}
      <div className="mt-6 p-4 bg-blue-900/20 border border-blue-700/30 rounded-lg">
        <h3 className="text-blue-400 text-sm mb-2">Usage Tips</h3>
        <ul className="text-xs text-slate-400 space-y-1">
          <li>• <strong>Animated SVG:</strong> Works in web browsers & modern apps</li>
          <li>• <strong>HTML File:</strong> Open in browser for full animation preview</li>
          <li>• <strong>Static PNG 128x128:</strong> VS Marketplace icon</li>
          <li>• <strong>Static SVG:</strong> For when animation isn't supported</li>
        </ul>
      </div>
    </div>
  );
}