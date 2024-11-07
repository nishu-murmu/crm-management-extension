import icon from '@/public/images/active-128.png';
import { useDraggableElement } from '@/src/hooks/use-draggable-element';
import useGlobal from '@/src/hooks/use-global';
import { useEffect, useRef } from 'react';
import CouponCountBadge from './CouponCountBadge';

const FloatingIcon = ({ lastTopPosition }) => {
  const {
    setFloatingButtonRef,
    mainPopupRef,
    floatingButtonRef,
    setIsPopUpOpen,
    isPopUpOpen,
  } = useGlobal();

  const elementRef = useRef<HTMLDivElement>(null);
  const { isDraggable, setElement } = useDraggableElement(false);

  const handleClick = () => {
    if (isDraggable) return;
    setIsPopUpOpen(true);
  };

  useEffect(() => {
    setElement(elementRef.current);
    setFloatingButtonRef(elementRef.current);
    const handleCallbackFunction = (request) => {
      if (request.action === 'OPEN_POPUP') {
        setIsPopUpOpen((prev) => !prev);
      }
    };
    chrome.runtime.onMessage.addListener(handleCallbackFunction);
    return () => {
      chrome.runtime.onMessage.removeListener(handleCallbackFunction);
    };
  }, [elementRef.current, mainPopupRef]);

  useEffect(() => {
    if (mainPopupRef) {
      if (isPopUpOpen) {
        if (floatingButtonRef) {
          floatingButtonRef.style.display = 'none';
        }
        const hasScrollbar = document.body.scrollHeight > window.innerHeight;
        const scrollbarWidth = window.innerWidth - document.body.clientWidth;
        document.body.style.overflow = 'hidden';

        if (hasScrollbar) {
          document.body.style.paddingRight = `${scrollbarWidth}px`;
        }
        const overlay = mainPopupRef.querySelector(
          '#cp-overlay'
        ) as HTMLDivElement;
        const injectedPopup = mainPopupRef.querySelector(
          '#cp-injected-popup'
        ) as HTMLDivElement;
        overlay.style.display = 'block';
        injectedPopup.style.display = 'block';
        if (floatingButtonRef) {
          floatingButtonRef.style.display = 'none';
        }
      } else {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        const overlay = mainPopupRef.querySelector(
          '#cp-overlay'
        ) as HTMLDivElement;
        const injectedPopup = mainPopupRef.querySelector(
          '#cp-injected-popup'
        ) as HTMLDivElement;
        if (overlay?.classList && injectedPopup?.classList) {
          overlay.classList.add('cp-animate-fade-out');
          injectedPopup.classList.add('cp-animate-translate-x-out');
          setTimeout(() => {
            overlay.style.display = 'none';
            injectedPopup.style.display = 'none';
            injectedPopup.classList.remove('cp-animate-translate-x-out');
            overlay.classList.remove('cp-animate-fade-out');
          }, 370);
          document.body.style.overflow = 'unset';
          document.body.style.paddingRight = 'unset';
          if (floatingButtonRef) {
            floatingButtonRef.style.display = 'block';
          }
        }
      }
    }

    return () => {};
  }, [isPopUpOpen, mainPopupRef]);

  return (
    <div style={{ display: 'block' }}>
      <div
        ref={elementRef}
        style={{
          top: lastTopPosition || 250,
          right: '0px',
          position: 'fixed',
          zIndex: 9999999,
          userSelect: 'none',
        }}
        className="cp-h-[35px] cp-flex cp-items-center"
      >
        <>
          <div
            onClick={handleClick}
            className="cp-relative cp-animate-translate-x-in cp-flex-shrink-0 cp-size-[35px] cp-flex cp-items-center cp-justify-center cp-bg-primary-background cp-border-l cp-border-t cp-border-b cp-border-primary-text/20 cp-rounded-l-xl"
          >
            <img
              src={icon}
              className="cp-size-5"
              alt="Floating Icon"
              draggable="false"
            />
            <CouponCountBadge />
          </div>
        </>
      </div>
    </div>
  );
};

export default FloatingIcon;
