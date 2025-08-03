import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloudIcon } from 'lucide-react';

type UploadPlaceholderProps = {
  onFileUpload: (file: File) => void;
};

const UploadPlaceholder: React.FC<UploadPlaceholderProps> = ({ onFileUpload }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      onFileUpload(acceptedFiles[0]);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'video/*': ['.mp4', '.mov', '.webm'] },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`w-full h-full rounded-lg border-2 border-dashed border-black/20 dark:border-white/20 flex flex-col items-center justify-center text-center p-4 cursor-pointer transition-all duration-300
        ${isDragActive ? 'bg-blue-500/20 border-blue-400' : 'bg-transparent'}`
      }
    >
      <input {...getInputProps()} />
      <UploadCloudIcon className="w-16 h-16 text-slate-400 dark:text-slate-500 mb-4" />
      <h3 className="font-bold text-lg text-text-main-light dark:text-text-main-dark">
        Drag & Drop Your Video Here
      </h3>
      <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">
        or click to browse files
      </p>
    </div>
  );
};

export default UploadPlaceholder;
