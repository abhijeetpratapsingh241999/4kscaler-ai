import React from 'react';
import { Link } from 'react-router-dom';
import { SparklesIcon, GlobeAltIcon, BeakerIcon, RectangleStackIcon } from '@heroicons/react/24/solid';

// Buttons ka data ek alag array mein rakha gaya hai taaki code saaf rahe
const ctaButtons = [
  { text: 'Start Upscaling Now', link: '/upscale', icon: <SparklesIcon className="w-6 h-6" /> },
  { text: 'Explore', link: '/explore', icon: <GlobeAltIcon className="w-6 h-6" /> },
  { text: 'AI Lab', link: '/ai-lab', icon: <BeakerIcon className="w-6 h-6" /> }, // AI Lab ke liye naya link
  { text: 'My Creations', link: '/my-creations', icon: <RectangleStackIcon className="w-6 h-6" /> },
];

const CtaSection: React.FC = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark py-16 sm:py-24">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Ready to Transform Your Videos?
        </h2>
        <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto mb-8">
          Unleash the power of AI. Upscale your footage to stunning 4K/8K quality, remove noise, and bring your vision to life.
        </p>
        
        {/* Responsive button container - Yahan badlav kiya gaya hai */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto px-4">
          {ctaButtons.map((button) => (
            <Link 
              key={button.text}
              to={button.link} 
              // Yahan badlav kiya gaya hai: Padding aur font size badhaya gaya hai
              className="bubble-button flex items-center justify-center gap-3 text-white font-semibold py-4 px-6 rounded-lg text-base md:text-lg transition-transform hover:scale-105"
            >
              {button.icon}
              <span>{button.text}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CtaSection;
