// frontend/src/components/ui/UploadProgressItem.tsx

import React, { useEffect } from 'react';

interface UploadProgressItemProps {
  filename: string; // अपलोड की जा रही फ़ाइल का नाम
  progress: number; // अपलोड की प्रगति (0-100)
  status: string; // वर्तमान स्थिति (e.g., "Uploading...", "Processing...")
}

/**
 * UploadProgressItem कॉम्पोनेन्ट एक व्यक्तिगत फ़ाइल अपलोड प्रगति आइटम को प्रदर्शित करता है।
 * इसमें एक गोलाकार प्रगति रिंग, प्रतिशत, फ़ाइल नाम और स्थिति शामिल है।
 */
const UploadProgressItem: React.FC<UploadProgressItemProps> = ({ filename, progress, status }) => {
  const circleRef = React.useRef<SVGCircleElement>(null);

  useEffect(() => {
    const circle = circleRef.current;
    if (circle) {
      const radius = circle.r.baseVal.value;
      const circumference = radius * 2 * Math.PI;
      circle.style.strokeDasharray = `${circumference} ${circumference}`;

      // प्रगति के आधार पर डैशऑफ़सेट अपडेट करें
      const offset = circumference - (progress / 100) * circumference;
      circle.style.strokeDashoffset = String(offset); // String में कनवर्ट करें
    }
  }, [progress]); // प्रगति बदलने पर अपडेट करें

  return (
    <div id="upload-progress-item" className="storage-list-item flex-col justify-center text-center p-6">
      <div className="relative w-24 h-24 mb-4">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle className="text-gray-200 dark:text-gray-700/50" strokeWidth="8" stroke="currentColor" fill="transparent" r="42" cx="50" cy="50" />
          <circle
            ref={circleRef}
            className="progress-ring__circle text-primary-color"
            strokeWidth="8"
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="42"
            cx="50"
            cy="50"
          />
        </svg>
        {/* ब्लिंकिंग इंडिकेटर केवल 'Processing' स्थिति में दिखेगा */}
        {status === "Processing..." && (
          <div className="blinking-indicator"></div>
        )}
        <span id="progress-percentage" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold">
          {progress}%
        </span>
      </div>
      <p className="font-semibold" id="upload-filename">{filename}</p>
      <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark" id="upload-status-text">{status}</p>
    </div>
  );
};

export default UploadProgressItem;
