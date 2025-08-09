// src/components/explore/utils/api.ts

import { VideoCardData } from '../types/explore';

const sampleVideoUrl = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
// Ab originalVideoUrl bhi sampleVideoUrl hi hoga, taaki 'before' aur 'after' ek hi video ke versions hon.

// Sample data jismein naya 8K card add kiya gaya hai
const mockApiData: VideoCardData[] = [
    { 
        id: 1, 
        title: "4K UPSCALE", 
        category: "4K", 
        tags: ["UHD"], 
        featuresUsed: ["FPS Boost", "+ Enhance"], 
        beforeImageUrl: "https://placehold.co/600x400/2d3748/ffffff?text=Before", 
        afterImageUrl: "https://images.unsplash.com/photo-15344476T77768-be436a0976f2?q=80&w=2070&auto=format&fit=crop", 
        videoUrl: sampleVideoUrl, 
        originalVideoUrl: sampleVideoUrl, // Ab original aur enhanced ke liye ek hi video URL use kiya gaya hai
        createdAt: Date.now() - 100000, 
        popularity: 85 
    },
    { 
        id: 2, 
        title: "AI Face Enhance", 
        category: "Face Enhancement", 
        tags: ["AI"], 
        featuresUsed: ["Face Model v2", "Clarity"], 
        beforeImageUrl: "https://placehold.co/600x400/2c5282/ffffff?text=Before", 
        afterImageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop", 
        videoUrl: sampleVideoUrl, 
        originalVideoUrl: sampleVideoUrl, // Ab original aur enhanced ke liye ek hi video URL use kiya gaya hai
        createdAt: Date.now() - 500000, 
        popularity: 95 
    },
    { 
        id: 3, 
        title: "Cinematic Grading", 
        category: "Color Grading", 
        tags: ["HDR"], 
        featuresUsed: ["Remix", "Enhance"], 
        beforeImageUrl: "https://placehold.co/600x400/805ad5/ffffff?text=Before", 
        afterImageUrl: "https://images.unsplash.com/photo-1558362032-059b04873c5d?q=80&w=2070&auto=format&fit=crop", 
        videoUrl: sampleVideoUrl, 
        originalVideoUrl: sampleVideoUrl, // Ab original aur enhanced ke liye ek ही video URL use kiya gaya hai
        createdAt: Date.now() - 200000, 
        popularity: 92 
    },
    { 
        id: 4, 
        "title": "Podcast Audio Fix", 
        "category": "Audio Restoration", 
        "tags": ["Clean"], 
        "featuresUsed": ["AI De-noise", "Vocal Boost"], 
        "beforeImageUrl": "https://placehold.co/600x400/b7791f/ffffff?text=Before", 
        "afterImageUrl": "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070&auto=format&fit=crop", 
        "videoUrl": sampleVideoUrl, 
        originalVideoUrl: sampleVideoUrl, // Ab original aur enhanced ke liye ek hi video URL use kiya gaya hai
        "createdAt": Date.now(), 
        "popularity": 98 
    },
    { 
        id: 5, 
        title: "Night Video Denoise", 
        category: "Denoising", 
        tags: ["Clean"], 
        featuresUsed: ["AI Denoise v4"], 
        beforeImageUrl: "https://placehold.co/600x400/c53030/ffffff?text=Before", 
        afterImageUrl: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop", 
        videoUrl: sampleVideoUrl, 
        originalVideoUrl: sampleVideoUrl, // Ab original aur enhanced ke liye ek hi video URL use kiya gaya hai
        createdAt: Date.now() - 800000, 
        popularity: 70 
    },
    { 
        id: 6, 
        title: "Compression Fix", 
        category: "Artifact", 
        tags: ["Fix"], 
        featuresUsed: ["De-artifact", "Clarity+"], 
        beforeImageUrl: "https://placehold.co/600x400/276749/ffffff?text=Before", 
        afterImageUrl: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2070&auto=format&fit=crop", 
        videoUrl: sampleVideoUrl, 
        originalVideoUrl: sampleVideoUrl, // Ab original aur enhanced ke liye ek hi video URL use kiya gaya hai
        createdAt: Date.now() - 300000, 
        popularity: 88 
    },
    // --- NAYA 8K VIDEO CARD YAHAN ADD KIYA GAYA HAI ---
    { 
        id: 7, 
        title: "8K Cityscape", 
        category: "8K", 
        tags: ["Hyper-Res"], 
        featuresUsed: ["Detail+", "8K Model"], 
        beforeImageUrl: "https://placehold.co/600x400/4a5568/ffffff?text=Before", 
        afterImageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2070&auto=format&fit=crop", 
        videoUrl: sampleVideoUrl, 
        originalVideoUrl: sampleVideoUrl, // Ab original aur enhanced ke liye ek hi video URL use kiya gaya hai
        createdAt: Date.now() - 600000, 
        popularity: 81 
    },
];

export const fetchExploreVideos = async (): Promise<VideoCardData[]> => {
    console.log("Fetching videos from API...");
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Videos fetched successfully.");
            resolve(mockApiData);
        }, 1000);
    });
};