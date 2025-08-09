import React from 'react';
import { BoltIcon } from '@heroicons/react/24/solid';

const CreditsBox: React.FC = () => {
  // Abhi ke liye hum credits ko hardcode kar rahe hain.
  // Real application mein yeh data AppContext ya API se aa sakta hai.
  const credits = 1250;

  return (
    <div className="flex items-center gap-2 glass-effect p-2 rounded-md" aria-label="Credits remaining">
      <BoltIcon className="w-5 h-5 text-amber-500" />
      <span 
        className="font-semibold text-sm text-green-400 [filter:drop-shadow(0_0_2px_rgba(255,255,255,0.7))_drop-shadow(0_0_8px_rgba(74,222,128,0.9))_drop-shadow(0_0_15px_rgba(16,185,129,0.7))]"
      >
        {credits.toLocaleString()}
      </span>
    </div>
  );
};

export default CreditsBox;
