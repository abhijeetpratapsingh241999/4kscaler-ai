import React, { useState, useRef, useMemo, useEffect } from 'react'; // useEffect import kiya gaya hai
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

// --- मुख्य AI Lab पेज ---
const AILabPage: React.FC = () => {
  const [snapshots, setSnapshots] = useState(demoSnapshots);
  const [activeSnapshotId, setActiveSnapshotId] = useState(1);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [scale, setScale] = useState(1); // Zoom ke liye naya state
  
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoUrl = useMemo(() => {
    if (videoFile) return URL.createObjectURL(videoFile);
    return null;
  }, [videoFile]);

  // Jab bhi scale state badle, video par transform apply karo
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.style.transition = 'transform 0.1s ease';
      videoRef.current.style.transform = `scale(${scale})`;
    }
  }, [scale]);

  const handleFileUpload = (file: File) => {
    setVideoFile(file);
    setScale(1); // Naya video aane par zoom reset karo
  };

  const handleRemoveVideo = () => {
    setVideoFile(null);
    setScale(1); // Video hatane par zoom reset karo
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

  // Naye event handlers
  const handleTogglePlayPause = () => {
    if (videoRef.current) {
      videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
    }
  };

  const handleWheelZoom = (e: React.WheelEvent) => {
    if (e.ctrlKey) { // Sirf Ctrl key dabane par zoom ho
      e.preventDefault();
      const zoomIntensity = 0.1;
      const direction = e.deltaY > 0 ? -1 : 1; // Scroll down = zoom out, scroll up = zoom in
      setScale(prev => Math.max(0.1, prev + direction * zoomIntensity));
    }
  };

  const handlePinchZoom = (delta: number) => {
    const zoomIntensity = 0.01;
    setScale(prev => Math.max(0.1, prev + delta * zoomIntensity));
  };

  return (
    <PageContainer noPadding={true} className="p-2 rounded-2xl">
      
      <div className="absolute inset-0 bg-slate-100 dark:bg-gray-900 -z-10"></div>

      <div className="relative w-full h-full backdrop-blur-3xl bg-white/20 dark:bg-slate-800/20 flex flex-col rounded-2xl border border-black/10 dark:border-2 dark:border-white/40 overflow-hidden">
        
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');
            .ai-lab-header { background-color: white; }
            .dark .ai-lab-header { background-color: transparent; }
            .ai-lab-title { font-family: 'Poppins', sans-serif; }
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          `}
        </style>

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
             <EditorCanvas 
                videoFile={videoFile}
                videoUrl={videoUrl}
                videoRef={videoRef}
                onFileUpload={handleFileUpload}
                onRemoveVideo={handleRemoveVideo}
                onPlay={handlePlay}
                onPause={handlePause}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
                onExpand={handleExpand}
                onDownload={handleDownload}
                onTogglePlayPause={handleTogglePlayPause}
                onWheelZoom={handleWheelZoom}
                onPinchZoom={handlePinchZoom}
             />
          </section>

          <aside className="w-1/4 max-w-xs border-l border-black/10 dark:border-white/20 p-2">
             <div className="h-full rounded-lg bg-white/30 dark:bg-slate-800/20">
              <TimelineGallery 
                snapshots={snapshots}
                activeSnapshotId={activeSnapshotId}
                onSelectSnapshot={setActiveSnapshotId}
              />
            </div>
          </aside>

        </main>

      </div>
    </PageContainer>
  );
};

export default AILabPage;
