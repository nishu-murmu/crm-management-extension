import { translate } from '../../translation/translation';

const RephraseButton = () => {
  function rephrase() {
    console.log('rephrase');
  }
  return (
    <button
      onClick={rephrase}
      className="cp-bg-blue-600 cp-text-white cp-px-6 cp-py-3 cp-rounded-lg cp-shadow-md hover:cp-bg-blue-700 cp-transition-colors cp-font-medium"
    >
      {translate('rephrase')}
    </button>
  );
};

export default RephraseButton;
