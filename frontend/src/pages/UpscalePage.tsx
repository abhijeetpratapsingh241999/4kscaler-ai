import React, { useState, useRef } from 'react';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import { useApp } from '../contexts/AppContext';

const UpscalePage: React.FC = () => {
  const { isLoggedIn, setLoginPopupOpen } = useApp();
  const [prompt, setPrompt] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      generateVideoPreview(file);
    }
  };

  const generateVideoPreview = (file: File) => {
    const videoUrl = URL.createObjectURL(file);
    const video = document.createElement('video');
    
    video.addEventListener('loadedmetadata', () => {
      video.currentTime = Math.min(1, video.duration / 2);
    });

    video.addEventListener('seeked', () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          setPreviewUrl(canvas.toDataURL());
          URL.revokeObjectURL(videoUrl);
        }
      }
    });

    video.src = videoUrl;
    video.load();
  };

  const handleGeminiEnhance = () => {
    setIsEnhancing(true);
    setTimeout(() => {
      setPrompt(prev => `${prev} cinematic lighting, 4k, high detail`);
      setIsEnhancing(false);
    }, 2000);
  };

  const handleUpscale = () => {
    if (!isLoggedIn) {
      setLoginPopupOpen(true);
    } else {
      alert('Upscaling started! (This is a demo)');
    }
  };
  
  const handleDragEvents = (e: React.DragEvent<HTMLDivElement>, isOver: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(isOver);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    handleDragEvents(e, false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('video/')) {
      generateVideoPreview(file);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-full">
      <canvas ref={canvasRef} className="hidden"></canvas>
      {/* Left Panel: Controls */}
      <div className="lg:w-2/5 flex-shrink-0 page-main-container p-6 flex flex-col">
        <h1 className="text-2xl font-bold flex-shrink-0 mb-4">Upscale Controls</h1>
        <div className="flex-grow overflow-y-auto no-scrollbar pr-2 space-y-4">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="video/*" 
            className="hidden" 
          />
          <div 
            className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition flex items-center justify-center gap-4 ${dragOver ? 'border-primary-color bg-blue-500/20' : 'border-primary-color/50 bg-blue-500/5 dark:bg-blue-500/10 hover:bg-blue-500/10 dark:hover:bg-blue-500/20'}`}
            onClick={() => fileInputRef.current?.click()}
            onDragEnter={(e) => handleDragEvents(e, true)}
            onDragOver={(e) => handleDragEvents(e, true)}
            onDragLeave={(e) => handleDragEvents(e, false)}
            onDrop={handleDrop}
            role="button"
          >
            <div className="w-12 h-12 rounded-full glass-effect flex items-center justify-center shadow-lg shadow-blue-500/20">
              <CloudArrowUpIcon className="w-7 h-7 text-primary-color" />
            </div>
            <div>
              <p className="font-semibold text-sm">Drag & drop or click to upload</p>
              <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Max 1GB</p>
            </div>
          </div>
          
          <div className="relative">
            <label htmlFor="prompt" className="block text-sm font-medium mb-2">Prompt:</label>
            <textarea 
              id="prompt" 
              rows={3} 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full p-3 pr-24 bg-background-light dark:bg-background-dark border border-black/10 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-primary-color outline-none" 
              placeholder="e.g., 'make video clear'"
            />
            <button onClick={handleGeminiEnhance} disabled={isEnhancing} className="absolute right-2 bottom-2 bg-gradient-to-br from-violet-500 to-purple-600 text-white px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 hover:from-violet-600 hover:to-purple-700 transition-all disabled:opacity-50">
              {isEnhancing ? <div className="gemini-btn-loader"></div> : <span>✨ Enhance</span>}
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="duration" className="block text-sm font-medium mb-2">Duration:</label>
              <select id="duration" className="w-full p-3 bg-background-light dark:bg-background-dark border border-black/10 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-primary-color outline-none">
                <option>10s (Free)</option><option>1 min</option><option>2 min</option><option>5 min</option>
              </select>
            </div>
            <div>
              <label htmlFor="resolution" className="block text-sm font-medium mb-2">Resolution:</label>
              <select id="resolution" className="w-full p-3 bg-background-light dark:bg-background-dark border border-black/10 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-primary-color outline-none">
                <option>1080p</option><option>2K</option><option>4K</option><option>8K</option>
              </select>
            </div>
          </div>
        </div>
        <button onClick={handleUpscale} className="w-full text-white font-bold py-3 px-6 rounded-lg text-lg bubble-button flex-shrink-0 mt-4">
          Upscale Now
        </button>
      </div>
      
      {/* Right Panel: Preview */}
      <div className="lg:w-3/5 flex items-center justify-center page-main-container p-6">
        <div className="w-full max-w-full h-auto max-h-full aspect-video bg-black preview-shadow-edge flex items-center justify-center">
          {previewUrl ? (
            <img src={previewUrl} alt="Video preview" className="w-full h-full object-contain" />
          ) : (
            <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">Preview will appear here</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpscalePage;
