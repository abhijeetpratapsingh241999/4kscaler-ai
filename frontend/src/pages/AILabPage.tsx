import React, { useState, useRef, useMemo, useEffect, useLayoutEffect } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { BeakerIcon } from '@heroicons/react/24/solid';

// Sabhi components ko import kiya gaya hai
import AICopilotInput from '../components/ailab/promptengine/AICopilotInput';
import MoodSelector from '../components/ailab/promptengine/MoodSelector';
import ColorPalette from '../components/ailab/promptengine/ColorPalette';
import MagicModifiers from '../components/ailab/promptengine/MagicModifiers';
import AdvancedFeature from '../components/ailab/promptengine/AdvancedFeature';
import TimelineGallery from '../components/ailab/timelinegallery/TimelineGallery';
import EditorCanvas from '../components/ailab/canvas/EditorCanvas';

// Demo data for the snapshots
const demoSnapshots = [
  { id: 1, prompt: "Initial state of the image", imageUrl: "https://placehold.co/100x100/0a1016/ffffff?text=Initial" },
  { id: 2, prompt: "Cinematic color grade, teal and orange, high contrast", imageUrl: "https://placehold.co/100x100/f97316/0891b2?text=Graded" },
  { id: 3, prompt: "Upscaled to 4K resolution", imageUrl: "https://placehold.co/100x100/22c55e/ffffff?text=4K" },
  { id: 4, prompt: "Added film grain and vignette", imageUrl: "https://placehold.co/100x100/475569/e2e8f0?text=Grain" },
];

// --- Naya Mobile View Component (Rotational Layout ke saath) ---
const MobileView = ({ commonProps }) => {
    const [isRotated, setIsRotated] = useState(false);
    const [isTimelineHidden, setIsTimelineHidden] = useState(false);
    const [isPromptHidden, setIsPromptHidden] = useState(false);
    const sectionRef = useRef(null);
    const [dynamicScale, setDynamicScale] = useState(1);

    const handleToggleRotation = () => {
        setIsRotated(!isRotated);
        // Rotation badalne par visibility reset karein
        setIsTimelineHidden(false);
        setIsPromptHidden(false);
    };

    const handleToggleTimeline = (e) => {
        e.stopPropagation();
        if (isRotated) setIsTimelineHidden(!isTimelineHidden);
    };

    const handleTogglePrompt = (e) => {
        e.stopPropagation();
        if (isRotated) setIsPromptHidden(!isPromptHidden);
    };

    // Conditional classes ke liye helper
    const canvasFlexBasis = isTimelineHidden && isPromptHidden ? '100%' : isTimelineHidden ? '88%' : '70%';
    const timelineFlexBasis = isPromptHidden ? '30%' : '18%';
    
    useLayoutEffect(() => {
        if (isRotated && sectionRef.current) {
            // We need a small delay for the flex-basis transition to complete
            setTimeout(() => {
                if (sectionRef.current) {
                    const { clientWidth, clientHeight } = sectionRef.current;
                    if (clientWidth > 0 && clientHeight > 0) {
                        // Calculate the scale needed for the rotated element to cover the container
                        const scale = Math.max(clientHeight / clientWidth, clientWidth / clientHeight) * 1.05; // Added a small buffer
                        setDynamicScale(scale);
                    }
                }
            }, 350); // Corresponds to the transition duration
        }
    }, [isRotated, isTimelineHidden, isPromptHidden]);


    return (
        <div className="flex flex-col w-full h-full bg-black relative">
            {/* Header sirf vertical mode me dikhega */}
            {!isRotated && (
                <header className="p-3 flex items-center justify-between gap-3 flex-shrink-0 bg-[#252525]">
                    <div className="flex items-center gap-3">
                        <BeakerIcon className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
                        <h1 className="text-xl font-bold text-white">AI Lab</h1>
                    </div>
                    <button onClick={handleToggleRotation} className="text-gray-400">
                        <i className="fa-solid fa-rotate text-xl"></i>
                    </button>
                </header>
            )}

            {/* Horizontal mode ke liye alag se control jo hamesha top-right me rahega */}
            {isRotated && (
                 <div className="absolute top-3 right-3 z-30 flex flex-col items-center">
                    <button onClick={handleToggleRotation} className="text-gray-400 p-2">
                        <i className="fa-solid fa-rotate fa-flip-horizontal text-xl"></i>
                    </button>
                    <div className="text-xs font-bold text-white mt-1" style={{ transform: 'rotate(90deg)' }}>AI Lab</div>
                </div>
            )}

            {/* Main container jo hamesha column me rahega */}
            <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
                {/* Canvas Section */}
                <section
                    ref={sectionRef}
                    className={`bg-black flex justify-center items-center relative overflow-hidden transition-all duration-300`}
                    style={{ flexBasis: isRotated ? (isTimelineHidden ? canvasFlexBasis : '70%') : '70%' }}
                >
                    <div 
                        className={`w-full h-full flex justify-center items-center`}
                        style={{
                            transform: isRotated ? `rotate(90deg) scale(${dynamicScale})` : 'none',
                            transition: 'transform 0.4s ease'
                        }}
                    >
                         <EditorCanvas {...commonProps.editorCanvasProps} isRotated={isRotated} />
                    </div>
                    {isRotated && (
                        <>
                            {/* Timeline Toggle Button */}
                            <button onClick={handleToggleTimeline} className="absolute bottom-4 right-4 z-20 bg-black/50 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center">
                                <i className="fa-solid fa-images"></i>
                            </button>
                        </>
                    )}
                </section>

                {/* Timeline Gallery Section */}
                <section
                    className={`bg-[#1e1e1e] flex items-center p-2 overflow-x-auto no-scrollbar relative transition-all duration-300 ${isRotated && isTimelineHidden ? 'hidden' : 'flex'}`}
                    style={{ flexBasis: isRotated ? (isPromptHidden ? timelineFlexBasis : '18%') : '18%' }}
                >
                    <div className="flex items-center h-full w-full">
                        {commonProps.timelineProps.snapshots.map(snap => (
                            <div key={snap.id} className={`flex-shrink-0 w-36 h-[90%] bg-gray-600 rounded-lg mr-3 transition-transform duration-500 ${isRotated ? 'rotate-90 mx-8' : ''}`}>
                                <img src={snap.imageUrl} alt={snap.prompt} className="w-full h-full object-cover rounded-lg" />
                            </div>
                        ))}
                    </div>
                     {/* Prompt Toggle Button - Corrected Position */}
                     {isRotated && !isTimelineHidden && (
                        <button onClick={handleTogglePrompt} className="absolute top-4 right-4 z-20 bg-black/50 text-white p-2 rounded-full w-10 h-10 flex items-center justify-center">
                           <i className="fa-solid fa-wand-magic-sparkles"></i>
                        </button>
                    )}
                </section>

                {/* Prompt Engine Section */}
                <section
                    className={`bg-[#252525] flex items-center p-2 overflow-x-auto no-scrollbar transition-all duration-300 ${isRotated && isPromptHidden ? 'hidden' : 'flex'}`}
                    style={{ flexBasis: '12%' }}
                >
                     <div className={`flex-shrink-0 transition-transform duration-500 ${isRotated ? 'rotate-90 mx-6' : 'mr-2'}`}><AICopilotInput /></div>
                     <div className={`flex-shrink-0 transition-transform duration-500 ${isRotated ? 'rotate-90 mx-6' : 'mr-2'}`}><MoodSelector /></div>
                     <div className={`flex-shrink-0 transition-transform duration-500 ${isRotated ? 'rotate-90 mx-6' : 'mr-2'}`}><ColorPalette /></div>
                     <div className={`flex-shrink-0 transition-transform duration-500 ${isRotated ? 'rotate-90 mx-6' : 'mr-2'}`}><MagicModifiers /></div>
                     <div className={`flex-shrink-0 transition-transform duration-500 ${isRotated ? 'rotate-90 mx-6' : 'mr-2'}`}><AdvancedFeature /></div>
                </section>
            </main>
        </div>
    );
};


// --- Aapka Original Desktop View Component ---
const DesktopView = ({ editorCanvasProps, timelineProps }) => (
  <>
    <header className="p-3 flex items-center gap-3 border-b border-black/10 dark:border-white/20 flex-shrink-0 ai-lab-header rounded-t-2xl">
      <BeakerIcon className="w-8 h-8 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.7)]" />
      <div>
        <h1 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark ai-lab-title">
          AI Lab
        </h1>
      </div>
    </header>
    <main className="flex-1 flex min-h-0">
      <aside className="w-1/4 max-w-xs border-r border-black/10 dark:border-white/20 p-2">
        <div className="h-full rounded-lg bg-white/30 dark:bg-slate-800/20 flex flex-col p-2 space-y-2 overflow-y-auto no-scrollbar">
          <AICopilotInput />
          <MoodSelector />
          <ColorPalette />
          <MagicModifiers />
          <AdvancedFeature />
        </div>
      </aside>
      <section className="flex-1 p-2">
         <EditorCanvas {...editorCanvasProps} />
      </section>
      <aside className="w-1/4 max-w-xs border-l border-black/10 dark:border-white/20 p-2">
         <div className="h-full rounded-lg bg-white/30 dark:bg-slate-800/20">
          <TimelineGallery {...timelineProps} />
        </div>
      </aside>
    </main>
  </>
);


// --- मुख्य AI Lab पेज ---
const AILabPage: React.FC = () => {
  const [snapshots, setSnapshots] = useState(demoSnapshots);
  const [activeSnapshotId, setActiveSnapshotId] = useState(1);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [scale, setScale] = useState(1);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoUrl = useMemo(() => {
    if (videoFile) return URL.createObjectURL(videoFile);
    return null;
  }, [videoFile]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.style.transition = 'transform 0.1s ease';
      videoRef.current.style.transform = `scale(${scale})`;
    }
  }, [scale]);

  const handleFileUpload = (file: File) => {
    setVideoFile(file);
    setScale(1);
  };

  const handleRemoveVideo = () => {
    setVideoFile(null);
    setScale(1);
  };

  const handlePlay = () => videoRef.current?.play();
  const handlePause = () => videoRef.current?.pause();
  const handleZoomIn = () => setScale(prev => prev + 0.1);
  const handleZoomOut = () => setScale(prev => Math.max(0.1, prev - 0.1));
  const handleExpand = () => videoRef.current?.requestFullscreen();
  
  const handleDownload = () => {
    if (videoFile) {
      const url = URL.createObjectURL(videoFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = `enhanced-${videoFile.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      console.log('No video file to download.');
    }
  };

  const handleTogglePlayPause = () => {
    if (videoRef.current) {
      videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
    }
  };

  const handleWheelZoom = (e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault();
      const zoomIntensity = 0.1;
      const direction = e.deltaY > 0 ? -1 : 1;
      setScale(prev => Math.max(0.1, prev + direction * zoomIntensity));
    }
  };

  const handlePinchZoom = (delta: number) => {
    const zoomIntensity = 0.01;
    setScale(prev => Math.max(0.1, prev + delta * zoomIntensity));
  };

  const commonProps = {
    editorCanvasProps: {
      videoFile,
      videoUrl,
      videoRef,
      onFileUpload: handleFileUpload,
      onRemoveVideo: handleRemoveVideo,
      onPlay: handlePlay,
      onPause: handlePause,
      onZoomIn: handleZoomIn,
      onZoomOut: handleZoomOut,
      onExpand: handleExpand,
      onDownload: handleDownload,
      onTogglePlayPause: handleTogglePlayPause,
      onWheelZoom: handleWheelZoom,
      onPinchZoom: handlePinchZoom,
    },
    timelineProps: {
      snapshots,
      activeSnapshotId,
      onSelectSnapshot: setActiveSnapshotId,
    },
  };

  return (
    <PageContainer noPadding={true} className="p-2 rounded-2xl">
      
      <div className="absolute inset-0 bg-slate-100 dark:bg-gray-900 -z-10"></div>

      <div className="relative w-full h-full backdrop-blur-3xl bg-white/20 dark:bg-slate-800/20 flex flex-col rounded-2xl border border-black/10 dark:border-2 dark:border-white/40 overflow-hidden">
        
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');
            @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css');
            .ai-lab-header { background-color: white; }
            .dark .ai-lab-header { background-color: transparent; }
            .ai-lab-title { font-family: 'Poppins', sans-serif; }
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}
        </style>
        
        {/* Desktop View (badi screen par dikhega) */}
        <div className="hidden lg:flex lg:flex-col w-full h-full">
            <DesktopView 
                editorCanvasProps={commonProps.editorCanvasProps} 
                timelineProps={commonProps.timelineProps} 
            />
        </div>

        {/* Mobile View (chhoti screen par dikhega) */}
        <div className="flex flex-col w-full h-full lg:hidden">
            <MobileView commonProps={commonProps} />
        </div>

      </div>
    </PageContainer>
  );
};

export default AILabPage;
