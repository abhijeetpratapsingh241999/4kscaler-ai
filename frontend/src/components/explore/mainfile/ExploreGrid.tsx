// src/components/explore/mainfile/ExploreGrid.tsx

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { VideoCardData } from '../types/explore';
import { fetchExploreVideos } from '../utils/api';
import ExploreCard from './ExploreCard';
import VideoModal from '../ui/VideoModal';
import SkeletonCard from '../ui/SkeletonCard';
import { SortOption } from '../ui/FilterPopup';

type Props = {
    activeFilter: string;
    searchQuery: string;
    currentSort: SortOption;
};

const ExploreGrid: React.FC<Props> = ({ activeFilter, searchQuery, currentSort }) => {
    const [videos, setVideos] = useState<VideoCardData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<VideoCardData | null>(null);

    const loadVideos = useCallback(async () => {
        try {
            setError(null);
            setLoading(true);
            const fetchedVideos = await fetchExploreVideos();
            setVideos(fetchedVideos);
        } catch (err) {
            console.error("Videos fetch karne mein error:", err);
            setError("Oops! Videos load nahi ho paye.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadVideos();
    }, [loadVideos]);

    const processedVideos = useMemo(() => {
        const lowercasedQuery = searchQuery.toLowerCase();
        
        const filtered = videos
            .filter(video => activeFilter === 'All' || video.category === activeFilter)
            .filter(video => {
                if (!lowercasedQuery) return true;
                const titleMatch = video.title.toLowerCase().includes(lowercasedQuery);
                const promptMatch = video.prompt?.toLowerCase().includes(lowercasedQuery) ?? false;
                return titleMatch || promptMatch;
            });

        switch (currentSort) {
            case 'Trending':
                return filtered.sort((a, b) => b.popularity - a.popularity);
            case 'Latest':
                return filtered.sort((a, b) => b.createdAt - a.createdAt);
            case 'Oldest':
                return filtered.sort((a, b) => a.createdAt - b.createdAt);
            default:
                return filtered;
        }
    }, [videos, activeFilter, searchQuery, currentSort]);

    const handleCardClick = (data: VideoCardData) => setSelectedVideo(data);
    const handleCloseModal = () => setSelectedVideo(null);
    
    return (
        <div>
            {loading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 **p-4**">
                    {Array.from({ length: 4 }).map((_, index) => <SkeletonCard key={index} />)}
                </div>
            ) : error ? (
                <div className="text-center **p-4**">
                    <p className="text-red-500 dark:text-red-400 mb-4">{error}</p>
                    <button onClick={loadVideos} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-5 rounded-lg transition-colors">
                        Try Again
                    </button>
                </div>
            ) : processedVideos.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 **p-4**">
                    {processedVideos.map(video => (
                        <ExploreCard key={video.id} data={video} onClick={handleCardClick} />
                    ))}
                </div>
            ) : (
                <div className="text-center **p-4** col-span-full flex flex-col items-center">
                    <svg className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">No Videos Found</h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-500">Try adjusting your search or filters.</p>
                </div>
            )}

            {selectedVideo && (
                <VideoModal videoData={selectedVideo} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default ExploreGrid;