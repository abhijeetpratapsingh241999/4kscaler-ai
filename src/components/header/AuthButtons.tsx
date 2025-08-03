import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../contexts/AppContext';
import ProfilePopup from '../ui/ProfilePopup';

const AuthButtons: React.FC = () => {
  const { isLoggedIn, setLoginPopupOpen } = useApp();
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

  // Agar user logged in hai, to profile button aur popup dikhao
  if (isLoggedIn) {
    return (
      <div className="relative" ref={profileRef}>
        <button onClick={() => setProfileOpen(prev => !prev)} aria-label="Profile Kholein">
          <img src="https://placehold.co/40x40/3b82f6/ffffff?text=AP" alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-primary-color" loading="lazy" />
        </button>
        <ProfilePopup isOpen={isProfileOpen} onClose={() => setProfileOpen(false)} />
      </div>
    );
  }

  // Agar user logged in nahi hai, to login button dikhao
  return (
    <button onClick={() => setLoginPopupOpen(true)} className="px-4 py-2 text-sm font-semibold rounded-full glass-effect border border-black/10 dark:border-white/10 text-text-main-light dark:text-text-main-dark hover:bg-black/5 dark:hover:bg-white/5 transition" aria-label="Login karein">
      Login
    </button>
  );
};

export default AuthButtons;
