// src/components/explore/mainfile/ExploreCard.tsx

import React from 'react';
import { useApp } from '../../../contexts/AppContext';
import { VideoCardData } from '../types/explore'; // Make sure this import is correct and points to the updated types file
import BeforeAfterSlider from '../ui/BeforeAfterSlider';
import Tag from '../ui/Tag';

type Props = {
    data: VideoCardData;
    onClick: (data: VideoCardData) => void;
};

const ExploreCard: React.FC<Props> = ({ data, onClick }) => {
    const { theme } = useApp();

    return (
        <div
            className={`p-3 rounded-2xl flex flex-col gap-4 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border hover:border-purple-500/50 ${
                theme === 'light' ? 'bg-white border-gray-200 text-gray-900 shadow-md' : 'bg-[#1C2135] border-transparent text-white'
            }`}
            onClick={() => onClick(data)}
        >
            <BeforeAfterSlider
                before={data.beforeImageUrl}
                after={data.afterImageUrl}
                alt={data.title}
                originalVideoUrl={data.originalVideoUrl} // 'originalVideoUrl' prop passed
                enhancedVideoUrl={data.videoUrl} // 'enhancedVideoUrl' prop passed
            />
            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg" style={{ fontFamily: 'Poppins, sans-serif' }}>{data.title}</h3>
                    <div className="flex items-center gap-2">
                        {data.tags.map(tag => <Tag key={tag} text={tag} />)}
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {data.featuresUsed.map(feature => (
                        <Tag
                            key={feature}
                            text={feature}
                            icon={<svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>}
                        />
                    ))}
                </div>
                <div className="flex items-center justify-between gap-3 mt-2">
                    <button
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 text-center bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors text-sm shadow-lg shadow-purple-600/20"
                    >
                        Instant Export
                    </button>
                    <button
                        onClick={(e) => e.stopPropagation()}
                        className={`flex-1 text-center font-semibold py-2.5 px-4 rounded-lg transition-colors text-sm ${
                            theme === 'light' ? 'bg-gray-200 hover:bg-gray-300 text-gray-800' : 'bg-white/10 hover:bg-white/20 text-white'
                        }`}
                    >
                        Enhance
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExploreCard;