import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { useApp } from '../../contexts/AppContext';

const ThemeToggle = () => {
  // AppContext se theme state aur toggle function le rahe hain
  const { theme, toggleTheme } = useApp();

  return (
    <button 
      onClick={toggleTheme} 
      id="theme-toggle" 
      className="p-2 rounded-full glass-effect text-text-main-light dark:text-text-main-dark" 
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <SunIcon className="w-5 h-5" />
      ) : (
        <MoonIcon className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
