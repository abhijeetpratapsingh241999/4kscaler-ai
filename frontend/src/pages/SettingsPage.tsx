import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';

const SettingsPage: React.FC = () => {
  return (
    <PageContainer>
      <div className="text-center mb-12">
        <Cog6ToothIcon className="w-24 h-24 mx-auto text-primary-color/50" />
        <h1 className="text-4xl font-bold mt-4">Settings</h1>
        <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark mt-2">
          Customize your application experience.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Notification Settings */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
          <div className="space-y-3 p-6 rounded-lg bg-background-light dark:bg-container-dark/50">
            <label className="flex items-center justify-between">
              <span className="text-text-main-light dark:text-text-main-dark">Email Notifications</span>
              <input type="checkbox" className="toggle-checkbox" defaultChecked />
            </label>
            <label className="flex items-center justify-between">
              <span className="text-text-main-light dark:text-text-main-dark">Push Notifications</span>
              <input type="checkbox" className="toggle-checkbox" />
            </label>
          </div>
        </div>

        {/* Theme Settings */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Appearance</h2>
          <div className="p-6 rounded-lg bg-background-light dark:bg-container-dark/50">
            <p>Theme settings are available in the top right corner of the header.</p>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default SettingsPage;
