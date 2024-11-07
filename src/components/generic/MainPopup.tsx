import icon from '@/public/images/logo-icon.png';
import useGlobal from '@/src/hooks/use-global';
import AppRouter from '@/src/router/AppRouter';
import Toast from '../core/Toast';

const MainPopup = () => {
  const { setMainPopupRef, setIsPopUpOpen } = useGlobal();

  function handleButtonClick() {
    setIsPopUpOpen(false);
  }

  return (
    <div ref={setMainPopupRef}>
      <div
        id="cp-overlay"
        onClick={handleButtonClick}
        className="cp-hidden cp-fixed cp-inset-0 cp-z-[99999999] cp-bg-black/75 cp-animate-fade-in"
      />
      <div
        id="cp-injected-popup"
        className="cp-hidden cp-font-roboto cp-fixed cp-top-[30px] cp-right-[30px] cp-z-[9999999999] cp-w-[375px] cp-h-[600px] cp-bg-primary-background cp-rounded-[20px] cp-text-primary-text cp-text-xs cp-animate-translate-x-in cp-transition-ease"
      >
        <div className="cp-relative cp-h-full">
          {/* <PermissionRequest /> */}
          <AppRouter />
          {/* <button
            onClick={handleButtonClick}
            className="cp-group cp-absolute cp-top-[34px] -cp-left-[60px] cp-size-[60px] cp-flex cp-items-center cp-justify-center cp-bg-green-light cp-rounded-l-xl"
          >
            <img
              src={icon}
              className="cp-size-12"
              alt="Floating Icon"
              draggable="false"
            />
          </button> */}
          <Toast />
        </div>
      </div>
    </div>
  );
};

export default MainPopup;
