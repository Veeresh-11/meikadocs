import { SecureDocsLogo } from './SecureDocsLogo';

interface LogoVariationSelectorProps {
  selectedVariation: number;
  setSelectedVariation: (variation: number) => void;
}

export function LogoVariationSelector({
  selectedVariation,
  setSelectedVariation,
}: LogoVariationSelectorProps) {
  const variations = [
    { id: 1, name: 'Shield Document' },
    { id: 2, name: 'Lock File' },
    { id: 3, name: 'Secure Folder' },
    { id: 4, name: 'Data Vault' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
      <h2 className="text-slate-900 mb-4">Choose Variation</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {variations.map((variation) => (
          <button
            key={variation.id}
            onClick={() => setSelectedVariation(variation.id)}
            className={`group relative aspect-square bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border-2 transition-all hover:shadow-lg ${
              selectedVariation === variation.id
                ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                : 'border-slate-200 hover:border-blue-300'
            }`}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <SecureDocsLogo
                variation={variation.id}
                showWordmark={false}
                animationEnabled={false}
                size={80}
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-white/90 backdrop-blur-sm rounded-b-xl border-t border-slate-200">
              <div className="text-sm text-slate-700 text-center">
                {variation.name}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
