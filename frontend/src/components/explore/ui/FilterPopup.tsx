// src/components/explore/ui/FilterPopup.tsx

import React from 'react';
import { useApp } from '../../../contexts/AppContext';

export type SortOption = 'Trending' | 'Latest' | 'Oldest';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    currentSort: SortOption;
    onSortChange: (option: SortOption) => void;
};

const FilterPopup: React.FC<Props> = ({ isOpen, onClose, currentSort, onSortChange }) => {
    const { theme } = useApp();

    if (!isOpen) {
        return null;
    }

    const handleOptionClick = (option: SortOption) => {
        onSortChange(option);
        onClose();
    };

    return (
        <>
            {/* Yeh Overlay poori screen par click ko detect karke popup band kar dega */}
            <div className="fixed inset-0 z-20" onClick={onClose}></div>
            
            {/* Popup ki positioning ko 'absolute', 'top-full', aur 'mt-2' se set kiya gaya hai */}
            <div 
                className={`absolute top-full left-0 mt-2 z-30 w-48 rounded-lg shadow-xl p-2 transition-all duration-200 animate-fade-in-up ${
                    theme === 'light' ? 'bg-white border border-gray-200' : 'bg-[#2a2f40] border border-white/10'
                }`}
            >
                <div className="flex flex-col gap-1">
                    {(['Trending', 'Latest', 'Oldest'] as SortOption[]).map(option => (
                        <button
                            key={option}
                            onClick={() => handleOptionClick(option)}
                            className={`w-full text-left text-sm px-3 py-2 rounded-md transition-colors ${
                                currentSort === option
                                ? 'bg-purple-600 text-white'
                                : `hover:${theme === 'light' ? 'bg-gray-100' : 'bg-white/10'}`
                            }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
            <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.2s ease-out forwards;
                }
            `}</style>
        </>
    );
};

export default FilterPopup;
