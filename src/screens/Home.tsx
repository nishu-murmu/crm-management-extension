import useContent from '../hooks/use-content';
import { translate } from '../translation/translation';

const Home = () => {
  const { generateBlackBoxReport, generateAssigneeReport, openOpenTickets } =
    useContent();

  return (
    <div className="cp-flex cp-flex-col cp-gap-4 cp-p-6">
      <h1 className="cp-text-2xl cp-font-bold cp-mb-6">
        {translate('reportGeneration')}
      </h1>

      <button
        onClick={generateBlackBoxReport}
        className="cp-bg-blue-600 cp-text-white cp-px-6 cp-py-3 cp-rounded-lg cp-shadow-md hover:cp-bg-blue-700 cp-transition-colors cp-font-medium"
      >
        {translate('generateBlackBoxReport')}
      </button>

      <button
        onClick={generateAssigneeReport}
        className="cp-bg-green-600 cp-text-white cp-px-6 cp-py-3 cp-rounded-lg cp-shadow-md hover:cp-bg-green-700 cp-transition-colors cp-font-medium"
      >
        {translate('generateAssigneeReport')}
      </button>

      <button
        onClick={openOpenTickets}
        className="cp-bg-purple-600 cp-text-white cp-px-6 cp-py-3 cp-rounded-lg cp-shadow-md hover:cp-bg-purple-700 cp-transition-colors cp-font-medium"
      >
        {translate('openAllOpenTickets')}
      </button>
    </div>
  );
};

export default Home;
