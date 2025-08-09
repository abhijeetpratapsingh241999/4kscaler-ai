import React, { useState, useEffect } from 'react';
import UpscaleControls from '../components/upscale/UpscaleControls';
import VideoPreview from '../components/upscale/VideoPreview';

const UpscalePage: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // File select hone par seedhe video ka URL set karo
  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('video/')) {
      // Pehle wale URL ko memory se hatao agar woh मौजूद hai
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      // Naya URL banakar state me set karo
      const videoUrl = URL.createObjectURL(file);
      setPreviewUrl(videoUrl);
    }
  };

  // Component unmount hone par URL ko memory se saaf karo
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 h-full">
      {/* Canvas ki ab zaroorat nahi hai */}
      <UpscaleControls onFileSelect={handleFileSelect} />
      <VideoPreview previewUrl={previewUrl} />
    </div>
  );
};

export default UpscalePage;
