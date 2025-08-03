import React, { useState } from 'react';
import { Wand2 } from 'lucide-react'; // Magic Modifiers ke liye ek suitable icon

// Modifiers ki list me naye items add kiye gaye hain
const modifiers = [
  { name: 'Clarity', value: 50 },
  { name: 'Vibrance', value: 30 },
  { name: 'Glow', value: 70 },
  { name: 'Structure', value: 40 },
  { name: 'Film Grain', value: 20 },
  { name: 'Vignette', value: 15 },
  { name: 'Sharpness', value: 60 },
];

const MagicModifiers: React.FC = () => {
  const [modifierValues, setModifierValues] = useState(
    modifiers.reduce((acc, mod) => ({ ...acc, [mod.name]: mod.value }), {})
  );

  const handleSliderChange = (name: string, value: number) => {
    setModifierValues(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-4 pt-2">
      <style>
        {`
          /* Custom styles for the slider track */
          input[type="range"]::-webkit-slider-runnable-track {
            background: rgba(0, 0, 0, 0.2);
            height: 4px;
            border-radius: 2px;
          }
          .dark input[type="range"]::-webkit-slider-runnable-track {
            background: rgba(255, 255, 255, 0.1);
          }
          
          /* Custom styles for the slider thumb */
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #a855f7; /* Purple */
            cursor: pointer;
            margin-top: -6px;
            box-shadow: 0 0 10px rgba(168, 85, 247, 0.8);
          }

          /* New styles for modifier labels */
          .modifier-label {
            color: white;
            text-shadow: 0 0 5px rgba(0,0,0,0.5);
          }
          .dark .modifier-label {
            text-shadow: 0 0 8px rgba(255,255,255,0.5);
          }

          /* New styles for modifier values */
          .modifier-value {
            color: white;
            text-shadow: 0 0 5px rgba(0,0,0,0.5);
          }
          .dark .modifier-value {
            text-shadow: 0 0 8px rgba(255,255,255,0.5);
          }
        `}
      </style>

      <div className="flex items-center gap-2 mb-4">
        {/* FIX: Icon color aur glow ko heavy kiya gaya hai */}
        <Wand2 className="w-7 h-7 text-purple-500 filter-[drop-shadow(0_0_10px_rgba(168,85,247,0.9))_drop-shadow(0_0_25px_rgba(168,85,247,0.7))]" />
        <h3 className="font-medium text-lg text-text-main-light dark:text-text-main-dark">
          Magic Modifiers
        </h3>
      </div>
      
      <div className="space-y-4">
        {modifiers.map((modifier) => (
          <div key={modifier.name}>
            <div className="flex justify-between items-center text-xs mb-1">
              {/* FIX: Label text ko white with glow kiya gaya hai */}
              <label className="font-semibold modifier-label">
                {modifier.name}
              </label>
              <span className="font-semibold modifier-value">
                {modifierValues[modifier.name]}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={modifierValues[modifier.name]}
              onChange={(e) => handleSliderChange(modifier.name, parseInt(e.target.value))}
              className="w-full h-2 bg-transparent appearance-none cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MagicModifiers;
