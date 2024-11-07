import icon from '@/public/images/discount.png';
import { translate } from '@/src/translation/translation';

const DataNotFound = () => {
  return (
    <div className="cp-px-3 cp-py-4 cp-border cp-border-green-dark cp-rounded-2xl cp-text-center cp-space-y-2 cp-animate-fade-in">
      <div className="cp-size-10 cp-mx-auto">
        <img className="cp-size-10" src={icon} alt="icon" />
      </div>
      <h5 className="cp-text-base cp-font-semibold">
        {translate('we_dont_have_any_coupons')}
      </h5>
      <p className="cp-font-semibold">{translate('check_again_later')}</p>
    </div>
  );
};

export default DataNotFound;
