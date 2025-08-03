import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import ShowcaseTab from '../components/explore/ShowcaseTab';
import PromptLibraryTab from '../components/explore/PromptLibraryTab';
import StylesAndGuidesTab from '../components/explore/StylesAndGuidesTab';
import { CameraIcon, SparklesIcon, BookOpenIcon } from '@heroicons/react/24/outline';

type TabName = 'Showcase' | 'Prompt Library' | 'Styles & Guides';

const tabs = [
  { name: 'Showcase', icon: CameraIcon },
  { name: 'Prompt Library', icon: SparklesIcon },
  { name: 'Styles & Guides', icon: BookOpenIcon },
];

const ExplorePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabName>('Showcase');

  const renderContent = () => {
    switch (activeTab) {
      case 'Showcase':
        return <ShowcaseTab />;
      case 'Prompt Library':
        return <PromptLibraryTab />;
      case 'Styles & Guides':
        return <StylesAndGuidesTab />;
      default:
        return <ShowcaseTab />;
    }
  };

  return (
    <PageContainer>
      {/* Tab Navigation */}
      <div className="mb-8 flex justify-center">
        {/* Yahan badlav kiya gaya hai: Container ka background ab hamesha kaala rahega */}
        <div className="p-1.5 rounded-lg flex gap-2 bg-black shadow-lg">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name as TabName)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300 ${
                activeTab === tab.name
                  ? 'bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow-lg' // Active state
                  : 'text-slate-200 hover:bg-slate-800' // Inactive state
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className={`${activeTab === tab.name ? '[text-shadow:0_0_8px_rgba(255,255,255,0.5)]' : ''}`}>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {renderContent()}
      </div>
    </PageContainer>
  );
};

export default ExplorePage;
