import React from 'react';
import { NavLink } from 'react-router-dom';
import { BeakerIcon } from '@heroicons/react/24/solid'; // BeakerIcon को यहां इम्पोर्ट किया गया है

// Navigation configuration और global state के लिए imports
import { navConfig } from '../../config/navConfig';
import { useApp } from '../../contexts/AppContext';

// Logo component
import BrandLogo from '../ui/BrandLogo';

const DesktopSidebar: React.FC = () => {
  // AppContext से login state ले रहे हैं
  const { isLoggedIn } = useApp();

  return (
    // Yeh sidebar sirf large screens (lg) par dikhega
    <aside className="hidden lg:flex w-64 glass-effect flex-shrink-0 flex-col p-4">
      <BrandLogo />
      
      <nav className="mt-8 w-full flex-1 no-scrollbar overflow-y-auto" aria-label="Main navigation">
        {/* Yahan 'space-y-4' kiya gaya hai taaki sections ke beech thodi aur jagah ho */}
        <div className="space-y-4">
          {/* navConfig array par loop karke sections generate kar rahe hain */}
          {navConfig.map((section, sectionIndex) => (
            // Section ko tabhi render karo jab uske liye login zaroori na ho, ya user logged in ho
            (!section.requiresAuth || isLoggedIn) && (
              <div key={sectionIndex}>
                {/* Agar section ka title hai, to use divider ke saath dikhao */}
                {section.title && (
                  <div className="pt-4 mt-4 border-t border-black/10 dark:border-white/10">
                    <p className="px-3 text-xs font-semibold uppercase text-text-secondary-light dark:text-text-secondary-dark">{section.title}</p>
                  </div>
                )}
                {/* Yahan badlav kiya gaya hai: Ab sabhi sections ke items ke beech 'space-y-2' hoga */}
                <div className={`space-y-2 ${section.title ? "mt-2" : ""}`}>
                  {/* Section ke items par loop karke navigation links bana rahe hain */}
                  {section.items.map((item) => (
                    // Item ko tabhi render karo jab uske liye login zaroori na ho, ya user logged in ho
                    (!item.requiresAuth || isLoggedIn) && (
                      <NavLink
                        key={item.id}
                        to={`/${item.id}`}
                        // NavLink active hone par 'active' class add karega
                        className={({ isActive }) =>
                          `nav-item flex items-center gap-4 p-3 rounded-lg transition-colors ${
                            isActive 
                              ? 'active' 
                              : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/10 dark:hover:bg-white/10 hover:text-text-main-light dark:hover:text-text-main-dark'
                          }`
                        }
                      >
                        {item.icon}
                        <span className="lg:inline">{item.name}</span>
                      </NavLink>
                    )
                  ))}
                  {/* AI Lab के लिए नया लिंक यहां जोड़ा गया है, अगर यह 'ACCOUNT' सेक्शन है */}
                  {section.title === 'ACCOUNT' && ( // 'ACCOUNT' सेक्शन के लिए शर्त
                    <NavLink
                      to="/ai-lab"
                      className={({ isActive }) =>
                        `nav-item flex items-center gap-4 p-3 rounded-lg transition-colors ${
                          isActive 
                            ? 'active' 
                            : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/10 dark:hover:bg-white/10 hover:text-text-main-light dark:hover:text-text-main-dark'
                        }`
                      }
                    >
                      <BeakerIcon className="w-5 h-5" /> {/* AI Lab आइकन */}
                      <span className="lg:inline">AI Lab</span>
                    </NavLink>
                  )}
                </div>
              </div>
            )
          ))}
          {/* पहले का 'LABS' सेक्शन यहां से हटा दिया गया है */}
        </div>
      </nav>
    </aside>
  );
};

export default DesktopSidebar;
