import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';

// LikeButton ke props ke liye TypeScript type
type LikeButtonProps = {
  initialLikes: number;
};

// Like button ke liye ek alag, reusable component
const LikeButton: React.FC<LikeButtonProps> = ({ initialLikes }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };

  return (
    <div className="flex items-center gap-4">
      <button onClick={handleLike} className={`like-button ${liked ? 'liked' : ''}`} aria-label="Like this update">
        <svg className="w-8 h-8 cursor-pointer" viewBox="0 0 24 24">
          {/* SVG gradients for the heart icon */}
          <defs>
            <linearGradient id="heart-gradient-active" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id="heart-gradient-inactive" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9ca3af" />
              <stop offset="100%" stopColor="#6b7280" />
            </linearGradient>
          </defs>
          <path className="heart-icon-gradient" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
        </svg>
      </button>
      <span className="like-count font-semibold text-lg text-text-main-light dark:text-text-main-dark">
        {likes.toLocaleString()}
      </span>
    </div>
  );
};


const WhatsNewPage: React.FC = () => {
  return (
    <PageContainer>
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-text-main-light dark:text-text-main-dark mb-3">What's New</h1>
        <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
          Check out the latest features, model updates, and community news.
        </p>
      </div>
      
      {/* Updates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        
        {/* Update Card 1 */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">🚀 New v3 Model Launch</h2>
          <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg shadow-black/20">
            <video 
              src="https://assets.mixkit.co/videos/preview/mixkit-futuristic-long-dashboard-with-graphs-and-charts-36472-large.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-text-secondary-light dark:text-text-secondary-dark">
            Our new v3 enhancement model is here! It offers unparalleled clarity, better color correction, and is twice as fast. See the difference for yourself.
          </p>
          <LikeButton initialLikes={1278} />
        </div>

        {/* Update Card 2 */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">🎨 Frame Interpolation is Here!</h2>
          <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg shadow-black/20">
            <video 
              src="https://assets.mixkit.co/videos/preview/mixkit-abstract-globe-of-blue-and-pink-lights-42293-large.mp4"
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-text-secondary-light dark:text-text-secondary-dark">
            Turn your choppy videos into smooth, high-framerate clips with our new Frame Interpolation feature. Available now for all Pro and Enterprise users.
          </p>
          <LikeButton initialLikes={952} />
        </div>

      </div>
    </PageContainer>
  );
};

export default WhatsNewPage;
