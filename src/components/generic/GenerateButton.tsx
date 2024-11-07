import { SparklesIcon } from '@heroicons/react/24/outline';

const GenerateButton = () => {
  function onClickHandler() {
    postMessage({ action: 'OPEN_GENERATE_PAGE' }, '*');
  }
  return (
    <div
      onClick={() => {
        onClickHandler();
      }}
    >
      <SparklesIcon className="cp-w-4 cp-h-4 cp-cursor-pointer" />
    </div>
  );
};

export default GenerateButton;
