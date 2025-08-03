import React from 'react';

// Props ka type define kiya gaya hai
type Snapshot = {
  id: number;
  prompt: string;
  imageUrl: string;
};

type TimelineItemProps = {
  snapshot: Snapshot;
  isActive: boolean;
  onClick: () => void;
};

const TimelineItem: React.FC<TimelineItemProps> = ({ snapshot, isActive, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className={`w-full p-2 rounded-lg transition-all duration-200 flex items-center gap-3 text-left
        ${isActive 
          ? 'bg-blue-500/20 dark:bg-blue-500/30' 
          : 'hover:bg-black/5 dark:hover:bg-white/5'
        }`
      }
    >
      {/* Thumbnail Image */}
      <img 
        src={snapshot.imageUrl} 
        alt={snapshot.prompt}
        className={`w-16 h-16 object-cover rounded-md flex-shrink-0 border-2
          ${isActive ? 'border-blue-400' : 'border-transparent'}`
        }
        loading="lazy"
      />
      
      {/* Prompt Text */}
      <div>
        <p className="text-xs font-semibold text-text-main-light dark:text-slate-200 line-clamp-2">
          {snapshot.prompt}
        </p>
      </div>
    </button>
  );
};

export default TimelineItem;
