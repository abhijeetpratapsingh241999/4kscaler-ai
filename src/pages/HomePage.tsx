import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import HeroSection from '../components/homepage/HeroSection';
// --- Naya component yahan import kiya gaya hai (path updated) ---
import { FeatureHub } from '../components/homepage/FeatureHub';
import CtaSection from '../components/homepage/CtaSection';

const HomePage: React.FC = () => {
  return (
    <PageContainer noPadding>
      <HeroSection />
      
      {/* --- Yeh naya feature section hai jo buttons ke upar joda gaya hai --- */}
      <FeatureHub />
      
      <CtaSection />
    </PageContainer>
  );
};

export default HomePage;
