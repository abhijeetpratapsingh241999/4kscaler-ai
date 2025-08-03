import React from 'react';
import { Settings, Upload, CheckCircle2, Zap, PlusCircle, ShieldCheck, KeyRound, ShieldAlert } from 'lucide-react';

// --- Component: ProfileHeader.tsx ---
const ProfileHeader: React.FC = () => {
  const user = {
    name: 'Abhijeet P.',
    email: 'abhijeet.p@example.com',
    avatarUrl: 'https://placehold.co/100x100/0a1016/ffffff?text=A',
  };

  return (
    <div className="glass-card p-6">
      <div className="flex flex-col sm:flex-row items-center gap-6">
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

// --- Component: PlanDetails.tsx ---
const PlanDetails: React.FC = () => {
  const plan = {
    name: 'Pro Plan',
    features: [
      'Up to 4K Video Upscaling',
      '60 FPS Frame Interpolation',
      'Advanced AI Color Grading',
      '5,000 AI Credits per month',
      'Priority Support',
    ],
    renewalDate: 'August 20, 2025',
  };

  return (
    <div className="glass-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white text-shadow-glow">Your Current Plan</h3>
        <span className="flex items-center gap-2 text-sm font-semibold text-cyan-300 plan-badge">
          <Zap size={16} />
          {plan.name}
        </span>
      </div>
      <ul className="space-y-3 mb-6">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3 text-slate-300 text-sm">
            <CheckCircle2 size={18} className="text-green-400" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-white/10">
        <p className="text-xs text-slate-400">
          Your plan renews on {plan.renewalDate}.
        </p>
        <button className="manage-plan-button">
          Manage Plan
        </button>
      </div>
    </div>
  );
};

// --- Component: CreditsUsage.tsx ---
const CreditsUsage: React.FC = () => {
  const credits = { used: 3750, total: 5000 };
  const percentage = (credits.used / credits.total) * 100;
  const remaining = credits.total - credits.used;
  const circumference = 2 * Math.PI * 52; 
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="glass-card p-6 flex flex-col items-center text-center">
      <h3 className="text-xl font-bold text-white text-shadow-glow mb-6">AI Credits Usage</h3>
      <div className="relative w-40 h-40">
        {/* FIX: Changed viewBox to give more space for the glow filter */}
        <svg className="w-full h-full" viewBox="0 0 140 140">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Background Circle - Centered in the new viewBox */}
          <circle cx="70" cy="70" r="52" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="12" />
          {/* Progress Circle - Centered in the new viewBox */}
          <circle
            cx="70" cy="70" r="52" fill="none" stroke="#facc15"
            strokeWidth="12" strokeLinecap="round" transform="rotate(-90 70 70)"
            className="progress-circle"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
              filter: "url(#glow)",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">{remaining.toLocaleString()}</span>
          <span className="text-xs text-slate-400">Credits Left</span>
        </div>
      </div>
      <p className="text-sm text-slate-300 mt-6">
        Used {credits.used.toLocaleString()} of {credits.total.toLocaleString()} credits this month.
      </p>
      <button className="buy-credits-button mt-6">
        <PlusCircle size={20} />
        <span>Buy More Credits</span>
      </button>
    </div>
  );
};

// --- Component: AccountSecurity.tsx ---
const AccountSecurity: React.FC = () => {
  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-bold text-white text-shadow-glow mb-6">Account Security</h3>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <KeyRound size={24} className="text-yellow-300" />
            <div>
              <p className="font-semibold text-white">Password</p>
              <p className="text-xs text-slate-400">Last changed on July 15, 2025</p>
            </div>
          </div>
          <button className="security-button">Change Password</button>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <div className="flex items-center gap-4">
            <ShieldCheck size={24} className="text-green-400" />
            <div>
              <p className="font-semibold text-white">Two-Factor Authentication</p>
              <p className="text-xs text-slate-400">Add an extra layer of security.</p>
            </div>
          </div>
          <button className="security-button-primary">Enable 2FA</button>
        </div>
      </div>
    </div>
  );
};

// --- Component: DangerZone.tsx ---
const DangerZone: React.FC = () => {
  const handleDeleteClick = () => {
    console.log("Delete Account button clicked. Show confirmation modal.");
  };

  return (
    <div className="glass-card p-6 border-red-500/30">
      <h3 className="text-xl font-bold text-red-400 text-shadow-glow mb-4">Danger Zone</h3>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-white">Delete Your Account</p>
          <p className="text-xs text-slate-400">This action is permanent and cannot be undone.</p>
        </div>
        <button onClick={handleDeleteClick} className="delete-button">
          <ShieldAlert size={16} />
          <span>Delete Account</span>
        </button>
      </div>
    </div>
  );
};


// --- Main Component: UserProfileDashboard.tsx ---
const UserProfileDashboard: React.FC = () => {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#0a1016] to-[#0f4c5a] overflow-hidden rounded-lg">
      <div className="absolute top-0 left-0 w-full h-full stars-container">
        <div id="stars1"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-full corner-vignette"></div>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap');
          .stars-container, .corner-vignette { pointer-events: none; }
          @keyframes animateStars { from { transform: translateY(0px); } to { transform: translateY(-2000px); } }
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          #stars1, #stars2, #stars3 { position: absolute; top: 0; left: 0; right: 0; bottom: 0; width: 100%; height: 100%; display: block; }
          #stars1 { background: transparent url('https://www.transparenttextures.com/patterns/stardust.png') repeat top center; animation: animateStars 150s linear infinite; }
          #stars2 { background: transparent url('https://www.transparenttextures.com/patterns/stardust.png') repeat top center; animation: animateStars 100s linear infinite; transform: scale(0.7); opacity: 0.7; }
          #stars3 { background: transparent url('https://www.transparenttextures.com/patterns/stardust.png') repeat top center; animation: animateStars 70s linear infinite; transform: scale(0.5); opacity: 0.5; }
          .corner-vignette { background: radial-gradient(circle at bottom left, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 50%); }
          .glass-card { background: rgba(22, 32, 44, 0.25); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 1rem; box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2); transition: all 0.3s ease; }
          .glass-card:hover { transform: translateY(-5px); box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.3); border-color: rgba(255, 255, 255, 0.15); }
          .account-title { font-family: 'Poppins', sans-serif; font-weight: 700; color: #ffffff; text-shadow: 0 0 8px rgba(255, 255, 255, 0.5), 0 0 16px rgba(255, 255, 255, 0.3); }
          .settings-icon { color: #ff3b3b; filter: drop-shadow(0 0 6px rgba(255, 59, 59, 0.8)) drop-shadow(0 0 12px rgba(255, 59, 59, 0.6)); animation: spin 5s linear infinite; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
          .text-shadow-glow { text-shadow: 0 0 6px rgba(255, 255, 255, 0.4); }
          .save-button { background: linear-gradient(90deg, #ff3b3b, #e100ff); color: white; font-weight: bold; padding: 8px 20px; border-radius: 8px; border: none; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 0 10px rgba(255, 59, 59, 0.5), 0 0 15px rgba(225, 0, 255, 0.4); }
          .save-button:hover { transform: translateY(-2px) scale(1.05); box-shadow: 0 0 15px rgba(255, 59, 59, 0.7), 0 0 25px rgba(225, 0, 255, 0.6); }
          .plan-badge { background-color: rgba(34, 211, 238, 0.1); padding: 4px 12px; border-radius: 9999px; border: 1px solid rgba(34, 211, 238, 0.3); }
          .manage-plan-button { background-color: transparent; color: #f0f9ff; font-weight: 600; font-size: 0.875rem; padding: 8px 16px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.2); cursor: pointer; transition: all 0.3s ease; }
          .manage-plan-button:hover { background-color: rgba(255, 255, 255, 0.1); border-color: rgba(255, 255, 255, 0.4); }
          .progress-circle { transition: stroke-dashoffset 0.5s ease-out; }
          .buy-credits-button { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(90deg, #34d399, #22d3ee); color: #0a1016; font-weight: bold; padding: 10px 24px; border-radius: 8px; border: none; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 0 12px rgba(52, 211, 153, 0.5), 0 0 18px rgba(34, 211, 238, 0.4); }
          .buy-credits-button:hover { transform: translateY(-2px) scale(1.05); box-shadow: 0 0 18px rgba(52, 211, 153, 0.7), 0 0 28px rgba(34, 211, 238, 0.6); }
          .security-button { background-color: rgba(255, 255, 255, 0.05); color: #f0f9ff; font-weight: 600; font-size: 0.875rem; padding: 8px 16px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.2); cursor: pointer; transition: all 0.3s ease; }
          .security-button:hover { background-color: rgba(255, 255, 255, 0.1); border-color: rgba(255, 255, 255, 0.4); }
          .security-button-primary { background-color: #22c55e; color: white; font-weight: bold; font-size: 0.875rem; padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 0 10px rgba(34, 197, 94, 0.5); }
          .security-button-primary:hover { transform: translateY(-2px); box-shadow: 0 0 15px rgba(34, 197, 94, 0.7); }
          .delete-button { display: inline-flex; align-items: center; gap: 8px; background-color: #ef4444; color: white; font-weight: bold; font-size: 0.875rem; padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 0 10px rgba(239, 68, 68, 0.5); }
          .delete-button:hover { background-color: #dc2626; transform: translateY(-2px); box-shadow: 0 0 15px rgba(239, 68, 68, 0.7); }
        `}
      </style>
      <div className="relative z-10 w-full h-full p-4 sm:p-6 md:p-8 space-y-8 text-slate-200 overflow-y-auto no-scrollbar">
        <div className="flex items-center gap-4">
          <h1 className="account-title text-3xl md:text-4xl tracking-tight">Account Settings</h1>
          <Settings size={32} className="settings-icon" />
        </div>
        
        {/* Mobile Layout: Single column, CreditsUsage appears second. */}
        <div className="space-y-8 lg:hidden">
          <ProfileHeader />
          <CreditsUsage />
          <PlanDetails />
          <AccountSecurity />
          <DangerZone />
        </div>

        {/* Desktop Layout: Two columns, CreditsUsage is on the right. */}
        <div className="hidden lg:grid grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            <ProfileHeader />
            <PlanDetails />
            <AccountSecurity />
            <DangerZone />
          </div>
          <div className="lg:col-span-1 space-y-8">
            <CreditsUsage />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default UserProfileDashboard;
