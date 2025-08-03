import React from 'react';
import { guides } from '../../data/guidesData';
import GuideCard from './GuideCard';

const StylesAndGuidesTab: React.FC = () => {
  return (
    <div>
      {/* Page Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white">Styles & Guides</h2>
        <p className="text-lg text-text-secondary-dark mt-2 max-w-2xl mx-auto">
          Learn the art of color grading and video enhancement with our expert tutorials and tips.
        </p>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {guides.map(guide => (
          <GuideCard key={guide.id} guide={guide} />
        ))}
      </div>
    </div>
  );
};

export default StylesAndGuidesTab;
