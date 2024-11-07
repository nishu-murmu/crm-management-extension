import useGlobal from '@/src/hooks/use-global';

const CouponCountBadge = () => {
  const { currentStoreInfo } = useGlobal();

  const couponCount =
    (currentStoreInfo?.coupon_count?.code || 0) +
    (currentStoreInfo?.coupon_count?.print || 0) +
    (currentStoreInfo?.coupon_count?.sale || 0);

  if (!couponCount) return null;
  return (
    <div className="cp-absolute -cp-bottom-2 -cp-left-2 cp-min-w-6 cp-min-h-6 cp-bg-gray cp-text-white cp-rounded-md cp-text-xs cp-flex cp-items-center cp-justify-center">
      {couponCount}
    </div>
  );
};

export default CouponCountBadge;
