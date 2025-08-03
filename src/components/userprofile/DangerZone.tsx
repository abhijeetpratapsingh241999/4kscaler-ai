import React from 'react';
import { ShieldAlert } from 'lucide-react';

const DangerZone: React.FC = () => {
  // This function would typically open a confirmation modal.
  const handleDeleteClick = () => {
    console.log("Delete Account button clicked. Show confirmation modal.");
    // Example: window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
  };

  return (
    <div className="glass-card p-6 border-red-500/30">
      <h3 className="text-xl font-bold text-red-400 text-shadow-glow mb-4">Danger Zone</h3>
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-white">Delete Your Account</p>
          <p className="text-xs text-slate-400">Once you delete your account, there is no going back. Please be certain.</p>
        </div>
        <button 
          onClick={handleDeleteClick}
          className="delete-button"
        >
          <ShieldAlert size={16} />
          <span>Delete Account</span>
        </button>
      </div>
    </div>
  );
};

export default DangerZone;
