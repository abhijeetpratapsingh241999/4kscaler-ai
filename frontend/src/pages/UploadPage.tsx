import React, { useState, useRef, useEffect } from 'react';
import PageContainer from '../components/layout/PageContainer';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';

// TypeScript Types
type CloudService = { name: string; icon: React.ReactNode; };
type Upload = { name: string; size: string; date: string; status: 'Completed' | 'Processing'; };

// Placeholder data
const cloudServices: CloudService[] = [
  { name: 'Google Drive', icon: <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><path fill="#3777e3" d="M178.6 88H256l-38.1 66.1-39.3-66.1z"></path><path fill="#ffcf63" d="M88.1 224L128 154l38.6 67.4c2.5 4.4 8.7 5.8 13.1 3.3 4.4-2.5 5.8-8.7 3.3-13.1L128.8 88.5 88.1 224z"></path><path fill="#11a861" d="M0 154.1l38.2-66.1h79.6L77.4 154 0 154.1z"></path></svg> },
  { name: 'Dropbox', icon: <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#0061FE" d="M12 4.5l-4.5 3L3 10.5l4.5 3 4.5-3 4.5 3 4.5-3-4.5-3-4.5-3zm0 6l-4.5 3 4.5 3 4.5-3-4.5-3zm-4.5 6l4.5 3 4.5-3-4.5-3-4.5 3z"></path></svg> },
];

const recentUploads: Upload[] = [
  { name: 'project_alpha_final_render_v2.mp4', size: '1.2 GB', date: 'July 28, 2025', status: 'Completed' },
  { name: 'beach_sunset_raw_footage.mov', size: '750 MB', date: 'July 27, 2025', status: 'Processing' },
];

// File upload progress ke liye ek alag component
const UploadProgressItem: React.FC<{ file: File; onComplete: () => void }> = ({ file, onComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(onComplete, 1000); // Dikhane ke liye thoda delay
                    return 100;
                }
                return prev + 5;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [onComplete]);

    const circumference = 2 * Math.PI * 42;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="storage-list-item flex-col justify-center text-center p-6 bg-background-light dark:bg-container-dark/50 rounded-lg">
            <div className="relative w-24 h-24 mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle className="text-gray-200 dark:text-gray-700/50" strokeWidth="8" stroke="currentColor" fill="transparent" r="42" cx="50" cy="50" />
                    <circle className="progress-ring__circle text-primary-color" strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" stroke="currentColor" fill="transparent" r="42" cx="50" cy="50" style={{transform: 'rotate(-90deg)', transformOrigin: '50% 50%'}} />
                </svg>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-bold">{progress}%</span>
            </div>
            <p className="font-semibold truncate w-full max-w-xs">{file.name}</p>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{progress < 100 ? 'Uploading...' : 'Processing...'}</p>
        </div>
    );
};


const UploadPage: React.FC = () => {
    const [dragOver, setDragOver] = useState(false);
    const [uploadingFile, setUploadingFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (file: File | null) => {
        if (file) {
            setUploadingFile(file);
        }
    };

    const handleDragEvents = (e: React.DragEvent<HTMLDivElement>, isOver: boolean) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(isOver);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        handleDragEvents(e, false);
        const file = e.dataTransfer.files[0];
        handleFileSelect(file);
    };

    return (
        <PageContainer>
            <div className="text-center mb-8">
                <h1 className="text-4xl lg:text-5xl font-bold text-text-main-light dark:text-text-main-dark mb-3">Cloud Storage Hub</h1>
                <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">Connect your cloud services or upload assets directly to our secure storage.</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
                <div 
                    className={`upload-card-metallic p-8 flex flex-col items-center justify-center text-center rounded-lg transition-all duration-300 ${dragOver ? 'border-primary-color' : ''}`}
                    onDragEnter={(e) => handleDragEvents(e, true)}
                    onDragOver={(e) => handleDragEvents(e, true)}
                    onDragLeave={(e) => handleDragEvents(e, false)}
                    onDrop={handleDrop}
                >
                    <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-white/20 dark:border-white/10 rounded-lg p-8 cursor-pointer hover:border-white/50 dark:hover:border-white/20" onClick={() => fileInputRef.current?.click()}>
                        <ArrowUpTrayIcon className="w-16 h-16 text-white/80 mb-4 drop-shadow-lg icon-glow upload-box-content-glow" />
                        <h3 className="text-xl font-semibold text-white/90 upload-box-content-glow">Upload Directly</h3>
                        <p className="text-white/60 mt-2 upload-box-content-glow">Drag & drop files here or click to browse.</p>
                        <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => handleFileSelect(e.target.files?.[0] || null)} />
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-semibold mb-4">Connect Your Cloud</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {cloudServices.map(service => (
                            <div key={service.name} className="cloud-service-card">
                                <div className="flex items-center gap-4">{service.icon}<span className="font-semibold">{service.name}</span></div>
                                <button className="connect-cloud-btn" onClick={() => alert(`Connecting to ${service.name}...`)}>Connect</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-4">Recent Uploads</h2>
                <div className="space-y-2">
                    {uploadingFile && <UploadProgressItem file={uploadingFile} onComplete={() => setUploadingFile(null)} />}
                    
                    {!uploadingFile && recentUploads.map((upload, index) => (
                        <div key={index} className="storage-list-item">
                            <span className="font-medium truncate flex-1 min-w-[150px]">{upload.name}</span>
                            <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{upload.size}</span>
                            <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark hidden md:block">{upload.date}</span>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${upload.status === 'Completed' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>{upload.status}</span>
                        </div>
                    ))}
                </div>
            </div>
        </PageContainer>
    );
};

export default UploadPage;
