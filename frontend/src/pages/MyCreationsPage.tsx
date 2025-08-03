import React from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import { RectangleStackIcon, SparklesIcon } from '@heroicons/react/24/outline';

const MyCreationsPage: React.FC = () => {
  return (
    <PageContainer className="items-center justify-center text-center">
      <div className="relative mb-8">
        <RectangleStackIcon className="w-24 h-24 text-primary-color/30" />
        <SparklesIcon className="w-12 h-12 text-purple-400/50 absolute -bottom-2 -right-2 animate-pulse" />
      </div>
      
      <h1 className="text-4xl font-bold text-text-main-light dark:text-text-main-dark mb-3">
        My Creations
      </h1>
      
      <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-md mb-8">
        Your enhanced and upscaled videos will appear here once you create them. Let's make something amazing!
      </p>
      
      <Link 
        to="/upscale" 
        className="bubble-button text-white font-bold py-3 px-6 rounded-lg text-lg"
      >
        Upscale Your First Video
      </Link>
    </PageContainer>
  );
};

export default MyCreationsPage;
