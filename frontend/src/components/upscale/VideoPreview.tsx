import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowUpTrayIcon, 
  ArrowDownTrayIcon, 
  SparklesIcon, 
  ShareIcon,
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ArrowsRightLeftIcon,
  BeakerIcon,
  ArrowPathIcon,
  RectangleStackIcon
} from '@heroicons/react/24/solid';

// --- Before/After Slider Component ---
const BeforeAfterSlider = ({ originalUrl, upscaledUrl }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const originalVideoRef = useRef<HTMLVideoElement>(null);
  const upscaledVideoRef = useRef<HTMLVideoElement>(null);

  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  useEffect(() => {
      const syncVideos = () => {
          if(originalVideoRef.current && upscaledVideoRef.current) {
              upscaledVideoRef.current.currentTime = originalVideoRef.current.currentTime;
          }
      };
      if(originalVideoRef.current) {
          originalVideoRef.current.addEventListener('timeupdate', syncVideos);
          return () => originalVideoRef.current?.removeEventListener('timeupdate', syncVideos);
      }
  }, [originalUrl, upscaledUrl]);


  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none cursor-ew-resize"
      onMouseMove={handleDrag}
      onTouchMove={handleDrag}
      onMouseLeave={() => setIsDragging(false)}
    >
      <video
        ref={originalVideoRef}
        key={`original-${originalUrl}`}
        src={originalUrl}
        className="absolute inset-0 w-full h-full object-contain"
        autoPlay
        loop
        muted
      />
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <video
          ref={upscaledVideoRef}
          key={`upscaled-${upscaledUrl}`}
          src={upscaledUrl}
          className="absolute inset-0 w-full h-full object-contain"
          autoPlay
          loop
          muted
        />
      </div>
      <div 
        className="absolute top-0 h-full w-1.5 bg-white/50 cursor-ew-resize"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-10 h-10 bg-white/50 rounded-full flex items-center justify-center backdrop-blur-sm">
          <ArrowsRightLeftIcon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};


// --- Circular Progress Bar Component ---
const CircularProgressBar = ({ progress }) => {
    const size = 180;
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;
    const hue = (progress / 100) * 120; // 0 = red, 120 = green
    const color = `hsl(${hue}, 100%, 50%)`;

    return (
        <div className="relative flex items-center justify-center w-32 h-32 md:w-44 md:h-44">
            <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} className="absolute inset-0">
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#333"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                />
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${size/2} ${size/2})`}
                    style={{ transition: 'stroke-dashoffset 0.3s, stroke 0.3s', filter: `drop-shadow(0 0 8px ${color})` }}
                />
            </svg>
            <span className="text-white text-2xl md:text-3xl font-bold z-10" style={{ textShadow: '0 0 10px rgba(0,0,0,0.7)' }}>
                {Math.round(progress)}%
            </span>
        </div>
    );
};


// --- Main VideoPreview Component ---
type VideoPreviewProps = {
  previewUrl: string | null;
  isUpscaling?: boolean;
  upscalingProgress?: number;
  upscaledUrl?: string | null;
};

const VideoPreview: React.FC<VideoPreviewProps> = ({ 
  previewUrl, 
  isUpscaling = false, // Default value
  upscalingProgress = 0, // Default value
  upscaledUrl = null // Default value
}) => {
  const defaultVideoUrl = "https://videos.pexels.com/video-files/3129967/3129967-hd_1920_1080_24fps.mp4";
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState('00:00');
  const [currentTime, setCurrentTime] = useState('00:00');
  const [isRotated, setIsRotated] = useState(false); // Rotation state

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (previewUrl) { video.muted = false; setIsMuted(false); setVolume(0.5); } 
    else { video.muted = true; setIsMuted(true); }
    setProgress(0);
    setIsRotated(false); // Reset rotation on new video
  }, [previewUrl]);

  useEffect(() => {
    const video = videoRef.current;
    if (video) { video.volume = volume; video.muted = isMuted; }
  }, [volume, isMuted]);

  const handleMetadataLoaded = () => {
    const video = videoRef.current;
    if (!video) return;
    setDuration(formatTime(video.duration));
    if (!previewUrl && video.paused) video.play().catch(console.error);
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(console.error);
    else video.pause();
  };
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume > 0) setIsMuted(false);
  };

  const toggleMute = () => setIsMuted(prev => !prev);

  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      setProgress((video.currentTime / video.duration) * 100);
      setCurrentTime(formatTime(video.currentTime));
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const seekTime = ((e.clientX - rect.left) / rect.width) * video.duration;
    video.currentTime = seekTime;
  };

  const toggleRotation = () => setIsRotated(prev => !prev);

  // --- Render Logic ---
  const renderContent = () => {
    if (isUpscaling) {
      const isComplete = upscalingProgress >= 100;
      return (
        <div className="w-full h-full flex items-center justify-center bg-black rounded-lg">
          {isComplete && originalUrl && upscaledUrl ? (
            <BeforeAfterSlider originalUrl={originalUrl} upscaledUrl={upscaledUrl} />
          ) : (
            <>
              <video
                  key={`bg-${originalUrl}`}
                  src={originalUrl}
                  className="absolute inset-0 w-full h-full object-contain opacity-20 blur-sm"
                  autoPlay loop muted
              />
              <CircularProgressBar progress={upscalingProgress} />
            </>
          )}
        </div>
      );
    }

    // Normal Video Player
    return (
      <div className={`relative w-full h-full flex items-center justify-center transition-all duration-300 ${isRotated ? 'rotated-wrapper' : ''}`}>
        <video
          ref={videoRef}
          key={previewUrl || defaultVideoUrl}
          src={previewUrl || defaultVideoUrl}
          loop={!previewUrl}
          playsInline
          className={`block max-w-full max-h-full rounded-lg transition-transform duration-300 ${isRotated ? 'rotated-video' : ''}`}
          onClick={togglePlayPause}
          onLoadedMetadata={handleMetadataLoaded}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onTimeUpdate={handleTimeUpdate}
        />
        {showControls && (
          <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 bg-gradient-to-t from-black/70 to-transparent">
            <div className="px-1">
              <div className="w-full bg-white/30 h-1.5 rounded-full cursor-pointer group" onClick={handleSeek}>
                <div className="bg-red-600 h-full rounded-full relative" style={{ width: `${progress}%` }}>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-red-600 rounded-full opacity-0 group-hover:opacity-100"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-2">
                <button onClick={togglePlayPause} className="text-white p-2 rounded-full hover:bg-white/20"><_components.PlayPauseIcon isPlaying={isPlaying} /></button>
                <span className="text-white text-xs font-mono">{currentTime} / {duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={toggleMute} className="text-white p-2 rounded-full hover:bg-white/20"><_components.VolumeIcon isMuted={isMuted} volume={volume} /></button>
                <input type="range" min="0" max="1" step="0.05" value={isMuted ? 0 : volume} onChange={handleVolumeChange} className="w-16 md:w-24 h-1 accent-white" />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  const originalUrl = previewUrl || defaultVideoUrl;

  return (
    <div className={`w-full lg:w-3/5 flex flex-col items-center justify-center page-main-container h-full p-2 md:p-4 transition-all duration-300 ${isRotated ? 'fixed inset-0 z-50 bg-black' : ''}`}>
      <div
        ref={containerRef}
        className={`relative preview-shadow-edge flex items-center justify-center rounded-lg overflow-hidden transition-all duration-300 max-h-[85vh] ${isRotated ? 'rotated-container' : 'max-w-full'}`}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {renderContent()}
        {previewUrl && (
            <div className="absolute top-2 right-2 z-20 flex flex-col gap-2 lg:hidden">
                <button 
                    onClick={toggleRotation}
                    className="p-2 bg-black/40 rounded-full text-white hover:bg-black/60 transition-colors"
                >
                    <ArrowPathIcon className={`w-5 h-5 transition-transform duration-300 ${isRotated ? 'rotate-[-90deg]' : ''}`} />
                </button>
            </div>
        )}
      </div>
      {previewUrl && !isUpscaling && (
        <div className={`w-full max-w-4xl mt-4 flex items-center justify-center gap-3 ${isRotated ? 'absolute bottom-4 left-0 right-0 z-30 px-4' : 'flex-wrap'}`}>
            <button className="action-btn action-btn-light dark:action-btn-dark btn-blue-shadow">
              <ArrowUpTrayIcon className="w-5 h-5 text-orange-500 icon-glow-orange" /> <span className="hidden sm:inline">Upload</span>
            </button>
            <button className="action-btn action-btn-light dark:action-btn-dark btn-blue-shadow">
              <ArrowDownTrayIcon className="w-5 h-5 text-red-500 icon-glow-red" /> <span className="hidden sm:inline">Download</span>
            </button>
            <button className="action-btn action-btn-light dark:action-btn-dark btn-blue-shadow">
              <RectangleStackIcon className="w-5 h-5 text-green-500 icon-glow-green" /> <span className="hidden sm:inline">My Creations</span>
            </button>
            <button className="figma-btn-primary">
              <BeakerIcon className="w-5 h-5 icon-glow-white-ai" /> <span className="hidden sm:inline">AI Lab</span>
            </button>
            <button className="share-btn-yellow">
              <ShareIcon className="w-5 h-5 text-black dark:text-white dark:icon-glow-white" />
            </button>
        </div>
      )}
      <style>{`
        .rotated-container {
            width: 100%;
            height: 100%;
            max-width: 100%;
            max-height: 100%;
            border-radius: 0;
        }
        .rotated-wrapper {
            transform: rotate(90deg);
            width: 100vh;
            height: 100vw;
        }
        .rotated-video {
           max-width: 100vh;
           max-height: 100vw;
        }
        .action-btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 0.625rem;
            font-size: 0.875rem;
            font-weight: 600;
            border-radius: 0.5rem;
            transition: all 0.2s ease-in-out;
            border: 1px solid transparent;
        }
        @media (min-width: 640px) {
            .action-btn {
                padding: 0.625rem 1rem;
            }
        }
        .action-btn-light {
            color: #4B5563;
            background-color: #F3F4F6;
            border-color: #E5E7EB;
            box-shadow: 0 1px 1px rgba(0,0,0,0.03);
        }
        .action-btn-light:hover {
            transform: translateY(-1px);
            background-color: #fff;
            border-color: #D1D5DB;
        }
        .action-btn-dark {
            color: #D1D5DB;
            background-color: #374151;
            border-color: #4B5563;
            box-shadow: 0 1px 1px rgba(0,0,0,0.2);
        }
        .action-btn-dark:hover {
            transform: translateY(-1px);
            background-color: #4B5563;
            border-color: #6B7280;
        }
        .btn-blue-shadow:hover {
            box-shadow: 0 4px 15px -3px rgba(59, 130, 246, 0.4), 0 2px 6px -2px rgba(59, 130, 246, 0.3);
        }

        .icon-glow-orange {
            filter: drop-shadow(0 0 6px rgba(249, 115, 22, 0.8));
        }
        .icon-glow-red {
            filter: drop-shadow(0 0 6px rgba(239, 68, 68, 0.8));
        }
        .icon-glow-green {
            filter: drop-shadow(0 0 6px rgba(34, 197, 94, 0.8));
        }
        .dark .icon-glow-white {
            filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.8));
        }
        .icon-glow-white-ai {
             filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.5));
        }


        .share-btn-yellow {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 2.75rem; /* 44px */
            height: 2.75rem; /* 44px */
            border-radius: 9999px;
            background: #facc15; /* yellow-400 */
            border: 1px solid #f59e0b; /* amber-500 */
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
            transition: all 0.2s ease-in-out;
        }
        .share-btn-yellow:hover {
            transform: translateY(-2px);
            background: #fde047; /* yellow-300 */
            box-shadow: 0 10px 15px -3px rgba(250, 204, 21, 0.4), 0 4px 6px -2px rgba(250, 204, 21, 0.3);
        }

        .figma-btn-primary {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            padding: 0.625rem;
            font-size: 0.875rem;
            font-weight: 600;
            color: white;
            background-image: linear-gradient(to right, #4f46e5, #7c3aed);
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.3), 0 2px 4px -1px rgba(79, 70, 229, 0.2);
            transition: all 0.2s ease-in-out;
        }
         @media (min-width: 640px) {
            .figma-btn-primary {
                padding: 0.625rem 1rem;
            }
        }
        .figma-btn-primary:hover {
            transform: translateY(-1px);
            box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.4), 0 4px 6px -2px rgba(79, 70, 229, 0.3);
        }
      `}</style>
    </div>
  );
};

const _components = {
    PlayPauseIcon: ({ isPlaying }) => isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />,
    VolumeIcon: ({ isMuted, volume }) => isMuted || volume === 0 ? <SpeakerXMarkIcon className="w-6 h-6" /> : <SpeakerWaveIcon className="w-6 h-6" />,
};

export default VideoPreview;
