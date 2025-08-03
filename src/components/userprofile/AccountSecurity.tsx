import React from 'react';
import { ShieldCheck, KeyRound } from 'lucide-react';

const AccountSecurity: React.FC = () => {
  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-bold text-white text-shadow-glow mb-6">Account Security</h3>
      
      <div className="space-y-6">
        {/* Change Password Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <KeyRound size={24} className="text-yellow-300" />
            <div>
              <p className="font-semibold text-white">Password</p>
              <p className="text-xs text-slate-400">Last changed on July 15, 2025</p>
            </div>
          </div>
          <button className="security-button">
            Change Password
          </button>
        </div>

        {/* Two-Factor Authentication Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <div className="flex items-center gap-4">
            <ShieldCheck size={24} className="text-green-400" />
            <div>
              <p className="font-semibold text-white">Two-Factor Authentication</p>
              <p className="text-xs text-slate-400">Add an extra layer of security to your account.</p>
            </div>
          </div>
          <button className="security-button-primary">
            Enable 2FA
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountSecurity;
