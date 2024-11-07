const SkeletonLoader = ({
  count,
  className = '',
}: {
  count: number;
  className?: string;
}) => {
  return [...Array(count)].map((_, index) => (
    <div
      key={index}
      className={`cp-bg-green-light/25 cp-rounded-2xl cp-animate-pulse ${className}`}
    />
  ));
};

export default SkeletonLoader;
