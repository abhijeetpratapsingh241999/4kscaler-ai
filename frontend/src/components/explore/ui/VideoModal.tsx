// src/components/explore/ui/VideoModal.tsx

import React, { useState, useRef, useEffect } from 'react';
import { VideoCardData } from '../types/explore';

type Props = {
    videoData: VideoCardData;
    onClose: () => void;
};

const VideoModal: React.FC<Props> = ({ videoData, onClose }) => {
    const [showCloseButton, setShowCloseButton] = useState(true);
    const [isMobileDevice, setIsMobileDevice] = useState(false);
    const [isRotatedFullscreen, setIsRotatedFullscreen] = useState(false); // Video rotation aur fullscreen state
    const videoRef = useRef<HTMLVideoElement>(null);
    const modalContentRef = useRef<HTMLDivElement>(null);

    const handleContentClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    useEffect(() => {
        // Mobile device detect karein (lg breakpoint se kam)
        const checkMobile = () => {
            setIsMobileDevice(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        const videoElement = videoRef.current;
        if (!videoElement) return;

        const handlePlay = () => setShowCloseButton(false);
        const handlePause = () => setShowCloseButton(true);
        const handleEnded = () => setShowCloseButton(true);

        videoElement.addEventListener('play', handlePlay);
        videoElement.addEventListener('pause', handlePause);
        videoElement.addEventListener('ended', handleEnded);

        return () => {
            window.removeEventListener('resize', checkMobile);
            videoElement.removeEventListener('play', handlePlay);
            videoElement.removeEventListener('pause', handlePause);
            videoElement.removeEventListener('ended', handleEnded);
        };
    }, []);

    const handleMouseEnter = () => setShowCloseButton(true);
    const handleMouseLeave = () => {
        if (videoRef.current && !videoRef.current.paused && !videoRef.current.ended) {
            setShowCloseButton(false);
        }
    };

    const toggleVideoRotation = () => {
        setIsRotatedFullscreen(prev => !prev);
        // Optional: Agar video chal raha hai to use pause kar sakte hain rotation se pehle
        if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm"
            onClick={onClose}
        >
            <div 
                ref={modalContentRef}
                className={`
                    bg-[#1C2135] relative animate-fade-in-up overflow-hidden
                    ${isRotatedFullscreen 
                        ? 'w-screen h-screen rounded-none' // Full screen aur no rounded corners
                        : 'w-11/12 max-w-4xl rounded-lg' // Original modal size aur rounded corners
                    }
                `}
                onClick={handleContentClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleMouseEnter}
                onTouchEnd={handleMouseLeave}
            >
                {showCloseButton && (
                    <button 
                        onClick={onClose}
                        className="absolute top-2 right-2 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold z-10" 
                    >
                        &times;
                    </button>
                )}
                {isMobileDevice && ( // Rotation icon sirf mobile par dikhega
                    <button
                        onClick={toggleVideoRotation}
                        className="absolute top-2 left-2 bg-white text-black rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold z-10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004 16.001V12m6.257-3.007a9.99 9.99 0 011.912-2.706M15 9.75a3 3 0 11-6 0 3 3 0 016 0zm6 0a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </button>
                )}
                
                <div className="aspect-video w-full bg-black rounded-t-lg">
                    <video
                        ref={videoRef}
                        width="100%"
                        height="100%"
                        controls
                        autoPlay
                        src={videoData.videoUrl}
                        className={`
                            rounded-t-lg object-contain
                            ${isRotatedFullscreen ? 'video-rotated-fullscreen' : ''}
                        `} 
                    >
                        Aapka browser video tag ko support nahi karta.
                    </video>
                </div>

                {!isRotatedFullscreen && ( // Title section sirf portrait mode mein dikhega
                    <div className="mt-4 px-4 pb-4 text-white"> 
                        <h2 className="text-2xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>{videoData.title}</h2>
                        <p className="text-gray-400 mt-1">Category: {videoData.category}</p>
                    </div>
                )}
            </div>
            <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.3s ease-out forwards;
                }

                /* Video ko 90 degree rotate karke poori screen par phailane ke liye */
                .video-rotated-fullscreen {
                    position: absolute; /* Parent ke relative position karein */
                    top: 50%;
                    left: 50%;
                    width: 100vh; /* Nayi width viewport height ke barabar */
                    height: 100vw; /* Nayi height viewport width ke barabar */
                    transform: translate(-50%, -50%) rotate(90deg); /* Center aur rotate karein */
                    transform-origin: center center;
                    object-fit: contain; /* Video ko contain karein taaki cut na ho */
                    /* Transition for smooth rotation */
                    transition: transform 0.3s ease-in-out, width 0.3s ease-in-out, height 0.3s ease-in-out;
                }
            `}</style>
        </div>
    );
};

export default VideoModal;