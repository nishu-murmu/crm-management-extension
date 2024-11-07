import { useAtom } from 'jotai/react';
import {
  booleanAtomFamily,
  floatingButtonRefAtom,
  mainPopupRefAtom,
  toastAtom,
} from '../jotai/atom';
import { atomKey } from '../jotai/atom-key';
import { translate } from '../translation/translation';
import { sendMessage } from '../utils/utils';
import { ROUTES } from '../config/config';

const useGlobal = () => {
  const [mainPopupRef, setMainPopupRef] = useAtom(mainPopupRefAtom);
  const [floatingButtonRef, setFloatingButtonRef] = useAtom(
    floatingButtonRefAtom
  );
  const [toast, setToast] = useAtom(toastAtom);
  const [isPopUpOpen, setIsPopUpOpen] = useAtom(
    booleanAtomFamily(atomKey.isPopUpOpen)
  );

  const bottomTabs: BottomTab[] = [
    {
      name: 'home',
      path: ROUTES.HOME,
    },
    {
      name: 'generate',
      path: ROUTES.GENERATE,
    },
  ];

  function handleOutPage({
    url,
    activationType,
    type,
    isToast = true,
    timeOut = 2000,
  }: {
    url: string;
    activationType?: 'background' | 'active';
    type: 'coupon' | 'offer';
    isToast?: boolean;
    timeOut?: number;
  }) {
    if (isToast)
      setToast({
        state: true,
        message:
          type === 'coupon'
            ? translate('coupon_copied')
            : translate('offer_activated'),
      });
    if (activationType === 'background') {
      sendMessage({
        action: 'BG_ACTIVATE_CASHBACK',
        payload: {
          url: url,
        },
      });
    } else {
      setTimeout(() => {
        window.open(url, '_blank');
      }, timeOut);
    }
  }

  return {
    mainPopupRef,
    floatingButtonRef,
    toast,
    isPopUpOpen,
    bottomTabs,
    setMainPopupRef,
    setFloatingButtonRef,
    setToast,
    setIsPopUpOpen,
    handleOutPage,
  };
};

export default useGlobal;
