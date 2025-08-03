import React, { useState } from 'react';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { Bot } from 'lucide-react'; // Naya, zyada reliable icon import kiya gaya hai

const AICopilotInput: React.FC = () => {
  const [prompt, setPrompt] = useState('');

  const handleGenerate = () => {
    console.log("Generating with prompt:", prompt);
    // Yahan prompt ko process karne ka logic aayega
  };

  return (
    // Is container se h-full aur flex-col hata diya gaya hai
    <div className="p-4">
      {/* Label ab naye icon ke saath hai */}
      <div className="flex items-center gap-2 mb-3">
        {/* FIX: Dono drop-shadow effects ko ek hi filter property me daal diya gaya hai */}
        <Bot className="w-7 h-7 text-purple-500 filter-[drop-shadow(0_0_10px_rgba(192,132,252,0.9))_drop-shadow(0_0_25px_rgba(192,132,252,0.6))]" />
        {/* FIX: Font weight ko 'font-medium' kar diya gaya hai */}
        <label htmlFor="ai-prompt" className="font-medium text-lg text-text-main-light dark:text-text-main-dark">
          AI Copilot
        </label>
      </div>
      
      {/* FIX: Layout ko flexbox se behtar banaya gaya hai taaki height hamesha same rahe */}
      <div className="flex items-center w-full h-12 rounded-lg bg-white/50 dark:bg-slate-800/30 border border-black/10 dark:border-white/20 focus-within:ring-2 focus-within:ring-cyan-400 transition-all duration-200">
        <textarea
          id="ai-prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Cinematic look, teal and orange..."
          // FIX: Background, border, aur rounding ab parent div se control ho rahe hain
          className="w-full h-full flex-grow p-3 bg-transparent outline-none resize-none no-scrollbar text-slate-800 dark:text-white dark:[text-shadow:0_0_8px_rgba(255,255,255,0.5)] placeholder:text-slate-500 dark:placeholder:text-white dark:placeholder:[text-shadow:0_0_8px_rgba(255,255,255,0.5)]"
        />
        <button
          onClick={handleGenerate}
          // FIX: Button ab flex item hai, absolute positioning hata di gayi hai
          className="flex-shrink-0 flex items-center justify-center w-12 h-full text-white rounded-r-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:brightness-110 active:scale-95 transition-all duration-200"
          aria-label="Generate effect"
        >
          <SparklesIcon className="w-5 h-5" />
        </button>
      </div>
      
    </div>
  );
};

export default AICopilotInput;
