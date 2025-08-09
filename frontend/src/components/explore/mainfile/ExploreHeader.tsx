// src/components/explore/mainfile/ExploreHeader.tsx

import React from 'react';
// AppContext se useApp hook ko import kiya gaya hai
import { useApp } from '../../../contexts/AppContext';

type Props = {
    searchQuery: string;
    onSearchChange: (query: string) => void;
};

const ExploreHeader: React.FC<Props> = ({ searchQuery, onSearchChange }) => {
    // useApp hook se sirf theme ko nikala gaya hai
    const { theme } = useApp();

    return (
        <header className="flex items-center justify-between px-4 pt-4 pb-2 bg-transparent z-10">
            {/* Icon aur Heading ko ek flex container mein daala gaya hai */}
            <div className="flex items-center gap-3">
                {/* Icon with glow effect */}
                <div style={{ filter: 'drop-shadow(0 0 8px rgba(168, 85, 247, 0.8))' }}>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-8 w-8 text-purple-500" // Icon ka color set kiya gaya hai
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth={1.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" />
                    </svg>
                </div>
                <h1 
                    className={`text-2xl md:text-3xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'}`} 
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                    Explore
                </h1>
            </div>

            <div className="flex-1 max-w-md mx-4">
                <div className="relative">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <input 
                        type="text" 
                        placeholder="Search by title or prompt..."
                        className="w-full bg-gray-200 dark:bg-[#1C2135] border border-transparent focus:border-purple-500 rounded-lg py-2.5 pl-11 pr-4 text-gray-800 dark:text-white placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-600"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </div>
            <button className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                <svg 
                    className={`w-6 h-6 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`} 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>
        </header>
    );
};

export default ExploreHeader;
