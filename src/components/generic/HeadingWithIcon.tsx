import Heading from '../core/Heading';

const HeadingWithIcon = ({ icon, title }: { icon?: any; title: string }) => {
  return (
    <div className="cp-flex cp-items-center cp-gap-2.5">
      {icon && (
        <div className="cp-flex-shrink-0 cp-h-[50px] cp-flex cp-items-center cp-justify-center">
          <img
            src={icon}
            alt={title}
            className="cp-max-w-[92px] cp-h-[50px] cp-object-contain cp-w-auto"
          />
        </div>
      )}
      <Heading title={title} />
    </div>
  );
};

export default HeadingWithIcon;
