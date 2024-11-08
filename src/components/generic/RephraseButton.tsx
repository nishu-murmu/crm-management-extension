import { sendMessage } from '@/src/utils/utils';
import { translate } from '../../translation/translation';
import TooltipComponent from '../core/Tooltip';
import { SvgPenSparkles } from './Icons';

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
    <div
      onClick={() => {
        rephrase();
      }}
      className="cp-p-2 cp-mt-1 cp-rounded-lg cp-cursor-pointer"
    >
      <TooltipComponent
        hoverElement={<SvgPenSparkles className="cp-w-4 cp-h-4" />}
        id="rephraseTooltip"
        placement="bottom-end"
        contentData={translate('rephraseTooltip')}
        className="!max-w-[320px] !w-full"
      />
    </div>
  );
};

export default RephraseButton;
