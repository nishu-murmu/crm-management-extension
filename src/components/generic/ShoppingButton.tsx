import useGlobal from '@/src/hooks/use-global';
import { translate } from '@/src/translation/translation';
import { SvgCart } from './Icons';

export const ShoppingButton = ({ data }) => {
  const { handleOutPage } = useGlobal();
  const [activate, setActivate] = useState(false);

  function handleActivateClick() {
    handleOutPage({
      url: data?.out_url,
      activationType: 'active',
      type: 'offer',
    });
    setActivate(true);
    setTimeout(() => {
      setActivate(false);
    }, 2000);
  }

  return (
    <button
      onClick={handleActivateClick}
      className="cp-px-4 cp-py-2 cp-bg-green-dark cp-flex cp-items-center cp-gap-2 cp-rounded hover:cp-opacity-85 cp-transition-ease cp-uppercase"
    >
      <p className="cp-text-white cp-text-sm cp-font-semibold">
        {translate(activate ? 'activated' : 'activate')}
      </p>
      <SvgCart className="cp-flex-shrink-0 cp-size-4 cp-text-white" />
    </button>
  );
};
