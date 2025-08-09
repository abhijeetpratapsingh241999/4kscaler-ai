// src/components/explore/ui/BeforeAfterSlider.tsx

import React, { useState, useRef, useEffect } from 'react';

type Props = {
    before: string; // Before image URL
    after: string;  // After image URL
    alt: string;
    originalVideoUrl?: string; // Original video URL (optional)
    enhancedVideoUrl?: string; // Enhanced video URL (optional)
};

/**
 * Video thumbnail par "Before" aur "After" effect dikhane wala slider.
 * Ab yeh images ke bajaye videos bhi play kar sakta hai hover/touch par.
 */
const BeforeAfterSlider: React.FC<Props> = ({ 
    before, 
    after, 
    alt, 
    originalVideoUrl, 
    enhancedVideoUrl 
}) => {
    const [sliderValue, setSliderValue] = useState(50);
    const [isHovered, setIsHovered] = useState(false); // Hover state
    const containerRef = useRef<HTMLDivElement>(null);
    const beforeVideoRef = useRef<HTMLVideoElement>(null);
    const afterVideoRef = useRef<HTMLVideoElement>(null);

    // Check karein ki video URLs available hain ya nahi
    const hasVideos = originalVideoUrl && enhancedVideoUrl;

    const handleMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const x = clientX - rect.left;
        const width = rect.width;
        const percentage = (x / width) * 100;
        
        if (percentage > 0 && percentage < 100) {
            setSliderValue(percentage);
        }
    };

    // Video playback control
    useEffect(() => {
        if (!hasVideos) return;

        const playVideos = () => {
            if (beforeVideoRef.current) beforeVideoRef.current.play().catch(e => console.error("Error playing before video:", e));
            if (afterVideoRef.current) afterVideoRef.current.play().catch(e => console.error("Error playing after video:", e));
        };

        const pauseVideos = () => {
            if (beforeVideoRef.current) beforeVideoRef.current.pause();
            if (afterVideoRef.current) afterVideoRef.current.pause();
        };

        if (isHovered) {
            playVideos();
        } else {
            pauseVideos();
            // Reset video to start when not hovered
            if (beforeVideoRef.current) beforeVideoRef.current.currentTime = 0;
            if (afterVideoRef.current) afterVideoRef.current.currentTime = 0;
        }
    }, [isHovered, hasVideos]);

    return (
        <div 
            ref={containerRef}
            className="relative w-full aspect-video rounded-lg overflow-hidden cursor-e-resize group"
            onMouseMove={handleMove}
            onTouchMove={handleMove}
            onMouseEnter={() => setIsHovered(true)} // Hover par video play karein
            onMouseLeave={() => setIsHovered(false)} // Hover hatne par video pause karein
            onTouchStart={() => setIsHovered(true)} // Touch par video play karein
            onTouchEnd={() => setIsHovered(false)} // Touch hatne par video pause karein
        >
            {/* After part: Video ya Image */}
            {hasVideos && isHovered ? (
                <video 
                    ref={afterVideoRef}
                    src={enhancedVideoUrl} 
                    loop 
                    muted 
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover select-none" 
                />
            ) : (
                <img src={after} alt={alt} className="absolute inset-0 w-full h-full object-cover select-none" />
            )}

            {/* Before part: Video ya Image */}
            <div 
                className="absolute inset-0 w-full h-full object-cover select-none"
                style={{ 
                    clipPath: `inset(0 ${100 - sliderValue}% 0 0)` 
                }}
            >
                {hasVideos && isHovered ? (
                    <video 
                        ref={beforeVideoRef}
                        src={originalVideoUrl} 
                        loop 
                        muted 
                        playsInline 
                        className="w-full h-full object-cover" 
                    />
                ) : (
                    <img src={before} alt={alt} className="w-full h-full object-cover" />
                )}
            </div>
            <div 
                className="absolute top-0 bottom-0 bg-white w-0.5 cursor-ew-resize"
                style={{ left: `calc(${sliderValue}% - 1px)` }}
            >
                <div className="bg-white rounded-full h-8 w-8 absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 9l4-4 4 4m0 6l-4 4-4-4"></path></svg>
                </div>
            </div>
            <div className="absolute top-2 left-2 flex gap-2">
                <span className="bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">BEFORE</span>
            </div>
             <div className="absolute top-2 right-2 flex gap-2">
                <span className="bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">AFTER</span>
            </div>
        </div>
    );
};

export default BeforeAfterSlider;