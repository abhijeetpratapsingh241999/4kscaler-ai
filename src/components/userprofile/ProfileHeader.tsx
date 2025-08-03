import React from 'react';
import { Upload } from 'lucide-react';

const ProfileHeader: React.FC = () => {
  // Sample data for display. Later, this will come from your app's state or API.
  const user = {
    name: 'Abhijeet P.',
    email: 'abhijeet.p@example.com',
    // Using a placeholder for the avatar
    avatarUrl: 'https://placehold.co/100x100/0a1016/ffffff?text=A',
  };

  return (
    // The main container uses the glass-card style defined in the parent page.
    <div className="glass-card p-6">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        
        {/* Avatar Section with Upload on Hover */}
        <div className="relative group flex-shrink-0">
          <img
            src={user.avatarUrl}
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover border-2 border-cyan-400/30 shadow-lg shadow-cyan-500/20 transition-all duration-300 group-hover:border-cyan-400/60"
          />
          <button 
            className="absolute inset-0 bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            aria-label="Upload new avatar"
          >
            <Upload className="w-8 h-8 text-white" />
          </button>
        </div>

        {/* User Info & Action Button Section */}
        <div className="flex-grow text-center sm:text-left">
          <h2 className="text-2xl font-bold text-white text-shadow-glow">{user.name}</h2>
          <p className="text-sm text-slate-400 mt-1">{user.email}</p>
          <div className="mt-4">
            <button className="save-button">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
