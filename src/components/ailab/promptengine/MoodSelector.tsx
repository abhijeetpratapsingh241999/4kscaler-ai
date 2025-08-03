import React, { useState } from 'react';
import { Palette } from 'lucide-react'; // FIX: Swatches ko Palette se badal diya gaya hai

// Moods ki list ko objects me badal diya gaya hai taaki har mood ka apna color ho
const moods = [
  { name: 'Cinematic', color: 'bg-cyan-500', shadow: 'shadow-[0_0_12px_#22d3ee,0_0_20px_#22d3ee40]' },
  { name: 'Vintage', color: 'bg-amber-500', shadow: 'shadow-[0_0_12px_#f59e0b,0_0_20px_#f59e0b40]' },
  { name: 'Moody', color: 'bg-indigo-500', shadow: 'shadow-[0_0_12px_#6366f1,0_0_20px_#6366f140]' },
  { name: 'Vibrant', color: 'bg-pink-500', shadow: 'shadow-[0_0_12px_#ec4899,0_0_20px_#ec489940]' },
  { name: 'Dark', color: 'bg-slate-600', shadow: 'shadow-[0_0_12px_#475569,0_0_20px_#47556940]' },
  { name: 'Futuristic', color: 'bg-purple-500', shadow: 'shadow-[0_0_12px_#a855f7,0_0_20px_#a855f740]' },
  { name: 'Happy', color: 'bg-yellow-400', shadow: 'shadow-[0_0_12px_#facc15,0_0_20px_#facc1540]' },
  { name: 'Natural', color: 'bg-green-500', shadow: 'shadow-[0_0_12px_#22c55e,0_0_20px_#22c55e40]' },
];

const MoodSelector: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>('Cinematic');

  return (
    <div className="p-4 pt-2">
      <div className="flex items-center gap-2 mb-3">
        {/* FIX: Icon me multi-color glow effect dala gaya hai jo light mode me heavy hai */}
        <Palette className="w-7 h-7 text-slate-700 
          filter-[drop-shadow(0_0_5px_rgba(239,68,68,0.9))_drop-shadow(0_0_5px_rgba(52,211,153,0.9))_drop-shadow(0_0_5px_rgba(59,130,246,0.9))]
          dark:text-emerald-400
          dark:filter-[drop-shadow(0_0_10px_rgba(239,68,68,0.7))_drop-shadow(0_0_10px_rgba(52,211,153,0.7))_drop-shadow(0_0_10px_rgba(59,130,246,0.7))]" 
        />
        {/* FIX: Font weight ko 'font-medium' kar diya gaya hai */}
        <h3 className="font-medium text-lg text-text-main-light dark:text-text-main-dark">
          Core Moods
        </h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {moods.map((mood) => (
          <button
            key={mood.name}
            onClick={() => setSelectedMood(mood.name)}
            className={`w-full py-2 text-sm font-semibold rounded-lg transition-all duration-300 
              text-white border border-transparent
              ${mood.color} ${mood.shadow}
              ${
                selectedMood === mood.name
                  ? 'ring-2 ring-white scale-105' // FIX: ring-offset classes hata di gayi hain
                  : 'opacity-70 hover:opacity-100'
              }`
            }
          >
            {mood.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;
