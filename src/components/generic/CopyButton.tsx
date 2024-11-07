import useGlobal from '@/src/hooks/use-global';
import { translate } from '@/src/translation/translation';
import { handleCopyCode } from '@/src/utils/utils';
import { SvgShop } from './Icons';

export const CopyButton = ({ data, setIsOpen, isOpen }) => {
  const { handleOutPage, isMerchantPage } = useGlobal();

  function handleOnClick() {
    handleOutPage({
      url: data?.out_url,
      activationType: 'background',
      type: 'coupon',
    });
    handleCopyCode(data?.coupon_type_code);
    setIsOpen(true);
  }

  function handleGoToStore() {
    handleOutPage({
      url: data?.out_url,
      activationType: 'active',
      type: 'offer',
      isToast: false,
      timeOut: 0,
    });
  }

  return (
    <div className="cp-flex cp-items-center cp-justify-between gap-4">
      <button
        onClick={handleOnClick}
        className={`${
          isOpen ? 'cp-hidden' : ''
        } cp-w-[140px] cp-coupon-btn-gr cp-text-gray cp-text-sm cp-uppercase cp-inline-flex cp-relative cp-px-2.5 cp-py-1.5 cp-border-2 cp-border-solid cp-border-gray-light cp-rounded`}
      >
        <span className="cp-ml-auto cp-truncate">{data?.coupon_type_code}</span>
        <span className="cp-w-fulls cp-w-[calc(140px-22px)] hover:cp-w-[calc(140px-32px)] cp-get-code cp-absolute -cp-inset-y-0.5 -cp-left-0.5 cp-px-2 cp-pt-[9px] cp-py-2 cp-bg-green-dark cp-rounded-l cp-flex cp-items-center cp-justify-center cp-gap-1 cp-transition-ease cp-text-white cp-text-xs cp-font-semibold cp-uppercase cp-transition-ease">
          {translate('view_code')}
        </span>
      </button>
      <div
        className={`${
          isOpen ? '' : 'cp-hidden'
        } cp-flex cp-items-center cp-gap-1 cp-text-gray cp-text-sm`}
      >
        <p className="cp-flex-shrink-0">{translate('code')}</p>
        <p className="cp-font-semibold">{data?.coupon_type_code}</p>
      </div>

      {!isMerchantPage && (
        <button
          onClick={handleGoToStore}
          className="cp-flex-shrink-0 cp-flex cp-items-center cp-gap-1 cp-text-green-dark cp-text-sm cp-font-semibold hover:cp-opacity-85 cp-transition-ease"
        >
          <SvgShop className="cp-flex-shrink-0 cp-size-4" />
          <span>{translate('buy_now')}</span>
        </button>
      )}
    </div>
  );
};
