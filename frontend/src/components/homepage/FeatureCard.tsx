import React from 'react';

// Props का टाइप डिफाइन करें
type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  isNew?: boolean;
};

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, isNew = false }) => {
  return (
    <div className="relative bg-slate-800/50 p-6 rounded-2xl border border-slate-700/80
                    hover:border-blue-500/60 transition-colors duration-300
                    hover:bg-slate-800/80 group">
      
      {/* "New" Badge */}
      {isNew && (
        <div className="absolute top-4 right-4 bg-blue-500/20 text-blue-400 text-xs font-bold px-2 py-0.5 rounded-full border border-blue-500/30">
          नया
        </div>
      )}

      {/* Icon */}
      <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-lg
                      bg-slate-700/50 text-blue-400 group-hover:text-blue-300
                      border border-slate-600/80 transition-colors duration-300">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-slate-100 mb-2">{title}</h3>

      {/* Description */}
      <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    </div>
  );
};