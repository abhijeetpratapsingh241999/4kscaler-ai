import React from 'react';
import { Guide } from '../../data/guidesData';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

type GuideCardProps = {
  guide: Guide;
};

const GuideCard: React.FC<GuideCardProps> = ({ guide }) => {
  return (
    <div className="bg-container-dark rounded-lg overflow-hidden group flex flex-col">
      <img
        src={guide.thumbnailUrl}
        alt={`Thumbnail for ${guide.title}`}
        className="w-full h-48 object-cover"
        loading="lazy"
      />
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex flex-wrap gap-2 mb-2">
          {guide.tags.map(tag => (
            <span key={tag} className="bg-primary-color/20 text-primary-color text-xs font-semibold px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold text-white mb-2 flex-grow">{guide.title}</h3>
        <p className="text-text-secondary-dark text-sm mb-4">{guide.description}</p>
        <a href="#" className="mt-auto text-primary-color font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
          Read Guide
          <ArrowRightIcon className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};

export default GuideCard;
