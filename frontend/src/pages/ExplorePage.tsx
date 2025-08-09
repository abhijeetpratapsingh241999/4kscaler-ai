// src/pages/ExplorePage.tsx

import React, { useState, useEffect, useRef } from 'react';
import PageContainer from '../components/layout/PageContainer'; 
import ExploreHeader from '../components/explore/mainfile/ExploreHeader';
import ExploreTabs from '../components/explore/mainfile/ExploreTabs';
import ExploreGrid from '../components/explore/mainfile/ExploreGrid';
// SortOption ko import kiya gaya hai
import { SortOption } from '../components/explore/ui/FilterPopup';

const addGoogleFont = (fontFamily: string) => {
  const fontId = `google-font-${fontFamily.replace(' ', '-')}`;
  if (document.getElementById(fontId)) return;
  const link = document.createElement('link');
  link.id = fontId;
  link.href = `https://fonts.googleapis.com/css2?family=${fontFamily.replace(' ', '+')}:wght@400;500;600;700&display=swap`;
  link.rel = 'stylesheet';
  document.head.appendChild(link);
};

const ExplorePage: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isTabsSticky, setIsTabsSticky] = useState(false);
    // Sorting ke liye nayi state banayi gayi hai
    const [currentSort, setCurrentSort] = useState<SortOption>('Trending');

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        addGoogleFont('Poppins');
        addGoogleFont('Inter');

        const scrollContainer = scrollContainerRef.current;
        const headerEl = scrollContainer?.querySelector('header');
        
        if (!scrollContainer || !headerEl) return;

        const headerHeight = headerEl.offsetHeight;

        const handleScroll = () => {
            if (scrollContainer.scrollTop > headerHeight) {
                setIsTabsSticky(true);
            } else {
                setIsTabsSticky(false);
            }
        };

        scrollContainer.addEventListener('scroll', handleScroll);
        return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <PageContainer>
            <div ref={scrollContainerRef} className="h-full overflow-y-auto no-scrollbar">
                <ExploreHeader 
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />
                <ExploreTabs 
                    activeTab={activeFilter} 
                    onTabClick={setActiveFilter}
                    isSticky={isTabsSticky}
                    // Error theek karne ke liye yeh dono props pass kiye gaye hain
                    currentSort={currentSort}
                    onSortChange={setCurrentSort}
                />
                <ExploreGrid 
                    activeFilter={activeFilter} 
                    searchQuery={searchQuery}
                    // Sorting ki value ko grid mein bhi pass kiya gaya hai
                    currentSort={currentSort}
                />
            </div>
            <style>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </PageContainer>
    );
};

export default ExplorePage;
