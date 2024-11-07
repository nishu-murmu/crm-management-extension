import { ROUTES } from '@/src/config/config';
import { HomeIcon, SparklesIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Link } from 'react-router-dom';

interface BottomNavBarProps {
  activeTab: 'home' | 'generate';
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab = 'home' }) => {
  return (
    <nav className="cp-absolute cp-bottom-0 cp-left-0 cp-right-0 cp-bg-white cp-border-t cp-border-gray-200 cp-px-4 cp-py-2">
      <div className="cp-flex cp-justify-around cp-items-center cp-max-w-screen-xl cp-mx-auto">
        <Link
          to={ROUTES.HOME}
          className={`cp-flex cp-flex-col cp-items-center ${
            activeTab === 'home' ? 'cp-text-blue-600' : 'cp-text-gray-600'
          }`}
        >
          <HomeIcon className="cp-w-4 cp-h-4" />
          <span className="cp-text-xs cp-mt-1">Home</span>
        </Link>

        <Link
          to={ROUTES.GENERATE}
          className={`cp-flex cp-flex-col cp-items-center ${
            activeTab === 'generate' ? 'cp-text-blue-600' : 'cp-text-gray-600'
          }`}
        >
          <SparklesIcon className="cp-w-4 cp-h-4" />
          <span className="cp-text-xs cp-mt-1">Generate</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavBar;
