import { sendMessage } from '@/src/utils/utils';
import { translate } from '../../translation/translation';

const RephraseButton = () => {
  const [loading, setLoading] = useState(false);
  async function rephrase() {
    setLoading(true);
    const lastTicketElem = Array.from(
      document.querySelectorAll(`.ticket-submitter-info`)
    ).at(-1);
    const isCustomer =
      (lastTicketElem?.querySelector(`.text-muted`) as HTMLParagraphElement)
        ?.innerText === 'Customer';
    if (!isCustomer) return;
    const customerName = (
      lastTicketElem?.querySelector(`p a`) as HTMLAnchorElement
    )?.innerText;

    const iframeElem = document.querySelector(
      'iframe#message_ifr'
    ) as HTMLIFrameElement;

    if (iframeElem) {
      const originalResponse = Array.from(
        iframeElem.contentDocument?.querySelectorAll(
          'p'
        ) as NodeListOf<HTMLParagraphElement>
      ).map((p) => p.innerText) as string[];
      const response = await sendMessage({
        action: 'REPHRASE',
        payload: {
          original_response: originalResponse.join('\n'),
          client_name: customerName,
        },
      });
      console.log('🚀 ~ rephrase ~ response:', response);
      setLoading(false);
    }
  }
  return (
    <button
      onClick={rephrase}
      className={`cp-bg-blue-600 cp-text-white cp-px-6 cp-py-3 cp-rounded-lg cp-shadow-md hover:cp-bg-blue-700 cp-transition-colors cp-font-medium ${
        loading ? 'cp-animate-pulse disabled cp-pointer-events-none' : ''
      }`}
      disabled={loading}
    >
      {loading ? 'Rephrasing...' : translate('rephrase')}
    </button>
  );
};

export default RephraseButton;
