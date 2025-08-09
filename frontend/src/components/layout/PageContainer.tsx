import React from 'react';

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
};

const PageContainer: React.FC<PageContainerProps> = ({ children, className = '', noPadding = false }) => {
  return (
    <div
      className={`page-main-container relative flex flex-col h-full overflow-y-auto no-scrollbar max-w-[90%] sm:max-w-full mx-auto ${
        !noPadding ? 'p-3 sm:p-4 md:p-4' : ''
      } ${className}`}
      style={{ maxWidth: '89vw', overflowX: 'hidden' }}
    >
      {children}
    </div>
  );
};

export default PageContainer;