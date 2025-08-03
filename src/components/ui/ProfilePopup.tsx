import React from 'react';
import { Link } from 'react-router-dom';
import { UserIcon, ChatBubbleLeftEllipsisIcon, QuestionMarkCircleIcon, ArrowUpCircleIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline';
import { useApp } from '../../contexts/AppContext';

type ProfilePopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ProfilePopup: React.FC<ProfilePopupProps> = ({ isOpen, onClose }) => {
  const { logout } = useApp();

  if (!isOpen) return null;

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <div 
      className="absolute top-14 right-0 z-50 w-64 rounded-2xl shadow-2xl overflow-hidden 
                 bg-gradient-to-br from-blue-500 to-pink-500 
                 border border-white/30"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="user-menu-button"
    >
      {/* Custom CSS for icon glow effects */}
      <style>
        {`
          .icon-glow-profile { color: #22d3ee; filter: drop-shadow(0 0 8px rgba(34, 211, 238, 0.7)); }
          .icon-glow-feedback { color: #34d399; filter: drop-shadow(0 0 8px rgba(52, 211, 153, 0.7)); }
          .icon-glow-upgrade { color: #c084fc; filter: drop-shadow(0 0 8px rgba(192, 132, 252, 0.7)); }
          .icon-glow-help { color: #f59e0b; filter: drop-shadow(0 0 8px rgba(245, 158, 11, 0.7)); }
          .icon-glow-logout { color: #f87171; filter: drop-shadow(0 0 8px rgba(248, 113, 113, 0.7)); }
        `}
      </style>

      <div className="p-4 bg-black/20">
        <div className="flex items-center gap-3 mb-3">
          <img src="https://placehold.co/40x40/3b82f6/ffffff?text=AP" alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-white/50" loading="lazy" />
          <div>
            <p className="font-semibold text-sm text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">Abhijeet P.</p>
            <p className="text-xs text-slate-300 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">Free Plan</p>
          </div>
        </div>
        <p className="text-xs text-slate-300 [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]">5 credits remaining</p>
      </div>
      
      <div className="border-t border-white/20"></div>
      
      <div className="p-2 space-y-1">
        <Link to="/profile" onClick={onClose} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]" role="menuitem">
          <UserIcon className="w-5 h-5 icon-glow-profile" />
          Profile
        </Link>
        <Link to="/feedback" onClick={onClose} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]" role="menuitem">
          <ChatBubbleLeftEllipsisIcon className="w-5 h-5 icon-glow-feedback" />
          Feedback
        </Link>
        {/* Buttons reordered as requested */}
        <Link to="/pricing" onClick={onClose} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]" role="menuitem">
          <ArrowUpCircleIcon className="w-5 h-5 icon-glow-upgrade" />
          Upgrade Plan
        </Link>
        <Link to="/help" onClick={onClose} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]" role="menuitem">
          <QuestionMarkCircleIcon className="w-5 h-5 icon-glow-help" />
          Help
        </Link>
        
        <div className="border-t border-white/20 my-1"></div>
        
        <button onClick={handleLogout} className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.5)]" role="menuitem">
          <ArrowLeftStartOnRectangleIcon className="w-5 h-5 icon-glow-logout" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePopup;
