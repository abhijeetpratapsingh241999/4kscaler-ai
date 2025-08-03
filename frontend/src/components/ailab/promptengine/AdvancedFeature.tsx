import React, { useState } from 'react';
import { 
  ChevronDown, 
  Cpu, 
  Mic, // Waves ko Mic se badal diya gaya hai
  Smile, 
  Scaling, 
  Palette, 
  Sparkles 
} from 'lucide-react'; // Sabhi zaroori icons import kiye gaye hain

// Naya custom FPS icon
const FpsIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 3h5v18H6zM13 3h5v18h-5z" />
    <path d="M6 9h5M13 9h5" />
  </svg>
);

// Advance features ki list ko naye icons aur colors ke saath update kiya gaya hai
const features = [
  { name: 'AI Audio Restoration', id: 'audio', Icon: Mic, color: 'text-cyan-400' },
  { name: 'AI Face Enhancement', id: 'face', Icon: Smile, color: 'text-pink-400' },
  { name: 'AI Upscaling', id: 'upscale', Icon: Scaling, color: 'text-indigo-400' },
  { name: 'AI Frame Interpolation', id: 'fps', Icon: FpsIcon, color: 'text-slate-400' },
  { name: 'AI Color Grading', id: 'color', Icon: Palette, color: 'text-emerald-400' },
  { name: 'Denoising + Artifacts', id: 'denoise', Icon: Sparkles, color: 'text-amber-400' },
];

const AdvancedFeature: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [enabledFeatures, setEnabledFeatures] = useState<{ [key: string]: boolean }>({
    upscale: true,
    denoise: true,
  });

  const toggleFeature = (id: string) => {
    setEnabledFeatures(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-4 pt-2">
      <style>
        {`
          /* Custom styles for the toggle switch */
          .toggle-checkbox:checked + .toggle-bg {
            background-color: #22c55e; /* Green */
            border-color: #22c55e;
          }
          .toggle-checkbox:checked + .toggle-bg .toggle-label {
            transform: translateX(20px);
          }
          .icon-deep-glow {
            filter: drop-shadow(0 0 8px currentColor) drop-shadow(0 0 20px currentColor);
          }
        `}
      </style>

      {/* Clickable Header */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          {/* FIX: Icon color ko heavy kiya gaya hai aur glow badhaya gaya hai */}
          <Cpu className="w-7 h-7 text-blue-500 filter-[drop-shadow(0_0_8px_rgba(59,130,246,0.9))_drop-shadow(0_0_20px_rgba(59,130,246,0.7))]" />
          {/* FIX: Font size kam kiya gaya hai aur wrapping ko roka gaya hai */}
          <h3 className="font-semibold text-base text-text-main-light dark:text-text-main-dark whitespace-nowrap">
            Advanced Features
          </h3>
        </div>
        {/* FIX: Dropdown icon me white color with glow effect dala gaya hai */}
        <ChevronDown 
          className={`w-5 h-5 text-slate-600 dark:text-white dark:drop-shadow-[0_0_5px_rgba(255,255,255,0.7)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      {/* Collapsible Content */}
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] mt-4' : 'max-h-0'}`}>
        <div className="space-y-2 border-t border-black/10 dark:border-white/10 pt-4">
          {features.map((feature) => (
            <div key={feature.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-500/10 dark:bg-white/5 backdrop-blur-sm border border-black/5 dark:border-white/10">
              <div className="flex items-center gap-3">
                <feature.Icon className={`w-6 h-6 flex-shrink-0 ${feature.color} icon-deep-glow`} />
                <span className="text-sm font-semibold modifier-label cursor-pointer text-slate-700 dark:text-slate-200">
                  {feature.name}
                </span>
              </div>
              <label htmlFor={feature.id} className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  id={feature.id} 
                  className="sr-only toggle-checkbox"
                  checked={enabledFeatures[feature.id] || false}
                  onChange={() => toggleFeature(feature.id)}
                />
                <div className="toggle-bg w-10 h-5 bg-black/20 dark:bg-white/10 rounded-full transition-colors">
                  <div className="dot toggle-label absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform"></div>
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvancedFeature;
