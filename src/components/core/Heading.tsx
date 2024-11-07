const Heading = ({
  className = '',
  title,
  as,
  size = 'md',
}: {
  className?: string;
  title?: any;
  as?: any;
  size?: any;
}) => {
  const Tag = as || 'h3';
  const sizes: any = {
    md: 'cp-text-base cp-font-semibold',
    sm: 'cp-text-base cp-font-semibold',
  };
  return <Tag className={`${sizes[size]} ${className}`}>{title}</Tag>;
};

export default Heading;
