import React from 'react';
import PageContainer from '../components/layout/PageContainer';
// Hum is naye component ko agle step mein banayenge
import UserProfileDashboard from '../components/userprofile/UserProfileDashboard'; 

const UserProfilePage: React.FC = () => {
  return (
    <PageContainer noPadding> {/* Padding hata di hai taaki naya component poori jagah le sake */}
      <UserProfileDashboard />
    </PageContainer>
  );
};

export default UserProfilePage;