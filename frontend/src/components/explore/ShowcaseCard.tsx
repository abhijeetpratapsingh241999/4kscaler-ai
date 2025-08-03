import React, { useState } from 'react';
import { HeartIcon, DocumentDuplicateIcon } from '@heroicons/react/24/solid';
import { ShowcaseVideo } from '../../data/showcaseData';
import BeforeAfterSlider from './BeforeAfterSlider';

type ShowcaseCardProps = {
  video: ShowcaseVideo;
};

const ShowcaseCard: React.FC<ShowcaseCardProps> = ({ video }) => {
  const [likes, setLikes] = useState(video.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');

  const handleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(video.prompt).then(() => {
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus(''), 2000);
    });
  };

  return (
    <div className="bg-container-dark rounded-lg overflow-hidden group">
      <div className="relative">
        <BeforeAfterSlider
          beforeImageUrl={video.beforeImageUrl}
          afterImageUrl={video.afterImageUrl}
        />
        {/* Hover par dikhne wala overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <img src={video.creatorAvatarUrl} alt={video.creatorName} className="w-8 h-8 rounded-full border-2 border-white/50" />
              <span className="text-white font-semibold text-sm">{video.creatorName}</span>
            </div>
            <button
              onClick={handleLike}
              className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm hover:bg-white/20 transition"
            >
              <HeartIcon className={`w-5 h-5 transition-colors ${isLiked ? 'text-pink-500' : 'text-white'}`} />
              {likes.toLocaleString()}
            </button>
          </div>
          <button
            onClick={handleCopyPrompt}
            className="w-full bg-primary-color/80 backdrop-blur-sm text-white font-bold py-2 rounded-lg hover:bg-primary-color transition"
          >
            {copyStatus || 'Copy Prompt'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseCard;
