import React from 'react';
import { PlusCircle } from 'lucide-react';

const CreditsUsage: React.FC = () => {
  // Sample data for display.
  const credits = {
    used: 3750,
    total: 5000,
  };

  const percentage = (credits.used / credits.total) * 100;
  const remaining = credits.total - credits.used;
  // SVG circle formula: 2 * pi * radius
  const circumference = 2 * Math.PI * 52; 
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Change color based on usage
  let progressColorClass = 'text-green-400';
  if (percentage > 80) {
    progressColorClass = 'text-red-500';
  } else if (percentage > 50) {
    progressColorClass = 'text-yellow-400';
  }

  return (
    <div className="glass-card p-6 flex flex-col items-center text-center">
      <h3 className="text-xl font-bold text-white text-shadow-glow mb-6">AI Credits Usage</h3>
      
      <div className="relative w-40 h-40">
        <svg className="w-full h-full" viewBox="0 0 120 120">
          {/* Background Circle */}
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="12"
          />
          {/* Progress Circle */}
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
            className={`progress-circle ${progressColorClass}`}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">{remaining.toLocaleString()}</span>
          <span className="text-xs text-slate-400">Credits Left</span>
        </div>
      </div>

      <p className="text-sm text-slate-300 mt-6">
        Used {credits.used.toLocaleString()} of {credits.total.toLocaleString()} credits this month.
      </p>

      <button className="buy-credits-button mt-6">
        <PlusCircle size={20} />
        <span>Buy More Credits</span>
      </button>
    </div>
  );
};

export default CreditsUsage;
