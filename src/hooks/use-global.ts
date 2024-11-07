import { useAtom } from 'jotai/react';
import { booleanAtomFamily, mainPopupRefAtom, toastAtom } from '../jotai/atom';
import { atomKey } from '../jotai/atom-key';

const useGlobal = () => {
  const [mainPopupRef, setMainPopupRef] = useAtom(mainPopupRefAtom);
  const [toast, setToast] = useAtom(toastAtom);
  const [isPopUpOpen, setIsPopUpOpen] = useAtom(
    booleanAtomFamily(atomKey.isPopUpOpen)
  );

  return {
    mainPopupRef,
    toast,
    isPopUpOpen,
    setMainPopupRef,
    setToast,
    setIsPopUpOpen,
  };
};

export default useGlobal;
