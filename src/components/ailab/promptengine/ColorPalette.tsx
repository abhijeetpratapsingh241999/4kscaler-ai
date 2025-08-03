import React, { useState } from 'react';
import { Paintbrush, SunMoon, Sunrise, Zap, Feather, Contrast, Trees, Waves, Flame } from 'lucide-react';

// Palettes ki list ko naye icons aur gradients ke saath update kiya gaya hai
const palettes = [
  { name: 'Teal & Orange', Icon: SunMoon, gradient: 'from-orange-400 to-teal-500', iconClass: 'text-orange-200' },
  { name: 'Golden Hour', Icon: Sunrise, gradient: 'from-yellow-400 via-amber-500 to-red-600', iconClass: 'text-yellow-200' },
  { name: 'Neon Nights', Icon: Zap, gradient: 'from-pink-500 via-purple-600 to-indigo-600', iconClass: 'text-pink-300' },
  { name: 'Pastel Dream', Icon: Feather, gradient: 'from-sky-300 via-rose-300 to-fuchsia-300', iconClass: 'text-sky-100' },
  { name: 'Black & White', Icon: Contrast, gradient: 'from-slate-200 via-slate-500 to-slate-800', iconClass: 'text-white' },
  { name: 'Forest Vibe', Icon: Trees, gradient: 'from-emerald-500 to-lime-600', iconClass: 'text-emerald-200' },
  { name: 'Oceanic', Icon: Waves, gradient: 'from-blue-500 to-cyan-400', iconClass: 'text-blue-200' },
  { name: 'Crimson Fire', Icon: Flame, gradient: 'from-red-600 via-orange-500 to-yellow-500', iconClass: 'text-red-200' },
];

const ColorPalette: React.FC = () => {
  const [selectedPalette, setSelectedPalette] = useState<string | null>('Teal & Orange');

  return (
    <div className="p-4 pt-2">
      {/* Custom CSS for the animated effects */}
      <style>
        {`
          @keyframes animate-galaxy {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .animated-gradient {
            background-size: 200% 200%;
            animation: animate-galaxy 8s ease infinite;
          }
          
          .metallic-sheen {
            background: linear-gradient(165deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%);
          }
          .palette-icon {
            /* FIX: Aur gehra glow effect */
            filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 30px rgba(255, 255, 255, 0.7));
          }
        `}
      </style>

      <div className="flex items-center gap-2 mb-3">
        <Paintbrush className="w-7 h-7 text-rose-400 filter-[drop-shadow(0_0_8px_rgba(251,113,133,0.8))_drop-shadow(0_0_20px_rgba(251,113,133,0.6))]" />
        <h3 className="font-medium text-lg text-text-main-light dark:text-text-main-dark">
          Color Palette
        </h3>
      </div>
      
      <div className="grid grid-cols-4 gap-3">
        {palettes.map((palette) => (
          <button
            key={palette.name}
            onClick={() => setSelectedPalette(palette.name)}
            aria-label={`Select ${palette.name} color`}
            // FIX: Naya thin, glowing white border jo dono modes me dikhega
            className={`relative w-full aspect-[2/3] rounded-xl transition-all duration-300 group overflow-hidden border border-white/20 shadow-[0_0_5px_rgba(255,255,255,0.1)]
              ${
                selectedPalette === palette.name
                  ? 'scale-110 opacity-100 shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                  : 'opacity-70 hover:opacity-100 hover:scale-105 hover:shadow-[0_0_10px_rgba(255,255,255,0.2)]'
              }`
            }
          >
            <div className="relative w-full h-full rounded-[10px] overflow-hidden flex items-center justify-center">
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${palette.gradient} animated-gradient`}
              />
              <div className="absolute inset-0 metallic-sheen" />
              <palette.Icon className={`w-8 h-8 palette-icon ${palette.iconClass}`} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
