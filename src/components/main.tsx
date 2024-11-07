import { useLayoutEffect } from 'react';
import useGlobal from '../hooks/use-global';
import InjectFont from './core/InjectFont';
import FloatingIcon from './generic/FloatingIcon';
import MainPopup from './generic/MainPopup';

function Main({ lastTopPosition, currentStoreInfo }) {
  const { isPopUpOpen } = useGlobal();

  useLayoutEffect(() => {
    (async () => {
      const { top_coupons } = await chrome.storage.local.get();
      // @ts-ignore
    })();
    return () => {};
  }, [currentStoreInfo, isPopUpOpen]);

  return (
    <>
      <InjectFont />
      <FloatingIcon lastTopPosition={lastTopPosition} />
      <MainPopup />
    </>
  );
}

export default Main;
