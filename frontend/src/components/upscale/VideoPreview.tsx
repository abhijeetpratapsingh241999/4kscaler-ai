import React from 'react';

type VideoPreviewProps = {
  previewUrl: string | null;
};

const VideoPreview: React.FC<VideoPreviewProps> = ({ previewUrl }) => {
  return (
    <div className="lg:w-3/5 flex items-center justify-center page-main-container p-6">
      <div className="w-full max-w-full h-auto max-h-full aspect-video bg-black preview-shadow-edge flex items-center justify-center">
        {previewUrl ? (
          <img src={previewUrl} alt="Video preview" className="w-full h-full object-contain" />
        ) : (
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
            Preview will appear here
          </p>
        )}
      </div>
    </div>
  );
};

export default VideoPreview;
