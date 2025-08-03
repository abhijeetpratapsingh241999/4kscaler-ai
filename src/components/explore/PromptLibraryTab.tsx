import React, { useState, useMemo } from 'react';
import { prompts } from '../../data/promptLibraryData';
import PromptCard from './PromptCard';
import PromptMixer from './tools/PromptMixer'; // Naya component import kiya
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const allTags = ['All', ...Array.from(new Set(prompts.flatMap(p => p.tags)))];

const PromptLibraryTab: React.FC = () => {
  const [activeTag, setActiveTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrompts = useMemo(() => {
    let filtered = [...prompts];

    // Filter by tag
    if (activeTag !== 'All') {
      filtered = filtered.filter(prompt => prompt.tags.includes(activeTag as any));
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(prompt =>
        prompt.promptText.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [activeTag, searchQuery]);

  return (
    <div>
      {/* Search and Filter Tags */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
            <div className="relative w-full max-w-lg">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary-dark" />
              <input
                type="text"
                placeholder="Search for a style or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-container-dark border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-color"
              />
            </div>
            {/* AI Prompt Mixer Button yahan add kiya gaya hai */}
            <PromptMixer />
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                activeTag === tag ? 'bg-primary-color text-white' : 'bg-gray-700 text-text-secondary-dark hover:bg-gray-600'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPrompts.map(prompt => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>
    </div>
  );
};

export default PromptLibraryTab;
