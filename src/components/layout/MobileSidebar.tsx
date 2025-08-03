import React from 'react';
import { NavLink } from 'react-router-dom';
import { XMarkIcon, BeakerIcon } from '@heroicons/react/24/solid'; // BeakerIcon को यहां इम्पोर्ट किया गया है
import { navConfig } from '../../config/navConfig';
import { useApp } from '../../contexts/AppContext';
import BrandLogo from '../ui/BrandLogo';

type MobileSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const { isLoggedIn } = useApp();

  return (
    <div 
      className={`fixed inset-0 z-30 transform ${isOpen ? 'translate-y-0' : '-translate-y-full'} transition-transform duration-300 lg:hidden`} 
      role="dialog" 
      aria-modal="true"
    >
      <div className="absolute inset-0 glass-effect" onClick={onClose}></div>
      
      <div className="relative w-full p-4 bg-background-light dark:bg-background-dark h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <BrandLogo />
          <button onClick={onClose} className="p-2" aria-label="Sidebar बंद करें">
            <XMarkIcon className="w-6 h-6 text-text-main-light dark:text-text-main-dark" />
          </button>
        </div>
        
        <nav aria-label="Mobile navigation" className="space-y-1">
          {navConfig.map((section, sectionIndex) => (
            (!section.requiresAuth || isLoggedIn) && (
              <div key={sectionIndex}>
                {section.title && (
                  <div className="pt-4 mt-4 border-t border-black/10 dark:border-white/10">
                    <p className="px-3 text-xs font-semibold uppercase text-text-secondary-light dark:text-text-secondary-dark">{section.title}</p>
                  </div>
                )}
                   <div className={section.title ? "mt-2 space-y-1" : ""}>
                    {section.items.map((item) => (
                      (!item.requiresAuth || isLoggedIn) && (
                        <NavLink
                          key={item.id}
                          to={`/${item.id}`}
                          onClick={onClose} // लिंक पर क्लिक करने पर साइडबार बंद हो जाएगा
                          className={({ isActive }) =>
                            `nav-item flex items-center gap-4 p-3 rounded-lg transition-colors ${
                              isActive ? 'active' : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/10 dark:hover:bg-white/10'
                            }`
                          }
                        >
                          {item.icon}
                          <span>{item.name}</span>
                        </NavLink>
                      )
                    ))}
                    {/* AI Lab के लिए नया लिंक यहां जोड़ा गया है, अगर यह 'ACCOUNT' सेक्शन है */}
                    {section.title === 'ACCOUNT' && ( // 'ACCOUNT' सेक्शन के लिए शर्त
                      <NavLink
                        to="/ai-lab"
                        onClick={onClose} // लिंक पर क्लिक करने पर साइडबार बंद हो जाएगा
                        className={({ isActive }) =>
                          `nav-item flex items-center gap-4 p-3 rounded-lg transition-colors ${
                            isActive 
                              ? 'active' 
                              : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-black/10 dark:hover:bg-white/10 hover:text-text-main-light dark:hover:text-text-main-dark'
                          }`
                        }
                      >
                        <BeakerIcon className="w-5 h-5" /> {/* AI Lab आइकन */}
                        <span>AI Lab</span>
                      </NavLink>
                    )}
                  </div>
              </div>
            )
          ))}
          {/* पहले का 'LABS' सेक्शन यहां से हटा दिया गया है */}
        </nav>
      </div>
    </div>
  );
};

export default MobileSidebar;
