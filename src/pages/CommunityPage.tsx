import React from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';

// TypeScript types for our data
type Creation = {
  id: number;
  title: string;
  user: string;
  avatar: string;
  resolution: string;
  img: string;
};

type Creator = {
  id: number;
  name: string;
  stats: string;
  avatar: string;
};

// Placeholder data
const featuredCreations: Creation[] = [
  { id: 1, title: 'Cyberpunk City Fly-through', user: '@pixelmaster', avatar: 'U1', resolution: '4K', img: 'https://placehold.co/600x400/111111/ffffff?text=Video+1' },
  { id: 2, title: 'Nature Documentary Enhanced', user: '@naturelens', avatar: 'U2', resolution: '8K', img: 'https://placehold.co/600x400/111111/ffffff?text=Video+2' },
  { id: 3, title: 'Vintage Film Restoration', user: '@retroreviver', avatar: 'U3', resolution: '4K', img: 'https://placehold.co/600x400/111111/ffffff?text=Video+3' },
  { id: 4, title: 'Anime Scene Upscale', user: '@animemaster', avatar: 'U4', resolution: '1080p', img: 'https://placehold.co/600x400/111111/ffffff?text=Video+4' },
];

const topCreators: Creator[] = [
  { id: 1, name: '@pixelmaster', stats: '1.2M Likes | 54 Creations', avatar: 'U1' },
  { id: 2, name: '@naturelens', stats: '980K Likes | 32 Creations', avatar: 'U2' },
  { id: 3, name: '@retroreviver', stats: '750K Likes | 78 Creations', avatar: 'U3' },
];

const CommunityPage: React.FC = () => {
  return (
    <PageContainer>
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold text-text-main-light dark:text-text-main-dark mb-3">Community Hub</h1>
        <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto">
          Explore creations, connect with top artists, and join the discussion.
        </p>
      </div>

      {/* Featured Creations Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8">Featured Creations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredCreations.map((creation) => (
            <Link to="#" key={creation.id} className="community-card group block rounded-lg overflow-hidden shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2">
              <div className="relative">
                <img src={creation.img} className="w-full h-48 object-cover" alt={`${creation.title} thumbnail`} loading="lazy" />
                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">{creation.resolution}</div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-2 truncate">{creation.title}</h3>
                <div className="flex items-center gap-2 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                  <img src={`https://placehold.co/24x24/8b5cf6/ffffff?text=${creation.avatar}`} className="w-6 h-6 rounded-full" alt={`${creation.user}'s avatar`} loading="lazy" />
                  <span>{creation.user}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Section: Top Creators & Discussion */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Top Creators List */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold mb-8">Top Creators</h2>
          <div className="space-y-4">
            {topCreators.map((creator) => (
              <div key={creator.id} className="creator-item">
                <div className="flex items-center gap-4">
                  <img src={`https://placehold.co/48x48/3b82f6/ffffff?text=${creator.avatar}`} className="w-12 h-12 rounded-full" alt={`${creator.name}'s avatar`} loading="lazy" />
                  <div>
                    <h4 className="font-semibold">{creator.name}</h4>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{creator.stats}</p>
                  </div>
                </div>
                <button className="bubble-button text-white font-semibold py-2 px-5 rounded-lg text-sm" aria-label={`Follow ${creator.name}`}>
                  Follow
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Join Discussion Section */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Join the Discussion</h2>
          <div className="space-y-4">
            <a href="#" className="flex items-center gap-4 p-4 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 transition-colors" aria-label="Join our Discord community">
                <svg className="w-8 h-8 text-indigo-400" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.3698a1.0001 1.0001 0 00-1.051-.1454L4.0173 9.4011a.9998.9998 0 00-.5824.9468v.0002l.0002.0002.0013.0026a1.0001 1.0001 0 00.9517.8482l4.83.3914 1.203 4.8055a1 1 0 00.9475.651h.0001a1.0001 1.0001 0 00.8491-.4824l4.132-8.2621a.9998.9998 0 00-.1455-1.051zm-6.55 4.9774l-4.234 2.1168-1.001-4.0053 7.34-3.6696-2.105 5.5581z"/></svg>
                <div>
                    <h4 className="font-semibold">Join our Discord</h4>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Chat with creators and the team.</p>
                </div>
            </a>
            <a href="#" className="flex items-center gap-4 p-4 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 transition-colors" aria-label="Follow us on X (Twitter)">
                <svg className="w-8 h-8 text-sky-400" fill="currentColor" viewBox="0 0 16 16"><path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 5.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/></svg>
                <div>
                    <h4 className="font-semibold">Follow us on X</h4>
                    <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Get the latest updates and news.</p>
                </div>
            </a>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default CommunityPage;
