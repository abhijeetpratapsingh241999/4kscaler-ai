// src/App.tsx (Restored Version)

import React, { useState } from 'react';
// useLocation ko yahan import kiya gaya hai
import { useLocation, Routes, Route } from 'react-router-dom';
// useApp hook ko import kiya gaya hai
import { useApp } from './contexts/AppContext.tsx';

// Layout Components
import DesktopSidebar from './components/layout/DesktopSidebar.tsx';
import MobileSidebar from './components/layout/MobileSidebar.tsx';
import Header from './components/layout/Header.tsx';
import LoginPopup from './components/ui/LoginPopup.tsx';

// Page Components
import HomePage from './pages/HomePage.tsx';
import UpscalePage from './pages/UpscalePage.tsx';
import CommunityPage from './pages/CommunityPage.tsx';
import PricingPage from './pages/PricingPage.tsx';
import ApiAccessPage from './pages/ApiAccessPage.tsx';
import WhatsNewPage from './pages/WhatsNewPage.tsx';
import UploadPage from './pages/UploadPage.tsx';
import BillingPage from './pages/BillingPage.tsx';
import ExplorePage from './pages/ExplorePage.tsx';
import MyCreationsPage from './pages/MyCreationsPage.tsx';
import UserProfilePage from './pages/UserProfilePage.tsx';
import SettingsPage from './pages/SettingsPage.tsx';
import AILabPage from './pages/AILabPage.tsx';

/**
 * Ab App component ka kaam sirf layout aur routes dikhana hai.
 * Yeh maankar chalta hai ki isse main.tsx mein Router aur Provider se wrap kiya gaya hai.
 */
const App: React.FC = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    // useApp hook ab yahan sahi se kaam karega
    const { isLoginPopupOpen, setLoginPopupOpen } = useApp();
    const location = useLocation();

    return (
        <>
            <div className="flex h-screen w-full bg-background-light dark:bg-background-dark">
                <DesktopSidebar />
                <MobileSidebar isOpen={isMobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
                
                <div className="flex-1 flex flex-col">
                    <Header onMobileMenuToggle={() => setMobileMenuOpen(true)} />
                    <main className="flex-1 overflow-y-auto no-scrollbar p-4 lg:p-6" role="main" key={location.pathname}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/home" element={<HomePage />} />
                            <Route path="/upscale" element={<UpscalePage />} />
                            <Route path="/explore" element={<ExplorePage />} />
                            <Route path="/upload" element={<UploadPage />} />
                            <Route path="/my-creations" element={<MyCreationsPage />} />
                            <Route path="/billing" element={<BillingPage />} />
                            <Route path="/api-access" element={<ApiAccessPage />} />
                            <Route path="/pricing" element={<PricingPage />} />
                            <Route path="/community" element={<CommunityPage />} />
                            <Route path="/whats-new" element={<WhatsNewPage />} />
                            <Route path="/profile" element={<UserProfilePage />} />
                            <Route path="/settings" element={<SettingsPage />} />
                            <Route path="/ai-lab" element={<AILabPage />} />
                        </Routes>
                    </main>
                </div>
            </div>
            
            <LoginPopup isOpen={isLoginPopupOpen} onClose={() => setLoginPopupOpen(false)} />
        </>
    );
};

export default App;
