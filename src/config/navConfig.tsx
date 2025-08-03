import React from 'react';
import {
  HomeIcon,
  SparklesIcon,
  GlobeAltIcon,
  ArrowUpTrayIcon,
  RectangleStackIcon,
  CreditCardIcon,
  CodeBracketIcon,
  TagIcon,
  UserGroupIcon,
  BellIcon,
  // UserIcon और Cog6ToothIcon yahan se hata diye gaye hain
} from '@heroicons/react/24/outline';
import { BeakerIcon } from '@heroicons/react/24/solid'; // BeakerIcon को यहां इम्पोर्ट किया गया है

// TypeScript types for our navigation structure
type NavItem = {
  id: string;
  name: string;
  icon: React.ReactNode;
  requiresAuth?: boolean;
};

type NavSection = {
  title?: string;
  requiresAuth?: boolean;
  items: NavItem[];
};

// Sidebar navigation के लिए configuration object
export const navConfig: NavSection[] = [
  {
    items: [
      { id: 'home', name: 'Home', icon: <HomeIcon className="w-5 h-5" /> },
      { id: 'upscale', name: 'Upscale', icon: <SparklesIcon className="w-5 h-5" /> },
      { id: 'explore', name: 'Explore', icon: <GlobeAltIcon className="w-5 h-5" /> },
    ]
  },
  {
    title: 'Account', // यह आपका ACCOUNT सेक्शन है
    requiresAuth: true,
    items: [
      { id: 'my-creations', name: 'My Creations', icon: <RectangleStackIcon className="w-5 h-5" />, requiresAuth: true }, // My Creations सबसे ऊपर
      { id: 'ai-lab', name: 'AI Lab', icon: <BeakerIcon className="w-5 h-5" />, requiresAuth: true }, // फिर AI Lab
      { id: 'upload', name: 'Upload', icon: <ArrowUpTrayIcon className="w-5 h-5" />, requiresAuth: true }, // फिर Upload
      { id: 'billing', name: 'Billing', icon: <CreditCardIcon className="w-5 h-5" />, requiresAuth: true }, // फिर Billing
      { id: 'api-access', name: 'API Access', icon: <CodeBracketIcon className="w-5 h-5" />, requiresAuth: true }, // और अंत में API Access
      // Profile और Settings के लिंक्स yahan se hata diye gaye hain
    ]
  },
  {
    title: 'General',
    items: [
      { id: 'pricing', name: 'Pricing', icon: <TagIcon className="w-5 h-5" /> },
      { id: 'community', name: 'Community', icon: <UserGroupIcon className="w-5 h-5" /> },
      { id: 'whats-new', name: "What's New", icon: <BellIcon className="w-5 h-5" /> },
    ]
  }
];
