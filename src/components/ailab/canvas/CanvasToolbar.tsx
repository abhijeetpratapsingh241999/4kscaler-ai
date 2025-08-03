import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, ZoomIn, ZoomOut, Expand, Download, Trash2, GripVertical } from 'lucide-react';

// Props ka type define kiya gaya hai
type CanvasToolbarProps = {
  onPlay?: () => void;
  onPause?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onExpand?: () => void;
  onDownload?: () => void;
  onRemoveVideo: () => void;
};

const CanvasToolbar: React.FC<CanvasToolbarProps> = ({ 
  onPlay, 
  onPause, 
  onZoomIn, 
  onZoomOut, 
  onExpand, 
  onDownload, 
  onRemoveVideo 
}) => {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Toolbar ko shuruaat mein center-bottom par set karne ke liye
  useEffect(() => {
    if (toolbarRef.current && toolbarRef.current.parentElement) {
      const parent = toolbarRef.current.parentElement;
      const initialX = parent.clientWidth / 2 - toolbarRef.current.offsetWidth / 2;
      const initialY = parent.clientHeight - toolbarRef.current.offsetHeight - 16; // bottom se 16px upar
      setPosition({ x: initialX, y: initialY });
    }
  }, []);

  // Mouse drag shuru karne ke liye function
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (toolbarRef.current) {
      setIsDragging(true);
      setOffset({
        x: e.clientX - toolbarRef.current.offsetLeft,
        y: e.clientY - toolbarRef.current.offsetTop,
      });
    }
  };

  // Mouse move hone par toolbar ko move karne ke liye function
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && toolbarRef.current && toolbarRef.current.parentElement) {
      const parent = toolbarRef.current.parentElement;
      let newX = e.clientX - offset.x;
      let newY = e.clientY - offset.y;

      // Toolbar ko parent container ke andar hi rakhne ke liye
      const maxX = parent.clientWidth - toolbarRef.current.offsetWidth;
      const maxY = parent.clientHeight - toolbarRef.current.offsetHeight;

      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));
      
      setPosition({ x: newX, y: newY });
    }
  };

  // Mouse drag khatam karne ke liye function
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Event listeners ko manage karne ke liye
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, offset]);

  return (
    <div 
      ref={toolbarRef}
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        touchAction: 'none', // Touch devices ke liye zaroori
      }}
      className="z-20"
    >
      <div className="flex items-center gap-2 p-2 rounded-lg bg-white/10 dark:bg-slate-800/50 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-lg">
        {/* Drag Handle */}
        <div 
          onMouseDown={handleMouseDown}
          className="p-2 cursor-grab active:cursor-grabbing"
        >
          <GripVertical size={18} className="toolbar-icon" />
        </div>

        <div className="w-px h-6 bg-black/10 dark:bg-white/10"></div>

        <button onClick={onPlay} className="toolbar-button"><Play size={18} className="toolbar-icon" /></button>
        <button onClick={onPause} className="toolbar-button"><Pause size={18} className="toolbar-icon" /></button>
        <div className="w-px h-6 bg-black/10 dark:bg-white/10"></div>
        <button onClick={onZoomIn} className="toolbar-button"><ZoomIn size={18} className="toolbar-icon" /></button>
        <button onClick={onZoomOut} className="toolbar-button"><ZoomOut size={18} className="toolbar-icon" /></button>
        <button onClick={onExpand} className="toolbar-button"><Expand size={18} className="toolbar-icon" /></button>
        <div className="w-px h-6 bg-black/10 dark:bg-white/10"></div>
        <button onClick={onDownload} className="toolbar-button"><Download size={18} className="toolbar-icon-download" /></button>
        <button onClick={onRemoveVideo} className="toolbar-button hover:bg-red-500/20">
          <Trash2 size={18} className="toolbar-icon-trash" />
        </button>
      </div>
      <style>{`
        .toolbar-button {
          padding: 8px;
          border-radius: 6px;
          transition: all 0.2s ease;
        }
        .toolbar-button:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
        .toolbar-button:hover .toolbar-icon,
        .toolbar-button:hover .toolbar-icon-download,
        .toolbar-button:hover .toolbar-icon-trash {
            transform: scale(1.1);
        }

        /* Default icon style (white with glow) */
        .toolbar-icon {
          color: white;
          filter: drop-shadow(0 0 8px rgba(255,255,255,0.6));
          transition: transform 0.2s ease;
        }

        /* Download icon style (green with glow) */
        .toolbar-icon-download {
          color: #22c55e; /* Green */
          filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.8));
          transition: transform 0.2s ease;
        }

        /* Trash icon style (red with glow) */
        .toolbar-icon-trash {
          color: #ef4444; /* Red */
          filter: drop-shadow(0 0 8px rgba(239, 68, 68, 0.8));
          transition: transform 0.2s ease;
        }
      `}</style>
    </div>
  );
};

export default CanvasToolbar;
