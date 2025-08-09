// src/components/explore/ui/Tag.tsx

import React from 'react';
import { useApp } from '../../../contexts/AppContext';

type Props = {
    text: string;
    icon?: React.ReactNode;
};

const Tag: React.FC<Props> = ({ text, icon }) => {
    const { theme } = useApp();

    return (
        <div className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
            theme === 'light' 
            ? 'bg-gray-200 text-gray-700' 
            : 'bg-white/10 text-gray-300'
        }`}>
            {icon}
            <span>{text}</span>
        </div>
    );
};

export default Tag;
