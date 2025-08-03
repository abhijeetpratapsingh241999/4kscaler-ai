// frontend/src/pages/NotFoundPage.tsx

import React from 'react';

/**
 * NotFoundPage कॉम्पोनेन्ट तब प्रदर्शित होता है जब कोई अज्ञात URL एक्सेस किया जाता है।
 * यह मॉकअप में एक साधारण 'Page Not Found' संदेश था।
 */
const NotFoundPage: React.FC = () => {
  return (
    <div className="p-4 h-full">
      <div className="page-main-container p-6 text-center h-full flex items-center justify-center flex-col">
        <h1 className="text-2xl font-bold mb-4 text-text-main-light dark:text-text-main-dark">Page Not Found</h1>
        <p className="text-text-secondary-light dark:text-text-secondary-dark">The requested page does not exist.</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
