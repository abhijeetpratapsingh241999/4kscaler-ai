import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useApp } from '../../contexts/AppContext';

// Component ke props ke liye TypeScript type
type LoginPopupProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LoginPopup: React.FC<LoginPopupProps> = ({ isOpen, onClose }) => {
  const { login } = useApp();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" 
      role="dialog" 
      aria-modal="true"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-5xl m-4 grid lg:grid-cols-2 rounded-2xl shadow-2xl overflow-hidden glowing-border-card bg-container-light dark:bg-container-dark"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-gradient-to-br from-blue-500/80 to-purple-600/80">
          <svg className="w-24 h-24 butterfly-glow" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><g filter="url(#glass-glow)"><path d="M100 100 L20 10 C 10 50, 40 90, 100 100 Z" fill="url(#grad1)" /><path d="M100 100 L180 10 C 190 50, 160 90, 100 100 Z" fill="url(#grad2)" /><path d="M100 100 L20 190 C 10 150, 40 110, 100 100 Z" fill="url(#grad2)" /><path d="M100 100 L180 190 C 190 150, 160 110, 100 100 Z" fill="url(#grad1)" /></g></svg>
          <h2 className="text-3xl font-bold text-white mt-6">4kscaler-ai</h2>
          <p className="text-white/80 mt-2 text-center">Bring your videos to life with AI.</p>
        </div>
        
        <div className="p-8 sm:p-12 relative flex flex-col justify-center">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10" aria-label="Login popup band karein">
            <XMarkIcon className="w-6 h-6 text-text-secondary-light dark:text-text-secondary-dark" />
          </button>
          
          <h3 className="text-2xl font-bold text-text-main-light dark:text-text-main-dark mb-6 text-center">Get Started</h3>
          
          <form onSubmit={handleSubmit} className="space-y-3">
            <button type="button" onClick={login} className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-black/10 dark:border-white/10 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition">
              <svg className="w-5 h-5" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 35.24 44 30.022 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
              Continue with Google
            </button>
            
            <div className="my-4 flex items-center">
              <div className="flex-grow border-t border-black/10 dark:border-white/10"></div>
              <span className="mx-4 text-sm text-text-secondary-light dark:text-text-secondary-dark">OR</span>
              <div className="flex-grow border-t border-black/10 dark:border-white/10"></div>
            </div>
            
            <input type="email" placeholder="Email" className="w-full p-3 bg-background-light dark:bg-background-dark border border-black/10 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-primary-color outline-none" required />
            <input type="password" placeholder="Password" className="w-full p-3 bg-background-light dark:bg-background-dark border border-black/10 dark:border-white/10 rounded-lg focus:ring-2 focus:ring-primary-color outline-none" required minLength={8} />
            
            <button type="submit" className="w-full bubble-button text-white font-bold py-3 px-6 rounded-lg text-md">Create Account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
