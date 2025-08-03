import React, { useState, useMemo } from 'react';
import { showcaseVideos } from '../../data/showcaseData';
import ShowcaseCard from './ShowcaseCard';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

type FilterType = 'Most Liked' | 'Most Recent' | 'Staff Picks';

const ShowcaseTab: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('Most Liked');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVideos = useMemo(() => {
    let videos = [...showcaseVideos];

    // Filter logic
    if (activeFilter) {
      videos = videos.filter(video => video.tags.includes(activeFilter));
    }

    // Search logic
    if (searchQuery.trim() !== '') {
      videos = videos.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.prompt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return videos;
  }, [activeFilter, searchQuery]);

  return (
    <div>
      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
        {/* Yahan badlav kiya gaya hai */}
        <div className="flex gap-2 p-1.5 bg-black rounded-lg shadow-lg">
          {(['Most Liked', 'Most Recent', 'Staff Picks'] as FilterType[]).map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300 ${
                activeFilter === filter 
                  ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-lg' 
                  : 'text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span className={`${activeFilter === filter ? '[text-shadow:0_0_8px_rgba(255,255,255,0.5)]' : ''}`}>
                {filter}
              </span>
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-auto">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary-dark" />
          <input
            type="text"
            placeholder="Search creations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64 bg-container-dark border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary-color"
          />
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredVideos.map(video => (
          <ShowcaseCard key={video.id} video={video} />
        ))}
      </div>
      
      {/* CTA Button */}
      <div className="text-center mt-12">
        <button className="bubble-button text-white font-bold py-3 px-8 rounded-lg">
          Submit Your Creation
        </button>
      </div>
    </div>
  );
};

export default ShowcaseTab;
