import React, { useState, useEffect, useRef } from 'react';
import { Bars3Icon, SunIcon, MoonIcon } from '@heroicons/react/24/solid';
import { useApp } from '../../contexts/AppContext';
import ProfilePopup from '../ui/ProfilePopup';
import CreditsBox from '../header/CreditsBox'; // CreditsBox ko yahan import kiya gaya hai

type HeaderProps = {
  onMobileMenuToggle: () => void;
};

const Header: React.FC<HeaderProps> = ({ onMobileMenuToggle }) => {
  const { theme, toggleTheme, isLoggedIn, setLoginPopupOpen } = useApp();
  const [isProfileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileRef]);

  return (
    <header className="p-4 flex justify-between items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm sticky top-0 z-20 border-b border-black/5 dark:border-white/5 flex-shrink-0">
      <button onClick={onMobileMenuToggle} className="lg:hidden p-2 rounded-md text-text-main-light dark:text-text-main-dark" aria-label="Menu Kholein">
        <Bars3Icon className="w-6 h-6" />
      </button>
      <div className="hidden lg:block"></div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleTheme} 
          id="theme-toggle" 
          className="p-2 rounded-full glass-effect text-text-main-light dark:text-text-main-dark" 
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
        </button>

        {/* CreditsBox component ko yahan add kiya gaya hai */}
        <CreditsBox />
        
        {isLoggedIn ? (
          <div className="relative" ref={profileRef}>
            <button onClick={() => setProfileOpen(prev => !prev)} aria-label="Profile Kholein">
              <img src="https://placehold.co/40x40/3b82f6/ffffff?text=AP" alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-primary-color" loading="lazy" />
            </button>
            <ProfilePopup isOpen={isProfileOpen} onClose={() => setProfileOpen(false)} />
          </div>
        ) : (
          <button onClick={() => setLoginPopupOpen(true)} className="px-4 py-2 text-sm font-semibold rounded-full glass-effect border border-black/10 dark:border-white/10 text-text-main-light dark:text-text-main-dark hover:bg-black/5 dark:hover:bg-white/5 transition" aria-label="Login karein">
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
