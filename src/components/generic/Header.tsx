import logo from '@/public/images/full-logo.png';
import { config } from '@/src/config/config';
import useGlobal from '@/src/hooks/use-global';
import { SvgXMark } from './Icons';

const Header = () => {
  const { setIsPopUpOpen } = useGlobal();

  function handleButtonClick() {
    setIsPopUpOpen(false);
  }

  return (
    <header className="cp-px-4 cp-py-2.5 cp-flex cp-items-center cp-justify-between cp-gap-2 cp-bg-primary-background cp-rounded-t-2xl cp-shadow-header">
      <div
        className="cp-h-[31px] cp-cursor-pointer"
        onClick={() => (window.location.href = config.APP_URL)}
      >
        <img
          src={logo}
          alt="logo"
          className="cp-max-h-[31px] cp-h-full cp-w-auto"
        />
      </div>
      <button
        onClick={handleButtonClick}
        className="hover:cp-opacity-75 cp-transition-ease"
      >
        <SvgXMark className="cp-size-4 cp-text-primary-text" />
      </button>
    </header>
  );
};

export default Header;
