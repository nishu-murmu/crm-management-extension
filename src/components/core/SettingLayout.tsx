import useGlobal from '@/src/hooks/use-global';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../generic/Header';

const SettingLayout = ({ children }: { children: React.ReactNode }) => {
  const { setIsPopUpOpen, bottomTabs } = useGlobal();
  const { pathname } = useLocation();
  useEffect(() => {
    const onMessageListener = (event) => {
      if (event.data.action === 'OPEN_GENERATE_PAGE') {
        setIsPopUpOpen(true);
      }
    };
    addEventListener('message', onMessageListener);
  }, []);

  return (
    <div className="cp-h-full cp-space-y-5 cp-flex cp-flex-col">
      <Header />
      {children}
      {/* <BottomNavBar
        activeTab={
          bottomTabs.find((tab) => tab.path === pathname)?.name || 'home'
        }
      /> */}
    </div>
  );
};

export default SettingLayout;
