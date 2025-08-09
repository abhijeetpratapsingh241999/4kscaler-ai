// src/components/explore/ui/SkeletonCard.tsx

import React from 'react';

/**
 * Yeh component asli card ke load hone tak ek placeholder dikhata hai.
 * 'animate-pulse' class ismein loading animation daalti hai.
 */
const SkeletonCard = () => (
    <div className="bg-[#1C2135] p-3 rounded-2xl flex flex-col gap-4">
        {/* Image Placeholder */}
        <div className="w-full aspect-video rounded-lg bg-gray-700 animate-pulse"></div>
        
        <div className="flex flex-col gap-3">
            {/* Title Placeholder */}
            <div className="h-6 w-3/4 rounded bg-gray-700 animate-pulse"></div>
            
            {/* Tags Placeholder */}
            <div className="flex flex-wrap gap-2">
                <div className="h-5 w-20 rounded-full bg-gray-700 animate-pulse"></div>
                <div className="h-5 w-24 rounded-full bg-gray-700 animate-pulse"></div>
            </div>
            
            {/* Buttons Placeholder */}
            <div className="flex items-center justify-between gap-3 mt-2">
                <div className="h-10 flex-1 rounded-lg bg-gray-700 animate-pulse"></div>
                <div className="h-10 flex-1 rounded-lg bg-gray-700 animate-pulse"></div>
            </div>
        </div>
    </div>
);

export default SkeletonCard;
