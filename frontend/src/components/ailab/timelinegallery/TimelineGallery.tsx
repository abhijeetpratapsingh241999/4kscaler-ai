import React from 'react';
import { GalleryVertical } from 'lucide-react';
import TimelineItem from './TimelineItem'; // FIX: TimelineItem ko import kiya gaya hai

// Props ka type define kiya gaya hai
type Snapshot = {
  id: number;
  prompt: string;
  imageUrl: string;
};

type TimelineGalleryProps = {
  snapshots: Snapshot[];
  activeSnapshotId: number;
  onSelectSnapshot: (id: number) => void;
};

const TimelineGallery: React.FC<TimelineGalleryProps> = ({ snapshots, activeSnapshotId, onSelectSnapshot }) => {
  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        {/* FIX: Icon color ko heavy kiya gaya hai aur glow badhaya gaya hai */}
        <GalleryVertical className="w-7 h-7 text-indigo-500 dark:text-indigo-400 filter-[drop-shadow(0_0_10px_rgba(129,140,248,0.9))_drop-shadow(0_0_25px_rgba(129,140,248,0.7))]" />
        <h3 className="font-medium text-lg text-text-main-light dark:text-text-main-dark">
          Timeline Gallery
        </h3>
      </div>

      {/* Scrollable list of snapshots */}
      <div className="flex-grow overflow-y-auto space-y-2 pr-1 -mr-1 no-scrollbar">
        {snapshots.map((snapshot) => (
          <TimelineItem 
            key={snapshot.id}
            snapshot={snapshot}
            isActive={snapshot.id === activeSnapshotId}
            onClick={() => onSelectSnapshot(snapshot.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default TimelineGallery;
