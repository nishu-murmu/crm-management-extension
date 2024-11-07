import InjectFont from './core/InjectFont';
import FloatingIcon from './generic/FloatingIcon';
import MainPopup from './generic/MainPopup';

function Main({ lastTopPosition }: { lastTopPosition: number }) {
  return (
    <>
      <InjectFont />
      <FloatingIcon lastTopPosition={lastTopPosition} />
      <MainPopup />
    </>
  );
}

export default Main;
