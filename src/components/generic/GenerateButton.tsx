import { SparklesIcon } from '@heroicons/react/24/outline';
import TooltipComponent from '../core/Tooltip';
import { translate } from '@/src/translation/translation';

const GenerateButton = () => {
  function onClickHandler() {
    postMessage({ action: 'OPEN_GENERATE_PAGE' }, '*');
  }
  return (
    <div
      onClick={() => {
        onClickHandler();
      }}
      className="cp-p-2 cp-mt-1 cp-rounded-lg cp-cursor-pointer"
    >
      <TooltipComponent
        hoverElement={<SparklesIcon className="cp-w-5 cp-h-5" />}
        id="generateTooltip"
        placement="bottom-end"
        contentData={translate('generateTooltip')}
        className="!max-w-[320px] !w-full"
      />
    </div>
  );
};

export default GenerateButton;
