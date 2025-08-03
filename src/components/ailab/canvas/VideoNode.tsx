import React, { forwardRef, useState } from 'react';

type VideoNodeProps = {
  videoUrl: string;
  onTogglePlayPause: () => void;
  onWheelZoom: (event: React.WheelEvent) => void;
  onPinchZoom: (delta: number) => void;
};

// Helper function to format time from seconds to MM:SS
const formatTime = (timeInSeconds: number) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const VideoNode = forwardRef<HTMLVideoElement, VideoNodeProps>(
  ({ videoUrl, onTogglePlayPause, onWheelZoom, onPinchZoom }, ref) => {
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
      setDuration(e.currentTarget.duration);
    };

    const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
      setCurrentTime(e.currentTarget.currentTime);
    };
    
    return (
      <div 
        className="w-full h-full flex items-center justify-center overflow-hidden cursor-pointer relative"
        onClick={onTogglePlayPause}
        onWheel={onWheelZoom}
      >
        <video
          ref={ref}
          src={videoUrl}
          loop
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          className="max-w-full max-h-full object-contain rounded-lg pointer-events-none" // pointer-events-none taaki click parent div par kaam kare
        />
        
        {/* Naya Time Duration Display with Progress Bar */}
        {duration > 0 && (
          <div className="absolute bottom-3 left-3 right-3 p-2 rounded-md bg-black/50 backdrop-blur-sm text-white text-xs font-mono">
            <div className="flex justify-between items-center">
              <span className="text-cyan-300">{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-white/20 h-1 rounded-full mt-1.5 overflow-hidden">
              <div 
                className="bg-cyan-300 h-1 rounded-full transition-all duration-100 ease-linear" 
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default VideoNode;
