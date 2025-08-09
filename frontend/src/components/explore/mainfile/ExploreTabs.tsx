// src/components/explore/mainfile/ExploreTabs.tsx

import React, { useState, useRef } from 'react';
import { useApp } from '../../../contexts/AppContext';
import FilterPopup, { SortOption } from '../ui/FilterPopup';

type Props = {
    activeTab: string;
    onTabClick: (tab: string) => void;
    isSticky: boolean;
    currentSort: SortOption;
    onSortChange: (option: SortOption) => void;
};

const ExploreTabs: React.FC<Props> = ({ activeTab, onTabClick, isSticky, currentSort, onSortChange }) => {
    const { theme } = useApp();
    const tabs = ["All", "4K", "8K", "Color Grading", "Denoising", "Artifact", "Face Enhancement", "Audio Restoration"];
    
    const [isPopupOpen, setPopupOpen] = useState(false);
    // filterButtonRef ki ab zaroorat nahi hai

    const stickyClasses = isSticky 
        ? `sticky top-0 z-20 backdrop-blur-lg shadow-lg ${theme === 'light' ? 'bg-white/80 border-b border-gray-200' : 'bg-[#0B0F19]/80 border-b border-white/10'}`
        : '';

    return (
        <div className={`flex items-center justify-center gap-4 px-4 py-4 transition-all duration-300 ${stickyClasses}`}>
            {/* Filter button aur popup ko ek relative container mein daala gaya hai */}
            <div className="relative">
                <button 
                    onClick={() => setPopupOpen(!isPopupOpen)}
                    className={`p-3 rounded-lg transition-colors backdrop-blur-sm border flex items-center gap-2 ${theme === 'light' ? 'bg-gray-100 hover:bg-gray-200 text-gray-600 border-gray-300' : 'bg-white/5 hover:bg-white/10 text-gray-400 border-white/10'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                    <span className="text-sm font-semibold">{currentSort}</span>
                </button>
                {/* FilterPopup ko is relative container ke andar rakha gaya hai */}
                <FilterPopup
                    isOpen={isPopupOpen}
                    onClose={() => setPopupOpen(false)}
                    currentSort={currentSort}
                    onSortChange={onSortChange}
                />
            </div>

            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
                {tabs.map(tab => (
                    <button 
                        key={tab}
                        onClick={() => onTabClick(tab)}
                        className={`text-center px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 whitespace-nowrap border ${
                            activeTab === tab 
                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 border-purple-500' 
                            : `backdrop-blur-sm ${theme === 'light' ? 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300' : 'bg-white/5 hover:bg-white/10 text-gray-300 border-white/10'}`
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ExploreTabs;
