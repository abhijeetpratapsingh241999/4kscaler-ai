import React from 'react';
import UploadPlaceholder from './UploadPlaceholder';
import VideoNode from './VideoNode';
import CanvasToolbar from './CanvasToolbar';

// Props ka type define kiya gaya hai
type EditorCanvasProps = {
  videoFile: File | null;
  videoUrl: string | null;
  videoRef: React.RefObject<HTMLVideoElement>;
  onFileUpload: (file: File) => void;
  onRemoveVideo: () => void;
  onPlay?: () => void;
  onPause?: () => void;
  onZoomIn?: () => void;
  onZoomOut?: () => void;
  onExpand?: () => void;
  onDownload?: () => void;
  // Naye event handlers ke liye props
  onTogglePlayPause: () => void;
  onWheelZoom: (event: React.WheelEvent) => void;
  onPinchZoom: (delta: number) => void;
};

const EditorCanvas: React.FC<EditorCanvasProps> = (props) => {
  return (
    <div className="w-full h-full rounded-lg relative">
      {props.videoFile && props.videoUrl ? (
        <VideoNode 
          ref={props.videoRef} 
          videoUrl={props.videoUrl} 
          onTogglePlayPause={props.onTogglePlayPause}
          onWheelZoom={props.onWheelZoom}
          onPinchZoom={props.onPinchZoom}
        />
      ) : (
        <UploadPlaceholder onFileUpload={props.onFileUpload} />
      )}
      
      {/* Toolbar ko sabhi functions pass kiye ja rahe hain */}
      {props.videoFile && <CanvasToolbar {...props} />}
    </div>
  );
};

export default EditorCanvas;
