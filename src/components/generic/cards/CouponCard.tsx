import useGlobal from '@/src/hooks/use-global';
import { translate } from '@/src/translation/translation';
import { TCoupon } from '@/src/types/coupon';
import { decodeString } from '@/src/utils/utils';
import Heading from '../../core/Heading';
import { CopyButton } from '../CopyButton';
import { ShoppingButton } from '../ShoppingButton';

const CouponCard = ({
  type,
  data,
}: {
  type: 'store' | 'coupon';
  data?: TCoupon;
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const { isPopUpOpen } = useGlobal();

  useEffect(() => {
    if (textRef.current) {
      const elementHeight = textRef.current?.offsetHeight;
      setHeight(elementHeight);
    }
  }, [data?.content, isPopUpOpen]);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="cp-bg-white cp-border cp-border-dashed cp-border-primary-text/25 cp-rounded-2xl cp-animate-fade-in">
      <div className="cp-p-3 cp-border-b cp-border-dashed cp-border-primary-text/25 cp-space-y-2">
        <div className="cp-flex cp-items-center cp-gap-2">
          <div
            className={`cp-flex-shrink-0 cp-min-w-20 ${
              type === 'store' ? 'cp-p-1' : 'cp-px-2 cp-py-2.5'
            } cp-flex cp-items-center cp-justify-center cp-gap-1 cp-border cp-border-dashed cp-rounded-md cp-border-primary-text/25 cp-font-semibold`}
          >
            {type === 'store' ? (
              <img
                className="cp-max-h-8 cp-h-full cp-w-auto"
                src={data?.coupon_store?.store_image}
                alt={data?.title}
              />
            ) : (
              data?.coupon_save && (
                <>
                  <p className="cp-text-sm cp-font-semibold">
                    {data?.coupon_save}
                  </p>
                </>
              )
            )}
          </div>
          <Heading as="h5" title={decodeString(data?.title)} />
        </div>
        <div
          ref={textRef}
          className={`cp-relative cp-h-fit ${
            height > 32 && !isExpanded
              ? 'cp-max-h-8 cp-overflow-hidden'
              : 'cp-max-h-fit cp-overflow-auto'
          }`}
        >
          <p
            className={`cp-text-gray`}
            // dangerouslySetInnerHTML={{
            //   __html: decodeString(data?.content) || '',
            // }}
          >
            {decodeString(data?.content) || ''}
            {height > 32 && (
              <button
                onClick={toggleReadMore}
                className={`pl-2 cp-bg-white cp-text-green-dark cp-font-semibold ${
                  height > 32 && !isExpanded
                    ? 'cp-absolute cp-bottom-0 cp-right-0'
                    : ''
                }`}
              >
                {isExpanded
                  ? translate('view_less')
                  : `...${translate('view_more')}`}
              </button>
            )}
          </p>
        </div>
        <p className="cp-text-gray">
          {translate('expire_in')} <span>{data?.expiry_date}</span>
        </p>
      </div>
      <div className="cp-p-3">
        {data?.coupon_type_code ? (
          <CopyButton data={data} isOpen={isOpen} setIsOpen={setIsOpen} />
        ) : (
          <ShoppingButton data={data} />
        )}
      </div>
    </div>
  );
};

export default CouponCard;
